// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Challenger Role Selection', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Wait for game to load
        await page.waitForSelector('#gameModeModal', { state: 'visible', timeout: 10000 });
    });

    async function navigateToLobbyConnect(page) {
        // Click multiplayer button
        await page.click('#multiplayerModeBtn');
        
        // Wait for multiplayer lobby to appear
        await page.waitForSelector('#multiplayerLobby', { state: 'visible' });
        
        // Wait for server scanning to complete - either servers found or no servers
        await page.waitForFunction(() => {
            const scanning = document.getElementById('scanningStatus');
            return scanning && scanning.style.display === 'none';
        }, { timeout: 10000 });
        
        // Check if servers were found or not
        const discoveredServers = page.locator('#discoveredServers');
        const noServersFound = page.locator('#noServersFound');
        
        if (await discoveredServers.isVisible()) {
            // Servers found - click on the first server card
            await page.click('.server-card');
        } else if (await noServersFound.isVisible()) {
            // No servers - click localhost button
            await page.click('#hostOwnServerBtn');
        }
        
        // Wait for the lobby connect section with role selection
        await page.waitForSelector('#lobbyConnect', { state: 'visible' });
    }

    test('clicking Challenger button updates the role', async ({ page }) => {
        await navigateToLobbyConnect(page);
        
        // Verify initial state - Contester should be active
        const contesterBtn = page.locator('.role-option[data-role="contester"]');
        const challengerBtn = page.locator('.role-option[data-role="challenger"]');
        const roleInput = page.locator('#playerRoleInput');
        
        await expect(contesterBtn).toHaveClass(/active/);
        await expect(challengerBtn).not.toHaveClass(/active/);
        await expect(roleInput).toHaveValue('contester');
        
        // Click Challenger button
        await challengerBtn.click();
        
        // Verify Challenger is now active
        await expect(challengerBtn).toHaveClass(/active/);
        await expect(contesterBtn).not.toHaveClass(/active/);
        await expect(roleInput).toHaveValue('challenger');
        
        // Verify aria-pressed attributes
        await expect(challengerBtn).toHaveAttribute('aria-pressed', 'true');
        await expect(contesterBtn).toHaveAttribute('aria-pressed', 'false');
    });

    test('clicking inside role button (on child elements) still works', async ({ page }) => {
        await navigateToLobbyConnect(page);
        
        // Click on the role-title inside challenger button (child element)
        const challengerTitle = page.locator('.role-option[data-role="challenger"] .role-title');
        await challengerTitle.click();
        
        // Should still select challenger
        const roleInput = page.locator('#playerRoleInput');
        await expect(roleInput).toHaveValue('challenger');
    });

    test('role selection persists when switching back and forth', async ({ page }) => {
        await navigateToLobbyConnect(page);
        
        const contesterBtn = page.locator('.role-option[data-role="contester"]');
        const challengerBtn = page.locator('.role-option[data-role="challenger"]');
        const roleInput = page.locator('#playerRoleInput');
        
        // Select Challenger
        await challengerBtn.click();
        await expect(roleInput).toHaveValue('challenger');
        
        // Select Contester
        await contesterBtn.click();
        await expect(roleInput).toHaveValue('contester');
        
        // Select Challenger again
        await challengerBtn.click();
        await expect(roleInput).toHaveValue('challenger');
    });

    test('role is saved to localStorage', async ({ page }) => {
        await navigateToLobbyConnect(page);
        
        // Select Challenger
        await page.click('.role-option[data-role="challenger"]');
        
        // Check localStorage
        const savedRole = await page.evaluate(() => localStorage.getItem('playerRole'));
        expect(savedRole).toBe('challenger');
    });
});
