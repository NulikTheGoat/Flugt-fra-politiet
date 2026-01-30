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
import * as THREE from 'three';
import { cars } from './constants.js';
import { createPlayerCar, rebuildPlayerCar, updatePlayer, playerCar, setUICallbacks, createOtherPlayerCar, updateOtherPlayerCar, removeOtherPlayerCar, takeDamage } from './player.js';
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
import { unlockAudio } from './sfx.js';
import { updateWorldDirector, clearSpawnedObjects, challengerSpawnObjects, challengerSpawnObjectsAtPosition } from './worldDirector.js';
import { physicsWorld } from './physicsWorld.js';

// Expose gameState globally for debugging and testing
window.gameState = gameState;
window.cars = cars;
window.scene = scene;
window.camera = camera;
window.keys = keys;
window.THREE = THREE; // Expose THREE globally for debugging and other scripts

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

// Spawn reinforcement units at specific position (for Challenger free-roaming)
window.spawnReinforcementUnitsAt = function(count, types, position) {
    if (!position) {
        // Fallback to player-relative spawning
        return window.spawnReinforcementUnits(count, types);
    }
    
    console.log(`[Reinforcements] Spawning ${count} units at position (${position.x.toFixed(0)}, ${position.z.toFixed(0)}): ${types.join(', ')}`);
    
    types.forEach((type, index) => {
        // Stagger spawns slightly to avoid overlap
        setTimeout(() => {
            const policeCar = createPoliceCar(type);
            
            // Spawn in a circle around the specified position
            const angle = (Math.PI * 2 / count) * index + Math.random() * 0.5;
            const distance = 100 + Math.random() * 200; // Closer spawns around the marker
            
            policeCar.position.x = position.x + Math.sin(angle) * distance;
            policeCar.position.z = position.z + Math.cos(angle) * distance;
            
            gameState.policeCars.push(policeCar);
            console.log(`[Reinforcements] Unit ${index + 1}/${count} (${type}) spawned at (${policeCar.position.x.toFixed(0)}, ${policeCar.position.z.toFixed(0)})`);
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
const multiplayerLobby = document.getElementById('multiplayerLobby');
const lobbyConnect = document.getElementById('lobbyConnect');
const lobbyRoom = document.getElementById('lobbyRoom');
const lobbyError = document.getElementById('lobbyError');
const joinGameBtn = /** @type {HTMLButtonElement|null} */ (document.getElementById('joinGameBtn'));
const hostControls = document.getElementById('hostControls');
const waitingMessage = document.getElementById('waitingMessage');
const playerCount = document.getElementById('playerCount');
const playersList = document.getElementById('playersList');

// Player colors for multiplayer
const playerColors = [0xff0000, 0x0066ff, 0x00ff00, 0xffaa00];

// Challenger control panel
let challengerPanel = null;
let lastChallengerAction = 0;
const CHALLENGER_ACTION_COOLDOWN = 2000;
let challengerButtons = []; // Track buttons for cooldown updates
let challengerDifficulty = 'medium'; // easy, medium, hard

// Challenger free camera system
let challengerPosition = { x: 0, y: 150, z: 0 }; // Elevated view
let challengerRotation = { yaw: 0, pitch: -0.5 }; // Looking down slightly
let challengerMarker = null; // Visual marker showing spawn position
const CHALLENGER_MOVE_SPEED = 8.0; // Units per frame-delta
const CHALLENGER_FAST_SPEED = 25.0; // Sprint speed with Shift
const challengerKeys = {}; // Separate input map for Challenger

// Debug: Expose globally for console testing
window.challengerKeys = challengerKeys;
window.challengerDebug = {
    get position() { return challengerPosition; },
    get rotation() { return challengerRotation; },
    get isActive() { return isChallengerActive(); },
    get role() { return gameState.playerRole; },
    get isMultiplayer() { return gameState.isMultiplayer; },
    testMove: function(dir) {
        if (dir === 'w') challengerPosition.z += 50;
        if (dir === 's') challengerPosition.z -= 50;
        if (dir === 'a') challengerPosition.x += 50;
        if (dir === 'd') challengerPosition.x -= 50;
        console.log('[DEBUG] Manual move:', challengerPosition);
    }
};

function isChallengerActive() {
    const result = gameState.isMultiplayer && gameState.playerRole === 'challenger';
    return result;
}

// Challenger difficulty presets
const CHALLENGER_PRESETS = {
    easy: {
        cooldown: 3000,
        label: 'Nem',
        color: '#4ade80',
        policeMultiplier: 0.5,
        envMultiplier: 0.75
    },
    medium: {
        cooldown: 2000,
        label: 'Normal',
        color: '#fbbf24',
        policeMultiplier: 1,
        envMultiplier: 1
    },
    hard: {
        cooldown: 1000,
        label: 'Svær',
        color: '#ef4444',
        policeMultiplier: 1.5,
        envMultiplier: 1.5
    }
};

function getChallengerCooldown() {
    return CHALLENGER_PRESETS[challengerDifficulty]?.cooldown || CHALLENGER_ACTION_COOLDOWN;
}

function updateChallengerPanelVisibility() {
    console.log('[CHALLENGER-PANEL] Checking visibility:', {
        panelExists: !!challengerPanel,
        isMultiplayer: gameState.isMultiplayer,
        role: gameState.playerRole,
        gameStarted: gameState.startTime > 0
    });
    
    if (!challengerPanel) {
        console.warn('[CHALLENGER-PANEL] Panel does not exist! Creating now...');
        setupChallengerPanel();
        return;
    }
    
    // Show panel if role is challenger (regardless of isMultiplayer for debugging)
    const shouldShow = gameState.playerRole === 'challenger';
    console.log('[CHALLENGER-PANEL] shouldShow:', shouldShow, 'current display:', challengerPanel.style.display);
    
    challengerPanel.style.display = shouldShow ? 'flex' : 'none';
    
    if (shouldShow) {
        console.log('[CHALLENGER-PANEL] Panel is now VISIBLE');
    }
}

// Update cooldown state on all challenger buttons
function updateChallengerCooldowns() {
    const now = Date.now();
    const cooldown = getChallengerCooldown();
    const remaining = Math.max(0, cooldown - (now - lastChallengerAction));
    const onCooldown = remaining > 0;
    
    challengerButtons.forEach(btn => {
        btn.disabled = onCooldown;
        btn.style.opacity = onCooldown ? '0.5' : '1';
        btn.style.cursor = onCooldown ? 'not-allowed' : 'pointer';
    });
    
    // Update cooldown bar if exists
    const cooldownBar = document.getElementById('challengerCooldownBar');
    if (cooldownBar) {
        const pct = (remaining / cooldown) * 100;
        cooldownBar.style.width = `${pct}%`;
        cooldownBar.style.opacity = onCooldown ? '1' : '0';
    }
}

// Create a styled button for the challenger panel
function createChallengerButton(label, color, onClick) {
    const el = document.createElement('button');
    el.textContent = label;
    el.style.cssText = `
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid ${color}40;
        background: ${color}30;
        color: ${color};
        font-weight: 600;
        cursor: pointer;
        font-size: 12px;
        transition: opacity 0.15s, transform 0.1s;
    `;
    el.addEventListener('click', () => {
        const now = Date.now();
        if (now - lastChallengerAction < getChallengerCooldown()) return;
        lastChallengerAction = now;
        updateChallengerCooldowns();
        onClick();
        // Visual feedback
        el.style.transform = 'scale(0.95)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 100);
    });
    challengerButtons.push(el);
    return el;
}

// Show a small notification for Challenger actions (local feedback)
function showChallengerNotification(message, color = '#7cf5b5') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        right: 310px;
        bottom: 30px;
        background: ${color}20;
        border: 1px solid ${color}60;
        color: ${color};
        padding: 8px 14px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        z-index: 10002;
        animation: challengerNotifyIn 0.3s ease-out;
        pointer-events: none;
    `;
    notification.textContent = message;
    
    // Add animation if not present
    if (!document.getElementById('challenger-notify-styles')) {
        const style = document.createElement('style');
        style.id = 'challenger-notify-styles';
        style.textContent = `
            @keyframes challengerNotifyIn {
                from { opacity: 0; transform: translateX(20px); }
                to { opacity: 1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(20px)';
        notification.style.transition = 'all 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Create the challenger position marker (shows where spawns will appear)
function createChallengerMarker() {
    if (challengerMarker) return challengerMarker;
    
    // Check if scene is available
    if (!scene) {
        return null;
    }
    
    try {
        const markerGroup = new THREE.Group();
    
    // Large glowing ring on ground (more visible from top-down)
    const ringGeo = new THREE.RingGeometry(25, 35, 32);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x7cf5b5,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 1;
    markerGroup.add(ring);
    
    // Inner ring for emphasis
    const innerRingGeo = new THREE.RingGeometry(10, 15, 32);
    const innerRingMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 1.5;
    markerGroup.add(innerRing);
    
    // Vertical beam of light (taller for visibility)
    const beamGeo = new THREE.CylinderGeometry(5, 20, 200, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
        color: 0x7cf5b5,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 100;
    markerGroup.add(beam);
    
    // Large crosshair at ground level
    const crossMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });
    const crossPoints1 = [new THREE.Vector3(-50, 1, 0), new THREE.Vector3(50, 1, 0)];
    const crossPoints2 = [new THREE.Vector3(0, 1, -50), new THREE.Vector3(0, 1, 50)];
    const crossGeo1 = new THREE.BufferGeometry().setFromPoints(crossPoints1);
    const crossGeo2 = new THREE.BufferGeometry().setFromPoints(crossPoints2);
    markerGroup.add(new THREE.Line(crossGeo1, crossMat));
    markerGroup.add(new THREE.Line(crossGeo2, crossMat));
    
    // Store reference for animation
    markerGroup.userData.ring = ring;
    markerGroup.userData.ringMat = ringMat;
    markerGroup.userData.beam = beam;
    
    scene.add(markerGroup);
    challengerMarker = markerGroup;
    
    return markerGroup;
    } catch (e) {
        console.warn('[CHALLENGER-MARKER] Failed to create marker:', e.message);
        return null;
    }
}

// Update challenger free camera movement
let challengerUpdateCount = 0;
function updateChallengerCamera(delta) {
    // Log every 60 frames (once per second at 60fps)
    challengerUpdateCount++;
    const shouldLog = challengerUpdateCount % 60 === 0;
    
    if (!isChallengerActive()) {
        if (shouldLog) {
            console.log('[CHALLENGER-UPDATE-SKIP] Not active:', {
                isMultiplayer: gameState.isMultiplayer,
                role: gameState.playerRole,
                gameStarted: gameState.startTime > 0
            });
        }
        return;
    }
    
    // We ARE active - log this
    if (shouldLog) {
        console.log('[CHALLENGER-UPDATE-ACTIVE] Frame', challengerUpdateCount, {
            pos: challengerPosition,
            keys: Object.keys(challengerKeys).filter(k => challengerKeys[k]),
            delta
        });
    }
    
    // Update Debug Info in panel
    const debugEl = document.getElementById('challengerDebug');
    if (debugEl) {
        const activeKeys = Object.keys(challengerKeys).filter(k => challengerKeys[k]).join(', ');
        debugEl.textContent = `POS: ${Math.round(challengerPosition.x)}, ${Math.round(challengerPosition.z)}\nCAM Y: ${Math.round(challengerPosition.y)}\nKEYS: [${activeKeys}]\nMODE: ${gameState.is2DMode ? '2D' : '3D'}\nFRAME: ${challengerUpdateCount}`;
    }

    const speed = challengerKeys['shift'] ? CHALLENGER_FAST_SPEED : CHALLENGER_MOVE_SPEED;
    const input = challengerKeys;
    
    // In 2D/top-down mode: simple directional movement (up = forward in world)
    if (gameState.is2DMode) {
        const moveAmount = speed * delta;
        let moved = false;
        
        // WASD moves in world coordinates (W = +Z forward, A = -X left)
        if (input['w'] || input['arrowup'] || input['x']) {
            challengerPosition.z += moveAmount;
            moved = true;
        }
        if (input['s'] || input['arrowdown'] || input['z']) {
            challengerPosition.z -= moveAmount;
            moved = true;
        }
        if (input['a'] || input['arrowleft']) {
            challengerPosition.x += moveAmount;
            moved = true;
        }
        if (input['d'] || input['arrowright']) {
            challengerPosition.x -= moveAmount;
            moved = true;
        }
        
        if (moved) {
            console.log('[CHALLENGER-MOVED-2D]', { 
                x: challengerPosition.x.toFixed(1), 
                z: challengerPosition.z.toFixed(1),
                moveAmount: moveAmount.toFixed(2),
                inputKeys: Object.keys(input).filter(k => input[k])
            });
        }
        
        // Q/E for zoom in/out
        if (input['q']) {
            challengerPosition.y = Math.min(1200, challengerPosition.y + speed * delta * 0.8);
        }
        if (input['e']) {
            challengerPosition.y = Math.max(200, challengerPosition.y - speed * delta * 0.8);
        }
        
        // Top-down camera setup
        camera.up.set(0, 0, 1); // Align screen UP with World +Z
        camera.position.set(challengerPosition.x, challengerPosition.y, challengerPosition.z);
        camera.lookAt(challengerPosition.x, 0, challengerPosition.z);
        
        // Marker is directly below camera in 2D mode
        if (!challengerMarker) createChallengerMarker();
        if (challengerMarker && challengerMarker.userData && challengerMarker.userData.ring) {
            challengerMarker.position.set(challengerPosition.x, 0, challengerPosition.z);
            challengerMarker.userData.ring.rotation.z += 0.02 * delta;
            const pulse = 0.5 + Math.sin(Date.now() * 0.004) * 0.3;
            if (challengerMarker.userData.ringMat) {
                challengerMarker.userData.ringMat.opacity = pulse;
            }
        }
    } else {
        // 3D free camera mode: relative to camera direction
        const forward = { x: Math.sin(challengerRotation.yaw), z: Math.cos(challengerRotation.yaw) };
        const right = { x: Math.cos(challengerRotation.yaw), z: -Math.sin(challengerRotation.yaw) };
        
        if (input['w'] || input['arrowup'] || input['x']) {
            challengerPosition.x += forward.x * speed * delta;
            challengerPosition.z += forward.z * speed * delta;
        }
        if (input['s'] || input['arrowdown'] || input['z']) {
            challengerPosition.x -= forward.x * speed * delta;
            challengerPosition.z -= forward.z * speed * delta;
        }
        if (input['a'] || input['arrowleft']) {
            challengerPosition.x -= right.x * speed * delta;
            challengerPosition.z -= right.z * speed * delta;
        }
        if (input['d'] || input['arrowright']) {
            challengerPosition.x += right.x * speed * delta;
            challengerPosition.z += right.z * speed * delta;
        }
        
        // Q/E for rotation
        if (input['q']) {
            challengerRotation.yaw += 0.03 * delta;
        }
        if (input['e']) {
            challengerRotation.yaw -= 0.03 * delta;
        }
        
        // R/F for height adjustment
        if (input['r']) {
            challengerPosition.y = Math.min(500, challengerPosition.y + speed * delta * 0.5);
        }
        if (input['f']) {
            challengerPosition.y = Math.max(30, challengerPosition.y - speed * delta * 0.5);
        }
        
        camera.up.set(0, 1, 0);
        camera.position.set(challengerPosition.x, challengerPosition.y, challengerPosition.z);
        
        const lookDistance = 100;
        const lookX = challengerPosition.x + Math.sin(challengerRotation.yaw) * lookDistance;
        const lookZ = challengerPosition.z + Math.cos(challengerRotation.yaw) * lookDistance;
        camera.lookAt(lookX, 0, lookZ);
        
        if (!challengerMarker) createChallengerMarker();
        if (challengerMarker && challengerMarker.userData && challengerMarker.userData.ring) {
            const groundX = challengerPosition.x + Math.sin(challengerRotation.yaw) * (challengerPosition.y * 0.7);
            const groundZ = challengerPosition.z + Math.cos(challengerRotation.yaw) * (challengerPosition.y * 0.7);
            challengerMarker.position.set(groundX, 0, groundZ);
            challengerMarker.userData.ring.rotation.z += 0.02 * delta;
            const pulse = 0.4 + Math.sin(Date.now() * 0.003) * 0.2;
            if (challengerMarker.userData.ringMat) {
                challengerMarker.userData.ringMat.opacity = pulse;
            }
        }
    }
}

// Get challenger's target spawn position (on ground)
function getChallengerSpawnPosition() {
    if (!challengerMarker) return { x: challengerPosition.x, z: challengerPosition.z };
    return { x: challengerMarker.position.x, z: challengerMarker.position.z };
}

function setupChallengerPanel() {
    if (document.getElementById('challengerPanel')) {
        challengerPanel = document.getElementById('challengerPanel');
        updateChallengerPanelVisibility();
        return;
    }

    challengerPanel = document.createElement('div');
    challengerPanel.id = 'challengerPanel';
    challengerPanel.style.cssText = `
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 280px;
        padding: 12px;
        background: rgba(8, 10, 18, 0.85);
        border: 1px solid rgba(0, 255, 102, 0.4);
        border-radius: 12px;
        display: none;
        flex-direction: column;
        gap: 8px;
        z-index: 10001;
        backdrop-filter: blur(6px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        max-height: 80vh;
        overflow-y: auto;
    `;

    // Debug Info Container
    const debugInfo = document.createElement('div');
    debugInfo.id = 'challengerDebug';
    debugInfo.style.cssText = 'color: #aaa; font-size: 10px; font-family: monospace; margin-bottom: 5px; white-space: pre-wrap;';
    challengerPanel.appendChild(debugInfo);

    const title = document.createElement('div');
    title.textContent = 'CHALLENGER';
    title.style.cssText = 'font-size: 11px; letter-spacing: 2px; color: #7cf5b5; font-weight: 700; text-align: center;';
    challengerPanel.appendChild(title);

    const hint = document.createElement('div');
    hint.textContent = 'Spawner udfordringer til alle spillere';
    hint.style.cssText = 'font-size: 11px; color: #9bdcb6; text-align: center; margin-bottom: 4px;';
    challengerPanel.appendChild(hint);

    // Difficulty preset selector
    const difficultyContainer = document.createElement('div');
    difficultyContainer.style.cssText = 'display: flex; gap: 4px; justify-content: center; margin-bottom: 6px;';
    
    Object.entries(CHALLENGER_PRESETS).forEach(([key, preset]) => {
        const btn = document.createElement('button');
        btn.textContent = preset.label;
        btn.dataset.difficulty = key;
        btn.style.cssText = `
            padding: 4px 12px;
            border-radius: 6px;
            border: 1px solid ${preset.color}60;
            background: ${key === challengerDifficulty ? preset.color + '40' : 'transparent'};
            color: ${preset.color};
            font-size: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        `;
        btn.addEventListener('click', () => {
            challengerDifficulty = key;
            // Update all difficulty buttons
            difficultyContainer.querySelectorAll('button').forEach(b => {
                const d = b.dataset.difficulty;
                const p = CHALLENGER_PRESETS[d];
                b.style.background = d === key ? p.color + '40' : 'transparent';
            });
            // Show feedback
            showChallengerNotification(`Sværhedsgrad: ${preset.label}`, preset.color);
        });
        difficultyContainer.appendChild(btn);
    });
    challengerPanel.appendChild(difficultyContainer);

    // Cooldown bar
    const cooldownContainer = document.createElement('div');
    cooldownContainer.style.cssText = 'height: 3px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; margin-bottom: 4px;';
    const cooldownBar = document.createElement('div');
    cooldownBar.id = 'challengerCooldownBar';
    cooldownBar.style.cssText = 'height: 100%; width: 0%; background: linear-gradient(90deg, #7cf5b5, #3b82f6); transition: width 0.1s linear; opacity: 0;';
    cooldownContainer.appendChild(cooldownBar);
    challengerPanel.appendChild(cooldownContainer);

    // Reset button tracking
    challengerButtons = [];

    // Section: Police Spawning
    const policeSection = document.createElement('div');
    policeSection.style.cssText = 'font-size: 10px; color: #ff6b6b; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;';
    policeSection.textContent = '🚨 Politi';
    challengerPanel.appendChild(policeSection);

    const policeButtons = [
        { label: '🚓 2x Standard', types: ['standard', 'standard'] },
        { label: '⚡ 2x Interceptor', types: ['interceptor', 'interceptor'] },
        { label: '🛡️ 1x SWAT', types: ['swat'] }
    ];

    policeButtons.forEach((btn) => {
        const el = createChallengerButton(btn.label, '#ffaaaa', () => {
            const pos = getChallengerSpawnPosition();
            Network.sendGameEvent('challenger:reinforce', { types: btn.types, position: pos });
            showChallengerNotification(`Spawnet: ${btn.label}`, '#ff6b6b');
        });
        challengerPanel.appendChild(el);
    });

    // Section: Environment Objects
    const envSection = document.createElement('div');
    envSection.style.cssText = 'font-size: 10px; color: #6bffb8; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px;';
    envSection.textContent = '🧱 Miljø';
    challengerPanel.appendChild(envSection);

    const envButtons = [
        { label: '🚧 Vejspærring', objects: [{ type: 'roadblock', side: 'center' }] },
        { label: '🔶 Kegler x5', objects: [
            { type: 'cones', side: 'left' },
            { type: 'cones', side: 'center' },
            { type: 'cones', side: 'right' },
            { type: 'cones', side: 'left' },
            { type: 'cones', side: 'right' }
        ]},
        { label: '🧱 Barriere x2', objects: [
            { type: 'barrier', side: 'left' },
            { type: 'barrier', side: 'right' }
        ]},
        { label: '🛹 Rampe', objects: [{ type: 'ramp', side: 'center' }] },
        { label: '⚠️ Sømmåtte', objects: [{ type: 'spike', side: 'center' }] },
        { label: '🛢️ Olie', objects: [{ type: 'oil', side: 'center' }] }
    ];

    envButtons.forEach((btn) => {
        const el = createChallengerButton(btn.label, '#aaffcc', () => {
            const pos = getChallengerSpawnPosition();
            Network.sendGameEvent('challenger:spawn', { objects: btn.objects, position: pos });
            showChallengerNotification(`Spawnet: ${btn.label}`, '#6bffb8');
        });
        challengerPanel.appendChild(el);
    });

    // Section: Power-ups (bonus for Contesters)
    const bonusSection = document.createElement('div');
    bonusSection.style.cssText = 'font-size: 10px; color: #ffeb3b; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px;';
    bonusSection.textContent = '⭐ Bonus';
    challengerPanel.appendChild(bonusSection);

    const bonusButtons = [
        { label: '💰 Penge x3', objects: [
            { type: 'money', side: 'left' },
            { type: 'money', side: 'center' },
            { type: 'money', side: 'right' }
        ]},
        { label: '❤️ Sundhed', objects: [{ type: 'health', side: 'center' }] },
        { label: '🚀 Boost', objects: [{ type: 'boost', side: 'center' }] }
    ];

    bonusButtons.forEach((btn) => {
        const el = createChallengerButton(btn.label, '#fff59d', () => {
            const pos = getChallengerSpawnPosition();
            Network.sendGameEvent('challenger:spawn', { objects: btn.objects, position: pos });
            showChallengerNotification(`Spawnet: ${btn.label}`, '#ffeb3b');
        });
        challengerPanel.appendChild(el);
    });

    // Controls hint for Challenger
    const controlsHint = document.createElement('div');
    controlsHint.style.cssText = 'font-size: 9px; color: #666; text-align: center; margin-top: 8px; border-top: 1px solid #333; padding-top: 8px;';
    controlsHint.innerHTML = '🎮 WASD/Piler: Bevæg | Q/E: Zoom<br>Shift: Sprint | C: Skift kamera';
    challengerPanel.appendChild(controlsHint);

    document.body.appendChild(challengerPanel);
    updateChallengerPanelVisibility();
    
    // Start cooldown update loop
    setInterval(updateChallengerCooldowns, 50);
}

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

// Initialize Challenger controls
setupChallengerPanel();


// Network callbacks - unified join (no more host vs join distinction)
Network.setOnJoined((roomCode, playerId, players, isHost) => {
    gameState.isMultiplayer = true;
    gameState.isHost = isHost;
    gameState.playerId = playerId;
    gameState.roomCode = roomCode;
    
    const myIndex = players.findIndex(p => p.id === playerId);
    gameState.playerColor = playerColors[myIndex] || playerColors[0];
    const myPlayer = players.find(p => p.id === playerId);
    gameState.playerRole = myPlayer?.role || gameState.playerRole || 'contester';
    updateChallengerPanelVisibility();
    
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
        if (player.role === 'challenger') {
            gameState.otherPlayers.set(player.id, {
                name: player.name,
                car: player.car,
                color: player.color,
                role: player.role,
                mesh: null,
                state: null
            });
            console.log(`${player.name} joined as Challenger (no car spawned).`);
            return;
        }
        const mesh = createOtherPlayerCar(player.color || 0x0066ff, player.car || 'standard');
        // Spawn near origin for drop-in players
        mesh.position.set(0, 0, 100);
        gameState.otherPlayers.set(player.id, {
            name: player.name,
            car: player.car,
            color: player.color,
            role: player.role,
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
    console.log('[NETWORK-START] My Data from Server:', myData);
    console.log('[NETWORK-START] Current Local Role:', gameState.playerRole);
    
    // IF server returns a role, trust it. But log if it mismatches.
    if (myData && myData.role !== gameState.playerRole) {
        console.warn(`[NETWORK-START] Role mismatch! Local: ${gameState.playerRole}, Server: ${myData.role}`);
    }

    gameState.playerRole = myData?.role || gameState.playerRole || 'contester';
    console.log('[NETWORK-START] Final Role:', gameState.playerRole);

    // Force panel visibility update
    console.log('[NETWORK-START] Calling updateChallengerPanelVisibility...');
    updateChallengerPanelVisibility();
    
    // Double-check panel state after a short delay (DOM might need time)
    setTimeout(() => {
        console.log('[NETWORK-START] Delayed panel check...');
        updateChallengerPanelVisibility();
    }, 500);
    
    // Setup other players
    players.forEach(p => {
        if (p.id !== gameState.playerId) {
            if (p.role === 'challenger') {
                gameState.otherPlayers.set(p.id, {
                    name: p.name,
                    car: p.car,
                    color: p.color,
                    role: p.role,
                    mesh: null,
                    state: null
                });
                return;
            }
            const mesh = createOtherPlayerCar(p.color || 0x0066ff, p.car || 'standard');
            mesh.position.set(p.spawnPos.x, 0, p.spawnPos.z);
            gameState.otherPlayers.set(p.id, {
                name: p.name,
                car: p.car,
                color: p.color,
                role: p.role,
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
    } else if (event === 'challenger:reinforce') {
        // Police reinforcement - only host should create them (police sync is separate)
        if (!gameState.isHost) return;
        const senderRole = playerId === gameState.playerId
            ? gameState.playerRole
            : gameState.otherPlayers.get(playerId)?.role;
        if (senderRole !== 'challenger') return;

        const types = Array.isArray(data?.types) ? data.types : ['standard'];
        const spawnPos = data?.position;
        if (window.spawnReinforcementUnitsAt) {
            window.spawnReinforcementUnitsAt(types.length, types, spawnPos);
        } else if (window.spawnReinforcementUnits) {
            window.spawnReinforcementUnits(types.length, types);
        }
    } else if (event === 'challenger:spawn') {
        // Environment object spawning - runs on ALL clients for visual sync
        const senderRole = playerId === gameState.playerId
            ? gameState.playerRole
            : gameState.otherPlayers.get(playerId)?.role;
        if (senderRole !== 'challenger') return;

        const objects = Array.isArray(data?.objects) ? data.objects : [];
        const spawnPos = data?.position;
        if (objects.length > 0) {
            // Use Challenger's position if provided, otherwise fall back to player position
            if (spawnPos) {
                challengerSpawnObjectsAtPosition(objects, spawnPos.x, spawnPos.z);
            } else if (playerCar) {
                challengerSpawnObjects(objects, playerCar.position.z);
            }
        }
    }
});

// Handle car selection update from other players (in lobby before game starts)
Network.setOnPlayerCarUpdated((playerId, car, players) => {
    console.log(`Player ${playerId} changed car to: ${car}`);
    
    // Update the lobby player list display
    updatePlayersList(players);
    
    // If the game is already running and this player exists, we may need to rebuild their car mesh
    const existingPlayer = gameState.otherPlayers.get(playerId);
    if (existingPlayer && gameState.isMultiplayer && !gameState.arrested) {
        existingPlayer.car = car;
        // Note: During gameplay, car rebuilding is handled by respawn logic
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
    
    // ALWAYS reset timer on respawn - fresh start for new record attempt
    gameState.timerStartTime = 0; // Will be set when player collects money or engages police
    gameState.elapsedTime = 0;
    console.log('[RESPAWN] Timer reset - ready for new record attempt');
    
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
        const roleLabel = p.role === 'challenger' ? 'CHALLENGER' : 'CONTESTER';
        const carLabel = p.car || 'standard';
        const div = document.createElement('div');
        div.className = 'player-item';
        div.innerHTML = `
            <div class="player-color" style="background: #${(p.color || playerColors[idx]).toString(16).padStart(6, '0')}"></div>
            <span class="player-name">${p.name}</span>
            <span class="player-car">${carLabel}</span>
            <span class="player-role">${roleLabel}</span>
            ${p.isHost ? '<span class="player-host">HOST</span>' : ''}
        `;
        playersList.appendChild(div);
    });
    
    // Update start button state if host is challenger
    const startBtn = document.getElementById('startMultiplayerBtn');
    if (startBtn && gameState.isHost && gameState.playerRole === 'challenger') {
        const hasContester = players.some(p => p.role !== 'challenger' && !p.isHost) || 
                             Array.from(gameState.otherPlayers?.values() || []).some(p => p.role !== 'challenger');
        if (!hasContester) {
            startBtn.textContent = '⏳ Venter på Contester...';
            startBtn.style.opacity = '0.5';
            startBtn.style.cursor = 'not-allowed';
        } else {
            startBtn.textContent = '🚀 START SPIL';
            startBtn.style.opacity = '1';
            startBtn.style.cursor = 'pointer';
        }
    }
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
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        console.log('[KEYDOWN-BLOCKED] Target is input:', e.target.tagName);
        return;
    }
    
    const key = e.key.toLowerCase();
    keys[key] = true;
    
    // ALWAYS set challengerKeys if role is challenger, regardless of isChallengerActive check
    const isChallenger = gameState.playerRole === 'challenger';
    console.log('[KEYDOWN]', key, { 
        isChallenger, 
        isMultiplayer: gameState.isMultiplayer, 
        role: gameState.playerRole,
        isChallengerActive: isChallengerActive(),
        gameStarted: gameState.startTime > 0
    });
    
    if (isChallenger) {
        challengerKeys[key] = true;
        console.log('[CHALLENGER-KEY-SET]', key, 'challengerKeys now:', Object.keys(challengerKeys).filter(k => challengerKeys[k]));
        // Prevent accidental scrolling while moving as Challenger
        if (['w','a','s','d','x','z','arrowup','arrowdown','arrowleft','arrowright'].includes(key)) {
            e.preventDefault();
        }
    }
    if (e.key === 'c' || e.key === 'C') {
        gameState.is2DMode = !gameState.is2DMode;
        console.log('[CHALLENGER-CAMERA-TOGGLE]', gameState.is2DMode ? '2D' : '3D');
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
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const key = e.key.toLowerCase();
    keys[key] = false;
    
    // ALWAYS clear challengerKeys if role is challenger
    if (gameState.playerRole === 'challenger') {
        challengerKeys[key] = false;
    }
});

// Reset all keys when window loses focus (prevents "stuck" keys)
window.addEventListener('blur', () => {
    Object.keys(keys).forEach(key => { keys[key] = false; });
    Object.keys(challengerKeys).forEach(key => { challengerKeys[key] = false; });
});

// Also reset keys when tab becomes hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        Object.keys(keys).forEach(key => { keys[key] = false; });
        Object.keys(challengerKeys).forEach(key => { challengerKeys[key] = false; });
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
    // Ensure audio is unlocked when game starts
    unlockAudio();
    
    if (!window.physicsInitialized) {
        physicsWorld.init();
        
        // Setup debris collision callbacks
        physicsWorld.onDebrisHitPlayer = (damage, body, mesh) => {
            console.log(`[DEBRIS] Player hit by debris! Damage: ${damage}`);
            takeDamage(damage);
            gameState.screenShake = Math.max(gameState.screenShake || 0, 0.3);
        };
        
        physicsWorld.onDebrisHitPolice = (damage, policeCar, body, mesh) => {
            if (policeCar && policeCar.userData && typeof policeCar.userData.health === 'number') {
                console.log(`[DEBRIS] Police hit by debris! Damage: ${damage}, HP: ${policeCar.userData.health}`);
                policeCar.userData.health -= damage;
                
                // Check if killed by debris
                if (policeCar.userData.health <= 0 && !policeCar.userData.isDead) {
                    policeCar.userData.isDead = true;
                    policeCar.userData.isDestroyed = true;
                    console.log(`[DEBRIS] Police destroyed by falling debris!`);
                }
            }
        };
        
        physicsWorld.onDebrisHitBuilding = (damage, chunk, body, mesh) => {
            if (chunk && chunk.userData && !chunk.userData.isHit) {
                console.log(`[DEBRIS] Building hit by debris! Damage: ${damage}`);
                chunk.userData.health = (chunk.userData.health || 3) - 1;
                
                // Destroy chunk if health depleted
                if (chunk.userData.health <= 0) {
                    chunk.userData.isHit = true;
                    chunk.matrixAutoUpdate = true;
                    
                    // Give initial velocity from debris impact
                    if (body && chunk.userData.velocity) {
                        const impactDir = body.velocity.clone();
                        impactDir.normalize();
                        chunk.userData.velocity.set(
                            impactDir.x * 5,
                            2 + Math.random() * 3,
                            impactDir.z * 5
                        );
                    }
                    
                    if (!gameState.activeChunks.includes(chunk)) {
                        gameState.activeChunks.push(chunk);
                    }
                    console.log(`[DEBRIS] Building chunk destroyed by debris cascade!`);
                }
            }
        };
        
        window.physicsInitialized = true;
    }
    physicsWorld.reset();

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

    // Challenger: hide local car and setup free camera
    if (gameState.playerRole === 'challenger') {
        console.log('[CHALLENGER-INIT] Starting Challenger setup', {
            playerCar: !!playerCar,
            isMultiplayer: gameState.isMultiplayer,
            role: gameState.playerRole,
            hasRenderer: !!renderer
        });
        
        if (playerCar) {
            playerCar.visible = false;
            scene.remove(playerCar);
        }
        gameState.speed = 0;
        if (renderer && renderer.domElement) {
            renderer.domElement.setAttribute('tabindex', '0');
            renderer.domElement.focus();
            console.log('[CHALLENGER-INIT] Canvas focused');
        }
        
        // Enable 2D/top-down mode by default for Challenger (press C to toggle)
        gameState.is2DMode = true;
        
        // Initialize Challenger camera position (high above for top-down view)
        challengerPosition = { x: 0, y: 600, z: 200 };
        challengerRotation = { yaw: 0, pitch: -0.5 };
        
        // Create the marker immediately
        if (!challengerMarker) {
            createChallengerMarker();
        }
        
        console.log('[CHALLENGER-INIT] Setup complete', {
            position: challengerPosition,
            is2DMode: gameState.is2DMode
        });
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

    // Update Physics World (delta is frame-ratio, convert to seconds)
    physicsWorld.update(delta / 60);
    
    // Check debris collisions against player, police, buildings
    if (playerCar && !gameState.arrested && !(gameState.isMultiplayer && gameState.playerRole === 'challenger')) {
        physicsWorld.checkDebrisCollisions(
            playerCar.position,
            gameState.policeCars,
            gameState.chunkGrid,
            gameState.chunkGridSize
        );
    }

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

        // Player Physics (disabled for Challenger role)
        if (!(gameState.isMultiplayer && gameState.playerRole === 'challenger')) {
            updatePlayer(delta, now);
        }
        
        // Send player state to network in multiplayer
        if (gameState.isMultiplayer && playerCar && gameState.playerRole !== 'challenger') {
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
        if (gameState.isMultiplayer && gameState.playerRole === 'challenger') {
            // Generate world around Challenger camera
             updateEndlessWorld(challengerPosition); 
             // Also update World Director with delta (but it spawns near Challenger/players)
             updateWorldDirector(delta);
        } else if (playerCar) {
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
    
    // Challenger free camera movement (runs even without playerCar and before game fully starts)
    if (gameState.isMultiplayer && gameState.playerRole === 'challenger') {
        // Ensure panel is visible every frame (belt and suspenders)
        if (challengerPanel && challengerPanel.style.display !== 'flex') {
            console.warn('[ANIMATE] Challenger panel was hidden, forcing visible!');
            challengerPanel.style.display = 'flex';
        }
        
        updateChallengerCamera(delta);
        
        // Still update HUD for other players if game has started
        if (gameState.startTime > 0 && gameState.isMultiplayer) {
            updateOtherPlayersHUD();
        }
        
        renderer.render(scene, camera);
        return; // Skip normal camera logic - Challenger has no player car
    }
    
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
        const modal = document.getElementById('gameModeModal');
        if (modal) modal.style.display = 'flex';
    }, 500);
}
animate();
