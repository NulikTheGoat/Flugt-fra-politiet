// Three.js Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 3000, 6000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.getElementById('gameContainer').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(500, 1000, 500);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.far = 2000;
directionalLight.shadow.camera.left = -1000;
directionalLight.shadow.camera.right = 1000;
directionalLight.shadow.camera.top = 1000;
directionalLight.shadow.camera.bottom = -1000;
scene.add(directionalLight);

// Game Variables
const gameState = {
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
    chunks: [],
    heatLevel: 1,
    collectibles: [],
    projectiles: [],
    ducks: [],
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
    is2DMode: false
};

// Helper function to darken a hex color
function darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

const enemies = {
    standard: { color: 0x0000ff, speed: 250, scale: 1, name: 'Politibil' },
    interceptor: { color: 0x111111, speed: 300, scale: 1, name: 'Interceptor' },
    swat: { color: 0x333333, speed: 220, scale: 1.5, name: 'SWAT' },
    military: { color: 0x556b2f, speed: 350, scale: 1.2, name: 'Militær' }
};

const cars = {
    standard: {
        name: 'Standard Bil',
        price: 0,
        maxSpeed: 80,
        acceleration: 0.3,
        handling: 0.05,
        color: 0xff0000
    },
    compact: {
        name: 'Compact',
        price: 1500,
        maxSpeed: 90,
        acceleration: 0.4,
        handling: 0.06,
        color: 0xff6600
    },
    sedan: {
        name: 'Sedan',
        price: 4000,
        maxSpeed: 100,
        acceleration: 0.45,
        handling: 0.065,
        color: 0xffdd00
    },
    sport: {
        name: 'Sport Bil',
        price: 8000,
        maxSpeed: 110,
        acceleration: 0.5,
        handling: 0.07,
        color: 0xff3300
    },
    muscle: {
        name: 'Muscle Car',
        price: 15000,
        maxSpeed: 120,
        acceleration: 0.55,
        handling: 0.075,
        color: 0xcc0000
    },
    supercar: {
        name: 'Supercar',
        price: 25000,
        maxSpeed: 130,
        acceleration: 0.6,
        handling: 0.09,
        color: 0xffff00
    },
    hypercar: {
        name: 'Hypercar',
        price: 50000,
        maxSpeed: 140,
        acceleration: 0.65,
        handling: 0.12,
        color: 0x00ffff
    },
    legendary: {
        name: 'Legendary Racer',
        price: 100000,
        maxSpeed: 150,
        acceleration: 0.7,
        handling: 0.15,
        color: 0xff00ff
    },
    tank: {
        name: 'Tank',
        price: 75000,
        maxSpeed: 85,
        acceleration: 0.3,
        handling: 0.04,
        color: 0x4b5320,
        canShoot: true,
        type: 'tank'
    },
    ufo: {
        name: 'UFO (Rebirth)',
        price: 0,
        maxSpeed: 200,
        acceleration: 0.9,
        handling: 0.2,
        color: 0x00ff00,
        type: 'ufo',
        reqRebirth: 1
    }
};

const keys = {};

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function normalizeAngleRadians(angle) {
    // Normalize to [-PI, PI]
    return Math.atan2(Math.sin(angle), Math.cos(angle));
}

// Cached DOM Elements (avoid repeated lookups)
const DOM = {
    speed: document.getElementById('speed'),
    speedFill: document.getElementById('speedFill'),
    time: document.getElementById('time'),
    heatLevel: document.getElementById('heatLevel'),
    money: document.getElementById('money'),
    policeDistance: document.getElementById('policeDistance'),
    status: document.getElementById('status'),
    gameOver: document.getElementById('gameOver'),
    gameOverMessage: document.getElementById('gameOverMessage'),
    gameOverTime: document.getElementById('gameOverTime'),
    gameOverMoney: document.getElementById('gameOverMoney'),
    shop: document.getElementById('shop'),
    shopMoney: document.getElementById('shopMoney'),
    carList: document.getElementById('carList'),
    driftIndicator: document.getElementById('driftIndicator')
};

// Shared Geometries and Materials (reduce memory and GC)
const sharedGeometries = {
    wheel: new THREE.CylinderGeometry(5, 5, 8, 16), // Reduced segments from 32
    coin: new THREE.CylinderGeometry(5, 5, 2, 8),   // Reduced segments from 16
    carBody: new THREE.BoxGeometry(20, 12, 45),
    carRoof: new THREE.BoxGeometry(18, 8, 20)
};

const sharedMaterials = {
    wheel: new THREE.MeshLambertMaterial({ color: 0x000000 }),
    coin: new THREE.MeshLambertMaterial({ color: 0xffd700 }),
    redLight: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    blueLight: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    projectile: new THREE.MeshBasicMaterial({ color: 0xff4400 }),
    spark: new THREE.MeshBasicMaterial({ color: 0xffaa00 }),
    duck: new THREE.MeshLambertMaterial({ color: 0xffff00 }),
    duckBeak: new THREE.MeshLambertMaterial({ color: 0xffa500 })
};

// Add projectile geometry after shared materials
const projectileGeometry = new THREE.SphereGeometry(3, 8, 8);
const sparkGeometry = new THREE.BoxGeometry(1, 1, 3);

// Create Ground
function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Main Road - Horizontal
    const roadGeometry = new THREE.PlaneGeometry(300, 10000);
    const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.1;
    road.receiveShadow = true;
    scene.add(road);

    // Main Road - Vertical
    const roadVertical = new THREE.Mesh(roadGeometry, roadMaterial);
    roadVertical.rotation.x = -Math.PI / 2;
    roadVertical.rotation.z = Math.PI / 2;
    roadVertical.position.y = 0.1;
    roadVertical.receiveShadow = true;
    scene.add(roadVertical);

    // Road markings - Horizontal
    const markingGeometry = new THREE.PlaneGeometry(5, 150);
    const markingMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    for (let i = -2500; i < 2500; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(0, 0.2, i);
        marking.receiveShadow = true;
        scene.add(marking);
    }

    // Road markings - Vertical
    for (let i = -2500; i < 2500; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(i, 0.2, 0);
        marking.receiveShadow = true;
        scene.add(marking);
    }
}

