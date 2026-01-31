import * as THREE from 'three';
import { gameState, saveProgress } from './state.js';
import { generateVerdict, generateNewspaper } from './commentary.js';
import { gameConfig } from './config.js';
import { clamp, darkenColor } from './utils.js';
import { cars } from './constants.js';
import { scene, renderer } from './core.js';
import { updateCarStats } from './player.js';
import { stopEngineSound, stopDriftSound } from './sfx.js';

let startGameCallback = null;

export function setStartGameCallback(cb) {
    startGameCallback = cb;
}

// Cached DOM Elements
export const DOM = {
    speed: document.getElementById('speed'),
    speedFill: document.getElementById('speedFill'),
    time: document.getElementById('time'),
    heatLevel: document.getElementById('heatLevel'),
    policeCount: document.getElementById('policeCount'),
    deadPoliceCount: document.getElementById('deadPoliceCount'),
    money: document.getElementById('money'),
    totalMoney: document.getElementById('totalMoney'),
    policeDistance: document.getElementById('policeDistance'),
    status: document.getElementById('status'),
    gameOver: document.getElementById('gameOver'),
    gameOverMessage: document.getElementById('gameOverMessage'),
    gameOverTime: document.getElementById('gameOverTime'),
    gameOverMoney: document.getElementById('gameOverMoney'),
    gameOverPoliceKilled: document.getElementById('gameOverPoliceKilled'),
    gameOverMaxHeat: document.getElementById('gameOverMaxHeat'),
    shop: document.getElementById('shop'),
    shopMoney: document.getElementById('shopMoney'),
    carList: document.getElementById('carList'),
    driftIndicator: document.getElementById('driftIndicator'),
    healthValue: document.getElementById('healthValue'),
    healthFill: document.getElementById('healthFill'),
    playBtn: document.getElementById('playBtn'),
    gameOverShopBtn: document.getElementById('gameOverShopBtn'),
    sheriffIndicator: document.getElementById('sheriffIndicator')
};

// ==========================================
// HIGH SCORE SYSTEM - Per Player Records
// ==========================================

/**
 * Get the current player's name for record tracking
 * @returns {string}
 */
function getCurrentPlayerName() {
    const savedName = localStorage.getItem('playerName');
    if (savedName && savedName.trim() !== '') {
        return savedName.trim().substring(0, 15);
    }
    return 'Anonym';
}

/**
 * Get all player records from storage
 * @returns {Object.<string, Array<{time: number, date: string}>>}
 */
function getAllPlayerRecords() {
    try {
        const stored = localStorage.getItem('flugt_player_records');
        return stored ? JSON.parse(stored) : {};
    } catch (e) {
        console.error("Failed to load player records", e);
        return {};
    }
}

/**
 * Get top 5 records for a specific player
 * @param {string} playerName
 * @returns {Array<{time: number, date: string}>}
 */
function getPlayerRecords(playerName) {
    const allRecords = getAllPlayerRecords();
    return allRecords[playerName] || [];
}

/**
 * Legacy: Get global high scores (for backwards compatibility)
 */
function getHighScores() {
    try {
        const stored = localStorage.getItem('flugt_highscores');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to load highscores", e);
        return [];
    }
}

/**
 * Save a new record for the current player
 * @param {number} time - Survival time in seconds
 */
function saveHighScore(time) {
    if (!time || time < 1) return;
    
    const playerName = getCurrentPlayerName();
    const allRecords = getAllPlayerRecords();
    
    // Get or create player's records
    let playerRecords = allRecords[playerName] || [];
    
    // Check if score qualifies for top 5 personal records
    const qualifies = playerRecords.length < 5 || time > playerRecords[playerRecords.length - 1].time;
    
    if (qualifies) {
        // Format date as DD/MM HH:MM
        const now = new Date();
        const date = now.toLocaleDateString('da-DK', { day: '2-digit', month: '2-digit' }) + 
                     ' ' + now.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
        
        playerRecords.push({ time, date });
        
        // Sort descending by time
        playerRecords.sort((a, b) => b.time - a.time);
        
        // Keep top 5
        playerRecords = playerRecords.slice(0, 5);
        
        // Save back
        allRecords[playerName] = playerRecords;
        localStorage.setItem('flugt_player_records', JSON.stringify(allRecords));
        
        // Also update legacy global highscores for backwards compatibility
        updateLegacyHighScores(playerName, time);
        
        updateHighScoreDisplay();
        
        // Check if this is a new personal best
        if (playerRecords[0].time === time) {
            console.log(`🏆 NY PERSONLIG REKORD for ${playerName}: ${formatTime(time)}!`);
        }
    }
}

/**
 * Update legacy global highscores (backwards compatibility)
 */
