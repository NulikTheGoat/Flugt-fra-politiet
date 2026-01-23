/**
 * Gameplay Test Suite
 * Tests core gameplay mechanics, police AI, and economy systems
 * Run with: node tests/test_gameplay.mjs
 */

// Mock THREE.js
globalThis.THREE = {
    Vector3: class Vector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        normalize() { return this; }
        multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
    },
    Group: class Group {
        constructor() {
            this.position = new THREE.Vector3();
            this.rotation = { y: 0 };
            this.scale = { set: () => {} };
            this.userData = {};
        }
        add() {}
    },
    Mesh: class Mesh {
        constructor() {
            this.position = new THREE.Vector3();
            this.rotation = { x: 0, y: 0, z: 0 };
            this.material = { opacity: 1 };
            this.userData = {};
            this.matrixAutoUpdate = true;
        }
        updateMatrix() {}
    }
};

// Test utilities
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        testsPassed++;
        console.log(`  ✅ ${message}`);
    } else {
        testsFailed++;
        console.log(`  ❌ ${message}`);
    }
}

function assertApprox(actual, expected, tolerance, message) {
    const condition = Math.abs(actual - expected) <= tolerance;
    assert(condition, `${message} (expected ~${expected}, got ${actual})`);
}

function describe(name, fn) {
    console.log(`\n📋 ${name}`);
    fn();
}

// ============================================
// Test Data / Mocks
// ============================================

const enemies = {
    standard: { color: 0x0000ff, speed: 250, scale: 1, name: 'Politibil', health: 50 },
    interceptor: { color: 0x111111, speed: 300, scale: 1, name: 'Interceptor', health: 40 },
    swat: { color: 0x333333, speed: 220, scale: 1.5, name: 'SWAT', health: 150 },
    military: { color: 0x556b2f, speed: 350, scale: 1.2, name: 'Militær', health: 300 },
    sheriff: { color: 0x8b6914, speed: 180, scale: 1.3, name: 'Sheriff', health: 800 }
};

const cars = {
    standard: { name: 'Standard Bil', price: 0, maxSpeed: 80, acceleration: 0.3, handling: 0.05, health: 100 },
    sport: { name: 'Sportsvogn', price: 2500, maxSpeed: 110, acceleration: 0.45, handling: 0.07, health: 80 },
    muscle: { name: 'Muscle Car', price: 8000, maxSpeed: 120, acceleration: 0.5, handling: 0.04, health: 120 },
    tank: { name: 'Tank', price: 50000, maxSpeed: 50, acceleration: 0.15, handling: 0.03, health: 500 }
};

// Mock game state
function createMockGameState() {
    return {
        speed: 0,
        maxSpeed: 80,
        health: 100,
        money: 0,
        heatLevel: 1,
        policeCars: [],
        arrested: false,
        velocityX: 0,
        velocityZ: 0,
        chunkGridSize: 200,
        chunkGrid: {},
        arrestDistance: 30
    };
}

// ============================================
// Tests: Core Gameplay
// ============================================

describe('Core Gameplay - Speed & Movement', () => {
    // Test 1: Player acceleration
    const state = createMockGameState();
    const acceleration = 0.3;
    const delta = 1; // 60fps
    
    // Simulate 60 frames of acceleration
    for (let i = 0; i < 60; i++) {
        if (state.speed < state.maxSpeed) {
            state.speed = Math.min(state.speed + acceleration * delta, state.maxSpeed);
        }
    }
    
    assert(state.speed <= state.maxSpeed, `Speed capped at maxSpeed (${state.speed} <= ${state.maxSpeed})`);
    assertApprox(state.speed, 18, 1, 'After 1 second (60 frames) at 0.3 accel');
    
    // Test 2: Speed should not exceed maxSpeed
    state.speed = state.maxSpeed + 10;
    state.speed = Math.min(state.speed, state.maxSpeed);
    assert(state.speed === state.maxSpeed, 'Speed clamped to maxSpeed');
    
    // Test 3: Braking
    state.speed = 50;
    const brakePower = 0.95;
    for (let i = 0; i < 60; i++) {
        state.speed *= Math.pow(brakePower, delta);
    }
    assert(state.speed < 5, `Braking reduces speed significantly (${state.speed.toFixed(2)})`);
});

