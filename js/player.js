import { gameState, keys } from './state.js';
import { scene } from './core.js';
import { cars } from './constants.js';
import { sharedGeometries, sharedMaterials } from './assets.js';
import { createSmoke, createSpark, createTireMark, updateTireMarks } from './particles.js';

let uiCallbacks = {
    triggerDamageEffect: () => {},
    updateHealthUI: () => {}
};

export function setUICallbacks(callbacks) {
    uiCallbacks = { ...uiCallbacks, ...callbacks };
}

export let playerCar;

export function createPlayerCar(color = 0xff0000, type = 'standard') {
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
        turret.name = 'carRoof';
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
        // Standard Car body
        const body = new THREE.Mesh(sharedGeometries.carBody, new THREE.MeshLambertMaterial({ color: color }));
        body.position.y = 6;
        body.castShadow = true;
        body.receiveShadow = true;
        body.name = 'carBody';
        carGroup.add(body);

        // Car roof (slightly darker than body)
        const roofColor = new THREE.Color(color).multiplyScalar(0.8);
        const roof = new THREE.Mesh(sharedGeometries.carRoof, new THREE.MeshLambertMaterial({ color: roofColor }));
        roof.position.set(0, 16, -5);
        roof.castShadow = true;
        roof.receiveShadow = true;
        roof.name = 'carRoof';
        carGroup.add(roof);

        // Windows
        const frontWindow = new THREE.Mesh(sharedGeometries.window, sharedMaterials.window);
        frontWindow.position.set(0, 16, 5);
        carGroup.add(frontWindow);

        const backWindow = new THREE.Mesh(sharedGeometries.window, sharedMaterials.window);
        backWindow.position.set(0, 16, -12);
        carGroup.add(backWindow);

        // Wheels
        const wheelPositions = [
            [-12, 5, 12],
            [12, 5, 12],
            [-12, 5, -12],
            [12, 5, -12]
        ];

        carGroup.userData.wheels = []; 

        wheelPositions.forEach((pos, index) => {
            const wheel = new THREE.Mesh(sharedGeometries.wheel, sharedMaterials.wheel);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(...pos);
            wheel.userData.baseY = pos[1];
            wheel.userData.wobbleOffset = index * Math.PI / 2; 
            carGroup.userData.wheels.push(wheel);
            carGroup.add(wheel);
        });
    }

    scene.add(carGroup);
    // Assign to exported variable
    playerCar = carGroup;
    return carGroup;
}

export function rebuildPlayerCar(color = null) {
    if (playerCar) {
        scene.remove(playerCar);
    }
    const carData = cars[gameState.selectedCar];
    // Use provided color or default to car's color
    const carColor = color !== null ? color : carData.color;
    createPlayerCar(carColor, carData.type);
}

export function updatePlayerCarColor(color) {
    if (!playerCar) return;
    const body = playerCar.getObjectByName('carBody');
    const roof = playerCar.getObjectByName('carRoof');
    if (body) body.material.color.setHex(color);
    if (roof) roof.material.color.setHex(color).multiplyScalar(0.8);
}

export function updateCarStats(key) {
    const car = cars[key];
    gameState.maxSpeed = car.maxSpeed;
    gameState.acceleration = car.acceleration;
    gameState.handling = car.handling;
    updatePlayerCarColor(car.color);
}

export function takeDamage(amount) {
    if (gameState.arrested) return;
    
    // Reduce damage for tank (rebalanced: was 0.2x, now 0.4x)
    if (gameState.selectedCar === 'tank') amount *= 0.4;
    // Reduce damage for UFO (kept at 0.5x)
    if (gameState.selectedCar === 'ufo') amount *= 0.5;

    gameState.health -= amount;
    
    uiCallbacks.triggerDamageEffect();
    uiCallbacks.updateHealthUI();

    if (gameState.health <= 0) {
        gameState.health = 0;
    }
}

