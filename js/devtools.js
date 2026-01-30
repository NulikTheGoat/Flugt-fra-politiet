/**
 * DEVTOOLS / AI ENTRYPOINT
 *
 * Goal: provide a single, stable place to inspect and drive the game from tests,
 * debugging, or AI agents.
 *
 * This avoids scattering `window.*` exports across modules.
 * 
 * HIDDEN DEV MODE: Press Ctrl+Shift+D to open collision test panel
 */

import { gameState, keys } from './state.js';
import { cars, GAME_CONFIG } from './constants.js';

// Dev mode state
let devModeEnabled = false;
let devPanel = null;
let testScenarioActive = false;

/**
 * Collision Test Scenarios for physics debugging
 */
const COLLISION_TEST_SCENARIOS = {
    POLICE_BUILDING_HEAD_ON: {
        name: 'Police → Building (Head-on)',
        description: 'Police car crashes into building at full speed',
        setup: (ctx) => {
            const { createPoliceCar, scene, playerCar } = ctx;
            const police = createPoliceCar('standard');
            
            // Position police near a building
            const buildingPos = findNearestBuilding(playerCar.position);
            if (buildingPos) {
                police.position.set(buildingPos.x - 100, 0, buildingPos.z);
                police.rotation.y = Math.atan2(100, 0); // Face the building
                police.userData.testTarget = buildingPos;
                police.userData.testSpeed = 300;
            }
            
            gameState.policeCars.push(police);
            return police;
        }
    },
    PLAYER_BUILDING_SLOW: {
        name: 'Player → Building (Slow)',
        description: 'Player car nudges building at low speed',
        setup: (ctx) => {
            const { playerCar } = ctx;
            const buildingPos = findNearestBuilding(playerCar.position);
            if (buildingPos) {
                playerCar.position.set(buildingPos.x - 50, 0, buildingPos.z);
                playerCar.rotation.y = 0;
                gameState.speed = 20;
            }
            return playerCar;
        }
    },
    PLAYER_BUILDING_FAST: {
        name: 'Player → Building (Fast)',
        description: 'Player car rams building at high speed',
        setup: (ctx) => {
            const { playerCar } = ctx;
            const buildingPos = findNearestBuilding(playerCar.position);
            if (buildingPos) {
                playerCar.position.set(buildingPos.x - 150, 0, buildingPos.z);
                playerCar.rotation.y = 0;
                gameState.speed = 80;
            }
            return playerCar;
        }
    },
    MULTI_POLICE_PILEUP: {
        name: 'Multi-Police Pileup',
        description: '3 police cars crash into same building',
        setup: (ctx) => {
            const { createPoliceCar, playerCar } = ctx;
            const buildingPos = findNearestBuilding(playerCar.position);
            const cars = [];
            
            if (buildingPos) {
                for (let i = 0; i < 3; i++) {
                    const police = createPoliceCar('standard');
                    const angle = (i - 1) * 0.5; // Spread them out
                    police.position.set(
                        buildingPos.x - 120 + Math.sin(angle) * 40,
                        0,
                        buildingPos.z + Math.cos(angle) * 40
                    );
                    police.rotation.y = Math.atan2(
                        buildingPos.x - police.position.x,
                        buildingPos.z - police.position.z
                    );
                    police.userData.testTarget = buildingPos;
                    police.userData.aiDisabled = true; // Drive straight into building
                    police.userData.testSpeed = 250 + i * 30; // 250, 280, 310
                    police.userData.currentSpeed = police.userData.testSpeed;
                    
                    gameState.policeCars.push(police);
                    cars.push(police);
                }
            }
            return cars;
        }
    },
    DEBRIS_CASCADE: {
        name: 'Debris Cascade Test',
        description: 'Fast impact to trigger debris-to-building collisions',
        setup: (ctx) => {
            const { playerCar: oldPlayer } = ctx;
            const buildingPos = findNearestBuilding(oldPlayer.position);
            if (buildingPos) {
                // Position for maximum destruction
                gameState.selectedCar = 'tank'; // Use heavy vehicle
                if (ctx.rebuildPlayerCar) ctx.rebuildPlayerCar();

                const player = ctx.playerCar;
                player.position.set(buildingPos.x - 200, 0, buildingPos.z);
                player.rotation.y = 0;
                gameState.speed = 120; // Very fast
            }
            return ctx.playerCar;
        }
    },
    MONSTER_VS_POLICE: {
        name: 'Monster vs Police (Head-on)',
        description: 'Monster truck rams a police car to test mass/damage balance',
        setup: (ctx) => {
            const { createPoliceCar } = ctx;
            gameState.selectedCar = 'monstertruck';
            if (ctx.rebuildPlayerCar) ctx.rebuildPlayerCar();
            
            // Re-fetch player after rebuild in case it changed
            // Because ctx.playerCar is a getter, it should return the new object
            const player = ctx.playerCar;
            
            gameState.speed = 90; // ~90 km/h
            if (player) {
                player.position.set(0, 0, -120);
                player.rotation.y = 0;
            } else {
                console.error("Player car not found after rebuild!");
            }
            
            const police = createPoliceCar('standard');
            police.position.set(0, 0, 40);
            police.rotation.y = Math.PI; // Face player
            police.userData.currentSpeed = 40; // Light roll forward
            police.userData.aiDisabled = true; // Dumb mode
            police.userData.testSpeed = 40;
            
            gameState.policeCars.push(police);
            return { playerCar: player, police };
        }
    },
    TANK_VS_SWAT: {
        name: 'Tank vs SWAT (Offset)',
        description: 'Tank clips a SWAT car at speed to check partial collisions',
        setup: (ctx) => {
            const { createPoliceCar, scene } = ctx;
            console.log('[DevTools] Running TANK_VS_SWAT setup');
            gameState.selectedCar = 'tank';
            
            // Set tank stats BEFORE rebuild
            const tankData = cars['tank'];
            gameState.maxSpeed = tankData.maxSpeed;
            gameState.acceleration = tankData.acceleration;
            gameState.handling = tankData.handling;
            gameState.grip = tankData.grip || 0.7;
            gameState.health = tankData.health || 260;
            
            if (ctx.rebuildPlayerCar) ctx.rebuildPlayerCar();

            const player = ctx.playerCar;
            gameState.speed = 70;
            
            if (player) {
                // Spawn closer to origin and directly in front of SWAT for clear collision path
                player.position.set(0, 0, -80);
                player.rotation.y = 0;
                
                // Force physics state
                gameState.speed = 70;
                gameState.velocityX = 0;
                gameState.velocityZ = 70;
                
                console.log('[DevTools] Set initial pos/phys for UUID:', player.uuid);
                
                // FORCE ENFORCEMENT LOOP to handle async replacements
                let attempts = 0;
                const forceInterval = setInterval(() => {
                     attempts++;
                     const freshPlayer = window.__game?.playerCar;
                     if (freshPlayer) {
                         // Force for 5 ticks (250ms)
                         if (attempts < 5) {
                             // Only enforce for first 2 ticks, then let physics take over
                             if (attempts <= 2) {
                                 freshPlayer.position.set(0, 0, -80);
                             }
                             freshPlayer.rotation.y = 0;
                             gameState.speed = 70;
                             gameState.velocityX = 0;
                             gameState.velocityZ = 70;
                             console.log(`[DevTools] Enforcing pos/phys for UUID: ${freshPlayer.uuid} (Attempt ${attempts})`);
                         } else {
                             clearInterval(forceInterval);
                             console.log('[DevTools] Enforcement complete');
                         }
                     }
                }, 50);
            } else {
                 console.error("Player car not found after rebuild!");
            }

            const police = createPoliceCar('swat');
            // SWAT spawns far ahead on +Z, facing back toward tank (-Z direction)
            // rotation.y = Math.PI means facing -Z (toward the tank at z=-80)
            police.position.set(0, 0, 800); // 880 units away from tank
            police.rotation.y = Math.PI; // Face -Z (toward tank)
            police.userData.currentSpeed = 40; // Drive toward tank
            police.userData.aiDisabled = true; 
            police.userData.testSpeed = 40;

            if (scene) {
                scene.add(police);
            } else {
                console.warn('[DevTools] Scene not available in context, police not added to scene!');
            }

            gameState.policeCars = []; // Ensure clear state
            gameState.policeCars.push(police);
            console.log('[DevTools] Police added. Total police:', gameState.policeCars.length);

            // Force start driving - CRITICAL: must set startTime for game loop to process player physics
            gameState.startTime = Date.now();
            keys['w'] = true;
            console.log('[DevTools] Force-started game time and input');

            return { playerCar: player, police };
        }
    },
    NPC_HEADON: {
        name: 'NPC ↔ NPC Head-on',
        description: 'Two police cars collide to validate NPC vs NPC mass/damage',
        setup: (ctx) => {
            const { createPoliceCar } = ctx;
            const p1 = createPoliceCar('standard');
            const p2 = createPoliceCar('military');
            p1.position.set(-40, 0, 0);
            p2.position.set(40, 0, 0);
            p1.rotation.y = Math.PI / 2;   // Face +X
            p2.rotation.y = -Math.PI / 2;  // Face -X
            
            p1.userData.currentSpeed = 80;
            p1.userData.aiDisabled = true;
            p1.userData.testSpeed = 80;

            p2.userData.currentSpeed = 70;
            p2.userData.aiDisabled = true;
            p2.userData.testSpeed = 70;

            gameState.policeCars.push(p1, p2);
            return { p1, p2 };
        }
    }
};

