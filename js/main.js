/**
 * MAIN.JS - Game Entry Point
 * 
 * This is the main game file that orchestrates everything.
 * 
 * Key Responsibilities:
 * - Initialize Three.js scene and attach to DOM
 * - Set up event listeners (keyboard, buttons, etc.)
 * - Manage game modes (solo vs multiplayer)
 * - Run the main game loop (animate function)
 * - Handle multiplayer lobby and room management
 * 
 * Game Loop Flow:
 * 1. Calculate delta time
 * 2. Update player physics
 * 3. Update police AI
 * 4. Update projectiles (if Tank is shooting)
 * 5. Update visual effects (particles, sparks, tire marks)
 * 6. Update HUD
 * 7. Update commentary (if enabled)
 * 8. Broadcast state to clients (if host)
 * 9. Render scene
 * 10. Request next frame
 * 
 * Module Imports:
 * - state.js: Game state and input
 * - player.js: Player car logic
 * - police.js: Police AI
 * - world.js: Environment generation
 * - ui.js: HUD and menus
 * - particles.js: Visual effects
 * - network.js: Multiplayer
 * - commentary.js: AI commentary
 */

import { gameState, keys, saveProgress } from './state.js';
import { gameConfig } from './config.js';
import { scene, camera, renderer } from './core.js';
import { cars } from './constants.js';
import { createPlayerCar, rebuildPlayerCar, updatePlayer, playerCar, setUICallbacks, createOtherPlayerCar, updateOtherPlayerCar, removeOtherPlayerCar } from './player.js';
import { spawnPoliceCar, updatePoliceAI, updateProjectiles, firePlayerProjectile, syncPoliceFromNetwork, getPoliceStateForNetwork, resetPoliceNetworkIds, createPoliceCar } from './police.js';
import { createGround, createTrees, createBuildings, updateBuildingChunks, updateCollectibles, cleanupSmallDebris, createSky, createDistantCityscape, createHotdogStands, updateEndlessWorld } from './world.js';
import { updateHUD, updateHealthUI, DOM, goToShop, showGameOver, setStartGameCallback, triggerDamageEffect, setMultiplayerShopCallback } from './ui.js';
import { updateSpeedEffects, updateSparks, updateTireMarks } from './particles.js';
import * as Network from './network.js';
import { updateCommentary, resetCommentary, logEvent, EVENTS } from './commentary.js';
import { initLevelEditor, openLevelEditor } from './levelEditor.js';
import { exposeDevtools } from './devtools.js';
import { initMenu } from './menu.js';
import { resetSheriffState } from './sheriff.js';
import { updateWorldDirector, clearSpawnedObjects } from './worldDirector.js';

// Expose gameState globally for debugging and testing
window.gameState = gameState;
window.cars = cars;

// Expose reinforcement spawning function for Sheriff AI
window.spawnReinforcementUnits = function(count, types) {
    if (!playerCar) return;
    
    console.log(`[Reinforcements] Spawning ${count} units: ${types.join(', ')}`);
    
    types.forEach((type, index) => {
        // Stagger spawns slightly to avoid overlap
        setTimeout(() => {
            const policeCar = createPoliceCar(type);
            
            // Spawn from edges/behind player for dramatic effect
            const angle = (Math.PI * 2 / count) * index + Math.random() * 0.5;
            const distance = 800 + Math.random() * 400; // Spawn further away
            
            policeCar.position.x = playerCar.position.x + Math.sin(angle) * distance;
            policeCar.position.z = playerCar.position.z + Math.cos(angle) * distance;
            
            gameState.policeCars.push(policeCar);
            console.log(`[Reinforcements] Unit ${index + 1}/${count} (${type}) spawned at distance ${Math.round(distance)}`);
        }, index * 200); // 200ms delay between spawns
    });
};


// === Initialization ===
// Attach renderer to gameContainer
document.getElementById('gameContainer').appendChild(renderer.domElement);

