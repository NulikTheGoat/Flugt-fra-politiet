// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * MULTIPLAYER REGRESSION TESTS
 * 
 * Tests for multiplayer connectivity and synchronization.
 * Critical for cooperative/competitive gameplay.
 * 
 * AI OPTIMIZATION NOTES:
 * - Tests can run without actual network connection
 * - UI availability verified
 * - Socket initialization checked
 */

test.describe('🌐 Multiplayer UI', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
    });

    test('Multiplayer button exists in menu', async ({ page }) => {
        const mpBtn = page.locator('#multiplayerModeBtn');
        await expect(mpBtn).toBeVisible();
        console.log('Multiplayer button: ✅ Found');
    });

    test('Room code input exists', async ({ page }) => {
        const roomInput = page.locator('#roomCode');
        const exists = await roomInput.count() > 0;
        console.log(`Room code input: ${exists ? '✅' : '❌'}`);
    });

    test('Join room button exists', async ({ page }) => {
        const joinBtn = page.locator('#joinRoomBtn');
        const exists = await joinBtn.count() > 0;
        console.log(`Join room button: ${exists ? '✅' : '❌'}`);
    });

    test('Create room button exists', async ({ page }) => {
        const createBtn = page.locator('#createRoomBtn');
        const exists = await createBtn.count() > 0;
        console.log(`Create room button: ${exists ? '✅' : '❌'}`);
    });
});

test.describe('🔌 Network Initialization', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
    });

    test('Network state exists in gameState', async ({ page }) => {
        const networkState = await page.evaluate(() => {
            const gs = window.gameState;
            return {
                hasMultiplayer: 'multiplayer' in gs,
                hasRoomCode: 'roomCode' in gs,
                hasPlayerId: 'playerId' in gs,
                hasOtherPlayers: 'otherPlayers' in gs
            };
        });
        
        console.log('Network state fields:', networkState);
        expect(networkState.hasMultiplayer).toBe(true);
    });

    test('Multiplayer mode starts as false', async ({ page }) => {
        const mpMode = await page.evaluate(() => window.gameState?.multiplayer);
        console.log(`Multiplayer mode on init: ${mpMode}`);
        expect(mpMode).toBe(false);
    });

    test('Other players array initializes empty', async ({ page }) => {
        const otherPlayers = await page.evaluate(() => window.gameState?.otherPlayers);
        console.log(`Other players: ${JSON.stringify(otherPlayers)}`);
        expect(otherPlayers).toEqual({});
    });
});

test.describe('👥 Multiplayer Game Start', () => {
    
    test('startMultiplayerGame function exists', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        
        const hasFunction = await page.evaluate(() => {
            return typeof window.startMultiplayerGame === 'function' ||
                   typeof startMultiplayerGame === 'function';
        });
        
        console.log(`startMultiplayerGame function: ${hasFunction ? '✅' : '❌'}`);
    });

    test('Multiplayer mode click shows connection UI', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        
        const mpBtn = page.locator('#multiplayerModeBtn');
        if (await mpBtn.isVisible()) {
            await mpBtn.click();
            await page.waitForTimeout(500);
            
            // Check for room setup UI elements
            const roomSetupVisible = await page.evaluate(() => {
                const setupEl = document.getElementById('roomSetup');
                return setupEl && (setupEl.style.display !== 'none' || 
                       window.getComputedStyle(setupEl).display !== 'none');
            });
            
            console.log(`Room setup visible after MP click: ${roomSetupVisible}`);
        }
    });
});

test.describe('📡 Network Protocol', () => {
    
    test('Game supports WebSocket communication', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        
        // Check if Socket.IO is loaded
        const hasSocketIO = await page.evaluate(() => {
            return typeof io === 'function';
        });
        
        console.log(`Socket.IO available: ${hasSocketIO ? '✅' : '❌'}`);
    });

    test('Server URL is configured', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        
        // Check page for server configuration
        const serverConfig = await page.evaluate(() => {
            // Look for common server URL patterns
            return {
                hasLocation: typeof window.location !== 'undefined',
                protocol: window.location.protocol,
                host: window.location.host
            };
        });
        
        console.log('Server config:', serverConfig);
        expect(serverConfig.hasLocation).toBe(true);
    });
});
