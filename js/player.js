import { gameState, keys } from './state.js';
import { scene, camera } from './core.js';
import { cars } from './constants.js';
import { sharedGeometries, sharedMaterials } from './assets.js';
import { createSmoke, createSpark, createTireMark, updateTireMarks, createWheelDust, updateDustParticles } from './particles.js';

let uiCallbacks = {
    triggerDamageEffect: () => {},
    updateHealthUI: () => {}
};

export function setUICallbacks(callbacks) {
    uiCallbacks = { ...uiCallbacks, ...callbacks };
}

export let playerCar;

function clamp01(v) {
    return Math.max(0, Math.min(1, v));
}

function isCarLikeType(type) {
    return !type || ['standard', 'sport', 'muscle', 'super', 'hyper'].includes(type);
}

function makeCarLights(carGroup, opts = {}) {
    const {
        headlightColor = 0xfff6d5,
        taillightColor = 0xff2a2a,
        y = 10,
        zFront = 23,
        zRear = -23,
        x = 8
    } = opts;

    const headMat = new THREE.MeshBasicMaterial({ color: headlightColor });
    const tailMat = new THREE.MeshBasicMaterial({ color: taillightColor });
    const headGeo = new THREE.BoxGeometry(3, 2, 1);
    const tailGeo = new THREE.BoxGeometry(3, 2, 1);

    const headlights = [];
    const taillights = [];

    [-x, x].forEach((lx) => {
        const h = new THREE.Mesh(headGeo, headMat);
        h.position.set(lx, y, zFront);
        h.name = 'headlight';
        carGroup.add(h);
        headlights.push(h);

        const t = new THREE.Mesh(tailGeo, tailMat);
        t.position.set(lx, y, zRear);
        t.name = 'taillight';
        carGroup.add(t);
        taillights.push(t);
    });

    carGroup.userData.headlights = headlights;
    carGroup.userData.taillights = taillights;
}

function createOnFootModel(color) {
    const group = new THREE.Group();
    group.userData.visualType = 'onfoot';
    group.userData.allowTilt = false;
    group.userData.suspensionEnabled = false;
    group.userData.enableTireMarks = false;

    // Enhanced materials
    const shirtMat = new THREE.MeshStandardMaterial({ 
        color,
        roughness: 0.8,
        metalness: 0.0
    });
    const pantsMat = new THREE.MeshStandardMaterial({ 
        color: 0x1c1f2a,
        roughness: 0.85,
        metalness: 0.0
    });
    const skinMat = new THREE.MeshStandardMaterial({ 
        color: 0xffd0b0,
        roughness: 0.7,
        metalness: 0.0
    });
    const shoeMat = new THREE.MeshStandardMaterial({ 
        color: 0x111111,
        roughness: 0.6,
        metalness: 0.1
    });

    const head = new THREE.Mesh(new THREE.SphereGeometry(3.2, 16, 12), skinMat);
    head.position.set(0, 18, 0);
    head.castShadow = true;
    group.add(head);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(5.5, 7.5, 3.2), shirtMat);
    torso.position.set(0, 12, 0);
    torso.castShadow = true;
    torso.receiveShadow = true;
    torso.name = 'carBody';
    group.add(torso);

    const hip = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.2, 3.0), pantsMat);
    hip.position.set(0, 8.2, 0);
    hip.castShadow = true;
    group.add(hip);

    const limbGeo = new THREE.CylinderGeometry(0.9, 0.9, 7.5, 10);
    const armGeo = new THREE.CylinderGeometry(0.7, 0.7, 6.5, 10);

    const leftLeg = new THREE.Mesh(limbGeo, pantsMat);
    leftLeg.position.set(-1.6, 4.2, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(limbGeo, pantsMat);
    rightLeg.position.set(1.6, 4.2, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);

    const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, 3.0), shoeMat);
    leftShoe.position.set(-1.6, 0.6, 1.0);
    leftShoe.castShadow = true;
    group.add(leftShoe);

    const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, 3.0), shoeMat);
    rightShoe.position.set(1.6, 0.6, 1.0);
    rightShoe.castShadow = true;
    group.add(rightShoe);

    const leftArm = new THREE.Mesh(armGeo, shirtMat);
    leftArm.position.set(-3.8, 12.2, 0);
    leftArm.rotation.z = 0.15;
    leftArm.castShadow = true;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, shirtMat);
    rightArm.position.set(3.8, 12.2, 0);
    rightArm.rotation.z = -0.15;
    rightArm.castShadow = true;
    group.add(rightArm);

    group.userData.walkParts = { leftLeg, rightLeg, leftArm, rightArm, leftShoe, rightShoe };
    return group;
}

