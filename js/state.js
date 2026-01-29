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

/**
 * NOTE FOR CONTRIBUTORS (and LLMs):
 * - `speed`, `maxSpeed`, `velocityX`, `velocityZ` are in *world units per second*.
 * - HUD shows km/h as `Math.round(speed * 3.6)`.
 * - `selectedCar` is the key into `window.cars`/`cars`.
 * - Some fields are vehicle-specific:
 *   - `driftFactor`, `weightTransfer`, `carTilt`, `wheelAngle` are primarily for car-like vehicles.
 *   - On-foot movement uses strafing (velocityX changes) and may have `angularVelocity` ~ 0.
 */

/**
 * @typedef {Object} GameState
 * @property {number} speed
 * @property {number} maxSpeed
 * @property {number} maxReverseSpeed
 * @property {number} acceleration
 * @property {number} friction
 * @property {number} brakePower
 * @property {number} maxSpeedWarning
 * @property {number} velocityX
 * @property {number} velocityZ
 * @property {number} angularVelocity
 * @property {number} driftFactor
 * @property {number} carTilt
 * @property {number} wheelAngle
 * @property {number} handling
 * @property {number} [grip] - Car grip/traction (0-1)
 * @property {number} [maxSpeedAchieved] - Maximum speed reached in current run
 * @property {number} [weightTransfer] - Weight transfer during braking/acceleration
 * @property {number} [driftVisualAngle] - Visual drift angle for chassis rotation
 * @property {number} [carPitch] - Car pitch angle for acceleration/braking visuals
 * @property {boolean} [airborne] - Whether car is in the air
 * @property {number} [verticalVelocity] - Vertical velocity when airborne
 *
 * @property {number} health
 * @property {number} money
 * @property {number} totalMoney - Total lifetime money earned (persistent, for shop purchases)
 * @property {number} rebirthPoints
 * @property {string} selectedCar
 * @property {Record<string, boolean>} ownedCars - Map of owned car keys to true
 * @property {number} arrestDistance
 * @property {boolean} arrested
 * @property {number} arrestCountdown
 * @property {number} arrestStartTime
 * @property {boolean} hasStartedMoving
 *
 * @property {number} startTime
 * @property {number} elapsedTime
 * @property {number} timerStartTime
 * @property {number} lastMoneyCheckTime
 *
 * @property {number} heatLevel
 * @property {any[]} policeCars
 * @property {number} lastPoliceSpawnTime
 * @property {number} policeKilled
 * @property {number} maxPoliceOnScreen
 * @property {number} collisionDistance
 * @property {boolean} policeEngaged
 * @property {number} destructionCount
 * @property {boolean} hasHitObject
 *
 * @property {any[]} chunks
 * @property {Record<string, any>} chunkGrid
 * @property {any[]} activeChunks
 * @property {any[]} debris - Unified debris array
 * @property {any[]} fallenDebris - Deprecated - use debris instead
 * @property {any[]} smallDebris - Deprecated - use debris instead
 * @property {number} chunkGridSize
 * @property {any[]} collectibles
 *
 * @property {any[]} projectiles
 * @property {number} slowEffect
 * @property {number} slowDuration
 *
 * @property {any[]} sparks
 * @property {any[]} tireMarks
 * @property {any[]} speedParticles
 * @property {any[]} [dustParticles] - Wheel dust particles
 * @property {number} baseFOV
 * @property {number} currentFOV
 * @property {number} screenShake
 * @property {boolean} is2DMode
 *
 * @property {boolean} isMultiplayer
 * @property {boolean} isHost
 * @property {string|null} playerId
 * @property {string|null} roomCode
 * @property {Map<string, any>} otherPlayers
 * @property {number} playerColor
 */

/** @type {GameState} */
export const gameState = {
    // === Physics & Movement ===
    // Default values match 'onfoot' (starter) from constants.js
    speed: 0,
    maxSpeed: 2.5,          // On foot: 2.5 (~9 km/h jogging)
    maxReverseSpeed: 1.5,   // Slow reverse on foot
    acceleration: 0.02,     // On foot: 0.02
    friction: 0.97,
    brakePower: 0.88,
    maxSpeedWarning: 2,     // Warning threshold for on foot
    velocityX: 0,
    velocityZ: 0,
    angularVelocity: 0,
    driftFactor: 0,
    carTilt: 0,
    wheelAngle: 0,
    handling: 0.15,         // On foot: 0.15 (very agile)
    
    // === Player State ===
    health: 20,             // On foot health
    money: 0,
    rebirthPoints: 0,
    totalMoney: 150,        // Startpenge til at købe første køretøj
    selectedCar: 'onfoot',  // Start on foot!
    ownedCars: { onfoot: true }, // Initialize with starter 'vehicle'
    arrestDistance: 30,
    arrested: false,
    arrestCountdown: 0,
    arrestStartTime: 0,
    hasStartedMoving: false, // Police don't spawn until player moves
    
    // === Game Flow ===
    startTime: 0, // Game hasn't started yet (set when solo/multiplayer selected)
    elapsedTime: 0,
    timerStartTime: 0, // HUD timer starts after engagement/collection
    lastMoneyCheckTime: 0,
    
    // === Police & Difficulty ===
    heatLevel: 1,
    policeCars: [],
    lastPoliceSpawnTime: 0,
    policeKilled: 0,
    maxPoliceOnScreen: 0,
    collisionDistance: 25,
    // Police should only engage once player has earned money or destroyed something
    policeEngaged: false,
    // Track destruction/vandalism for engagement + stats
    destructionCount: 0,
    // True once player collides with any non-ground world object (buildings/trees/debris/etc)
    hasHitObject: false,
    
    // === World & Environment ===
    chunks: [],
    chunkGrid: {},
    activeChunks: [],
    debris: [],            // Unified debris array (replaces fallenDebris/smallDebris)
    fallenDebris: [],      // Deprecated - use debris instead
    smallDebris: [],       // Deprecated - use debris instead
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

// === Persistence ===
export function saveProgress() {
    const data = {
        totalMoney: gameState.totalMoney,
        money: gameState.money, 
        rebirthPoints: gameState.rebirthPoints,
        ownedCars: gameState.ownedCars,
        selectedCar: gameState.selectedCar
    };
    try {
        localStorage.setItem('flugt_progress', JSON.stringify(data));
        // console.log('Progress saved');
    } catch (e) {
        console.warn('Failed to save progress', e);
    }
}

export function loadProgress() {
    try {
        const saved = localStorage.getItem('flugt_progress');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.totalMoney !== undefined) gameState.totalMoney = data.totalMoney;
            if (data.money !== undefined) gameState.money = data.money;
            if (data.rebirthPoints !== undefined) gameState.rebirthPoints = data.rebirthPoints;
            if (data.ownedCars) {
                gameState.ownedCars = data.ownedCars;
            } else {
                // Ensure default exists even if loaded data is old/broken
                if (!gameState.ownedCars) gameState.ownedCars = { onfoot: true };
            }
            if (data.selectedCar) {
                // Validate car exists
                gameState.selectedCar = data.selectedCar;
            }
            console.log('[STATE] Progress loaded from local storage');
        }
    } catch (e) {
        console.warn('Failed to load progress', e);
    }
}

// Automatically load progress when module is imported
loadProgress();

// Auto-save on window close/refresh
window.addEventListener('beforeunload', () => {
    saveProgress();
});

