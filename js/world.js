import { gameState } from './state.js';
import { scene } from './core.js';
import { sharedGeometries, sharedMaterials } from './assets.js';
import { playerCar, takeDamage } from './player.js';
import { createSmoke } from './particles.js';
import { addMoney } from './ui.js';

export function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Main Road - Horizontal
    const roadGeometry = new THREE.BoxGeometry(300, 0.4, 10000);
    const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.position.set(0, 0.2, 0);
    road.receiveShadow = true;
    scene.add(road);

    // Main Road - Vertical
    const roadVertical = new THREE.Mesh(roadGeometry, roadMaterial);
    roadVertical.rotation.y = Math.PI / 2;
    roadVertical.position.set(0, 0.2, 0);
    roadVertical.receiveShadow = true;
    scene.add(roadVertical);

    // Road markings
    const markingGeometry = new THREE.PlaneGeometry(5, 150);
    const markingMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    
    // Horizontal markings
    for (let i = -2500; i < 2500; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(0, 0.45, i);
        marking.receiveShadow = true;
        scene.add(marking);
    }

    // Vertical markings
    for (let i = -2500; i < 2500; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(i, 0.45, 0);
        marking.receiveShadow = true;
        scene.add(marking);
    }
}

export function createTrees() {
    const treePositions = [
        [-300, -1500], [300, -1500],
        [-1500, -1200], [1500, -1200],
        [-1600, 500], [1600, 500],
        [-200, 1500], [200, 1500],
        [-1400, 1200], [1400, 1200],
        [-800, -2000], [800, -2000],
        [0, 2000],
    ];

    const trunkGeometry = new THREE.CylinderGeometry(8, 10, 40, 6);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const foliageGeometry = new THREE.ConeGeometry(30, 60, 6);
    const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });

    treePositions.forEach(pos => {
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(pos[0], 20, pos[1]);
        scene.add(trunk);

        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.set(pos[0], 60, pos[1]);
        scene.add(foliage);
    });
}

export function createBuildings() {
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
        
        // Scattered
        [-400, -1000, 85, 65, 130],
        [400, -1000, 90, 70, 135],
        [-1100, -200, 100, 75, 150],
        [1100, -200, 105, 80, 155],
        
        // Expanded map
        [-800, 1800, 120, 90, 200],
        [0, 2200, 150, 100, 220],
        [800, 1800, 110, 85, 180],
        [-1500, 2000, 100, 80, 160],
        [1500, 2000, 105, 82, 170],
        [-800, -1800, 115, 88, 190],
        [0, -2200, 140, 95, 210],
        [800, -1800, 100, 80, 175],
        [-1500, -2000, 95, 75, 155],
        [1500, -2000, 110, 85, 165],
        [-2000, -1000, 130, 95, 200],
        [-2200, 0, 140, 100, 230],
        [-2000, 1000, 120, 90, 190],
        [-2500, -500, 100, 80, 160],
        [-2500, 500, 105, 82, 170],
        [2000, -1000, 125, 92, 195],
        [2200, 0, 145, 98, 225],
        [2000, 1000, 115, 88, 185],
        [2500, -500, 98, 78, 155],
        [2500, 500, 102, 80, 165],
        [-2500, -2500, 150, 110, 250],
        [2500, -2500, 145, 105, 240],
        [-2500, 2500, 140, 100, 235],
        [2500, 2500, 155, 112, 245],
    ];

    const chunkSize = 30;
    
    // Create new material each time or share?
    // Sharing random colors is hard without a map.
    // The script used random colors per building logic.

    buildingPositions.forEach(([x, z, width, depth, height]) => {
        const nx = Math.ceil(width / chunkSize);
        const ny = Math.ceil(height / chunkSize);
        const nz = Math.ceil(depth / chunkSize);

        const dx = width / nx;
        const dy = height / ny;
        const dz = depth / nz;

        const chunkGeometry = new THREE.BoxGeometry(dx, dy, dz);
        const buildingColor = new THREE.Color().setHSL(Math.random() * 0.1 + 0.05, 0.6, 0.5);
        const buildingMaterial = new THREE.MeshLambertMaterial({ color: buildingColor });
        
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

                    const gridX = Math.floor(chunk.position.x / gameState.chunkGridSize);
                    const gridZ = Math.floor(chunk.position.z / gameState.chunkGridSize);
                    const key = `${gridX},${gridZ}`;
                    if (!gameState.chunkGrid[key]) gameState.chunkGrid[key] = [];
                    gameState.chunkGrid[key].push(chunk);
                }
            }
        }
    });
}

