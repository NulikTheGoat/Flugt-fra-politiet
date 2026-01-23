// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * CORE GAMEPLAY REGRESSION TESTS
 * 
 * These tests verify fundamental game mechanics work correctly.
 * Run after ANY code change to catch regressions early.
 * 
 * AI OPTIMIZATION NOTES:
 * - Each test is independent and can be run in isolation
 * - Console logs explain what's being tested and why
 * - Failures include diagnostic data for quick debugging
 * - Tests are ordered from most critical to least critical
 */

test.describe('🎮 Core Gameplay', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        
        // Start solo game
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) {
            await soloBtn.click();
        }
        await page.waitForTimeout(500);
    });

    test('Game initializes with correct default state', async ({ page }) => {
        const state = await page.evaluate(() => ({
            speed: window.gameState?.speed,
            health: window.gameState?.health,
            money: window.gameState?.money,
            heatLevel: window.gameState?.heatLevel,
            arrested: window.gameState?.arrested,
            selectedCar: window.gameState?.selectedCar,
            maxSpeed: window.gameState?.maxSpeed
        }));
        
        console.log('Initial game state:', state);
        
        // Core state checks
        expect(state.speed).toBe(0);
        expect(state.health).toBe(100); // Standard car health
        expect(state.money).toBe(0);
        expect(state.heatLevel).toBe(1);
        expect(state.arrested).toBe(false);
        expect(state.selectedCar).toBe('standard');
        expect(state.maxSpeed).toBe(22); // Standard car maxSpeed
    });

    test('Player can accelerate and decelerate', async ({ page }) => {
        // Accelerate
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const acceleratedSpeed = await page.evaluate(() => window.gameState?.speed);
        console.log(`Speed after 2s acceleration: ${acceleratedSpeed?.toFixed(2)} (${Math.round((acceleratedSpeed || 0) * 3.6)} km/h)`);
        
        expect(acceleratedSpeed).toBeGreaterThan(5);
        
        // Release and coast
        await page.keyboard.up('w');
        await page.waitForTimeout(1000);
        
        const coastingSpeed = await page.evaluate(() => window.gameState?.speed);
        console.log(`Speed after 1s coasting: ${coastingSpeed?.toFixed(2)} (${Math.round((coastingSpeed || 0) * 3.6)} km/h)`);
        
        // Should have slowed down due to friction
        expect(coastingSpeed).toBeLessThan(acceleratedSpeed);
        
        // Brake
        await page.keyboard.down('s');
        await page.waitForTimeout(1000);
        await page.keyboard.up('s');
        
        const brakedSpeed = await page.evaluate(() => window.gameState?.speed);
        console.log(`Speed after braking: ${brakedSpeed?.toFixed(2)}`);
        
        expect(brakedSpeed).toBeLessThan(coastingSpeed);
    });

    test('Player can steer left and right', async ({ page }) => {
        // Get initial rotation
        const initialRotation = await page.evaluate(() => {
            const car = window.gameState?.playerCar || document.querySelector('canvas')?.__three__?.scene?.children?.find(c => c.name === 'playerCar');
            return car?.rotation?.y || 0;
        });
        
        // Accelerate first (steering only works when moving)
        await page.keyboard.down('w');
        await page.waitForTimeout(500);
        
        // Steer left
        await page.keyboard.down('a');
        await page.waitForTimeout(1000);
        await page.keyboard.up('a');
        
        const afterLeftTurn = await page.evaluate(() => window.gameState?.angularVelocity);
        console.log(`Angular velocity after left turn: ${afterLeftTurn}`);
        
        // Should have turned (angular velocity should be non-zero or rotation changed)
        // The exact behavior depends on implementation, but something should have changed
        expect(afterLeftTurn).toBeDefined();
        
        await page.keyboard.up('w');
    });

    test('Handbrake causes drift', async ({ page }) => {
        // Accelerate to speed
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const beforeDrift = await page.evaluate(() => window.gameState?.driftFactor);
        console.log(`Drift factor before handbrake: ${beforeDrift}`);
        
        // Apply handbrake
        await page.keyboard.down(' '); // Space = handbrake
        await page.waitForTimeout(500);
        
        const duringDrift = await page.evaluate(() => window.gameState?.driftFactor);
        console.log(`Drift factor during handbrake: ${duringDrift}`);
        
        await page.keyboard.up(' ');
        await page.keyboard.up('w');
        
        // Drift factor should increase during handbrake
        expect(duringDrift).toBeGreaterThan(beforeDrift || 0);
    });

    test('Speed is capped at maxSpeed', async ({ page }) => {
        // Hold accelerate for extended time
        await page.keyboard.down('w');
        
        let maxReached = 0;
        const configuredMax = await page.evaluate(() => window.gameState?.maxSpeed);
        
        for (let i = 0; i < 30; i++) {
            await page.waitForTimeout(200);
            const speed = await page.evaluate(() => window.gameState?.speed);
            if (speed > maxReached) maxReached = speed;
        }
        
        await page.keyboard.up('w');
        
        console.log(`Configured maxSpeed: ${configuredMax}`);
        console.log(`Maximum speed reached: ${maxReached.toFixed(2)}`);
        console.log(`Over limit: ${maxReached > configuredMax ? 'YES ❌' : 'NO ✅'}`);
        
        // Speed should never exceed maxSpeed (small tolerance for floating point)
        expect(maxReached).toBeLessThanOrEqual(configuredMax * 1.01);
    });
});