// Create Player Car
function createPlayerCar(color = 0xff0000, type = 'standard') {
    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0, 0);

    if (type === 'tank') {
        // Tank Body
        const bodyGeo = new THREE.BoxGeometry(26, 14, 50);
        const bodyMat = new THREE.MeshLambertMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 7;
        body.castShadow = true;
        body.receiveShadow = true;
        body.name = 'carBody';
        carGroup.add(body);

        // Turret
        const turretGeo = new THREE.BoxGeometry(16, 8, 20);
        const turretColor = new THREE.Color(color).multiplyScalar(0.8);
        const turretMat = new THREE.MeshLambertMaterial({ color: turretColor });
        const turret = new THREE.Mesh(turretGeo, turretMat);
        turret.position.set(0, 18, 0);
        turret.castShadow = true;
        turret.receiveShadow = true;
        turret.name = 'carRoof'; // Naming as carRoof so color updates work
        carGroup.add(turret);

        // Barrel
        const barrelGeo = new THREE.CylinderGeometry(2, 2, 30, 16);
        const barrelMat = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const barrel = new THREE.Mesh(barrelGeo, barrelMat);
        barrel.rotation.x = -Math.PI / 2;
        barrel.position.set(0, 18, 20); 
        barrel.castShadow = true;
        carGroup.add(barrel);

        // Tracks
        const trackGeo = new THREE.BoxGeometry(6, 12, 48);
        const trackMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
        
        const leftTrack = new THREE.Mesh(trackGeo, trackMat);
        leftTrack.position.set(-14, 6, 0);
        carGroup.add(leftTrack);

        const rightTrack = new THREE.Mesh(trackGeo, trackMat);
        rightTrack.position.set(14, 6, 0);
        carGroup.add(rightTrack);

    } else if (type === 'ufo') {
        // UFO Saucer
        const saucerGeo = new THREE.CylinderGeometry(15, 25, 8, 32);
        const saucerMat = new THREE.MeshPhongMaterial({ 
             color: color, 
             shininess: 100,
             emissive: 0x222222
        });
        const saucer = new THREE.Mesh(saucerGeo, saucerMat);
        saucer.position.y = 10;
        saucer.castShadow = true;
        saucer.name = 'carBody';
        carGroup.add(saucer);
        
        // Cockpit dome
        const domeGeo = new THREE.SphereGeometry(8, 32, 16, 0, Math.PI * 2, 0, Math.PI/2);
        const domeMat = new THREE.MeshPhongMaterial({ 
             color: 0x88ccff, 
             transparent: true, 
             opacity: 0.8,
             shininess: 150
        });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        dome.position.y = 12;
        carGroup.add(dome);

        // Lights ring
        const lightGeo = new THREE.SphereGeometry(1, 8, 8);
        const lightMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        for (let i = 0; i < 8; i++) {
             const light = new THREE.Mesh(lightGeo, lightMat);
             const angle = (i / 8) * Math.PI * 2;
             light.position.set(Math.cos(angle) * 22, 10, Math.sin(angle) * 22);
             carGroup.add(light);
        }

    } else {
        // Car body
        const bodyGeometry = new THREE.BoxGeometry(20, 12, 45);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 6;
        body.castShadow = true;
        body.receiveShadow = true;
        body.name = 'carBody';
        carGroup.add(body);

        // Car roof (slightly darker than body)
        const roofGeometry = new THREE.BoxGeometry(18, 8, 20);
        const roofColor = new THREE.Color(color).multiplyScalar(0.8);
        const roofMaterial = new THREE.MeshLambertMaterial({ color: roofColor });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.set(0, 16, -5);
        roof.castShadow = true;
        roof.receiveShadow = true;
        roof.name = 'carRoof';
        carGroup.add(roof);

        // Windows
        const windowGeometry = new THREE.BoxGeometry(16, 6, 8);
        const windowMaterial = new THREE.MeshPhongMaterial({ color: 0x4488ff, transparent: true, opacity: 0.5 });
        const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
        frontWindow.position.set(0, 16, 5);
        carGroup.add(frontWindow);

        const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
        backWindow.position.set(0, 16, -12);
        carGroup.add(backWindow);

        // Wheels
        const wheelPositions = [
            [-12, 5, 12],
            [12, 5, 12],
            [-12, 5, -12],
            [12, 5, -12]
        ];

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(sharedGeometries.wheel, sharedMaterials.wheel);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(...pos);
            carGroup.add(wheel);
        });
    }

    scene.add(carGroup);
    return carGroup;
}

// Update player car model logic
function rebuildPlayerCar() {
    if (playerCar) {
        scene.remove(playerCar);
    }
    const carData = cars[gameState.selectedCar];
    playerCar = createPlayerCar(carData.color, carData.type);
    
    // Position needs to be preserved? No, resetGame usually resets it.
    // But if called during shop switch... 
    // Usually shop updates happen in resetGame or shop preview.
    // The shop PREVIEW uses 'updateShopPreview'.
}

// Update player car color
function updatePlayerCarColor(color) {
    const body = playerCar.getObjectByName('carBody');
    const roof = playerCar.getObjectByName('carRoof');
    if (body) body.material.color.setHex(color);
    if (roof) roof.material.color.setHex(color).multiplyScalar(0.8);
}

// Create Money Collectible
function createMoney() {
    const coin = new THREE.Mesh(sharedGeometries.coin, sharedMaterials.coin);
    
    // Random position
    const mapSize = 3500;
    coin.position.set(
        (Math.random() - 0.5) * mapSize * 2,
        5,
        (Math.random() - 0.5) * mapSize * 2
    );
    
    coin.rotation.z = Math.PI / 2;
    coin.rotation.y = Math.random() * Math.PI;
    
    scene.add(coin);
    gameState.collectibles.push(coin);
}

// Create Police Car with Type
function createPoliceCar(type = 'standard') {
    const config = enemies[type];
    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0, -500);
    
    // Scale the car group
    carGroup.scale.set(config.scale, config.scale, config.scale);
    carGroup.userData = { type: type, speed: config.speed };

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(20, 12, 45);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: config.color });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 6;
    body.castShadow = true;
    carGroup.add(body);

    // White stripe (only for police/interceptor)
    if (type === 'standard' || type === 'interceptor') {
        const stripeGeometry = new THREE.BoxGeometry(20, 2, 45);
        const stripeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
        stripe.position.set(0, 12.5, 0);
        carGroup.add(stripe);
    } else if (type === 'military') {
        const camoGeometry = new THREE.BoxGeometry(18, 5, 40);
        const camoMaterial = new THREE.MeshLambertMaterial({ color: 0x3b4a25 }); // Darker camo spot
        const camo = new THREE.Mesh(camoGeometry, camoMaterial);
        camo.position.set(0, 8, 0);
        carGroup.add(camo);
        
        // Add turret for military
        const turretBase = new THREE.Mesh(
            new THREE.CylinderGeometry(6, 8, 5, 8),
            new THREE.MeshLambertMaterial({ color: 0x3b4a25 })
        );
        turretBase.position.set(0, 15, -5);
        carGroup.add(turretBase);
        
        const turretBarrel = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.5, 20, 8),
            new THREE.MeshLambertMaterial({ color: 0x2a2a2a })
        );
        turretBarrel.rotation.x = Math.PI / 2;
        turretBarrel.position.set(0, 17, 10);
        turretBarrel.name = 'turretBarrel';
        carGroup.add(turretBarrel);
        
        // Track last shot time
        carGroup.userData.lastShotTime = 0;
        carGroup.userData.fireRate = 2000; // ms between shots
    }

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(18, 8, 20);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: config.color });
    // Make roof slightly darker
    roofMaterial.color.multiplyScalar(0.8);
    
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 16, -5);
    roof.castShadow = true;
    carGroup.add(roof);

    // Light on roof (use shared materials)
    const lightGeometry = new THREE.BoxGeometry(8, 3, 8);
    const redLight = new THREE.Mesh(lightGeometry, sharedMaterials.redLight);
    redLight.position.set(-4, 20, -8);
    carGroup.add(redLight);

    const blueLight = new THREE.Mesh(lightGeometry, sharedMaterials.blueLight);
    blueLight.position.set(4, 20, -8);
    carGroup.add(blueLight);

    // Wheels (use shared geometry/material)
    const wheelPositions = [
        [-12, 5, 12],
        [12, 5, 12],
        [-12, 5, -12],
        [12, 5, -12]
    ];

    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(sharedGeometries.wheel, sharedMaterials.wheel);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...pos);
        carGroup.add(wheel);
    });

    scene.add(carGroup);
    return carGroup;
}

// Spawn new police car based on Heat Level
function spawnPoliceCar() {
    let type = 'standard';
    const rand = Math.random();
    
    if (gameState.heatLevel >= 2 && rand > 0.6) type = 'interceptor';
    if (gameState.heatLevel >= 3 && rand > 0.7) type = 'swat';
    if (gameState.heatLevel >= 4 && rand > 0.8) type = 'military';

    const policeCar = createPoliceCar(type);
    
    // Spawn at random locations on the map
    const mapSize = 3500;
    // Ensure spawning somewhat away from player
    let x, z;
    do {
        x = (Math.random() - 0.5) * mapSize * 2;
        z = (Math.random() - 0.5) * mapSize * 2;
    } while (Math.abs(x - playerCar.position.x) < 300 && Math.abs(z - playerCar.position.z) < 300);

    policeCar.position.x = x;
    policeCar.position.z = z;
    gameState.policeCars.push(policeCar);
    return policeCar;
}

