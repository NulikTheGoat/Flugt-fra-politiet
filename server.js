// LAN Multiplayer Server for Flugt fra Politiet
// Persistent "floating" server - always running, anyone can join
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = 3000;
const WS_PORT = 3001;

// Default room code - always available
const DEFAULT_ROOM = 'SPIL';

// Load environment variables from .env file
function loadEnv() {
    try {
        const envPath = path.join(__dirname, '.env');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            envContent.split('\n').forEach(line => {
                line = line.trim();
                if (line && !line.startsWith('#')) {
                    const [key, ...valueParts] = line.split('=');
                    const value = valueParts.join('=').trim();
                    if (key && value) {
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
loadEnv();

// MPS API Configuration
const MPS_CONFIG = {
    endpoint: process.env.MPS_ENDPOINT,
    apiKey: process.env.MPS_API_KEY || '',
    deployment: process.env.MPS_DEPLOYMENT || 'anthropic.claude-haiku-4-5-20251001-v1:0',
    maxTokens: parseInt(process.env.MPS_MAX_TOKENS) || 256,
    anthropicVersion: process.env.MPS_ANTHROPIC_VERSION || '2023-06-01'
};

// Commentary rate limiting
let lastCommentaryRequest = 0;
const COMMENTARY_COOLDOWN = 5000; // 5 seconds

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
                ...headers
            }
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
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
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }
    
    // Commentary API endpoint
    if (req.url === '/api/commentary' && req.method === 'POST') {
        // Rate limiting
        const now = Date.now();
        if (now - lastCommentaryRequest < COMMENTARY_COOLDOWN) {
            res.writeHead(429, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ error: 'Rate limited', retryAfter: COMMENTARY_COOLDOWN - (now - lastCommentaryRequest) }));
            return;
        }
        
        // Check if API key is configured
        if (!MPS_CONFIG.apiKey) {
            res.writeHead(503, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ error: 'API not configured' }));
            return;
        }
        
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { systemPrompt, eventSummary } = JSON.parse(body);
                
                if (!eventSummary) {
                    res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ error: 'Missing eventSummary' }));
                    return;
                }
                
                lastCommentaryRequest = now;
                
                // Build MPS request payload
                const payload = {
                    model: MPS_CONFIG.deployment,
                    system: systemPrompt || 'You are an excited sports commentator. Keep responses under 25 words.',
                    messages: [{ role: 'user', content: eventSummary }],
                    max_tokens: MPS_CONFIG.maxTokens
                };
                
                if (!MPS_CONFIG.endpoint) {
                    throw new Error('MPS_ENDPOINT is not configured');
                }

                const endpoint = MPS_CONFIG.endpoint;
                const headers = {
                    'Authorization': `Bearer ${MPS_CONFIG.apiKey}`,
                    'api-key': MPS_CONFIG.apiKey,
                    'anthropic-version': MPS_CONFIG.anthropicVersion
                };
                
                console.log('[Commentary] Requesting from MPS...');
                const mpsResponse = await httpsPost(endpoint, headers, JSON.stringify(payload));
                
                if (mpsResponse.status !== 200) {
                    console.error('[Commentary] MPS error:', mpsResponse.status, mpsResponse.data);
                    res.writeHead(502, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ error: 'LLM request failed', status: mpsResponse.status }));
                    return;
                }
                
                const mpsData = JSON.parse(mpsResponse.data);
                let commentary = '';
                
                // Extract text from Anthropic response format
                if (mpsData.content && Array.isArray(mpsData.content) && mpsData.content[0]?.text) {
                    commentary = mpsData.content[0].text;
                }
                
                console.log('[Commentary] Received:', commentary);
                
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ commentary }));
                
            } catch (err) {
                console.error('[Commentary] Error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ error: 'Internal server error' }));
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
            version: '1.0'
        };
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
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
        '.mp3': 'audio/mpeg'
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
            res.writeHead(200, { 'Content-Type': contentType });
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
            dropInEnabled: true
        }
    });
    console.log(`📦 Default room '${DEFAULT_ROOM}' created and ready for players`);
}

