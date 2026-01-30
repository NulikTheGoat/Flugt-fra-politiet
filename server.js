// LAN Multiplayer Server for Flugt fra Politiet
// Persistent "floating" server - always running, anyone can join
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

// Security headers (helmet-like for raw Node.js)
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// Cache control settings for static files
const CACHE_SETTINGS = {
  // Long cache for versioned assets (1 year)
  immutable: 'public, max-age=31536000, immutable',
  // Short cache for HTML and dynamic content
  short: 'public, max-age=300',
  // No cache for API responses
  none: 'no-store, no-cache, must-revalidate',
};

// Prefer dotenv, but keep a safe fallback for environments where it's not installed.
try {
  // eslint-disable-next-line global-require
  require('dotenv').config();
} catch (err) {
  // no-op
}

const PORT = parseInt(process.env.PORT || '3000', 10);
const WS_PORT = parseInt(process.env.WS_PORT || '3001', 10);

// Default room code - always available
const DEFAULT_ROOM = 'SPIL';

// Backward-compatible .env loader (kept to avoid breaking existing setups).
// If dotenv already loaded, this is effectively a no-op.
function loadEnvFallback() {
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach((line) => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
          const [key, ...valueParts] = line.split('=');
          const value = valueParts.join('=').trim();
          if (key && value && process.env[key.trim()] === undefined) {
            process.env[key.trim()] = value;
          }
        }
      });
      console.log('✅ Environment variables loaded from .env');
    }
  } catch (err) {
    console.warn('⚠️ Could not load .env file:', err.message);
  }
}
loadEnvFallback();

// MPS API Configuration
const MPS_CONFIG = {
  endpoint: process.env.MPS_ENDPOINT,
  apiKey: process.env.MPS_API_KEY || '',
  deployment: process.env.MPS_DEPLOYMENT || 'anthropic.claude-haiku-4-5-20251001-v1:0',
  maxTokens: parseInt(process.env.MPS_MAX_TOKENS) || 256,
  anthropicVersion: process.env.MPS_ANTHROPIC_VERSION || '2023-06-01',
};

const MPS_DISABLED =
  process.env.DISABLE_MPS === '1' ||
  process.env.MPS_DISABLED === '1' ||
  process.env.PLAYWRIGHT === '1' ||
  process.env.NODE_ENV === 'test';

function getFallbackCommentary() {
  const canned = [
    'Fantastisk! Kaos i gaderne!',
    'Hold fast—det her bliver vildt!',
    'Politiet er lige i hælene!',
    'Du slipper ikke let denne gang!',
  ];
  return canned[Math.floor(Math.random() * canned.length)];
}

function getFallbackSheriffCommand() {
  const canned = [
    'CHASE: Hold trykket og hold afstand kort!',
    'INTERCEPT: Skær vejen af ved næste kryds!',
    'SURROUND: Omring fra begge sider, nu!',
    'BLOCK: Spær hovedvejen og pres ham ind!',
  ];
  return canned[Math.floor(Math.random() * canned.length)];
}

// Commentary rate limiting
let lastCommentaryRequest = 0;
const COMMENTARY_COOLDOWN = 5000; // 5 seconds

// Sheriff command rate limiting
let lastSheriffRequest = 0;
const SHERIFF_COOLDOWN = 8000; // 8 seconds between commands

// World Director rate limiting
let lastWorldDirectorRequest = 0;
const WORLD_DIRECTOR_COOLDOWN = 6000; // 6 seconds - faster updates for more dynamic gameplay
let directorMemory = []; // Remember recent spawns for continuity