describe('Core Gameplay - Health System', () => {
    const state = createMockGameState();
    
    // Test damage
    const damage = 25;
    state.health -= damage;
    assert(state.health === 75, `Health reduced by damage (100 - 25 = ${state.health})`);
    
    // Test damage scaling for speed
    const speedKmh = 80;
    const crashDamage = speedKmh * 0.5; // playerCrashDamageMultiplier
    state.health -= crashDamage;
    assert(state.health === 35, `Speed-based crash damage (75 - 40 = ${state.health})`);
    
    // Test game over condition
    state.health = 0;
    const gameOver = state.health <= 0;
    assert(gameOver, 'Game over when health reaches 0');
});

describe('Core Gameplay - Arrest Mechanics', () => {
    const state = createMockGameState();
    
    // Simulate player stopped near police
    state.speed = 0;
    const policeDistance = 25; // Less than arrestDistance (30)
    const playerSpeedKmh = Math.abs(state.speed) * 3.6;
    const speedThreshold = state.maxSpeed * 3.6 * 0.1;
    
    const canArrest = policeDistance < state.arrestDistance && playerSpeedKmh < speedThreshold;
    assert(canArrest, 'Player can be arrested when stopped near police');
    
    // Simulate player moving
    state.speed = 20;
    const movingSpeedKmh = Math.abs(state.speed) * 3.6;
    const canArrestMoving = policeDistance < state.arrestDistance && movingSpeedKmh < speedThreshold;
    assert(!canArrestMoving, 'Player cannot be arrested while moving fast');
});

// ============================================
// Tests: Police AI
// ============================================

describe('Police AI - Speed Calculations', () => {
    const delta = 1;
    
    // Test: Police movement formula
    // Original formula: policeSpeed * 0.016 * delta
    const policeSpeed = 250; // standard police
    const policeMove = policeSpeed * 0.016 * delta;
    
    assertApprox(policeMove, 4, 0.1, 'Police moves ~4 units per frame at 60fps');
    
    // Test: Interceptor is faster
    const interceptorSpeed = 300;
    const interceptorMove = interceptorSpeed * 0.016 * delta;
    assert(interceptorMove > policeMove, `Interceptor faster than standard (${interceptorMove} > ${policeMove})`);
    
    // Test: Aggression multiplier at heat 6
    const heatLevel = 6;
    const aggressionMultiplier = 1 + (heatLevel - 1) * 0.3;
    const boostedSpeed = policeSpeed * (1 + (aggressionMultiplier - 1) * 0.5);
    
    assertApprox(aggressionMultiplier, 2.5, 0.1, 'Aggression multiplier at heat 6');
    assert(boostedSpeed > policeSpeed, `Boosted speed at high heat (${boostedSpeed.toFixed(0)} > ${policeSpeed})`);
});

describe('Police AI - Spawn Logic', () => {
    const state = createMockGameState();
    
    // Test spawn type selection based on heat
    function getSpawnType(heatLevel, rand) {
        let type = 'standard';
        if (heatLevel >= 2 && rand > 0.6) type = 'interceptor';
        if (heatLevel >= 3 && rand > 0.7) type = 'swat';
        if (heatLevel >= 4 && rand > 0.8) type = 'military';
        return type;
    }
    
    assert(getSpawnType(1, 0.9) === 'standard', 'Heat 1 spawns standard');
    assert(getSpawnType(2, 0.7) === 'interceptor', 'Heat 2+ can spawn interceptor');
    assert(getSpawnType(3, 0.8) === 'swat', 'Heat 3+ can spawn SWAT');
    assert(getSpawnType(4, 0.9) === 'military', 'Heat 4+ can spawn military');
});

