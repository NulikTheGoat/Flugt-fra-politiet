import { gameState } from './state.js';
import { gameConfig } from './config.js';
import { scene, camera } from './core.js';
import { enemies, cars } from './constants.js';
import { sharedGeometries, sharedMaterials } from './assets.js';
import { createSmoke, createSpeedParticle, createFire, createMoneyExplosion } from './particles.js';
import { playerCar, takeDamage } from './player.js';
import { normalizeAngleRadians, clamp } from './utils.js';
import { createBuildingDebris } from './world.js';
import { addMoney, showFloatingMoney, showGameOver } from './ui.js';
import * as Network from './network.js';
import { logEvent, EVENTS } from './commentary.js';
import { requestSheriffCommand, getCurrentSheriffCommand, applySheriffCommand } from './sheriff.js';

const projectileGeometry = new THREE.SphereGeometry(2, 8, 8);

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
    const bodyMat = config.bodyMaterial || new THREE.MeshLambertMaterial({ color: config.color });
    // Car body
    const body = new THREE.Mesh(sharedGeometries.carBody, bodyMat);
    body.position.y = 6;
    body.castShadow = true;
    carGroup.add(body);

    // White stripe (only for police/interceptor)
    if (type === 'standard' || type === 'interceptor') {
        const stripe = new THREE.Mesh(sharedGeometries.policeStripe, sharedMaterials.white);
        stripe.position.set(0, 12.5, 0);
        carGroup.add(stripe);
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
    const roofMat = config.roofMaterial || new THREE.MeshLambertMaterial({ color: config.color });
    const roof = new THREE.Mesh(sharedGeometries.carRoof, roofMat);
    roof.position.set(0, 16, -5);
    roof.castShadow = true;
    carGroup.add(roof);

    // Light on roof
    const redLight = new THREE.Mesh(sharedGeometries.policeLight, sharedMaterials.redLight);
    redLight.position.set(-4, 20, -8);
    carGroup.add(redLight);

    const blueLight = new THREE.Mesh(sharedGeometries.policeLight, sharedMaterials.blueLight);
    blueLight.position.set(4, 20, -8);
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
    
    // Check if Sheriff already exists
    const hasSheriff = gameState.policeCars.some(car => 
        car.userData.type === 'sheriff' && !car.userData.dead
    );
    
    // Spawn Sheriff at heat level 3+ if not already present (10% chance)
    if (!hasSheriff && gameState.heatLevel >= 3 && rand > 0.9) {
        type = 'sheriff';
    } else {
        // Regular police spawning logic
        if (gameState.heatLevel >= 2 && rand > 0.6) type = 'interceptor';
        if (gameState.heatLevel >= 3 && rand > 0.7) type = 'swat';
        if (gameState.heatLevel >= 4 && rand > 0.8) type = 'military';
    }

    const policeCar = createPoliceCar(type);
    
    // Assign unique network ID for multiplayer sync
    policeCar.userData.networkId = nextPoliceNetworkId++;
    
    // Spawn relative to player position (supports infinite world)
    const minSpawnDist = 700; // Increased from 500 to give more reaction time
    const maxSpawnDist = 1200; // Increased from 900
    
    // 70% chance to spawn in front of player (for roadblocks/intercept), 30% from behind/sides
    const playerRotation = playerCar.rotation.y;
    // Random angle: 70% chance within +/- 60 degrees of front, 30% anywhere
    let spawnAngle;
    if (Math.random() < 0.7) {
        spawnAngle = playerRotation + (Math.random() - 0.5) * (Math.PI / 1.5); // +/- 60 deg cone
    } else {
        spawnAngle = Math.random() * Math.PI * 2;
    }
    
    const dist = minSpawnDist + Math.random() * (maxSpawnDist - minSpawnDist);
    
    const x = playerCar.position.x + Math.sin(spawnAngle) * dist; // Math.sin/cos swapped because THREE.js rotation is Y-axis and 0 is typically -Z or +Z depending on model. 
    // Player moves using: x += Math.sin(rotation) * speed, z += Math.cos(rotation) * speed
    const z = playerCar.position.z + Math.cos(spawnAngle) * dist;

    policeCar.position.x = x;
    policeCar.position.z = z;
    gameState.policeCars.push(policeCar);
    
    if (gameState.isMultiplayer || type === 'sheriff') {
        console.log(`[POLICE] Spawned police #${policeCar.userData.networkId} (${type}) at (${Math.round(x)}, ${Math.round(z)}). Total: ${gameState.policeCars.length}`);
    }
    
    return policeCar;
}

