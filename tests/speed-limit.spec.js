// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Speed Limit Tests
 * 
 * These tests verify that player car speed is correctly limited
 * according to the maxSpeed defined in constants.js
 * 
 * Expected values after fix:
 * - Standard car: maxSpeed = 22 (≈79 km/h)
 * - Sport car: maxSpeed = 30 (≈108 km/h)
 * etc.
 */

test.describe('Player Speed Limits', () => {
    
    test.beforeEach(async ({ page }) => {
        // Start the game with retry logic for CI reliability
        await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait for game to load (Three.js canvas should be present)
        await page.waitForSelector('canvas', { timeout: 30000 });
        
        // Wait for WebGL to initialize
        await page.waitForTimeout(500);
        
        // Wait for solo mode button to be visible and ready
        const soloBtn = page.locator('#soloModeBtn');
        await expect(soloBtn).toBeVisible({ timeout: 20000 });
        
        // Click solo mode to start the game (force:true for CI reliability)
        await soloBtn.click({ force: true });
        
        // Wait for game state to fully initialize (more reliable than selector)
        await page.waitForFunction(
            () => window.gameState && window.gameState.startTime > 0 && window.gameState.maxSpeed !== undefined,
            { timeout: 20000, polling: 200 }
        );
        
        // Wait for HUD element using polling (handles async rendering)
        await page.waitForFunction(
            () => !!document.querySelector('#speed'),
            { timeout: 15000, polling: 200 }
        );
        
        // Ensure game canvas has focus for input
        await page.click('canvas', { force: true });
        
        // Small buffer for UI to stabilize
        await page.waitForTimeout(500);
    });
    
    test.afterEach(async ({ page }) => {
        // Reset page state to ensure test isolation
        await page.evaluate(() => {
            // Release any held keys
            if (window.gameState) {
                window.gameState.keysPressed = {};
            }
        });
    });
    
    test('On foot should not exceed ~9 km/h (maxSpeed: 2.5)', async ({ page }) => {
        // Get initial game state
        const initialState = await page.evaluate(() => {
            return {
                maxSpeed: window.gameState?.maxSpeed,
                selectedCar: window.gameState?.selectedCar,
                speed: window.gameState?.speed
            };
        });
        
        console.log('Initial state:', initialState);
        
        const configuredMaxSpeed = initialState.maxSpeed || 2.5;
        
        // Hold W key to accelerate
        await page.keyboard.down('w');
        
        // Wait for speed to start increasing
        await page.waitForFunction(
            () => (window.gameState?.speed || 0) > 0.2,
            { timeout: 5000 }
        );
        
        // Continue accelerating for 3 seconds
        await page.waitForTimeout(3000);
        
        // Get final speed
        const finalState = await page.evaluate(() => {
            return {
                speed: window.gameState?.speed,
                speedKmh: Math.round((window.gameState?.speed || 0) * 3.6),
                maxSpeed: window.gameState?.maxSpeed,
                maxSpeedKmh: Math.round((window.gameState?.maxSpeed || 0) * 3.6)
            };
        });
        
        await page.keyboard.up('w');
        
        const maxSpeedReached = finalState.speed || 0;
        const maxSpeedKmh = finalState.speedKmh;
        const configuredMaxKmh = finalState.maxSpeedKmh;
        
        console.log(`\n=== RESULTS ===`);
        console.log(`Configured maxSpeed: ${configuredMaxSpeed} (${configuredMaxKmh} km/h)`);
        console.log(`Speed reached: ${maxSpeedReached.toFixed(2)} (${maxSpeedKmh} km/h)`);
        console.log(`Over limit: ${maxSpeedReached > configuredMaxSpeed ? 'YES ❌' : 'NO ✅'}`);
        
        // The speed should never exceed maxSpeed (with small tolerance for floating point)
        expect(maxSpeedReached).toBeLessThanOrEqual(configuredMaxSpeed * 1.01);
        
        // Also verify that maxSpeed was set correctly (2.5 for on foot)
        expect(configuredMaxSpeed).toBe(2.5);
    });
    
    test('Check gameState.maxSpeed is correctly set from constants (should be 2.5)', async ({ page }) => {
        const state = await page.evaluate(() => {
            return {
                gameStateMaxSpeed: window.gameState?.maxSpeed,
                gameStateAcceleration: window.gameState?.acceleration,
                gameStateSelectedCar: window.gameState?.selectedCar
            };
        });
        
        console.log('GameState values:', state);
        
        // On foot should have maxSpeed of 2.5 (from constants.js)
        expect(state.gameStateMaxSpeed).toBe(2.5);
        expect(state.gameStateSelectedCar).toBe('onfoot');
        expect(state.gameStateAcceleration).toBe(0.02);
    });
    
    test('Debug: Log all speed-related state during acceleration', async ({ page }) => {
        // Press W to start accelerating
        await page.keyboard.down('w');
        
        // Log detailed state every frame for 5 seconds
        const debugLog = await page.evaluate(async () => {
            const logs = [];
            const startTime = Date.now();
            
            while (Date.now() - startTime < 5000) {
                logs.push({
                    time: Date.now() - startTime,
                    speed: window.gameState?.speed,
                    maxSpeed: window.gameState?.maxSpeed,
                    acceleration: window.gameState?.acceleration,
                    velocityX: window.gameState?.velocityX,
                    velocityZ: window.gameState?.velocityZ,
                    speedKmh: Math.round((window.gameState?.speed || 0) * 3.6)
                });
                await new Promise(r => setTimeout(r, 100));
            }
            return logs;
        });
        
        await page.keyboard.up('w');
        
        console.log('\n=== DEBUG LOG ===');
        debugLog.forEach(log => {
            console.log(`t=${log.time}ms: speed=${log.speed?.toFixed(2)} (${log.speedKmh} km/h), maxSpeed=${log.maxSpeed}`);
        });
        
        // Check if speed ever exceeded maxSpeed
        const violations = debugLog.filter(log => log.speed > log.maxSpeed);
        if (violations.length > 0) {
            console.log(`\n❌ SPEED VIOLATIONS: ${violations.length} occurrences`);
            violations.slice(0, 5).forEach(v => {
                console.log(`  - At ${v.time}ms: ${v.speed?.toFixed(2)} > ${v.maxSpeed}`);
            });
        } else {
            console.log('\n✅ No speed violations detected');
        }
        
        expect(violations.length).toBe(0);
    });
    
    test('Verify speed display matches internal speed', async ({ page }) => {
        await page.keyboard.down('w');
        await page.waitForTimeout(3000);
        
        const comparison = await page.evaluate(() => {
            const speedElement = document.querySelector('#speed');
            const displayedSpeed = speedElement ? parseInt(speedElement.textContent || '0') : 0;
            const internalSpeed = window.gameState?.speed || 0;
            const calculatedDisplay = Math.round(internalSpeed * 3.6);
            
            return {
                displayedSpeed,
                internalSpeed,
                calculatedDisplay,
                match: displayedSpeed === calculatedDisplay
            };
        });
        
        await page.keyboard.up('w');
        
        console.log('Speed comparison:', comparison);
        console.log(`Displayed: ${comparison.displayedSpeed} km/h`);
        console.log(`Internal: ${comparison.internalSpeed?.toFixed(2)} * 3.6 = ${comparison.calculatedDisplay} km/h`);
        
        expect(comparison.match).toBe(true);
    });
});

