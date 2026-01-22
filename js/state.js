// Game State
export const gameState = {
    speed: 0,
    maxSpeed: 80,
    maxReverseSpeed: 30,
    acceleration: 0.3,
    friction: 0.97,
    brakePower: 0.88,
    maxSpeedWarning: 70,
    arrestDistance: 30,
    arrested: false,
    startTime: Date.now(),
    elapsedTime: 0,
    money: 0,
    rebirthPoints: 0,
    totalMoney: 0,
    selectedCar: 'standard',
    lastMoneyCheckTime: 0,
    lastPoliceSpawnTime: 0,
    policeCars: [],
    chunks: [], // Deprecated in favor of spatial grid? Or just unused static list.
    chunkGrid: {}, // Spatial hash for static chunks
    activeChunks: [], // Moving chunks (physics)
    chunkGridSize: 200,
    heatLevel: 1,
    collectibles: [],
    projectiles: [],
    slowEffect: 0,
    slowDuration: 0,
    sparks: [],
    baseFOV: 75,
    currentFOV: 75,
    screenShake: 0,
    // New physics variables
    velocityX: 0,
    velocityZ: 0,
    angularVelocity: 0,
    driftFactor: 0,
    tireMarks: [],
    carTilt: 0,
    wheelAngle: 0,
    speedParticles: [],
    is2DMode: false,
    health: 100,
    arrestCountdown: 0,
    arrestStartTime: 0
};

// Input State
export const keys = {};
