// Three.js Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 2000, 4000);

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
    arrestDistance: 100,
    arrested: false,
    startTime: Date.now(),
    elapsedTime: 0,
    money: 0,
    totalMoney: 0,
    selectedCar: 'standard',
    lastMoneyCheckTime: 0,
    lastPoliceSpawnTime: 0,
    policeCars: [],
    chunks: [],
    heatLevel: 1,
    collectibles: []
};

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
        price: 500,
        maxSpeed: 90,
        acceleration: 0.4,
        handling: 0.06,
        color: 0xff6600
    },
    sedan: {
        name: 'Sedan',
        price: 1200,
        maxSpeed: 100,
        acceleration: 0.45,
        handling: 0.065,
        color: 0xffdd00
    },
    sport: {
        name: 'Sport Bil',
        price: 2500,
        maxSpeed: 110,
        acceleration: 0.5,
        handling: 0.07,
        color: 0xff3300
    },
    muscle: {
        name: 'Muscle Car',
        price: 4000,
        maxSpeed: 120,
        acceleration: 0.55,
        handling: 0.075,
        color: 0xcc0000
    },
    supercar: {
        name: 'Supercar',
        price: 7500,
        maxSpeed: 130,
        acceleration: 0.6,
        handling: 0.09,
        color: 0xffff00
    },
    hypercar: {
        name: 'Hypercar',
        price: 15000,
        maxSpeed: 140,
        acceleration: 0.65,
        handling: 0.12,
        color: 0x00ffff
    },
    legendary: {
        name: 'Legendary Racer',
        price: 30000,
        maxSpeed: 150,
        acceleration: 0.7,
        handling: 0.15,
        color: 0xff00ff
    }
};

const keys = {};

// Create Ground
function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(5000, 5000);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Main Road - Horizontal
    const roadGeometry = new THREE.PlaneGeometry(300, 5000);
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
function createPlayerCar() {
    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0, 0);

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(20, 12, 45);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 6;
    body.castShadow = true;
    body.receiveShadow = true;
    carGroup.add(body);

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(18, 8, 20);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0xcc0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 16, -5);
    roof.castShadow = true;
    roof.receiveShadow = true;
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
    const wheelGeometry = new THREE.CylinderGeometry(5, 5, 8, 32);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    const wheelPositions = [
        [-12, 5, 12],
        [12, 5, 12],
        [-12, 5, -12],
        [12, 5, -12]
    ];

    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...pos);
        wheel.castShadow = true;
        carGroup.add(wheel);
    });

    scene.add(carGroup);
    return carGroup;
}

