// Game Configuration - Editable parameters
export const gameConfig = {
    // Heat level settings
    heatIncreaseInterval: 60,    // seconds between heat level increases (default: 60 = 1 minute)
    maxHeatLevel: 6,             // maximum heat level
    
    // Arrest settings
    arrestCountdownTime: 1,      // seconds before arrest when stopped near police (default: 1)
    arrestSpeedThreshold: 0.1,   // fraction of max speed below which arrest countdown starts (0.1 = 10%)
    touchArrest: true,           // if true, player is instantly arrested when police touches them
    
    // Collision damage settings
    playerCrashDamageMultiplier: 0.3,   // damage = speed * this value
    policeCrashDamageMultiplier: 0.4,   // damage to police = speed * this value
    minCrashDamage: 5,                  // minimum damage on collision
    
    // Police spawn settings
    policeSpawnInterval: 10,     // seconds between police spawns
    
    // Economy settings
    passiveIncomeInterval: 10,   // seconds between passive money gains
    passiveIncomeBase: 100,      // base money per interval (multiplied by heat level)
    coinBaseValue: 50,           // base value of coins
};

// Load config from localStorage if available
export function loadConfig() {
    const saved = localStorage.getItem('gameConfig');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(gameConfig, parsed);
        } catch (e) {
            console.warn('Failed to load saved config:', e);
        }
    }
}

// Save config to localStorage
export function saveConfig() {
    localStorage.setItem('gameConfig', JSON.stringify(gameConfig));
}

// Reset config to defaults
export function resetConfig() {
    gameConfig.heatIncreaseInterval = 60;
    gameConfig.maxHeatLevel = 6;
    gameConfig.arrestCountdownTime = 1;
    gameConfig.arrestSpeedThreshold = 0.1;
    gameConfig.touchArrest = true;
    gameConfig.playerCrashDamageMultiplier = 0.3;
    gameConfig.policeCrashDamageMultiplier = 0.4;
    gameConfig.minCrashDamage = 5;
    gameConfig.policeSpawnInterval = 10;
    gameConfig.passiveIncomeInterval = 10;
    gameConfig.passiveIncomeBase = 100;
    gameConfig.coinBaseValue = 50;
    saveConfig();
}

// Initialize config on load
loadConfig();
