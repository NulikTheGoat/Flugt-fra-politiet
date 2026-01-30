// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Challenger Mode', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        
        // Wait for game to initialize
        await page.waitForFunction(() => {
            const w = /** @type {any} */ (window);
            return w.gameState;
        });
    });

    test('Challenger can move freely in Multiplayer', async ({ page }) => {
        // 1. Setup Multiplayer Challenger State manually (simulating the menu flow)
        await page.evaluate(() => {
            const w = /** @type {any} */ (window);
            w.gameState.isMultiplayer = true;
            w.gameState.playerRole = 'challenger';
            w.gameState.isHost = true;
            
            // Start the game loop essentials if not already running
            if (!w.gameState.startTime) {
                // Trigger start game logic via exposed devtools
                if (w.__game && w.__game.startGame) {
                    w.__game.startGame();
                } else {
                    console.error('startGame not found on window.__game');
                }
                
                // FORCE role again because startGame might reset things
                w.gameState.isMultiplayer = true;
                w.gameState.playerRole = 'challenger';
            }
        });
        
        // 2. Initial Position Check
        const initialPos = await page.evaluate(() => {
            const w = /** @type {any} */ (window);
            // Get camera position since Challenger IS the camera
            const cam = w.camera;
            return { x: cam.position.x, z: cam.position.z };
        });
        
        console.log('Initial Challenger Pos:', initialPos);
        
        // 3. Perform Movement (Press W)
        await page.keyboard.down('w');
        // Wait for a few frames of movement
        await page.waitForTimeout(500); 
        await page.keyboard.up('w');
        
        // 4. New Position Check
        const newPos = await page.evaluate(() => {
            const w = /** @type {any} */ (window);
            const cam = w.camera;
            return { x: cam.position.x, z: cam.position.z };
        });
        
        console.log('New Challenger Pos:', newPos);
        
        // 5. Assertions
        // Calculate distance moved
        const dx = newPos.x - initialPos.x;
        const dz = newPos.z - initialPos.z;
        const dist = Math.sqrt(dx*dx + dz*dz);
        
        console.log(`Moved distance: ${dist}`);
        
        expect(dist).toBeGreaterThan(5); // Should have moved significantly
    });
    
    test('Challenger role persistence check through startGame', async ({ page }) => {
        // This checks if startGame() resets the role unexpectedly
        await page.evaluate(() => {
            const w = /** @type {any} */ (window);
            w.gameState.playerRole = 'challenger';
            w.gameState.isMultiplayer = true;
            console.log('Before startGame: ' + w.gameState.playerRole);
            if (w.__game && w.__game.startGame) {
                w.__game.startGame();
            }
            console.log('After startGame: ' + w.gameState.playerRole);
        });
        
        const role = await page.evaluate(() => {
            const w = /** @type {any} */ (window);
            return w.gameState.playerRole;
        });
        expect(role).toBe('challenger');
    });
});