// Create Money Collectible
function createMoney() {
    const geometry = new THREE.CylinderGeometry(5, 5, 2, 16);
    const material = new THREE.MeshPhongMaterial({ color: 0xffd700, shininess: 100 });
    const coin = new THREE.Mesh(geometry, material);
    
    // Random position
    const mapSize = 1800;
    coin.position.set(
        (Math.random() - 0.5) * mapSize * 2,
        5,
        (Math.random() - 0.5) * mapSize * 2
    );
    
    coin.rotation.z = Math.PI / 2;
    coin.rotation.y = Math.random() * Math.PI;
    
    coin.castShadow = true;
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

    // Light on roof
    const lightGeometry = new THREE.BoxGeometry(8, 3, 8);
    const redLight = new THREE.Mesh(lightGeometry, new THREE.MeshPhongMaterial({ color: 0xff0000 }));
    redLight.position.set(-4, 20, -8);
    carGroup.add(redLight);

    const blueLight = new THREE.Mesh(lightGeometry, new THREE.MeshPhongMaterial({ color: 0x0000ff }));
    blueLight.position.set(4, 20, -8);
    carGroup.add(blueLight);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(5, 5, 8, 32);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    const wheelPositions = [
        [-12, 5, 12],
        [12, 5, 12],
        [-12, 5, -12],
        [12, 5, -12]
    ];

    if (type === 'swat') {
        // Add extra wheels for SWAT van visuals if desired, or just make them bigger
        wheelGroupScale = 1.2;
    }

    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...pos);
        wheel.castShadow = true;
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
    const mapSize = 1800;
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
        // Left side
        [-600, -800, 100, 80, 150],
        [-700, -500, 120, 90, 180],
        [-550, -200, 90, 70, 140],
        [-800, 100, 110, 85, 160],
        [-650, 400, 100, 75, 150],
        [-750, 700, 130, 95, 190],
        [-600, 1000, 95, 80, 145],
        
        // Right side
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
        
        // Scattered buildings
        [-400, -1000, 85, 65, 130],
        [400, -1000, 90, 70, 135],
        [-1100, -200, 100, 75, 150],
        [1100, -200, 105, 80, 155],
    ];

    const chunkSize = 30; // Size of each block chunk

    buildingPositions.forEach(([x, z, width, depth, height]) => {
        // Calculate number of chunks in each dimension
        const nx = Math.ceil(width / chunkSize);
        const ny = Math.ceil(height / chunkSize);
        const nz = Math.ceil(depth / chunkSize);

        const dx = width / nx;
        const dy = height / ny;
        const dz = depth / nz;

        const buildingColor = new THREE.Color().setHSL(Math.random() * 0.1 + 0.05, 0.6, 0.5);
        
        // Start position (bottom-left-back corner relative to center)
        const startX = x - width / 2 + dx / 2;
        const startY = dy / 2;
        const startZ = z - depth / 2 + dz / 2;

        for(let ix = 0; ix < nx; ix++) {
            for(let iy = 0; iy < ny; iy++) {
                for(let iz = 0; iz < nz; iz++) {
                    const geometry = new THREE.BoxGeometry(dx, dy, dz);
                    const material = new THREE.MeshLambertMaterial({ color: buildingColor });
                    const chunk = new THREE.Mesh(geometry, material);
                    
                    chunk.position.set(
                        startX + ix * dx,
                        startY + iy * dy,
                        startZ + iz * dz
                    );
                    
                    chunk.castShadow = true;
                    chunk.receiveShadow = true;
                    
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

// Create Trees
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

    treePositions.forEach(pos => {
        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(8, 10, 40, 8);
        const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(pos[0], 20, pos[1]);
        trunk.castShadow = true;
        scene.add(trunk);

        // Foliage
        const foliageGeometry = new THREE.ConeGeometry(30, 60, 8);
        const foliageMaterial = new THREE.MeshPhongMaterial({ color: 0x228b22 });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.set(pos[0], 60, pos[1]);
        foliage.castShadow = true;
        scene.add(foliage);
    });
}

// Initialize
const playerCar = createPlayerCar();
const policeCar = createPoliceCar();
createGround();
createBuildings();
createTrees();

// Start game directly
startGame();

// Input handling
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === ' ') e.preventDefault();
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Police AI
function updatePoliceAI() {
    let minDistance = 10000;

    gameState.policeCars.forEach((policeCar) => {
        const dx = playerCar.position.x - policeCar.position.x;
        const dz = playerCar.position.z - policeCar.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        // Police follows player
        const targetDirection = Math.atan2(dx, dz);
        
        // Rotate police car towards player
        const angleDiff = targetDirection - policeCar.rotation.y;
        policeCar.rotation.y += Math.sign(angleDiff) * 0.05;

        // Move police towards player with constant speed
        // Get speed from userData or default
        const policeSpeed = policeCar.userData.speed || 250;
        
        policeCar.position.z += Math.cos(policeCar.rotation.y) * policeSpeed * 0.016;
        policeCar.position.x += Math.sin(policeCar.rotation.y) * policeSpeed * 0.016;

        // Check arrest condition
        if (distance < gameState.arrestDistance && !gameState.arrested) {
            gameState.arrested = true;
            gameState.elapsedTime = (Date.now() - gameState.startTime) / 1000;
            showGameOver();
        }

        minDistance = Math.min(minDistance, distance);
    });

    return minDistance;
}

// Game Logic Control (Economy, Heat, Spawning)
function updateGameLogic() {
    if (gameState.arrested) return;

    const time = gameState.elapsedTime;

    // Heat Level Logic
    if (time < 60) gameState.heatLevel = 1;
    else if (time < 120) gameState.heatLevel = 2;
    else if (time < 180) gameState.heatLevel = 3;
    else gameState.heatLevel = 4;

    // Money Spawning
    if (Math.random() < 0.02) { // approx 1 per second
         createMoney();
         // Limit max collectibles
         if (gameState.collectibles.length > 50) {
             const oldCoin = gameState.collectibles.shift();
             scene.remove(oldCoin);
         }
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
            gameState.money += baseValue + timeBonus;
        }
    }
}

// Update chunks physics and collision
function updateBuildingChunks() {
    if(!playerCar || gameState.chunks.length === 0) return;

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
            chunk.position.add(chunk.userData.velocity);
            chunk.rotation.x += chunk.userData.rotVelocity.x;
            chunk.rotation.y += chunk.userData.rotVelocity.y;
            chunk.rotation.z += chunk.userData.rotVelocity.z;
            
            // Gravity
            chunk.userData.velocity.y -= 0.5;
            
            // Ground bounce
            if (chunk.position.y < chunk.userData.height/2) {
                chunk.position.y = chunk.userData.height/2;
                chunk.userData.velocity.y *= -0.5; // bounce with damping
                chunk.userData.velocity.x *= 0.8; // friction
                chunk.userData.velocity.z *= 0.8;
                
                chunk.userData.rotVelocity.multiplyScalar(0.8);

                // Stop logic
                if (Math.abs(chunk.userData.velocity.y) < 0.5 && chunk.userData.velocity.lengthSq() < 1) {
                    chunk.userData.velocity.set(0,0,0);
                    chunk.userData.rotVelocity.set(0,0,0);
                }
            }
        }
    });
}