// Main update loop for player logic (Physics, controls)
// Enhanced with industry-standard car physics simulation
export function updatePlayer(delta, now) {
    if (!playerCar || gameState.arrested) return;

    // Car cannot drive when HP is 0 or below
    if (gameState.health <= 0) {
        gameState.speed *= 0.95; // Slow to a stop
        if (Math.abs(gameState.speed) < 1) gameState.speed = 0;
        // Still update position with remaining momentum
        playerCar.position.x += gameState.velocityX * delta * 0.5;
        playerCar.position.z += gameState.velocityZ * delta * 0.5;
        gameState.velocityX *= 0.95;
        gameState.velocityZ *= 0.95;
        // Smoke effect
        if (Math.random() < 0.3) createSmoke(playerCar.position);
        return;
    }

    // Calculate max speed penalty based on health (softer curve)
    let healthFactor = Math.max(0, gameState.health) / 100;
    healthFactor = Math.min(1, healthFactor);
    const degradationCurve = 0.5 + (0.5 * healthFactor); // Less harsh: 50% at 0 HP, 100% at full HP
    let effectiveMaxSpeed = gameState.maxSpeed * degradationCurve;
    
    if (gameState.health > 0 && effectiveMaxSpeed < 10) effectiveMaxSpeed = 10;

    const handling = gameState.handling || 0.05;
    const absSpeed = Math.abs(gameState.speed);
    const speedRatio = absSpeed / gameState.maxSpeed;
    
    // === WEIGHT TRANSFER SIMULATION ===
    // Forward weight transfer affects grip (braking = more front grip, acceleration = more rear grip)
    if (!gameState.weightTransfer) gameState.weightTransfer = 0;
    const targetWeightTransfer = (keys['w'] || keys['arrowup']) ? -0.3 : 
                                 (keys['s'] || keys['arrowdown']) ? 0.5 : 0;
    gameState.weightTransfer += (targetWeightTransfer - gameState.weightTransfer) * 0.1 * delta;
    
    // === TIRE GRIP MODEL ===
    // Speed-dependent traction: optimal at medium speeds, reduced at very high speeds
    const optimalSpeedRatio = 0.5;
    const gripLoss = Math.abs(speedRatio - optimalSpeedRatio) * 0.25;
    const baseGrip = 1.15 - gripLoss;
    const tiregrip = Math.max(0.6, baseGrip + gameState.weightTransfer * 0.2);
    
    // Steering
    let steerInput = 0;
    if (keys['a'] || keys['arrowleft']) steerInput = 1;
    if (keys['d'] || keys['arrowright']) steerInput = -1;
    
    // === SPEED-DEPENDENT STEERING SENSITIVITY ===
    // High speed = less responsive steering (more realistic)
    const steeringSensitivity = 1.0 - (speedRatio * 0.5);
    steerInput *= steeringSensitivity;
    
    // Acceleration with improved traction model
    if (keys['w'] || keys['arrowup']) {
        // Better traction at lower speeds due to weight transfer
        const tractionFactor = tiregrip * (1 - (speedRatio * 0.2));
        if (gameState.speed < effectiveMaxSpeed) {
            gameState.speed = Math.min(gameState.speed + gameState.acceleration * tractionFactor * delta, effectiveMaxSpeed);
        } else {
            // Drag at high speeds
            gameState.speed *= Math.pow(0.97, delta);
        }
    }
    if (keys['s'] || keys['arrowdown']) {
        // Weight transfer forward improves braking
        const brakingPower = 2 * (1 + gameState.weightTransfer * 0.5);
        if (gameState.speed > 0) {
            gameState.speed = Math.max(0, gameState.speed - gameState.acceleration * brakingPower * delta);
        } else {
            gameState.speed = Math.max(gameState.speed - gameState.acceleration * 0.5 * delta, -gameState.maxReverseSpeed);
        }
    }
    
    // === IMPROVED DRIFT PHYSICS WITH SLIP ANGLE ===
    const isHandbraking = keys[' '];
    if (isHandbraking) {
        gameState.speed *= Math.pow(gameState.brakePower, delta);
        // Drift factor increases faster when turning during handbrake
        const turnInfluence = Math.abs(steerInput) * 0.15;
        gameState.driftFactor = Math.min(gameState.driftFactor + (0.1 + turnInfluence) * delta, 0.9);
    } else {
        // Drift recovery is speed-dependent (faster at higher speeds)
        const recoveryRate = 0.05 + (speedRatio * 0.03);
        gameState.driftFactor = Math.max(gameState.driftFactor - recoveryRate * delta, 0);
    }
    
    // === STEERING PHYSICS WITH UNDERSTEER/OVERSTEER ===
    // Calculate slip angle effect
    const slipAngle = gameState.driftFactor;
    
    // Understeer at high speeds (front tires lose grip)
    const understeerFactor = speedRatio > 0.7 ? (speedRatio - 0.7) * 0.5 : 0;
    
    // Oversteer during drift (rear loses grip)
    const oversteerFactor = slipAngle * 1.5;
    
    // Base steering with grip consideration
    const effectiveHandling = handling * tiregrip;
    const steerStrength = effectiveHandling * (1 - understeerFactor) * (1 + oversteerFactor);
    
    // === DOWNFORCE AT HIGH SPEEDS ===
    // Improved stability and grip at higher speeds
    const downforce = speedRatio > 0.5 ? (speedRatio - 0.5) * 0.3 : 0;
    const stabilityBonus = 1 + downforce;
    
    const targetAngularVelocity = steerInput * steerStrength * (absSpeed / 20);
    
    // Smoother steering response with stability
    const steerResponsiveness = 0.15 * stabilityBonus;
    gameState.angularVelocity += (targetAngularVelocity - gameState.angularVelocity) * steerResponsiveness * delta;
    gameState.angularVelocity *= (0.92 + downforce * 0.03); // Better damping at high speeds
    
    playerCar.rotation.y += gameState.angularVelocity * delta;
    
    // === VELOCITY CALCULATION WITH IMPROVED GRIP MODEL ===
    const forwardX = Math.sin(playerCar.rotation.y);
    const forwardZ = Math.cos(playerCar.rotation.y);
    
    const grip = (1 - gameState.driftFactor) * tiregrip;
    const targetVelX = forwardX * gameState.speed;
    const targetVelZ = forwardZ * gameState.speed;
    
    // Grip transition for drift feel with tire grip consideration
    const velocityBlend = (0.15 + grip * 0.25) * stabilityBonus;
    gameState.velocityX += (targetVelX - gameState.velocityX) * velocityBlend * delta;
    gameState.velocityZ += (targetVelZ - gameState.velocityZ) * velocityBlend * delta;
    
    // Friction with surface grip
    // Only apply base friction (rolling resistance) when not providing input
    // This allows the car to reach max speed while accelerating, but slow down when coasting
    const isInputActive = (keys['w'] || keys['arrowup'] || keys['s'] || keys['arrowdown']);
    if (!isInputActive) {
        gameState.speed *= Math.pow(gameState.friction, delta);
    } else {
        // High Speed Drag (Air Resistance)
        // Applies a gentle friction during acceleration to naturally cap speed
        gameState.speed *= Math.pow(0.992, delta);
    }
    
    // === HARD SPEED CAP ===
    // Ensure speed NEVER exceeds maxSpeed (prevents runaway acceleration bugs)
    if (gameState.speed > effectiveMaxSpeed) {
        gameState.speed = effectiveMaxSpeed;
    } else if (gameState.speed < -gameState.maxReverseSpeed) {
        gameState.speed = -gameState.maxReverseSpeed;
    }
    
    // Fixed: Standard lateral friction to prevent "driving in molasses" feeling
    const lateralFriction = 0.98;
    gameState.velocityX *= Math.pow(lateralFriction, delta);
    gameState.velocityZ *= Math.pow(lateralFriction, delta);

    const slowMultiplier = gameState.slowEffect > 0 ? (1 - gameState.slowEffect) : 1;
    
    // Effects
    if (gameState.health < 30 && Math.random() < 0.1) {
        createSmoke(playerCar.position);
    }
    if (gameState.health <= 0 && Math.random() < 0.3) {
         createSmoke(playerCar.position);
         if(Math.random()<0.1) createSpark(); 
    }

    // Move
    playerCar.position.x += gameState.velocityX * delta * slowMultiplier;
    playerCar.position.z += gameState.velocityZ * delta * slowMultiplier;
    
    // === VISUAL EFFECTS ===
    gameState.wheelAngle = steerInput * 0.4;
    
    // Body tilt based on cornering forces
    const corneringForce = gameState.angularVelocity * speedRatio;
    const targetTilt = -corneringForce * 0.4;
    gameState.carTilt += (targetTilt - gameState.carTilt) * 0.12 * delta;
    playerCar.rotation.z = gameState.carTilt;
    
    // Tire marks during drift
    if (gameState.driftFactor > 0.3 && absSpeed > 20) {
        createTireMark(playerCar.position.x, playerCar.position.z, playerCar.rotation.y);
    }
    updateTireMarks(delta);

    // === IMPROVED SUSPENSION SIMULATION ===
    if (playerCar.userData.wheels) {
        const suspensionRate = absSpeed * 0.008; // Faster oscillation at higher speeds
        const compressionFromSpeed = Math.min(speedRatio * 0.4, 0.4); // Compress suspension at speed
        const compressionFromBrake = (keys['s'] || keys['arrowdown']) ? 0.3 : 0; // Nose dips when braking
        const compressionFromAccel = (keys['w'] || keys['arrowup']) ? -0.2 : 0; // Rear squats when accelerating
        
        playerCar.userData.wheels.forEach((wheel, idx) => {
            const isFront = idx < 2; // First 2 wheels are front
            
            // Base suspension oscillation
            const wobble = Math.sin(now * suspensionRate + wheel.userData.wobbleOffset) * 0.3;
            
            // Speed-dependent vibration
            const jitter = absSpeed > 30 ? (Math.random() - 0.5) * (absSpeed / 150) : 0;
            
            // Cornering load transfer
            const isLeft = (idx % 2) === 0;
            const corneringLoad = isLeft ? -gameState.carTilt * 2 : gameState.carTilt * 2;
            
            // Apply different compression to front vs rear
            const weightTransferEffect = isFront ? compressionFromBrake : compressionFromAccel;
            
            wheel.position.y = wheel.userData.baseY + wobble + jitter + corneringLoad - compressionFromSpeed + weightTransferEffect;
        });
    }

    // Boundaries
    const boundary = 4000;
    playerCar.position.x = Math.max(-boundary, Math.min(boundary, playerCar.position.x));
    playerCar.position.z = Math.max(-boundary, Math.min(boundary, playerCar.position.z));
}

