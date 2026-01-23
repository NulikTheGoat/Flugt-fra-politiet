import { gameState, keys } from './state.js';
import { scene, THREE } from './core.js';
import { cars } from './constants.js';
import { sharedGeometries, sharedMaterials } from './assets.js';
import { createSmoke, createSpark, createTireMark, updateTireMarks } from './particles.js';
import { physicsWorld } from './physics/physicsEngine.js';

// Reusable Vector3 to avoid allocations in hot path
const _smokePos = new THREE.Vector3();
const _carBox = new THREE.Box3();
const _carSize = new THREE.Vector3();

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
        // --- ENHANCED CAR DESIGN ---
        const isSport = ['sport', 'super', 'hyper'].includes(type);
        const isMuscle = type === 'muscle';
        
        // Shiny paint for player
        const bodyMat = new THREE.MeshPhongMaterial({ 
            color: color,
            shininess: isSport ? 100 : 30, // Sport cars are shinier
            specular: 0x444444 
        });

        // 1. Car Body
        const body = new THREE.Mesh(sharedGeometries.carBody, bodyMat);
        body.position.y = 6;
        body.castShadow = true;
        body.receiveShadow = true;
        body.name = 'carBody';
        carGroup.add(body);

        // 2. Car Roof/Cabin
        const roofColor = new THREE.Color(color).multiplyScalar(0.7);
        const roofMat = new THREE.MeshPhongMaterial({ color: roofColor, shininess: 50 });
        const roof = new THREE.Mesh(sharedGeometries.carRoof, roofMat);
        
        // Adjust roof based on car type
        if (isSport) {
            roof.scale.y = 0.7; // Lower profile
            roof.position.set(0, 14, -3); // Shifted back slightly
        } else {
            roof.position.set(0, 16, -5);
        }
        
        roof.castShadow = true;
        roof.receiveShadow = true;
        roof.name = 'carRoof';
        carGroup.add(roof);

        // 3. Reflective Windows
        const windowGeo = new THREE.BoxGeometry(16, 6, 1);
        
        // Front Window (Windshield)
        const frontWindow = new THREE.Mesh(windowGeo, sharedMaterials.window);
        if (isSport) {
            frontWindow.scale.y = 0.7;
            frontWindow.position.set(0, 14, 5); // Matching roof
            frontWindow.rotation.x = -0.2; // Rake it back
        } else {
            frontWindow.position.set(0, 16, 5);
        }
        carGroup.add(frontWindow);

        // Back Window
        const backWindow = new THREE.Mesh(windowGeo, sharedMaterials.window);
        if (isSport) {
            backWindow.scale.y = 0.7;
            backWindow.position.set(0, 14, -11); 
        } else {
            backWindow.position.set(0, 16, -15);
        }
        carGroup.add(backWindow);

        // 4. Bumpers
        const frontBumper = new THREE.Mesh(sharedGeometries.bumper, sharedMaterials.bumper);
        frontBumper.position.set(0, 2, 23);
        carGroup.add(frontBumper);

        const backBumper = new THREE.Mesh(sharedGeometries.bumper, sharedMaterials.bumper);
        backBumper.position.set(0, 2, -23);
        carGroup.add(backBumper);

        // 5. Lights
        // Headlights (Front)
        const leftHeadlight = new THREE.Mesh(sharedGeometries.headlight, sharedMaterials.headlight);
        leftHeadlight.position.set(-7, 6, 22.6);
        carGroup.add(leftHeadlight);

        const rightHeadlight = new THREE.Mesh(sharedGeometries.headlight, sharedMaterials.headlight);
        rightHeadlight.position.set(7, 6, 22.6);
        carGroup.add(rightHeadlight);

        // Emissive Spotlights (Optional - expensive, keeping it fake for now with meshes)
        // If we want real light:
        // const spot = new THREE.SpotLight(0xffffee, 2, 100, 0.5, 0.5, 1); ...

        // Taillights (Back)
        const leftTail = new THREE.Mesh(sharedGeometries.taillight, sharedMaterials.taillight);
        leftTail.position.set(-7, 7, -22.6);
        carGroup.add(leftTail);

        const rightTail = new THREE.Mesh(sharedGeometries.taillight, sharedMaterials.taillight);
        rightTail.position.set(7, 7, -22.6);
        carGroup.add(rightTail);

        // 6. Spoiler (for fancy cars)
        if (isSport || isMuscle) {
            const spoiler = new THREE.Mesh(sharedGeometries.spoiler, bodyMat);
            spoiler.position.set(0, 15, -20);
            if (isSport) spoiler.position.y = 13; // Lower for sport
            
            const standL = new THREE.Mesh(sharedGeometries.spoilerStand, sharedMaterials.bumper);
            standL.position.set(-8, -2, 0);
            spoiler.add(standL);
            
            const standR = new THREE.Mesh(sharedGeometries.spoilerStand, sharedMaterials.bumper);
            standR.position.set(8, -2, 0);
            spoiler.add(standR);

            carGroup.add(spoiler);
        }

        // 7. Exhausts
        const exhaustL = new THREE.Mesh(sharedGeometries.exhaust, sharedMaterials.chrome);
        exhaustL.rotation.x = Math.PI / 2;
        exhaustL.position.set(-5, 2, -24);
        carGroup.add(exhaustL);

        const exhaustR = new THREE.Mesh(sharedGeometries.exhaust, sharedMaterials.chrome);
        exhaustR.rotation.x = Math.PI / 2;
        exhaustR.position.set(5, 2, -24);
        carGroup.add(exhaustR);

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

            // Rims (Chrome cap)
            const rim = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 8.2, 8), sharedMaterials.chrome);
            wheel.add(rim);

            carGroup.userData.wheels.push(wheel);
            carGroup.add(wheel);
        });
    }

    scene.add(carGroup);
    // Assign to exported variable
    playerCar = carGroup;

    // Register physics body (kinematic, driven by custom movement)
    _carBox.setFromObject(carGroup).getSize(_carSize);
    physicsWorld.addKinematicBody(carGroup, 'box', {
        material: 'car',
        size: { width: _carSize.x, height: _carSize.y, depth: _carSize.z }
    });
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
    
    // Reduce damage for tank
    if (gameState.selectedCar === 'tank') amount *= 0.2;
    // Reduce damage for UFO
    if (gameState.selectedCar === 'ufo') amount *= 0.5;

    gameState.health -= amount;
    
    uiCallbacks.triggerDamageEffect();
    uiCallbacks.updateHealthUI();

    if (gameState.health <= 0) {
        gameState.health = 0;
    }
}