function updateLegacyHighScores(playerName, time) {
    let scores = getHighScores();
    const qualifies = scores.length < 5 || time > scores[scores.length - 1]?.time;
    
    if (qualifies) {
        const date = new Date().toLocaleDateString('da-DK', { day: '2-digit', month: '2-digit' });
        scores.push({ name: playerName.substring(0, 10), time, date });
        scores.sort((a, b) => b.time - a.time);
        scores = scores.slice(0, 5);
        localStorage.setItem('flugt_highscores', JSON.stringify(scores));
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateHighScoreDisplay() {
    let container = document.getElementById('highscoreContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'highscoreContainer';
        container.style.cssText = `
            position: fixed;
            bottom: 140px;
            left: 20px;
            background: rgba(0, 0, 0, 0.85);
            color: #fff;
            padding: 12px 16px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            z-index: 1000;
            border: 2px solid #333;
            min-width: 260px;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        `;
        document.body.appendChild(container);
    }

    const playerName = getCurrentPlayerName();
    const personalRecords = getPlayerRecords(playerName);
    
    if (personalRecords.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;color:#f1c40f;font-size:14px;font-weight:bold;margin-bottom:6px;">
                🏆 DINE REKORDER
            </div>
            <div style="text-align:center;color:#666;font-size:11px;margin-bottom:8px;">
                ${playerName}
            </div>
            <div style="text-align:center;color:#aaa;font-size:12px;padding:10px 0;">
                Ingen rekorder endnu!<br>
                <span style="font-size:10px;color:#666;">Overlev længst muligt</span>
            </div>
        `;
        return;
    }

    let html = `
        <div style="text-align:center;color:#f1c40f;font-size:14px;font-weight:bold;margin-bottom:4px;">
            🏆 DINE TOP 5
        </div>
        <div style="text-align:center;color:#888;font-size:11px;margin-bottom:10px;border-bottom:1px solid #444;padding-bottom:8px;">
            ${playerName}
        </div>
    `;
    
    personalRecords.forEach((record, index) => {
        const color = index === 0 ? '#ffd700' : (index === 1 ? '#c0c0c0' : (index === 2 ? '#cd7f32' : '#aaa'));
        const medal = index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : '  '));
        html += `
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;margin-bottom:5px;color:${color};">
                <span>${medal} #${index + 1}</span>
                <span style="font-weight:bold;">${formatTime(record.time)}</span>
                <span style="font-size:10px;color:#666;">${record.date}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Export for external use (e.g., when player name changes)
export { updateHighScoreDisplay, getCurrentPlayerName, getPlayerRecords };

// Initial display load
document.addEventListener('DOMContentLoaded', updateHighScoreDisplay);

export function updateHUD(policeDistance) {
    const speedKmh = Math.round(gameState.speed * 3.6);
    DOM.speed.textContent = String(speedKmh);
    DOM.speedFill.style.width = clamp((gameState.speed / gameState.maxSpeed) * 100, 0, 100) + '%';

    if (gameState.speed > gameState.maxSpeedWarning) {
        DOM.speedFill.style.background = 'linear-gradient(to right, #ffff00, #ff0000)';
    } else {
        DOM.speedFill.style.background = 'linear-gradient(to right, #00ff00, #ffff00, #ff0000)';
    }
    
    // Drift indicator
    if (gameState.driftFactor > 0.3) {
        DOM.driftIndicator.style.display = 'block';
        DOM.driftIndicator.style.opacity = String(Math.min(1, gameState.driftFactor * 1.5));
    } else {
        DOM.driftIndicator.style.display = 'none';
    }

    // Update time and money
        let elapsedSeconds;
        if (gameState.arrested && gameState.elapsedTime) {
            elapsedSeconds = Math.floor(gameState.elapsedTime);
        } else if (gameState.timerStartTime) {
            elapsedSeconds = Math.floor((Date.now() - gameState.timerStartTime) / 1000);
        } else {
            elapsedSeconds = 0;
        }
    DOM.time.textContent = String(elapsedSeconds);
    DOM.heatLevel.textContent = String(gameState.heatLevel);
    
    // Count active and dead police cars
    const deadCount = gameState.policeCars.filter(c => c.userData.dead).length;
    const activeCount = gameState.policeCars.length - deadCount;
    DOM.policeCount.textContent = String(activeCount);
    DOM.deadPoliceCount.textContent = String(deadCount);
    
    // Check if Sheriff is active
    const hasSheriff = gameState.policeCars.some(c => c.userData.type === 'sheriff' && !c.userData.dead);
    if (DOM.sheriffIndicator) {
        DOM.sheriffIndicator.style.display = hasSheriff ? 'block' : 'none';
    }
    
    // Style heat level
    const heatColor = ['#00ff00', '#99ff00', '#ffff00', '#ff8800', '#ff4400', '#ff0000'][gameState.heatLevel - 1] || '#ff0000';
    DOM.heatLevel.style.color = heatColor;

    gameState.elapsedTime = elapsedSeconds;

    // Give money every configured interval without being arrested (Passive)
    // Scale passive income exponentially with heat level: base * heat^exponent
    if (elapsedSeconds > 0 && elapsedSeconds % gameConfig.passiveIncomeInterval === 0 && (Date.now() - gameState.lastMoneyCheckTime) > 500) {
        const rebirthMult = (gameState.rebirthPoints || 0) + 1;
        const heatExponent = gameConfig.passiveIncomeExponent || 1.5;
        const scaledIncome = Math.round(gameConfig.passiveIncomeBase * Math.pow(gameState.heatLevel, heatExponent));
        addMoney(scaledIncome * rebirthMult);
        gameState.lastMoneyCheckTime = Date.now();
    }

    // Display money
    if (DOM.money) DOM.money.textContent = Math.floor(gameState.money).toLocaleString();
    if (DOM.totalMoney) DOM.totalMoney.textContent = Math.floor((gameState.totalMoney || 0) + gameState.money).toLocaleString();

    if (policeDistance > 0) {
        DOM.policeDistance.textContent = String(Math.round(policeDistance));
        
        // Arrest countdown display
        if (gameState.arrestCountdown > 0) {
            DOM.status.textContent = `ANHOLDELSE: ${Math.ceil(gameState.arrestCountdown)}`;
            DOM.status.style.color = '#ff0000';
            DOM.status.style.fontSize = '24px';
            DOM.status.style.animation = 'pulse 0.5s infinite';
        } else if (policeDistance < gameState.arrestDistance + 100) {
            DOM.status.textContent = 'I FARE!';
            DOM.status.style.color = '#ff0000';
            DOM.status.style.fontSize = '';
            DOM.status.style.animation = '';
        } else {
            DOM.status.textContent = 'Fri';
            DOM.status.style.color = '#00ff00';
            DOM.status.style.fontSize = '';
            DOM.status.style.animation = '';
        }
    }
}


export function showFloatingMoney(amount, worldPosition, camera) {
    if (!amount || amount <= 0) return;
    
    // Create container
    const floatingEl = document.createElement('div');
    floatingEl.innerHTML = `
        <span style="font-size: 1.5em; vertical-align: middle;">💸</span> 
        <span>+${amount}</span>
    `;
    
    // Assertive Design: Big, Bold, Gold & Black
    Object.assign(floatingEl.style, {
        position: 'absolute',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        color: '#FFD700', // Gold
        webkitTextStroke: '1.5px black', // Thick outline
        textShadow: '3px 3px 0px rgba(0,0,0,0.5)', // Hard drop shadow
        fontWeight: '900',
        fontSize: '42px', // Much bigger
        pointerEvents: 'none',
        zIndex: '2000', // Very top
        transform: 'translate(-50%, -50%) scale(0)', // Start invisible/small
        transition: 'none', // We manage transitions manually or via animation
        whiteSpace: 'nowrap'
    });

    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    // Project world position
    if (worldPosition && camera) {
        const vector = worldPosition.clone();
        // Slightly offset upwards from the car wreck
        vector.y += 5;
        vector.project(camera);
        startX = (vector.x * 0.5 + 0.5) * window.innerWidth;
        startY = (-(vector.y * 0.5) + 0.5) * window.innerHeight;
    }
    
    floatingEl.style.left = startX + 'px';
    floatingEl.style.top = startY + 'px';
    document.body.appendChild(floatingEl);
    
    // Animation Phase 1: THE IMPACT (Boom!)
    requestAnimationFrame(() => {
        // Force Reflow
        void floatingEl.offsetWidth;
        
        floatingEl.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Overshoot "Spring" easing
        // Random tilt for dynamic look
        const tilt = (Math.random() - 0.5) * 30; 
        floatingEl.style.transform = `translate(-50%, -50%) scale(1.5) rotate(${tilt}deg)`;
        
        // Add a "Shockwave" flash behind if possible, or just keep it simple text for now.
    });

    // Animation Phase 2: THE COLLECTION (Swoosh to HUD)
    // Wait for user to register the "Boom" (400ms)
    setTimeout(() => {
        const moneyRect = DOM.money.getBoundingClientRect();
        // Target center of money counter
        const targetX = moneyRect.left + moneyRect.width / 2;
        const targetY = moneyRect.top + moneyRect.height / 2;
        
        // Calculate deltas
        // We use transition for this movement
        floatingEl.style.transition = 'all 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045)'; // Back-in / Anticipation easing? maybe too complex. 
        // Let's use Ease-In (accelerate away)
        floatingEl.style.transition = 'top 0.5s ease-in, left 0.5s ease-in, transform 0.5s ease-in, opacity 0.5s ease-in';
        
        floatingEl.style.left = targetX + 'px';
        floatingEl.style.top = targetY + 'px';
        floatingEl.style.transform = 'translate(-50%, -50%) scale(0.3) rotate(0deg)'; // Shrink into the wallet
        floatingEl.style.opacity = '0.5';

    }, 500);
    
    // Cleanup
    setTimeout(() => {
        floatingEl.remove();
        // Trigger HUD bump exactly when it arrives
        DOM.money.parentElement.classList.remove('hud-money-pop');
        void DOM.money.parentElement.offsetWidth;
        DOM.money.parentElement.classList.add('hud-money-pop');
    }, 1000);
}

// Helper to add money and animate
export function addMoney(amount) {
    if (amount <= 0) return;
    if (gameState.arrested) return; // Stop money gain when arrested/game over
    
    // No points when speed is below 5% of max speed (prevents AFK farming)
    // Exception: on-foot / very slow vehicles should still be able to progress.
    const max = Math.max(0.0001, gameState.maxSpeed || 1);
    const speedPercent = Math.abs(gameState.speed) / max;
    const isVerySlow = max <= 3; // on-foot is 2.5
    if (!isVerySlow && speedPercent < 0.05) return;
    
    gameState.money += amount;
    
    // Animate HUD money
    if (DOM.money && DOM.money.parentElement) {
        // Find the wrapper we added in index.html for animation targeting
        // The structure changed to .money-container > .money-row > .money-value > span#money
        const container = /** @type {HTMLElement|null} */ (DOM.money.closest('.money-container')); 
        if(container) {
             container.classList.remove('hud-money-pop');
             void container.offsetWidth; 
             container.classList.add('hud-money-pop');
        } else {
             // Fallback
             DOM.money.parentElement.classList.remove('hud-money-pop');
             void DOM.money.parentElement.offsetWidth;
             DOM.money.parentElement.classList.add('hud-money-pop');
        }
    }
}

export function showGameOver(customMessage) {
    // Stop engine and drift sounds immediately
    stopEngineSound();
    stopDriftSound();
    
    // Remove all police cars
    gameState.policeCars.forEach(car => scene.remove(car));
    gameState.policeCars = [];
    
    // Remove collectibles
    gameState.collectibles.forEach(coin => scene.remove(coin));
    gameState.collectibles = [];
    
    // Remove projectiles
    gameState.projectiles.forEach(proj => scene.remove(proj));
    gameState.projectiles = [];

    DOM.gameOverMessage.textContent = customMessage || 'Du blev fanget af politiet og sat i fængsel!';
    DOM.gameOver.style.display = 'block';
    
    // Newspaper Headline (New Feature)
    const newspaperElement = document.getElementById('newspaper');
    if (newspaperElement) {
        // Reset to loading state
        document.getElementById('newspaperHeadline').textContent = "TRYKKER EKSTRA OPLAG...";
        document.getElementById('newspaperSubhead').textContent = "Vent venligst...";
        
        // Reset animation
        newspaperElement.classList.remove('newspaper-animation');
        void newspaperElement.offsetWidth; // Trigger reflow
        newspaperElement.classList.add('newspaper-animation');
        
        newspaperElement.style.display = 'block';

        generateNewspaper({
            time: gameState.elapsedTime,
            policeKilled: gameState.policeKilled,
            heatLevel: gameState.heatLevel,
            money: gameState.money,
            maxSpeed: Math.round((gameState.maxSpeedAchieved || 0) * 3.6) // Assuming we track this, or just current speed
        }).then(paper => {
            document.getElementById('newspaperHeadline').textContent = paper.headline;
            document.getElementById('newspaperSubhead').textContent = paper.subheadline;
        });
    }

    // Judge Verdict
    const judgeElement = document.getElementById('judgeVerdict');
    if (judgeElement) {
        judgeElement.style.display = 'flex';
        judgeElement.textContent = 'Dommeren voterer...';
        
        generateVerdict({
            time: gameState.elapsedTime,
            policeKilled: gameState.policeKilled,
            heatLevel: gameState.heatLevel,
            money: gameState.money
        }).then(verdict => {
            judgeElement.textContent = verdict;
        });
    }
    
    // Show/hide rejoin button based on multiplayer state
    const rejoinBtn = document.getElementById('gameOverRejoinBtn');
    if (rejoinBtn) {
        rejoinBtn.style.display = gameState.isMultiplayer ? 'inline-block' : 'none';
    }
    
    // Show multiplayer shop button
    const mpShopBtn = document.getElementById('gameOverMpShopBtn');
    if (mpShopBtn) {
        mpShopBtn.style.display = gameState.isMultiplayer ? 'inline-block' : 'none';
    }
    
    // Animated counting for stats
    const finalTime = Math.round(gameState.elapsedTime);
    const finalMoney = gameState.money;
    
    // Bank the money immediately so it's available in Shop and persisted
    if (finalMoney > 0) {
        gameState.totalMoney = (gameState.totalMoney || 0) + finalMoney;
        gameState.money = 0; // Reset run money so we don't double count
        saveProgress();
    }
    
    const finalKilled = gameState.policeKilled || 0;
    const finalHeat = gameState.heatLevel;
    
    // Save High Score
    saveHighScore(finalTime);

    // Reset values for animation
    DOM.gameOverTime.textContent = '0';
    DOM.gameOverMoney.textContent = '0';
    DOM.gameOverPoliceKilled.textContent = '0';
    DOM.gameOverMaxHeat.textContent = '1';
    
    // Animate each stat with delay
    setTimeout(() => animateCount(DOM.gameOverTime, finalTime, 600), 200);
    setTimeout(() => animateCount(DOM.gameOverMoney, finalMoney, 800), 400);
    setTimeout(() => animateCount(DOM.gameOverPoliceKilled, finalKilled, 500), 600);
    setTimeout(() => animateCount(DOM.gameOverMaxHeat, finalHeat, 300), 800);
}

function animateCount(element, target, duration) {
    const start = parseInt(element.textContent) || 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (target - start) * eased);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Track if we're in multiplayer shop mode (for respawn with new car)
let multiplayerShopMode = false;
let onMultiplayerCarSelected = null;
let onCarSelectionChanged = null; // For syncing car selection to network

export function setMultiplayerShopCallback(cb) {
    onMultiplayerCarSelected = cb;
}

export function setOnCarSelectionChanged(cb) {
    onCarSelectionChanged = cb;
}

export function goToShop(isMultiplayerRespawn = false) {
    multiplayerShopMode = isMultiplayerRespawn;
    
    // Safely transfer session money to total money
    if (gameState.money > 0) {
        gameState.totalMoney += gameState.money;
        gameState.money = 0; // Prevent double counting
        
        saveProgress();
    }
    
    DOM.shop.style.display = 'flex';
    
    // Show/hide respawn notice
    const respawnNotice = document.getElementById('respawnNotice');
    if (respawnNotice) {
        respawnNotice.style.display = isMultiplayerRespawn ? 'block' : 'none';
    }
    
    // Update play button text for multiplayer
    if (DOM.playBtn) {
        if (isMultiplayerRespawn || gameState.isMultiplayer) {
            DOM.playBtn.textContent = '🚀 SPAWN';
        } else {
            DOM.playBtn.textContent = '🚀 KØR NU';
        }
    }
    
    initShopTabs();
    renderShop();
}

export function isInMultiplayerShopMode() {
    return multiplayerShopMode;
}

// Shop category filter
let currentShopCategory = 'all';

function getCarCategory(key, car) {
    if (car.type === 'tank' || car.type === 'ufo' || car.reqRebirth) return 'special';
    if (car.price >= 50000) return 'premium';
    if (car.price >= 5000) return 'sport';
    if (car.price < 5000) return 'budget';
    return 'all';
}

function initShopTabs() {
    const tabs = document.querySelectorAll('.shop-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentShopCategory = /** @type {HTMLElement} */ (tab).dataset.category;
            renderShop();
        });
    });
}

function updateTabCounts() {
    let counts = { all: 0, budget: 0, sport: 0, premium: 0, special: 0 };
    
    Object.entries(cars).forEach(([key, car]) => {
        if (car.reqRebirth && (gameState.rebirthPoints || 0) < car.reqRebirth) return;
        counts.all++;
        const cat = getCarCategory(key, car);
        if (counts[cat] !== undefined) counts[cat]++;
    });
    
    Object.entries(counts).forEach(([cat, count]) => {
        const el = document.getElementById(`tabCount${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
        if (el) el.textContent = String(count);
    });
}

export function renderShop() {
    DOM.shopMoney.textContent = gameState.totalMoney.toLocaleString();
    DOM.carList.innerHTML = '';
    
    updateTabCounts();

    // Rebirth Button logic
    if (currentShopCategory === 'all' || currentShopCategory === 'special') {
        if (gameState.heatLevel >= 6 && gameState.totalMoney >= 200000 && (gameState.rebirthPoints || 0) < 5) {
            const rebirthBtn = document.createElement('div');
            rebirthBtn.className = 'carCard';
            rebirthBtn.style.background = 'linear-gradient(135deg, rgba(255,0,255,0.2) 0%, rgba(0,255,255,0.2) 100%)';
            rebirthBtn.style.borderColor = 'rgba(255,0,255,0.5)';
            rebirthBtn.innerHTML = `
                <div class="car-preview-box" style="background: linear-gradient(135deg, #1a0a1a 0%, #0a1a1a 100%);">
                    <div style="font-size: 48px; animation: pulse 2s infinite;">✨</div>
                </div>
                <div class="card-content">
                    <h3>REBIRTH SYSTEM <span class="car-type-badge special">PRESTIGE</span></h3>
                    <div class="stats-container" style="text-align: center; color: #aaa;">
                        <p style="margin: 5px 0;">🔥 Kræver: Heat 6 + 200.000 kr</p>
                        <p style="margin: 5px 0;">🎁 Belønning: Special biler + 2x Penge</p>
                        <p style="margin: 5px 0; color: #ff00ff;">Rebirth Points: ${gameState.rebirthPoints || 0}/5</p>
                    </div>
                </div>
                <div class="card-footer">
                    <span class="price-tag" style="color: #ff00ff;">200.000 kr</span>
                    <span class="action-indicator" style="background: linear-gradient(135deg, #ff00ff, #00ffff); color: #000;">REBIRTH NU</span>
                </div>
            `;
            rebirthBtn.addEventListener('click', () => {
                 if (confirm('Er du sikker? Dette nulstiller dine biler og penge, men låser op for nyt indhold!')) {
                     performRebirth();
                 }
            });
            DOM.carList.appendChild(rebirthBtn);
        }
    }

    Object.entries(cars).forEach(([key, car]) => {
        // Filter Rebirth Cars
        if (car.reqRebirth && (gameState.rebirthPoints || 0) < car.reqRebirth) return;
        
        // Filter by category
        const carCategory = getCarCategory(key, car);
        if (currentShopCategory !== 'all' && carCategory !== currentShopCategory) return;

        const owned = gameState.ownedCars && gameState.ownedCars[key];
        const isSelected = gameState.selectedCar === key;
        const canAfford = gameState.totalMoney >= car.price;
        
        // In multiplayer respawn mode, only show owned cars
        if (multiplayerShopMode && !owned) return;
        
        const carCard = document.createElement('div');
        carCard.dataset.key = key;
        
        // Base classes
        let classes = ['carCard'];
        if (owned) classes.push('owned');
        if (isSelected) classes.push('selected');
        if (!owned) {
            if (canAfford) classes.push('affordable');
            else classes.push('expensive');
        }
        carCard.className = classes.join(' ');

        // Visualizing Stats (normalized approx)
        const maxSpeedPct = Math.min((car.maxSpeed / 200) * 100, 100); 
        const accelPct = Math.min((car.acceleration / 1.5) * 100, 100);
        const handlePct = Math.min((car.handling / 0.2) * 100, 100);
        const healthPct = Math.min((car.health || 100) / 500 * 100, 100);
        
        const colorHex = '#' + car.color.toString(16).padStart(6, '0');
        const darkerColor = darkenColor(colorHex, 40);

        let actionText = '';
        let actionIcon = '';
        if (isSelected) { actionText = 'VALGT'; actionIcon = '✓'; }
        else if (owned) { actionText = 'VÆLG'; actionIcon = '→'; }
        else if (canAfford) { actionText = 'KØB'; actionIcon = '🛒'; }
        else { actionText = 'LÅST'; actionIcon = '🔒'; }

        // Price display logic
        const priceDisplay = owned ? "EJET" : `${car.price.toLocaleString()} kr`;
        
        // Category badge
        let categoryBadge = '';
        const badgeClass = carCategory === 'special' ? 'special' : '';
        if (carCategory === 'special') categoryBadge = `<span class="car-type-badge ${badgeClass}">SPECIAL</span>`;
        else if (carCategory === 'premium') categoryBadge = `<span class="car-type-badge">PREMIUM</span>`;
        else if (carCategory === 'sport') categoryBadge = `<span class="car-type-badge">SPORT</span>`;

        const vehicleType = car.type || key;
        const previewHTML = (() => {
            // Keep the same "garage" framing, but swap the model depending on vehicle type.
            if (vehicleType === 'onfoot') {
                return `
                    <div class="car-preview-box preview-onfoot">
                        <div class="floor-grid"></div>
                        <div class="vehicle-model vehicle-onfoot" style="--accent:${colorHex};">
                            <div class="person-head"></div>
                            <div class="person-body"></div>
                            <div class="person-leg left"></div>
                            <div class="person-leg right"></div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'bicycle') {
                return `
                    <div class="car-preview-box preview-bike">
                        <div class="floor-grid"></div>
                        <div class="vehicle-model vehicle-bike" style="--accent:${colorHex};">
                            <div class="bike-wheel left"></div>
                            <div class="bike-wheel right"></div>
                            <div class="bike-frame"></div>
                            <div class="bike-handle"></div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'scooter_electric') {
                return `
                    <div class="car-preview-box preview-scooter-electric">
                        <div class="floor-grid"></div>
                        <div class="vehicle-model vehicle-scooter-electric" style="--accent:${colorHex};">
                            <div class="kick-wheel left"></div>
                            <div class="kick-wheel right"></div>
                            <div class="kick-deck"></div>
                            <div class="kick-stem"></div>
                            <div class="kick-handle"></div>
                            <div class="kick-front"></div>
                            <div class="kick-rider-head"></div>
                            <div class="kick-rider-body"></div>
                            <div class="kick-rider-leg front"></div>
                            <div class="kick-rider-leg back"></div>
                            <div class="kick-rider-arm"></div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'scooter') {
                return `
                    <div class="car-preview-box preview-scooter">
                        <div class="floor-grid"></div>
                        <div class="vehicle-model vehicle-scooter" style="--accent:${colorHex};">
                            <div class="scooter-wheel left"></div>
                            <div class="scooter-wheel right"></div>
                            <div class="scooter-body"></div>
                            <div class="scooter-front"></div>
                            <div class="scooter-seat"></div>
                            <div class="scooter-floor"></div>
                            <div class="scooter-stem"></div>
                            <div class="scooter-handle"></div>
                            <div class="scooter-headlight"></div>
                            <div class="scooter-taillight"></div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'tank') {
                return `
                    <div class="car-preview-box preview-tank">
                        <div class="floor-grid"></div>
                        <div class="vehicle-model vehicle-tank" style="--accent:${colorHex};">
                            <div class="tank-body"></div>
                            <div class="tank-turret"></div>
                            <div class="tank-barrel"></div>
                            <div class="tank-track left"></div>
                            <div class="tank-track right"></div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'monstertruck') {
                return `
                    <div class="car-preview-box preview-monstertruck">
                        <div class="floor-grid"></div>
                        <div class="vehicle-model vehicle-monstertruck" style="--accent:${colorHex};">
                            <div class="truck-body" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkerColor} 100%);"></div>
                            <div class="truck-cabin" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkerColor} 100%);"></div>
                            <div class="monster-wheel front-left"></div>
                            <div class="monster-wheel front-right"></div>
                            <div class="monster-wheel back-left"></div>
                            <div class="monster-wheel back-right"></div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'buggy') {
                return `
                    <div class="car-preview-box preview-buggy">
                        <div class="floor-grid"></div>
                        <div class="car-model-3d">
                            <div class="car-body buggy-body" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkerColor} 100%);">
                                <div class="buggy-roll-cage"></div>
                                <div class="car-wheel front-left"></div>
                                <div class="car-wheel front-right"></div>
                                <div class="car-wheel back-left"></div>
                                <div class="car-wheel back-right"></div>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'pickup') {
                return `
                    <div class="car-preview-box preview-pickup">
                        <div class="floor-grid"></div>
                        <div class="car-model-3d">
                            <div class="car-body pickup-body" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkerColor} 100%);">
                                <div class="pickup-bed"></div>
                                <div class="car-wheel front-left"></div>
                                <div class="car-wheel front-right"></div>
                                <div class="car-wheel back-left"></div>
                                <div class="car-wheel back-right"></div>
                                <div class="car-headlight left"></div>
                                <div class="car-headlight right"></div>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'rally') {
                return `
                    <div class="car-preview-box preview-rally">
                        <div class="floor-grid"></div>
                        <div class="car-model-3d">
                            <div class="car-body rally-body" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkerColor} 100%);">
                                <div class="rally-spoiler"></div>
                                <div class="rally-hood-scoop"></div>
                                <div class="car-wheel front-left"></div>
                                <div class="car-wheel front-right"></div>
                                <div class="car-wheel back-left"></div>
                                <div class="car-wheel back-right"></div>
                                <div class="car-headlight left"></div>
                                <div class="car-headlight right"></div>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'hotrod') {
                return `
                    <div class="car-preview-box preview-hotrod">
                        <div class="floor-grid"></div>
                        <div class="car-model-3d">
                            <div class="car-body hotrod-body" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkerColor} 100%);">
                                <div class="hotrod-engine"></div>
                                <div class="hotrod-exhaust"></div>
                                <div class="car-wheel front-left"></div>
                                <div class="car-wheel front-right"></div>
                                <div class="car-wheel back-left"></div>
                                <div class="car-wheel back-right"></div>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'formula') {
                return `
                    <div class="car-preview-box preview-formula">
                        <div class="floor-grid"></div>
                        <div class="car-model-3d">
                            <div class="car-body formula-body" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkerColor} 100%);">
                                <div class="formula-nose"></div>
                                <div class="formula-wing-front"></div>
                                <div class="formula-wing-back"></div>
                                <div class="formula-cockpit"></div>
                                <div class="car-wheel front-left"></div>
                                <div class="car-wheel front-right"></div>
                                <div class="car-wheel back-left"></div>
                                <div class="car-wheel back-right"></div>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (vehicleType === 'ufo') {
                return `
                    <div class="car-preview-box preview-ufo">
                        <div class="floor-grid"></div>
                        <div class="vehicle-model vehicle-ufo" style="--accent:${colorHex};">
                            <div class="ufo-disc"></div>
                            <div class="ufo-dome"></div>
                            <div class="ufo-lights"></div>
                        </div>
                    </div>
                `;
            }
            // Default: car preview
            return `
                <div class="car-preview-box">
                    <div class="floor-grid"></div>
                    <div class="car-model-3d">
                        <div class="car-body" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkerColor} 100%);">
                            <div class="car-wheel front-left"></div>
                            <div class="car-wheel front-right"></div>
                            <div class="car-wheel back-left"></div>
                            <div class="car-wheel back-right"></div>
                            <div class="car-headlight left"></div>
                            <div class="car-headlight right"></div>
                            <div class="car-taillight left"></div>
                            <div class="car-taillight right"></div>
                        </div>
                    </div>
                </div>
            `;
        })();

        carCard.innerHTML = `
            ${previewHTML}
            <div class="carCard-status ${owned ? 'status-owned' : (canAfford ? 'status-available' : 'status-locked')}">
                ${owned ? 'Owned' : (canAfford ? 'Available' : 'Locked')}
            </div>

            <div class="card-content">
                <div class="carCard-titleRow">
                    <div class="carCard-titleBlock">
                        <div class="carCard-sku">${key.toUpperCase()}</div>
                        <h3 class="carCard-name">${car.name}</h3>
                        <div class="carCard-subtitle">${car.type || 'Vehicle'} • ${carCategory}</div>
                    </div>
                    <div class="carCard-badges">${categoryBadge}</div>
                </div>

                <div class="carCard-meta">
                    <div class="carCard-metaItem">
                        <div class="carCard-metaLabel">Speed</div>
                        <div class="carCard-metaValue">${Math.round(car.maxSpeed * 3.6)} km/h</div>
                    </div>
                    <div class="carCard-metaItem">
                        <div class="carCard-metaLabel">Accel</div>
                        <div class="carCard-metaValue">${(car.acceleration * 10).toFixed(1)}s</div>
                    </div>
                    <div class="carCard-metaItem">
                        <div class="carCard-metaLabel">Handling</div>
                        <div class="carCard-metaValue">${(car.handling * 100).toFixed(0)}%</div>
                    </div>
                    <div class="carCard-metaItem">
                        <div class="carCard-metaLabel">Health</div>
                        <div class="carCard-metaValue">${car.health || 100}</div>
                    </div>
                </div>
            </div>

            <div class="card-footer carCard-footerCompact">
                <div class="carCard-priceBlock">
                    <div class="carCard-priceLabel">Total Price</div>
                    <div class="price-tag" style="color: ${owned ? '#88ff88' : (canAfford ? '#fff' : '#ff5555')};">${priceDisplay}</div>
                </div>
                <button class="carCard-cta" type="button">${owned ? 'Select' : (canAfford ? 'Add' : 'Locked')}</button>
            </div>
        `;

        carCard.addEventListener('click', () => {
            window.openCarDetail(key, car);
        });

        DOM.carList.appendChild(carCard);
    });
}