// Create Buildings (City - Collidable Chunks)
function createBuildings() {
    const buildingPositions = [
        // Left side (inner)
        [-600, -800, 100, 80, 150],
        [-700, -500, 120, 90, 180],
        [-550, -200, 90, 70, 140],
        [-800, 100, 110, 85, 160],
        [-650, 400, 100, 75, 150],
        [-750, 700, 130, 95, 190],
        [-600, 1000, 95, 80, 145],
        
        // Right side (inner)
        [600, -800, 105, 85, 155],
        [700, -500, 115, 88, 175],
        [550, -200, 95, 72, 145],
        [800, 100, 120, 90, 170],
        [650, 400, 105, 78, 155],
        [750, 700, 125, 92, 185],
        [600, 1000, 100, 82, 150],
        
        // Far left
        [-1200, -600, 90, 70, 140],
        [-1300, 200, 110, 85, 160],
        [-1100, 800, 100, 78, 150],
        
        // Far right
        [1200, -600, 95, 75, 145],
        [1300, 200, 115, 88, 170],
        [1100, 800, 105, 80, 155],
        
        // Scattered buildings (inner)
        [-400, -1000, 85, 65, 130],
        [400, -1000, 90, 70, 135],
        [-1100, -200, 100, 75, 150],
        [1100, -200, 105, 80, 155],
        
        // NEW: Expanded map buildings - Far outer areas
        // North section
        [-800, 1800, 120, 90, 200],
        [0, 2200, 150, 100, 220],
        [800, 1800, 110, 85, 180],
        [-1500, 2000, 100, 80, 160],
        [1500, 2000, 105, 82, 170],
        
        // South section
        [-800, -1800, 115, 88, 190],
        [0, -2200, 140, 95, 210],
        [800, -1800, 100, 80, 175],
        [-1500, -2000, 95, 75, 155],
        [1500, -2000, 110, 85, 165],
        
        // Far West
        [-2000, -1000, 130, 95, 200],
        [-2200, 0, 140, 100, 230],
        [-2000, 1000, 120, 90, 190],
        [-2500, -500, 100, 80, 160],
        [-2500, 500, 105, 82, 170],
        
        // Far East
        [2000, -1000, 125, 92, 195],
        [2200, 0, 145, 98, 225],
        [2000, 1000, 115, 88, 185],
        [2500, -500, 98, 78, 155],
        [2500, 500, 102, 80, 165],
        
        // Corners
        [-2500, -2500, 150, 110, 250],
        [2500, -2500, 145, 105, 240],
        [-2500, 2500, 140, 100, 235],
        [2500, 2500, 155, 112, 245],
    ];

    const chunkSize = 30; // Size of each block chunk
    
    // Shared material color map for building chunks
    const buildingMaterials = new Map();

    buildingPositions.forEach(([x, z, width, depth, height]) => {
        // Calculate number of chunks in each dimension
        const nx = Math.ceil(width / chunkSize);
        const ny = Math.ceil(height / chunkSize);
        const nz = Math.ceil(depth / chunkSize);

        const dx = width / nx;
        const dy = height / ny;
        const dz = depth / nz;

        // Use shared geometry per building (all chunks same size)
        const chunkGeometry = new THREE.BoxGeometry(dx, dy, dz);
        
        const colorKey = Math.floor(Math.random() * 1000);
        const buildingColor = new THREE.Color().setHSL(Math.random() * 0.1 + 0.05, 0.6, 0.5);
        const buildingMaterial = new THREE.MeshLambertMaterial({ color: buildingColor });
        
        // Start position (bottom-left-back corner relative to center)
        const startX = x - width / 2 + dx / 2;
        const startY = dy / 2;
        const startZ = z - depth / 2 + dz / 2;

        for(let ix = 0; ix < nx; ix++) {
            for(let iy = 0; iy < ny; iy++) {
                for(let iz = 0; iz < nz; iz++) {
                    const chunk = new THREE.Mesh(chunkGeometry, buildingMaterial);
                    
                    chunk.position.set(
                        startX + ix * dx,
                        startY + iy * dy,
                        startZ + iz * dz
                    );
                    
                    // User data for physics
                    chunk.userData = {
                        isHit: false,
                        velocity: new THREE.Vector3(),
                        rotVelocity: new THREE.Vector3(),
                        width: dx,
                        height: dy,
                        depth: dz
                    };
                    
                    scene.add(chunk);
                    gameState.chunks.push(chunk);
                }
            }
        }
    });
}

// Create Trees (optimized with shared geometries)
function createTrees() {
    const treePositions = [
        [-300, -1500], [300, -1500],
        [-1500, -1200], [1500, -1200],
        [-1600, 500], [1600, 500],
        [-200, 1500], [200, 1500],
        [-1400, 1200], [1400, 1200],
        [-800, -2000], [800, -2000],
        [0, 2000],
    ];

    // Shared geometries and materials for trees
    const trunkGeometry = new THREE.CylinderGeometry(8, 10, 40, 6);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const foliageGeometry = new THREE.ConeGeometry(30, 60, 6);
    const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });

    treePositions.forEach(pos => {
        // Trunk
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(pos[0], 20, pos[1]);
        scene.add(trunk);

        // Foliage
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.set(pos[0], 60, pos[1]);
        scene.add(foliage);
    });
}

// Initialize
let playerCar = createPlayerCar(); // Changed to let for reassignment
const policeCar = createPoliceCar();
createGround();
createBuildings();
createTrees();

// Start game directly
startGame();

// Input handling
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === 'c' || e.key === 'C') {
        gameState.is2DMode = !gameState.is2DMode;
    }
    if ((e.key === 'f' || e.key === 'F')) {
        const currentCar = cars[gameState.selectedCar];
        if (currentCar && currentCar.type === 'tank') {
             const now = Date.now();
             if (now - (gameState.lastPlayerShot || 0) > 800) { // 0.8s cooldown
                  firePlayerProjectile();
                  gameState.lastPlayerShot = now;
             }
        }
    }
    if (e.key === ' ') e.preventDefault();
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Police AI
function updatePoliceAI(delta) {
    let minDistance = 10000;

    gameState.policeCars.forEach((policeCar) => {
        // Handle Dead/Deactivated Cars
        if (policeCar.userData.dead) {
             policeCar.userData.speed *= Math.pow(0.95, delta || 1);
             const move = policeCar.userData.speed * 0.016 * (delta || 1);
             policeCar.position.x += Math.sin(policeCar.rotation.y) * move;
             policeCar.position.z += Math.cos(policeCar.rotation.y) * move;
             
             // Smoke effect
             if (Math.random() < 0.2) createSmoke(policeCar.position);

             // Mark for removal if too old
             if (Date.now() - policeCar.userData.deathTime > 10000) {
                 policeCar.userData.remove = true;
                 scene.remove(policeCar);
             }
             return;
        }

        const dx = playerCar.position.x - policeCar.position.x;
        const dz = playerCar.position.z - policeCar.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        // Tank Ramming Logic
        const currentCar = cars[gameState.selectedCar];
        if (currentCar && currentCar.type === 'tank' && distance < 50) {
             // Crush the police car
             policeCar.userData.dead = true;
             policeCar.userData.deathTime = Date.now();
             // Add impact impulse
             createSmoke(policeCar.position);
             gameState.screenShake = 0.5;
             return; // Skip arrest
        }

        // Police follows player
        const targetDirection = Math.atan2(dx, dz);
        
        // Rotate police car towards player
        const angleDiff = normalizeAngleRadians(targetDirection - policeCar.rotation.y);
        policeCar.rotation.y += clamp(angleDiff, -0.06, 0.06) * (delta || 1);

        // Move police towards player with constant speed
        // Get speed from userData or default
        const policeSpeed = policeCar.userData.speed || 250;

        const policeMove = policeSpeed * 0.016 * (delta || 1);
        policeCar.position.z += Math.cos(policeCar.rotation.y) * policeMove;
        policeCar.position.x += Math.sin(policeCar.rotation.y) * policeMove;

        // Military vehicles shoot at player
        if (policeCar.userData.type === 'military') {
            const now = Date.now();
            if (now - policeCar.userData.lastShotTime > policeCar.userData.fireRate && distance < 800) {
                fireProjectile(policeCar);
                policeCar.userData.lastShotTime = now;
            }
        }

        // Check arrest condition
        if (distance < gameState.arrestDistance && !gameState.arrested) {
            gameState.arrested = true;
            gameState.elapsedTime = (Date.now() - gameState.startTime) / 1000;
            showGameOver();
        }

        minDistance = Math.min(minDistance, distance);
    });

    // Clean up dead cars
    gameState.policeCars = gameState.policeCars.filter(c => !c.userData.remove);

    return minDistance;
}

