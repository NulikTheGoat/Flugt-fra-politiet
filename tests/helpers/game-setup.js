// @ts-check
const { expect } = require('@playwright/test');

/**
 * Shared test helper for game setup
 * Provides robust, CI-friendly game initialization
 */

/**
 * Navigate to game and wait for initial load
 * @param {import('@playwright/test').Page} page
 */
async function navigateToGame(page) {
    await page.goto('/');
    
    // Wait for Three.js canvas to be present
    await page.waitForSelector('canvas', { timeout: 20000 });
    
    // Small delay for WebGL context initialization
    await page.waitForTimeout(500);
}

/**
 * Click the solo mode button to start game
 * Uses force:true to bypass any potential overlays
 * @param {import('@playwright/test').Page} page
 */
async function clickSoloMode(page) {
    const soloBtn = page.locator('#soloModeBtn');
    
    // Wait for button to be visible
    await expect(soloBtn).toBeVisible({ timeout: 15000 });
    
    // Try clicking with retries
    let clicked = false;
    for (let attempt = 0; attempt < 3 && !clicked; attempt++) {
        try {
            // Use force:true to bypass any potential overlay issues on CI
            await soloBtn.click({ force: true, timeout: 10000 });
            clicked = true;
        } catch (e) {
            console.log(`Click attempt ${attempt + 1} failed, retrying...`);
            await page.waitForTimeout(500);
        }
    }
    
    if (!clicked) {
        // Final attempt with JavaScript click as fallback
        await page.evaluate(() => {
            const btn = document.querySelector('#soloModeBtn');
            if (btn) btn.click();
        });
    }
}

/**
 * Wait for game state to be fully initialized
 * @param {import('@playwright/test').Page} page
 */
async function waitForGameReady(page) {
    // Wait for game state to exist and have required properties
    await page.waitForFunction(
        () => {
            const gs = window.gameState;
            return gs && 
                   gs.startTime > 0 && 
                   gs.maxSpeed !== undefined &&
                   gs.chunkGrid && 
                   Object.keys(gs.chunkGrid).length > 0;
        },
        { timeout: 20000, polling: 200 }
    );
    
    // Wait for HUD to be rendered
    await page.waitForFunction(
        () => !!document.querySelector('#speed'),
        { timeout: 10000, polling: 200 }
    );
    
    // Small buffer for UI stabilization
    await page.waitForTimeout(300);
}

/**
 * Full game setup - navigate, click solo, wait for ready
 * Use this in test.beforeEach for consistent setup
 * @param {import('@playwright/test').Page} page
 */
async function setupGame(page) {
    await navigateToGame(page);
    await clickSoloMode(page);
    await waitForGameReady(page);
}

/**
 * Cleanup game state after test
 * Use this in test.afterEach for proper isolation
 * @param {import('@playwright/test').Page} page
 */
async function cleanupGame(page) {
    await page.evaluate(() => {
        // Release any held keys
        if (window.gameState) {
            window.gameState.keysPressed = {};
        }
    });
}

/**
 * Press and hold a key for a duration
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 * @param {number} durationMs
 */
async function holdKey(page, key, durationMs) {
    await page.keyboard.down(key);
    await page.waitForTimeout(durationMs);
    await page.keyboard.up(key);
}

/**
 * Get current game state
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<Object>}
 */
async function getGameState(page) {
    return page.evaluate(() => ({
        speed: window.gameState?.speed,
        health: window.gameState?.health,
        money: window.gameState?.money,
        heatLevel: window.gameState?.heatLevel,
        maxSpeed: window.gameState?.maxSpeed,
        selectedCar: window.gameState?.selectedCar,
        x: window.gameState?.x,
        z: window.gameState?.z,
        rotation: window.gameState?.rotation,
        velocityX: window.gameState?.velocityX,
        velocityZ: window.gameState?.velocityZ,
        acceleration: window.gameState?.acceleration,
        handling: window.gameState?.handling,
        arrested: window.gameState?.arrested,
        startTime: window.gameState?.startTime
    }));
}

module.exports = {
    navigateToGame,
    clickSoloMode,
    waitForGameReady,
    setupGame,
    cleanupGame,
    holdKey,
    getGameState
};
