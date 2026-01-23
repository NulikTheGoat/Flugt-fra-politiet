import { gameState } from './state.js';
import { gameConfig } from './config.js';
import { scene, camera, THREE } from './core.js';
import { enemies, cars } from './constants.js';
import { sharedGeometries, sharedMaterials } from './assets.js';
import { createSmoke, createSpeedParticle, createFire, createSpark } from './particles.js';
import { playerCar, takeDamage } from './player.js';
import { normalizeAngleRadians, clamp } from './utils.js';
import { addMoney, showGameOver } from './ui.js';
import * as Network from './network.js';

const projectileGeometry = new THREE.SphereGeometry(2, 8, 8);

// Money popup tracking
const moneyPopups = [];

// Create floating money popup
function createMoneyPopup(position, amount) {
    // Create a canvas texture for the money text
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Draw money text
    ctx.fillStyle = '#00ff00';
    ctx.strokeStyle = '#004400';
    ctx.lineWidth = 4;
    ctx.font = 'bold 64px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const text = `+${amount}kr`;
    ctx.strokeText(text, 128, 64);
    ctx.fillText(text, 128, 64);
    
    // Create sprite
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true,
        depthTest: false
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.copy(position);
    sprite.position.y += 20;
    sprite.scale.set(40, 20, 1);
    
    sprite.userData = {
        spawnTime: Date.now(),
        lifetime: 1200, // 1.2 seconds
        startY: sprite.position.y
    };
    
    scene.add(sprite);
    moneyPopups.push(sprite);
}

// Update money popups (call from main loop)
export function updateMoneyPopups() {
    const now = Date.now();
    for (let i = moneyPopups.length - 1; i >= 0; i--) {
        const popup = moneyPopups[i];
        const age = now - popup.userData.spawnTime;
        const progress = age / popup.userData.lifetime;
        
        if (progress >= 1) {
            scene.remove(popup);
            popup.material.map.dispose();
            popup.material.dispose();
            moneyPopups.splice(i, 1);
            continue;
        }
        
        // Float up
        popup.position.y = popup.userData.startY + progress * 30;
        
        // Scale up then down (bounce effect)
        const scaleProgress = progress < 0.2 ? progress / 0.2 : 1;
        const shrinkProgress = progress > 0.7 ? (progress - 0.7) / 0.3 : 0;
        const scale = (0.5 + scaleProgress * 0.5) * (1 - shrinkProgress * 0.5);
        popup.scale.set(40 * scale, 20 * scale, 1);
        
        // Fade out in last 40%
        if (progress > 0.6) {
            popup.material.opacity = 1 - ((progress - 0.6) / 0.4);
        }
    }
}

