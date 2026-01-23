/**
 * STATE.JS - Global Game State
 * 
 * This is the single source of truth for all game state.
 * All modules import and modify this state directly (no getters/setters).
 * 
 * State Categories:
 * - Physics: velocity, speed, acceleration, friction
 * - Player: health, money, position, selected car
 * - Police: heat level, police array, spawn timing
 * - World: chunks, collectibles, debris
 * - Visual: FOV, camera shake, particles, tire marks
 * - Input: keys object for keyboard state
 * - Multiplayer: room codes, player list, host flag
 * 
 * Usage Pattern:
 *   import { gameState } from './state.js';
 *   gameState.money += 100;  // Direct access
 */

// Game State
export const gameState = {
    // === Physics & Movement ===
    // Default values match 'standard' car from constants.js
    speed: 0,
    maxSpeed: 22,           // Standard car: 22 (≈80 km/h)
    maxReverseSpeed: 10,    // Adjusted for new scale
    acceleration: 0.08,     // Standard car: 0.08
    friction: 0.97,
    brakePower: 0.88,
    maxSpeedWarning: 20,    // Warning threshold adjusted
    velocityX: 0,
    velocityZ: 0,
    angularVelocity: 0,
    driftFactor: 0,
    carTilt: 0,
    wheelAngle: 0,
    handling: 0.05,         // Standard car: 0.05
    
    // === Player State ===
    health: 100,
    money: 0,
    rebirthPoints: 0,
    totalMoney: 0,
    selectedCar: 'standard',
    arrestDistance: 30,
    arrested: false,
    arrestCountdown: 0,
    arrestStartTime: 0,
    hasStartedMoving: false, // Police don't spawn until player moves
    
    // === Game Flow ===
    startTime: 0, // Game hasn't started yet (set when solo/multiplayer selected)
    elapsedTime: 0,
    lastMoneyCheckTime: 0,
    
    // === Police & Difficulty ===
    heatLevel: 1,
    policeCars: [],
    lastPoliceSpawnTime: 0,
    policeKilled: 0,
    maxPoliceOnScreen: 0,
    collisionDistance: 25,
    
    // === World & Environment ===
    chunks: [],
    chunkGrid: {},
    activeChunks: [],
    fallenDebris: [],
    smallDebris: [],
    chunkGridSize: 200,
    collectibles: [],
    
    // === Combat & Effects ===
    projectiles: [],
    slowEffect: 0,
    slowDuration: 0,
    
    // === Visual Effects ===
    sparks: [],
    tireMarks: [],
    speedParticles: [],
    baseFOV: 75,
    currentFOV: 75,
    screenShake: 0,
    is2DMode: false, // Camera mode toggle
    
    // === Multiplayer ===
    isMultiplayer: false,
    isHost: false,
    playerId: null,
    roomCode: null,
    otherPlayers: new Map(), // playerId -> { car, mesh, state }
    playerColor: 0xff0000
};

// Input State - Keyboard keys currently pressed
export const keys = {};