// Fire projectile from player tank
function firePlayerProjectile() {
    if (gameState.arrested) return;

    const projectile = new THREE.Mesh(projectileGeometry, sharedMaterials.projectile);
    
    const angle = playerCar.rotation.y;
    projectile.position.copy(playerCar.position);
    projectile.position.y = 18;
    projectile.position.x += Math.sin(angle) * 35;
    projectile.position.z += Math.cos(angle) * 35;
    
    projectile.userData = {
        velocity: new THREE.Vector3(
            Math.sin(angle) * 60,
            0,
            Math.cos(angle) * 60
        ),
        lifetime: 2000,
        spawnTime: Date.now(),
        isPlayerShot: true
    };
    
    scene.add(projectile);
    gameState.projectiles.push(projectile);
    
    // Recoil
    gameState.speed -= 2;
}


// Create projectile from military vehicle
function fireProjectile(policeCar) {
    const projectile = new THREE.Mesh(projectileGeometry, sharedMaterials.projectile);
    
    // Position at turret barrel end
    projectile.position.copy(policeCar.position);
    projectile.position.y = 17 * policeCar.scale.y;
    
    // Calculate direction towards player
    const dx = playerCar.position.x - policeCar.position.x;
    const dz = playerCar.position.z - policeCar.position.z;
    const angle = Math.atan2(dx, dz);
    
    // Offset to barrel tip
    projectile.position.x += Math.sin(angle) * 15 * policeCar.scale.x;
    projectile.position.z += Math.cos(angle) * 15 * policeCar.scale.z;
    
    // Store velocity
    const speed = 15;
    projectile.userData = {
        velocity: new THREE.Vector3(
            Math.sin(angle) * speed,
            0,
            Math.cos(angle) * speed
        ),
        lifetime: 3000, // 3 seconds
        spawnTime: Date.now()
    };
    
    scene.add(projectile);
    gameState.projectiles.push(projectile);
}

// Update projectiles
function updateProjectiles(delta) {
    const now = Date.now();
    const playerPos = playerCar.position;
    
    for (let i = gameState.projectiles.length - 1; i >= 0; i--) {
        const proj = gameState.projectiles[i];
        
        // Move projectile
        proj.position.x += proj.userData.velocity.x * (delta || 1);
        proj.position.y += proj.userData.velocity.y * (delta || 1);
        proj.position.z += proj.userData.velocity.z * (delta || 1);
        
        // Check lifetime
        if (now - proj.userData.spawnTime > proj.userData.lifetime) {
            scene.remove(proj);
            gameState.projectiles.splice(i, 1);
            continue;
        }

        if (proj.userData.isPlayerShot) {
            // Check collision with police
            let hit = false;
            for (let j = 0; j < gameState.policeCars.length; j++) {
                const police = gameState.policeCars[j];
                if (police.userData.dead) continue;
                
                const dx = police.position.x - proj.position.x;
                const dz = police.position.z - proj.position.z;
                // Collision radius checks
                if (dx*dx + dz*dz < 600) { // Approx 25 unit radius squared
                    hit = true;
                    police.userData.dead = true;
                    police.userData.deathTime = now;
                    // Boost money!
                    gameState.money += 500;
                    break;
                }
            }
            if (hit) {
                scene.remove(proj);
                gameState.projectiles.splice(i, 1);
                continue;
            }
        } else {
            // Check collision with player
            const dx = playerPos.x - proj.position.x;
            const dz = playerPos.z - proj.position.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            
            if (dist < 20) {
                // HIT! Tank shot causes arrest (or damage?)
                // User said "Tanks can shoot at you - if hit, you get arrested" -> Done.
                scene.remove(proj);
                gameState.projectiles.splice(i, 1);
                
                gameState.arrested = true;
                gameState.elapsedTime = (Date.now() - gameState.startTime) / 1000;
                showGameOver('Du blev ramt af en tank!');
            }
        }
    }
}

// Flash screen red when hit
function flashDamage() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(255, 0, 0, 0.4);
        pointer-events: none;
        z-index: 1000;
        animation: flashFade 0.3s ease-out forwards;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 300);
}