// Update HUD
function updateHUD(policeDistance) {
    const speedKmh = Math.round(gameState.speed * 3.6);
    document.getElementById('speed').textContent = speedKmh;
    document.getElementById('speedFill').style.width = (gameState.speed / gameState.maxSpeed * 100) + '%';

    if (gameState.speed > gameState.maxSpeedWarning) {
        document.getElementById('speedFill').style.background = 'linear-gradient(to right, #ffff00, #ff0000)';
    } else {
        document.getElementById('speedFill').style.background = 'linear-gradient(to right, #00ff00, #ffff00, #ff0000)';
    }

    // Update time and money
    const elapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
    document.getElementById('time').textContent = elapsedSeconds;
    document.getElementById('heatLevel').textContent = gameState.heatLevel;
    
    // Style heat level
    const heatColor = ['#00ff00', '#ffff00', '#ff8800', '#ff0000'][gameState.heatLevel - 1];
    document.getElementById('heatLevel').style.color = heatColor;

    gameState.elapsedTime = elapsedSeconds;

    // Give money every 10 seconds without being arrested (Passive)
    // Scale passive income with heat level: 100 * level
    if (elapsedSeconds > 0 && elapsedSeconds % 10 === 0 && (Date.now() - gameState.lastMoneyCheckTime) > 500) {
        gameState.money += 100 * gameState.heatLevel;
        gameState.lastMoneyCheckTime = Date.now();
    }

    document.getElementById('money').textContent = gameState.money;

    if (policeDistance > 0) {
        document.getElementById('policeDistance').textContent = Math.round(policeDistance);
        
        if (policeDistance < gameState.arrestDistance + 100) {
            document.getElementById('status').textContent = 'I FARE!';
            document.getElementById('status').style.color = '#ff0000';
        } else {
            document.getElementById('status').textContent = 'Fri';
            document.getElementById('status').style.color = '#00ff00';
        }
    }
}

