// LAN Multiplayer Server for Flugt fra Politiet
const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = 3000;
const WS_PORT = 3001;

// Simple HTTP server for static files
const httpServer = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';
    if (filePath === './start' || filePath === './start/') filePath = './index.html';
    if (filePath === './config' || filePath === './config/') filePath = './config.html';
    
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

// Generate random room code
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
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

wss.on('connection', (ws) => {
    let playerId = null;
    let currentRoom = null;
    
    ws.on('message', (data) => {
        try {
            const msg = JSON.parse(data);
            
            switch (msg.type) {
                case 'host': {
                    // Create a new room
                    const roomCode = generateRoomCode();
                    playerId = 'host_' + Date.now();
                    currentRoom = roomCode;
                    
                    rooms.set(roomCode, {
                        hostId: playerId,
                        players: new Map([[playerId, {
                            ws,
                            name: msg.playerName || 'Host',
                            isHost: true,
                            car: msg.car || 'standard',
                            color: msg.color || 0xff0000,
                            state: null
                        }]]),
                        gameStarted: false,
                        gameState: null
                    });
                    
                    ws.send(JSON.stringify({
                        type: 'hosted',
                        roomCode,
                        playerId,
                        players: [{ id: playerId, name: msg.playerName || 'Host', isHost: true }]
                    }));
                    
                    console.log(`Room ${roomCode} created by ${msg.playerName || 'Host'}`);
                    break;
                }
                
                case 'join': {
                    // Join existing room
                    const room = rooms.get(msg.roomCode);
                    if (!room) {
                        ws.send(JSON.stringify({ type: 'error', message: 'Room not found' }));
                        return;
                    }
                    if (room.gameStarted) {
                        ws.send(JSON.stringify({ type: 'error', message: 'Game already started' }));
                        return;
                    }
                    if (room.players.size >= 4) {
                        ws.send(JSON.stringify({ type: 'error', message: 'Room full (max 4 players)' }));
                        return;
                    }
                    
                    playerId = 'player_' + Date.now();
                    currentRoom = msg.roomCode;
                    
                    room.players.set(playerId, {
                        ws,
                        name: msg.playerName || 'Player',
                        isHost: false,
                        car: msg.car || 'standard',
                        color: msg.color || 0x0000ff,
                        state: null
                    });
                    
                    // Get player list
                    const playerList = [];
                    room.players.forEach((p, id) => {
                        playerList.push({ id, name: p.name, isHost: p.isHost, car: p.car, color: p.color });
                    });
                    
                    // Send confirmation to joining player
                    ws.send(JSON.stringify({
                        type: 'joined',
                        roomCode: msg.roomCode,
                        playerId,
                        players: playerList
                    }));
                    
                    // Notify everyone else
                    broadcastToRoom(msg.roomCode, {
                        type: 'playerJoined',
                        player: { id: playerId, name: msg.playerName || 'Player', isHost: false, car: msg.car, color: msg.color },
                        players: playerList
                    }, playerId);
                    
                    console.log(`${msg.playerName || 'Player'} joined room ${msg.roomCode}`);
                    break;
                }
                
                case 'startGame': {
                    // Host starts the game
                    const room = rooms.get(currentRoom);
                    if (!room || room.hostId !== playerId) return;
                    
                    room.gameStarted = true;
                    
                    // Assign spawn positions for each player
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
                            isHost: p.isHost,
                            car: p.car,
                            color: p.color,
                            spawnPos: spawnPositions[idx]
                        });
                        idx++;
                    });
                    
                    broadcastToAll(currentRoom, {
                        type: 'gameStart',
                        players: playerData,
                        config: msg.config || {}
                    });
                    
                    console.log(`Game started in room ${currentRoom}`);
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
                    
                    // Broadcast to other players
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
                    // Game events: arrest, death, money, etc.
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
                
                case 'chat': {
                    // Chat message
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
                room.players.delete(playerId);
                
                if (room.players.size === 0) {
                    // Delete empty room
                    rooms.delete(currentRoom);
                    console.log(`Room ${currentRoom} deleted (empty)`);
                } else if (wasHost) {
                    // Host left, assign new host
                    const newHostId = room.players.keys().next().value;
                    room.hostId = newHostId;
                    const newHost = room.players.get(newHostId);
                    if (newHost) {
                        newHost.isHost = true;
                        
                        // Notify everyone
                        broadcastToAll(currentRoom, {
                            type: 'hostChanged',
                            newHostId,
                            newHostName: newHost.name
                        });
                    }
                    console.log(`Host left room ${currentRoom}, new host: ${newHost?.name}`);
                } else {
                    // Regular player left
                    broadcastToRoom(currentRoom, {
                        type: 'playerLeft',
                        playerId
                    });
                    console.log(`Player left room ${currentRoom}`);
                }
            }
        }
    });
});

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
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║     🚔  FLUGT FRA POLITIET - MULTIPLAYER SERVER  🚔    ║');
    console.log('╠════════════════════════════════════════════════════════╣');
    console.log(`║  Local:    http://localhost:${PORT}                       ║`);
    console.log(`║  Network:  http://${lanIP}:${PORT}                    ║`);
    console.log(`║  WebSocket: ws://${lanIP}:${WS_PORT}                     ║`);
    console.log('╠════════════════════════════════════════════════════════╣');
    console.log('║  Share the Network URL with friends on your LAN!       ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('');
});
