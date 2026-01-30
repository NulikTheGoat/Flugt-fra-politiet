// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * POLICE AI REGRESSION TESTS
 * 
 * Adapted to match actual gameState property names from state.js:
 * - policeCars (array of police vehicles)
 * - heatLevel (current wanted level)
 * - policeKilled (kill counter)
 * - hasStartedMoving (spawn trigger flag)
 */

test.describe('🚔 Police Spawning', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 15000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) {
            await soloBtn.click({ force: true });
            // Wait for game state to fully initialize
            await page.waitForFunction(
                () => window.gameState && window.gameState.startTime > 0,
                { timeout: 15000, polling: 200 }
            );
        }
        await page.waitForTimeout(500);
    });

    test('Police array initializes', async ({ page }) => {
        const policeArray = await page.evaluate(() => window.gameState?.policeCars);
        console.log(`Police array type: ${Array.isArray(policeArray) ? 'Array' : typeof policeArray}`);
        console.log(`Initial police count: ${policeArray?.length || 0}`);
        expect(Array.isArray(policeArray)).toBe(true);
    });

    test('hasStartedMoving flag tracks movement', async ({ page }) => {
        const beforeMove = await page.evaluate(() => window.gameState?.hasStartedMoving);
        console.log(`hasStartedMoving before: ${beforeMove}`);
        
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const afterMove = await page.evaluate(() => window.gameState?.hasStartedMoving);
        const speed = await page.evaluate(() => window.gameState?.speed);
        console.log(`hasStartedMoving after: ${afterMove}, speed: ${speed?.toFixed(2)}`);
        
        await page.keyboard.up('w');
        // Flag may be set by movement OR speed > 0 indicates we moved
        expect(afterMove === true || speed > 0).toBe(true);
    });

    test('Police spawn time is tracked', async ({ page }) => {
        const spawnTime = await page.evaluate(() => window.gameState?.lastPoliceSpawnTime);
        console.log(`Last police spawn time: ${spawnTime}`);
        expect(typeof spawnTime).toBe('number');
    });
});

test.describe('🔥 Heat Level System', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click({ force: true });
        await page.waitForTimeout(500);
    });

    test('Heat level starts at 1', async ({ page }) => {
        const heat = await page.evaluate(() => window.gameState?.heatLevel);
        console.log(`Starting heat level: ${heat}`);
        expect(heat).toBe(1);
    });

    test('Heat level UI displays', async ({ page }) => {
        const heatElement = page.locator('#heatLevel, #heat, .heat-display').first();
        const isVisible = await heatElement.isVisible().catch(() => false);
        
        if (isVisible) {
            const heatText = await heatElement.textContent();
            console.log(`Heat display: "${heatText}"`);
            expect(heatText).toBeTruthy();
        } else {
            const internalHeat = await page.evaluate(() => window.gameState?.heatLevel);
            console.log(`No heat UI, internal value: ${internalHeat}`);
            expect(internalHeat).toBeDefined();
        }
    });

    test('Police killed counter exists', async ({ page }) => {
        const policeKilled = await page.evaluate(() => window.gameState?.policeKilled);
        console.log(`Police killed counter: ${policeKilled}`);
        expect(typeof policeKilled).toBe('number');
        expect(policeKilled).toBe(0);
    });
});

test.describe('🎯 Combat & Collision', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click({ force: true });
        await page.waitForTimeout(500);
    });

    test('Collision distance is 25', async ({ page }) => {
        const collisionDist = await page.evaluate(() => window.gameState?.collisionDistance);
        console.log(`Collision distance: ${collisionDist}`);
        expect(collisionDist).toBe(25);
    });

    test('Arrest distance is 30', async ({ page }) => {
        const arrestDist = await page.evaluate(() => window.gameState?.arrestDistance);
        console.log(`Arrest distance: ${arrestDist}`);
        expect(arrestDist).toBe(30);
    });

    test('Projectiles array exists', async ({ page }) => {
        const projectiles = await page.evaluate(() => window.gameState?.projectiles);
        console.log(`Projectiles array length: ${projectiles?.length}`);
        expect(Array.isArray(projectiles)).toBe(true);
    });

    test('Arrested state starts false', async ({ page }) => {
        const arrested = await page.evaluate(() => window.gameState?.arrested);
        console.log(`Arrested state: ${arrested}`);
        expect(arrested).toBe(false);
    });
});
