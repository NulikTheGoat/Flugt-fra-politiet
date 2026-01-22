// Network Manager for LAN Multiplayer
let ws = null;
let isConnected = false;
let isHost = false;
let playerId = null;
let roomCode = null;
let playerName = 'Player';
let otherPlayers = new Map(); // id -> { car, state, mesh }

// Callbacks
let onConnected = null;
let onHosted = null;
let onJoined = null;
let onPlayerJoined = null;
let onPlayerLeft = null;
let onGameStart = null;
let onPlayerState = null;
let onPoliceState = null;
let onGameEvent = null;
let onError = null;
let onChat = null;

// Get WebSocket URL based on current page location
function getWsUrl() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname;
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
        case 'hosted':
            isHost = true;
            playerId = msg.playerId;
            roomCode = msg.roomCode;
            if (onHosted) onHosted(msg.roomCode, msg.playerId, msg.players);
            break;
            
        case 'joined':
            isHost = false;
            playerId = msg.playerId;
            roomCode = msg.roomCode;
            if (onJoined) onJoined(msg.roomCode, msg.playerId, msg.players);
            break;
            
        case 'playerJoined':
            if (onPlayerJoined) onPlayerJoined(msg.player, msg.players, msg.dropIn);
            break;
            
        case 'playerLeft':
            otherPlayers.delete(msg.playerId);
            if (onPlayerLeft) onPlayerLeft(msg.playerId);
            break;
            
        case 'hostChanged':
            if (msg.newHostId === playerId) {
                isHost = true;
            }
            break;
            
        case 'gameStart':
            if (onGameStart) onGameStart(msg.players, msg.config);
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
    }
}

// Host a new game
export function hostGame(name, car = 'standard', color = 0xff0000) {
    if (!isConnected) return;
    playerName = name;
    ws.send(JSON.stringify({
        type: 'host',
        playerName: name,
        car,
        color
    }));
}

// Join an existing game
export function joinGame(code, name, car = 'standard', color = 0x0000ff) {
    if (!isConnected) return;
    playerName = name;
    ws.send(JSON.stringify({
        type: 'join',
        roomCode: code.toUpperCase(),
        playerName: name,
        car,
        color
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
export function setOnHosted(cb) { onHosted = cb; }
export function setOnJoined(cb) { onJoined = cb; }
export function setOnPlayerJoined(cb) { onPlayerJoined = cb; }
export function setOnPlayerLeft(cb) { onPlayerLeft = cb; }
export function setOnGameStart(cb) { onGameStart = cb; }
export function setOnPlayerState(cb) { onPlayerState = cb; }
export function setOnPoliceState(cb) { onPoliceState = cb; }
export function setOnGameEvent(cb) { onGameEvent = cb; }
export function setOnError(cb) { onError = cb; }
export function setOnChat(cb) { onChat = cb; }

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
