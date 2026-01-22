import { gameState, keys } from './state.js';
import { scene, camera, renderer } from './core.js';
import { cars } from './constants.js';
import { createPlayerCar, rebuildPlayerCar, updatePlayer, playerCar, setUICallbacks } from './player.js';
import { spawnPoliceCar, updatePoliceAI, updateProjectiles, firePlayerProjectile } from './police.js';
import { createGround, createTrees, createBuildings, updateBuildingChunks, updateCollectibles } from './world.js';
import { updateHUD, updateHealthUI, DOM, goToShop, showGameOver, setStartGameCallback, triggerDamageEffect } from './ui.js';
import { updateSpeedEffects, updateSparks, updateTireMarks } from './particles.js';

// Initialize - attach renderer to gameContainer
document.getElementById('gameContainer').appendChild(renderer.domElement);

// Check if URL path is /start to auto-start the game
const autoStart = window.location.pathname === '/start' || window.location.pathname === '/start/';

// UI Event Listeners
if (DOM.playBtn) {
    DOM.playBtn.addEventListener('click', () => {
        startGame();
    });
}

if (DOM.gameOverShopBtn) {
    DOM.gameOverShopBtn.addEventListener('click', () => {
        goToShop();
    });
}

// Event Listeners
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === 'c' || e.key === 'C') {
        gameState.is2DMode = !gameState.is2DMode;
    }
    if ((e.key === 'f' || e.key === 'F')) {
        const currentCar = cars[gameState.selectedCar];
        if (currentCar && currentCar.type === 'tank') {
             const now = Date.now();
             if (now - (gameState.lastPlayerShot || 0) > 800) { 
                  firePlayerProjectile();
                  gameState.lastPlayerShot = now;
             }
        }
    }
    if (e.key === ' ') e.preventDefault();
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Create World
createGround();
createBuildings();
createTrees();
createPlayerCar();

export function startGame() {
    DOM.shop.style.display = 'none';
    DOM.gameOver.style.display = 'none';
    gameState.speed = 0;
    gameState.money = 0;
    gameState.heatLevel = 1;
    
    // Set health based on selected car
    const carData = cars[gameState.selectedCar];
    gameState.health = carData.health || 100;
    
    updateHealthUI();
    gameState.arrested = false;
    gameState.startTime = Date.now();
    gameState.lastMoneyCheckTime = Date.now();
    gameState.lastPoliceSpawnTime = Date.now();
    
    gameState.policeCars.forEach(car => scene.remove(car));
    gameState.policeCars = [];
    
    gameState.collectibles.forEach(coin => scene.remove(coin));
    gameState.collectibles = [];
    
    gameState.projectiles.forEach(proj => scene.remove(proj));
    gameState.projectiles = [];
    
    gameState.slowEffect = 0;
    gameState.slowDuration = 0;
    
    // Reset arrest countdown
    gameState.arrestCountdown = 0;
    gameState.arrestStartTime = 0;
    
    gameState.sparks.forEach(s => scene.remove(s));
    gameState.sparks = [];
    gameState.currentFOV = gameState.baseFOV;
    camera.fov = gameState.baseFOV;
    camera.updateProjectionMatrix();
    
    // Update car model and color
    rebuildPlayerCar();
    
    // Spawn first police car
    spawnPoliceCar();
}

let lastTime = performance.now();

function animate() {
    requestAnimationFrame(animate);
    
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 16.67, 2); 
    lastTime = now;

    if (!gameState.arrested) {
        // Player Physics
        updatePlayer(delta, now);

        // Spawn Police
        const elapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
        if (elapsedSeconds > 0 && elapsedSeconds % 10 === 0 && (Date.now() - gameState.lastPoliceSpawnTime) > 500) {
            spawnPoliceCar();
            gameState.lastPoliceSpawnTime = Date.now();
        }

        // Chunks
        updateBuildingChunks(delta);

        // Collectibles & Heat
        updateCollectibles();

        // Projectiles
        updateProjectiles(delta);
        
        // Police AI
        const policeDistance = updatePoliceAI(delta);
        
        // HUD
        updateHUD(policeDistance);
    }
    
    // Visual FX
    updateSparks(); 
    updateSpeedEffects(delta);
    
    // Camera
    if(!playerCar) {
         renderer.render(scene, camera);
         return;
    }

    if (gameState.is2DMode) {
        camera.up.set(0, 0, -1);
        camera.position.x = playerCar.position.x;
        camera.position.z = playerCar.position.z;
        camera.position.y = 800;
        camera.lookAt(playerCar.position);
    } else {
        camera.up.set(0, 1, 0); 
        const cameraDistance = 80;
        const cameraHeight = 40;
        const targetX = playerCar.position.x - Math.sin(playerCar.rotation.y) * cameraDistance;
        const targetZ = playerCar.position.z - Math.cos(playerCar.rotation.y) * cameraDistance;

        camera.position.x += (targetX - camera.position.x) * 0.1;
        camera.position.y = playerCar.position.y + cameraHeight;
        camera.position.z += (targetZ - camera.position.z) * 0.1;
        
        if (gameState.screenShake > 0.01) {
            camera.position.x += (Math.random() - 0.5) * gameState.screenShake;
            camera.position.y += (Math.random() - 0.5) * gameState.screenShake * 0.5;
        }
        
        camera.lookAt(playerCar.position.x, playerCar.position.y + 10, playerCar.position.z);
    }

    renderer.render(scene, camera);
}

// Start
setStartGameCallback(startGame);
setUICallbacks({ triggerDamageEffect, updateHealthUI });

// Auto-start game if /start path is accessed
if (autoStart) {
    startGame();
}
startGame();
animate();