// ============================================
// MULTIPLAYER FUNCTIONS
// ============================================

// Create a car mesh for another network player
export function createOtherPlayerCar(color = 0x00ff00, type = 'standard') {
    const carGroup = new THREE.Group();

    if (type === 'tank') {
        // Tank Body
        const bodyGeo = new THREE.BoxGeometry(26, 14, 50);
        const bodyMat = new THREE.MeshLambertMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 7;
        body.castShadow = true;
        body.receiveShadow = true;
        carGroup.add(body);

        // Turret
        const turretGeo = new THREE.BoxGeometry(16, 8, 20);
        const turretMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(color).multiplyScalar(0.8) });
        const turret = new THREE.Mesh(turretGeo, turretMat);
        turret.position.set(0, 18, 0);
        turret.castShadow = true;
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
        // UFO Disc body
        const discGeo = new THREE.CylinderGeometry(18, 22, 8, 32);
        const discMat = new THREE.MeshLambertMaterial({ color: color });
        const disc = new THREE.Mesh(discGeo, discMat);
        disc.position.y = 15;
        disc.castShadow = true;
        carGroup.add(disc);

        // Dome
        const domeGeo = new THREE.SphereGeometry(10, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMat = new THREE.MeshLambertMaterial({ color: 0x88ccff, transparent: true, opacity: 0.7 });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        dome.position.y = 19;
        carGroup.add(dome);

        // Lights ring
        const lightsGeo = new THREE.TorusGeometry(20, 1.5, 8, 16);
        const lightsMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        const lights = new THREE.Mesh(lightsGeo, lightsMat);
        lights.rotation.x = Math.PI / 2;
        lights.position.y = 15;
        carGroup.add(lights);

    } else {
        // Standard car
        const bodyGeo = sharedGeometries.carBody || new THREE.BoxGeometry(20, 8, 40);
        const bodyMat = new THREE.MeshLambertMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 6;
        body.castShadow = true;
        body.receiveShadow = true;
        carGroup.add(body);

        // Roof
        const roofGeo = sharedGeometries.carRoof || new THREE.BoxGeometry(16, 6, 20);
        const roofMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(color).multiplyScalar(0.8) });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.set(0, 13, -2);
        roof.castShadow = true;
        carGroup.add(roof);

        // Wheels
        const wheelGeo = sharedGeometries.wheel || new THREE.CylinderGeometry(4, 4, 3, 16);
        const wheelMat = sharedMaterials.wheel || new THREE.MeshLambertMaterial({ color: 0x111111 });
        const wheelPositions = [
            { x: -10, y: 4, z: 12 },
            { x: 10, y: 4, z: 12 },
            { x: -10, y: 4, z: -12 },
            { x: 10, y: 4, z: -12 }
        ];
        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeo, wheelMat);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(pos.x, pos.y, pos.z);
            wheel.castShadow = true;
            carGroup.add(wheel);
        });
    }

    scene.add(carGroup);
    return carGroup;
}

// Update another player's car position/rotation from network state
export function updateOtherPlayerCar(mesh, state) {
    if (!mesh || !state) return;
    
    // Smooth interpolation towards target position
    const lerpFactor = 0.3;
    mesh.position.x += (state.x - mesh.position.x) * lerpFactor;
    mesh.position.z += (state.z - mesh.position.z) * lerpFactor;
    
    // Smooth rotation interpolation (support both rotY and rotation field names)
    let targetRotation = state.rotY !== undefined ? state.rotY : state.rotation;
    let currentRotation = mesh.rotation.y;
    
    // Handle rotation wraparound
    let diff = targetRotation - currentRotation;
    if (diff > Math.PI) diff -= Math.PI * 2;
    if (diff < -Math.PI) diff += Math.PI * 2;
    
    mesh.rotation.y += diff * lerpFactor;
}

// Remove another player's car from the scene
export function removeOtherPlayerCar(mesh) {
    if (!mesh) return;
    scene.remove(mesh);
}