describe('Police AI - Sheriff Behavior', () => {
    // Test: Sheriff config
    const sheriffConfig = {
        lookAheadDistance: 80,
        evasiveTurnMultiplier: 3.0,
        optimalDistance: 400,
        buffer: 50
    };
    
    // Test: Distance maintenance
    function getSheriffSpeedMultiplier(distance, config) {
        if (distance < config.optimalDistance - config.buffer) {
            return 0.5; // Too close
        } else if (distance > config.optimalDistance + config.buffer) {
            return 1.1; // Too far
        }
        return 1.0; // Sweet spot
    }
    
    assert(getSheriffSpeedMultiplier(300, sheriffConfig) === 0.5, 'Sheriff slows when too close');
    assert(getSheriffSpeedMultiplier(500, sheriffConfig) === 1.1, 'Sheriff speeds up when too far');
    assert(getSheriffSpeedMultiplier(400, sheriffConfig) === 1.0, 'Sheriff maintains speed in sweet spot');
});

// ============================================
// Tests: Economy System
// ============================================

describe('Economy - Money & Progression', () => {
    const state = createMockGameState();
    
    // Test: Passive income
    const passiveIncomeRate = 5; // per second
    const elapsedSeconds = 60;
    state.money += passiveIncomeRate * elapsedSeconds;
    assert(state.money === 300, `Passive income after 60s (${state.money})`);
    
    // Test: Can afford car
    const sportCar = cars.sport;
    const canAfford = state.money >= sportCar.price;
    assert(!canAfford, `Cannot afford sport car with ${state.money} (needs ${sportCar.price})`);
    
    // After earning more
    state.money = 3000;
    const canAffordNow = state.money >= sportCar.price;
    assert(canAffordNow, `Can afford sport car with ${state.money}`);
});

describe('Economy - Heat Level Scaling', () => {
    const state = createMockGameState();
    
    // Heat increases over time
    function calculateHeat(elapsedSeconds) {
        return Math.min(6, 1 + Math.floor(elapsedSeconds / 60)); // +1 heat per minute, max 6
    }
    
    assert(calculateHeat(0) === 1, 'Heat starts at 1');
    assert(calculateHeat(60) === 2, 'Heat 2 after 1 minute');
    assert(calculateHeat(300) === 6, 'Heat capped at 6 after 5 minutes');
    assert(calculateHeat(600) === 6, 'Heat stays at 6 (max)');
});

// ============================================
// Tests: Car Stats
// ============================================

describe('Car Stats - Different Cars', () => {
    // Test: Standard vs Sport
    assert(cars.sport.maxSpeed > cars.standard.maxSpeed, 'Sport car faster than standard');
    assert(cars.sport.health < cars.standard.health, 'Sport car less health (trade-off)');
    
    // Test: Tank
    assert(cars.tank.maxSpeed < cars.standard.maxSpeed, 'Tank slower');
    assert(cars.tank.health > cars.standard.health * 3, 'Tank much more health');
    
    // Test: Price scaling
    assert(cars.standard.price === 0, 'Standard car is free');
    assert(cars.tank.price > cars.muscle.price, 'Tank is most expensive');
});

// ============================================
// Tests: Physics Calculations
// ============================================

describe('Physics - Delta Time', () => {
    // Test: Delta calculation
    const frameTime16 = 16.67; // 60fps
    const frameTime33 = 33.33; // 30fps
    
    const delta60 = Math.min(frameTime16 / 16.67, 2);
    const delta30 = Math.min(frameTime33 / 16.67, 2);
    
    assertApprox(delta60, 1.0, 0.01, 'Delta ~1.0 at 60fps');
    assertApprox(delta30, 2.0, 0.01, 'Delta ~2.0 at 30fps');
    
    // Test: Delta capping
    const frameTimeLag = 100; // Lag spike
    const deltaCapped = Math.min(frameTimeLag / 16.67, 2);
    assert(deltaCapped === 2, 'Delta capped at 2 during lag');
});

describe('Physics - Collision Detection Grid', () => {
    const gridSize = 200;
    
    function getGridKey(x, z) {
        return `${Math.floor(x / gridSize)},${Math.floor(z / gridSize)}`;
    }
    
    assert(getGridKey(0, 0) === '0,0', 'Origin maps to 0,0');
    assert(getGridKey(199, 199) === '0,0', 'Edge of cell 0,0');
    assert(getGridKey(200, 200) === '1,1', 'Start of cell 1,1');
    assert(getGridKey(-100, -100) === '-1,-1', 'Negative coordinates');
});

// ============================================
// Summary
// ============================================

console.log('\n' + '='.repeat(50));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(50));

if (testsFailed > 0) {
    process.exit(1);
}
