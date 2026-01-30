// World Director - LLM-driven dynamic object spawning
// The LLM decides what objects to place on the road AND creates scenarios!

import * as THREE from 'three';
import { scene } from './core.js';
import { gameState } from './state.js';
import { playerCar, repairCar } from './player.js';
import { addMoney, showFloatingMoney } from './ui.js';
import { createBuildingDebris } from './world.js';
import { buildSpawnPlan } from './worldDirectorLogic.js';
import { playSfx } from './sfx.js';
import { resolveCollision, BONUS1_REWARD } from './worldDirectorCollisionLogic.js';

// Director state
const directorState = {
    lastRequestTime: 0,
    requestCooldown: 8000, // 8 seconds between LLM requests
    spawnedObjects: [],
    movingObjects: [], // Track moving objects separately
    maxSpawnedObjects: 100,
    enabled: true,
    lastPlayerZ: 0,
    spawnDistance: 3000, // Spawn far ahead on horizon (increased for better draw distance)
    cleanupDistance: 600, // Cleanup behind player
    currentMood: 'calm',
    activeEvent: null,
    recentEvents: [],
    playerBehavior: 'normal', // Track player style
    lastDamageTime: 0,
    lastMoneyTime: 0,
    comboCount: 0
};

// Extended object configurations
const OBJECT_CONFIGS = {
    // === OBSTACLES ===
    roadblock: {
        color: 0xff0000,
        geometry: () => new THREE.BoxGeometry(80, 15, 20),
        height: 7.5,
        damage: 15,
        slowdown: 0.3,
        label: '🚧',
        category: 'obstacle',
        breakable: true,
        debrisColor: new THREE.Color(0x8D6E63)
    },
    cones: {
        color: 0xff6600,
        geometry: () => new THREE.ConeGeometry(3, 8, 8),
        height: 4,
        damage: 2,
        slowdown: 0.9,
        label: '🔶',
        category: 'obstacle',
        breakable: true,
        debrisColor: new THREE.Color(0xBCAAA4)
    },
    barrier: {
        color: 0x888888,
        geometry: () => new THREE.BoxGeometry(60, 25, 15),
        height: 12.5,
        damage: 25,
        slowdown: 0.1,
        label: '🧱',
        category: 'obstacle',
        breakable: true,
        debrisColor: new THREE.Color(0x9E9E9E)
    },
    spike: {
        color: 0x333333,
        geometry: () => new THREE.BoxGeometry(50, 1, 30),
        height: 0.5,
        damage: 10,
        slowdown: 0.5,
        label: '⚠️',
        category: 'obstacle',
        breakable: true,
        debrisColor: new THREE.Color(0x616161)
    },
    explosion: {
        color: 0xff4400,
        geometry: () => new THREE.SphereGeometry(15, 16, 16),
        height: 15,
        damage: 40,
        slowdown: 0.2,
        label: '💥',
        category: 'hazard',
        animated: true,
        lifespan: 3000
    },
    fire: {
        color: 0xff2200,
        geometry: () => new THREE.ConeGeometry(12, 25, 8),
        height: 12,
        damage: 5,
        slowdown: 0.8,
        label: '🔥',
        category: 'hazard',
        animated: true,
        continuous: true
    },
    oil: {
        color: 0x222222,
        geometry: () => new THREE.CircleGeometry(20, 16),
        height: 0.2,
        isFlat: true,
        slipFactor: 0.2,
        duration: 2000,
        label: '🛢️',
        category: 'hazard'
    },
    
    // === BOOSTS & POWERUPS ===
    ramp: {
        color: 0xffaa00,
        geometry: () => {
            // Proper ramp shape - triangle that's wider and more visible
            const geo = new THREE.BoxGeometry(80, 2, 60);
            // Rotate to create ramp angle
            return geo;
        },
        height: 1,
        isRamp: true,
        launchPower: 25, // Vertical velocity when hit
        label: '🛷',
        category: 'boost',
        hitRadius: 40
    },
    boost: {
        color: 0x00ffff,
        geometry: () => new THREE.PlaneGeometry(40, 60),
        height: 0.3,
        isFlat: true,
        boostAmount: 50,
        label: '⚡',
        category: 'boost'
    },
    nitro: {
        color: 0xff00ff,
        geometry: () => new THREE.OctahedronGeometry(8),
        height: 8,
        isCollectible: true,
        nitroBoost: true,
        label: '🚀',
        category: 'powerup'
    },
    shield: {
        color: 0x00ff88,
        geometry: () => new THREE.TorusGeometry(10, 3, 8, 16),
        height: 10,
        isCollectible: true,
        shieldDuration: 5000,
        label: '🛡️',
        category: 'powerup'
    },
    
    // === COLLECTIBLES ===
    money: {
        color: 0x00ff00,
        geometry: () => new THREE.CylinderGeometry(5, 5, 2, 16),
        height: 5,
        isCollectible: true,
        value: 500,
        label: '💰',
        category: 'collectible'
    },
    jackpot: {
        color: 0xffdd00,
        geometry: () => new THREE.DodecahedronGeometry(10),
        height: 10,
        isCollectible: true,
        value: 2000,
        label: '💎',
        category: 'collectible'
    },
    health: {
        color: 0xff00ff,
        geometry: () => new THREE.BoxGeometry(8, 8, 8),
        height: 6,
        isCollectible: true,
        healAmount: 25,
        label: '❤️',
        category: 'collectible'
    },
    
    // === MOVING VEHICLES ===
    ambulance: {
        color: 0xffffff,
        geometry: () => new THREE.BoxGeometry(20, 15, 40),
        height: 7.5,
        damage: 20,
        slowdown: 0.4,
        label: '🚑',
        category: 'vehicle',
        canMove: true,
        defaultSpeed: 100
    },
    truck: {
        color: 0x8B4513,
        geometry: () => new THREE.BoxGeometry(25, 25, 60),
        height: 12.5,
        damage: 30,
        slowdown: 0.2,
        label: '🚛',
        category: 'vehicle',
        canMove: true,
        defaultSpeed: 50
    },
    sports_car: {
        color: 0xff0066,
        geometry: () => new THREE.BoxGeometry(15, 8, 35),
        height: 4,
        damage: 15,
        slowdown: 0.5,
        label: '🏎️',
        category: 'vehicle',
        canMove: true,
        defaultSpeed: 180
    },
    
    // === SPECIAL ===
    chaos: {
        color: 0xff00ff,
        geometry: () => new THREE.IcosahedronGeometry(8),
        height: 8,
        isCollectible: true,
        spawnsChaos: true,
        label: '🎲',
        category: 'special'
    }
};