export function createPoliceCar(type = 'standard') {
    const config = enemies[type];
    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0, -500);
    
    // Scale the car group
    carGroup.scale.set(config.scale, config.scale, config.scale);
    carGroup.userData = { 
        type: type, 
        speed: config.speed,
        health: config.health,
        maxHealth: config.health
    };

    // Get shared materials if available
    const bodyConfig = config.bodyMaterial || { color: config.color };
    const bodyMat = new THREE.MeshPhongMaterial({ 
        color: bodyConfig.color,
        shininess: type === 'interceptor' ? 100 : 60,
        specular: 0x444444
    });

    // --- ENHANCED POLICE CAR ---
    
    // 1. Car Body
    const body = new THREE.Mesh(sharedGeometries.carBody, bodyMat);
    body.position.y = 6;
    body.castShadow = true;
    carGroup.add(body);

    // Bumpers
    const bumper = new THREE.Mesh(sharedGeometries.bumper, sharedMaterials.bumper);
    bumper.position.set(0, 2, -23); // Rear
    carGroup.add(bumper);

    const frontBumper = new THREE.Mesh(sharedGeometries.bumper, sharedMaterials.bumper);
    frontBumper.position.set(0, 2, 23); // Front
    carGroup.add(frontBumper);

    // Headlights/Taillights
    const leftHead = new THREE.Mesh(sharedGeometries.headlight, sharedMaterials.headlight);
    leftHead.position.set(-7, 6, 22.6);
    carGroup.add(leftHead);
    const rightHead = new THREE.Mesh(sharedGeometries.headlight, sharedMaterials.headlight);
    rightHead.position.set(7, 6, 22.6);
    carGroup.add(rightHead);

    const leftTail = new THREE.Mesh(sharedGeometries.taillight, sharedMaterials.taillight);
    leftTail.position.set(-7, 7, -22.6);
    carGroup.add(leftTail);
    const rightTail = new THREE.Mesh(sharedGeometries.taillight, sharedMaterials.taillight);
    rightTail.position.set(7, 7, -22.6);
    carGroup.add(rightTail);

    // White stripe (only for police/interceptor)
    if (type === 'standard' || type === 'interceptor') {
        const stripe = new THREE.Mesh(sharedGeometries.policeStripe, sharedMaterials.white);
        stripe.position.set(0, 12.5, 0);
        carGroup.add(stripe);
        
        // Windows
        const windowGeo = new THREE.BoxGeometry(16, 6, 1);
        const frontWindow = new THREE.Mesh(windowGeo, sharedMaterials.window);
        frontWindow.position.set(0, 16, 5);
        carGroup.add(frontWindow);
        const backWindow = new THREE.Mesh(windowGeo, sharedMaterials.window);
        backWindow.position.set(0, 16, -15);
        carGroup.add(backWindow);

        // Bullbar (Ramming Guard)
        const bullbar = new THREE.Mesh(new THREE.BoxGeometry(14, 6, 2), sharedMaterials.bumper);
        bullbar.position.set(0, 6, 25);
        carGroup.add(bullbar);
        const bullbarV1 = new THREE.Mesh(new THREE.BoxGeometry(2, 8, 2), sharedMaterials.bumper);
        bullbarV1.position.set(-5, 7, 25);
        carGroup.add(bullbarV1);
        const bullbarV2 = new THREE.Mesh(new THREE.BoxGeometry(2, 8, 2), sharedMaterials.bumper);
        bullbarV2.position.set(5, 7, 25);
        carGroup.add(bullbarV2);

    } else if (type === 'military') {
        const camo = new THREE.Mesh(sharedGeometries.militaryCamo, sharedMaterials.camo);
        camo.position.set(0, 8, 0);
        carGroup.add(camo);
        
        // Add turret for military
        const turretBase = new THREE.Mesh(sharedGeometries.militaryTurretBase, sharedMaterials.camo);
        turretBase.position.set(0, 15, -5);
        carGroup.add(turretBase);
        
        const turretBarrel = new THREE.Mesh(sharedGeometries.militaryTurretBarrel, sharedMaterials.darkGrey);
        turretBarrel.rotation.x = Math.PI / 2;
        turretBarrel.position.set(0, 17, 10);
        turretBarrel.name = 'turretBarrel';
        carGroup.add(turretBarrel);
        
        // Track last shot time
        carGroup.userData.lastShotTime = 0;
        carGroup.userData.fireRate = 2000; // ms between shots
    }

    // Car roof
    const roofConfig = config.roofMaterial || { color: config.color };
    const roofMat = new THREE.MeshPhongMaterial({ color: roofConfig.color, shininess: 50 });
    // Make roof slightly darker
    roofMat.color.multiplyScalar(0.8);

    const roof = new THREE.Mesh(sharedGeometries.carRoof, roofMat);
    roof.position.set(0, 16, -5);
    roof.castShadow = true;
    carGroup.add(roof);

    // Light on roof - Improved
    const lightBarCenter = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 3), sharedMaterials.bumper);
    lightBarCenter.position.set(0, 20.5, -5);
    carGroup.add(lightBarCenter);

    const redLight = new THREE.Mesh(sharedGeometries.policeLight, sharedMaterials.redLight);
    redLight.position.set(-4, 21, -5);
    carGroup.add(redLight);

    const blueLight = new THREE.Mesh(sharedGeometries.policeLight, sharedMaterials.blueLight);
    blueLight.position.set(4, 21, -5);
    carGroup.add(blueLight);

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
        
        // Rims for police too
        const rim = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 8.2, 8), sharedMaterials.bumper);
        wheel.add(rim);

        carGroup.add(wheel);
    });

    // Health Bar (Billboard)
    if (config.health) {
        const hpBg = new THREE.Mesh(
            new THREE.PlaneGeometry(14, 2),
            new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
        );
        hpBg.position.set(0, 25, 0);
        hpBg.name = 'hpBg';
        carGroup.add(hpBg);

        const hpBar = new THREE.Mesh(
            new THREE.PlaneGeometry(13.6, 1.6),
            new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
        );
        hpBar.position.set(0, 25, 0.1); 
        hpBar.name = 'hpBar';
        carGroup.add(hpBar);
    }

    scene.add(carGroup);
    return carGroup;
}