// Check if URL path is /start to auto-start the game
const autoStart = window.location.pathname === '/start' || window.location.pathname === '/start/';

// Check if URL path is /editor to auto-open level editor
const autoEditor = window.location.pathname === '/editor' || window.location.pathname === '/editor/';

// === DOM Elements - Multiplayer Lobby ===
const otherPlayersHUD = document.getElementById('otherPlayersHUD');

// Player colors for multiplayer
const playerColors = [0xff0000, 0x0066ff, 0x00ff00, 0xffaa00];

function stopGame() {
    // Stop the game
    gameState.arrested = true;
    
    // Cleanup multiplayer if active
    if (gameState.isMultiplayer) {
         Network.disconnect();
         gameState.isMultiplayer = false;
    }
    
    // Remove police cars
    gameState.policeCars.forEach(car => scene.remove(car));
    gameState.policeCars = [];
    
    // Remove collectibles
    gameState.collectibles.forEach(coin => scene.remove(coin));
    gameState.collectibles = [];
    
    // Remove projectiles
    gameState.projectiles.forEach(proj => scene.remove(proj));
    gameState.projectiles = [];
}

// Initialize Menu Logic
initMenu({ 
    startGame, 
    cleanupGame: stopGame 
});


// Network callbacks - unified join (no more host vs join distinction)
Network.setOnJoined((roomCode, playerId, players, isHost) => {
    gameState.isMultiplayer = true;
    gameState.isHost = isHost;
    gameState.playerId = playerId;
    gameState.roomCode = roomCode;
    
    const myIndex = players.findIndex(p => p.id === playerId);
    gameState.playerColor = playerColors[myIndex] || playerColors[0];
    
    showLobbyRoom(roomCode, players, isHost);
    console.log(`Joined as ${isHost ? 'HOST' : 'player'}`);
});

// Handle host change (when host leaves)
Network.setOnHostChanged((newHostId, newHostName) => {
    const wasHost = gameState.isHost;
    gameState.isHost = (newHostId === gameState.playerId);
    
    if (gameState.isHost && !wasHost) {
        // We became the host! Show host controls
        const hostControls = document.getElementById('hostControls');
        const waitingMessage = document.getElementById('waitingMessage');
        if (hostControls) hostControls.style.display = 'block';
        if (waitingMessage) waitingMessage.style.display = 'none';
        
        // Show notification
        lobbyError.textContent = `Du er nu værten!`;
        lobbyError.style.color = '#00ff00';
        setTimeout(() => { lobbyError.textContent = ''; }, 3000);
    }
    
    console.log(`Host changed to: ${newHostName} (isHost: ${gameState.isHost})`);
});

Network.setOnPlayerJoined((player, players, dropIn) => {
    updatePlayersList(players);
    
    // If someone drops in mid-game, create their car
    if (dropIn && gameState.isMultiplayer && !gameState.arrested) {
        const mesh = createOtherPlayerCar(player.color || 0x0066ff, player.car || 'standard');
        // Spawn near origin for drop-in players
        mesh.position.set(0, 0, 100);
        gameState.otherPlayers.set(player.id, {
            name: player.name,
            car: player.car,
            color: player.color,
            mesh: mesh,
            state: null
        });
        console.log(`${player.name} dropped into the game!`);
    }
});

Network.setOnPlayerLeft((playerId, playerName) => {
    removeOtherPlayer(playerId);
    console.log(`${playerName || 'Player'} left the game`);
});

Network.setOnGameStart((players, config, dropIn) => {
    multiplayerLobby.style.display = 'none';
    
    // Find my spawn position
    const myData = players.find(p => p.id === gameState.playerId);
    
    // Setup other players
    players.forEach(p => {
        if (p.id !== gameState.playerId) {
            const mesh = createOtherPlayerCar(p.color || 0x0066ff, p.car || 'standard');
            mesh.position.set(p.spawnPos.x, 0, p.spawnPos.z);
            gameState.otherPlayers.set(p.id, {
                name: p.name,
                car: p.car,
                color: p.color,
                mesh: mesh,
                state: null
            });
        }
    });
    
    // Start game with my spawn position
    startMultiplayerGame(myData.spawnPos);
});

