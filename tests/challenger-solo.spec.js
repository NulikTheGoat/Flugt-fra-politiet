// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Challenger Solo Movement', () => {
    test('Host (Challenger) Solo Start -> Can Move', async ({ page }) => {
        // --- HOST SETUP ---
        await page.goto('/');
        await page.click('#multiplayerModeBtn');
        
        // Handle server discovery
        try {
            await page.waitForSelector('#scanningStatus', { state: 'hidden', timeout: 5000 });
        } catch (e) {
            // Timeout is expected if scanning finishes quickly or element doesn't exist
        }
        
        if (await page.isVisible('#hostOwnServerBtn')) {
            await page.click('#hostOwnServerBtn');
        } else if (await page.isVisible('.server-card')) {
            await page.click('.server-card');
        }
        
        await page.waitForSelector('#lobbyConnect', { state: 'visible' });
        
        // Select Challenger Role
        await page.click('.role-option[data-role="challenger"]');
        await page.fill('#playerNameInput', 'SoloChallenger');
        await page.click('#joinGameBtn');
        
        // Wait for Lobby
        await page.waitForSelector('#multiplayerLobby', { state: 'visible' });
        
        // Verify Start Button exists and is clickable
        await page.waitForSelector('#startMultiplayerBtn');
        
        // Click Start (Should now work without alert)
        // Handle potential alert if fix didn't work (will time out or fail subsequent steps)
        await page.click('#startMultiplayerBtn');
        
        // Wait for game to start
        // Instead of HUD, wait for game state to reflect started status
        console.log('[TEST] Waiting for Challenger setup...');
        await page.waitForFunction(() => {
            const w = /** @type {any} */ (window);
            return w.gameState && w.gameState.is2DMode === true;
        }, { timeout: 10000 });
        console.log('[TEST] Challenger setup confirmed');
        
        // Log game state
        const state = await page.evaluate(() => {
            const w = /** @type {any} */ (window);
            return {
                isMultiplayer: w.gameState.isMultiplayer,
                playerRole: w.gameState.playerRole,
                is2DMode: w.gameState.is2DMode,
                startTime: w.gameState.startTime
            };
        });
        console.log('[TEST] Game State:', state);
        
        // --- CHECK MOVEMENT ---
        // Get initial position
        const initialPos = await page.evaluate(() => {
            const w = /** @type {any} */ (window);
            const cam = w.camera;
            console.log('[TEST-EVAL] Initial camera pos:', cam.position);
            return { x: cam.position.x, z: cam.position.z };
        });
        console.log('[TEST] Initial Position:', initialPos);
        
        // Move Forward (W) - hold longer for visible movement
        console.log('[TEST] Pressing W key for 3 seconds...');
        await page.keyboard.down('w');
        await page.waitForTimeout(500);
        
        // Check if key was registered
        const keyCheck = await page.evaluate(() => {
            const w = /** @type {any} */ (window);
            return {
                hasKeys: !!w.keys,
                hasChallengerKeys: !!w.challengerKeys,
                keysW: w.keys?.w,
                challengerKeysW: w.challengerKeys?.w
            };
        });
        console.log('[TEST] Key state after 500ms:', keyCheck);
        
        await page.waitForTimeout(2500);
        await page.keyboard.up('w');
        console.log('[TEST] Released W key');
        
        console.log('[TEST] Waiting for camera movement (Z > 50)...');
        try {
            await page.waitForFunction((startZ) => {
                const w = /** @type {any} */ (window);
                const cam = w.camera;
                const delta = cam.position.z - startZ;
                if (delta > 10) {
                    console.log('[TEST-EVAL] Movement detected, delta Z:', delta);
                }
                return cam && delta > 50;
            }, initialPos.z, { timeout: 5000 });
            console.log('[TEST] Movement threshold reached');
        } catch (e) {
            console.log('[TEST] Movement timeout - checking final position anyway');
        }

        const newPos = await page.evaluate(() => {
            const w = /** @type {any} */ (window);
            const cam = w.camera;
            console.log('[TEST-EVAL] Final camera pos:', cam.position);
            return { x: cam.position.x, z: cam.position.z };
        });
        
        console.log('[TEST] Position Change:', initialPos, '->', newPos);
        
        // Expect Z to increase (W moves +Z in Challenger code)
        const deltaZ = newPos.z - initialPos.z;
        const deltaX = newPos.x - initialPos.x;
        console.log('[TEST] Delta X:', deltaX, 'Delta Z:', deltaZ);
        
        expect(deltaZ).toBeGreaterThan(1);
    });
});
