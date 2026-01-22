// Network Manager for LAN Multiplayer
let ws = null;
let isConnected = false;
let isHost = false;
let playerId = null;
let roomCode = null;
let playerName = 'Player';
let otherPlayers = new Map(); // id -> { car, state, mesh }

// Default room code (matches server)
const DEFAULT_ROOM = 'SPIL';

// Server discovery
let discoveredServers = [];
let serverHost = null; // Custom server host if discovered

// Callbacks
let onConnected = null;
let onJoined = null;
let onPlayerJoined = null;
let onPlayerLeft = null;
let onGameStart = null;
let onPlayerState = null;
let onPoliceState = null;
let onGameEvent = null;
let onError = null;
let onChat = null;
let onRespawned = null;
let onHostChanged = null;
let onGameReset = null;

// Scan for servers on the local network
export async function scanForServers(onProgress = null) {
    discoveredServers = [];
    const localIP = window.location.hostname;
    
    // If we're on localhost, we're probably running the server ourselves
    if (localIP === 'localhost' || localIP === '127.0.0.1') {
        // Try localhost first
        const localhost = await checkServer('localhost');
        if (localhost) discoveredServers.push(localhost);
        return discoveredServers;
    }
    
    // Extract subnet from current IP (e.g., 192.168.1.x -> 192.168.1)
    const ipParts = localIP.split('.');
    if (ipParts.length !== 4) {
        return discoveredServers;
    }
    const subnet = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}`;
    
    // Also check current host (the server we loaded the page from)
    const currentHostServer = await checkServer(localIP);
    if (currentHostServer) {
        discoveredServers.push(currentHostServer);
    }
    
    // Scan common IP addresses in the subnet (1-254)
    const scanPromises = [];
    const priorityIPs = [1, 2, 100, 101, 102, 103, 104, 105, 50, 51, 52]; // Common router/device IPs
    
    for (const lastOctet of priorityIPs) {
        const ip = `${subnet}.${lastOctet}`;
        if (ip !== localIP) { // Skip already checked
            scanPromises.push(checkServer(ip));
        }
    }
    
    if (onProgress) onProgress(0, priorityIPs.length);
    
    const results = await Promise.all(scanPromises);
    results.forEach(server => {
        if (server) discoveredServers.push(server);
    });
    
    if (onProgress) onProgress(priorityIPs.length, priorityIPs.length);
    
    return discoveredServers;
}

// Check if a server exists at the given IP
async function checkServer(ip) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 500); // 500ms timeout
        
        const response = await fetch(`http://${ip}:3000/api/discover`, {
            signal: controller.signal
        });
        clearTimeout(timeout);
        
        if (response.ok) {
            const data = await response.json();
            return {
                ip: ip,
                ...data
            };
        }
    } catch (e) {
        // Server not found or timeout - ignore
    }
    return null;
}

// Set custom server host
export function setServerHost(host) {
    serverHost = host;
}

// Get discovered servers
export function getDiscoveredServers() {
    return discoveredServers;
}

// Get WebSocket URL based on current page location or custom host
function getWsUrl() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = serverHost || window.location.hostname;
    return `${protocol}//${host}:3001`;
}

// Connect to server
export function connect() {
    return new Promise((resolve, reject) => {
        try {
            ws = new WebSocket(getWsUrl());
            
            ws.onopen = () => {
                isConnected = true;
                console.log('Connected to multiplayer server');
                if (onConnected) onConnected();
                resolve();
            };
            
            ws.onclose = () => {
                isConnected = false;
                console.log('Disconnected from server');
            };
            
            ws.onerror = (err) => {
                console.error('WebSocket error:', err);
                reject(err);
            };
            
            ws.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data);
                    handleMessage(msg);
                } catch (e) {
                    console.error('Message parse error:', e);
                }
            };
        } catch (e) {
            reject(e);
        }
    });
}

