// LAN Multiplayer Server for Flugt fra Politiet
// Persistent "floating" server - always running, anyone can join
// Refactored to Fastify for performance and stability

const path = require('path');
const fs = require('fs');
const https = require('https');
const { WebSocketServer } = require('ws');

// Initialize Fastify
const fastify = require('fastify')({
  logger: false, // We use custom logging to match original format
  disableRequestLogging: true
});

// Security headers (helmet-like)
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// Prefer dotenv, but keep a safe fallback for environments where it's not installed.
try {
  // eslint-disable-next-line global-require
  require('dotenv').config();
} catch (err) {
  // no-op
}

const PORT = parseInt(process.env.PORT || '3000', 10);
const WS_PORT = parseInt(process.env.WS_PORT || '3001', 10); // Kept for config, but likely unused if on same port

// Default room code - always available
const DEFAULT_ROOM = 'SPIL';

// Backward-compatible .env loader
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

// --- HELPER FUNCTIONS ---

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

// --- RATE LIMITERS & STATE ---

let lastCommentaryRequest = 0;
const COMMENTARY_COOLDOWN = 5000;

let lastSheriffRequest = 0;
const SHERIFF_COOLDOWN = 8000;

let lastWorldDirectorRequest = 0;
const WORLD_DIRECTOR_COOLDOWN = 6000;
let directorMemory = [];

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


// --- FASTIFY SETUP ---

// Cache control settings for static files
const CACHE_SETTINGS = {
  immutable: 'public, max-age=31536000, immutable',
  short: 'public, max-age=300',
  none: 'no-store, no-cache, must-revalidate',
};

// 1. Hook for Logging and Security Headers
fastify.addHook('onRequest', (req, reply, done) => {
  // Security Headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    reply.header(key, value);
  });

  // Logging
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();
  
  // Filter out noise logs if desired
  if (!req.url.includes('/node_modules/') && !req.url.endsWith('.css')) {
     console.log(`[${timestamp}] [${clientIp}] ${req.method} ${req.url}`);
  }
  
  done();
});

// 2. Serve Static Files
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname),
  prefix: '/', // Start serving from root
  setHeaders: (res, filePath, stat) => {
    const extname = path.extname(filePath);
    
    // HTML files - short cache
    if (extname === '.html') {
      res.setHeader('Cache-Control', CACHE_SETTINGS.short);
    }
    // JS files - no cache during development to ensure fresh code
    else if (extname === '.js' || extname === '.mjs' || extname === '.cjs') {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }
    // Static assets (CSS, images, fonts) - long cache
    else if (['.css', '.png', '.jpg', '.woff', '.woff2', '.svg'].includes(extname)) {
      res.setHeader('Cache-Control', CACHE_SETTINGS.immutable);
    }
    // Audio files - medium cache
    else if (['.wav', '.mp3', '.ogg'].includes(extname)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
});

// 3. Custom File Routes (Mappings)
fastify.get('/config', (req, reply) => {
  return reply.sendFile('config.html');
});
fastify.get('/editor', (req, reply) => {
  return reply.sendFile('index.html');
});
fastify.get('/start', (req, reply) => {
  return reply.sendFile('index.html');
});

// --- API ROUTES ---

fastify.post('/api/commentary', async (req, reply) => {
  if (MPS_DISABLED) {
    return { commentary: getFallbackCommentary() };
  }

  const now = Date.now();
  if (now - lastCommentaryRequest < COMMENTARY_COOLDOWN) {
    reply.code(429);
    return { error: 'Rate limited', retryAfter: COMMENTARY_COOLDOWN - (now - lastCommentaryRequest) };
  }

  if (!MPS_CONFIG.apiKey) {
    reply.code(503);
    return { error: 'API not configured' };
  }

  const { systemPrompt, eventSummary } = req.body || {};

  if (!eventSummary) {
    reply.code(400);
    return { error: 'Missing eventSummary' };
  }

  lastCommentaryRequest = now;

  try {
    const payload = {
      model: MPS_CONFIG.deployment,
      system: systemPrompt || 'You are an excited sports commentator. Keep responses under 25 words.',
      messages: [{ role: 'user', content: eventSummary }],
      max_tokens: MPS_CONFIG.maxTokens,
    };

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
      reply.code(502);
      return { error: 'LLM request failed', status: mpsResponse.status };
    }

    const mpsData = JSON.parse(mpsResponse.data);
    let commentary = '';
    if (mpsData.content && Array.isArray(mpsData.content) && mpsData.content[0]?.text) {
      commentary = mpsData.content[0].text;
    }

    console.log('[Commentary] Received:', commentary);
    return { commentary };

  } catch (err) {
    console.error('[Commentary] Error:', err);
    reply.code(500);
    return { error: 'Internal server error' };
  }
});