// Unique ID counter for network sync
let nextPoliceNetworkId = 1;

// Reset function for when games start
export function resetPoliceNetworkIds() {
    nextPoliceNetworkId = 1;
    console.log('[POLICE] Network IDs reset');
}

export function spawnPoliceCar() {
    if(!playerCar) return;

    let type = 'standard';
    const rand = Math.random();
    
    if (gameState.heatLevel >= 2 && rand > 0.6) type = 'interceptor';
    if (gameState.heatLevel >= 3 && rand > 0.7) type = 'swat';
    if (gameState.heatLevel >= 4 && rand > 0.8) type = 'military';

    const policeCar = createPoliceCar(type);
    
    // Assign unique network ID for multiplayer sync
    policeCar.userData.networkId = nextPoliceNetworkId++;
    
    // Spawn at random locations on the map
    const mapSize = 3500;
    let x, z;
    do {
        x = (Math.random() - 0.5) * mapSize * 2;
        z = (Math.random() - 0.5) * mapSize * 2;
    } while (Math.abs(x - playerCar.position.x) < 300 && Math.abs(z - playerCar.position.z) < 300);

    policeCar.position.x = x;
    policeCar.position.z = z;
    gameState.policeCars.push(policeCar);
    
    if (gameState.isMultiplayer) {
        console.log(`[POLICE] Spawned police #${policeCar.userData.networkId} (${type}) at (${Math.round(x)}, ${Math.round(z)}). Total: ${gameState.policeCars.length}`);
    }
    
    return policeCar;
}

