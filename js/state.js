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
    collectibles: [], // Array for active coin meshes
    chunks: [],
    chunkGrid: {},
    activeChunks: [],
    fallenDebris: [],
    smallDebris: [],
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
    velocityX: 0,
    velocityZ: 0,
    angularVelocity: 0,
    driftFactor: 0,
    currentDriftScore: 0, // Current drift session score
    driftCombo: 1,        // Multiplier for long drifts
    tireMarks: [],
    carTilt: 0,
    wheelAngle: 0,
    speedParticles: [],
    is2DMode: false,
    health: 100,
    arrestCountdown: 0,
    arrestStartTime: 0,
    policeKilled: 0,
    maxPoliceOnScreen: 0,
    collisionDistance: 25,
    hasStartedMoving: false, // Police don't spawn until player moves
    
    // Multiplayer state
    isMultiplayer: false,
    isHost: false,
    playerId: null,
    roomCode: null,
    otherPlayers: new Map(), // playerId -> { car, mesh, state }
    playerColor: 0xff0000
};

// Input State
export const keys = {};