/**
 * Find nearest building chunk to a position
 */
function findNearestBuilding(pos) {
    if (!gameState.chunkGrid) return null;
    
    const gridSize = gameState.chunkGridSize || 200;
    const px = Math.floor(pos.x / gridSize);
    const pz = Math.floor(pos.z / gridSize);
    
    let nearest = null;
    let nearestDist = Infinity;
    
    for (let x = px - 2; x <= px + 2; x++) {
        for (let z = pz - 2; z <= pz + 2; z++) {
            const key = `${x},${z}`;
            const chunks = gameState.chunkGrid[key];
            if (!chunks) continue;
            
            for (const chunk of chunks) {
                if (chunk.userData.isHit || chunk.userData.isTree) continue;
                
                const dx = chunk.position.x - pos.x;
                const dz = chunk.position.z - pos.z;
                const dist = Math.sqrt(dx * dx + dz * dz);
                
                if (dist < nearestDist && dist > 60) { // At least 60 units away
                    nearestDist = dist;
                    nearest = { x: chunk.position.x, z: chunk.position.z };
                }
            }
        }
    }
    
    return nearest;
}

/**
 * Create the developer panel UI
 */
function createDevPanel() {
    if (devPanel) return devPanel;
    
    devPanel = document.createElement('div');
    devPanel.id = 'devToolsPanel';
    devPanel.innerHTML = `
        <style>
            #devToolsPanel {
                position: fixed;
                top: 10px;
                right: 10px;
                width: 320px;
                max-height: 90vh;
                overflow-y: auto;
                background: rgba(0, 0, 0, 0.9);
                border: 2px solid #00ff00;
                border-radius: 8px;
                padding: 12px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                color: #00ff00;
                z-index: 99999;
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            }
            #devToolsPanel h3 {
                margin: 0 0 10px 0;
                padding-bottom: 8px;
                border-bottom: 1px solid #00ff00;
                font-size: 14px;
            }
            #devToolsPanel .section {
                margin-bottom: 12px;
                padding: 8px;
                background: rgba(0, 255, 0, 0.1);
                border-radius: 4px;
            }
            #devToolsPanel .section-title {
                font-weight: bold;
                margin-bottom: 6px;
                color: #ffff00;
            }
            #devToolsPanel button {
                display: block;
                width: 100%;
                margin: 4px 0;
                padding: 6px 8px;
                background: #003300;
                border: 1px solid #00ff00;
                color: #00ff00;
                cursor: pointer;
                font-family: inherit;
                font-size: 11px;
                text-align: left;
                border-radius: 3px;
            }
            #devToolsPanel button:hover {
                background: #005500;
            }
            #devToolsPanel button.active {
                background: #007700;
                border-color: #ffff00;
            }
            #devToolsPanel .stat-row {
                display: flex;
                justify-content: space-between;
                padding: 2px 0;
            }
            #devToolsPanel .stat-value {
                color: #ffffff;
            }
            #devToolsPanel .close-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                background: #550000;
                border-color: #ff0000;
                color: #ff0000;
                width: auto;
                padding: 2px 8px;
            }
            #devToolsPanel .config-input {
                width: 60px;
                background: #001100;
                border: 1px solid #00ff00;
                color: #00ff00;
                padding: 2px 4px;
                font-family: inherit;
            }
        </style>
        <button class="close-btn" onclick="window.__game.toggleDevPanel()">✕</button>
        <h3>🔧 DEV MODE - Collision Physics</h3>
        
        <div class="section">
            <div class="section-title">📊 Live Stats</div>
            <div id="devStats">
                <div class="stat-row"><span>Player Health:</span><span class="stat-value" id="devStatHealth">-</span></div>
                <div class="stat-row"><span>Player Speed:</span><span class="stat-value" id="devStatSpeed">-</span></div>
                <div class="stat-row"><span>Active Chunks:</span><span class="stat-value" id="devStatChunks">-</span></div>
                <div class="stat-row"><span>Police Cars:</span><span class="stat-value" id="devStatPolice">-</span></div>
                <div class="stat-row"><span>Fallen Debris:</span><span class="stat-value" id="devStatDebris">-</span></div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">⚙️ Config (GAME_CONFIG)</div>
            <div class="stat-row">
                <span>Police Bldg Dmg:</span>
                <input type="number" class="config-input" id="cfgPoliceBldgDmg" value="${GAME_CONFIG.POLICE_BUILDING_COLLISION_DAMAGE}">
            </div>
            <div class="stat-row">
                <span>Player Bldg Base:</span>
                <input type="number" class="config-input" id="cfgPlayerBldgBase" value="${GAME_CONFIG.PLAYER_BUILDING_COLLISION_DAMAGE_BASE}">
            </div>
            <div class="stat-row">
                <span>Speed Mult:</span>
                <input type="number" class="config-input" id="cfgSpeedMult" value="${GAME_CONFIG.PLAYER_BUILDING_COLLISION_DAMAGE_SPEED_MULT}" step="0.01">
            </div>
            <button onclick="window.__game.applyConfigChanges()">Apply Changes</button>
        </div>
        
        <div class="section">
            <div class="section-title">🧪 Test Scenarios</div>
            <div id="devScenarios"></div>
        </div>
        
        <div class="section">
            <div class="section-title">🛠️ Quick Actions</div>
            <button onclick="window.__game.spawnTestPolice()">Spawn Police Near Building</button>
            <button onclick="window.__game.healPlayer()">Heal Player (Full)</button>
            <button onclick="window.__game.teleportToBuilding()">Teleport to Building</button>
            <button onclick="window.__game.toggleSlowMo()">Toggle Slow-Mo (0.25x)</button>
            <button onclick="window.__game.clearAllDebris()">Clear All Debris</button>
        </div>
        
        <div class="section">
            <div class="section-title">📝 Collision Log</div>
            <div id="devCollisionLog" style="max-height: 100px; overflow-y: auto; font-size: 10px;"></div>
        </div>
    `;
    
    document.body.appendChild(devPanel);
    
    // Populate scenarios
    const scenariosDiv = devPanel.querySelector('#devScenarios');
    Object.entries(COLLISION_TEST_SCENARIOS).forEach(([key, scenario]) => {
        const btn = document.createElement('button');
        btn.textContent = scenario.name;
        btn.title = scenario.description;
        btn.onclick = () => runTestScenario(key);
        scenariosDiv.appendChild(btn);
    });
    
    // Start stats update loop
    startStatsLoop();
    
    return devPanel;
}