Network.setOnPlayerState((playerId, state) => {
    const player = gameState.otherPlayers.get(playerId);
    if (player && player.mesh) {
        updateOtherPlayerCar(player.mesh, state);
        player.state = state;
    }
});

Network.setOnPoliceState((police) => {
    if (!gameState.isHost) {
        syncPoliceFromNetwork(police);
    }
});

Network.setOnGameEvent((playerId, event, data) => {
    if (event === 'arrested') {
        const player = gameState.otherPlayers.get(playerId);
        if (player) {
            console.log(`${player.name} blev arresteret!`);
        }
    } else if (event === 'respawned') {
        // Another player respawned, possibly with a new car
        const player = gameState.otherPlayers.get(playerId);
        if (player && data) {
            console.log(`Player ${playerId} respawned with car: ${data.car}`);
            
            // If they changed their car, rebuild their mesh
            if (data.car && data.car !== player.car) {
                player.car = data.car;
                
                // Remove old mesh and create new one with the new car
                if (player.mesh) {
                    scene.remove(player.mesh);
                }
                player.mesh = createOtherPlayerCar(player.color || 0x0066ff, data.car);
            }
            
            // Update position
            if (player.mesh && data.spawnPos) {
                player.mesh.position.set(data.spawnPos.x, 0.5, data.spawnPos.z);
            }
        }
    }
});

Network.setOnError((message) => {
    lobbyError.textContent = message;
});

// Handle respawn confirmation from server
Network.setOnRespawned((spawnPos, car, resetHeat) => {
    console.log('Respawned at:', spawnPos, 'with car:', car, 'resetHeat:', resetHeat);
    
    // Hide game over screen and shop
    DOM.gameOver.style.display = 'none';
    DOM.shop.style.display = 'none';
    
    // Update car selection if a new car was specified
    if (car && car !== gameState.selectedCar) {
        gameState.selectedCar = car;
        // Rebuild car with new selection
        rebuildPlayerCar(gameState.playerColor);
    }
    
    // Reset player state
    gameState.arrested = false;
    
    // Set health based on selected car
    const carData = cars[gameState.selectedCar];
    gameState.health = carData?.health || 100;
    gameState.arrestCountdown = 0;
    gameState.arrestStartTime = 0;
    
    // If player is alone, reset heat and police
    if (resetHeat) {
        console.log('[RESPAWN] Solo player - resetting heat level and police');
        gameState.heatLevel = 1;
        gameState.startTime = Date.now();
        gameState.policeKilled = 0;
        
        // Clear existing police and spawn fresh
        gameState.policeCars.forEach(car => scene.remove(car));
        gameState.policeCars = [];
        
        // If host, spawn first police
        if (gameState.isHost) {
            spawnPoliceCar();
        }
    }
    
    // Reposition player car
    if (playerCar) {
        playerCar.position.set(spawnPos.x, 0.5, spawnPos.z);
        playerCar.rotation.y = 0;
        gameState.speed = 0;
        
        // Update camera
        if (camera) {
            camera.position.set(spawnPos.x, 50, spawnPos.z + 80);
            camera.lookAt(playerCar.position);
        }
    }
    
    updateHealthUI();
});

function showLobbyRoom(roomCode, players, isHost) {
    // Hide all other sections - only show lobby room
    const serverDiscovery = document.getElementById('serverDiscovery');
    if (serverDiscovery) serverDiscovery.style.display = 'none';
    lobbyConnect.style.display = 'none';
    lobbyRoom.style.display = 'block';
    
    // Re-enable join button for future use
    if (joinGameBtn) joinGameBtn.disabled = false;
    lobbyError.textContent = '';
    
    if (isHost) {
        hostControls.style.display = 'block';
        waitingMessage.style.display = 'none';
    } else {
        hostControls.style.display = 'none';
        waitingMessage.style.display = 'block';
    }
    
    updatePlayersList(players);
}