function createBicycleModel(color, kind = 'bicycle') {
    const group = new THREE.Group();
    group.userData.visualType = kind;
    group.userData.allowTilt = false;
    group.userData.suspensionEnabled = false;
    group.userData.enableTireMarks = false;

    // Enhanced materials
    const frameMat = new THREE.MeshStandardMaterial({ 
        color,
        roughness: 0.5,
        metalness: 0.6
    });
    const metalMat = new THREE.MeshStandardMaterial({ 
        color: 0x999999,
        roughness: 0.4,
        metalness: 0.8
    });
    const rubberMat = new THREE.MeshStandardMaterial({ 
        color: 0x111111,
        roughness: 0.9,
        metalness: 0.0
    });

    const wheelGeo = new THREE.CylinderGeometry(6, 6, 1.6, 16);
    const frontWheel = new THREE.Mesh(wheelGeo, rubberMat);
    frontWheel.rotation.z = Math.PI / 2;
    frontWheel.position.set(0, 6.5, 14);
    frontWheel.castShadow = true;
    group.add(frontWheel);

    const backWheel = new THREE.Mesh(wheelGeo, rubberMat);
    backWheel.rotation.z = Math.PI / 2;
    backWheel.position.set(0, 6.5, -14);
    backWheel.castShadow = true;
    group.add(backWheel);

    // Simple frame
    const tubeGeo = new THREE.CylinderGeometry(0.7, 0.7, 18, 10);
    const topTube = new THREE.Mesh(tubeGeo, frameMat);
    topTube.rotation.x = Math.PI / 2;
    topTube.position.set(0, 10.5, 0);
    topTube.castShadow = true;
    group.add(topTube);

    const downTube = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 20, 10), frameMat);
    downTube.rotation.x = Math.PI / 2;
    downTube.rotation.y = 0.2;
    downTube.position.set(0, 8.5, 2);
    downTube.castShadow = true;
    group.add(downTube);

    const seat = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.0, 4.0), metalMat);
    seat.position.set(0, 13, -6);
    seat.castShadow = true;
    group.add(seat);

    const handlebar = new THREE.Mesh(new THREE.BoxGeometry(8, 0.8, 1.2), metalMat);
    handlebar.position.set(0, 12.5, 10.5);
    handlebar.castShadow = true;
    handlebar.name = 'handlebar';
    group.add(handlebar);

    // Rider (minimal)
    const rider = createOnFootModel(0x2c3e50);
    rider.scale.set(0.7, 0.7, 0.7);
    rider.position.set(0, 3, -2);
    group.add(rider);

    group.userData.rollingWheels = [frontWheel, backWheel];
    group.userData.steerWheels = [frontWheel];
    group.userData.steerMesh = handlebar;
    return group;
}