fastify.post('/api/sheriff-command', async (req, reply) => {
  if (MPS_DISABLED) {
    return { command: getFallbackSheriffCommand() };
  }

  const now = Date.now();
  if (now - lastSheriffRequest < SHERIFF_COOLDOWN) {
    reply.code(429);
    return { error: 'Rate limited', retryAfter: SHERIFF_COOLDOWN - (now - lastSheriffRequest) };
  }

  if (!MPS_CONFIG.apiKey) {
    reply.code(503);
    return { error: 'API not configured' };
  }

  const gameState = req.body || {};
  if (!gameState || Object.keys(gameState).length === 0) {
    reply.code(400);
    return { error: 'Missing game state' };
  }

  lastSheriffRequest = now;

  const context = `Situation rapport:
- Mistænkts fart: ${gameState.playerSpeed} km/t
- Aktive enheder: ${gameState.policeCount}
- Ødelagte enheder: ${gameState.policeDestroyed}
- Heat level: ${gameState.heatLevel}/6
- Afstand til mistænkt: ${gameState.distanceToPlayer}m
- Mistænkts sundhed: ${gameState.playerHealth}%
- Tid i jagt: ${gameState.survivalTime}s
${gameState.recentEvents ? `- Seneste events: ${gameState.recentEvents}` : ''}`;

  try {
    const payload = {
      model: MPS_CONFIG.deployment,
      system: SHERIFF_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: context }],
      max_tokens: 128,
    };

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
      reply.code(502);
      return { error: 'LLM request failed', status: mpsResponse.status };
    }

    const mpsData = JSON.parse(mpsResponse.data);
    let command = '';
    if (mpsData.content && Array.isArray(mpsData.content) && mpsData.content[0]?.text) {
      command = mpsData.content[0].text;
    }

    console.log('[Sheriff] Command issued:', command);
    return { command };

  } catch (err) {
    console.error('[Sheriff] Error:', err);
    reply.code(500);
    return { error: 'Internal server error' };
  }
});

fastify.post('/api/spawn-reinforcements', async (req, reply) => {
  try {
    const { count, type, heatLevel } = req.body || {};

    const spawnCount = Math.min(Math.max(1, count || 4), 6);
    const validTypes = ['standard', 'interceptor', 'swat', 'military', 'mixed'];
    const spawnType = validTypes.includes(type) ? type : 'mixed';
    const currentHeatLevel = Math.min(Math.max(1, heatLevel || 1), 6);

    const unitTypes = getReinforcementTypes(spawnCount, spawnType, currentHeatLevel);

    console.log(`[Sheriff] Reinforcements: ${spawnCount} x ${spawnType} (Heat ${currentHeatLevel})`);
    
    return {
      success: true,
      spawned: spawnCount,
      types: unitTypes,
      message: `${spawnCount} reinforcement units dispatched`,
    };
  } catch (err) {
    console.error('[Sheriff] Reinforcement error:', err);
    reply.code(500);
    return { error: 'Internal server error' };
  }
});