// Handle incoming messages
function handleMessage(msg) {
    switch (msg.type) {
        case 'joined':
            // Everyone gets 'joined' now - check isHost flag
            isHost = msg.isHost || false;
            playerId = msg.playerId;
            roomCode = msg.roomCode;
            if (onJoined) onJoined(msg.roomCode, msg.playerId, msg.players, msg.isHost);
            break;
            
        case 'playerJoined':
            if (onPlayerJoined) onPlayerJoined(msg.player, msg.players, msg.dropIn);
            break;
            
        case 'playerLeft':
            otherPlayers.delete(msg.playerId);
            if (onPlayerLeft) onPlayerLeft(msg.playerId, msg.playerName);
            break;
            
        case 'hostChanged':
            if (msg.newHostId === playerId) {
                isHost = true;
                console.log('You are now the host!');
            }
            if (onHostChanged) onHostChanged(msg.newHostId, msg.newHostName);
            break;
            
        case 'gameStart':
            if (onGameStart) onGameStart(msg.players, msg.config, msg.dropIn);
            break;
            
        case 'gameReset':
            if (onGameReset) onGameReset();
            break;
            
        case 'playerState':
            // Store other player's state
            if (msg.playerId !== playerId) {
                otherPlayers.set(msg.playerId, {
                    ...otherPlayers.get(msg.playerId),
                    state: msg.state
                });
                if (onPlayerState) onPlayerState(msg.playerId, msg.state);
            }
            break;
            
        case 'policeState':
            if (onPoliceState) onPoliceState(msg.police);
            break;
            
        case 'gameEvent':
            if (onGameEvent) onGameEvent(msg.playerId, msg.event, msg.data);
            break;
            
        case 'chat':
            if (onChat) onChat(msg.playerName, msg.message);
            break;
            
        case 'error':
            console.error('Server error:', msg.message);
            if (onError) onError(msg.message);
            break;
            
        case 'respawned':
            // Server confirmed respawn
            if (onRespawned) onRespawned(msg.spawnPos, msg.car);
            break;
    }
}

// Join the game (unified - no more host/join distinction)
export function joinGame(name, car = 'standard', roomCodeOverride = null) {
    if (!isConnected) return;
    playerName = name;
    ws.send(JSON.stringify({
        type: 'join',
        roomCode: roomCodeOverride || DEFAULT_ROOM,
        playerName: name,
        car
    }));
}

// Start the game (host only)
export function startGame(config = {}) {
    if (!isConnected || !isHost) return;
    ws.send(JSON.stringify({
        type: 'startGame',
        config
    }));
}

// Send player state update
let lastStateSend = 0;
const STATE_SEND_INTERVAL = 50; // 20 updates per second

export function sendPlayerState(state) {
    if (!isConnected) return;
    
    const now = performance.now();
    if (now - lastStateSend < STATE_SEND_INTERVAL) return;
    lastStateSend = now;
    
    ws.send(JSON.stringify({
        type: 'playerState',
        state
    }));
}

// Send police state (host only)
let lastPoliceSend = 0;
const POLICE_SEND_INTERVAL = 100; // 10 updates per second

export function sendPoliceState(police) {
    if (!isConnected || !isHost) return;
    
    const now = performance.now();
    if (now - lastPoliceSend < POLICE_SEND_INTERVAL) return;
    lastPoliceSend = now;
    
    ws.send(JSON.stringify({
        type: 'policeState',
        police
    }));
}

// Send game event
export function sendGameEvent(event, data) {
    if (!isConnected) return;
    ws.send(JSON.stringify({
        type: 'gameEvent',
        event,
        data
    }));
}

// Request respawn (after being arrested in multiplayer)
export function requestRespawn() {
    if (!isConnected) return;
    ws.send(JSON.stringify({
        type: 'respawn'
    }));
}

// Request respawn with a specific car (after buying in shop)
export function requestRespawnWithCar(carKey) {
    if (!isConnected) return;
    ws.send(JSON.stringify({
        type: 'respawn',
        car: carKey
    }));
}

// Send chat message
export function sendChat(message) {
    if (!isConnected) return;
    ws.send(JSON.stringify({
        type: 'chat',
        message
    }));
}

// Setters for callbacks
export function setOnConnected(cb) { onConnected = cb; }
export function setOnJoined(cb) { onJoined = cb; }
export function setOnPlayerJoined(cb) { onPlayerJoined = cb; }
export function setOnPlayerLeft(cb) { onPlayerLeft = cb; }
export function setOnGameStart(cb) { onGameStart = cb; }
export function setOnPlayerState(cb) { onPlayerState = cb; }
export function setOnPoliceState(cb) { onPoliceState = cb; }
export function setOnGameEvent(cb) { onGameEvent = cb; }
export function setOnError(cb) { onError = cb; }
export function setOnChat(cb) { onChat = cb; }
export function setOnRespawned(cb) { onRespawned = cb; }
export function setOnHostChanged(cb) { onHostChanged = cb; }
export function setOnGameReset(cb) { onGameReset = cb; }

// Getters
export function getIsConnected() { return isConnected; }
export function getIsHost() { return isHost; }
export function getPlayerId() { return playerId; }
export function getRoomCode() { return roomCode; }
export function getPlayerName() { return playerName; }
export function getOtherPlayers() { return otherPlayers; }

// Disconnect
export function disconnect() {
    if (ws) {
        ws.close();
        ws = null;
    }
    isConnected = false;
    isHost = false;
    playerId = null;
    roomCode = null;
    otherPlayers.clear();
}