function createScooterModel(color, variant = 'scooter') {
    const group = new THREE.Group();
    group.userData.visualType = variant;
    group.userData.allowTilt = false;
    group.userData.suspensionEnabled = false;
    group.userData.enableTireMarks = false;

    // Enhanced materials
    const deckMat = new THREE.MeshStandardMaterial({ 
        color,
        roughness: 0.6,
        metalness: 0.5
    });
    const metalMat = new THREE.MeshStandardMaterial({ 
        color: 0x7f8c8d,
        roughness: 0.4,
        metalness: 0.8
    });
    const rubberMat = new THREE.MeshStandardMaterial({ 
        color: 0x111111,
        roughness: 0.9,
        metalness: 0.0
    });
    const trimMat = new THREE.MeshStandardMaterial({ 
        color: 0xd9d9d9,
        roughness: 0.7,
        metalness: 0.2
    });
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfff3c4 });

    const wheelGeo = new THREE.CylinderGeometry(4.2, 4.2, 1.4, 16);
    const frontWheel = new THREE.Mesh(wheelGeo, rubberMat);
    frontWheel.rotation.z = Math.PI / 2;
    frontWheel.position.set(0, 4.8, 12);
    frontWheel.castShadow = true;
    group.add(frontWheel);

    const backWheel = new THREE.Mesh(wheelGeo, rubberMat);
    backWheel.rotation.z = Math.PI / 2;
    backWheel.position.set(0, 4.8, -12);
    backWheel.castShadow = true;
    group.add(backWheel);

    let handlebar = null;

    if (variant === 'scooter_electric') {
        // Kick-scooter style
        const deck = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.0, 20), deckMat);
        deck.position.set(0, 5.2, 0);
        deck.castShadow = true;
        deck.receiveShadow = true;
        deck.name = 'carBody';
        group.add(deck);

        const frontFork = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 10, 10), metalMat);
        frontFork.position.set(0, 10, 10);
        frontFork.castShadow = true;
        group.add(frontFork);

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.8, 12, 10), metalMat);
        stem.position.set(0, 16, 10);
        stem.castShadow = true;
        group.add(stem);

        handlebar = new THREE.Mesh(new THREE.BoxGeometry(12, 0.7, 1.2), metalMat);
        handlebar.position.set(0, 20.5, 10);
        handlebar.castShadow = true;
        handlebar.name = 'handlebar';
        group.add(handlebar);

        const frontCover = new THREE.Mesh(new THREE.BoxGeometry(4.5, 8, 2.2), deckMat);
        frontCover.position.set(0, 10, 12);
        frontCover.castShadow = true;
        group.add(frontCover);

        const headlight = new THREE.Mesh(new THREE.SphereGeometry(1.1, 10, 10), lightMat);
        headlight.position.set(0, 13.5, 13.5);
        group.add(headlight);

        const rearFender = new THREE.Mesh(new THREE.BoxGeometry(6, 1.2, 6), deckMat);
        rearFender.position.set(0, 7.8, -12);
        rearFender.castShadow = true;
        group.add(rearFender);

        const rider = createOnFootModel(0x1d3557);
        rider.scale.set(0.72, 0.72, 0.72);
        rider.position.set(0, 4, -1);
        rider.rotation.x = -0.12;
        group.add(rider);

        const walkParts = rider.userData.walkParts || {};
        group.userData.rider = rider;
        group.userData.kick = { active: false, startTime: 0, duration: 520 };
        group.userData.kickParts = {
            leg: walkParts.rightLeg,
            foot: walkParts.rightShoe,
            body: rider
        };
        group.userData.kickBase = {
            legRotX: walkParts.rightLeg?.rotation.x || 0,
            legRotZ: walkParts.rightLeg?.rotation.z || 0,
            legPosZ: walkParts.rightLeg?.position.z || 0,
            footRotX: walkParts.rightShoe?.rotation.x || 0,
            footPosZ: walkParts.rightShoe?.position.z || 0,
            bodyRotX: rider.rotation.x || 0,
            bodyPosZ: rider.position.z || 0
        };
    } else {
        // Vespa-style body shell
        const body = new THREE.Mesh(new THREE.BoxGeometry(8.5, 7, 22), deckMat);
        body.position.set(0, 8.5, -2);
        body.castShadow = true;
        body.receiveShadow = true;
        body.name = 'carBody';
        group.add(body);

        const frontShield = new THREE.Mesh(new THREE.BoxGeometry(6.5, 10, 6), deckMat);
        frontShield.position.set(0, 10.5, 8);
        frontShield.castShadow = true;
        group.add(frontShield);

        const floorboard = new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.2, 14), deckMat);
        floorboard.position.set(0, 5.5, -1);
        floorboard.castShadow = true;
        floorboard.receiveShadow = true;
        group.add(floorboard);

        const seat = new THREE.Mesh(new THREE.BoxGeometry(6.5, 2.2, 8), trimMat);
        seat.position.set(0, 13.5, -7);
        seat.castShadow = true;
        group.add(seat);

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 8, 10), metalMat);
        stem.position.set(0, 14.5, 10);
        stem.castShadow = true;
        group.add(stem);

        handlebar = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 1.6), metalMat);
        handlebar.position.set(0, 17.5, 10);
        handlebar.castShadow = true;
        handlebar.name = 'handlebar';
        group.add(handlebar);

        const headlight = new THREE.Mesh(new THREE.SphereGeometry(1.2, 10, 10), lightMat);
        headlight.position.set(0, 16.5, 12.5);
        group.add(headlight);

        const tailLight = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1, 0.6), new THREE.MeshBasicMaterial({ color: 0xff3333 }));
        tailLight.position.set(0, 12, -13.5);
        group.add(tailLight);

        const rider = createOnFootModel(0x1d3557);
        rider.scale.set(0.72, 0.72, 0.72);
        rider.position.set(0, 3, -1);
        group.add(rider);
    }

    group.userData.rollingWheels = [frontWheel, backWheel];
    group.userData.steerWheels = [frontWheel];
    group.userData.steerMesh = handlebar;
    return group;
}