function performRebirth() {
    gameState.rebirthPoints = (gameState.rebirthPoints || 0) + 1;
    gameState.totalMoney = 150; // Startpenge til nyt køretøj
    gameState.money = 0;
    gameState.ownedCars = {};   // Ingen gratis biler
    gameState.selectedCar = 'onfoot'; // Start på fods
    
    saveProgress();

    // Reset Game State but keep Rebirth Points
    if (startGameCallback) startGameCallback();
    
    // Change World Appearance?
    if (gameState.rebirthPoints > 0) {
        scene.fog = new THREE.FogExp2(0x110033, 0.002); // Purple fog
        renderer.setClearColor(0x110033);
        
        // Show unlocked message
        alert(`REBIRTH SUCCESSFUL! Count: ${gameState.rebirthPoints}\nNew Cars Unlocked!\nMoney gained is doubled!`);
    }
}

export function updateHealthUI() {
    if (DOM.healthValue) DOM.healthValue.textContent = String(Math.ceil(gameState.health));
    if (DOM.healthFill) {
        DOM.healthFill.style.width = Math.max(0, gameState.health) + '%';
        DOM.healthFill.style.background = gameState.health < 30 ? '#ff0000' : (gameState.health < 60 ? '#ffa500' : '#00ff00');
    }
}