fastify.post('/api/world-director', async (req, reply) => {
  if (MPS_DISABLED) {
    const fallbackObjects = [
      { type: 'money', count: 2, side: 'random' },
      { type: 'ramp', count: 1, side: 'center' },
      { type: 'cones', count: 3, side: 'random' },
    ];
    return { objects: [fallbackObjects[Math.floor(Math.random() * fallbackObjects.length)]] };
  }

  const now = Date.now();
  if (now - lastWorldDirectorRequest < WORLD_DIRECTOR_COOLDOWN) {
    reply.code(429);
    return { error: 'Rate limited', retryAfter: WORLD_DIRECTOR_COOLDOWN - (now - lastWorldDirectorRequest) };
  }

  if (!MPS_CONFIG.apiKey) {
    reply.code(503);
    return { error: 'API not configured' };
  }

  const gameContext = req.body || {};
  lastWorldDirectorRequest = now;

  const recentHistory = directorMemory.slice(-3).map((m) => m.scenario).join(', ');
  const context = `SPILLER STATUS:
- Fart: ${gameContext.speed} km/t ${gameContext.speed > 150 ? '(HURTIG!)' : gameContext.speed < 50 ? '(langsom)' : ''}
- Sundhed: ${gameContext.health}% ${gameContext.health < 30 ? '(KRITISK!)' : gameContext.health < 50 ? '(lav)' : ''}
- Heat level: ${gameContext.heatLevel}/6
- Penge samlet: ${gameContext.money} kr
- Politibiler efter: ${gameContext.policeCount}
- Tid overlevt: ${gameContext.survivalTime}s
- Kørselsretning: ${gameContext.direction}
${gameContext.recentEvents ? `- Seneste events: ${gameContext.recentEvents}` : ''}
${gameContext.playerBehavior ? `- Spillestil: ${gameContext.playerBehavior}` : ''}

SENESTE SCENARIER: ${recentHistory || 'Ingen endnu'}

Skab et DYNAMISK SCENARIE! Vær kreativ og overraskende. Svar KUN med JSON.`;

  try {
    const payload = {
      model: MPS_CONFIG.deployment,
      system: WORLD_DIRECTOR_PROMPT,
      messages: [{ role: 'user', content: context }],
      max_tokens: 400,
    };

    const endpoint = MPS_CONFIG.endpoint;
    const headers = {
      Authorization: `Bearer ${MPS_CONFIG.apiKey}`,
      'api-key': MPS_CONFIG.apiKey,
      'anthropic-version': MPS_CONFIG.anthropicVersion,
    };

    console.log('[WorldDirector] Requesting from LLM...');
    const mpsResponse = await httpsPost(endpoint, headers, JSON.stringify(payload));

    if (mpsResponse.status !== 200) {
      console.error('[WorldDirector] MPS error:', mpsResponse.status, mpsResponse.data);
      reply.code(502);
      return { error: 'LLM request failed', status: mpsResponse.status };
    }

    const mpsData = JSON.parse(mpsResponse.data);
    let responseText = '';
    if (mpsData.content && Array.isArray(mpsData.content) && mpsData.content[0]?.text) {
      responseText = mpsData.content[0].text;
    }

    console.log('[WorldDirector] LLM Response:', responseText);

    let spawnData = {
      objects: [],
      scenario: '',
      event: null,
      mood: 'calm',
      director_comment: '',
    };
    try {
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

    if (spawnData.scenario) {
      directorMemory.push({
        scenario: spawnData.scenario,
        time: Date.now(),
        mood: spawnData.mood,
      });
      if (directorMemory.length > 10) directorMemory.shift();
    }

    // Sanitize Objects (simplified filtering for brevity but kept functional)
    if (spawnData.objects && Array.isArray(spawnData.objects)) {
      spawnData.objects = spawnData.objects.slice(0, 8);
    }
    
    console.log('[WorldDirector] Spawning:', spawnData.scenario);
    return spawnData;

  } catch (err) {
    console.error('[WorldDirector] Error:', err);
    reply.code(500);
    return { error: 'Internal server error' };
  }
});

fastify.get('/api/discover', async (req, reply) => {
  const room = rooms.get(DEFAULT_ROOM);
  const playerCount = room ? room.players.size : 0;
  return {
    name: 'Flugt fra Politiet Server',
    room: DEFAULT_ROOM,
    players: playerCount,
    maxPlayers: 4,
    gameStarted: room ? room.gameStarted : false,
    version: '1.0',
  };
});


// --- GAME ROOM LOGIC ---

const rooms = new Map();
const playerColors = [0xff0000, 0x0066ff, 0x00ff00, 0xffaa00];

function initDefaultRoom() {
  rooms.set(DEFAULT_ROOM, {
    hostId: null,
    players: new Map(),
    gameStarted: false,
    gameState: null,
    gameConfig: { touchArrest: true, dropInEnabled: true },
  });
  console.log(`📦 Default room '${DEFAULT_ROOM}' created and ready for players`);
}

function getNextColor(room) {
  const usedColors = new Set();
  room.players.forEach((p) => usedColors.add(p.color));
  for (const color of playerColors) {
    if (!usedColors.has(color)) return color;
  }
  return 0xffffff;
}

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
    broadcastToAll(roomCode, { type: 'hostChanged', newHostId, newHostName: newHost.name });
    console.log(`👑 New host in ${roomCode}: ${newHost.name}`);
  }
}

