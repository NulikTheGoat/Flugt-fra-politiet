import { gameState } from './state.js';
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
    money: document.getElementById('money'),
    policeDistance: document.getElementById('policeDistance'),
    status: document.getElementById('status'),
    gameOver: document.getElementById('gameOver'),
    gameOverMessage: document.getElementById('gameOverMessage'),
    gameOverTime: document.getElementById('gameOverTime'),
    gameOverMoney: document.getElementById('gameOverMoney'),
    shop: document.getElementById('shop'),
    shopMoney: document.getElementById('shopMoney'),
    carList: document.getElementById('carList'),
    driftIndicator: document.getElementById('driftIndicator'),
    healthValue: document.getElementById('healthValue'),
    healthFill: document.getElementById('healthFill'),
    playBtn: document.getElementById('playBtn'),
    gameOverShopBtn: document.getElementById('gameOverShopBtn')
};


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
    
    // Style heat level
    const heatColor = ['#00ff00', '#99ff00', '#ffff00', '#ff8800', '#ff4400', '#ff0000'][gameState.heatLevel - 1] || '#ff0000';
    DOM.heatLevel.style.color = heatColor;

    gameState.elapsedTime = elapsedSeconds;

    // Give money every 10 seconds without being arrested (Passive)
    // Scale passive income with heat level: 100 * level
    if (elapsedSeconds > 0 && elapsedSeconds % 10 === 0 && (Date.now() - gameState.lastMoneyCheckTime) > 500) {
        const rebirthMult = (gameState.rebirthPoints || 0) + 1;
        addMoney((100 * gameState.heatLevel) * rebirthMult);
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

// Helper to add money and animate
export function addMoney(amount) {
    if (amount <= 0) return;
    if (gameState.arrested) return; // Stop money gain when arrested/game over
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
    DOM.gameOverTime.textContent = Math.round(gameState.elapsedTime);
    DOM.gameOverMoney.textContent = gameState.money;
    DOM.gameOver.style.display = 'block';
}

export function goToShop() {
    gameState.totalMoney += gameState.money;
    DOM.shop.style.display = 'flex';
    renderShop();
}

export function renderShop() {
    DOM.shopMoney.textContent = gameState.totalMoney;
    DOM.carList.innerHTML = '';

    // Rebirth Button logic
    if (gameState.heatLevel >= 6 && gameState.totalMoney >= 200000 && (gameState.rebirthPoints || 0) < 5) {
        const rebirthBtn = document.createElement('div');
        rebirthBtn.className = 'carCard'; // Reusing style
        rebirthBtn.style.background = 'linear-gradient(45deg, #FF00FF, #00FFFF)';
        rebirthBtn.innerHTML = `
            <h3>REBIRTH SYSTEM</h3>
            <p>Req: Heat 6 + 200k Money</p>
            <p>Reward: Special Cars + 2x Money Payout</p>
            <div class="card-footer">
                <span class="action-indicator">REBIRTH NOW</span>
            </div>
        `;
        rebirthBtn.addEventListener('click', () => {
             if (confirm('Are you sure? This will reset your cars and money but unlock new content!')) {
                 performRebirth();
             }
        });
        DOM.carList.appendChild(rebirthBtn);
    }

    Object.entries(cars).forEach(([key, car]) => {
        // Filter Rebirth Cars
        if (car.reqRebirth && (gameState.rebirthPoints || 0) < car.reqRebirth) return;

        const owned = gameState.ownedCars && gameState.ownedCars[key] || key === 'standard';
        const isSelected = gameState.selectedCar === key;
        const canAfford = gameState.totalMoney >= car.price;
        
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
        const maxSpeedPct = Math.min((car.maxSpeed / 160) * 100, 100); 
        const accelPct = Math.min((car.acceleration / 0.8) * 100, 100);
        const handlePct = Math.min((car.handling / 0.15) * 100, 100);
        
        const colorHex = '#' + car.color.toString(16).padStart(6, '0');

        let actionText = '';
        if (isSelected) actionText = 'VALGT';
        else if (owned) actionText = 'VÆLG';
        else if (canAfford) actionText = 'KØB';
        else actionText = 'LÅST';

        carCard.innerHTML = `
            <div class="car-preview-box">
                <div class="car-model-3d">
                    <div class="car-body" style="background: linear-gradient(135deg, ${colorHex} 0%, ${darkenColor(colorHex, 30)} 100%);">
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
            
            <h3>${car.name}</h3>
            
            <div class="stats-container">
                <div class="stat-row">
                    <span class="stat-label">Fart</span>
                    <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${maxSpeedPct}%"></div></div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Acc</span>
                    <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${accelPct}%"></div></div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Styr</span>
                    <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${handlePct}%"></div></div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">HP</span>
                    <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${Math.min(100, (car.health || 100) / 3)}%"></div></div>
                </div>
            </div>

            <div class="card-footer">
                <span class="price-tag">${car.price > 0 ? car.price + ' kr' : 'GRATIS'}</span>
                <span class="action-indicator">${actionText}</span>
            </div>
        `;

        carCard.addEventListener('click', () => {
            if (owned) {
                gameState.selectedCar = key;
                updateCarStats(key);
                renderShop();
            } else if (canAfford) {
                if(confirm(`Køb ${car.name} for ${car.price}kr?`)) {
                    gameState.totalMoney -= car.price;
                    // Mark as owned in memory (resets on page refresh)
                    if (!gameState.ownedCars) gameState.ownedCars = {};
                    gameState.ownedCars[key] = true;
                    gameState.selectedCar = key;
                    updateCarStats(key);
                    renderShop();
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