// Add CSS animation for flash
if (!document.getElementById('damageFlashStyle')) {
    const style = document.createElement('style');
    style.id = 'damageFlashStyle';
    style.textContent = `
        @keyframes flashFade {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Shared geometry for tire marks
const tireMarkGeometry = new THREE.PlaneGeometry(3, 8);
const tireMarkMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x111111, 
    transparent: true, 
    opacity: 0.7,
    side: THREE.DoubleSide
});

// Create tire mark on ground
function createTireMark(x, z, rotation) {
    // Limit tire marks for performance
    if (gameState.tireMarks.length > 100) {
        const oldMark = gameState.tireMarks.shift();
        scene.remove(oldMark);
    }
    
    // Create two marks for rear wheels
    const wheelOffset = 10;
    [-1, 1].forEach(side => {
        const mark = new THREE.Mesh(tireMarkGeometry, tireMarkMaterial.clone());
        mark.rotation.x = -Math.PI / 2;
        mark.rotation.z = rotation;
        mark.position.set(
            x + Math.cos(rotation) * wheelOffset * side,
            0.12, // Just above ground
            z - Math.sin(rotation) * wheelOffset * side
        );
        mark.userData = {
            spawnTime: Date.now(),
            lifetime: 5000 // Fade over 5 seconds
        };
        scene.add(mark);
        gameState.tireMarks.push(mark);
    });
}

// Update tire marks (fade out)
function updateTireMarks(delta) {
    const now = Date.now();
    for (let i = gameState.tireMarks.length - 1; i >= 0; i--) {
        const mark = gameState.tireMarks[i];
        const age = now - mark.userData.spawnTime;
        
        if (age > mark.userData.lifetime) {
            scene.remove(mark);
            gameState.tireMarks.splice(i, 1);
            continue;
        }
        
        // Fade out
        mark.material.opacity = 0.7 * (1 - age / mark.userData.lifetime);
    }
}

// Create spark particle
function createSpark() {
    const spark = new THREE.Mesh(sparkGeometry, sharedMaterials.spark);
    
    // Position behind the car
    const carAngle = playerCar.rotation.y;
    const offsetX = (Math.random() - 0.5) * 15;
    spark.position.set(
        playerCar.position.x - Math.sin(carAngle) * 25 + offsetX,
        1 + Math.random() * 3,
        playerCar.position.z - Math.cos(carAngle) * 25
    );
    
    spark.userData = {
        velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 2 - Math.sin(carAngle) * 3,
            Math.random() * 3 + 1,
            (Math.random() - 0.5) * 2 - Math.cos(carAngle) * 3
        ),
        lifetime: 500,
        spawnTime: Date.now(),
        type: 'spark'
    };
    
    scene.add(spark);
    gameState.sparks.push(spark);
}

// Create smoke for dead cars
function createSmoke(position) {
    if (gameState.sparks.length > 300) return; // Limit total particles
    
    const smokeGeo = new THREE.BoxGeometry(3, 3, 3);
    const smokeMat = new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.6 });
    const smoke = new THREE.Mesh(smokeGeo, smokeMat);
    
    smoke.position.copy(position);
    smoke.position.y += 5 + Math.random() * 5;
    
    smoke.userData = {
        velocity: new THREE.Vector3(
             (Math.random() - 0.5) * 2,
             Math.random() * 3 + 2, // Rise up
             (Math.random() - 0.5) * 2
        ),
        lifetime: 2000,
        spawnTime: Date.now(),
        type: 'smoke'
    };
    
    scene.add(smoke);
    gameState.sparks.push(smoke);
}

// Update sparks and smoke
function updateSparks() {
    const now = Date.now();
    
    for (let i = gameState.sparks.length - 1; i >= 0; i--) {
        const particle = gameState.sparks[i];
        const age = now - particle.userData.spawnTime;
        
        if (age > particle.userData.lifetime) {
            scene.remove(particle);
            gameState.sparks.splice(i, 1);
            continue;
        }
        
        // Move
        particle.position.add(particle.userData.velocity);
        
        if (particle.userData.type === 'spark') {
             // Spark gravity
             particle.userData.velocity.y -= 0.15;
             // Ground collision
            if (particle.position.y < 0) {
                scene.remove(particle);
                gameState.sparks.splice(i, 1);
                continue;
            }
        } else if (particle.userData.type === 'smoke') {
             // Smoke expands and slows
             particle.scale.multiplyScalar(1.02);
             particle.userData.velocity.multiplyScalar(0.95);
        }
        
        // Fade out
        particle.material.opacity = (1 - (age / particle.userData.lifetime)) * (particle.userData.type === 'smoke' ? 0.6 : 1);
    }
}

// Create Duck
function createDuck() {
    if (gameState.ducks.length > 5) return; // Max 5 ducks at a time

    const duckGroup = new THREE.Group();
    
    // Body
    const bodyGeo = new THREE.BoxGeometry(4, 3, 5);
    const body = new THREE.Mesh(bodyGeo, sharedMaterials.duck);
    body.position.y = 1.5;
    duckGroup.add(body);
    
    // Head
    const headGeo = new THREE.BoxGeometry(3, 3, 3);
    const head = new THREE.Mesh(headGeo, sharedMaterials.duck);
    head.position.set(0, 4, 2);
    duckGroup.add(head);
    
    // Beak
    const beakGeo = new THREE.BoxGeometry(2, 1, 2);
    const beak = new THREE.Mesh(beakGeo, sharedMaterials.duckBeak);
    beak.position.set(0, 3.5, 4);
    duckGroup.add(beak);
    
    // Legs
    const legGeo = new THREE.BoxGeometry(1, 1.5, 1);
    const leftLeg = new THREE.Mesh(legGeo, sharedMaterials.duckBeak);
    leftLeg.position.set(-1, 0.75, 0);
    duckGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeo, sharedMaterials.duckBeak);
    rightLeg.position.set(1, 0.75, 0);
    duckGroup.add(rightLeg);
    
    // Spawn Logic
    // Spawn them on the road ahead of the player? Or random?
    // Let's spawn them crossing the road 
    const spawnDist = 300 + Math.random() * 200;
    const playerAngle = playerCar.rotation.y;
    
    duckGroup.position.x = playerCar.position.x + Math.sin(playerAngle) * spawnDist;
    duckGroup.position.z = playerCar.position.z + Math.cos(playerAngle) * spawnDist;
    
    // Offset sideways to make them cross
    // Cross from left to right or right to left
    const side = Math.random() < 0.5 ? -1 : 1;
    duckGroup.position.x += side * 100;
    
    // Rotate to face appropriate crossing direction
    // If side is -1 (left), duck should face right (+X relative to road?)
    // This is simplified: just give them a velocity
    
    duckGroup.userData = {
        velocity: new THREE.Vector3(
            -side * 0.2, // Move opposite to spawn side
            0,
            0
        ),
        spawnTime: Date.now()
    };
    
    // Align rotation to velocity roughly
    duckGroup.rotation.y = side === -1 ? Math.PI / 2 : -Math.PI / 2;
    
    scene.add(duckGroup);
    gameState.ducks.push(duckGroup);
}

// Update Ducks
function updateDucks(delta) {
    for (let i = gameState.ducks.length - 1; i >= 0; i--) {
        const duck = gameState.ducks[i];
        
        // Move duck
        duck.position.x += duck.userData.velocity.x * (delta || 1) * 60; // Base speed ~12 units/sec
        // duck.position.addScaledVector(duck.userData.velocity, (delta || 1) * 60);

        // Bobbing animation
        const time = Date.now() * 0.01;
        duck.position.y = Math.sin(time) * 0.5 + 0.5;
        
        // Distance check for cleanup
        const dist = duck.position.distanceTo(playerCar.position);
        if (dist > 600) {
            scene.remove(duck);
            gameState.ducks.splice(i, 1);
            continue;
        }
        
        // Collision Check
        if (dist < 15) {
             // KILLED THE DUCK!
             gameState.arrested = true;
             gameState.elapsedTime = (Date.now() - gameState.startTime) / 1000;
             showGameOver("Åh nej! Du dræbte ænderne, brormand...!");
        }
    }
}

// Speed visual effects (FOV, shake, sparks)
function updateSpeedEffects(delta) {
    const speedRatio = Math.abs(gameState.speed) / gameState.maxSpeed;
    
    // Dynamic FOV - increases with speed for sense of motion
    const targetFOV = gameState.baseFOV + speedRatio * 20;
    gameState.currentFOV += (targetFOV - gameState.currentFOV) * 0.1;
    camera.fov = gameState.currentFOV;
    camera.updateProjectionMatrix();
    
    // Screen shake at high speeds
    if (speedRatio > 0.8) {
        gameState.screenShake = (speedRatio - 0.8) * 5;
    } else {
        gameState.screenShake *= 0.9;
    }
    
    // Spawn sparks when going fast
    if (speedRatio > 0.7 && Math.random() < speedRatio * 0.3) {
        createSpark();
    }
    
    // Limit sparks
    while (gameState.sparks.length > 30) {
        const oldSpark = gameState.sparks.shift();
        scene.remove(oldSpark);
    }
    
    // Spawn speed particles when moving
    if (speedRatio > 0.2) {
        const particleCount = Math.floor(speedRatio * 3);
        for (let i = 0; i < particleCount; i++) {
            if (Math.random() < 0.4) createSpeedParticle();
        }
    }
    
    // Update speed particles
    updateSpeedParticles(delta);
}

// Speed particle geometry (small streaks)
const speedParticleGeometry = new THREE.BoxGeometry(0.5, 0.5, 3);
const speedParticleMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff, 
    transparent: true, 
    opacity: 0.6 
});

// Create speed particle (dust/air streak)
function createSpeedParticle() {
    // Limit particles for performance
    if (gameState.speedParticles.length > 60) return;
    
    const particle = new THREE.Mesh(speedParticleGeometry, speedParticleMaterial.clone());
    
    // Spawn in front of camera, spread out
    const spread = 150;
    const distance = 50 + Math.random() * 100;
    
    // Position relative to player car, in front and to the sides
    const angle = playerCar.rotation.y + (Math.random() - 0.5) * 1.5;
    particle.position.set(
        playerCar.position.x + Math.sin(angle) * distance + (Math.random() - 0.5) * spread,
        5 + Math.random() * 40,
        playerCar.position.z + Math.cos(angle) * distance + (Math.random() - 0.5) * spread
    );
    
    // Rotate to face direction of travel (streak effect)
    particle.rotation.y = playerCar.rotation.y;
    
    // Random slight color variation (white to light grey)
    const brightness = 0.7 + Math.random() * 0.3;
    particle.material.color.setRGB(brightness, brightness, brightness);
    particle.material.opacity = 0.3 + Math.random() * 0.4;
    
    particle.userData = {
        lifetime: 800 + Math.random() * 400,
        spawnTime: Date.now()
    };
    
    scene.add(particle);
    gameState.speedParticles.push(particle);
}

// Update speed particles
function updateSpeedParticles(delta) {
    const now = Date.now();
    const speedRatio = Math.abs(gameState.speed) / gameState.maxSpeed;
    
    for (let i = gameState.speedParticles.length - 1; i >= 0; i--) {
        const particle = gameState.speedParticles[i];
        const age = now - particle.userData.spawnTime;
        
        if (age > particle.userData.lifetime) {
            scene.remove(particle);
            gameState.speedParticles.splice(i, 1);
            continue;
        }
        
        // Move particles past the camera (opposite to car direction)
        const moveSpeed = (gameState.speed * 1.5 + 20) * delta;
        particle.position.x -= Math.sin(playerCar.rotation.y) * moveSpeed;
        particle.position.z -= Math.cos(playerCar.rotation.y) * moveSpeed;
        
        // Stretch particle based on speed
        particle.scale.z = 1 + speedRatio * 4;
        
        // Fade out
        const lifeRatio = age / particle.userData.lifetime;
        particle.material.opacity = (1 - lifeRatio) * (0.3 + speedRatio * 0.5);
    }
}

// Game Logic Control (Economy, Heat, Spawning)
function updateGameLogic() {
    if (gameState.arrested) return;

    const time = gameState.elapsedTime;

    // Heat Level Logic - expanded to 6 levels
    if (time < 45) gameState.heatLevel = 1;
    else if (time < 90) gameState.heatLevel = 2;
    else if (time < 150) gameState.heatLevel = 3;
    else if (time < 220) gameState.heatLevel = 4;
    else if (time < 300) gameState.heatLevel = 5;
    else gameState.heatLevel = 6;

    // Money Spawning
    if (Math.random() < 0.02) { // approx 1 per second
         createMoney();
         // Limit max collectibles
         if (gameState.collectibles.length > 50) {
             const oldCoin = gameState.collectibles.shift();
             scene.remove(oldCoin);
         }
    }

    // Duck Spawning (Rare)
    if (Math.random() < 0.005) { // 1 in 200 frames approx
        createDuck();
    }

    // Money Collection & Animation
    for (let i = gameState.collectibles.length - 1; i >= 0; i--) {
        const coin = gameState.collectibles[i];
        coin.rotation.y += 0.05;

        const dx = playerCar.position.x - coin.position.x;
        const dz = playerCar.position.z - coin.position.z;
        if (Math.sqrt(dx*dx + dz*dz) < 20) {
            // Collected!
            scene.remove(coin);
            gameState.collectibles.splice(i, 1);
            
            // Dynamic value
            const baseValue = 50;
            const timeBonus = Math.floor(time / 10) * 10; 
            const rebirthMult = (gameState.rebirthPoints || 0) + 1;
            gameState.money += (baseValue + timeBonus) * rebirthMult;
        }
    }
}

// Update chunks physics and collision
function updateBuildingChunks(delta) {
    if(!playerCar || gameState.chunks.length === 0) return;
    const d = delta || 1;

    // Player car bounding sphere radius approx
    const carRadius = 15; 
    const carPos = playerCar.position;

    gameState.chunks.forEach(chunk => {
        if (!chunk.userData.isHit) {
            // Check collision with car
            // Optimization: first check Manhattan distance or squared distance
            if (Math.abs(chunk.position.x - carPos.x) < 40 && Math.abs(chunk.position.z - carPos.z) < 40) {
                // More precise check
                const dx = chunk.position.x - carPos.x;
                const dz = chunk.position.z - carPos.z;
                const distSq = dx*dx + dz*dz;
                
                // Collision radius check (car radius + chunk approx radius)
                if (distSq < (carRadius + chunk.userData.width/2 + 5)**2) {
                     // Check vertical overlap (car is at y=6 approx, chunk at varying height)
                     // Car height is approx 12-20
                     if (Math.abs(chunk.position.y - carPos.y) < (chunk.userData.height/2 + 10)) {
                         // HIT!
                         chunk.userData.isHit = true;
                         
                         // Calculate impact velocity based on car movement
                         const carSpeed = gameState.speed;
                         // Car direction
                         const carAngle = playerCar.rotation.y;
                         
                         // Direction from car to chunk
                         const angleToChunk = Math.atan2(dx, dz);
                         
                         chunk.userData.velocity.set(
                            Math.sin(carAngle) * carSpeed * 0.2 + (Math.sin(angleToChunk) * 5),
                            Math.abs(carSpeed) * 0.1 + 5 + Math.random() * 5,
                            Math.cos(carAngle) * carSpeed * 0.2 + (Math.cos(angleToChunk) * 5)
                         );
                         
                         chunk.userData.rotVelocity.set(
                            (Math.random() - 0.5) * 0.5,
                            (Math.random() - 0.5) * 0.5,
                            (Math.random() - 0.5) * 0.5
                         );

                         // Slow down car slightly
                         gameState.speed *= 0.95; 
                     }
                }
            }
        } else {
            // Update physics for hit chunks
            chunk.position.x += chunk.userData.velocity.x * d;
            chunk.position.y += chunk.userData.velocity.y * d;
            chunk.position.z += chunk.userData.velocity.z * d;
            chunk.rotation.x += chunk.userData.rotVelocity.x * d;
            chunk.rotation.y += chunk.userData.rotVelocity.y * d;
            chunk.rotation.z += chunk.userData.rotVelocity.z * d;
            
            // Gravity
            chunk.userData.velocity.y -= 0.5 * d;
            
            // Ground bounce
            if (chunk.position.y < chunk.userData.height/2) {
                chunk.position.y = chunk.userData.height/2;
                chunk.userData.velocity.y *= -0.5; // bounce with damping
                // Frame-rate independent friction: friction^delta
                const frictionFactor = Math.pow(0.8, d);
                chunk.userData.velocity.x *= frictionFactor;
                chunk.userData.velocity.z *= frictionFactor;
                
                chunk.userData.rotVelocity.multiplyScalar(frictionFactor);

                // Stop logic
                if (Math.abs(chunk.userData.velocity.y) < 0.5 && chunk.userData.velocity.lengthSq() < 1) {
                    chunk.userData.velocity.set(0,0,0);
                    chunk.userData.rotVelocity.set(0,0,0);
                }
            }
        }
    });
}

// Update HUD (optimized with cached DOM)
function updateHUD(policeDistance) {
    const speedKmh = Math.round(gameState.speed * 3.6);
    DOM.speed.textContent = speedKmh;
    DOM.speedFill.style.width = clamp((gameState.speed / gameState.maxSpeed) * 100, 0, 100) + '%';

    if (gameState.speed > gameState.maxSpeedWarning) {
        DOM.speedFill.style.background = 'linear-gradient(to right, #ffff00, #ff0000)';
    } else {
        DOM.speedFill.style.background = 'linear-gradient(to right, #00ff00, #ffff00, #ff0000)';
    }
    
    // Drift indicator
    if (gameState.driftFactor > 0.3) {
        DOM.driftIndicator.style.display = 'block';
        DOM.driftIndicator.style.opacity = Math.min(1, gameState.driftFactor * 1.5);
    } else {
        DOM.driftIndicator.style.display = 'none';
    }

    // Update time and money
    const elapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
    DOM.time.textContent = elapsedSeconds;
    DOM.heatLevel.textContent = gameState.heatLevel;
    
    // Style heat level
    const heatColor = ['#00ff00', '#99ff00', '#ffff00', '#ff8800', '#ff4400', '#ff0000'][gameState.heatLevel - 1] || '#ff0000';
    DOM.heatLevel.style.color = heatColor;

    gameState.elapsedTime = elapsedSeconds;

    // Give money every 10 seconds without being arrested (Passive)
    // Scale passive income with heat level: 100 * level
    if (elapsedSeconds > 0 && elapsedSeconds % 10 === 0 && (Date.now() - gameState.lastMoneyCheckTime) > 500) {
        const rebirthMult = (gameState.rebirthPoints || 0) + 1;
        gameState.money += (100 * gameState.heatLevel) * rebirthMult;
        gameState.lastMoneyCheckTime = Date.now();
    }

    DOM.money.textContent = gameState.money;

    if (policeDistance > 0) {
        DOM.policeDistance.textContent = Math.round(policeDistance);
        
        if (policeDistance < gameState.arrestDistance + 100) {
            DOM.status.textContent = 'I FARE!';
            DOM.status.style.color = '#ff0000';
        } else {
            DOM.status.textContent = 'Fri';
            DOM.status.style.color = '#00ff00';
        }
    }
}

// Show game over screen
function showGameOver(customMessage) {
    // Remove all police cars
    gameState.policeCars.forEach(car => scene.remove(car));
    gameState.policeCars = [];
    
    // Remove collectibles
    gameState.collectibles.forEach(coin => scene.remove(coin));
    gameState.collectibles = [];
    
    // Remove projectiles
    gameState.projectiles.forEach(proj => scene.remove(proj));
    gameState.projectiles = [];

    DOM.gameOverMessage.textContent = customMessage || 'Du blev fanget af politiet og sat i fængsel!';
    DOM.gameOverTime.textContent = Math.round(gameState.elapsedTime);
    DOM.gameOverMoney.textContent = gameState.money;
    DOM.gameOver.style.display = 'block';
}

function goToShop() {
    gameState.totalMoney += gameState.money;
    DOM.shop.style.display = 'flex';
    renderShop();
}

function renderShop() {
    DOM.shopMoney.textContent = gameState.totalMoney;
    DOM.carList.innerHTML = '';

    // Rebirth Button logic
    if (gameState.heatLevel >= 6 && gameState.totalMoney >= 200000 && (gameState.rebirthPoints || 0) < 5) {
        const rebirthBtn = document.createElement('div');
        rebirthBtn.className = 'carCard'; // Reusing style
        rebirthBtn.style.background = 'linear-gradient(45deg, #FF00FF, #00FFFF)';
        rebirthBtn.innerHTML = `
            <h3>REBIRTH SYSTEM</h3>
            <p>Req: Heat 6 + 200k Money</p>
            <p>Reward: Special Cars + 2x Money Payout</p>
            <div class="card-footer">
                <span class="action-indicator">REBIRTH NOW</span>
            </div>
        `;
        rebirthBtn.addEventListener('click', () => {
             if (confirm('Are you sure? This will reset your cars and money but unlock new content!')) {
                 performRebirth();
             }
        });
        DOM.carList.appendChild(rebirthBtn);
    }

    Object.entries(cars).forEach(([key, car]) => {
        // Filter Rebirth Cars
        if (car.reqRebirth && (gameState.rebirthPoints || 0) < car.reqRebirth) return;

        const owned = gameState.ownedCars && gameState.ownedCars[key] || key === 'standard';
        const isSelected = gameState.selectedCar === key;
        const canAfford = gameState.totalMoney >= car.price;
        
        const carCard = document.createElement('div');
        
        // Base classes
        let classes = ['carCard'];
        if (owned) classes.push('owned');
        if (isSelected) classes.push('selected');
        if (!owned) {
            if (canAfford) classes.push('affordable');
            else classes.push('expensive');
        }
        carCard.className = classes.join(' ');

        // Visualizing Stats (normalized approx)
        const maxSpeedPct = Math.min((car.maxSpeed / 160) * 100, 100); 
        const accelPct = Math.min((car.acceleration / 0.8) * 100, 100);
        const handlePct = Math.min((car.handling / 0.15) * 100, 100);
        
        const colorHex = '#' + car.color.toString(16).padStart(6, '0');

        let actionText = '';
        if (isSelected) actionText = 'VALGT';
        else if (owned) actionText = 'VÆLG';
        else if (canAfford) actionText = 'KØB';
        else actionText = 'LÅST';

        carCard.innerHTML = `
            <div class="car-preview-box">
                <div class="car-model-3d">
                    <div class="car-body" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkenColor(colorHex, 30)} 100%);">
                        <div class="car-wheel front-left"></div>
                        <div class="car-wheel front-right"></div>
                        <div class="car-wheel back-left"></div>
                        <div class="car-wheel back-right"></div>
                        <div class="car-headlight left"></div>
                        <div class="car-headlight right"></div>
                        <div class="car-taillight left"></div>
                        <div class="car-taillight right"></div>
                    </div>
                </div>
            </div>
            
            <h3>${car.name}</h3>
            
            <div class="stats-container">
                <div class="stat-row">
                    <span class="stat-label">Fart</span>
                    <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${maxSpeedPct}%"></div></div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Acc</span>
                    <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${accelPct}%"></div></div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Styr</span>
                    <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${handlePct}%"></div></div>
                </div>
            </div>

            <div class="card-footer">
                <span class="price-tag">${car.price > 0 ? car.price + ' kr' : 'GRATIS'}</span>
                <span class="action-indicator">${actionText}</span>
            </div>
        `;

        carCard.addEventListener('click', () => {
            if (owned) {
                gameState.selectedCar = key;
                updateCarStats(key);
                renderShop();
            } else if (canAfford) {
                if(confirm(`Køb ${car.name} for ${car.price}kr?`)) {
                    gameState.totalMoney -= car.price;
                    // Mark as owned in memory (resets on page refresh)
                    if (!gameState.ownedCars) gameState.ownedCars = {};
                    gameState.ownedCars[key] = true;
                    gameState.selectedCar = key;
                    updateCarStats(key);
                    renderShop();
                }
            }
        });

        DOM.carList.appendChild(carCard);
    });
}

function updateCarStats(key) {
    const car = cars[key];
    gameState.maxSpeed = car.maxSpeed;
    gameState.acceleration = car.acceleration;
    gameState.handling = car.handling;
    // Update car color
    updatePlayerCarColor(car.color);
}

// Perform Rebirth
function performRebirth() {
    gameState.rebirthPoints = (gameState.rebirthPoints || 0) + 1;
    gameState.totalMoney = 0;
    gameState.money = 0;
    gameState.ownedCars = { 'standard': true };
    gameState.selectedCar = 'standard';
    
    // Reset Game State but keep Rebirth Points
    startGame();
    
    // Change World Appearance?
    if (gameState.rebirthPoints > 0) {
        scene.fog = new THREE.FogExp2(0x110033, 0.002); // Purple fog
        renderer.setClearColor(0x110033);
        
        // Show unlocked message
        alert(`REBIRTH SUCCESSFUL! Count: ${gameState.rebirthPoints}\nNew Cars Unlocked!\nMoney gained is doubled!`);
    }
}

function startGame() {
    DOM.shop.style.display = 'none';
    DOM.gameOver.style.display = 'none';
    gameState.speed = 0;
    gameState.money = 0;
    gameState.heatLevel = 1;
    gameState.arrested = false;
    gameState.startTime = Date.now();
    gameState.lastMoneyCheckTime = Date.now();
    gameState.lastPoliceSpawnTime = Date.now();
    
    gameState.policeCars.forEach(car => scene.remove(car));
    gameState.policeCars = [];
    
    gameState.collectibles.forEach(coin => scene.remove(coin));
    gameState.collectibles = [];
    
    gameState.projectiles.forEach(proj => scene.remove(proj));
    gameState.projectiles = [];
    
    gameState.ducks.forEach(d => scene.remove(d));
    gameState.ducks = [];

    gameState.slowEffect = 0;
    gameState.slowDuration = 0;
    
    gameState.sparks.forEach(s => scene.remove(s));
    gameState.sparks = [];
    gameState.currentFOV = gameState.baseFOV;
    camera.fov = gameState.baseFOV;
    camera.updateProjectionMatrix();
    
    // Update car model and color
    rebuildPlayerCar();
    
    // Spawn first police car
    spawnPoliceCar();
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Game loop with delta time
let lastTime = performance.now();

function animate() {
    requestAnimationFrame(animate);
    
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 16.67, 2); // Normalize to ~60fps, cap at 2x
    lastTime = now;

    if (!gameState.arrested) {
        const handling = gameState.handling || 0.05;
        const absSpeed = Math.abs(gameState.speed);
        const speedRatio = absSpeed / gameState.maxSpeed;
        
        // Steering input
        let steerInput = 0;
        if (keys['a'] || keys['arrowleft']) steerInput = 1;
        if (keys['d'] || keys['arrowright']) steerInput = -1;
        
        // Acceleration/braking
        if (keys['w'] || keys['arrowup']) {
            // Traction-limited acceleration (less grip at high speed)
            const tractionFactor = 1 - (speedRatio * 0.3);
            gameState.speed = Math.min(gameState.speed + gameState.acceleration * tractionFactor * delta, gameState.maxSpeed);
        }
        if (keys['s'] || keys['arrowdown']) {
            if (gameState.speed > 0) {
                // Braking
                gameState.speed = Math.max(0, gameState.speed - gameState.acceleration * 2 * delta);
            } else {
                // Reversing
                gameState.speed = Math.max(gameState.speed - gameState.acceleration * 0.5 * delta, -gameState.maxReverseSpeed);
            }
        }
        
        // Handbrake drift
        const isHandbraking = keys[' '];
        if (isHandbraking) {
            gameState.speed *= Math.pow(gameState.brakePower, delta);
            gameState.driftFactor = Math.min(gameState.driftFactor + 0.1 * delta, 0.9); // Increase drift
        } else {
            gameState.driftFactor = Math.max(gameState.driftFactor - 0.05 * delta, 0); // Recover grip
        }
        
        // Steering - reduced at high speed, increased when drifting
        const steerStrength = handling * (1 - speedRatio * 0.4) * (1 + gameState.driftFactor * 0.5);
        const targetAngularVelocity = steerInput * steerStrength * (absSpeed / 20); // Need speed to turn
        
        // Smooth angular velocity (momentum)
        gameState.angularVelocity += (targetAngularVelocity - gameState.angularVelocity) * 0.15 * delta;
        gameState.angularVelocity *= 0.92; // Angular friction
        
        // Apply rotation
        playerCar.rotation.y += gameState.angularVelocity * delta;
        
        // Calculate forward and sideways directions
        const forwardX = Math.sin(playerCar.rotation.y);
        const forwardZ = Math.cos(playerCar.rotation.y);
        
        // Velocity with drift physics
        const grip = 1 - gameState.driftFactor;
        const targetVelX = forwardX * gameState.speed;
        const targetVelZ = forwardZ * gameState.speed;
        
        // Blend between current velocity and target (grip determines how quickly we align)
        gameState.velocityX += (targetVelX - gameState.velocityX) * (0.1 + grip * 0.15) * delta;
        gameState.velocityZ += (targetVelZ - gameState.velocityZ) * (0.1 + grip * 0.15) * delta;
        
        // Apply friction
        gameState.speed *= Math.pow(gameState.friction, delta);
        gameState.velocityX *= Math.pow(0.98, delta);
        gameState.velocityZ *= Math.pow(0.98, delta);

        // Apply slow effect if active
        const slowMultiplier = gameState.slowEffect > 0 ? (1 - gameState.slowEffect) : 1;

        // Move player car using velocity
        playerCar.position.x += gameState.velocityX * delta * slowMultiplier;
        playerCar.position.z += gameState.velocityZ * delta * slowMultiplier;
        
        // Visual wheel steering
        gameState.wheelAngle = steerInput * 0.4;
        
        // Car body tilt (lean into turns)
        const targetTilt = -gameState.angularVelocity * speedRatio * 0.3;
        gameState.carTilt += (targetTilt - gameState.carTilt) * 0.1 * delta;
        playerCar.rotation.z = gameState.carTilt;
        
        // Create tire marks when drifting
        if (gameState.driftFactor > 0.3 && absSpeed > 20) {
            createTireMark(playerCar.position.x, playerCar.position.z, playerCar.rotation.y);
        }
        
        // Update tire marks
        updateTireMarks(delta);

        // Boundaries
        const boundary = 4000;
        playerCar.position.x = Math.max(-boundary, Math.min(boundary, playerCar.position.x));
        playerCar.position.z = Math.max(-boundary, Math.min(boundary, playerCar.position.z));
    }

    // Spawn new police car every 10 seconds
    const elapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
    if (elapsedSeconds > 0 && elapsedSeconds % 10 === 0 && (Date.now() - gameState.lastPoliceSpawnTime) > 500) {
        spawnPoliceCar();
        gameState.lastPoliceSpawnTime = Date.now();
    }

    // Generate chunks for buildings
    updateBuildingChunks(delta);

    // Game Logic
    updateGameLogic();

    // Update projectiles
    updateProjectiles(delta);
    
    // Update sparks
    updateSparks();
    
    // Speed visual effects
    updateSpeedEffects(delta);

    // Update Ducks
    updateDucks(delta);

    // Update police and check arrest
    const policeDistance = updatePoliceAI(delta);

    // Update camera
    if (gameState.is2DMode) {
        // 2D Top-down view
        camera.up.set(0, 0, -1); // Orient camera so -Z is "up" on screen
        camera.position.x = playerCar.position.x;
        camera.position.z = playerCar.position.z;
        camera.position.y = 800; // High altitude
        camera.lookAt(playerCar.position);
    } else {
        // Standard Chase Camera (third person view)
        camera.up.set(0, 1, 0); // Restore standard up vector
        const cameraDistance = 80;
        const cameraHeight = 40;
        const targetX = playerCar.position.x - Math.sin(playerCar.rotation.y) * cameraDistance;
        const targetZ = playerCar.position.z - Math.cos(playerCar.rotation.y) * cameraDistance;

        camera.position.x += (targetX - camera.position.x) * 0.1;
        camera.position.y = playerCar.position.y + cameraHeight;
        camera.position.z += (targetZ - camera.position.z) * 0.1;
        
        // Apply screen shake
        if (gameState.screenShake > 0.01) {
            camera.position.x += (Math.random() - 0.5) * gameState.screenShake;
            camera.position.y += (Math.random() - 0.5) * gameState.screenShake * 0.5;
        }
        
        camera.lookAt(playerCar.position.x, playerCar.position.y + 10, playerCar.position.z);
    }

    // Update HUD
    updateHUD(policeDistance);

    renderer.render(scene, camera);
}

animate();