export function updatePoliceAI(delta) {
    if(!playerCar) return 10000;

    let minDistance = 10000;
    
    // In multiplayer, only HOST runs the AI logic (movement, collisions)
    // Clients only calculate distance for HUD
    const shouldRunAI = !gameState.isMultiplayer || gameState.isHost;

    gameState.policeCars.forEach((policeCar, index) => {
        // Calculate distance to player (needed for HUD on all clients)
        const dx = playerCar.position.x - policeCar.position.x;
        const dz = playerCar.position.z - policeCar.position.z;
        const distToPlayer = Math.sqrt(dx * dx + dz * dz);
        if (distToPlayer < minDistance) minDistance = distToPlayer;

        if (!shouldRunAI) return; // Skip movement/logic for clients

        if (policeCar.userData.dead) {
             const now = Date.now();
             const timeSinceDeath = now - policeCar.userData.deathTime;
             
             // Dead police cars slow down and stop
             policeCar.userData.speed *= Math.pow(0.9, delta || 1);
             if (policeCar.userData.speed > 1) {
                 const move = policeCar.userData.speed * 0.016 * (delta || 1);
                 policeCar.position.x += Math.sin(policeCar.rotation.y) * move;
                 policeCar.position.z += Math.cos(policeCar.rotation.y) * move;
             } else {
                 policeCar.userData.speed = 0;
             }
             
             // === VISUAL: Add loot indicator after car stops (1 second) ===
             if (timeSinceDeath > 1000 && !policeCar.userData.lootIndicator) {
                 // Create floating ring indicator
                 const ring = new THREE.Mesh(
                     sharedGeometries.lootIcon,
                     sharedMaterials.lootGlow.clone()
                 );
                 ring.rotation.x = Math.PI / 2;
                 ring.position.y = 30;
                 ring.name = 'lootRing';
                 policeCar.add(ring);
                 policeCar.userData.lootIndicator = ring;
                 
                 // Make car body darker/burnt
                 policeCar.traverse(child => {
                     if (child.isMesh && child.material && child.material.color) {
                         if (!child.userData.originalColor) {
                             child.userData.originalColor = child.material.color.getHex();
                         }
                         child.material = child.material.clone();
                         child.material.color.setHex(0x222222); // Burnt look
                     }
                 });
                 
                 // Hide health bar
                 const hpBar = policeCar.getObjectByName('hpBar');
                 const hpBg = policeCar.getObjectByName('hpBg');
                 if (hpBar) hpBar.visible = false;
                 if (hpBg) hpBg.visible = false;
             }
             
             // === VISUAL: Animate loot indicator (pulse + rotate) ===
             if (policeCar.userData.lootIndicator) {
                 const ring = policeCar.userData.lootIndicator;
                 ring.rotation.z += 0.05 * (delta || 1);
                 const pulse = 0.8 + Math.sin(now * 0.005) * 0.3;
                 ring.scale.set(pulse, pulse, pulse);
                 ring.material.opacity = 0.5 + Math.sin(now * 0.008) * 0.3;
             }
             
             // === COLLECTION: Check if player is close enough to collect ===
             if (playerCar && timeSinceDeath > 1000) {
                 const cdx = playerCar.position.x - policeCar.position.x;
                 const cdz = playerCar.position.z - policeCar.position.z;
                 const collectDist = Math.sqrt(cdx*cdx + cdz*cdz);
                 const collectRadius = 35; // Pickup radius
                 
                 if (collectDist < collectRadius) {
                     // === REWARD ===
                     const baseReward = 200;
                     const heatBonus = gameState.heatLevel * 50;
                     const reward = baseReward + heatBonus;
                     addMoney(reward, true);
                     
                     // === VISUAL FEEDBACK: Big money popup ===
                     createMoneyPopup(policeCar.position, reward);
                     
                     // === VISUAL FEEDBACK: Explosion of coins/sparks ===
                     for (let s = 0; s < 8; s++) {
                         createSpark(policeCar.position);
                     }
                     createSmoke(policeCar.position);
                     
                     // Screen shake for satisfying feedback
                     gameState.screenShake = 0.15;
                     
                     // Mark for removal
                     policeCar.userData.collected = true;
                 }
             }
             
             // === REMOVE if collected ===
             if (policeCar.userData.collected) {
                 scene.remove(policeCar);
                 gameState.policeCars.splice(index, 1);
                 return;
             }
             
             // Smoke and fire effects (throttled for performance)
             const lastParticle = policeCar.userData.lastParticleTime || 0;
             if (now - lastParticle > 150) {
                 policeCar.userData.lastParticleTime = now;
                 if (Math.random() < 0.3) createSmoke(policeCar.position);
                 if (timeSinceDeath > 2000 && Math.random() < 0.2) {
                     createFire(policeCar.position);
                 }
             }
             
             return;
        }

        // Police vs Police Collision - Solid bodies with damage
        for (let j = index + 1; j < gameState.policeCars.length; j++) {
            const otherCar = gameState.policeCars[j];
            
            const pdx = policeCar.position.x - otherCar.position.x;
            const pdz = policeCar.position.z - otherCar.position.z;
            const distSq = pdx*pdx + pdz*pdz;
            const minDist = 30; // Larger collision radius for police cars
            const preferredDist = 50; // Distance they try to keep from each other

            if (distSq < minDist * minDist) {
                const dist = Math.sqrt(distSq);
                const overlap = (minDist - dist) * 0.5;
                const nx = dist > 0 ? pdx / dist : 1; 
                const nz = dist > 0 ? pdz / dist : 0;

                // Push both cars apart (living car moves more, dead car barely moves)
                if (otherCar.userData.dead) {
                    policeCar.position.x += nx * overlap * 1.5;
                    policeCar.position.z += nz * overlap * 1.5;
                    otherCar.position.x -= nx * overlap * 0.1;
                    otherCar.position.z -= nz * overlap * 0.1;
                } else {
                    policeCar.position.x += nx * overlap;
                    policeCar.position.z += nz * overlap;
                    otherCar.position.x -= nx * overlap;
                    otherCar.position.z -= nz * overlap;
                }
                
                // Calculate relative speed for damage
                const relativeSpeed = Math.abs(policeCar.userData.speed || 0) + Math.abs(otherCar.userData.speed || 0);
                const now = Date.now();
                
                // Apply damage on collision (throttled)
                if (now - (policeCar.userData.lastPoliceCollision || 0) > 500) {
                    policeCar.userData.lastPoliceCollision = now;
                    
                    const damage = Math.max(gameConfig.minCrashDamage, relativeSpeed * 0.05);
                    
                    // Living car takes damage from collision
                    policeCar.userData.health -= damage;
                    
                    // Other car takes damage only if also living
                    if (!otherCar.userData.dead) {
                        otherCar.userData.lastPoliceCollision = now;
                        otherCar.userData.health -= damage;
                        
                        if (otherCar.userData.health <= 0) {
                            otherCar.userData.dead = true;
                            otherCar.userData.deathTime = now;
                            addMoney(gameState.heatLevel * 100);
                            gameState.policeKilled = (gameState.policeKilled || 0) + 1;
                        }
                    }
                    
                    createSmoke(policeCar.position);
                    gameState.screenShake = 0.15;
                    
                    // Check if this car died
                    if (policeCar.userData.health <= 0) {
                        policeCar.userData.dead = true;
                        policeCar.userData.deathTime = now;
                        addMoney(gameState.heatLevel * 100);
                        gameState.policeKilled = (gameState.policeKilled || 0) + 1;
                    }
                }
            } else if (distSq < preferredDist * preferredDist && !otherCar.userData.dead) {
                // Gentle push to maintain spacing - police try to spread out (only for living cars)
                const dist = Math.sqrt(distSq);
                const pushStrength = 0.3 * (1 - dist / preferredDist);
                const nx = pdx / dist;
                const nz = pdz / dist;
                
                policeCar.position.x += nx * pushStrength;
                policeCar.position.z += nz * pushStrength;
            }
        }

        // Use already calculated distance
        const distance = distToPlayer;

        // Tank Ramming Logic
        const currentCar = cars[gameState.selectedCar];
        if (currentCar && currentCar.type === 'tank' && distance < 50) {
             policeCar.userData.dead = true;
             policeCar.userData.deathTime = Date.now();
             addMoney(gameState.heatLevel * 100);
             gameState.policeKilled = (gameState.policeKilled || 0) + 1;
             createSmoke(policeCar.position);
             gameState.screenShake = 0.5;
             return; 
        }

        // AGGRESSIVE AI - scales with heat level
        // Heat 1: baseline, Heat 6: 2.5x more aggressive
        const aggressionMultiplier = 1 + (gameState.heatLevel - 1) * 0.3; // 1.0 to 2.5
        
        const targetDirection = Math.atan2(dx, dz);
        
        // Faster turning at higher heat levels
        const baseTurnSpeed = 0.06;
        const turnSpeed = baseTurnSpeed * aggressionMultiplier;
        const angleDiff = normalizeAngleRadians(targetDirection - policeCar.rotation.y);
        policeCar.rotation.y += clamp(angleDiff, -turnSpeed, turnSpeed) * (delta || 1);

        // Base speed increased by aggression at higher heat levels
        let policeSpeed = (policeCar.userData.speed || 250) * (1 + (aggressionMultiplier - 1) * 0.5);
        
        // Slow down police when near player and player is slow (for arrest)
        const playerSpeedKmh = Math.abs(gameState.speed) * 3.6;
        const maxSpeedKmh = gameState.maxSpeed * 3.6;
        const speedThreshold = maxSpeedKmh * 0.1;
        
        if (distance < 150 && playerSpeedKmh < speedThreshold) {
            // Match player speed when close and player is slow
            const slowFactor = Math.max(0.1, distance / 150);
            policeSpeed *= slowFactor;
        }
        
        // At high heat levels, police try to ram the player when close
        if (gameState.heatLevel >= 3 && distance < 100 && distance > 30) {
            // Boost speed when chasing close - ramming behavior
            policeSpeed *= 1.3;
        }

        const policeMove = policeSpeed * 0.016 * (delta || 1);
        policeCar.position.z += Math.cos(policeCar.rotation.y) * policeMove;
        policeCar.position.x += Math.sin(policeCar.rotation.y) * policeMove;

        // Police vs Building Collision
        const gridSize = gameState.chunkGridSize;
        const px = Math.floor(policeCar.position.x / gridSize);
        const pz = Math.floor(policeCar.position.z / gridSize);
        
        for(let gx = px-1; gx <= px+1; gx++) {
            for(let gz = pz-1; gz <= pz+1; gz++) {
                const key = `${gx},${gz}`;
                const chunks = gameState.chunkGrid[key];
                if(!chunks) continue;
                
                for(let c=0; c < chunks.length; c++) {
                    const chunk = chunks[c];
                    if(chunk.userData.isHit) continue;
                    
                    const cdx = chunk.position.x - policeCar.position.x;
                    const cdz = chunk.position.z - policeCar.position.z;
                    const chunkDist = Math.sqrt(cdx*cdx + cdz*cdz);
                    
                    if (chunkDist < 30 && Math.abs(chunk.position.y - 15) < chunk.userData.height) {
                        // Police hit a building chunk
                        chunk.userData.isHit = true;
                        gameState.activeChunks.push(chunk);
                        
                        const policeAngle = policeCar.rotation.y;
                        const impactSpeed = policeSpeed * 0.01;
                        
                        chunk.userData.velocity.set(
                            Math.sin(policeAngle) * impactSpeed + (cdx/chunkDist) * 3,
                            3 + Math.random() * 3,
                            Math.cos(policeAngle) * impactSpeed + (cdz/chunkDist) * 3
                        );
                        
                        chunk.userData.rotVelocity.set(
                            (Math.random() - 0.5) * 0.3,
                            (Math.random() - 0.5) * 0.3,
                            (Math.random() - 0.5) * 0.3
                        );
                        
                        // Damage police car
                        policeCar.userData.health -= 15;
                        createSmoke(chunk.position);
                        
                        if (policeCar.userData.health <= 0) {
                            policeCar.userData.dead = true;
                            policeCar.userData.deathTime = Date.now();
                        }
                    }
                }
            }
        }

        // Update Health Bar
        const hpBar = policeCar.getObjectByName('hpBar');
        const hpBg = policeCar.getObjectByName('hpBg');
        if (hpBar && hpBg) {
             hpBar.lookAt(camera.position);
             hpBg.lookAt(camera.position);
             
             const healthPct = Math.max(0, policeCar.userData.health / policeCar.userData.maxHealth);
             hpBar.scale.x = healthPct;
             hpBar.material.color.setHSL(healthPct * 0.3, 1, 0.5); 
        }

        // Military vehicles shoot
        if (policeCar.userData.type === 'military') {
            const now = Date.now();
            if (now - policeCar.userData.lastShotTime > policeCar.userData.fireRate && distance < 800) {
                fireProjectile(policeCar);
                policeCar.userData.lastShotTime = now;
            }
        }

        // Solid body collision - prevent overlap between player and police
        // BOTH cars take damage on collision
        const collisionRadius = 25; // Combined radius of both cars
        if (distance < collisionRadius && !policeCar.userData.dead) {
            const overlap = collisionRadius - distance;
            const nx = dx / distance;
            const nz = dz / distance;
            
            // Push both cars apart (player more, police less)
            playerCar.position.x += nx * overlap * 0.6;
            playerCar.position.z += nz * overlap * 0.6;
            policeCar.position.x -= nx * overlap * 0.4;
            policeCar.position.z -= nz * overlap * 0.4;
            
            // Damage both cars on collision (throttled)
            const now = Date.now();
            if (now - (policeCar.userData.lastCollisionDamage || 0) > 300) {
                policeCar.userData.lastCollisionDamage = now;
                const speedKmh = Math.abs(gameState.speed) * 3.6;
                
                // Damage to player
                const playerDamage = Math.max(gameConfig.minCrashDamage, speedKmh * gameConfig.playerCrashDamageMultiplier);
                takeDamage(playerDamage);
                
                // Damage to police
                const policeDamage = Math.max(gameConfig.minCrashDamage, speedKmh * gameConfig.policeCrashDamageMultiplier);
                policeCar.userData.health -= policeDamage;
                
                if (policeCar.userData.health <= 0) {
                    policeCar.userData.dead = true;
                    policeCar.userData.deathTime = now;
                    addMoney(gameState.heatLevel * 100);
                    gameState.policeKilled = (gameState.policeKilled || 0) + 1;
                }
                
                createSmoke(playerCar.position);
                gameState.screenShake = 0.2;
            }
        }

        // Check arrest condition - collision impact for fast players (above 10% max speed)
        if (distance < gameState.arrestDistance && !gameState.arrested) {
            const speedKmh = Math.abs(gameState.speed) * 3.6;
            const maxSpeedKmh = gameState.maxSpeed * 3.6;
            const speedThreshold = maxSpeedKmh * 0.1; // 10% of max speed
            
            if (speedKmh >= speedThreshold) {
                // Player is fast but close - do collision impact
                const now = Date.now();
                if (now - (policeCar.userData.lastHit || 0) < 500) return;
                policeCar.userData.lastHit = now;

                const pushDirX = playerCar.position.x - policeCar.position.x;
                const pushDirZ = playerCar.position.z - policeCar.position.z;
                const len = Math.sqrt(pushDirX*pushDirX + pushDirZ*pushDirZ);
                const nx = len > 0 ? pushDirX/len : 1;
                const nz = len > 0 ? pushDirZ/len : 0;
                
                const impactForce = Math.max(20, speedKmh * 0.5); 
                gameState.speed *= -0.4; 
                gameState.velocityX += nx * impactForce;
                gameState.velocityZ += nz * impactForce;

                policeCar.position.x -= nx * 15;
                policeCar.position.z -= nz * 15;
                
                // Also damage police on impact
                policeCar.userData.health -= Math.max(5, speedKmh * 0.2);
                if (policeCar.userData.health <= 0) {
                    policeCar.userData.dead = true;
                    policeCar.userData.deathTime = Date.now();
                    addMoney(gameState.heatLevel * 100);
                    gameState.policeKilled = (gameState.policeKilled || 0) + 1;
                }
                
                const damage = Math.max(5, speedKmh * 0.3);
                takeDamage(damage);
                
                gameState.screenShake = 0.3;
                createSmoke(playerCar.position);
            }
        }

        minDistance = Math.min(minDistance, distance);
    });

    // Touch Arrest - instant arrest when close to any police car (no countdown)
    if (gameConfig.touchArrest) {
        if (minDistance < gameState.arrestDistance && !gameState.arrested) {
            gameState.arrested = true;
            gameState.arrestCountdown = 0;
            gameState.arrestStartTime = 0;
            gameState.elapsedTime = (Date.now() - gameState.startTime) / 1000;
            // Send arrest event in multiplayer
            if (gameState.isMultiplayer) {
                Network.sendGameEvent('arrested', { time: gameState.elapsedTime });
            }
            showGameOver();
        }
        gameState.policeCars = gameState.policeCars.filter(c => !c.userData.remove);
        return minDistance;
    }
    
    // Arrest countdown logic - check based on minimum distance (outside loop)
    // Trigger when speed is less than configured threshold of max speed
    const maxSpeedKmh = gameState.maxSpeed * 3.6;
    const speedKmh = Math.abs(gameState.speed) * 3.6;
    const speedThreshold = maxSpeedKmh * gameConfig.arrestSpeedThreshold;
    const isMovingSlow = speedKmh < speedThreshold;
    
    if (minDistance < gameState.arrestDistance && isMovingSlow && !gameState.arrested) {
        // Start or continue arrest countdown
        if (gameState.arrestStartTime === 0) {
            gameState.arrestStartTime = Date.now();
        }
        
        const elapsed = (Date.now() - gameState.arrestStartTime) / 1000;
        gameState.arrestCountdown = Math.max(0, gameConfig.arrestCountdownTime - elapsed);
        
        if (gameState.arrestCountdown <= 0) {
            gameState.arrested = true;
            gameState.elapsedTime = (Date.now() - gameState.startTime) / 1000;
            // Send arrest event in multiplayer
            if (gameState.isMultiplayer) {
                Network.sendGameEvent('arrested', { time: gameState.elapsedTime });
            }
            showGameOver();
        }
    } else if (minDistance >= gameState.arrestDistance || !isMovingSlow) {
        // Reset countdown if no police is close OR player sped up above 10%
        gameState.arrestCountdown = 0;
        gameState.arrestStartTime = 0;
    }

    gameState.policeCars = gameState.policeCars.filter(c => !c.userData.remove);

    return minDistance;
}

