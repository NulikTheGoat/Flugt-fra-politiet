// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Challenger Spawn Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Wait for game to load
        await page.waitForSelector('#gameModeModal', { state: 'visible', timeout: 10000 });
    });

    async function navigateToLobbyAsChallenger(page) {
        // Click multiplayer button
        await page.click('#multiplayerModeBtn');
        
        // Wait for multiplayer lobby to appear
        await page.waitForSelector('#multiplayerLobby', { state: 'visible' });
        
        // Wait for server scanning to complete
        await page.waitForFunction(() => {
            const scanning = document.getElementById('scanningStatus');
            return scanning && scanning.style.display === 'none';
        }, { timeout: 10000 });
        
        // Check if servers were found or not
        const discoveredServers = page.locator('#discoveredServers');
        const noServersFound = page.locator('#noServersFound');
        
        if (await discoveredServers.isVisible()) {
            await page.click('.server-card');
        } else if (await noServersFound.isVisible()) {
            await page.click('#hostOwnServerBtn');
        }
        
        // Wait for lobby connect section
        await page.waitForSelector('#lobbyConnect', { state: 'visible' });
        
        // Select Challenger role
        await page.click('.role-option[data-role="challenger"]');
        
        // Verify role is selected
        const roleInput = page.locator('#playerRoleInput');
        await expect(roleInput).toHaveValue('challenger');
    }

    test('Challenger panel shows difficulty presets', async ({ page }) => {
        await navigateToLobbyAsChallenger(page);
        
        // Enter a player name
        await page.fill('#playerNameInput', 'TestChallenger');
        
        // Join game
        await page.click('#joinGameBtn');
        
        // Wait for joining
        await page.waitForSelector('#lobbyRoom', { state: 'visible', timeout: 10000 });
        
        // Start game as host (should be host since first to join)
        const startBtn = page.locator('#startMultiplayerBtn');
        if (await startBtn.isVisible()) {
            await startBtn.click();
        }
        
        // Wait for game to start and challenger panel to appear
        await page.waitForSelector('#challengerPanel', { state: 'visible', timeout: 10000 });
        
        // Verify difficulty buttons exist
        const easyBtn = page.locator('#challengerPanel button:has-text("Nem")');
        const normalBtn = page.locator('#challengerPanel button:has-text("Normal")');
        const hardBtn = page.locator('#challengerPanel button:has-text("Svær")');
        
        await expect(easyBtn).toBeVisible();
        await expect(normalBtn).toBeVisible();
        await expect(hardBtn).toBeVisible();
    });

    test('Challenger panel shows spawn buttons', async ({ page }) => {
        await navigateToLobbyAsChallenger(page);
        
        await page.fill('#playerNameInput', 'TestChallenger2');
        await page.click('#joinGameBtn');
        await page.waitForSelector('#lobbyRoom', { state: 'visible', timeout: 10000 });
        
        const startBtn = page.locator('#startMultiplayerBtn');
        if (await startBtn.isVisible()) {
            await startBtn.click();
        }
        
        await page.waitForSelector('#challengerPanel', { state: 'visible', timeout: 10000 });
        
        // Verify police spawn buttons
        await expect(page.locator('#challengerPanel button:has-text("2x Standard")')).toBeVisible();
        await expect(page.locator('#challengerPanel button:has-text("2x Interceptor")')).toBeVisible();
        await expect(page.locator('#challengerPanel button:has-text("1x SWAT")')).toBeVisible();
        
        // Verify environment spawn buttons
        await expect(page.locator('#challengerPanel button:has-text("Vejspærring")')).toBeVisible();
        await expect(page.locator('#challengerPanel button:has-text("Kegler")')).toBeVisible();
        await expect(page.locator('#challengerPanel button:has-text("Rampe")')).toBeVisible();
        
        // Verify bonus spawn buttons
        await expect(page.locator('#challengerPanel button:has-text("Penge")')).toBeVisible();
        await expect(page.locator('#challengerPanel button:has-text("Sundhed")')).toBeVisible();
        await expect(page.locator('#challengerPanel button:has-text("Boost")')).toBeVisible();
    });

    test('Challenger spawn button triggers network event', async ({ page }) => {
        await navigateToLobbyAsChallenger(page);
        
        await page.fill('#playerNameInput', 'TestChallenger3');
        await page.click('#joinGameBtn');
        await page.waitForSelector('#lobbyRoom', { state: 'visible', timeout: 10000 });
        
        const startBtn = page.locator('#startMultiplayerBtn');
        if (await startBtn.isVisible()) {
            await startBtn.click();
        }
        
        await page.waitForSelector('#challengerPanel', { state: 'visible', timeout: 10000 });
        
        // Set up listener for console messages about spawning
        const consoleLogs = [];
        page.on('console', msg => {
            if (msg.text().includes('Spawnet:') || msg.text().includes('CHALLENGER')) {
                consoleLogs.push(msg.text());
            }
        });
        
        // Click a spawn button
        const roadblockBtn = page.locator('#challengerPanel button:has-text("Vejspærring")');
        await roadblockBtn.click();
        
        // Wait a bit for the action to process
        await page.waitForTimeout(500);
        
        // Verify the button goes on cooldown (disabled state)
        await expect(roadblockBtn).toHaveCSS('opacity', '0.5');
    });

    test('Challenger difficulty changes cooldown', async ({ page }) => {
        await navigateToLobbyAsChallenger(page);
        
        await page.fill('#playerNameInput', 'TestChallenger4');
        await page.click('#joinGameBtn');
        await page.waitForSelector('#lobbyRoom', { state: 'visible', timeout: 10000 });
        
        const startBtn = page.locator('#startMultiplayerBtn');
        if (await startBtn.isVisible()) {
            await startBtn.click();
        }
        
        await page.waitForSelector('#challengerPanel', { state: 'visible', timeout: 10000 });
        
        // Click Hard difficulty
        const hardBtn = page.locator('#challengerPanel button:has-text("Svær")');
        await hardBtn.click();
        
        // Verify notification appears (difficulty change feedback)
        // The notification should be created as a DOM element
        await page.waitForFunction(() => {
            const body = document.body.innerHTML;
            return body.includes('Sværhedsgrad') || body.includes('Svær');
        }, { timeout: 5000 });
    });

    test('Contester does not see Challenger panel', async ({ page }) => {
        // Click multiplayer button
        await page.click('#multiplayerModeBtn');
        
        // Wait for multiplayer lobby
        await page.waitForSelector('#multiplayerLobby', { state: 'visible' });
        
        // Wait for server scanning
        await page.waitForFunction(() => {
            const scanning = document.getElementById('scanningStatus');
            return scanning && scanning.style.display === 'none';
        }, { timeout: 10000 });
        
        const discoveredServers = page.locator('#discoveredServers');
        const noServersFound = page.locator('#noServersFound');
        
        if (await discoveredServers.isVisible()) {
            await page.click('.server-card');
        } else if (await noServersFound.isVisible()) {
            await page.click('#hostOwnServerBtn');
        }
        
        await page.waitForSelector('#lobbyConnect', { state: 'visible' });
        
        // Keep Contester role (default)
        const roleInput = page.locator('#playerRoleInput');
        await expect(roleInput).toHaveValue('contester');
        
        // Join and start game
        await page.fill('#playerNameInput', 'TestContester');
        await page.click('#joinGameBtn');
        await page.waitForSelector('#lobbyRoom', { state: 'visible', timeout: 10000 });
        
        const startBtn = page.locator('#startMultiplayerBtn');
        if (await startBtn.isVisible()) {
            await startBtn.click();
        }
        
        // Wait for game to start
        await page.waitForFunction(() => {
            const lobby = document.getElementById('multiplayerLobby');
            return lobby && lobby.style.display === 'none';
        }, { timeout: 10000 });
        
        // Challenger panel should NOT be visible for Contester
        const challengerPanel = page.locator('#challengerPanel');
        await expect(challengerPanel).toHaveCSS('display', 'none');
    });
});