export function updateBuildingChunks(delta) {
    if(!playerCar) return;
    const d = delta || 1;

    // Active Chunks
    for (let i = gameState.activeChunks.length - 1; i >= 0; i--) {
        const chunk = gameState.activeChunks[i];
        
        chunk.position.x += chunk.userData.velocity.x * d;
        chunk.position.y += chunk.userData.velocity.y * d;
        chunk.position.z += chunk.userData.velocity.z * d;
        chunk.rotation.x += chunk.userData.rotVelocity.x * d;
        chunk.rotation.y += chunk.userData.rotVelocity.y * d;
        chunk.rotation.z += chunk.userData.rotVelocity.z * d;
        
        chunk.userData.velocity.y -= 0.5 * d;
        
        if (chunk.position.y < chunk.userData.height/2) {
            chunk.position.y = chunk.userData.height/2;
            chunk.userData.velocity.y *= -0.5; 
            
            const frictionFactor = Math.pow(0.8, d);
            chunk.userData.velocity.x *= frictionFactor;
            chunk.userData.velocity.z *= frictionFactor;
            chunk.userData.rotVelocity.multiplyScalar(frictionFactor);
        }
        
        if (Math.abs(chunk.userData.velocity.y) < 0.1 && 
            Math.abs(chunk.userData.velocity.x) < 0.1 && 
            Math.abs(chunk.userData.velocity.z) < 0.1 &&
            chunk.position.y <= chunk.userData.height/2 + 0.1) {
             gameState.activeChunks.splice(i, 1);
        }
    }

    // Collisions
    const carPos = playerCar.position;
    const carRadius = 15; 
    
    const gridSize = gameState.chunkGridSize;
    const px = Math.floor(carPos.x / gridSize);
    const pz = Math.floor(carPos.z / gridSize);
    
    for(let x = px-1; x <= px+1; x++) {
        for(let z = pz-1; z <= pz+1; z++) {
            const key = `${x},${z}`;
            const chunks = gameState.chunkGrid[key];
            if(!chunks) continue;
            
            for(let i=0; i< chunks.length; i++) {
                const chunk = chunks[i];
                if(chunk.userData.isHit) continue; 
                
                if (Math.abs(chunk.position.x - carPos.x) < 40 && Math.abs(chunk.position.z - carPos.z) < 40) {
                     const dx = chunk.position.x - carPos.x;
                     const dz = chunk.position.z - carPos.z;
                     const distSq = dx*dx + dz*dz;
                     
                     if (distSq < (carRadius + chunk.userData.width/2 + 5)**2) {
                         if (Math.abs(chunk.position.y - carPos.y) < (chunk.userData.height/2 + 10)) {
                             chunk.userData.isHit = true;
                             gameState.activeChunks.push(chunk);
                             
                             const carSpeed = gameState.speed;
                             const carAngle = playerCar.rotation.y;
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

                             gameState.speed *= 0.95; 
                             takeDamage(Math.floor(Math.abs(carSpeed) * 0.1) + 5);
                             gameState.screenShake = 0.3;
                             createSmoke(chunk.position);
                         }
                     }
                }
            }
        }
    }
}

export function createMoney() {
    const coin = new THREE.Mesh(sharedGeometries.coin, sharedMaterials.coin);
    
    const mapSize = 3500;
    coin.position.set(
        (Math.random() - 0.5) * mapSize * 2,
        5,
        (Math.random() - 0.5) * mapSize * 2
    );
    coin.rotation.z = Math.PI / 2;
    coin.castShadow = true;
    
    scene.add(coin);
    gameState.collectibles.push(coin);
}

export function updateCollectibles() {
    if (gameState.arrested) return;

    if (Math.random() < 0.02) { 
         createMoney();
         if (gameState.collectibles.length > 50) {
             const oldCoin = gameState.collectibles.shift();
             scene.remove(oldCoin);
         }
    }

    for (let i = gameState.collectibles.length - 1; i >= 0; i--) {
        const coin = gameState.collectibles[i];
        coin.rotation.y += 0.05;

        // Ensure coin is upright
        coin.rotation.z = Math.PI / 2;

        if(!playerCar) continue;
        const dx = playerCar.position.x - coin.position.x;
        const dz = playerCar.position.z - coin.position.z;
        if (Math.sqrt(dx*dx + dz*dz) < 20) {
            scene.remove(coin);
            gameState.collectibles.splice(i, 1);
            
            const time = (gameState.arrested ? gameState.elapsedTime : (Date.now() - gameState.startTime) / 1000) || 0;
            const baseValue = 50;
            const timeBonus = Math.floor(time / 10) * 10; 
            const rebirthMult = (gameState.rebirthPoints || 0) + 1;
            addMoney((baseValue + timeBonus) * rebirthMult);
        }
    }
}