export function createPlayerCar(color = 0xff0000, type = 'standard') {
    const resolvedType = type || 'standard';

    // Non-car starter vehicles
    if (resolvedType === 'onfoot') {
        const onFoot = createOnFootModel(color);
        onFoot.position.set(0, 0, 0);
        scene.add(onFoot);
        playerCar = onFoot;
        window.playerCar = playerCar; // Expose
        return onFoot;
    }
    if (resolvedType === 'bicycle') {
        const bike = createBicycleModel(color, 'bicycle');
        bike.position.set(0, 0, 0);
        scene.add(bike);
        playerCar = bike;
        window.playerCar = playerCar; // Expose
        return bike;
    }
    if (resolvedType === 'scooter' || resolvedType === 'scooter_electric') {
        const scooter = createScooterModel(color, resolvedType);
        scooter.position.set(0, 0, 0);
        scene.add(scooter);
        playerCar = scooter;
        window.playerCar = playerCar; // Expose
        return scooter;
    }

    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0, 0);
    carGroup.userData.visualType = resolvedType;
    carGroup.userData.allowTilt = true;
    carGroup.userData.suspensionEnabled = true;
    carGroup.userData.enableTireMarks = true;
    
    // Create CHASSIS group for independent body roll/pitch
    const chassis = new THREE.Group();
    chassis.name = 'chassis';
    carGroup.add(chassis);
    carGroup.userData.chassis = chassis;

    if (resolvedType === 'tank') {
        // Tank Body
        const bodyGeo = new THREE.BoxGeometry(26, 14, 50);
        const bodyMat = new THREE.MeshLambertMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 7;
        body.castShadow = true;
        body.receiveShadow = true;
        body.name = 'carBody';
        chassis.add(body);

        // Turret
        const turretGeo = new THREE.BoxGeometry(16, 8, 20);
        const turretColor = new THREE.Color(color).multiplyScalar(0.8);
        const turretMat = new THREE.MeshLambertMaterial({ color: turretColor });
        const turret = new THREE.Mesh(turretGeo, turretMat);
        turret.position.set(0, 18, 0);
        turret.castShadow = true;
        turret.receiveShadow = true;
        turret.name = 'carRoof';
        chassis.add(turret);

        // Barrel
        const barrelGeo = new THREE.CylinderGeometry(2, 2, 30, 16);
        const barrelMat = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const barrel = new THREE.Mesh(barrelGeo, barrelMat);
        barrel.rotation.x = -Math.PI / 2;
        barrel.position.set(0, 18, 20); 
        barrel.castShadow = true;
        chassis.add(barrel);

        // Tracks (Keep on main group so they don't tilt with suspension)
        const trackGeo = new THREE.BoxGeometry(6, 12, 48);
        const trackMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
        
        const leftTrack = new THREE.Mesh(trackGeo, trackMat);
        leftTrack.position.set(-14, 6, 0);
        carGroup.add(leftTrack);

        const rightTrack = new THREE.Mesh(trackGeo, trackMat);
        rightTrack.position.set(14, 6, 0);
        carGroup.add(rightTrack);

    } else if (resolvedType === 'ufo') {
        // UFO Saucer with enhanced materials
        const saucerGeo = new THREE.CylinderGeometry(15, 25, 8, 32);
        const saucerMat = new THREE.MeshStandardMaterial({ 
             color: color, 
             roughness: 0.2,
             metalness: 0.9,
             emissive: color,
             emissiveIntensity: 0.1
        });
        const saucer = new THREE.Mesh(saucerGeo, saucerMat);
        saucer.position.y = 10;
        saucer.castShadow = true;
        saucer.name = 'carBody';
        carGroup.add(saucer);
        
        // Cockpit dome with improved transparency
        const domeGeo = new THREE.SphereGeometry(8, 32, 16, 0, Math.PI * 2, 0, Math.PI/2);
        const domeMat = new THREE.MeshStandardMaterial({ 
             color: 0x88ccff, 
             transparent: true, 
             opacity: 0.6,
             roughness: 0.1,
             metalness: 0.1
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
        // Standard Car body (with enhanced PBR materials)
        const bodyMat = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.4,
            metalness: 0.6
        });
        const body = new THREE.Mesh(sharedGeometries.carBody, bodyMat);
        body.position.y = 6;
        body.castShadow = true;
        body.receiveShadow = true;
        body.name = 'carBody';
        chassis.add(body);

        // Car roof (slightly darker and less metallic than body)
        const roofColor = new THREE.Color(color).multiplyScalar(0.8);
        const roof = new THREE.Mesh(sharedGeometries.carRoof, new THREE.MeshStandardMaterial({
            color: roofColor,
            roughness: 0.5,
            metalness: 0.4
        }));
        roof.position.set(0, 16, -5);
        roof.castShadow = true;
        roof.receiveShadow = true;
        roof.name = 'carRoof';
        chassis.add(roof);

        // Windows
        const frontWindow = new THREE.Mesh(sharedGeometries.window, sharedMaterials.window);
        frontWindow.position.set(0, 16, 5);
        chassis.add(frontWindow);

        const backWindow = new THREE.Mesh(sharedGeometries.window, sharedMaterials.window);
        backWindow.position.set(0, 16, -12);
        chassis.add(backWindow);

        // Wheels
        const wheelPositions = [
            [-12, 5, 12],
            [12, 5, 12],
            [-12, 5, -12],
            [12, 5, -12]
        ];

        carGroup.userData.wheels = [];
        carGroup.userData.rollingWheels = carGroup.userData.wheels;
        carGroup.userData.steerWheels = [];

        wheelPositions.forEach((pos, index) => {
            const wheel = new THREE.Mesh(sharedGeometries.wheel, sharedMaterials.wheel);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(...pos);
            wheel.userData.baseY = pos[1];
            wheel.userData.wobbleOffset = index * Math.PI / 2; 
            wheel.userData.baseRotY = 0;
            carGroup.userData.wheels.push(wheel);
            if (index < 2) carGroup.userData.steerWheels.push(wheel);
            carGroup.add(wheel);
        });

        // Lights (headlights + brake lights)
        makeCarLights(chassis);

        // Variant styling by vehicle tier
        if (resolvedType === 'sport' || resolvedType === 'super' || resolvedType === 'hyper') {
            const wing = new THREE.Mesh(new THREE.BoxGeometry(18, 1.2, 3.2), new THREE.MeshLambertMaterial({ color: 0x111111 }));
            wing.position.set(0, 18, -20);
            wing.castShadow = true;
            chassis.add(wing);

            const splitter = new THREE.Mesh(new THREE.BoxGeometry(20, 1.0, 4.0), new THREE.MeshLambertMaterial({ color: 0x111111 }));
            splitter.position.set(0, 5.5, 22);
            splitter.castShadow = true;
            chassis.add(splitter);
        }
        if (resolvedType === 'muscle') {
            const scoop = new THREE.Mesh(new THREE.BoxGeometry(6, 2.2, 8), new THREE.MeshLambertMaterial({ color: 0x111111 }));
            scoop.position.set(0, 13, 4);
            scoop.castShadow = true;
            chassis.add(scoop);

            const stripe = new THREE.Mesh(new THREE.BoxGeometry(3, 0.6, 44), new THREE.MeshLambertMaterial({ color: 0xffffff }));
            stripe.position.set(0, 12.3, 0);
            stripe.castShadow = false;
            chassis.add(stripe);
        }
        if (resolvedType === 'hyper') {
            const neon = new THREE.Mesh(new THREE.BoxGeometry(16, 0.5, 44), new THREE.MeshBasicMaterial({ color: 0x00ffff }));
            neon.position.set(0, 4.2, 0);
            neon.name = 'underglow';
            chassis.add(neon);
        }
    }

    scene.add(carGroup);
    // Assign to exported variable
    playerCar = carGroup;
    
    // Expose for debugging/testing
    window.playerCar = playerCar;
    
    return carGroup;
}