function updatePlayersList(players) {
    playerCount.textContent = players.length;
    playersList.innerHTML = '';
    
    players.forEach((p, idx) => {
        const div = document.createElement('div');
        div.className = 'player-item';
        div.innerHTML = `
            <div class="player-color" style="background: #${(p.color || playerColors[idx]).toString(16).padStart(6, '0')}"></div>
            <span class="player-name">${p.name}</span>
            ${p.isHost ? '<span class="player-host">HOST</span>' : ''}
        `;
        playersList.appendChild(div);
    });
}

function removeOtherPlayer(playerId) {
    const player = gameState.otherPlayers.get(playerId);
    if (player && player.mesh) {
        removeOtherPlayerCar(player.mesh);
    }
    gameState.otherPlayers.delete(playerId);
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
    // Only prevent space scrolling during active gameplay, not in menus
    if (e.key === ' ' && !gameState.arrested && gameState.startTime > 0) {
        e.preventDefault();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Reset all keys when window loses focus (prevents "stuck" keys)
window.addEventListener('blur', () => {
    Object.keys(keys).forEach(key => { keys[key] = false; });
});

// Also reset keys when tab becomes hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        Object.keys(keys).forEach(key => { keys[key] = false; });
    }
});

// Create World
createSky();
createDistantCityscape();
createGround();
createBuildings();
createHotdogStands();
createTrees();
// Spawn the correct starter model immediately
const starterCar = cars[gameState.selectedCar] || cars.standard;
createPlayerCar(starterCar.color, starterCar.type || gameState.selectedCar);

// Initialize Level Editor (Press F2 to open)
initLevelEditor();

export function startGame() {
    DOM.shop.style.display = 'none';
    DOM.gameOver.style.display = 'none';

    resetRunState();
}

// Multiplayer game start (with spawn position)
export function startMultiplayerGame(spawnPos) {
    DOM.shop.style.display = 'none';
    DOM.gameOver.style.display = 'none';

    resetRunState({ multiplayerColor: gameState.playerColor });
    
    // Move to spawn position
    if (playerCar && spawnPos) {
        playerCar.position.set(spawnPos.x, 0, spawnPos.z);
    }
    
    // Only host spawns police - reset IDs first
    if (gameState.isHost) {
        resetPoliceNetworkIds();
        spawnPoliceCar();
        console.log(`[MULTIPLAYER] Host started game. isHost: ${gameState.isHost}, isMultiplayer: ${gameState.isMultiplayer}`);
    } else {
        console.log(`[MULTIPLAYER] Client started game. isHost: ${gameState.isHost}, isMultiplayer: ${gameState.isMultiplayer}`);
    }
}

/**
 * Apply the currently selected car's stats into `gameState`.
 * This is the canonical place for mapping `cars[selectedCar]` → state fields.
 */
function applySelectedCarStats() {
    const carData = cars[gameState.selectedCar];
    gameState.health = carData.health || 100;
    gameState.maxSpeed = carData.maxSpeed;
    gameState.acceleration = carData.acceleration;
    gameState.handling = carData.handling || 0.05;
    console.log(`[START] Car: ${gameState.selectedCar}, maxSpeed: ${gameState.maxSpeed} (${Math.round(gameState.maxSpeed * 3.6)} km/h)`);
}

function clearSceneList(list) {
    list.forEach(obj => scene.remove(obj));
    list.length = 0;
}

/**
 * Reset state for a new run (solo or multiplayer).
 * Keep this small and deterministic because tests depend on it.
 */