// World Director system prompt - LLM decides what to spawn AND creates scenarios
const WORLD_DIRECTOR_PROMPT = `Du er en kreativ GAME DIRECTOR for et actionspil. Du skaber dynamiske situationer på vejen.

SVAR KUN MED JSON - ingen anden tekst!

FORMAT:
{
  "scenario": "kort beskrivelse af situationen",
  "objects": [{"type":"TYPE","count":N,"side":"SIDE","moving":BOOL,"speed":N}],
  "event": "EVENT_TYPE eller null",
  "mood": "MOOD_TYPE",
  "director_comment": "kort kommentar til spilleren"
}

OBJEKTTYPER:
- roadblock: Politibarrikade
- cones: Kegler  
- barrier: Betonbarriere
- ramp: Hoppelrampe (sjov!)
- money: Pengesæk (500kr)
- health: Sundhedspakke
- oil: Olieplet (glat!)
- spike: Sømmåtte
- boost: Speed boost
- ambulance: Kørende ambulance (moving:true, speed:80-120)
- truck: Langsom lastbil (moving:true, speed:40-60)
- sports_car: Hurtig sportsvogn (moving:true, speed:150-200)
- explosion: Eksplosion på vejen (farlig!)
- fire: Ild på vejen
- jackpot: Stor pengepræmie (2000kr)
- nitro: Super boost (3x fart i 3 sek)
- shield: Midlertidig usynlighed (5 sek)
- chaos: Spawner tilfældige objekter

EVENTS (valgfri):
- convoy: Række af lastbiler
- race: Sportsvogne kører forbi
- accident: Ulykke på vejen
- money_rain: Mange penge falder
- police_ambush: Ekstra politibiler
- challenge: Særlig udfordring
- boss: Stor forhindring

MOODS:
- intense: Farligt, mange forhindringer
- rewarding: Mange bonusser
- chaotic: Blandet og uforudsigeligt
- calm: Roligt, få objekter
- dramatic: Store events

REGLER:
- Vær KREATIV og overraskende
- Skab SITUATIONER, ikke bare tilfældige objekter
- Tilpas til spillerens tilstand
- Ved lav health: giv håb (health, shield)
- Ved høj fart: skab udfordringer
- Ved lang overlevelse: belønning eller boss
- Brug "moving":true for køretøjer med "speed"
- director_comment skal være sjov/dramatisk på dansk

EKSEMPEL:
{"scenario":"Lastbilkonvoj blokerer vejen","objects":[{"type":"truck","count":3,"side":"center","moving":true,"speed":50},{"type":"ramp","count":1,"side":"left"}],"event":"convoy","mood":"dramatic","director_comment":"Kan du slippe forbi konvojen?!"}`;

// Sheriff system prompt
const SHERIFF_SYSTEM_PROMPT = `Du er Sheriff, en erfaren politichef der koordinerer en biljagt.
Du styrer andre politibiler gennem taktiske kommandoer.
Analyser situationen og giv EN klar, kort ordre på dansk (maks 20 ord).

Kommando-typer du kan give:
- CHASE: Forfølg målrettet (brug når mistænkt er langt væk)
- BLOCK: Bloker flugtruter (brug ved høj fart eller nær bygninger)
- SURROUND: Omring mistænkt (brug når mistænkt er langsom eller fanget)
- SPREAD: Spred jer ud (brug når mistænkt er hurtig og unpredictable)
- RETREAT: Træk tilbage (brug når for mange enheder er ødelagt)
- INTERCEPT: Skær vejen af (brug når du kan forudse mistænkts rute)
- REINFORCE: Tilkald forstærkning (brug når jagten tager for lang tid eller du mangler enheder)

VIGTIGT: Brug REINFORCE kommandoen hvis:
- Jagten har varet over 60 sekunder uden anholdelse
- Flere end halvdelen af dine enheder er ødelagt
- Mistænkts sundhed stadig er høj efter lang tid

Vær kortfattet og autoritær. Brug politijargon.
Format: "[KOMMANDO]: [Kort beskrivelse]"
Eksempel: "REINFORCE: Alle ledige enheder til sektor 7 - NU!"`;

// Helper function to determine reinforcement types based on heat level
function getReinforcementTypes(count, requestedType, heatLevel) {
  const types = [];
  for (let i = 0; i < count; i++) {
    if (requestedType === 'mixed') {
      const rand = Math.random();
      if (heatLevel >= 4 && rand > 0.7) types.push('military');
      else if (heatLevel >= 3 && rand > 0.6) types.push('swat');
      else if (heatLevel >= 2 && rand > 0.5) types.push('interceptor');
      else types.push('standard');
    } else {
      types.push(requestedType);
    }
  }
  return types;
}
function sendErrorResponse(res, statusCode, errorMessage, extraData = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify({ error: errorMessage, ...extraData }));
}