export function rebuildPlayerCar(color = null) {
    if (playerCar) {
        scene.remove(playerCar);
    }
    const carData = cars[gameState.selectedCar];
    // Use provided color or default to car's color
    const carColor = color !== null ? color : carData.color;
    // Pass the key name as a fallback type so tiers can have distinct visuals
    createPlayerCar(carColor, carData.type || gameState.selectedCar);
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
    gameState.grip = car.grip || 0.7; // Set grip from car stats
    updatePlayerCarColor(car.color);
}

export function takeDamage(amount) {
    if (gameState.arrested) return;
    
    // Mass-based damage reduction (Rigid Body/Density)
    // Heavier vehicles have better armor/structure
    const currentCar = cars[gameState.selectedCar] || cars.standard;
    const mass = currentCar.mass || 1.0;
    
    // Standard car (mass 1.0) takes 100% damage
    // Tank (mass 5.0) takes ~20% damage -> too strong, make it 50%
    if (mass > 1.0) {
        // Nerf tank durability: instead of 1/mass, use a softer curve
        // mass 5.0 -> was 0.2x, now sqrt(5) = 2.23 -> 0.44x damage
        amount /= Math.sqrt(mass); 
    } else if (mass < 1.0) {
        // Lighter vehicles are fragile, but don't make them glass
        amount *= (1.0 + (1.0 - mass)); 
    }

    // Special reduction for UFO (technology shield)
    if (gameState.selectedCar === 'ufo') amount *= 0.5;

    gameState.health -= amount;
    
    uiCallbacks.triggerDamageEffect();
    uiCallbacks.updateHealthUI();

    if (gameState.health <= 0) {
        gameState.health = 0;
    }
}

function applyKickScooterAnimation(target, now, wantsForward) {
    const kick = target.userData.kick;
    const parts = target.userData.kickParts;
    const base = target.userData.kickBase;
    if (!kick || !parts || !base) return;

    if (!kick.active && wantsForward && Math.abs(gameState.speed) < 0.05) {
        kick.active = true;
        kick.startTime = now;
    }

    if (!kick.active) return;

    const t = (now - kick.startTime) / kick.duration;
    if (t >= 1) {
        kick.active = false;
        if (parts.leg) {
            parts.leg.rotation.x = base.legRotX;
            parts.leg.rotation.z = base.legRotZ;
            parts.leg.position.z = base.legPosZ;
        }
        if (parts.foot) {
            parts.foot.rotation.x = base.footRotX;
            parts.foot.position.z = base.footPosZ;
        }
        if (parts.body) {
            parts.body.rotation.x = base.bodyRotX;
            parts.body.position.z = base.bodyPosZ;
        }
        return;
    }

    const swing = Math.sin(t * Math.PI);
    if (parts.leg) {
        parts.leg.rotation.x = base.legRotX + swing * 0.9;
        parts.leg.position.z = base.legPosZ - swing * 2.2;
    }
    if (parts.foot) {
        parts.foot.rotation.x = base.footRotX - swing * 0.5;
        parts.foot.position.z = base.footPosZ - swing * 3.0;
    }
    if (parts.body) {
        parts.body.rotation.x = base.bodyRotX - swing * 0.08;
        parts.body.position.z = base.bodyPosZ - swing * 1.2;
    }
}