function resetRunState(opts = {}) {
    // Bank accumulated money to totalMoney before resetting run
    if (gameState.money > 0) {
        gameState.totalMoney = (gameState.totalMoney || 0) + gameState.money;
        // Save the updated total immediately
        saveProgress();
    }

    gameState.speed = 0;
    gameState.money = 0;
    gameState.heatLevel = 1;

    applySelectedCarStats();

    updateHealthUI();
    gameState.arrested = false;
    gameState.hasStartedMoving = false;
    gameState.startTime = Date.now();
    gameState.timerStartTime = 0;
    gameState.lastMoneyCheckTime = Date.now();
    gameState.lastPoliceSpawnTime = Date.now();

    clearSceneList(gameState.policeCars);
    clearSceneList(gameState.collectibles);
    clearSceneList(gameState.projectiles);

    gameState.slowEffect = 0;
    gameState.slowDuration = 0;

    // Police engagement gating (no cops until player earns money or vandalizes)
    gameState.policeEngaged = false;
    gameState.destructionCount = 0;
    gameState.hasHitObject = false;

    gameState.arrestCountdown = 0;
    gameState.arrestStartTime = 0;
    gameState.policeKilled = 0;

    // Reset Sheriff state for new chase
    resetSheriffState();

    clearSceneList(gameState.sparks);
    gameState.currentFOV = gameState.baseFOV;
    camera.fov = gameState.baseFOV;
    camera.updateProjectionMatrix();

    // Rebuild vehicle model
    if (opts.multiplayerColor) {
        rebuildPlayerCar(opts.multiplayerColor);
    } else {
        rebuildPlayerCar();
    }

    resetCommentary();
    clearSpawnedObjects(); // Clear world director objects
}

// Single stable entrypoint for tests/debug/LLM tooling
// Pass game context for collision testing scenarios
exposeDevtools({ 
    startGame, 
    startMultiplayerGame,
    renderer,       // Expose renderer for perf metrics
    scene,          // Expose scene for object counting
    createPoliceCar, // Expose for dev test scenarios
    get playerCar() { return playerCar; }, // Dynamic getter for player car
    rebuildPlayerCar // Expose for rebuilding player car in tests
});

let lastTime = performance.now();

/**
 * MAIN GAME LOOP - animate()
 * 
 * This is the heart of the game, called ~60 times per second.
 * 
 * Execution Order:
 * 1. Calculate delta time (frame-rate independence)
 * 2. Update player physics and input
 * 3. Spawn police based on intervals (host only)
 * 4. Update heat level over time
 * 5. Update world chunks (loading/unloading)
 * 6. Update police AI
 * 7. Update collectibles (coins)
 * 8. Update projectiles (Tank shots)
 * 9. Update visual effects (particles, sparks, tire marks)
 * 10. Update HUD
 * 11. Broadcast state to multiplayer clients (host only)
 * 12. Update commentary (if enabled)
 * 13. Render Three.js scene
 * 14. Request next animation frame
 * 
 * Delta Time:
 * - Normalized to 60 FPS (1.0 = one frame at 60fps)
 * - Capped at 2 frames to prevent physics explosions
 * - Used in all physics calculations for consistency
 */