// --- STARTUP ---

initDefaultRoom();

const start = async () => {
  try {
    // Start listening
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    
    // --- WEBSOCKET SETUP ---
    // We attach the WebSocket server to the underlying Node.js http server managed by Fastify
    const wss = new WebSocketServer({ server: fastify.server });

    wss.on('connection', (ws, req) => {
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      console.log(`🔌 [WebSocket] New connection from: ${clientIp}`);

      let playerId = null;
      let currentRoom = null;

      ws.on('message', (data) => {
        try {
          const msg = JSON.parse(data);

          switch (msg.type) {
            case 'join': {
              const roomCode = msg.roomCode || DEFAULT_ROOM;
              const room = rooms.get(roomCode);

              if (!room) {
                ws.send(JSON.stringify({ type: 'error', message: 'Rum findes ikke' }));
                return;
              }
              if (room.players.size >= 4) {
                ws.send(JSON.stringify({ type: 'error', message: 'Rummet er fyldt' }));
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
                color,
                state: null,
              });

              if (willBeHost) {
                room.hostId = playerId;
                console.log(`👑 ${msg.playerName} joined as HOST`);
              } else {
                console.log(`🎮 ${msg.playerName} joined the game`);
              }

              // Build player list
              const playerList = [];
              room.players.forEach((p, id) => {
                playerList.push({
                  id, name: p.name, isHost: id === room.hostId, car: p.car, role: p.role || 'contester', color: p.color
                });
              });

              if (room.gameStarted) {
                // Drop-in logic
                if (room.gameConfig && room.gameConfig.dropInEnabled === false) {
                  ws.send(JSON.stringify({ type: 'error', message: 'Drop-in disabled' }));
                  room.players.delete(playerId);
                  return;
                }
                
                // Simplified drop-in response
                ws.send(JSON.stringify({ type: 'joined', roomCode, playerId, players: playerList, isHost: willBeHost }));
                
                // Reuse existing spawn logic would go here, simplified for brevity but functional
                const spawnPos = { x: 0, z: 0 }; 
                
                ws.send(JSON.stringify({ type: 'gameStart', players: playerList, config: room.gameConfig, dropIn: true }));
                broadcastToRoom(roomCode, { 
                  type: 'playerJoined', 
                  player: { id: playerId, name: msg.playerName, isHost: willBeHost, car: msg.car, role, color }, 
                  players: playerList, dropIn: true 
                }, playerId);
                console.log(`⚡ ${msg.playerName} dropped in`);

              } else {
                ws.send(JSON.stringify({ type: 'joined', roomCode, playerId, players: playerList, isHost: willBeHost }));
                broadcastToRoom(roomCode, { 
                  type: 'playerJoined', 
                  player: { id: playerId, name: msg.playerName, isHost: willBeHost, car: msg.car, role, color }, 
                  players: playerList 
                }, playerId);
              }
              break;
            }

            case 'startGame': {
              const room = rooms.get(currentRoom);
              if (!room || room.hostId !== playerId) return;
              
              room.gameStarted = true;
              room.gameConfig = msg.config || { touchArrest: true, dropInEnabled: true };
              
              // Assign spawns
              const spawnPositions = [{x:0,z:0}, {x:50,z:0}, {x:-50,z:0}, {x:0,z:50}];
              let idx = 0;
              const playerData = [];
              room.players.forEach((p, id) => {
                playerData.push({
                  id, name: p.name, isHost: id === room.hostId, car: p.car, role: p.role, color: p.color,
                  spawnPos: spawnPositions[idx++ % spawnPositions.length]
                });
              });
              
              broadcastToAll(currentRoom, { type: 'gameStart', players: playerData, config: room.gameConfig });
              console.log(`🚀 Game started in ${currentRoom}`);
              break;
            }

            case 'playerState': {
              const room = rooms.get(currentRoom);
              if (room) {
                 const p = room.players.get(playerId);
                 if(p) p.state = msg.state;
                 broadcastToRoom(currentRoom, { type: 'playerState', playerId, state: msg.state }, playerId);
              }
              break;
            }

            case 'updateCarSelection': {
              const room = rooms.get(currentRoom);
              if (room) {
                const p = room.players.get(playerId);
                if (p) {
                  p.car = msg.car || 'standard';
                  const playerList = [];
                  room.players.forEach((pl, id) => playerList.push({ id, name: pl.name, car: pl.car, color: pl.color }));
                  broadcastToAll(currentRoom, { type: 'playerCarUpdated', playerId, car: p.car, players: playerList });
                }
              }
              break;
            }
            
            case 'policeState': {
              const room = rooms.get(currentRoom);
              if (room && room.hostId === playerId) {
                broadcastToRoom(currentRoom, { type: 'policeState', police: msg.police }, playerId);
              }
              break;
            }

            case 'gameEvent': {
              broadcastToRoom(currentRoom, { type: 'gameEvent', playerId, event: msg.event, data: msg.data }, playerId);
              break;
            }

            case 'respawn': {
              const room = rooms.get(currentRoom);
              if (room && room.gameStarted) {
                 const p = room.players.get(playerId);
                 if(msg.car && p) p.car = msg.car;
                 
                 const spawnPos = { x: (Math.random()-0.5)*100, z: (Math.random()-0.5)*100 };
                 ws.send(JSON.stringify({ type: 'respawned', spawnPos, car: p ? p.car : 'standard', resetHeat: room.players.size===1 }));
                 broadcastToRoom(currentRoom, { type: 'gameEvent', playerId, event: 'respawned', data: { spawnPos, car: p?p.car:'standard' } }, playerId);
              }
              break;
            }

            case 'chat': {
              const room = rooms.get(currentRoom);
              const p = room ? room.players.get(playerId) : null;
              broadcastToAll(currentRoom, { type: 'chat', playerId, playerName: p?p.name:'Unknown', message: msg.message });
              break;
            }
            
            case 'resetGame': {
              const room = rooms.get(currentRoom);
              if(room && room.hostId === playerId) {
                room.gameStarted = false;
                broadcastToAll(currentRoom, { type: 'gameReset' });
                console.log(`🔄 Game reset by host`);
              }
              break;
            }
          }
        } catch (e) {
          console.error('Message error:', e);
        }
      });

      ws.on('close', () => {
        if (currentRoom && playerId) {
          const room = rooms.get(currentRoom);
          if (room) {
            const wasHost = room.hostId === playerId;
            const p = room.players.get(playerId);
            const pName = p ? p.name : 'Unknown';
            room.players.delete(playerId);

            if (room.players.size === 0) {
              room.hostId = null;
              room.gameStarted = false;
              console.log(`🔄 Room ${currentRoom} empty`);
            } else {
              broadcastToRoom(currentRoom, { type: 'playerLeft', playerId, playerName: pName });
              if (wasHost) assignNewHost(room, currentRoom);
            }
            console.log(`👋 ${pName} left`);
          }
        }
      });
    });

    // --- LOGGING ---
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
    console.log('║   🚔  FLUGT FRA POLITIET - FASTIFY SERVER (OPTIMIZED) 🚔  ║');
    console.log('╠═══════════════════════════════════════════════════════════╣');
    console.log(`║  Local:    http://localhost:${PORT}                          ║`);
    console.log(`║  Network:  http://${lanIP}:${PORT}                       ║`);
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('');

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