export function triggerDamageEffect() {
    if(DOM.status){
        DOM.status.style.color = 'red';
        setTimeout(() => { 
            if (!gameState.arrested && DOM.status.textContent !== 'I FARE!') {
                DOM.status.style.color = '#00ff00'; 
            } else if (DOM.status.textContent === 'I FARE!') {
                 DOM.status.style.color = '#ff0000';
            }
        }, 200);
    }
    flashDamage();
}

export function flashDamage() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(255, 0, 0, 0.4);
        pointer-events: none;
        z-index: 1000;
        animation: flashFade 0.3s ease-out forwards;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 300);
}

// Add CSS animation for flash
if (!document.getElementById('damageFlashStyle')) {
    const style = document.createElement('style');
    style.id = 'damageFlashStyle';
    style.textContent = `
        @keyframes flashFade {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// NEW SHOP UI LOGIC (MASTER-DETAIL)
// ==========================================

window.switchShopView = function(view) {
    const catalog = document.getElementById('shopCatalogView');
    const detail = document.getElementById('shopDetailView');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    if (view === 'catalog') {
        if(catalog && detail) {
            catalog.classList.replace('view-hidden', 'view-active');
            detail.classList.replace('view-active', 'view-hidden');
        }
        
        // Update Sidebar
        sidebarItems.forEach(i => i.classList.remove('active'));
        // Find the Biler item (first one usually)
        if (sidebarItems[0]) sidebarItems[0].classList.add('active');
        
    } else if (view === 'detail') {
        if(catalog && detail) {
            catalog.classList.replace('view-active', 'view-hidden');
            detail.classList.replace('view-hidden', 'view-active');
        }
        
        // Update Sidebar state? Maybe unselect Biler or keep it selected as parent category
        // sidebarItems.forEach(i => i.classList.remove('active'));
    }
};

window.closeCarDetail = function() {
    window.switchShopView('catalog');
    
    // Restore focus to the card we just viewed
    if (currentDetailKey) {
        const card = document.querySelector(`.carCard[data-key="${currentDetailKey}"]`);
        if (card) {
            // Remove focus from other elements
            if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
            
            card.focus();
            // Also add keyboard-selected class which menu.js uses
            document.querySelectorAll('.keyboard-selected').forEach(el => el.classList.remove('keyboard-selected'));
            card.classList.add('keyboard-selected');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
};

let currentDetailKey = null;

// Helper to update big stats
function updateDetailStats(car) {
    const statsContainer = document.getElementById('detailStats');
    if (!statsContainer) return;
    
    const maxSpeedPct = Math.min((car.maxSpeed / 200) * 100, 100); 
    const accelPct = Math.min((car.acceleration / 1.5) * 100, 100);
    const handlePct = Math.min((car.handling / 0.2) * 100, 100);
    const healthPct = Math.min((car.health || 100) / 500 * 100, 100);
    
    statsContainer.innerHTML = `
        <div class="stat-row" style="font-size: 14px;">
            <span class="stat-icon">⚡</span>
            <span class="stat-label" style="width: 80px;">TOP SPEED</span>
            <div class="stat-bar-bg" style="height: 12px; background: #333;"><div class="stat-bar-fill speed" style="width: ${maxSpeedPct}%"></div></div>
            <span class="stat-value">${Math.round(car.maxSpeed * 3.6)} km/h</span>
        </div>
        <div class="stat-row" style="font-size: 14px;">
            <span class="stat-icon">🚀</span>
            <span class="stat-label" style="width: 80px;">0-100</span>
            <div class="stat-bar-bg" style="height: 12px; background: #333;"><div class="stat-bar-fill accel" style="width: ${accelPct}%"></div></div>
            <span class="stat-value">${(car.acceleration * 10).toFixed(1)}s</span>
        </div>
        <div class="stat-row" style="font-size: 14px;">
            <span class="stat-icon">🎯</span>
            <span class="stat-label" style="width: 80px;">HANDLING</span>
            <div class="stat-bar-bg" style="height: 12px; background: #333;"><div class="stat-bar-fill handle" style="width: ${handlePct}%"></div></div>
            <span class="stat-value">${(car.handling * 100).toFixed(0)}%</span>
        </div>
        <div class="stat-row" style="font-size: 14px;">
            <span class="stat-icon">❤️</span>
            <span class="stat-label" style="width: 80px;">DURABILITY</span>
            <div class="stat-bar-bg" style="height: 12px; background: #333;"><div class="stat-bar-fill health" style="width: ${healthPct}%"></div></div>
            <span class="stat-value">${car.health || 100}</span>
        </div>
    `;
}

window.openCarDetail = function(key, car) {
    currentDetailKey = key;
    
    // Update Info
    const nameEl = document.getElementById('detailName');
    const descEl = document.getElementById('detailDesc');
    const priceEl = document.getElementById('detailPrice');
    
    if(nameEl) nameEl.textContent = car.name;
    if(descEl) descEl.textContent = car.description || "A custom vehicle with unique handling characteristics. Perfect for high-speed evasion.";
    if(priceEl) priceEl.textContent = `${car.price.toLocaleString()} KR`;
    
    // Generate Badges
    const badgeContainer = document.getElementById('detailBadges');
    if (badgeContainer) {
        badgeContainer.innerHTML = '';
        // We don't have getCarCategory logic exposed easily here unless we import it or replicate it.
        // It's in 'ui.js' scope, so we are fine if this function is inside ui.js.
        // But getCarCategory might be a local helper function at the top of ui.js?
        // Let's check. If it's not global, we might need to rely on car props.
        if (car.reqRebirth) badgeContainer.innerHTML += '<span class="car-type-badge special">SPECIAL</span>';
        else if (car.price >= 50000) badgeContainer.innerHTML += '<span class="car-type-badge">PREMIUM</span>';
        else if (car.speed >= 1.2) badgeContainer.innerHTML += '<span class="car-type-badge">SPORT</span>';
    }
    
    updateDetailStats(car);
    
    // Update Button State
    const btn = document.getElementById('detailActionBtn');
    if (btn) {
        // Clone button to remove old listeners
        const newBtn = /** @type {HTMLButtonElement} */ (btn.cloneNode(true));
        btn.parentNode.replaceChild(newBtn, btn);
        
        const updateBtnState = () => {
            const isOwned = gameState.ownedCars && gameState.ownedCars[key];
            const isSel = gameState.selectedCar === key;
            const canAfford = gameState.totalMoney >= car.price;
            
            if (isOwned) {
                newBtn.textContent = isSel ? "VALGT" : "VÆLG BIL";
                newBtn.className = 'action-btn';
                newBtn.style.background = isSel ? '#00ff66' : '#fff'; 
                newBtn.disabled = isSel;
            } else {
                newBtn.textContent = canAfford ? "KØB NU" : "IKKE RÅD";
                newBtn.className = canAfford ? 'action-btn' : 'action-btn disabled';
                newBtn.style.background = canAfford ? '#fff' : '#333';
                if (!canAfford) newBtn.disabled = true; else newBtn.disabled = false;
            }
        };
        
        updateBtnState();
        
        newBtn.addEventListener('click', () => {
            const isOwned = gameState.ownedCars && gameState.ownedCars[key];
            const canAfford = gameState.totalMoney >= car.price;
            
            if (isOwned) {
                gameState.selectedCar = key;
                updateCarStats(key);
                updateBtnState();
                renderShop();
                if (onMultiplayerCarSelected) onMultiplayerCarSelected(key);
                if (onCarSelectionChanged) onCarSelectionChanged(key);
            } else if (canAfford) {
                if(confirm(`Køb ${car.name}?`)) {
                    gameState.totalMoney -= car.price;
                    if (!gameState.ownedCars) gameState.ownedCars = {};
                    gameState.ownedCars[key] = true;
                    gameState.selectedCar = key;
                    saveProgress();
                    updateCarStats(key);
                    updateBtnState();
                    renderShop();
                    if (onMultiplayerCarSelected) onMultiplayerCarSelected(key);
                    if (onCarSelectionChanged) onCarSelectionChanged(key);
                }
            }
        });
        
        // Auto focus for keyboard navigation
        setTimeout(() => newBtn.focus(), 50);
    }

    // Update 3D Preview
    const container = document.getElementById('detail3DContainer');
    if (container) {
        // Helper to find the matching card preview
        const cards = document.querySelectorAll('.carCard');
        /** @type {HTMLElement|null} */
        let targetCard = null;
        cards.forEach(c => {
            const title = c.querySelector('h3');
            if (title && title.textContent.includes(car.name)) targetCard = /** @type {HTMLElement} */ (c);
        });
        
        if (targetCard) {
            container.innerHTML = '';
            const previewBox = targetCard.querySelector('.car-preview-box').cloneNode(true);
            /** @type {HTMLElement} */ (previewBox).classList.remove('preview-onfoot', 'preview-bike', 'preview-scooter'); 
            // Add a class that might help centering or scaling if needed
            container.appendChild(previewBox);
        }
    }
    
    window.switchShopView('detail');
};