// Helper function to make HTTPS requests
function httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...headers,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Simple HTTP server for static files + discovery endpoint
const httpServer = http.createServer(async (req, res) => {
  // Apply security headers to all responses
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Basic request logging
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // Commentary API endpoint
  if (req.url === '/api/commentary' && req.method === 'POST') {
    if (MPS_DISABLED) {
      // Avoid external calls/noise during automated tests.
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify({ commentary: getFallbackCommentary() }));
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastCommentaryRequest < COMMENTARY_COOLDOWN) {
      sendErrorResponse(res, 429, 'Rate limited', {
        retryAfter: COMMENTARY_COOLDOWN - (now - lastCommentaryRequest),
      });
      return;
    }

    // Check if API key is configured
    if (!MPS_CONFIG.apiKey) {
      sendErrorResponse(res, 503, 'API not configured');
      return;
    }

    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { systemPrompt, eventSummary } = JSON.parse(body);

        if (!eventSummary) {
          sendErrorResponse(res, 400, 'Missing eventSummary');
          return;
        }

        lastCommentaryRequest = now;

        // Build MPS request payload
        const payload = {
          model: MPS_CONFIG.deployment,
          system:
            systemPrompt || 'You are an excited sports commentator. Keep responses under 25 words.',
          messages: [{ role: 'user', content: eventSummary }],
          max_tokens: MPS_CONFIG.maxTokens,
        };

        if (!MPS_CONFIG.endpoint) {
          throw new Error('MPS_ENDPOINT is not configured');
        }

        const endpoint = MPS_CONFIG.endpoint;
        const headers = {
          Authorization: `Bearer ${MPS_CONFIG.apiKey}`,
          'api-key': MPS_CONFIG.apiKey,
          'anthropic-version': MPS_CONFIG.anthropicVersion,
        };

        console.log('[Commentary] Requesting from MPS...');
        const mpsResponse = await httpsPost(endpoint, headers, JSON.stringify(payload));

        if (mpsResponse.status !== 200) {
          console.error('[Commentary] MPS error:', mpsResponse.status, mpsResponse.data);
          sendErrorResponse(res, 502, 'LLM request failed', { status: mpsResponse.status });
          return;
        }

        const mpsData = JSON.parse(mpsResponse.data);
        let commentary = '';

        // Extract text from Anthropic response format
        if (mpsData.content && Array.isArray(mpsData.content) && mpsData.content[0]?.text) {
          commentary = mpsData.content[0].text;
        }

        console.log('[Commentary] Received:', commentary);

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({ commentary }));
      } catch (err) {
        console.error('[Commentary] Error:', err);
        sendErrorResponse(res, 500, 'Internal server error');
      }
    });
    return;
  }

  // Sheriff Command API endpoint
  if (req.url === '/api/sheriff-command' && req.method === 'POST') {
    if (MPS_DISABLED) {
      // Avoid external calls/noise during automated tests.
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify({ command: getFallbackSheriffCommand() }));
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastSheriffRequest < SHERIFF_COOLDOWN) {
      sendErrorResponse(res, 429, 'Rate limited', {
        retryAfter: SHERIFF_COOLDOWN - (now - lastSheriffRequest),
      });
      return;
    }

    // Check if API key is configured
    if (!MPS_CONFIG.apiKey) {
      sendErrorResponse(res, 503, 'API not configured');
      return;
    }

    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const gameState = JSON.parse(body);

        if (!gameState) {
          sendErrorResponse(res, 400, 'Missing game state');
          return;
        }

        lastSheriffRequest = now;

        // Build context about game state
        const context = `Situation rapport:
- Mistænkts fart: ${gameState.playerSpeed} km/t
- Aktive enheder: ${gameState.policeCount}
- Ødelagte enheder: ${gameState.policeDestroyed}
- Heat level: ${gameState.heatLevel}/6
- Afstand til mistænkt: ${gameState.distanceToPlayer}m
- Mistænkts sundhed: ${gameState.playerHealth}%
- Tid i jagt: ${gameState.survivalTime}s
${gameState.recentEvents ? `- Seneste events: ${gameState.recentEvents}` : ''}`;

        // Build MPS request payload
        const payload = {
          model: MPS_CONFIG.deployment,
          system: SHERIFF_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: context }],
          max_tokens: 128,
        };

        if (!MPS_CONFIG.endpoint) {
          throw new Error('MPS_ENDPOINT is not configured');
        }

        const endpoint = MPS_CONFIG.endpoint;
        const headers = {
          Authorization: `Bearer ${MPS_CONFIG.apiKey}`,
          'api-key': MPS_CONFIG.apiKey,
          'anthropic-version': MPS_CONFIG.anthropicVersion,
        };

        console.log('[Sheriff] Requesting tactical command from MPS...');
        const mpsResponse = await httpsPost(endpoint, headers, JSON.stringify(payload));

        if (mpsResponse.status !== 200) {
          console.error('[Sheriff] MPS error:', mpsResponse.status, mpsResponse.data);
          sendErrorResponse(res, 502, 'LLM request failed', { status: mpsResponse.status });
          return;
        }

        const mpsData = JSON.parse(mpsResponse.data);
        let command = '';

        // Extract text from Anthropic response format
        if (mpsData.content && Array.isArray(mpsData.content) && mpsData.content[0]?.text) {
          command = mpsData.content[0].text;
        }

        console.log('[Sheriff] Command issued:', command);

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({ command }));
      } catch (err) {
        console.error('[Sheriff] Error:', err);
        sendErrorResponse(res, 500, 'Internal server error');
      }
    });
    return;
  }

  // Spawn Reinforcements API endpoint - Sheriff can call for backup
  if (req.url === '/api/spawn-reinforcements' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { count, type, heatLevel } = JSON.parse(body);

        // Validate input
        const spawnCount = Math.min(Math.max(1, count || 4), 6); // Clamp 1-6
        const validTypes = ['standard', 'interceptor', 'swat', 'military', 'mixed'];
        const spawnType = validTypes.includes(type) ? type : 'mixed';
        const currentHeatLevel = Math.min(Math.max(1, heatLevel || 1), 6);

        // Determine unit types to spawn
        const unitTypes = getReinforcementTypes(spawnCount, spawnType, currentHeatLevel);

        console.log(
          `[Sheriff] Reinforcements requested: ${spawnCount} units of type "${spawnType}" at heat level ${currentHeatLevel}`
        );
        console.log(`[Sheriff] Spawning: ${unitTypes.join(', ')}`);

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(
          JSON.stringify({
            success: true,
            spawned: spawnCount,
            types: unitTypes,
            message: `${spawnCount} reinforcement units dispatched`,
          })
        );
      } catch (err) {
        console.error('[Sheriff] Reinforcement error:', err);
        sendErrorResponse(res, 500, 'Internal server error');
      }
    });
    return;
  }

  // World Director API endpoint - LLM decides what objects to spawn
  if (req.url === '/api/world-director' && req.method === 'POST') {
    if (MPS_DISABLED) {
      // Return random fallback during tests
      const fallbackObjects = [
        { type: 'money', count: 2, side: 'random' },
        { type: 'ramp', count: 1, side: 'center' },
        { type: 'cones', count: 3, side: 'random' },
      ];
      const randomObj = fallbackObjects[Math.floor(Math.random() * fallbackObjects.length)];
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify({ objects: [randomObj] }));
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastWorldDirectorRequest < WORLD_DIRECTOR_COOLDOWN) {
      sendErrorResponse(res, 429, 'Rate limited', {
        retryAfter: WORLD_DIRECTOR_COOLDOWN - (now - lastWorldDirectorRequest),
      });
      return;
    }

    // Check if API key is configured
    if (!MPS_CONFIG.apiKey) {
      sendErrorResponse(res, 503, 'API not configured');
      return;
    }

    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const gameContext = JSON.parse(body);

        lastWorldDirectorRequest = now;

        // Build richer context with history
        const recentHistory = directorMemory
          .slice(-3)
          .map((m) => m.scenario)
          .join(', ');

        // Build context about current game state
        const context = `SPILLER STATUS:
- Fart: ${gameContext.speed} km/t ${gameContext.speed > 150 ? '(HURTIG!)' : gameContext.speed < 50 ? '(langsom)' : ''}
- Sundhed: ${gameContext.health}% ${gameContext.health < 30 ? '(KRITISK!)' : gameContext.health < 50 ? '(lav)' : ''}
- Heat level: ${gameContext.heatLevel}/6 ${gameContext.heatLevel >= 4 ? '(INTENS JAGT!)' : ''}
- Penge samlet: ${gameContext.money} kr
- Politibiler efter: ${gameContext.policeCount} ${gameContext.policeCount > 5 ? '(MANGE!)' : ''}
- Tid overlevt: ${gameContext.survivalTime}s ${gameContext.survivalTime > 120 ? '(IMPONERENDE!)' : ''}
- Kørselsretning: ${gameContext.direction}
${gameContext.recentEvents ? `- Seneste events: ${gameContext.recentEvents}` : ''}
${gameContext.playerBehavior ? `- Spillestil: ${gameContext.playerBehavior}` : ''}

SENESTE SCENARIER: ${recentHistory || 'Ingen endnu'}

Skab et DYNAMISK SCENARIE! Vær kreativ og overraskende. Svar KUN med JSON.`;

        // Build MPS request payload
        const payload = {
          model: MPS_CONFIG.deployment,
          system: WORLD_DIRECTOR_PROMPT,
          messages: [{ role: 'user', content: context }],
          max_tokens: 400,
        };

        if (!MPS_CONFIG.endpoint) {
          throw new Error('MPS_ENDPOINT is not configured');
        }

        const endpoint = MPS_CONFIG.endpoint;
        const headers = {
          Authorization: `Bearer ${MPS_CONFIG.apiKey}`,
          'api-key': MPS_CONFIG.apiKey,
          'anthropic-version': MPS_CONFIG.anthropicVersion,
        };

        console.log('[WorldDirector] Requesting spawn decision from LLM...');
        const mpsResponse = await httpsPost(endpoint, headers, JSON.stringify(payload));

        if (mpsResponse.status !== 200) {
          console.error('[WorldDirector] MPS error:', mpsResponse.status, mpsResponse.data);
          sendErrorResponse(res, 502, 'LLM request failed', { status: mpsResponse.status });
          return;
        }

        const mpsData = JSON.parse(mpsResponse.data);
        let responseText = '';

        // Extract text from Anthropic response format
        if (mpsData.content && Array.isArray(mpsData.content) && mpsData.content[0]?.text) {
          responseText = mpsData.content[0].text;
        }

        console.log('[WorldDirector] LLM Response:', responseText);

        // Parse the JSON response
        let spawnData = {
          objects: [],
          scenario: '',
          event: null,
          mood: 'calm',
          director_comment: '',
        };
        try {
          // Try to extract JSON from the response
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            spawnData = JSON.parse(jsonMatch[0]);
          }
        } catch (parseErr) {
          console.warn('[WorldDirector] Failed to parse LLM response, using fallback');
          spawnData = {
            objects: [{ type: 'money', count: 2, side: 'random' }],
            scenario: 'Bonus penge på vejen!',
            mood: 'rewarding',
            director_comment: 'Tag dem!',
          };
        }

        // Store in memory for continuity
        if (spawnData.scenario) {
          directorMemory.push({
            scenario: spawnData.scenario,
            time: Date.now(),
            mood: spawnData.mood,
          });
          // Keep only last 10 scenarios
          if (directorMemory.length > 10) directorMemory.shift();
        }

        // Validate and sanitize the spawn data
        const validTypes = [
          'roadblock',
          'cones',
          'barrier',
          'ramp',
          'money',
          'health',
          'oil',
          'spike',
          'boost',
          'ambulance',
          'truck',
          'sports_car',
          'explosion',
          'fire',
          'jackpot',
          'nitro',
          'shield',
          'chaos',
        ];
        const validSides = ['left', 'right', 'center', 'random'];
        const validEvents = [
          'convoy',
          'race',
          'accident',
          'money_rain',
          'police_ambush',
          'challenge',
          'boss',
          null,
        ];
        const validMoods = ['intense', 'rewarding', 'chaotic', 'calm', 'dramatic'];

        if (spawnData.objects && Array.isArray(spawnData.objects)) {
          spawnData.objects = spawnData.objects
            .filter((obj) => validTypes.includes(obj.type))
            .map((obj) => ({
              type: obj.type,
              count: Math.min(Math.max(1, obj.count || 1), 8),
              side: validSides.includes(obj.side) ? obj.side : 'random',
              moving: obj.moving || false,
              speed: obj.speed ? Math.min(Math.max(20, obj.speed), 250) : 0,
            }))
            .slice(0, 8); // Max 8 object groups for scenarios
        }

        // Validate event and mood
        spawnData.event = validEvents.includes(spawnData.event) ? spawnData.event : null;
        spawnData.mood = validMoods.includes(spawnData.mood) ? spawnData.mood : 'calm';

        console.log('[WorldDirector] Scenario:', spawnData.scenario);
        console.log('[WorldDirector] Director says:', spawnData.director_comment);
        console.log('[WorldDirector] Spawning:', JSON.stringify(spawnData.objects));

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify(spawnData));
      } catch (err) {
        console.error('[WorldDirector] Error:', err);
        sendErrorResponse(res, 500, 'Internal server error');
      }
    });
    return;
  }

  // Discovery endpoint for LAN server scanning
  if (req.url === '/api/discover') {
    const room = rooms.get(DEFAULT_ROOM);
    const playerCount = room ? room.players.size : 0;
    const serverInfo = {
      name: 'Flugt fra Politiet Server',
      room: DEFAULT_ROOM,
      players: playerCount,
      maxPlayers: 4,
      gameStarted: room ? room.gameStarted : false,
      version: '1.0',
    };
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify(serverInfo));
    return;
  }

  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';
  if (filePath === './start' || filePath === './start/') filePath = './index.html';
  if (filePath === './config' || filePath === './config/') filePath = './config.html';
  if (filePath === './editor' || filePath === './editor/') filePath = './index.html';

  const extname = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
  };

  const contentType = contentTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + err.code);
      }
    } else {
      // Apply cache headers based on file type
      const headers = { 'Content-Type': contentType };
      
      // HTML files - short cache
      if (extname === '.html') {
        headers['Cache-Control'] = CACHE_SETTINGS.short;
      }
      // JS files - no cache during development to ensure fresh code
      else if (extname === '.js') {
        headers['Cache-Control'] = 'no-cache, must-revalidate';
      }
      // Static assets (CSS, images, fonts) - long cache
      else if (['.css', '.png', '.jpg', '.woff', '.woff2', '.svg'].includes(extname)) {
        headers['Cache-Control'] = CACHE_SETTINGS.immutable;
      }
      // Audio files - medium cache
      else if (['.wav', '.mp3', '.ogg'].includes(extname)) {
        headers['Cache-Control'] = 'public, max-age=86400';
      }
      
      res.writeHead(200, headers);
      res.end(content, 'utf-8');
    }
  });
});