export function fireProjectile(policeCar) {
    if(!playerCar) return;

    const projectile = new THREE.Mesh(projectileGeometry, sharedMaterials.projectile);
    
    projectile.position.copy(policeCar.position);
    projectile.position.y = 17 * policeCar.scale.y;
    
    const dx = playerCar.position.x - policeCar.position.x;
    const dz = playerCar.position.z - policeCar.position.z;
    const angle = Math.atan2(dx, dz);
    
    projectile.position.x += Math.sin(angle) * 15 * policeCar.scale.x;
    projectile.position.z += Math.cos(angle) * 15 * policeCar.scale.z;
    
    const speed = 15;
    projectile.userData = {
        velocity: new THREE.Vector3(
            Math.sin(angle) * speed,
            0,
            Math.cos(angle) * speed
        ),
        lifetime: 3000,
        spawnTime: Date.now()
    };
    
    scene.add(projectile);
    gameState.projectiles.push(projectile);
}

export function firePlayerProjectile() {
    if (!playerCar || gameState.arrested) return;

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
    
    gameState.speed -= 2;
}

export function updateProjectiles(delta) {
    if(!playerCar) return;

    const now = Date.now();
    const playerPos = playerCar.position;
    
    for (let i = gameState.projectiles.length - 1; i >= 0; i--) {
        const proj = gameState.projectiles[i];
        
        proj.position.x += proj.userData.velocity.x * (delta || 1);
        proj.position.y += proj.userData.velocity.y * (delta || 1);
        proj.position.z += proj.userData.velocity.z * (delta || 1);
        
        if (now - proj.userData.spawnTime > proj.userData.lifetime) {
            scene.remove(proj);
            gameState.projectiles.splice(i, 1);
            continue;
        }

        if (proj.userData.isPlayerShot) {
            let hit = false;
            for (let j = 0; j < gameState.policeCars.length; j++) {
                const police = gameState.policeCars[j];
                if (police.userData.dead) continue;
                
                const dx = police.position.x - proj.position.x;
                const dz = police.position.z - proj.position.z;
                if (dx*dx + dz*dz < 600) { 
                    hit = true;
                    police.userData.dead = true;
                    police.userData.deathTime = now;
                    addMoney(gameState.heatLevel * 100);
                    gameState.policeKilled = (gameState.policeKilled || 0) + 1;
                    
                    // Add explosion particles
                    for(let k=0; k<5; k++) createSpeedParticle(police.position, true);
                    break;
                }
            }
            if (hit) {
                scene.remove(proj);
                gameState.projectiles.splice(i, 1);
                continue;
            }
        } else {
            const dx = playerPos.x - proj.position.x;
            const dz = playerPos.z - proj.position.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            
            if (dist < 20) {
                scene.remove(proj);
                gameState.projectiles.splice(i, 1);
                takeDamage(34); 
            }
        }
    }
}

