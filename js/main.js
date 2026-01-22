import { gameState, keys } from './state.js';
import { gameConfig } from './config.js';
import { scene, camera, renderer } from './core.js';
import { cars } from './constants.js';
import { createPlayerCar, rebuildPlayerCar, updatePlayer, playerCar, setUICallbacks, createOtherPlayerCar, updateOtherPlayerCar, removeOtherPlayerCar } from './player.js';
import { spawnPoliceCar, updatePoliceAI, updateProjectiles, firePlayerProjectile, syncPoliceFromNetwork, getPoliceStateForNetwork, resetPoliceNetworkIds } from './police.js';
import { createGround, createTrees, createBuildings, updateBuildingChunks, updateCollectibles, cleanupSmallDebris } from './world.js';
import { updateHUD, updateHealthUI, DOM, goToShop, showGameOver, setStartGameCallback, triggerDamageEffect, setMultiplayerShopCallback } from './ui.js';
import { updateSpeedEffects, updateSparks, updateTireMarks } from './particles.js';
import * as Network from './network.js';

// Initialize - attach renderer to gameContainer
document.getElementById('gameContainer').appendChild(renderer.domElement);

// Check if URL path is /start to auto-start the game
const autoStart = window.location.pathname === '/start' || window.location.pathname === '/start/';

// DOM elements for multiplayer
const multiplayerLobby = document.getElementById('multiplayerLobby');
const lobbyCloseBtn = document.getElementById('lobbyCloseBtn');
const joinGameBtn = document.getElementById('joinGameBtn');
const playerNameInput = document.getElementById('playerNameInput');
const lobbyError = document.getElementById('lobbyError');
const lobbyConnect = document.getElementById('lobbyConnect');
const lobbyRoom = document.getElementById('lobbyRoom');
const displayRoomCode = document.getElementById('displayRoomCode');
const playersList = document.getElementById('playersList');
const playerCount = document.getElementById('playerCount');
const hostControls = document.getElementById('hostControls');
const waitingMessage = document.getElementById('waitingMessage');
const startMultiplayerBtn = document.getElementById('startMultiplayerBtn');
const hostTouchArrest = document.getElementById('hostTouchArrest');
const hostDropInEnabled = document.getElementById('hostDropInEnabled');
const otherPlayersHUD = document.getElementById('otherPlayersHUD');
const gameOverRejoinBtn = document.getElementById('gameOverRejoinBtn');
const gameOverMpShopBtn = document.getElementById('gameOverMpShopBtn');

// Game Mode Modal elements
const gameModeModal = document.getElementById('gameModeModal');
const soloModeBtn = document.getElementById('soloModeBtn');
const multiplayerModeBtn = document.getElementById('multiplayerModeBtn');

// Player colors for multiplayer
const playerColors = [0xff0000, 0x0066ff, 0x00ff00, 0xffaa00];

// UI Event Listeners - Show game mode selection when clicking Play
if (DOM.playBtn) {
    DOM.playBtn.addEventListener('click', () => {
        gameModeModal.style.display = 'flex';
    });
}

// Solo mode - just start the game
if (soloModeBtn) {
    soloModeBtn.addEventListener('click', () => {
        gameModeModal.style.display = 'none';
        startGame();
    });
}

// Shop button from menu
const menuShopBtn = document.getElementById('menuShopBtn');
if (menuShopBtn) {
    menuShopBtn.addEventListener('click', () => {
        gameModeModal.style.display = 'none';
        goToShop(false); // Not multiplayer respawn mode
    });
}

// Multiplayer - simplified: connect and show lobby
if (multiplayerModeBtn) {
    multiplayerModeBtn.addEventListener('click', async () => {
        gameModeModal.style.display = 'none';
        multiplayerLobby.style.display = 'flex';
        lobbyError.textContent = '';
        
        // Show connecting state
        const joinBtn = document.getElementById('joinGameBtn');
        if (joinBtn) joinBtn.disabled = true;
        lobbyError.textContent = 'Forbinder til server...';
        lobbyError.style.color = '#888';
        
        try {
            await Network.connect();
            lobbyError.textContent = '';
            if (joinBtn) joinBtn.disabled = false;
        } catch (e) {
            lobbyError.textContent = 'Kunne ikke forbinde til server. Kører serveren?';
            lobbyError.style.color = '#ff4444';
            if (joinBtn) joinBtn.disabled = false;
        }
    });
}

if (DOM.gameOverShopBtn) {
    DOM.gameOverShopBtn.addEventListener('click', () => {
        // If in multiplayer, disconnect first
        if (gameState.isMultiplayer) {
            Network.disconnect();
            gameState.isMultiplayer = false;
        }
        goToShop();
        // Show game mode selection after going to shop
        gameModeModal.style.display = 'flex';
    });
}