// Create a single spawned object
function createSpawnedObject(type, x, z, moving = false, speed = 0) {
    const config = OBJECT_CONFIGS[type];
    if (!config) return null;
    
    // Enforce minimum spawn distance from player to prevent sudden appearances
    const minSpawnDistance = 800;
    if (playerCar && z - playerCar.position.z < minSpawnDistance) {
        z = playerCar.position.z + minSpawnDistance + Math.random() * 200;
    }
    
    const geometry = config.geometry();
    
    // Different materials based on category
    let material;
    if (config.category === 'powerup' || config.category === 'collectible') {
        material = new THREE.MeshStandardMaterial({
            color: config.color,
            emissive: config.color,
            emissiveIntensity: 0.5,
            roughness: 0.3,
            metalness: 0.8
        });
    } else if (config.category === 'hazard') {
        material = new THREE.MeshStandardMaterial({
            color: config.color,
            emissive: config.color,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.9
        });
    } else {
        material = new THREE.MeshStandardMaterial({
            color: config.color,
            roughness: 0.7
        });
    }
    
    /** @type {THREE.Mesh|THREE.Group} */
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, config.height, z);

    // Custom ambulance design for clarity
    if (type === 'ambulance') {
        const bodyGroup = new THREE.Group();

        const cab = new THREE.Mesh(
            new THREE.BoxGeometry(16, 10, 18),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0.1 })
        );
        cab.position.set(0, 6, -10);

        const box = new THREE.Mesh(
            new THREE.BoxGeometry(20, 12, 28),
            new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.6, metalness: 0.1 })
        );
        box.position.set(0, 6, 8);

        const cross = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 6, 8),
            new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.4, metalness: 0.0 })
        );
        cross.position.set(0, 8, 8);
        const crossBar = new THREE.Mesh(
            new THREE.BoxGeometry(6, 1.5, 8),
            new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.4, metalness: 0.0 })
        );
        crossBar.position.set(0, 8, 8);

        const siren = new THREE.Mesh(
            new THREE.BoxGeometry(6, 2, 4),
            new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff2200, emissiveIntensity: 0.3 })
        );
        siren.position.set(0, 13, -2);

        const windowMat = new THREE.MeshStandardMaterial({ color: 0x66bfff, roughness: 0.2, metalness: 0.6, transparent: true, opacity: 0.7 });
        const windshield = new THREE.Mesh(new THREE.BoxGeometry(14, 6, 1), windowMat);
        windshield.position.set(0, 7, -18);

        const sideStripe = new THREE.Mesh(
            new THREE.BoxGeometry(20, 1.2, 24),
            new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.4, metalness: 0.0 })
        );
        sideStripe.position.set(0, 4, 8);

        bodyGroup.add(box, cab, cross, crossBar, siren, windshield, sideStripe);

        bodyGroup.position.copy(mesh.position);
        bodyGroup.rotation.copy(mesh.rotation);

        scene.remove(mesh);
        mesh = bodyGroup;
    }
    
    if (config.isFlat) {
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = config.height;
    }
    
    // Ramps need special angle to look like actual ramps
    if (config.isRamp) {
        mesh.rotation.x = -0.25; // Tilt up toward player
        mesh.position.y = 0.5;
        // Add stripe markings to make ramp more visible
        const stripe1 = new THREE.Mesh(
            new THREE.BoxGeometry(70, 0.5, 8),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        stripe1.position.set(0, 1.2, -15);
        mesh.add(stripe1);
        const stripe2 = new THREE.Mesh(
            new THREE.BoxGeometry(70, 0.5, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        stripe2.position.set(0, 1.2, 0);
        mesh.add(stripe2);
        const stripe3 = new THREE.Mesh(
            new THREE.BoxGeometry(70, 0.5, 8),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        stripe3.position.set(0, 1.2, 15);
        mesh.add(stripe3);
    }
    
    // Collectibles bob and rotate
    if (config.isCollectible || config.category === 'powerup') {
        mesh.userData.bobOffset = Math.random() * Math.PI * 2;
        mesh.userData.baseY = config.height;
    }
    
    // Moving objects
    if (moving && config.canMove) {
        mesh.userData.isMoving = true;
        mesh.userData.moveSpeed = speed || config.defaultSpeed;
        mesh.userData.moveDirection = 1; // Forward
        directorState.movingObjects.push(mesh);
    }
    
    // Animated objects
    if (config.animated) {
        mesh.userData.animationStart = Date.now();
        mesh.userData.lifespan = config.lifespan;
    }
    
    // Store config reference
    mesh.userData.objectType = type;
    mesh.userData.config = config;
    mesh.userData.active = true;
    mesh.userData.spawnTime = Date.now();
    
    scene.add(mesh);
    directorState.spawnedObjects.push(mesh);
    
    return mesh;
}

// Spawn objects based on LLM decision
function spawnObjects(objectList, baseZ, event, mood) {
    if (!objectList || !Array.isArray(objectList)) return;
    
    directorState.currentMood = mood || 'calm';
    directorState.activeEvent = event;
    
    // Use spawn distance for all events (spawn far ahead, not near player)
    const eventSpawnZ = baseZ + directorState.spawnDistance;
    
    // Event-specific spawn patterns (now spawned at horizon)
    if (event === 'convoy') {
        // Spawn trucks in a line
        for (let i = 0; i < 5; i++) {
            createSpawnedObject('truck', 0, eventSpawnZ + i * 80, true, 50);
        }
    } else if (event === 'race') {
        // Sports cars racing by
        for (let i = 0; i < 3; i++) {
            const side = (i - 1) * 60;
            createSpawnedObject('sports_car', side, eventSpawnZ + i * 100, true, 180 + Math.random() * 40);
        }
    } else if (event === 'money_rain') {
        // Lots of money!
        for (let i = 0; i < 15; i++) {
            const x = (Math.random() - 0.5) * 200;
            const z = eventSpawnZ + Math.random() * 400;
            createSpawnedObject('money', x, z);
        }
    } else if (event === 'accident') {
        // Create accident scene
        createSpawnedObject('explosion', 0, eventSpawnZ + 50);
        createSpawnedObject('fire', -30, eventSpawnZ + 80);
        createSpawnedObject('fire', 30, eventSpawnZ + 80);
        createSpawnedObject('barrier', -60, eventSpawnZ);
        createSpawnedObject('barrier', 60, eventSpawnZ);
    }
    
    // Spawn regular objects from LLM response - far on the horizon
    const plan = buildSpawnPlan(objectList, baseZ, {
        spawnDistance: directorState.spawnDistance,
        spacing: 90,
        jitter: 180
    });

    plan.forEach(spawn => {
        createSpawnedObject(spawn.type, spawn.x, spawn.z, spawn.moving, spawn.speed);
    });
}

// Show director announcement
function showDirectorAnnouncement(scenario, comment, mood) {
    // Main scenario banner
    const banner = document.createElement('div');
    const moodColors = {
        intense: '#ff0000',
        rewarding: '#00ff00',
        chaotic: '#ff00ff',
        calm: '#00aaff',
        dramatic: '#ffaa00'
    };
    
    banner.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(30,30,30,0.95) 100%);
        color: ${moodColors[mood] || '#fff'};
        padding: 15px 30px;
        border-radius: 10px;
        font-family: 'Impact', 'Arial Black', sans-serif;
        font-size: 20px;
        z-index: 1000;
        text-align: center;
        border: 3px solid ${moodColors[mood] || '#fff'};
        box-shadow: 0 0 30px ${moodColors[mood] || '#fff'}40;
        animation: slideIn 0.3s ease-out;
        text-transform: uppercase;
        letter-spacing: 2px;
    `;
    banner.innerHTML = `
        <div style="font-size: 12px; opacity: 0.7; margin-bottom: 5px;">🎬 DIRECTOR</div>
        <div>${scenario}</div>
        ${comment ? `<div style="font-size: 14px; margin-top: 8px; font-style: italic; opacity: 0.9;">"${comment}"</div>` : ''}
    `;
    document.body.appendChild(banner);
    
    // Add animation keyframes if not exists
    if (!document.getElementById('director-styles')) {
        const style = document.createElement('style');
        style.id = 'director-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        banner.style.opacity = '0';
        banner.style.transform = 'translateX(-50%) translateY(-20px)';
        banner.style.transition = 'all 0.5s';
        setTimeout(() => banner.remove(), 500);
    }, 4000);
}

// Request spawn decision from LLM
async function requestSpawnDecision() {
    if (!directorState.enabled) return;
    if (!playerCar) return;
    
    const now = Date.now();
    if (now - directorState.lastRequestTime < directorState.requestCooldown) return;
    
    directorState.lastRequestTime = now;
    
    // Analyze player behavior
    const timeSinceDamage = now - directorState.lastDamageTime;
    const timeSinceMoney = now - directorState.lastMoneyTime;
    let behavior = 'normal';
    if (gameState.speed > 150) behavior = 'aggressive';
    else if (timeSinceDamage < 5000) behavior = 'reckless';
    else if (gameState.health < 30) behavior = 'struggling';
    
    // Build rich game context
    const context = {
        speed: Math.round(gameState.speed || 0),
        health: Math.round(gameState.health || 100),
        heatLevel: gameState.heatLevel || 1,
        money: gameState.money || 0,
        policeCount: gameState.policeCount || 0,
        direction: playerCar.position.z > directorState.lastPlayerZ ? 'north' : 'south',
        survivalTime: Math.round(gameState.survivalTime || 0),
        recentEvents: directorState.recentEvents.slice(-3).join(', '),
        playerBehavior: behavior
    };
    
    try {
        const response = await fetch('/api/world-director', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(context)
        });
        
        if (response.ok) {
            const data = await response.json();
            
            if (data.scenario) {
                showDirectorAnnouncement(data.scenario, data.director_comment, data.mood);
            }
            
            if (data.objects && data.objects.length > 0) {
                spawnObjects(data.objects, playerCar.position.z, data.event, data.mood);
            }
            
            // Track events
            if (data.event) {
                directorState.recentEvents.push(data.event);
                if (directorState.recentEvents.length > 10) directorState.recentEvents.shift();
            }
        }
    } catch (error) {
        console.error('[WorldDirector] Request failed:', error);
    }
}

// Check collisions with spawned objects
export function checkWorldDirectorCollisions() {
    if (!playerCar) return;
    
    const playerPos = playerCar.position;
    const playerRadius = 18; // Slightly larger for better pickup detection
    
    directorState.spawnedObjects.forEach(obj => {
        if (!obj.userData.active) return;
        
        const dist = Math.sqrt(
            Math.pow(playerPos.x - obj.position.x, 2) +
            Math.pow(playerPos.z - obj.position.z, 2)
        );
        
        const config = obj.userData.config;
        // Use custom hit radius if defined, otherwise default based on type
        const hitRadius = config.hitRadius || (config.isFlat ? 30 : (config.isRamp ? 45 : 22));
        
        if (dist < playerRadius + hitRadius) {
            handleObjectCollision(obj);
        }
    });
}

// Handle collision with a spawned object
function breakSpawnedObject(obj, carSpeed) {
    const config = obj.userData.config;
    obj.userData.active = false;
    scene.remove(obj);

    const debrisColor = config.debrisColor || (obj.material?.color ? obj.material.color : new THREE.Color(0x8D6E63));
    createBuildingDebris(obj.position, debrisColor, Math.max(10, carSpeed));

    const idx = directorState.spawnedObjects.indexOf(obj);
    if (idx > -1) directorState.spawnedObjects.splice(idx, 1);
    playSfx('break');
}

// Handle collision with a spawned object
function handleObjectCollision(obj) {
    const config = obj.userData.config;
    const type = obj.userData.objectType;
    const carSpeed = Math.abs(gameState.speed || 0);
    const collision = resolveCollision({
        type,
        config,
        speed: carSpeed,
        shieldActive: gameState.shieldActive
    });

    if (collision.despawn && type === 'ambulance') {
        obj.userData.active = false;
        scene.remove(obj);
        addMoney(BONUS1_REWARD);
        showFloatingMoney(BONUS1_REWARD, obj.position);
        showCollectNotification(`BONUS1! +${BONUS1_REWARD} kr 🚑`);
        playSfx(collision.sfx || 'pickup');

        const idx = directorState.spawnedObjects.indexOf(obj);
        if (idx > -1) directorState.spawnedObjects.splice(idx, 1);
        return;
    }
    
    if (config.isCollectible) {
        obj.userData.active = false;
        scene.remove(obj);
        
        if (config.value) {
            addMoney(config.value);
            showFloatingMoney(config.value, obj.position);
            showCollectNotification(`+${config.value} kr! ${config.label}`);
            directorState.lastMoneyTime = Date.now();
            directorState.comboCount++;
            playSfx('pickup');
        } else if (config.healAmount) {
            repairCar(config.healAmount);
            showCollectNotification(`+${config.healAmount}% Sundhed! ${config.label}`);
            playSfx('health');
        } else if (config.nitroBoost) {
            gameState.nitroActive = true;
            gameState.nitroEndTime = Date.now() + 3000;
            showCollectNotification(`NITRO AKTIVERET! 🚀`);
            playSfx('nitro');
        } else if (config.shieldDuration) {
            gameState.shieldActive = true;
            gameState.shieldEndTime = Date.now() + config.shieldDuration;
            showCollectNotification(`SKJOLD AKTIVT! 🛡️`);
            playSfx('shield');
        } else if (config.spawnsChaos) {
            // Chaos orb - spawn random stuff!
            const chaosTypes = ['money', 'money', 'money', 'health', 'boost', 'oil', 'explosion'];
            for (let i = 0; i < 8; i++) {
                const randomType = chaosTypes[Math.floor(Math.random() * chaosTypes.length)];
                const x = obj.position.x + (Math.random() - 0.5) * 150;
                const z = obj.position.z + Math.random() * 200;
                createSpawnedObject(randomType, x, z);
            }
            showCollectNotification(`CHAOS! 🎲`);
            playSfx('pickup');
        }
        
        const idx = directorState.spawnedObjects.indexOf(obj);
        if (idx > -1) directorState.spawnedObjects.splice(idx, 1);
        
    } else if (config.boostAmount) {
        if (!obj.userData.triggered) {
            obj.userData.triggered = true;
            gameState.speedBoost = (gameState.speedBoost || 0) + config.boostAmount;
            showCollectNotification(`BOOST! ⚡`);
            playSfx('boost');
            setTimeout(() => {
                gameState.speedBoost = Math.max(0, (gameState.speedBoost || 0) - config.boostAmount);
            }, 2000);
        }
        
    } else if (config.isRamp) {
        if (!obj.userData.triggered) {
            obj.userData.triggered = true;
            // Set airborne state with vertical velocity
            gameState.airborne = true;
            gameState.verticalVelocity = config.launchPower || 20;
            gameState.airborneStartTime = Date.now();
            // Also give a small speed boost
            gameState.speed = Math.min((gameState.speed || 0) * 1.2, 300);
            showCollectNotification(`🚀 AIRBORNE!`);
            playSfx('ramp');
            setTimeout(() => { obj.userData.triggered = false; }, 2000);
        }
        
    } else if (config.slipFactor) {
        if (!gameState.slipping) {
            gameState.slipping = true;
            gameState.slipFactor = config.slipFactor;
            showCollectNotification(`SLIP! 🛢️`);
            setTimeout(() => {
                gameState.slipping = false;
                gameState.slipFactor = 1;
            }, config.duration || 2000);
        }
        
    } else if (config.damage && !gameState.shieldActive) {
        if (!obj.userData.hitCooldown) {
            obj.userData.hitCooldown = true;
            gameState.health = Math.max(0, (gameState.health || 100) - config.damage);
            directorState.lastDamageTime = Date.now();
            directorState.comboCount = 0;
            
            if (config.slowdown) {
                gameState.speed = (gameState.speed || 0) * config.slowdown;
            }
            
            showCollectNotification(`-${config.damage}% ${config.label}`);
            playSfx(collision.sfx || 'damage');

            // Breakable obstacles shatter like buildings
            if (collision.breakable) {
                breakSpawnedObject(obj, carSpeed);
            }
            
            setTimeout(() => { obj.userData.hitCooldown = false; }, 1000);
        }
    }
}

// Show collection notification
function showCollectNotification(text) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #ffcc00;
        padding: 15px 30px;
        border-radius: 10px;
        font-family: 'Arial Black', sans-serif;
        font-size: 24px;
        z-index: 1001;
        text-shadow: 0 0 10px #ffcc00;
    `;
    notification.textContent = text;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translate(-50%, -50%) scale(1.5)';
        notification.style.transition = 'all 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 800);
}

// Update spawned objects (animation, movement, cleanup)
export function updateWorldDirector(delta) {
    if (!playerCar) return;
    
    const playerZ = playerCar.position.z;
    const now = Date.now();
    
    // Check powerup expiry
    if (gameState.nitroActive && now > gameState.nitroEndTime) {
        gameState.nitroActive = false;
    }
    if (gameState.shieldActive && now > gameState.shieldEndTime) {
        gameState.shieldActive = false;
    }
    
    // Update all objects
    directorState.spawnedObjects.forEach(obj => {
        const config = obj.userData.config;
        
        // Animate collectibles (bobbing + rotating)
        if ((config?.isCollectible || config?.category === 'powerup') && obj.userData.active) {
            const bob = Math.sin(now * 0.005 + obj.userData.bobOffset) * 2;
            obj.position.y = obj.userData.baseY + bob;
            obj.rotation.y += delta * 2;
        }
        
        // Animate hazards (pulsing)
        if (config?.category === 'hazard' && config?.animated) {
            const pulse = 0.8 + Math.sin(now * 0.01) * 0.2;
            obj.scale.setScalar(pulse);
            
            // Remove after lifespan
            if (config.lifespan && now - obj.userData.spawnTime > config.lifespan) {
                obj.userData.active = false;
            }
        }
        
        // Move vehicles
        if (obj.userData.isMoving) {
            const moveAmount = obj.userData.moveSpeed * delta * 0.3;
            obj.position.z += moveAmount * obj.userData.moveDirection;
        }
    });
    
    // Cleanup objects behind player or expired
    const objectsToRemove = [];
    directorState.spawnedObjects.forEach(obj => {
        if (!obj.userData.active || playerZ - obj.position.z > directorState.cleanupDistance) {
            objectsToRemove.push(obj);
        }
    });
    
    objectsToRemove.forEach(obj => {
        scene.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
        
        const idx = directorState.spawnedObjects.indexOf(obj);
        if (idx > -1) directorState.spawnedObjects.splice(idx, 1);
        
        const movIdx = directorState.movingObjects.indexOf(obj);
        if (movIdx > -1) directorState.movingObjects.splice(movIdx, 1);
    });
    
    // Limit total objects
    while (directorState.spawnedObjects.length > directorState.maxSpawnedObjects) {
        const oldest = directorState.spawnedObjects.shift();
        scene.remove(oldest);
        if (oldest.geometry) oldest.geometry.dispose();
        if (oldest.material) oldest.material.dispose();
    }
    
    directorState.lastPlayerZ = playerZ;
    checkWorldDirectorCollisions();
    requestSpawnDecision();
}

// Control functions
export function setWorldDirectorEnabled(enabled) {
    directorState.enabled = enabled;
}

export function forceSpawnRequest() {
    directorState.lastRequestTime = 0;
    requestSpawnDecision();
}

export function clearSpawnedObjects() {
    directorState.spawnedObjects.forEach(obj => {
        scene.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
    });
    directorState.spawnedObjects = [];
    directorState.movingObjects = [];
    directorState.recentEvents = [];
    directorState.comboCount = 0;
}

/**
 * Create a visual spawn indicator (glowing ring effect)
 * @param {number} x - X position
 * @param {number} z - Z position
 * @param {string} type - Object type for color coding
 */
function createSpawnIndicator(x, z, type) {
    // Color based on type
    const colors = {
        roadblock: 0xff6b6b,
        barrier: 0xff6b6b,
        cones: 0xffa500,
        spike: 0xff0000,
        oil: 0x333333,
        ramp: 0x00ff88,
        money: 0xffff00,
        health: 0x00ff00,
        boost: 0x00aaff
    };
    const color = colors[type] || 0x7cf5b5;
    
    // Create ring geometry
    const ringGeo = new THREE.RingGeometry(15, 18, 32);
    const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 1, z);
    scene.add(ring);
    
    // Animate: expand and fade
    let scale = 1;
    let opacity = 0.8;
    const animateRing = () => {
        scale += 0.08;
        opacity -= 0.02;
        ring.scale.set(scale, scale, 1);
        ringMat.opacity = Math.max(0, opacity);
        
        if (opacity > 0) {
            requestAnimationFrame(animateRing);
        } else {
            scene.remove(ring);
            ringGeo.dispose();
            ringMat.dispose();
        }
    };
    animateRing();
}

/**
 * Spawn environment objects from Challenger role
 * @param {Array<{type: string, side?: string}>} objects - Objects to spawn
 * @param {number} baseZ - Base Z position (player's current Z)
 */
export function challengerSpawnObjects(objects, baseZ) {
    if (!objects || !Array.isArray(objects)) return;
    
    const spawnZ = baseZ + directorState.spawnDistance;
    
    // Count object types for better announcement
    const typeCounts = {};
    
    objects.forEach((obj, idx) => {
        const type = obj.type || 'barrier';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
        
        let x = 0;
        
        // Position based on side
        if (obj.side === 'left') x = -60 - Math.random() * 30;
        else if (obj.side === 'right') x = 60 + Math.random() * 30;
        else if (obj.side === 'center') x = (Math.random() - 0.5) * 40;
        else x = (Math.random() - 0.5) * 140; // random
        
        const z = spawnZ + idx * 80 + Math.random() * 40;
        
        // Create visual spawn indicator
        createSpawnIndicator(x, z, type);
        
        createSpawnedObject(type, x, z, obj.moving || false, obj.speed || 0);
    });
    
    // Build descriptive message
    const typeNames = {
        roadblock: 'Vejspærring',
        barrier: 'Barrierer',
        cones: 'Kegler',
        spike: 'Sømmåtte',
        oil: 'Olieplet',
        ramp: 'Rampe',
        money: 'Penge',
        health: 'Sundhed',
        boost: 'Boost'
    };
    
    const descriptions = Object.entries(typeCounts)
        .map(([type, count]) => `${count}x ${typeNames[type] || type}`)
        .join(', ');
    
    // Determine mood based on content
    const hasDanger = ['spike', 'oil', 'roadblock', 'barrier'].some(t => typeCounts[t]);
    const hasBonus = ['money', 'health', 'boost'].some(t => typeCounts[t]);
    const mood = hasBonus && !hasDanger ? 'rewarding' : hasDanger ? 'intense' : 'dramatic';
    
    // Show announcement with specific content
    showDirectorAnnouncement('CHALLENGER', descriptions, mood);
}

/**
 * Spawn environment objects at specific position (for free-roaming Challenger)
 * @param {Array<{type: string, side?: string}>} objects - Objects to spawn
 * @param {number} centerX - Center X position from Challenger marker
 * @param {number} centerZ - Center Z position from Challenger marker
 */
export function challengerSpawnObjectsAtPosition(objects, centerX, centerZ) {
    if (!objects || !Array.isArray(objects)) return;
    
    // Count object types for better announcement
    const typeCounts = {};
    
    objects.forEach((obj, idx) => {
        const type = obj.type || 'barrier';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
        
        let x = centerX;
        
        // Position based on side (relative to center position)
        if (obj.side === 'left') x = centerX - 60 - Math.random() * 30;
        else if (obj.side === 'right') x = centerX + 60 + Math.random() * 30;
        else if (obj.side === 'center') x = centerX + (Math.random() - 0.5) * 40;
        else x = centerX + (Math.random() - 0.5) * 140; // random spread around center
        
        // Spread objects along Z axis from the marker position
        const z = centerZ + idx * 80 + Math.random() * 40;
        
        // Create visual spawn indicator
        createSpawnIndicator(x, z, type);
        
        createSpawnedObject(type, x, z, obj.moving || false, obj.speed || 0);
    });
    
    // Build descriptive message
    const typeNames = {
        roadblock: 'Vejspærring',
        barrier: 'Barrierer',
        cones: 'Kegler',
        spike: 'Sømmåtte',
        oil: 'Olieplet',
        ramp: 'Rampe',
        money: 'Penge',
        health: 'Sundhed',
        boost: 'Boost'
    };
    
    const descriptions = Object.entries(typeCounts)
        .map(([type, count]) => `${count}x ${typeNames[type] || type}`)
        .join(', ');
    
    // Determine mood based on content
    const hasDanger = ['spike', 'oil', 'roadblock', 'barrier'].some(t => typeCounts[t]);
    const hasBonus = ['money', 'health', 'boost'].some(t => typeCounts[t]);
    const mood = hasBonus && !hasDanger ? 'rewarding' : hasDanger ? 'intense' : 'dramatic';
    
    // Show announcement with specific content
    showDirectorAnnouncement('CHALLENGER', descriptions, mood);
}

export { directorState, createSpawnedObject };