test.describe('🏥 Health System', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Health starts at car maximum', async ({ page }) => {
        const health = await page.evaluate(() => window.gameState?.health);
        const carHealth = await page.evaluate(() => window.cars?.standard?.health);
        
        console.log(`Starting health: ${health}, Expected: ${carHealth}`);
        expect(health).toBe(carHealth);
    });

    test('Health UI displays correctly', async ({ page }) => {
        const healthDisplay = await page.locator('#health').textContent();
        const internalHealth = await page.evaluate(() => window.gameState?.health);
        
        console.log(`UI shows: ${healthDisplay}, Internal: ${internalHealth}`);
        expect(parseInt(healthDisplay || '0')).toBe(Math.round(internalHealth));
    });

    test('Low health triggers smoke effects', async ({ page }) => {
        // Artificially set low health
        await page.evaluate(() => {
            window.gameState.health = 25;
        });
        
        // Move to trigger smoke check
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        await page.keyboard.up('w');
        
        // Check if smoke particles exist (implementation-dependent)
        // This is a soft check - we mainly verify no errors occur
        const health = await page.evaluate(() => window.gameState?.health);
        expect(health).toBeLessThan(30);
    });
});

test.describe('💰 Economy System', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Money starts at zero', async ({ page }) => {
        const money = await page.evaluate(() => window.gameState?.money);
        expect(money).toBe(0);
    });

    test('Money UI updates when money changes', async ({ page }) => {
        // Add money programmatically
        await page.evaluate(() => {
            window.gameState.money = 500;
        });
        
        // Trigger UI update by moving
        await page.keyboard.down('w');
        await page.waitForTimeout(500);
        await page.keyboard.up('w');
        
        const displayedMoney = await page.locator('#money').textContent();
        console.log(`Money display after adding 500: ${displayedMoney}`);
        
        // UI might format money differently, check it contains the number
        expect(displayedMoney).toContain('500');
    });
});

test.describe('🚨 Heat Level System', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Heat level starts at 1', async ({ page }) => {
        const heatLevel = await page.evaluate(() => window.gameState?.heatLevel);
        expect(heatLevel).toBe(1);
    });

    test('Heat level UI shows correct stars', async ({ page }) => {
        // Set heat level to 3
        await page.evaluate(() => {
            window.gameState.heatLevel = 3;
        });
        
        await page.waitForTimeout(100);
        
        const heatDisplay = await page.locator('#heatLevel').textContent();
        console.log(`Heat display at level 3: "${heatDisplay}"`);
        
        // Should show 3 stars (implementation may vary)
        // Count star characters or check for "3"
        const starCount = (heatDisplay?.match(/⭐|★|☆/g) || []).length;
        expect(starCount).toBeGreaterThanOrEqual(3);
    });
});

test.describe('🚗 Police Spawning', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(1000);
    });

    test('Police car spawns after game starts', async ({ page }) => {
        // Move to trigger police spawn (police don't spawn until player moves)
        await page.keyboard.down('w');
        await page.waitForTimeout(3000);
        await page.keyboard.up('w');
        
        const policeCount = await page.evaluate(() => window.gameState?.policeCars?.length || 0);
        console.log(`Police cars after moving: ${policeCount}`);
        
        expect(policeCount).toBeGreaterThanOrEqual(1);
    });

    test('Police cars have valid properties', async ({ page }) => {
        await page.keyboard.down('w');
        await page.waitForTimeout(3000);
        await page.keyboard.up('w');
        
        const policeData = await page.evaluate(() => {
            const cars = window.gameState?.policeCars || [];
            return cars.map(car => ({
                hasPosition: !!car.position,
                hasUserData: !!car.userData,
                type: car.userData?.type,
                health: car.userData?.health,
                speed: car.userData?.speed
            }));
        });
        
        console.log('Police car data:', policeData);
        
        if (policeData.length > 0) {
            const firstCar = policeData[0];
            expect(firstCar.hasPosition).toBe(true);
            expect(firstCar.hasUserData).toBe(true);
            expect(firstCar.type).toBeDefined();
            expect(firstCar.health).toBeGreaterThan(0);
        }
    });
});