export function updatePoliceAI(delta) {
    if(!playerCar) return 10000;

    let minDistance = 10000;
    
    // Sheriff Command System - Request new commands periodically
    const now = Date.now();
    const sheriff = gameState.policeCars.find(car => 
        car.userData.type === 'sheriff' && !car.userData.dead
    );
    
    // If sheriff exists, periodically request new commands
    if (sheriff) {
        const activePoliceCount = gameState.policeCars.filter(c => !c.userData.dead).length;
        requestSheriffCommand(playerCar, activePoliceCount).catch(err => {
            console.warn('[Sheriff] Command request failed:', err);
            // Fallback: Sheriff continues using last command or default behavior
        });
    }
    
    // Get current active command
    const currentCommand = getCurrentSheriffCommand();

    // Enhanced AI system with industry best practices:
    // - Predictive intercept targeting
    // - Formation pursuit tactics
    // - Look-ahead obstacle avoidance
    // - Dynamic cornering behavior
    // - Realistic momentum-based collisions
    gameState.policeCars.forEach((policeCar, index) => {
        // Shared constants for this police car's update
        const gridSize = gameState.chunkGridSize;
        
        if (policeCar.userData.dead) {
             // Dead police cars slow down and stop
             policeCar.userData.speed *= Math.pow(0.9, delta || 1);
             if (policeCar.userData.speed > 1) {
                 const move = policeCar.userData.speed * 0.016 * (delta || 1);
                 policeCar.position.x += Math.sin(policeCar.rotation.y) * move;
                 policeCar.position.z += Math.cos(policeCar.rotation.y) * move;
             } else {
                 policeCar.userData.speed = 0;
             }
             
             // Dead cars are collectable awards
             if (playerCar) {
                 const dx = playerCar.position.x - policeCar.position.x;
                 const dz = playerCar.position.z - policeCar.position.z;
                 const dist = Math.sqrt(dx*dx + dz*dz);
                 const collisionRadius = 25;
                 
                 if (dist < collisionRadius) {
                     // AWARD! - Use enemy-specific pickup reward
                     const enemyType = policeCar.userData.type || 'standard';
                     const enemyConfig = enemies[enemyType] || enemies.standard;
                     const reward = enemyConfig.pickupReward || 300;
                     addMoney(reward);
                     
                     // Show floating text animation
                     showFloatingMoney(reward, policeCar.position, camera);

                     createMoneyExplosion(policeCar.position);
                     logEvent(EVENTS.COLLISION, `INDKASSERET BETJENT! +${reward} KR`);
                     
                     // Despawn
                     scene.remove(policeCar);
                     
                     // Mark for removal from array by setting a flag or handled in next loop
                     // We can't splice easily inside forEach without messing up index
                     // So we set a flag 'despawn' and filter later, or handle carefully
                     policeCar.userData.remove = true;
                     return; // Skip rest of loop for this car
                 }
             }
             
             if (policeCar.userData.remove) return;

             // Smoke and fire effects - stay forever (throttled for performance)
             const now = Date.now();
             const timeSinceDeath = now - policeCar.userData.deathTime;
             const lastParticle = policeCar.userData.lastParticleTime || 0;
             
             // Throttle particle spawning to every 100ms
             if (now - lastParticle > 100) {
                 policeCar.userData.lastParticleTime = now;
                 
                 // Smoke constantly (30% chance per tick)
                 if (Math.random() < 0.4) createSmoke(policeCar.position);
                 
                 // Fire sparks after 2 seconds (25% chance per tick)
                 if (timeSinceDeath > 2000 && Math.random() < 0.3) {
                     createFire(policeCar.position);
                 }
             }
             
             // Don't remove dead cars - they stay as obstacles
             return;
        }

        // Police vs Police Collision - Solid bodies with damage
        for (let j = index + 1; j < gameState.policeCars.length; j++) {
            const otherCar = gameState.policeCars[j];
            
            const dx = policeCar.position.x - otherCar.position.x;
            const dz = policeCar.position.z - otherCar.position.z;
            const distSq = dx*dx + dz*dz;
            const minDist = 30; // Larger collision radius for police cars
            const preferredDist = 50; // Distance they try to keep from each other

            if (distSq < minDist * minDist) {
                const dist = Math.sqrt(distSq);
                const overlap = (minDist - dist) * 0.5;
                const nx = dist > 0 ? dx / dist : 1; 
                const nz = dist > 0 ? dz / dist : 0;

                // Push both cars apart (living car moves more, dead car barely moves)
                if (otherCar.userData.dead) {
                    policeCar.position.x += nx * overlap * 1.5;
                    policeCar.position.z += nz * overlap * 1.5;
                    otherCar.position.x -= nx * overlap * 0.1;
                    otherCar.position.z -= nz * overlap * 0.1;
                } else {
                    // Mass-based collision response
                    const myType = policeCar.userData.type || 'standard';
                    const otherType = otherCar.userData.type || 'standard';
                    
                    const myMass = enemies[myType]?.mass || 1.0;
                    const otherMass = enemies[otherType]?.mass || 1.0;
                    const totalMass = myMass + otherMass;
                    
                    // Inverse mass ratio - lighter car moves more
                    const myRatio = otherMass / totalMass;
                    const otherRatio = myMass / totalMass;

                    policeCar.position.x += nx * overlap * 2 * myRatio;
                    policeCar.position.z += nz * overlap * 2 * myRatio;
                    otherCar.position.x -= nx * overlap * 2 * otherRatio;
                    otherCar.position.z -= nz * overlap * 2 * otherRatio;
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
                            const enemyType = otherCar.userData.type || 'standard';
                            const enemyConfig = enemies[enemyType] || enemies.standard;
                            addMoney(enemyConfig.killReward || 150);
                            gameState.policeKilled = (gameState.policeKilled || 0) + 1;
                            logEvent(EVENTS.POLICE_KILLED, otherCar.userData.type);
                        }
                    }
                    
                    createSmoke(policeCar.position);
                    gameState.screenShake = 0.15;
                    
                    // Check if this car died
                    if (policeCar.userData.health <= 0) {
                        policeCar.userData.dead = true;
                        policeCar.userData.deathTime = now;
                        const enemyType = policeCar.userData.type || 'standard';
                        const enemyConfig = enemies[enemyType] || enemies.standard;
                        addMoney(enemyConfig.killReward || 150);
                        gameState.policeKilled = (gameState.policeKilled || 0) + 1;
                        logEvent(EVENTS.POLICE_KILLED, policeCar.userData.type);
                    }
                }
            } else if (distSq < preferredDist * preferredDist && !otherCar.userData.dead) {
                // Gentle push to maintain spacing - police try to spread out (only for living cars)
                const dist = Math.sqrt(distSq);
                const pushStrength = 0.3 * (1 - dist / preferredDist);
                const nx = dx / dist;
                const nz = dz / dist;
                
                policeCar.position.x += nx * pushStrength;
                policeCar.position.z += nz * pushStrength;
            }
        }

        const dx = playerCar.position.x - policeCar.position.x;
        const dz = playerCar.position.z - policeCar.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        // Vehicle Ramming Logic (e.g. Tank)
        const currentCar = cars[gameState.selectedCar];
        if (currentCar && currentCar.canRam && distance < 50) {
             policeCar.userData.dead = true;
             policeCar.userData.deathTime = Date.now();
             const enemyType = policeCar.userData.type || 'standard';
             const enemyConfig = enemies[enemyType] || enemies.standard;
             addMoney(enemyConfig.killReward || 150);
             gameState.policeKilled = (gameState.policeKilled || 0) + 1;
             logEvent(EVENTS.POLICE_KILLED, policeCar.userData.type);
             createSmoke(policeCar.position);
             gameState.screenShake = 0.5;
             return; 
        }

        // SHERIFF COMMAND SYSTEM - Apply commands to non-Sheriff police
        let commandModifiers = {};
        if (currentCommand && policeCar.userData.type !== 'sheriff') {
            commandModifiers = applySheriffCommand(currentCommand.type, policeCar, playerCar);
            // Store active command for visual feedback
            policeCar.userData.activeCommand = currentCommand.type;
        } else {
            policeCar.userData.activeCommand = null;
        }

        // AGGRESSIVE AI - scales with heat level
        // Heat 1: baseline, Heat 6: 2.5x more aggressive
        const aggressionMultiplier = 1 + (gameState.heatLevel - 1) * 0.3; // 1.0 to 2.5
        
        // === PREDICTIVE INTERCEPT TARGETING ===
        // Police predict where player will be and aim there
        const playerVelX = gameState.velocityX || 0;
        const playerVelZ = gameState.velocityZ || 0;
        const predictionTime = Math.min(distance / 300, 2.0); // Look ahead up to 2 seconds
        
        const predictedX = playerCar.position.x + playerVelX * predictionTime * 60;
        const predictedZ = playerCar.position.z + playerVelZ * predictionTime * 60;
        
        // === FORMATION PURSUIT ===
        // Distribute police around player for surround tactics
        if (!policeCar.userData.formationOffset) {
            policeCar.userData.formationOffset = (index * Math.PI * 2) / Math.max(gameState.policeCars.length, 1);
        }
        
        const formationRadius = 100; // Preferred distance for formation
        const formationAngle = Math.atan2(playerVelZ, playerVelX) + policeCar.userData.formationOffset;
        
        const formationTargetX = playerCar.position.x + Math.cos(formationAngle) * formationRadius;
        const formationTargetZ = playerCar.position.z + Math.sin(formationAngle) * formationRadius;
        
        // Blend between direct intercept and formation based on distance and heat
        const useFormation = distance < 300 && gameState.heatLevel >= 2;
        let targetX = useFormation ? 
            (formationTargetX * 0.6 + predictedX * 0.4) : predictedX;
        let targetZ = useFormation ? 
            (formationTargetZ * 0.6 + predictedZ * 0.4) : predictedZ;
        
        // --- SHERIFF AI OVERRIDE ---
        if (commandModifiers.targetOffset !== undefined) {
             targetX = playerCar.position.x + Math.sin(commandModifiers.targetOffset) * 100;
             targetZ = playerCar.position.z + Math.cos(commandModifiers.targetOffset) * 100;
        }

        const finalDx = targetX - policeCar.position.x;
        const finalDz = targetZ - policeCar.position.z;
        
        let targetDirection = Math.atan2(finalDx, finalDz);
        
        if (commandModifiers.overrideDirection !== undefined) {
            targetDirection = commandModifiers.overrideDirection;
        }

        // === LOOK-AHEAD OBSTACLE AVOIDANCE ===
        // Optimized: Throttle checks to reduce CPU usage. 
        // Only check every 150-250ms instead of every frame.
        if (!policeCar.userData.nextObstacleCheck || Date.now() > policeCar.userData.nextObstacleCheck) {
            const lookAheadDist = 80; // Distance to check for obstacles
            const checkX = policeCar.position.x + Math.sin(policeCar.rotation.y) * lookAheadDist;
            const checkZ = policeCar.position.z + Math.cos(policeCar.rotation.y) * lookAheadDist;
            
            let detectedObstacle = false;
            const checkGridX = Math.floor(checkX / gridSize);
            const checkGridZ = Math.floor(checkZ / gridSize);
            
            for(let gx = checkGridX-1; gx <= checkGridX+1; gx++) {
                for(let gz = checkGridZ-1; gz <= checkGridZ+1; gz++) {
                    const key = `${gx},${gz}`;
                    const chunks = gameState.chunkGrid[key];
                    if(!chunks) continue;
                    
                    for(let c=0; c < chunks.length; c++) {
                        const chunk = chunks[c];
                        if(chunk.userData.isHit) continue;
                        
                        const cdx = chunk.position.x - checkX;
                        const cdz = chunk.position.z - checkZ;
                        const chunkDist = Math.sqrt(cdx*cdx + cdz*cdz);
                        
                        if (chunkDist < 40) {
                            detectedObstacle = true;
                            break;
                        }
                    }
                    if (detectedObstacle) break;
                }
                if (detectedObstacle) break;
            }
            
            policeCar.userData.hasObstacle = detectedObstacle;
            // Random interval 150-250ms to prevent synchronized lag spikes
            policeCar.userData.nextObstacleCheck = Date.now() + 150 + Math.random() * 100;
        }

        const hasObstacle = policeCar.userData.hasObstacle;
        
        // If obstacle detected, turn to avoid it
        // Only avoid if NOT under strict directional command (like U-Turn)
        let avoidanceAngle = 0;
        if (hasObstacle && commandModifiers.overrideDirection === undefined) {
            // Turn perpendicular to current direction
            avoidanceAngle = Math.PI / 2; // 90 degree turn
            // Randomly choose left or right turn based on police car index
            if (index % 2 === 0) avoidanceAngle = -avoidanceAngle;
        }
        
        // === IMPROVED CORNERING BEHAVIOR ===
        const angleDiff = normalizeAngleRadians(targetDirection - policeCar.rotation.y + avoidanceAngle);
        const sharpTurn = Math.abs(angleDiff) > Math.PI / 4; // 45 degrees or more
        
        // Initialize physics state for police car
        if (!policeCar.userData.currentSpeed) {
            policeCar.userData.currentSpeed = policeCar.userData.speed || 250;
        }
        
        // Slow down before sharp turns (racing game technique)
        const corneringSpeedFactor = sharpTurn ? (0.6 - Math.abs(angleDiff) * 0.2) : 1.0;
        
        // Faster turning at higher heat levels
        const baseTurnSpeed = 0.06;
        const turnSpeed = baseTurnSpeed * aggressionMultiplier * (sharpTurn ? 1.3 : 1.0);
        policeCar.rotation.y += clamp(angleDiff, -turnSpeed, turnSpeed) * (delta || 1);

        // === DYNAMIC SPEED ADJUSTMENT ===
        // Base speed increased by aggression at higher heat levels
        let targetPoliceSpeed = (policeCar.userData.speed || 250) * (1 + (aggressionMultiplier - 1) * 0.5);
        
        // Apply cornering slowdown
        targetPoliceSpeed *= corneringSpeedFactor;
        
        // Apply Sheriff command speed modifier
        if (commandModifiers.speedMultiplier) {
            targetPoliceSpeed *= commandModifiers.speedMultiplier;
        }
        
        // Slow down police when near player and player is slow (for arrest)
        const playerSpeedKmh = Math.abs(gameState.speed) * 3.6;
        const maxSpeedKmh = gameState.maxSpeed * 3.6;
        const speedThreshold = maxSpeedKmh * 0.1;
        
        if (distance < 150 && playerSpeedKmh < speedThreshold) {
            // Match player speed when close and player is slow
            const slowFactor = Math.max(0.1, distance / 150);
            targetPoliceSpeed *= slowFactor;
        }
        
        // At high heat levels, police try to ram the player when close
        if (gameState.heatLevel >= 3 && distance < 100 && distance > 30) {
            // Boost speed when chasing close - ramming behavior
            targetPoliceSpeed *= 1.3;
        }
        
        // Smooth acceleration/deceleration (more realistic)
        const speedBlendRate = 0.1;
        policeCar.userData.currentSpeed += (targetPoliceSpeed - policeCar.userData.currentSpeed) * speedBlendRate;
        
        const policeSpeed = policeCar.userData.currentSpeed;
        const policeMove = policeSpeed * 0.016 * (delta || 1);
        policeCar.position.z += Math.cos(policeCar.rotation.y) * policeMove;
        policeCar.position.x += Math.sin(policeCar.rotation.y) * policeMove;

        // Police vs Building Collision
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

                        // Create debris
                        createBuildingDebris(chunk.position, chunk.material.color, policeSpeed);
                        
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

        // === IMPROVED COLLISION RESPONSE WITH MOMENTUM TRANSFER ===
        const collisionRadius = 25; // Combined radius of both cars
        if (distance < collisionRadius && !policeCar.userData.dead) {
            const overlap = collisionRadius - distance;
            const nx = dx / distance;
            const nz = dz / distance;
            
            // Calculate relative velocities for realistic collision
            const playerVelX = gameState.velocityX || 0;
            const playerVelZ = gameState.velocityZ || 0;
            const playerSpeed = Math.sqrt(playerVelX * playerVelX + playerVelZ * playerVelZ);
            
            // Police velocity based on their movement direction
            const policeForwardX = Math.sin(policeCar.rotation.y);
            const policeForwardZ = Math.cos(policeCar.rotation.y);
            const policeVelX = policeForwardX * policeSpeed * 0.016;
            const policeVelZ = policeForwardZ * policeSpeed * 0.016;
            
            // Relative velocity along collision normal
            const relVelX = playerVelX - policeVelX;
            const relVelZ = playerVelZ - policeVelZ;
            const relVelNormal = relVelX * nx + relVelZ * nz;
            
            // Mass ratio (police cars are heavier for SWAT/Military)
            const playerMass = cars[gameState.selectedCar]?.mass || 1.0;
            const enemyType = policeCar.userData.type || 'standard';
            const enemyConfig = enemies[enemyType] || enemies.standard;
            const policeMass = enemyConfig.mass || 1.0;
            const totalMass = playerMass + policeMass;
            
            // Only process collision if objects are moving toward each other
            if (relVelNormal < 0) {
                // Coefficient of restitution (bounciness) - partial elastic collision
                const restitution = 0.3;
                
                // Calculate impulse for momentum transfer
                const impulse = -(1 + restitution) * relVelNormal / totalMass;
                
                // Apply impulse to both vehicles
                const playerImpulseX = impulse * nx * policeMass;
                const playerImpulseZ = impulse * nz * policeMass;
                const policeImpulseX = -impulse * nx * playerMass;
                const policeImpulseZ = -impulse * nz * policeMass;
                
                // Update velocities with momentum transfer
                gameState.velocityX += playerImpulseX;
                gameState.velocityZ += playerImpulseZ;
                
                // Transfer to police (store for next frame)
                if (!policeCar.userData.velocityX) policeCar.userData.velocityX = 0;
                if (!policeCar.userData.velocityZ) policeCar.userData.velocityZ = 0;
                policeCar.userData.velocityX += policeImpulseX;
                policeCar.userData.velocityZ += policeImpulseZ;
            }
            
            // Separate overlapping bodies
            const pushRatio = policeMass / (playerMass + policeMass);
            playerCar.position.x += nx * overlap * pushRatio;
            playerCar.position.z += nz * overlap * pushRatio;
            policeCar.position.x -= nx * overlap * (1 - pushRatio);
            policeCar.position.z -= nz * overlap * (1 - pushRatio);
            
            // Damage both cars on collision (throttled)
            const now = Date.now();
            if (now - (policeCar.userData.lastCollisionDamage || 0) > 300) {
                policeCar.userData.lastCollisionDamage = now;
                
                // Damage based on collision speed (relative velocity)
                const collisionSpeed = Math.abs(relVelNormal) * 60; // Convert to km/h-ish
                
                // Damage to player
                const playerDamage = Math.max(gameConfig.minCrashDamage, collisionSpeed * gameConfig.playerCrashDamageMultiplier * 0.5);
                takeDamage(playerDamage);
                logEvent(EVENTS.CRASH, 'police car');
                
                // Damage to police (heavier vehicles take less damage)
                const policeDamageMultiplier = 1.0 / policeMass;
                const policeDamage = Math.max(gameConfig.minCrashDamage, collisionSpeed * gameConfig.policeCrashDamageMultiplier * policeDamageMultiplier);
                policeCar.userData.health -= policeDamage;
                
                if (policeCar.userData.health <= 0) {
                    policeCar.userData.dead = true;
                    policeCar.userData.deathTime = now;
                    const enemyType = policeCar.userData.type || 'standard';
                    const enemyConfig = enemies[enemyType] || enemies.standard;
                    addMoney(enemyConfig.killReward || 150);
                    gameState.policeKilled = (gameState.policeKilled || 0) + 1;
                    logEvent(EVENTS.POLICE_KILLED, policeCar.userData.type);
                }
                
                createSmoke(playerCar.position);
                gameState.screenShake = 0.2 + Math.min(collisionSpeed * 0.01, 0.3);
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
                    const enemyType = policeCar.userData.type || 'standard';
                    const enemyConfig = enemies[enemyType] || enemies.standard;
                    addMoney(enemyConfig.killReward || 150);
                    gameState.policeKilled = (gameState.policeKilled || 0) + 1;
                    logEvent(EVENTS.POLICE_KILLED, policeCar.userData.type);
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
                    const enemyType = police.userData.type || 'standard';
                    const enemyConfig = enemies[enemyType] || enemies.standard;
                    addMoney(enemyConfig.killReward || 150);
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
            
            // Smooth interpolation
            const lerpFactor = 0.3;
            car.position.x += (data.x - car.position.x) * lerpFactor;
            car.position.z += (data.z - car.position.z) * lerpFactor;
            
            // Smooth rotation
            let diff = data.rotation - car.rotation.y;
            if (diff > Math.PI) diff -= Math.PI * 2;
            if (diff < -Math.PI) diff += Math.PI * 2;
            car.rotation.y += diff * lerpFactor;
            
            // Update health
            car.userData.health = data.health;
            car.userData.speed = data.speed;
            
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