// Main update loop for player logic (Physics, controls)
// Enhanced with industry-standard car physics simulation
export function updatePlayer(delta, now) {
    if (!playerCar || gameState.arrested) return;

    const visualType = playerCar.userData.visualType || gameState.selectedCar || 'standard';
    const isOnFoot = visualType === 'onfoot' || gameState.selectedCar === 'onfoot';

    // Car cannot drive when HP is 0 or below
    if (gameState.health <= 0) {
        // On foot: just stop (no car-like wreck drifting)
        if (isOnFoot) {
            gameState.speed *= 0.7;
            gameState.velocityX *= 0.7;
            gameState.velocityZ *= 0.7;
            if (Math.abs(gameState.speed) < 0.05) gameState.speed = 0;
            playerCar.position.x += gameState.velocityX * delta * 0.5;
            playerCar.position.z += gameState.velocityZ * delta * 0.5;
            return;
        }

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

    // ============================================
    // ON-FOOT RUNNING MODEL (no car steering)
    // ============================================
    if (isOnFoot) {
        // Movement vector relative to camera (XZ plane)
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0;
        if (forward.lengthSq() < 1e-6) forward.set(0, 0, 1);
        forward.normalize();
        // Right vector: perpendicular to forward in XZ plane (correct: -z, 0, +x)
        const right = new THREE.Vector3(-forward.z, 0, forward.x);

        let dirX = 0;
        let dirZ = 0;
        if (keys['w'] || keys['arrowup']) { dirX += forward.x; dirZ += forward.z; }
        if (keys['s'] || keys['arrowdown']) { dirX -= forward.x; dirZ -= forward.z; }
        if (keys['d'] || keys['arrowright']) { dirX += right.x; dirZ += right.z; }
        if (keys['a'] || keys['arrowleft']) { dirX -= right.x; dirZ -= right.z; }

        const wantsMove = (dirX * dirX + dirZ * dirZ) > 1e-6;
        if (wantsMove) {
            const invLen = 1 / Math.sqrt(dirX * dirX + dirZ * dirZ);
            dirX *= invLen;
            dirZ *= invLen;
        }

        const sprint = (keys['shift'] || keys['shiftleft'] || keys['shiftright']) ? 1.15 : 1;
        const targetSpeed = gameState.maxSpeed * sprint;
        const targetVX = wantsMove ? dirX * targetSpeed : 0;
        const targetVZ = wantsMove ? dirZ * targetSpeed : 0;

        // Smooth acceleration towards target velocity
        const accelLerp = clamp01((gameState.acceleration || 0.02) * 14 * delta);
        gameState.velocityX += (targetVX - gameState.velocityX) * accelLerp;
        gameState.velocityZ += (targetVZ - gameState.velocityZ) * accelLerp;

        // Friction when no input
        if (!wantsMove) {
            const friction = Math.pow(gameState.friction || 0.97, delta);
            gameState.velocityX *= friction;
            gameState.velocityZ *= friction;
        }

        // Position update
        playerCar.position.x += gameState.velocityX * delta;
        playerCar.position.z += gameState.velocityZ * delta;

        // Update speed scalar for HUD/logic
        const vSq = gameState.velocityX * gameState.velocityX + gameState.velocityZ * gameState.velocityZ;
        gameState.speed = Math.sqrt(vSq);
        gameState.angularVelocity = 0;
        gameState.driftFactor = 0;

        // Face direction of travel
        if (gameState.speed > 0.15) {
            playerCar.rotation.y = Math.atan2(gameState.velocityX, gameState.velocityZ);
        }

        // Keep grounded
        playerCar.position.y = 0;

        // Boundaries
        const boundary = 4000;
        playerCar.position.x = Math.max(-boundary, Math.min(boundary, playerCar.position.x));
        playerCar.position.z = Math.max(-boundary, Math.min(boundary, playerCar.position.z));
        return;
    }

    if (visualType === 'scooter_electric') {
        const wantsForward = keys['w'] || keys['arrowup'];
        applyKickScooterAnimation(playerCar, now, wantsForward);
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
    
    // Steering (raw input)
    let steerInput = 0;
    if (keys['a'] || keys['arrowleft']) steerInput = 1;
    if (keys['d'] || keys['arrowright']) steerInput = -1;
    
    // === SPEED-DEPENDENT STEERING SENSITIVITY ===
    // High speed = less responsive steering (more realistic)
    const steeringSensitivity = 1.0 - (speedRatio * 0.5);
    steerInput *= steeringSensitivity;

    // When reversing, yaw direction should be inverted (realistic reverse steering).
    // Keep wheel visuals based on raw steering input; only invert the effect on rotation.
    const steerInputForYaw = (gameState.speed < -0.5) ? -steerInput : steerInput;
    
    // === TURNING SPEED PENALTY (CORNERING DRAG) ===
    // Physics: Tires scrubbing against the road during a turn creates friction/drag.
    // Spec factor: Higher handling = less speed loss, Higher grip = better traction in turns
    const isHandbraking = keys[' '];
    const carGrip = gameState.grip || 0.7; // Default grip if not set
    
    if (Math.abs(steerInput) > 0.05 && Math.abs(gameState.speed) > 2 && !isHandbraking) {
        const turnIntensity = Math.abs(steerInput);
        
        // Handling efficiency: better handling = less drag
        const handlingEfficiency = Math.max(0.01, handling) * 20; // 0.05->1, 0.1->2
        
        // Grip efficiency: better grip = less drag (0.5 grip -> 2x drag, 1.0 grip -> 1x drag)
        const gripEfficiency = Math.max(0.3, carGrip);
        
        // Cornering drag - REDUCED for smoother turning feel
        // Lower coefficient = less speed loss when turning
        const rawDrag = (0.08 * turnIntensity * speedRatio) / (Math.sqrt(handlingEfficiency) * gripEfficiency);
        const corneringDrag = Math.min(0.04, rawDrag); // Lower cap for gentler slowdown
        
        const dragFactor = Math.pow(1.0 - corneringDrag, delta);
        gameState.speed *= dragFactor;
        gameState.velocityX *= dragFactor;
        gameState.velocityZ *= dragFactor;
    }
    
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
    
    // === SPEED-BASED TURN RATE (Percentage of Max Speed) ===
    // Turn rate varies smoothly based on what % of max speed you're at
    // 0% speed = 80% turn rate, 100% speed = 10% turn rate
    const speedPercent = Math.min(1.0, absSpeed / gameState.maxSpeed); // 0.0 to 1.0
    const turnRateMultiplier = 0.8 - (speedPercent * 0.7); // Range: 0.8 down to 0.1
    
    const targetAngularVelocity = steerInputForYaw * steerStrength * turnRateMultiplier * 1.5;
    
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
    
    // === HIGH-SPEED GLIDE MECHANIC ===
    // Lower grip cars slide/glide more at high speeds (arcade feel)
    // carGrip: 0.5 (slippery) to 1.0 (sticky)
    const glideIntensity = (1 - carGrip) * speedRatio * 0.3; // Max 15% glide at low grip, high speed
    const effectiveGrip = grip * (1 - glideIntensity);
    
    // Grip transition for drift feel with tire grip consideration
    // Lower grip = slower velocity alignment = more glide/slide
    const velocityBlend = (0.15 + effectiveGrip * 0.25) * stabilityBonus;
    gameState.velocityX += (targetVelX - gameState.velocityX) * velocityBlend * delta;
    gameState.velocityZ += (targetVelZ - gameState.velocityZ) * velocityBlend * delta;
    
    // Friction with surface grip
    // Only apply base friction (rolling resistance) when not providing input
    // This allows the car to reach max speed while accelerating, but slow down when coasting
    const isInputActive = (keys['w'] || keys['arrowup'] || keys['s'] || keys['arrowdown']);
    if (!isInputActive) {
        const frictionFactor = Math.pow(gameState.friction, delta);
        gameState.speed *= frictionFactor;
        // Fix: Apply friction to velocity vectors to prevent drifting maintaining speed indefinitely
        gameState.velocityX *= frictionFactor;
        gameState.velocityZ *= frictionFactor;
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
    
    // Effects (cars only)
    if (!isOnFoot) {
        if (gameState.health < 30 && Math.random() < 0.1) {
            createSmoke(playerCar.position);
        }
        if (gameState.health <= 0 && Math.random() < 0.3) {
            createSmoke(playerCar.position);
            if (Math.random() < 0.1) createSpark();
        }
    }

    // Move
    playerCar.position.x += gameState.velocityX * delta * slowMultiplier;
    playerCar.position.z += gameState.velocityZ * delta * slowMultiplier;
    
    // === VISUAL EFFECTS ===
    // Visual steering should match user input (do not invert in reverse).
    gameState.wheelAngle = steerInput * 0.4;

    const isCar = isCarLikeType(visualType) || visualType === 'tank' || visualType === 'ufo';

    // Body tilt based on cornering forces (cars only)
    if (playerCar.userData.allowTilt !== false && isCar && playerCar.userData.chassis) {
        const corneringForce = gameState.angularVelocity * speedRatio;
        // Increased tilt effect for chassis independence
        const targetTilt = -corneringForce * 0.55; 
        gameState.carTilt += (targetTilt - gameState.carTilt) * 0.12 * delta;
        
        // ROLL (Cornering)
        playerCar.userData.chassis.rotation.z = gameState.carTilt;
        
        // DRIFT SLIDE VISUAL - counter-steer body rotation when drifting
        // The car body rotates slightly opposite to travel direction during drift
        const driftSlideAngle = gameState.driftFactor * steerInput * 0.15 * speedRatio;
        gameState.driftVisualAngle = gameState.driftVisualAngle || 0;
        gameState.driftVisualAngle += (driftSlideAngle - gameState.driftVisualAngle) * 0.1 * delta;
        
        // Apply subtle yaw offset to chassis for that "tail out" look
        if (Math.abs(gameState.driftFactor) > 0.1) {
            playerCar.userData.chassis.rotation.y = gameState.driftVisualAngle;
        } else {
            playerCar.userData.chassis.rotation.y *= 0.9; // Smooth return
        }
        
        // PITCH (Accel/Braking) - Inertia simulation
        // Acceleration = Squat (negative pitch)
        // Braking = Dive (positive pitch)
        let targetPitch = 0;
        if (keys['w'] || keys['arrowup']) targetPitch -= 0.04;
        if (keys['s'] || keys['arrowdown']) targetPitch += 0.06; // Braking dives harder
        
        gameState.carPitch = (gameState.carPitch || 0);
        gameState.carPitch += (targetPitch - gameState.carPitch) * 0.08 * delta;
        playerCar.userData.chassis.rotation.x = gameState.carPitch;
        
    } else if (playerCar.userData.allowTilt !== false && isCar) {
        // Legacy/Fallback for cars without chassis group
        const corneringForce = gameState.angularVelocity * speedRatio;
        const targetTilt = -corneringForce * 0.4;
        gameState.carTilt += (targetTilt - gameState.carTilt) * 0.12 * delta;
        playerCar.rotation.z = gameState.carTilt;
    } else {
        playerCar.rotation.z = 0;
        if(playerCar.userData.chassis) {
            playerCar.userData.chassis.rotation.z = 0;
            playerCar.userData.chassis.rotation.x = 0;
        }
        gameState.carTilt = 0;
    }

    // Tire marks during drift (cars only)
    if (playerCar.userData.enableTireMarks !== false) {
        if (gameState.driftFactor > 0.3 && absSpeed > 20) {
            createTireMark(playerCar.position.x, playerCar.position.z, playerCar.rotation.y);
        }
        updateTireMarks(delta);
        
        // Dust clouds from wheels at high speed or when drifting
        const speedRatio = absSpeed / gameState.maxSpeed;
        const shouldCreateDust = (speedRatio > 0.5 && Math.abs(steerInput) > 0.3) || gameState.driftFactor > 0.2;
        if (shouldCreateDust && Math.random() < 0.4) {
            createWheelDust(playerCar.position, playerCar.rotation.y, gameState.speed, gameState.driftFactor);
        }
        updateDustParticles(delta);
    }

    // Wheel spin + steering visuals
    if (playerCar.userData.rollingWheels && playerCar.userData.rollingWheels.length) {
        const roll = (gameState.speed || 0) * delta * 0.18;
        playerCar.userData.rollingWheels.forEach((wheel) => {
            wheel.rotation.x += roll;
        });
    }
    if (playerCar.userData.steerWheels && playerCar.userData.steerWheels.length) {
        playerCar.userData.steerWheels.forEach((wheel) => {
            wheel.rotation.y = (wheel.userData.baseRotY || 0) + gameState.wheelAngle;
        });
    }
    if (playerCar.userData.steerMesh) {
        playerCar.userData.steerMesh.rotation.y = gameState.wheelAngle;
    }

    // Brake light intensity (cars only)
    if (playerCar.userData.taillights && playerCar.userData.taillights.length) {
        const braking = (keys['s'] || keys['arrowdown']) ? 1 : 0;
        const intensity = 0.4 + braking * 0.8;
        playerCar.userData.taillights.forEach((light) => {
            light.material.opacity = 1;
            light.material.transparent = false;
            light.scale.setScalar(intensity);
        });
    }

    // On-foot walk animation
    if (visualType === 'onfoot' && playerCar.userData.walkParts) {
        const { leftLeg, rightLeg, leftArm, rightArm, leftShoe, rightShoe } = playerCar.userData.walkParts;
        const moving = absSpeed > 0.2;
        const phaseSpeed = moving ? (absSpeed / Math.max(1, gameState.maxSpeed)) * 10 : 0;
        playerCar.userData.walkPhase = (playerCar.userData.walkPhase || 0) + phaseSpeed * delta;
        const phase = playerCar.userData.walkPhase;
        const swing = moving ? Math.sin(phase) * 0.55 : 0;
        const armSwing = moving ? Math.sin(phase + Math.PI) * 0.45 : 0;

        leftLeg.rotation.x = swing;
        rightLeg.rotation.x = -swing;
        leftArm.rotation.x = armSwing;
        rightArm.rotation.x = -armSwing;
        leftShoe.rotation.x = swing * 0.6;
        rightShoe.rotation.x = -swing * 0.6;
    }

    // UFO hover + subtle spin
    if (visualType === 'ufo') {
        const t = now * 0.002;
        playerCar.position.y = 3 + Math.sin(t) * 1.5;
        playerCar.rotation.y += delta * 0.001;
    } else {
        // Keep grounded for others
        playerCar.position.y = 0;
    }

    // === IMPROVED SUSPENSION SIMULATION ===
    if (playerCar.userData.suspensionEnabled !== false && playerCar.userData.wheels) {
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