function animate() {
    requestAnimationFrame(animate);
    
    const now = performance.now();
    // Delta as ratio: 1.0 = one frame at 60fps, capped at 2 frames
    const delta = Math.min((now - lastTime) / 16.67, 2); 
    lastTime = now;
    window.__lastDelta = delta; // Expose for debugging

    // Only update game logic if game has started (startTime set)
    const gameStarted = gameState.startTime > 0;
    
    if (!gameState.arrested && gameStarted) {
        // Engage police once player has earned money OR hit something non-ground OR destroyed something
        if (!gameState.policeEngaged && ((gameState.money || 0) > 0 || (gameState.hasHitObject === true) || (gameState.destructionCount || 0) > 0)) {
            gameState.policeEngaged = true;
            if (!gameState.timerStartTime) {
                gameState.timerStartTime = Date.now();
            }

            // Spawn first police immediately on engagement (host only in multiplayer)
            if (!gameState.isMultiplayer || gameState.isHost) {
                spawnPoliceCar();
                gameState.lastPoliceSpawnTime = Date.now();
            }
        }

        // Player Physics
        updatePlayer(delta, now);
        
        // Send player state to network in multiplayer
        if (gameState.isMultiplayer && playerCar) {
            Network.sendPlayerState({
                x: playerCar.position.x,
                y: playerCar.position.y,
                z: playerCar.position.z,
                rotY: playerCar.rotation.y,
                speed: gameState.speed,
                health: gameState.health,
                arrested: gameState.arrested
            });
        }

        // Spawn Police based on config interval (host only in multiplayer)
        const elapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
        const shouldSpawn = gameState.policeEngaged && (!gameState.isMultiplayer || gameState.isHost) && 
            elapsedSeconds > 0 && 
            elapsedSeconds % gameConfig.policeSpawnInterval === 0 && 
            (Date.now() - gameState.lastPoliceSpawnTime) > 500;
            
        if (shouldSpawn) {
            if (gameState.isMultiplayer) {
                console.log(`[SPAWN] Triggering police spawn at ${elapsedSeconds}s (isHost: ${gameState.isHost}, interval: ${gameConfig.policeSpawnInterval})`);
            }
            spawnPoliceCar();
            gameState.lastPoliceSpawnTime = Date.now();
        }
        
        // Increase heat level every configured interval (default: 60 seconds = 1 minute)
        const targetHeatLevel = Math.min(
            gameConfig.maxHeatLevel,
            1 + Math.floor(elapsedSeconds / gameConfig.heatIncreaseInterval)
        );
        if (targetHeatLevel > gameState.heatLevel) {
            gameState.heatLevel = targetHeatLevel;
        }

        // Chunks
        updateBuildingChunks(delta);
        cleanupSmallDebris();
        
        // Endless World - generate new regions as player moves
        if (playerCar) {
            updateEndlessWorld(playerCar.position);
            
            // World Director - LLM decides what to spawn on the road
            updateWorldDirector(delta);
        }

        // Collectibles & Heat
        updateCollectibles();

        // Projectiles
        updateProjectiles(delta);
        
        // Police AI (host runs AI, clients receive sync)
        const policeDistance = updatePoliceAI(delta);
        
        // Host broadcasts police state
        if (gameState.isMultiplayer && gameState.isHost) {
            const policeData = getPoliceStateForNetwork();
            Network.sendPoliceState(policeData);
        }
        
        // HUD
        updateHUD(policeDistance);
        
        // Update other players HUD in multiplayer
        if (gameState.isMultiplayer) {
            updateOtherPlayersHUD();
        }
        
        // Update commentary system
        updateCommentary();
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
        // Rotated UP vector (0, 0, 1) aligns screen UP with World +Z (Forward)
        // This ensures Arrow Keys match visual direction (Up arrow = Up on screen)
        camera.up.set(0, 0, 1);
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

// Update HUD showing other players in multiplayer
function updateOtherPlayersHUD() {
    if (!otherPlayersHUD) return;
    
    let html = '';
    gameState.otherPlayers.forEach((player, id) => {
        if (player.state) {
            const color = '#' + (player.color || 0x0066ff).toString(16).padStart(6, '0');
            html += `
                <div class="other-player-card" style="border-color: ${color}">
                    <div class="name" style="color: ${color}">${player.name}</div>
                    <div class="stats">
                        HP: ${Math.round(player.state.health || 100)}% | 
                        ${Math.round(Math.abs(player.state.speed || 0) * 3.6)} km/t
                        ${player.state.arrested ? ' | 🚔 FANGET' : ''}
                    </div>
                </div>
            `;
        }
    });
    otherPlayersHUD.innerHTML = html;
}

// Start
setStartGameCallback(startGame);
setUICallbacks({ triggerDamageEffect, updateHealthUI });

// Auto-start game if /start path is accessed
if (autoStart) {
    startGame();
} else if (autoEditor) {
    // Auto-open level editor if /editor path is accessed
    setTimeout(() => {
        openLevelEditor();
    }, 500);
} else {
    // Show game mode selection on page load
    setTimeout(() => {
        gameModeModal.style.display = 'flex';
    }, 500);
}
animate();