// Get next available color for a room
function getNextColor(room) {
    const usedColors = new Set();
    room.players.forEach(p => usedColors.add(p.color));
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
            newHostName: newHost.name
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
                        ws.send(JSON.stringify({ type: 'error', message: 'Rummet er fyldt (maks 4 spillere)' }));
                        return;
                    }
                    
                    playerId = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
                    currentRoom = roomCode;
                    
                    const color = getNextColor(room);
                    const isFirstPlayer = room.players.size === 0;
                    const willBeHost = isFirstPlayer || !room.hostId;
                    
                    room.players.set(playerId, {
                        ws,
                        name: msg.playerName || 'Spiller',
                        isHost: willBeHost,
                        car: msg.car || 'standard',
                        color: color,
                        state: null
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
                            color: p.color 
                        });
                    });
                    
                    // If game already started, do drop-in join
                    if (room.gameStarted) {
                        if (room.gameConfig && room.gameConfig.dropInEnabled === false) {
                            ws.send(JSON.stringify({
                                type: 'error',
                                message: 'Spillet er i gang - drop-in er ikke aktiveret'
                            }));
                            room.players.delete(playerId);
                            return;
                        }
                        
                        // Spawn positions for drop-in
                        const spawnPositions = [
                            { x: 0, z: 0 },
                            { x: 50, z: 0 },
                            { x: -50, z: 0 },
                            { x: 0, z: 50 }
                        ];
                        
                        const playerData = [];
                        let idx = 0;
                        room.players.forEach((p, id) => {
                            playerData.push({
                                id,
                                name: p.name,
                                isHost: id === room.hostId,
                                car: p.car,
                                color: p.color,
                                spawnPos: spawnPositions[idx % spawnPositions.length]
                            });
                            idx++;
                        });
                        
                        ws.send(JSON.stringify({
                            type: 'joined',
                            roomCode,
                            playerId,
                            players: playerList,
                            isHost: willBeHost
                        }));
                        
                        // Immediately start game for this player (drop-in)
                        ws.send(JSON.stringify({
                            type: 'gameStart',
                            players: playerData,
                            config: room.gameConfig || {},
                            dropIn: true
                        }));
                        
                        // Notify existing players
                        broadcastToRoom(roomCode, {
                            type: 'playerJoined',
                            player: { 
                                id: playerId, 
                                name: msg.playerName || 'Spiller', 
                                isHost: willBeHost, 
                                car: msg.car, 
                                color: color 
                            },
                            players: playerList,
                            dropIn: true
                        }, playerId);
                        
                        console.log(`⚡ ${msg.playerName || 'Spiller'} dropped into running game`);
                    } else {
                        // Normal pre-game join
                        ws.send(JSON.stringify({
                            type: 'joined',
                            roomCode,
                            playerId,
                            players: playerList,
                            isHost: willBeHost
                        }));
                        
                        // Notify everyone else
                        broadcastToRoom(roomCode, {
                            type: 'playerJoined',
                            player: { 
                                id: playerId, 
                                name: msg.playerName || 'Spiller', 
                                isHost: willBeHost, 
                                car: msg.car, 
                                color: color 
                            },
                            players: playerList
                        }, playerId);
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
                        { x: 0, z: 50 }
                    ];
                    
                    let idx = 0;
                    const playerData = [];
                    room.players.forEach((p, id) => {
                        playerData.push({
                            id,
                            name: p.name,
                            isHost: id === room.hostId,
                            car: p.car,
                            color: p.color,
                            spawnPos: spawnPositions[idx % spawnPositions.length]
                        });
                        idx++;
                    });
                    
                    broadcastToAll(currentRoom, {
                        type: 'gameStart',
                        players: playerData,
                        config: room.gameConfig
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
                    
                    broadcastToRoom(currentRoom, {
                        type: 'playerState',
                        playerId,
                        state: msg.state
                    }, playerId);
                    break;
                }
                
                case 'policeState': {
                    // Host broadcasts police state
                    const room = rooms.get(currentRoom);
                    if (!room || room.hostId !== playerId) return;
                    
                    broadcastToRoom(currentRoom, {
                        type: 'policeState',
                        police: msg.police
                    }, playerId);
                    break;
                }
                
                case 'gameEvent': {
                    const room = rooms.get(currentRoom);
                    if (!room) return;
                    
                    broadcastToRoom(currentRoom, {
                        type: 'gameEvent',
                        playerId,
                        event: msg.event,
                        data: msg.data
                    }, playerId);
                    break;
                }
                
                case 'respawn': {
                    const room = rooms.get(currentRoom);
                    if (!room || !room.gameStarted) return;
                    
                    if (room.gameConfig && room.gameConfig.dropInEnabled === false) {
                        ws.send(JSON.stringify({
                            type: 'error',
                            message: 'Drop-in er ikke aktiveret'
                        }));
                        return;
                    }
                    
                    const spawnPositions = [
                        { x: 0, z: 0 },
                        { x: 50, z: 0 },
                        { x: -50, z: 0 },
                        { x: 0, z: 50 },
                        { x: -50, z: 50 },
                        { x: 50, z: -50 }
                    ];
                    const spawnPos = spawnPositions[Math.floor(Math.random() * spawnPositions.length)];
                    
                    // Update player's car if specified
                    const player = room.players.get(playerId);
                    const newCar = msg.car || (player ? player.car : 'standard');
                    if (player && msg.car) {
                        player.car = msg.car;
                        console.log(`🚗 Player changed car to: ${msg.car}`);
                    }
                    
                    ws.send(JSON.stringify({
                        type: 'respawned',
                        spawnPos,
                        car: newCar,
                        resetHeat: room.players.size === 1 // Reset heat if player is alone
                    }));
                    
                    broadcastToRoom(currentRoom, {
                        type: 'gameEvent',
                        playerId,
                        event: 'respawned',
                        data: { spawnPos, car: newCar }
                    }, playerId);
                    
                    console.log(`🔄 Player respawned with ${newCar}${room.players.size === 1 ? ' (heat reset - solo)' : ''}`);
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
                        message: msg.message
                    });
                    break;
                }
                
                case 'resetGame': {
                    // Host can reset the game to lobby state
                    const room = rooms.get(currentRoom);
                    if (!room || room.hostId !== playerId) return;
                    
                    room.gameStarted = false;
                    broadcastToAll(currentRoom, {
                        type: 'gameReset'
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
                        playerName
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
