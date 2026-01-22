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
    policeCars: []
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
    road.position.y = 0.01;
    road.receiveShadow = true;
    scene.add(road);

    // Main Road - Vertical
    const roadVertical = new THREE.Mesh(roadGeometry, roadMaterial);
    roadVertical.rotation.x = -Math.PI / 2;
    roadVertical.rotation.z = Math.PI / 2;
    roadVertical.position.y = 0.01;
    roadVertical.receiveShadow = true;
    scene.add(roadVertical);

    // Road markings - Horizontal
    const markingGeometry = new THREE.PlaneGeometry(5, 150);
    const markingMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    for (let i = -2500; i < 2500; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(0, 0.02, i);
        marking.receiveShadow = true;
        scene.add(marking);
    }

    // Road markings - Vertical
    for (let i = -2500; i < 2500; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(i, 0.02, 0);
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

// Create Police Car
function createPoliceCar() {
    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0, -500);

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(20, 12, 45);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 6;
    body.castShadow = true;
    carGroup.add(body);

    // White stripe
    const stripeGeometry = new THREE.BoxGeometry(20, 2, 45);
    const stripeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, 12.5, 0);
    carGroup.add(stripe);

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(18, 8, 20);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x0000aa });
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

// Spawn new police car
function spawnPoliceCar() {
    const policeCar = createPoliceCar();
    // Spawn at random locations on the map
    const mapSize = 1800;
    policeCar.position.x = (Math.random() - 0.5) * mapSize * 2;
    policeCar.position.z = (Math.random() - 0.5) * mapSize * 2;
    gameState.policeCars.push(policeCar);
    return policeCar;
}

// Create Buildings (City)
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

    buildingPositions.forEach(([x, z, width, depth, height]) => {
        // Building body
        const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
        const buildingColor = new THREE.Color().setHSL(Math.random() * 0.1 + 0.05, 0.6, 0.5);
        const buildingMaterial = new THREE.MeshLambertMaterial({ color: buildingColor });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.set(x, height / 2, z);
        building.castShadow = true;
        building.receiveShadow = true;
        scene.add(building);

        // Windows (reduced for performance)
        const windowGeometry = new THREE.BoxGeometry(5, 5, 1);
        const windowMaterial = new THREE.MeshBasicMaterial({ color: 0xffdd44 });

        const windowSpacingX = width / 3;
        const windowSpacingY = height / 4;

        for (let xi = -1; xi <= 1; xi++) {
            for (let yi = 1; yi <= 3; yi++) {
                // Front windows
                const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                frontWindow.position.set(
                    x + xi * windowSpacingX,
                    (yi * windowSpacingY),
                    z + depth / 2
                );
                scene.add(frontWindow);

                // Back windows
                const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                backWindow.position.set(
                    x + xi * windowSpacingX,
                    (yi * windowSpacingY),
                    z - depth / 2
                );
                scene.add(backWindow);
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
        const policeSpeed = 250;
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
    gameState.elapsedTime = elapsedSeconds;

    // Give money every 10 seconds without being arrested
    if (elapsedSeconds > 0 && elapsedSeconds % 10 === 0 && (Date.now() - gameState.lastMoneyCheckTime) > 500) {
        gameState.money += 100;
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
        const owned = localStorage.getItem(`car_${key}`) === 'true';
        const isSelected = gameState.selectedCar === key;
        
        const carCard = document.createElement('div');
        carCard.className = `carCard ${owned ? 'owned' : ''} ${isSelected ? 'owned' : ''}`;
        carCard.innerHTML = `
            <h3>${car.name}</h3>
            <p>Max hastighed: ${car.maxSpeed} km/t</p>
            <p>Acceleration: ${(car.acceleration * 100).toFixed(0)}%</p>
            <p>Håndtering: ${(car.handling * 100).toFixed(0)}%</p>
            <div class="price">${car.price > 0 ? car.price + 'kr' : 'INKLUDERET'}</div>
        `;

        carCard.addEventListener('click', () => {
            if (owned || key === 'standard') {
                gameState.selectedCar = key;
                const car = cars[key];
                gameState.maxSpeed = car.maxSpeed;
                gameState.acceleration = car.acceleration;
                renderShop();
            } else if (gameState.totalMoney >= car.price) {
                gameState.totalMoney -= car.price;
                localStorage.setItem(`car_${key}`, 'true');
                gameState.selectedCar = key;
                const car = cars[key];
                gameState.maxSpeed = car.maxSpeed;
                gameState.acceleration = car.acceleration;
                renderShop();
            }
        });

        carList.appendChild(carCard);
    });
}

function startGame() {
    document.getElementById('shop').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    gameState.speed = 0;
    gameState.money = 0;
    gameState.arrested = false;
    gameState.startTime = Date.now();
    gameState.lastMoneyCheckTime = Date.now();
    gameState.lastPoliceSpawnTime = Date.now();
    gameState.policeCars = [];
    
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
            playerCar.rotation.y += 0.05;
        }
        if (keys['d'] || keys['arrowright']) {
            playerCar.rotation.y -= 0.05;
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