// WebSocket server for game sync
const wss = new WebSocketServer({ port: WS_PORT });

// Game rooms storage
const rooms = new Map();

// Player colors
const playerColors = [0xff0000, 0x0066ff, 0x00ff00, 0xffaa00];

// Initialize the default room on startup
function initDefaultRoom() {
  rooms.set(DEFAULT_ROOM, {
    hostId: null,
    players: new Map(),
    gameStarted: false,
    gameState: null,
    gameConfig: {
      touchArrest: true,
      dropInEnabled: true,
    },
  });
  console.log(`📦 Default room '${DEFAULT_ROOM}' created and ready for players`);
}

// Get next available color for a room
function getNextColor(room) {
  const usedColors = new Set();
  room.players.forEach((p) => usedColors.add(p.color));
  for (const color of playerColors) {
    if (!usedColors.has(color)) return color;
  }
  return 0xffffff; // Fallback white
}

// Broadcast to all players in a room except sender
function broadcastToRoom(roomCode, message, excludeId = null) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const data = JSON.stringify(message);
  room.players.forEach((player, id) => {
    if (id !== excludeId && player.ws.readyState === 1) {
      player.ws.send(data);
    }
  });
}

// Broadcast to ALL players in room including sender
function broadcastToAll(roomCode, message) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const data = JSON.stringify(message);
  room.players.forEach((player) => {
    if (player.ws.readyState === 1) {
      player.ws.send(data);
    }
  });
}