/**
 * Update live stats display
 */
function startStatsLoop() {
    setInterval(() => {
        if (!devPanel || devPanel.style.display === 'none') return;
        
        const health = document.getElementById('devStatHealth');
        const speed = document.getElementById('devStatSpeed');
        const chunks = document.getElementById('devStatChunks');
        const police = document.getElementById('devStatPolice');
        const debris = document.getElementById('devStatDebris');
        
        if (health) health.textContent = `${Math.round(gameState.health || 0)} HP`;
        if (speed) speed.textContent = `${Math.round(Math.abs(gameState.speed || 0) * 3.6)} km/h`;
        if (chunks) chunks.textContent = gameState.activeChunks?.length || 0;
        if (police) police.textContent = `${gameState.policeCars?.filter(c => !c.userData.dead).length || 0} alive`;
        if (debris) debris.textContent = gameState.fallenDebris?.length || 0;
    }, 100);
}

/**
 * Log collision events for debugging
 */
function logCollision(type, details) {
    if (!devPanel) return;
    
    const log = document.getElementById('devCollisionLog');
    if (!log) return;
    
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.textContent = `[${time}] ${type}: ${details}`;
    entry.style.borderBottom = '1px solid #333';
    entry.style.padding = '2px 0';
    
    log.insertBefore(entry, log.firstChild);
    
    // Keep only last 20 entries
    while (log.children.length > 20) {
        log.removeChild(log.lastChild);
    }
}

