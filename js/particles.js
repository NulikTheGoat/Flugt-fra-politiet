import { gameState } from './state.js';
import { scene, camera } from './core.js';
import { getParticleFromPool, returnParticleToPool, sharedGeometries, sharedMaterials } from './assets.js';
import { playerCar } from './player.js'; // Will be created

// Create spark particle
export function createSpark(position) {
    if(!playerCar) return;

    const spark = getParticleFromPool('spark', sharedGeometries.spark, sharedMaterials.spark);
    
    // Position behind the car if no position provided
    if (position) {
        spark.position.copy(position);
        spark.position.y += Math.random();
    } else {
        const carAngle = playerCar.rotation.y;
        const offsetX = (Math.random() - 0.5) * 15;
        spark.position.set(
            playerCar.position.x - Math.sin(carAngle) * 25 + offsetX,
            1 + Math.random() * 3,
            playerCar.position.z - Math.cos(carAngle) * 25
        );
    }
    
    const carAngle = playerCar.rotation.y;
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
    
    // Ensure separate material opacity if reused
    spark.material.opacity = 1;

    scene.add(spark);
    gameState.sparks.push(spark);
}

// Create smoke for dead cars
export function createSmoke(position, scale = 1) {
    if (gameState.sparks.length > 300) return; // Limit total particles
    
    const smoke = getParticleFromPool('smoke', sharedGeometries.smoke, sharedMaterials.smoke);
    
    smoke.position.copy(position);
    smoke.position.y += (5 + Math.random() * 5) * scale;
    
    smoke.scale.set(scale, scale, scale);
    
    smoke.userData = {
        velocity: new THREE.Vector3(
             (Math.random() - 0.5) * 2 * scale,
             (Math.random() * 3 + 2) * scale, // Rise up
             (Math.random() - 0.5) * 2 * scale
        ),
        lifetime: 2000 * scale,
        spawnTime: Date.now(),
        type: 'smoke'
    };
    
    // Reset initial smoke opacity
    smoke.material.opacity = 0.6 * scale;

    scene.add(smoke);
    gameState.sparks.push(smoke);
}

// Create fire particle for burning cars
export function createFire(position) {
    if (gameState.sparks.length > 300) return;
    
    const fire = getParticleFromPool('smoke', sharedGeometries.spark, sharedMaterials.fire);
    
    fire.position.copy(position);
    fire.position.x += (Math.random() - 0.5) * 10;
    fire.position.z += (Math.random() - 0.5) * 10;
    fire.position.y += 8 + Math.random() * 5;
    
    fire.scale.set(2 + Math.random(), 3 + Math.random() * 2, 2 + Math.random());
    
    fire.userData = {
        velocity: new THREE.Vector3(
             (Math.random() - 0.5) * 1,
             Math.random() * 4 + 3, // Rise up fast
             (Math.random() - 0.5) * 1
        ),
        lifetime: 800,
        spawnTime: Date.now(),
        type: 'fire'
    };
    
    fire.material.opacity = 0.9;
    
    scene.add(fire);
    gameState.sparks.push(fire);
}

// Update sparks and smoke
export function updateSparks() {
    const now = Date.now();
    
    for (let i = gameState.sparks.length - 1; i >= 0; i--) {
        const particle = gameState.sparks[i];
        const age = now - particle.userData.spawnTime;
        
        if (age > particle.userData.lifetime) {
            returnParticleToPool(particle, particle.userData.type);
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
                returnParticleToPool(particle, 'spark');
                gameState.sparks.splice(i, 1);
                continue;
            }
        } else if (particle.userData.type === 'smoke') {
             // Smoke expands and slows
             particle.scale.multiplyScalar(1.02);
             particle.userData.velocity.multiplyScalar(0.95);
        } else if (particle.userData.type === 'fire') {
             // Fire expands, rises, and flickers
             particle.scale.multiplyScalar(1.03);
             particle.userData.velocity.multiplyScalar(0.92);
             // Random flicker effect
             particle.material.opacity = (1 - (age / particle.userData.lifetime)) * 0.8 * (0.7 + Math.random() * 0.3);
        }
        
        // Fade out (skip fire as it handles its own opacity)
        if (particle.userData.type !== 'fire') {
            particle.material.opacity = (1 - (age / particle.userData.lifetime)) * (particle.userData.type === 'smoke' ? 0.6 : 1);
        }
    }
}

// Create speed particle (dust/air streak)
export function createSpeedParticle(pos, staticPos) {
    if(!playerCar) return;

    // Limit particles for performance
    if (gameState.speedParticles.length > 60) return;
    
    // Reuse from pool if possible
    const particle = getParticleFromPool('speed', sharedGeometries.speedParticle, sharedMaterials.speedParticle);
    
    if (staticPos && pos) {
        // Static position provided (e.g. explosion debris)
        particle.position.copy(pos);
        particle.rotation.y = Math.random() * Math.PI * 2;
    } else {
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
    }

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
export function updateSpeedParticles(delta) {
    if(!playerCar) return;
    const now = Date.now();
    const speedRatio = Math.abs(gameState.speed) / gameState.maxSpeed;
    
    for (let i = gameState.speedParticles.length - 1; i >= 0; i--) {
        const particle = gameState.speedParticles[i];
        const age = now - particle.userData.spawnTime;
        
        if (age > particle.userData.lifetime) {
            returnParticleToPool(particle, 'speed');
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

// Speed visual effects (FOV, shake, sparks)
export function updateSpeedEffects(delta) {
    if(!playerCar) return;

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

// Tire Marks
export const tireMarkGeometry = new THREE.PlaneGeometry(3, 8);
export const tireMarkMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x111111, 
    transparent: true, 
    opacity: 0.5, 
    side: THREE.DoubleSide 
});

// Pre-create tire mark materials pool to avoid cloning
const tireMarkMaterialPool = [];
for (let i = 0; i < 20; i++) {
    tireMarkMaterialPool.push(new THREE.MeshBasicMaterial({ 
        color: 0x111111, 
        transparent: true, 
        opacity: 0.5, 
        side: THREE.DoubleSide 
    }));
}
let tireMarkPoolIndex = 0;

export function createTireMark(x, z, rotation) {
    // Limit tire marks for performance
    if (gameState.tireMarks.length > 100) {
        const oldMark = gameState.tireMarks.shift();
        scene.remove(oldMark);
    }
    
    // Create two marks for rear wheels
    const wheelOffset = 10;
    const cosRot = Math.cos(rotation);
    const sinRot = Math.sin(rotation);
    const now = Date.now();
    
    [-1, 1].forEach(side => {
        // Reuse material from pool instead of cloning
        const mat = tireMarkMaterialPool[tireMarkPoolIndex];
        tireMarkPoolIndex = (tireMarkPoolIndex + 1) % tireMarkMaterialPool.length;
        mat.opacity = 0.5;
        
        const mark = new THREE.Mesh(tireMarkGeometry, mat);
        mark.rotation.x = -Math.PI / 2;
        mark.rotation.z = rotation;
        mark.position.set(
            x + cosRot * wheelOffset * side,
            0.12,
            z - sinRot * wheelOffset * side
        );
        mark.userData = {
            spawnTime: now,
            lifetime: 5000
        };
        scene.add(mark);
        gameState.tireMarks.push(mark);
    });
}

export function updateTireMarks() {
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
        mark.material.opacity = 0.5 * (1 - age / mark.userData.lifetime);
    }
}
