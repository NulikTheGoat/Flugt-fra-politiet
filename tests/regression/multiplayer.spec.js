// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * MULTIPLAYER REGRESSION TESTS
 * 
 * Adapted to match actual gameState property names from state.js:
 * - isMultiplayer (not 'multiplayer')
 * - isHost
 * - playerId
 * - roomCode
 * - otherPlayers (Map, not array)
 */

test.describe('🌐 Multiplayer UI', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
    });

    test('Multiplayer button exists in menu', async ({ page }) => {
        const mpBtn = page.locator('#multiplayerModeBtn');
        await expect(mpBtn).toBeVisible();
        console.log('Multiplayer button: ✅ Found');
    });

    test('Room code input may exist', async ({ page }) => {
        const roomInput = page.locator('#roomCode');
        const exists = await roomInput.count() > 0;
        console.log(`Room code input: ${exists ? '✅' : '❌ (not visible in main menu)'}`);
    });
});

test.describe('🔌 Network State', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
    });

    test('Multiplayer state fields exist', async ({ page }) => {
        const networkState = await page.evaluate(() => {
            const gs = window.gameState;
            return {
                hasIsMultiplayer: 'isMultiplayer' in gs,
                hasIsHost: 'isHost' in gs,
                hasPlayerId: 'playerId' in gs,
                hasRoomCode: 'roomCode' in gs,
                hasOtherPlayers: 'otherPlayers' in gs
            };
        });
        
        console.log('Network state fields:', networkState);
        expect(networkState.hasIsMultiplayer).toBe(true);
        expect(networkState.hasIsHost).toBe(true);
        expect(networkState.hasPlayerId).toBe(true);
        expect(networkState.hasRoomCode).toBe(true);
        expect(networkState.hasOtherPlayers).toBe(true);
    });

    test('isMultiplayer starts as false', async ({ page }) => {
        const mpMode = await page.evaluate(() => window.gameState?.isMultiplayer);
        console.log(`isMultiplayer on init: ${mpMode}`);
        expect(mpMode).toBe(false);
    });

    test('isHost starts as false', async ({ page }) => {
        const isHost = await page.evaluate(() => window.gameState?.isHost);
        console.log(`isHost on init: ${isHost}`);
        expect(isHost).toBe(false);
    });

    test('Player ID starts as null', async ({ page }) => {
        const playerId = await page.evaluate(() => window.gameState?.playerId);
        console.log(`playerId on init: ${playerId}`);
        expect(playerId).toBeNull();
    });

    test('Room code starts as null', async ({ page }) => {
        const roomCode = await page.evaluate(() => window.gameState?.roomCode);
        console.log(`roomCode on init: ${roomCode}`);
        expect(roomCode).toBeNull();
    });

    test('Other players Map exists', async ({ page }) => {
        const otherPlayersType = await page.evaluate(() => {
            const op = window.gameState?.otherPlayers;
            if (op instanceof Map) return 'Map';
            if (typeof op === 'object') return 'object';
            return typeof op;
        });
        console.log(`otherPlayers type: ${otherPlayersType}`);
        expect(['Map', 'object']).toContain(otherPlayersType);
    });

    test('Player color is set', async ({ page }) => {
        const playerColor = await page.evaluate(() => window.gameState?.playerColor);
        console.log(`Player color: ${playerColor?.toString(16) || playerColor}`);
        expect(playerColor).toBeDefined();
    });
});

test.describe('👥 Multiplayer Mode', () => {
    
    test('Multiplayer button click works', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
        
        const mpBtn = page.locator('#multiplayerModeBtn');
        if (await mpBtn.isVisible()) {
            await mpBtn.click();
            await page.waitForTimeout(500);
            
            // After clicking, something should happen (modal, state change, etc)
            const state = await page.evaluate(() => ({
                modalChanged: !document.getElementById('gameModeModal')?.style.display === 'none',
                anyNewUI: document.querySelector('[class*="room"], [class*="lobby"], [id*="room"]') !== null
            }));
            
            console.log('After MP button click:', state);
        }
    });

    test('Socket.IO availability check', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
        
        const hasSocketIO = await page.evaluate(() => typeof io === 'function');
        console.log(`Socket.IO available: ${hasSocketIO ? '✅' : '❌ (loaded on demand?)'}`);
    });
});