/**
 * Run a test scenario
 */
function runTestScenario(scenarioKey) {
    const scenario = COLLISION_TEST_SCENARIOS[scenarioKey];
    if (!scenario) return;
    
    // Always use the latest context from the window object
    const ctx = window.__game?.context || {};
    
    // In case the context object itself is stale but properties are getters, it's fine.
    // But let's verify if we have a valid context.
    
    console.log(`[DevTools] Running scenario: ${scenario.name}`);
    logCollision('SCENARIO', scenario.name);
    
    testScenarioActive = true;
    scenario.setup(ctx);
}

// Slow-mo state
let slowMoEnabled = false;
let originalTimeScale = 1;

/**
 * Expose stable hooks on `window.__game`.
 * Keep this object small and predictable.
 *
 * @param {Record<string, any>} extra
 */
export function exposeDevtools(extra = {}) {
    window.__game = {
        gameState,
        cars,
        GAME_CONFIG,
        context: extra, // Store context for scenarios
        
        // Dev panel toggle
        toggleDevPanel: () => {
            if (!devPanel) {
                createDevPanel();
                // Ensure explicit initial state
                devPanel.style.display = 'block';
                devModeEnabled = true;
                return;
            }
            
            // Toggle
            const isHidden = devPanel.style.display === 'none';
            devPanel.style.display = isHidden ? 'block' : 'none';
            devModeEnabled = isHidden;
        },
        
        // Config changes
        applyConfigChanges: () => {
            const policeDmg = document.getElementById('cfgPoliceBldgDmg');
            const playerBase = document.getElementById('cfgPlayerBldgBase');
            const speedMult = document.getElementById('cfgSpeedMult');
            
            if (policeDmg) GAME_CONFIG.POLICE_BUILDING_COLLISION_DAMAGE = parseFloat(policeDmg.value);
            if (playerBase) GAME_CONFIG.PLAYER_BUILDING_COLLISION_DAMAGE_BASE = parseFloat(playerBase.value);
            if (speedMult) GAME_CONFIG.PLAYER_BUILDING_COLLISION_DAMAGE_SPEED_MULT = parseFloat(speedMult.value);
            
            console.log('[DevTools] Config updated:', GAME_CONFIG);
            logCollision('CONFIG', 'Values updated');
        },
        
        // Quick actions
        spawnTestPolice: () => {
            const ctx = window.__game?.context;
            if (!ctx?.createPoliceCar || !ctx?.playerCar) {
                console.warn('[DevTools] Context not ready');
                return;
            }
            
            const buildingPos = findNearestBuilding(ctx.playerCar.position);
            if (buildingPos) {
                const police = ctx.createPoliceCar('standard');
                police.position.set(buildingPos.x - 80, 0, buildingPos.z);
                police.rotation.y = 0;
                gameState.policeCars.push(police);
                logCollision('SPAWN', `Police at (${Math.round(buildingPos.x)}, ${Math.round(buildingPos.z)})`);
            }
        },
        
        healPlayer: () => {
            const maxHealth = cars[gameState.selectedCar]?.health || 100;
            gameState.health = maxHealth;
            logCollision('HEAL', `Player healed to ${maxHealth} HP`);
        },
        
        teleportToBuilding: () => {
            const ctx = window.__game?.context;
            if (!ctx?.playerCar) return;
            
            const buildingPos = findNearestBuilding(ctx.playerCar.position);
            if (buildingPos) {
                ctx.playerCar.position.set(buildingPos.x - 60, 0, buildingPos.z);
                ctx.playerCar.rotation.y = 0;
                gameState.speed = 50;
                logCollision('TELEPORT', `To building at (${Math.round(buildingPos.x)}, ${Math.round(buildingPos.z)})`);
            }
        },
        
        toggleSlowMo: () => {
            slowMoEnabled = !slowMoEnabled;
            gameState.timeScale = slowMoEnabled ? 0.25 : 1.0;
            logCollision('SLOWMO', slowMoEnabled ? 'Enabled (0.25x)' : 'Disabled');
        },
        
        clearAllDebris: () => {
            const ctx = window.__game?.context;
            if (!ctx?.scene) return;
            
            // Clear active chunks
            gameState.activeChunks?.forEach(chunk => ctx.scene.remove(chunk));
            gameState.activeChunks = [];
            
            // Clear fallen debris
            gameState.fallenDebris?.forEach(debris => ctx.scene.remove(debris));
            gameState.fallenDebris = [];
            gameState.debris = [];
            
            logCollision('CLEAR', 'All debris removed');
        },
        
        // Collision logging hook (call from collision code)
        logCollision,
        
        // Export test scenarios for external use
        COLLISION_TEST_SCENARIOS,
        
        ...extra
    };
    
    // Keyboard shortcut: Ctrl+Shift+D to toggle dev panel
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            window.__game.toggleDevPanel();
        }
    });
    
    console.log('[DevTools] Initialized. Press Ctrl+Shift+D to open collision test panel.');
}
