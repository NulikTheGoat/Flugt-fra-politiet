
const { test, expect } = require('@playwright/test');

test.describe('⏱️ Game Timer Logic', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 15000 });
        // Click solo button to start game
        const soloBtn = page.locator('#soloModeBtn');
        await expect(soloBtn).toBeVisible({ timeout: 10000 });
        await soloBtn.click({ force: true });
        await page.waitForFunction(
            () => window.gameState !== undefined && window.gameState.startTime > 0,
            { timeout: 15000, polling: 200 }
        );
    });

    test('Timer should NOT start immediately on game load', async ({ page }) => {
        // Check initial state
        const timerStartTime = await page.evaluate(() => window.gameState.timerStartTime);
        // It might be 0 or null/undefined depending on init, but definitely falsy if not started
        expect(!timerStartTime).toBeTruthy();
    });

    test('Timer SHOULD start after collecting money', async ({ page }) => {
        // Mock collecting money
        await page.evaluate(() => {
            window.gameState.money = 50; 
        });

        // Loop needs to run. Wait for check to happen.
        await page.waitForFunction(() => window.gameState.timerStartTime > 0);

        const [timerStartTime, policeEngaged] = await page.evaluate(() => [
            window.gameState.timerStartTime,
            window.gameState.policeEngaged
        ]);

        expect(timerStartTime).toBeGreaterThan(0);
        expect(policeEngaged).toBe(true);
    });

    test('Timer SHOULD start after hitting an object', async ({ page }) => {
        // Mock hitting object
        await page.evaluate(() => {
            window.gameState.hasHitObject = true;
        });

        // Wait for check to happen.
        await page.waitForFunction(() => window.gameState.timerStartTime > 0);

        const [timerStartTime, policeEngaged] = await page.evaluate(() => [
            window.gameState.timerStartTime,
            window.gameState.policeEngaged
        ]);

        expect(timerStartTime).toBeGreaterThan(0);
        expect(policeEngaged).toBe(true);
    });
});