test.describe('Speed System Investigation', () => {
    
    test('Check if startGame() correctly sets car stats', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
        await page.waitForTimeout(500);
        
        // Check state BEFORE clicking solo mode
        const beforeGame = await page.evaluate(() => {
            return {
                maxSpeed: window.gameState?.maxSpeed,
                selectedCar: window.gameState?.selectedCar
            };
        });
        console.log('Before game start:', beforeGame);
        
        // Wait for solo mode button to be visible and stable
        const soloBtn = page.locator('#soloModeBtn');
        await expect(soloBtn).toBeVisible({ timeout: 15000 });
        
        // Click solo mode (force:true for CI reliability)
        await soloBtn.click({ force: true });
        
        // Wait for game state to fully initialize (more reliable than selector)
        await page.waitForFunction(
            () => window.gameState && window.gameState.startTime > 0 && window.gameState.maxSpeed !== undefined,
            { timeout: 20000, polling: 200 }
        );
        
        // Wait for HUD element using polling
        await page.waitForFunction(
            () => !!document.querySelector('#speed'),
            { timeout: 15000, polling: 200 }
        );
        
        // Small buffer for UI to stabilize
        await page.waitForTimeout(500);
        
        // Check state AFTER clicking solo mode
        const afterGame = await page.evaluate(() => {
            return {
                maxSpeed: window.gameState?.maxSpeed,
                selectedCar: window.gameState?.selectedCar,
                acceleration: window.gameState?.acceleration,
                handling: window.gameState?.handling
            };
        });
        console.log('After game start:', afterGame);
        
        // The maxSpeed should match on-foot values (starts on foot)
        expect(afterGame.maxSpeed).toBe(2.5);
        expect(afterGame.acceleration).toBe(0.02);
    });
    
    test('Verify constants.js car values are accessible via window.cars', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 15000 });
        
        // Wait for window.cars to be defined
        await page.waitForFunction(
            () => window.cars !== undefined,
            { timeout: 5000 }
        );
        
        const carsData = await page.evaluate(() => {
            return window.cars;
        });
        
        console.log('Cars from constants.js:', JSON.stringify(carsData, null, 2));
        
        // Verify standard car values
        expect(carsData.standard.maxSpeed).toBe(22);
        expect(carsData.standard.acceleration).toBe(0.08);
        
        // Verify other cars
        expect(carsData.sport.maxSpeed).toBe(30);
        expect(carsData.hyper.maxSpeed).toBe(55);
    });
});