// ============================================
// MULTIPLAYER SYNC FUNCTIONS
// ============================================

// Sync police cars from network (client-side, receives data from host)
export function syncPoliceFromNetwork(policeData) {
    if (!policeData || !Array.isArray(policeData)) return;
    
    // Debug logging
    const prevCount = gameState.policeCars.length;
    
    // Create a map of existing police cars by their network ID
    const existingPolice = new Map();
    gameState.policeCars.forEach((car, index) => {
        if (car.userData.networkId !== undefined) {
            existingPolice.set(car.userData.networkId, { car, index });
        }
    });
    
    const receivedIds = new Set();
    
    // Update or create police cars based on network data
    policeData.forEach(data => {
        receivedIds.add(data.id);
        
        if (existingPolice.has(data.id)) {
            // Update existing car
            const { car } = existingPolice.get(data.id);
            
            // Store target for smooth interpolation in updateNetworkPolice
            car.userData.networkTarget = {
                x: data.x,
                z: data.z,
                rotation: data.rotation
            };
            
            // Update health and speed immediately
            car.userData.health = data.health;
            car.userData.speed = data.speed;
            car.userData.type = data.type; // Ensure type is synced
            
        } else {
            // Create new police car
            const type = data.type || 'standard';
            const newCar = createPoliceCar(type);
            newCar.position.set(data.x, 0, data.z);
            newCar.rotation.y = data.rotation;
            newCar.userData.networkId = data.id;
            newCar.userData.health = data.health;
            newCar.userData.speed = data.speed;
            scene.add(newCar);
            gameState.policeCars.push(newCar);
        }
    });
    
    // Remove police cars that no longer exist on host
    for (let i = gameState.policeCars.length - 1; i >= 0; i--) {
        const car = gameState.policeCars[i];
        if (car.userData.networkId !== undefined && !receivedIds.has(car.userData.networkId)) {
            scene.remove(car);
            gameState.policeCars.splice(i, 1);
        }
    }
}