// Show game over screen
function showGameOver() {
    // Remove all police cars
    gameState.policeCars.forEach(car => scene.remove(car));
    gameState.policeCars = [];
    
    // Remove collectibles
    gameState.collectibles.forEach(coin => scene.remove(coin));
    gameState.collectibles = [];

    const gameOverScreen = document.getElementById('gameOver');
    document.getElementById('gameOverMessage').textContent = 'Du blev fanget af politiet og sat i fængsel!';
    document.getElementById('gameOverTime').textContent = Math.round(gameState.elapsedTime);
    document.getElementById('gameOverMoney').textContent = gameState.money;
    gameOverScreen.style.display = 'block';
}

function goToShop() {
    gameState.totalMoney += gameState.money;
    document.getElementById('shop').style.display = 'flex';
    renderShop();
}

function renderShop() {
    document.getElementById('shopMoney').textContent = gameState.totalMoney;
    const carList = document.getElementById('carList');
    carList.innerHTML = '';

    Object.entries(cars).forEach(([key, car]) => {
        const owned = localStorage.getItem(`car_${key}`) === 'true' || key === 'standard';
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
                <div class="car-model-icon" style="background-color: ${colorHex}"></div>
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
                    localStorage.setItem(`car_${key}`, 'true');
                    gameState.selectedCar = key;
                    updateCarStats(key);
                    renderShop();
                }
            }
        });

        carList.appendChild(carCard);
    });
}

function updateCarStats(key) {
    const car = cars[key];
    gameState.maxSpeed = car.maxSpeed;
    gameState.acceleration = car.acceleration;
    gameState.handling = car.handling;
}

function startGame() {
    document.getElementById('shop').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
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
    
    // Spawn first police car
    spawnPoliceCar();
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Game loop
function animate() {
    requestAnimationFrame(animate);

    if (!gameState.arrested) {
        // Player controls
        if (keys['w'] || keys['arrowup']) {
            gameState.speed = Math.min(gameState.speed + gameState.acceleration, gameState.maxSpeed);
        }
        if (keys['s'] || keys['arrowdown']) {
            gameState.speed = Math.max(gameState.speed - gameState.acceleration, -gameState.maxReverseSpeed);
        }
        if (keys[' ']) {
            gameState.speed *= gameState.brakePower;
        }
        if (keys['a'] || keys['arrowleft']) {
            playerCar.rotation.y += (gameState.handling || 0.05);
        }
        if (keys['d'] || keys['arrowright']) {
            playerCar.rotation.y -= (gameState.handling || 0.05);
        }

        // Apply friction
        gameState.speed *= gameState.friction;

        // Move player car
        playerCar.position.z += Math.cos(playerCar.rotation.y) * gameState.speed;
        playerCar.position.x += Math.sin(playerCar.rotation.y) * gameState.speed;

        // Boundaries
        const boundary = 2000;
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
    updateBuildingChunks();

    // Game Logic
    updateGameLogic();

    // Update police and check arrest
    const policeDistance = updatePoliceAI();

    // Update camera to follow player car (third person view)
    const cameraDistance = 80;
    const cameraHeight = 40;
    const targetX = playerCar.position.x - Math.sin(playerCar.rotation.y) * cameraDistance;
    const targetZ = playerCar.position.z - Math.cos(playerCar.rotation.y) * cameraDistance;

    camera.position.x += (targetX - camera.position.x) * 0.1;
    camera.position.y = playerCar.position.y + cameraHeight;
    camera.position.z += (targetZ - camera.position.z) * 0.1;
    camera.lookAt(playerCar.position.x, playerCar.position.y + 10, playerCar.position.z);

    // Update HUD
    updateHUD(policeDistance);

    renderer.render(scene, camera);
}

animate();
