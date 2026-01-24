import { gameState } from './state.js';
import { generateVerdict, generateNewspaper } from './commentary.js';
import { gameConfig } from './config.js';
import { clamp, darkenColor } from './utils.js';
import { cars } from './constants.js';
import { scene, renderer } from './core.js';
import { updateCarStats } from './player.js';

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
// HIGH SCORE SYSTEM
// ==========================================

function getHighScores() {
    try {
        const stored = localStorage.getItem('flugt_highscores');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to load highscores", e);
        return [];
    }
}

function saveHighScore(time) {
    if (!time || time < 1) return;
    
    let scores = getHighScores();
    
    // Check if score qualifies for top 5
    const qualifies = scores.length < 5 || time > scores[scores.length - 1].time;
    
    if (qualifies) {
        // Simple prompt for name
        let playerName = prompt("NY REKORD! Indtast dit navn:", "Anonym");
        if (!playerName || playerName.trim() === "") playerName = "Anonym";
        
        // Format date as DD/MM
        const date = new Date().toLocaleDateString('da-DK', { day: '2-digit', month: '2-digit' });
        
        scores.push({ name: playerName.substring(0, 10), time, date });
        
        // Sort descending by time
        scores.sort((a, b) => b.time - a.time);
        
        // Keep top 5
        scores = scores.slice(0, 5);
        
        localStorage.setItem('flugt_highscores', JSON.stringify(scores));
        updateHighScoreDisplay();
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
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            z-index: 1000;
            border: 1px solid #444;
            min-width: 280px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    const scores = getHighScores();
    if (scores.length === 0) {
        container.innerHTML = `<div style="text-align:center;color:#aaa;font-size:12px;">INGEN REKORDER</div>`;
        return;
    }

    let html = `<div style="text-align:center;font-weight:bold;margin-bottom:8px;border-bottom:1px solid #666;padding-bottom:4px;font-size:18px;color:#f1c40f;">TOP 5 TIDER</div>`;
    
    scores.forEach((score, index) => {
        const color = index === 0 ? '#ffd700' : (index === 1 ? '#c0c0c0' : (index === 2 ? '#cd7f32' : '#fff'));
        const name = score.name || 'Spiller';
        html += `
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:14px;margin-bottom:4px;color:${color};font-weight:bold;">
                <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:160px;">${index + 1}. ${name}</span>
                <span>${formatTime(score.time)}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Initial display load
document.addEventListener('DOMContentLoaded', updateHighScoreDisplay);

export function updateHUD(policeDistance) {
    const speedKmh = Math.round(gameState.speed * 3.6);
    DOM.speed.textContent = speedKmh;
    DOM.speedFill.style.width = clamp((gameState.speed / gameState.maxSpeed) * 100, 0, 100) + '%';

    if (gameState.speed > gameState.maxSpeedWarning) {
        DOM.speedFill.style.background = 'linear-gradient(to right, #ffff00, #ff0000)';
    } else {
        DOM.speedFill.style.background = 'linear-gradient(to right, #00ff00, #ffff00, #ff0000)';
    }
    
    // Drift indicator
    if (gameState.driftFactor > 0.3) {
        DOM.driftIndicator.style.display = 'block';
        DOM.driftIndicator.style.opacity = Math.min(1, gameState.driftFactor * 1.5);
    } else {
        DOM.driftIndicator.style.display = 'none';
    }

    // Update time and money
    let elapsedSeconds;
    if (gameState.arrested && gameState.elapsedTime) {
         elapsedSeconds = Math.floor(gameState.elapsedTime);
    } else {
         elapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
    }
    DOM.time.textContent = elapsedSeconds;
    DOM.heatLevel.textContent = gameState.heatLevel;
    
    // Count active and dead police cars
    const deadCount = gameState.policeCars.filter(c => c.userData.dead).length;
    const activeCount = gameState.policeCars.length - deadCount;
    DOM.policeCount.textContent = activeCount;
    DOM.deadPoliceCount.textContent = deadCount;
    
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

    DOM.money.textContent = gameState.money;

    if (policeDistance > 0) {
        DOM.policeDistance.textContent = Math.round(policeDistance);
        
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
    
    // No points when speed is below 5% of max speed
    const speedPercent = Math.abs(gameState.speed) / gameState.maxSpeed;
    if (speedPercent < 0.05) return;
    
    gameState.money += amount;
    
    // Animate HUD money
    DOM.money.parentElement.classList.remove('hud-money-pop');
    void DOM.money.parentElement.offsetWidth; // Trigger reflow to restart animation
    DOM.money.parentElement.classList.add('hud-money-pop');
}

export function showGameOver(customMessage) {
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

export function setMultiplayerShopCallback(cb) {
    onMultiplayerCarSelected = cb;
}

export function goToShop(isMultiplayerRespawn = false) {
    multiplayerShopMode = isMultiplayerRespawn;
    gameState.totalMoney += gameState.money;
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
            currentShopCategory = tab.dataset.category;
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
        if (el) el.textContent = count;
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

        const owned = gameState.ownedCars && gameState.ownedCars[key] || key === 'standard';
        const isSelected = gameState.selectedCar === key;
        const canAfford = gameState.totalMoney >= car.price;
        
        // In multiplayer respawn mode, only show owned cars
        if (multiplayerShopMode && !owned) return;
        
        const carCard = document.createElement('div');
        
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
        
        // Category badge
        let categoryBadge = '';
        const badgeClass = carCategory === 'special' ? 'special' : '';
        if (carCategory === 'special') categoryBadge = `<span class="car-type-badge ${badgeClass}">SPECIAL</span>`;
        else if (carCategory === 'premium') categoryBadge = `<span class="car-type-badge">PREMIUM</span>`;
        else if (carCategory === 'sport') categoryBadge = `<span class="car-type-badge">SPORT</span>`;

        carCard.innerHTML = `
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
            
            <div class="card-content">
                <h3>${car.name} ${categoryBadge}</h3>
                
                <div class="stats-container">
                    <div class="stat-row">
                        <span class="stat-icon">⚡</span>
                        <span class="stat-label">Fart</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill speed" style="width: ${maxSpeedPct}%"></div></div>
                        <span class="stat-value">${Math.round(car.maxSpeed * 3.6)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">🚀</span>
                        <span class="stat-label">Acc</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill accel" style="width: ${accelPct}%"></div></div>
                        <span class="stat-value">${(car.acceleration * 10).toFixed(1)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">🎯</span>
                        <span class="stat-label">Styr</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill handle" style="width: ${handlePct}%"></div></div>
                        <span class="stat-value">${(car.handling * 100).toFixed(0)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">❤️</span>
                        <span class="stat-label">HP</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill health" style="width: ${healthPct}%"></div></div>
                        <span class="stat-value">${car.health || 100}</span>
                    </div>
                </div>
            </div>

            <div class="card-footer">
                <span class="price-tag">${car.price > 0 ? car.price.toLocaleString() + ' kr' : 'GRATIS'}</span>
                <span class="action-indicator">${actionIcon} ${actionText}</span>
            </div>
        `;

        carCard.addEventListener('click', () => {
            if (owned) {
                gameState.selectedCar = key;
                updateCarStats(key);
                renderShop();
                
                // If in multiplayer shop mode, trigger respawn with this car
                if (multiplayerShopMode && onMultiplayerCarSelected) {
                    onMultiplayerCarSelected(key);
                }
            } else if (canAfford) {
                if(confirm(`Køb ${car.name} for ${car.price.toLocaleString()} kr?`)) {
                    gameState.totalMoney -= car.price;
                    // Mark as owned in memory (resets on page refresh)
                    if (!gameState.ownedCars) gameState.ownedCars = {};
                    gameState.ownedCars[key] = true;
                    gameState.selectedCar = key;
                    updateCarStats(key);
                    renderShop();
                    
                    // If in multiplayer shop mode, trigger respawn with newly purchased car
                    if (multiplayerShopMode && onMultiplayerCarSelected) {
                        onMultiplayerCarSelected(key);
                    }
                }
            }
        });

        DOM.carList.appendChild(carCard);
    });
}

function performRebirth() {
    gameState.rebirthPoints = (gameState.rebirthPoints || 0) + 1;
    gameState.totalMoney = 0;
    gameState.money = 0;
    gameState.ownedCars = { 'standard': true };
    gameState.selectedCar = 'standard';
    
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
    if (DOM.healthValue) DOM.healthValue.textContent = Math.ceil(gameState.health);
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