// Rejoin button for multiplayer
if (gameOverRejoinBtn) {
    gameOverRejoinBtn.addEventListener('click', () => {
        Network.requestRespawn();
    });
}

// Multiplayer shop button - buy car and drop back in
if (gameOverMpShopBtn) {
    gameOverMpShopBtn.addEventListener('click', () => {
        DOM.gameOver.style.display = 'none';
        goToShop(true); // true = multiplayer respawn mode
    });
}

// Set up multiplayer shop callback - when a car is selected in MP shop mode
setMultiplayerShopCallback((carKey) => {
    console.log('Multiplayer shop: selected car', carKey);
    
    // Hide shop
    DOM.shop.style.display = 'none';
    
    // Request respawn with new car
    Network.requestRespawnWithCar(carKey);
});

// Close game mode modal when clicking outside
if (gameModeModal) {
    gameModeModal.addEventListener('click', (e) => {
        if (e.target === gameModeModal) {
            gameModeModal.style.display = 'none';
        }
    });
}

// Escape key - return to menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // If game mode modal is open, close it
        if (gameModeModal && gameModeModal.style.display === 'flex') {
            gameModeModal.style.display = 'none';
            return;
        }
        
        // If multiplayer lobby is open, close it
        if (multiplayerLobby && multiplayerLobby.style.display === 'flex') {
            multiplayerLobby.style.display = 'none';
            Network.disconnect();
            return;
        }
        
        // If shop is open, close it and show menu
        if (DOM.shop && DOM.shop.style.display === 'flex') {
            DOM.shop.style.display = 'none';
            gameModeModal.style.display = 'flex';
            return;
        }
        
        // If game over screen is showing, go to menu
        if (DOM.gameOver && DOM.gameOver.style.display === 'block') {
            DOM.gameOver.style.display = 'none';
            if (gameState.isMultiplayer) {
                Network.disconnect();
                gameState.isMultiplayer = false;
            }
            gameModeModal.style.display = 'flex';
            return;
        }
        
        // If actively playing, return to menu
        if (!gameState.arrested && gameState.startTime > 0) {
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
            
            // Hide game over and show menu
            DOM.gameOver.style.display = 'none';
            gameModeModal.style.display = 'flex';
        }
    }
});

// Multiplayer UI Listeners
if (lobbyCloseBtn) {
    lobbyCloseBtn.addEventListener('click', () => {
        multiplayerLobby.style.display = 'none';
        Network.disconnect();
    });
}

// Single JOIN button - everyone joins the same way
if (joinGameBtn) {
    joinGameBtn.addEventListener('click', () => {
        const name = playerNameInput.value.trim() || 'Spiller';
        const car = gameState.selectedCar || 'standard';
        Network.joinGame(name, car);
    });
}

if (startMultiplayerBtn) {
    startMultiplayerBtn.addEventListener('click', () => {
        // Get host config settings
        const hostConfig = {
            ...gameConfig,
            touchArrest: hostTouchArrest?.checked || false,
            dropInEnabled: hostDropInEnabled?.checked !== false
        };
        Network.startGame(hostConfig);
    });
}

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
Network.setOnRespawned((spawnPos, car) => {
    console.log('Respawned at:', spawnPos, 'with car:', car);
    
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
    lobbyConnect.style.display = 'none';
    lobbyRoom.style.display = 'block';
    displayRoomCode.textContent = roomCode;
    
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
    
    // Reset stats
    gameState.policeKilled = 0;
    
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

// Multiplayer game start (with spawn position)
export function startMultiplayerGame(spawnPos) {
    DOM.shop.style.display = 'none';
    DOM.gameOver.style.display = 'none';
    gameState.speed = 0;
    gameState.money = 0;
    gameState.heatLevel = 1;
    
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
    gameState.arrestCountdown = 0;
    gameState.arrestStartTime = 0;
    gameState.policeKilled = 0;
    
    gameState.sparks.forEach(s => scene.remove(s));
    gameState.sparks = [];
    gameState.currentFOV = gameState.baseFOV;
    camera.fov = gameState.baseFOV;
    camera.updateProjectionMatrix();
    
    // Rebuild car with multiplayer color
    rebuildPlayerCar(gameState.playerColor);
    
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

let lastTime = performance.now();

function animate() {
    requestAnimationFrame(animate);
    
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 16.67, 2); 
    lastTime = now;

    if (!gameState.arrested) {
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
        const shouldSpawn = (!gameState.isMultiplayer || gameState.isHost) && 
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
} else {
    // Show game mode selection on page load
    setTimeout(() => {
        gameModeModal.style.display = 'flex';
    }, 500);
}
animate();