// Assign new host when current host leaves
function assignNewHost(room, roomCode) {
  if (room.players.size === 0) {
    room.hostId = null;
    room.gameStarted = false;
    console.log(`🔄 Room ${roomCode} reset (no players)`);
    return;
  }

  const newHostId = room.players.keys().next().value;
  room.hostId = newHostId;
  const newHost = room.players.get(newHostId);
  if (newHost) {
    newHost.isHost = true;

    // Notify everyone
    broadcastToAll(roomCode, {
      type: 'hostChanged',
      newHostId,
      newHostName: newHost.name,
    });
    console.log(`👑 New host in ${roomCode}: ${newHost.name}`);
  }
}

wss.on('connection', (ws) => {
  let playerId = null;
  let currentRoom = null;

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);

      switch (msg.type) {
        case 'join': {
          // Everyone joins the same way now
          const roomCode = msg.roomCode || DEFAULT_ROOM;
          const room = rooms.get(roomCode);

          if (!room) {
            ws.send(JSON.stringify({ type: 'error', message: 'Rum findes ikke' }));
            return;
          }
          if (room.players.size >= 4) {
            ws.send(
              JSON.stringify({ type: 'error', message: 'Rummet er fyldt (maks 4 spillere)' })
            );
            return;
          }

          playerId = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
          currentRoom = roomCode;

          const color = getNextColor(room);
          const isFirstPlayer = room.players.size === 0;
          const willBeHost = isFirstPlayer || !room.hostId;
          const role = msg.role || 'contester';

          room.players.set(playerId, {
            ws,
            name: msg.playerName || 'Spiller',
            isHost: willBeHost,
            car: msg.car || 'standard',
            role,
            color: color,
            state: null,
          });

          if (willBeHost) {
            room.hostId = playerId;
            console.log(`👑 ${msg.playerName || 'Spiller'} joined as HOST`);
          } else {
            console.log(`🎮 ${msg.playerName || 'Spiller'} joined the game`);
          }

          // Get player list
          const playerList = [];
          room.players.forEach((p, id) => {
            playerList.push({
              id,
              name: p.name,
              isHost: id === room.hostId,
              car: p.car,
              role: p.role || 'contester',
              color: p.color,
            });
          });

          // If game already started, do drop-in join
          if (room.gameStarted) {
            if (room.gameConfig && room.gameConfig.dropInEnabled === false) {
              ws.send(
                JSON.stringify({
                  type: 'error',
                  message: 'Spillet er i gang - drop-in er ikke aktiveret',
                })
              );
              room.players.delete(playerId);
              return;
            }

            // Spawn positions for drop-in
            const spawnPositions = [
              { x: 0, z: 0 },
              { x: 50, z: 0 },
              { x: -50, z: 0 },
              { x: 0, z: 50 },
            ];

            const playerData = [];
            let idx = 0;
            room.players.forEach((p, id) => {
              playerData.push({
                id,
                name: p.name,
                isHost: id === room.hostId,
                car: p.car,
                role: p.role || 'contester',
                color: p.color,
                spawnPos: spawnPositions[idx % spawnPositions.length],
              });
              idx++;
            });

            ws.send(
              JSON.stringify({
                type: 'joined',
                roomCode,
                playerId,
                players: playerList,
                isHost: willBeHost,
              })
            );

            // Immediately start game for this player (drop-in)
            ws.send(
              JSON.stringify({
                type: 'gameStart',
                players: playerData,
                config: room.gameConfig || {},
                dropIn: true,
              })
            );

            // Notify existing players
            broadcastToRoom(
              roomCode,
              {
                type: 'playerJoined',
                player: {
                  id: playerId,
                  name: msg.playerName || 'Spiller',
                  isHost: willBeHost,
                  car: msg.car,
                  role,
                  color: color,
                },
                players: playerList,
                dropIn: true,
              },
              playerId
            );

            console.log(`⚡ ${msg.playerName || 'Spiller'} dropped into running game`);
          } else {
            // Normal pre-game join
            ws.send(
              JSON.stringify({
                type: 'joined',
                roomCode,
                playerId,
                players: playerList,
                isHost: willBeHost,
              })
            );

            // Notify everyone else
            broadcastToRoom(
              roomCode,
              {
                type: 'playerJoined',
                player: {
                  id: playerId,
                  name: msg.playerName || 'Spiller',
                  isHost: willBeHost,
                  car: msg.car,
                  role,
                  color: color,
                },
                players: playerList,
              },
              playerId
            );
          }
          break;
        }

        case 'startGame': {
          // Host starts the game
          const room = rooms.get(currentRoom);
          if (!room || room.hostId !== playerId) {
            ws.send(JSON.stringify({ type: 'error', message: 'Kun værten kan starte spillet' }));
            return;
          }

          room.gameStarted = true;
          room.gameConfig = msg.config || { touchArrest: true, dropInEnabled: true };

          // Assign spawn positions
          const spawnPositions = [
            { x: 0, z: 0 },
            { x: 50, z: 0 },
            { x: -50, z: 0 },
            { x: 0, z: 50 },
          ];

          let idx = 0;
          const playerData = [];
          room.players.forEach((p, id) => {
            playerData.push({
              id,
              name: p.name,
              isHost: id === room.hostId,
              car: p.car,
              role: p.role || 'contester',
              color: p.color,
              spawnPos: spawnPositions[idx % spawnPositions.length],
            });
            idx++;
          });

          broadcastToAll(currentRoom, {
            type: 'gameStart',
            players: playerData,
            config: room.gameConfig,
          });

          console.log(`🚀 Game started in ${currentRoom} with ${room.players.size} players`);
          break;
        }

        case 'playerState': {
          // Player position/state update
          const room = rooms.get(currentRoom);
          if (!room) return;

          const player = room.players.get(playerId);
          if (player) {
            player.state = msg.state;
          }

          broadcastToRoom(
            currentRoom,
            {
              type: 'playerState',
              playerId,
              state: msg.state,
            },
            playerId
          );
          break;
        }

        case 'updateCarSelection': {
          // Player updates their car selection in lobby
          const room = rooms.get(currentRoom);
          if (!room) return;

          const player = room.players.get(playerId);
          if (player) {
            player.car = msg.car || 'standard';
            console.log(`🚗 ${player.name} changed car to: ${player.car}`);
            
            // Build updated player list
            const playerList = [];
            room.players.forEach((p, id) => {
              playerList.push({
                id,
                name: p.name,
                isHost: id === room.hostId,
                car: p.car,
                role: p.role || 'contester',
                color: p.color,
              });
            });

            // Notify all players about the car change
            broadcastToAll(currentRoom, {
              type: 'playerCarUpdated',
              playerId,
              car: player.car,
              players: playerList
            });
          }
          break;
        }

        case 'policeState': {
          // Host broadcasts police state
          const room = rooms.get(currentRoom);
          if (!room || room.hostId !== playerId) return;

          broadcastToRoom(
            currentRoom,
            {
              type: 'policeState',
              police: msg.police,
            },
            playerId
          );
          break;
        }

        case 'gameEvent': {
          const room = rooms.get(currentRoom);
          if (!room) return;

          broadcastToRoom(
            currentRoom,
            {
              type: 'gameEvent',
              playerId,
              event: msg.event,
              data: msg.data,
            },
            playerId
          );
          break;
        }

        case 'respawn': {
          const room = rooms.get(currentRoom);
          if (!room || !room.gameStarted) return;

          if (room.gameConfig && room.gameConfig.dropInEnabled === false) {
            ws.send(
              JSON.stringify({
                type: 'error',
                message: 'Drop-in er ikke aktiveret',
              })
            );
            return;
          }

          const spawnPositions = [
            { x: 0, z: 0 },
            { x: 50, z: 0 },
            { x: -50, z: 0 },
            { x: 0, z: 50 },
            { x: -50, z: 50 },
            { x: 50, z: -50 },
          ];
          const spawnPos = spawnPositions[Math.floor(Math.random() * spawnPositions.length)];

          // Update player's car if specified
          const player = room.players.get(playerId);
          const newCar = msg.car || (player ? player.car : 'standard');
          if (player && msg.car) {
            player.car = msg.car;
            console.log(`🚗 Player changed car to: ${msg.car}`);
          }

          ws.send(
            JSON.stringify({
              type: 'respawned',
              spawnPos,
              car: newCar,
              resetHeat: room.players.size === 1, // Reset heat if player is alone
            })
          );

          broadcastToRoom(
            currentRoom,
            {
              type: 'gameEvent',
              playerId,
              event: 'respawned',
              data: { spawnPos, car: newCar },
            },
            playerId
          );

          console.log(
            `🔄 Player respawned with ${newCar}${room.players.size === 1 ? ' (heat reset - solo)' : ''}`
          );
          break;
        }

        case 'chat': {
          const room = rooms.get(currentRoom);
          if (!room) return;

          const player = room.players.get(playerId);
          broadcastToAll(currentRoom, {
            type: 'chat',
            playerId,
            playerName: player?.name || 'Unknown',
            message: msg.message,
          });
          break;
        }

        case 'resetGame': {
          // Host can reset the game to lobby state
          const room = rooms.get(currentRoom);
          if (!room || room.hostId !== playerId) return;

          room.gameStarted = false;
          broadcastToAll(currentRoom, {
            type: 'gameReset',
          });
          console.log(`🔄 Game reset by host`);
          break;
        }
      }
    } catch (e) {
      console.error('Message parse error:', e);
    }
  });

  ws.on('close', () => {
    if (currentRoom && playerId) {
      const room = rooms.get(currentRoom);
      if (room) {
        const wasHost = room.hostId === playerId;
        const playerName = room.players.get(playerId)?.name || 'Unknown';
        room.players.delete(playerId);

        if (room.players.size === 0) {
          // Reset room but keep it (persistent server)
          room.hostId = null;
          room.gameStarted = false;
          console.log(`🔄 Room ${currentRoom} reset (empty)`);
        } else {
          // Notify others
          broadcastToRoom(currentRoom, {
            type: 'playerLeft',
            playerId,
            playerName,
          });

          if (wasHost) {
            assignNewHost(room, currentRoom);
          }
        }

        console.log(`👋 ${playerName} left (${room.players.size} remaining)`);
      }
    }
  });
});

// Initialize default room
initDefaultRoom();

httpServer.listen(PORT, '0.0.0.0', () => {
  const interfaces = require('os').networkInterfaces();
  let lanIP = 'localhost';

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        lanIP = iface.address;
        break;
      }
    }
  }

  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║      🚔  FLUGT FRA POLITIET - PERSISTENT SERVER  🚔       ║');
  console.log('╠═══════════════════════════════════════════════════════════╣');
  console.log(`║  Local:    http://localhost:${PORT}                          ║`);
  console.log(`║  Network:  http://${lanIP}:${PORT}                       ║`);
  console.log('╠═══════════════════════════════════════════════════════════╣');
  console.log('║  🎮 Server kører altid - alle kan joine når som helst!    ║');
  console.log('║  📱 Del Network URL med venner på samme netværk           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
});