// Main update loop for player logic (Physics, controls)
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

    // Calculate max speed penalty based on health
    let healthFactor = Math.max(0, gameState.health) / 100;
    healthFactor = Math.min(1, healthFactor);
    const degradationCurve = 0.2 + (0.8 * healthFactor);
    let effectiveMaxSpeed = gameState.maxSpeed * degradationCurve;
    
    if (gameState.health > 0 && effectiveMaxSpeed < 10) effectiveMaxSpeed = 10;

    const handling = gameState.handling || 0.05;
    const absSpeed = Math.abs(gameState.speed);
    const speedRatio = absSpeed / gameState.maxSpeed;
    
    // Steering
    let steerInput = 0;
    if (keys['a'] || keys['arrowleft']) steerInput = 1;
    if (keys['d'] || keys['arrowright']) steerInput = -1;
    
    // Random steering when HP is below 30 (damaged car handling)
    if (gameState.health < 30 && gameState.health > 0) {
        if (Math.random() < 0.05) { // 5% chance per frame
            steerInput += (Math.random() - 0.5) * 1.5; // Random jitter
        }
    }
    
    // Acceleration
    if (keys['w'] || keys['arrowup']) {
        const tractionFactor = 1 - (speedRatio * 0.3);
        if (gameState.speed < effectiveMaxSpeed) {
            gameState.speed = Math.min(gameState.speed + gameState.acceleration * tractionFactor * delta, effectiveMaxSpeed);
        } else {
            gameState.speed *= Math.pow(0.95, delta);
        }
    }
    if (keys['s'] || keys['arrowdown']) {
        if (gameState.speed > 0) {
            gameState.speed = Math.max(0, gameState.speed - gameState.acceleration * 2 * delta);
        } else {
            gameState.speed = Math.max(gameState.speed - gameState.acceleration * 0.5 * delta, -gameState.maxReverseSpeed);
        }
    }
    
    // Handbrake
    const isHandbraking = keys[' '];
    if (isHandbraking) {
        // Softer slowdown to allow sideways drift instead of full stop
        const handbrakeBrake = absSpeed > 30 ? 0.985 : 0.97;
        gameState.speed *= Math.pow(handbrakeBrake, delta);
        const driftBoost = absSpeed > 15 ? 0.2 : 0.08;
        gameState.driftFactor = Math.min(gameState.driftFactor + driftBoost * delta, 0.95);
    } else {
        gameState.driftFactor = Math.max(gameState.driftFactor - 0.06 * delta, 0);
    }
    
    // Steering physics
    // Steering: more agile at low speed, less agile at high speed
    const agility = Math.max(0.25, 1.4 - speedRatio * 1.1);
    const speedFactor = 0.25 + Math.min(absSpeed, 50) / 50; // maintain turning at low speed
    const steerStrength = handling * agility * (1 + gameState.driftFactor * 0.8);
    const targetAngularVelocity = steerInput * steerStrength * speedFactor;
    
    gameState.angularVelocity += (targetAngularVelocity - gameState.angularVelocity) * 0.15 * delta;
    gameState.angularVelocity *= 0.92;
    
    playerCar.rotation.y += gameState.angularVelocity * delta;
    
    // Velocity calculation
    const forwardX = Math.sin(playerCar.rotation.y);
    const forwardZ = Math.cos(playerCar.rotation.y);
    
    const grip = 1 - Math.min(0.95, gameState.driftFactor + (isHandbraking ? 0.15 : 0));
    let targetVelX = forwardX * gameState.speed;
    let targetVelZ = forwardZ * gameState.speed;
    
    // Add sideways slip when drifting/handbraking at speed
    if (gameState.driftFactor > 0.1 && absSpeed > 10) {
        const rightX = Math.cos(playerCar.rotation.y);
        const rightZ = -Math.sin(playerCar.rotation.y);
        const lateralSlip = gameState.driftFactor * steerInput * absSpeed * 0.35;
        targetVelX += rightX * lateralSlip;
        targetVelZ += rightZ * lateralSlip;
        
        if (isHandbraking && Math.random() < 0.25) {
            _smokePos.set(
                playerCar.position.x - forwardX * 12,
                playerCar.position.y + 2,
                playerCar.position.z - forwardZ * 12
            );
            createSmoke(_smokePos, 0.6);
        }
    }
    
    gameState.velocityX += (targetVelX - gameState.velocityX) * (0.1 + grip * 0.15) * delta;
    gameState.velocityZ += (targetVelZ - gameState.velocityZ) * (0.1 + grip * 0.15) * delta;
    
    // Friction
    gameState.speed *= Math.pow(gameState.friction, delta);
    gameState.velocityX *= Math.pow(0.98, delta);
    gameState.velocityZ *= Math.pow(0.98, delta);

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

    // Sync kinematic physics body to match manual movement
    physicsWorld.syncKinematicBody(playerCar, {
        x: gameState.velocityX,
        y: 0,
        z: gameState.velocityZ
    });
    
    // Visuals
    gameState.wheelAngle = steerInput * 0.4;
    
    const targetTilt = -gameState.angularVelocity * speedRatio * 0.3;
    gameState.carTilt += (targetTilt - gameState.carTilt) * 0.1 * delta;
    playerCar.rotation.z = gameState.carTilt;
    
    // Tire marks
    if (gameState.driftFactor > 0.2 && absSpeed > 10) {
        createTireMark(playerCar.position.x, playerCar.position.z, playerCar.rotation.y);
    }
    updateTireMarks(delta);

    // Wheel Suspensions
    if (playerCar.userData.wheels) {
        playerCar.userData.wheels.forEach(wheel => {
             const wobble = Math.sin(now * 0.05 + wheel.userData.wobbleOffset) * 0.3;
             const jitter = absSpeed > 30 ? (Math.random() - 0.5) * (absSpeed / 100) : 0;
             wheel.position.y = wheel.userData.baseY + wobble + jitter;
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
    
    // Initialize lerp target if not exists
    if (!mesh.userData.targetState) {
        mesh.userData.targetState = { ...state };
        mesh.position.set(state.x, state.y, state.z);
        mesh.rotation.y = state.rotY !== undefined ? state.rotY : state.rotation;
        return;
    }
    
    // Store target state for interpolation
    mesh.userData.targetState = {
        x: state.x,
        y: state.y,
        z: state.z,
        rotY: state.rotY !== undefined ? state.rotY : state.rotation,
        timestamp: Date.now()
    };
}

// Global cached vectors to avoid GC
const _targetPos = new THREE.Vector3();
const _currentPos = new THREE.Vector3();

// Call this every frame to smooth movement
export function interpolateOtherPlayers(delta) {
    const lerpSpeed = 10; // Adjust for smoothness vs responsiveness
    
    gameState.otherPlayers.forEach(player => {
        if (!player.mesh || !player.mesh.userData.targetState) return;
        
        const mesh = player.mesh;
        const target = mesh.userData.targetState;
        
        // Position interpolation
        _targetPos.set(target.x, target.y, target.z);
        _currentPos.copy(mesh.position);
        
        const dist = _currentPos.distanceTo(_targetPos);
        
        // Teleport if too far (e.g. respawn), otherwise smooth lerp
        if (dist > 50) {
            mesh.position.copy(_targetPos);
        } else {
            mesh.position.lerp(_targetPos, lerpSpeed * delta);
        }
        
        // Rotation interpolation
        let currentRot = mesh.rotation.y;
        let targetRot = target.rotY;
        
        // Handle wraparound
        let diff = targetRot - currentRot;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        
        mesh.rotation.y += diff * lerpSpeed * delta;
        
        // Simple wheel spin if moving
        if (player.mesh.userData.wheels && dist > 0.1) {
            const spinSpeed = dist * 2;
            player.mesh.userData.wheels.forEach(wheel => {
               wheel.rotation.x += spinSpeed * delta; 
            });
        }
    });
}

// Remove another player's car from the scene
export function removeOtherPlayerCar(mesh) {
    if (!mesh) return;
    scene.remove(mesh);
}