// Client-side interpolation loop
export function updateNetworkPolice(delta) {
    gameState.policeCars.forEach(car => {
        if (car.userData.networkTarget) {
            const target = car.userData.networkTarget;
            const lerpSpeed = 5.0 * delta; // Adjust for smoothness vs responsiveness

            // Position Lerp
            car.position.x += (target.x - car.position.x) * lerpSpeed;
            car.position.z += (target.z - car.position.z) * lerpSpeed;

            // Rotation Lerp (shortest path)
            let diff = target.rotation - car.rotation.y;
            // Normalize to -PI to PI
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            
            car.rotation.y += diff * lerpSpeed;
            
            // Visual wheel turn (fake)
            car.children.forEach(child => {
                 if (child.geometry && child.geometry.type === 'CylinderGeometry' && child.scale.y < 2) {
                     // It's a wheel
                     child.rotation.x += (car.userData.speed || 0) * delta * 0.1;
                 }
            });
        }
    });
}

// Get police state for sending to clients (host-side)
export function getPoliceStateForNetwork() {
    return gameState.policeCars
        .filter(car => car.userData.networkId !== undefined && !car.userData.dead)
        .map(car => ({
            id: car.userData.networkId,
            x: car.position.x,
            z: car.position.z,
            rotation: car.rotation.y,
            health: car.userData.health,
            speed: car.userData.speed,
            type: car.userData.type
        }));
}

