// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * QUICK REGRESSION TESTS - Optimeret til hastighed
 * 
 * Kombinerer de vigtigste tests i færre, hurtigere tests.
 * Bruger data-testid selectors for pålidelighed.
 * 
 * Kør med: npm run test:quick
 */

// Shared setup - venter til spillet faktisk er startet
const setupGame = async (page) => {
    await page.goto('/');
    await page.waitForSelector('canvas', { timeout: 5000 });
    const soloBtn = page.locator('#soloModeBtn');
    if (await soloBtn.isVisible({ timeout: 2000 })) {
        await soloBtn.click();
    }
    // Vent til gameState er klar og chunks er loaded
    await page.waitForFunction(() => {
        const gs = window.gameState;
        return gs && gs.chunkGrid && Object.keys(gs.chunkGrid).length > 0;
    }, { timeout: 5000 });
    await page.waitForTimeout(200);
};

test.describe('🎯 Core Systems', () => {
    
    test('Game initializes correctly', async ({ page }) => {
        await setupGame(page);
        
        const state = await page.evaluate(() => ({
            speed: window.gameState?.speed,
            health: window.gameState?.health,
            money: window.gameState?.money,
            heatLevel: window.gameState?.heatLevel,
            maxSpeed: window.gameState?.maxSpeed,
            selectedCar: window.gameState?.selectedCar
        }));
        
        console.log('Initial state:', state);
        expect(state.speed).toBe(0);
        expect(state.health).toBe(100);
        expect(state.money).toBe(0);
        expect(state.heatLevel).toBe(1);
        expect(state.maxSpeed).toBe(22);
        expect(state.selectedCar).toBe('standard');
    });

    test('Movement and physics work', async ({ page }) => {
        await setupGame(page);
        
        // Test acceleration - hold længere for at sikre bevægelse
        await page.keyboard.down('w');
        
        // Vent på at hastighed faktisk stiger
        await page.waitForFunction(() => {
            return window.gameState?.speed > 0;
        }, { timeout: 5000 });
        
        const moving = await page.evaluate(() => ({
            speed: window.gameState?.speed,
            velocityZ: window.gameState?.velocityZ
        }));
        
        console.log('After accelerating:', moving);
        expect(moving.speed).toBeGreaterThan(0);
        
        // Test steering
        await page.keyboard.down('a');
        await page.waitForTimeout(500);
        
        const angular = await page.evaluate(() => window.gameState?.angularVelocity);
        console.log('Angular velocity:', angular);
        expect(Math.abs(angular)).toBeGreaterThan(0);
        
        await page.keyboard.up('a');
        await page.keyboard.up('w');
    });

    test('HUD elements display correctly', async ({ page }) => {
        await setupGame(page);
        
        // Check all HUD elements using data-testid
        const hudChecks = await page.evaluate(() => ({
            speed: document.querySelector('[data-testid="speed"]')?.textContent,
            money: document.querySelector('[data-testid="money"]')?.textContent,
            time: document.querySelector('[data-testid="time"]')?.textContent,
            heatLevel: document.querySelector('[data-testid="heatLevel"]')?.textContent,
            healthValue: document.querySelector('[data-testid="healthValue"]')?.textContent,
            policeCount: document.querySelector('[data-testid="policeCount"]')?.textContent
        }));
        
        console.log('HUD values:', hudChecks);
        expect(hudChecks.speed).toBeDefined();
        expect(hudChecks.money).toBeDefined();
        expect(hudChecks.healthValue).toBe('100');
        expect(hudChecks.heatLevel).toBe('1');
    });

    test('Speed updates in HUD when driving', async ({ page }) => {
        await setupGame(page);
        
        const initialSpeed = await page.locator('[data-testid="speed"]').textContent();
        
        await page.keyboard.down('w');
        
        // Vent på at HUD opdateres
        await page.waitForFunction(() => {
            const speedEl = document.querySelector('[data-testid="speed"]');
            return speedEl && parseInt(speedEl.textContent || '0') > 0;
        }, { timeout: 5000 });
        
        const newSpeed = await page.locator('[data-testid="speed"]').textContent();
        await page.keyboard.up('w');
        
        console.log(`Speed: ${initialSpeed} -> ${newSpeed}`);
        expect(parseInt(newSpeed || '0')).toBeGreaterThan(0);
    });
});

test.describe('🚗 Car & Shop', () => {
    
    test('All cars have valid stats', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('canvas', { timeout: 5000 });
        
        const cars = await page.evaluate(() => {
            const c = window.cars;
            return Object.entries(c).map(([key, car]) => ({
                key,
                name: car.name,
                maxSpeed: car.maxSpeed,
                acceleration: car.acceleration,
                health: car.health,
                price: car.price,
                valid: car.maxSpeed > 0 && car.acceleration > 0 && car.health > 0
            }));
        });
        
        console.log('Cars:', cars.map(c => `${c.key}: ${c.valid ? '✅' : '❌'}`).join(', '));
        cars.forEach(car => expect(car.valid).toBe(true));
    });

    test('Shop modal opens and shows cars', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('canvas', { timeout: 5000 });
        
        const shopBtn = page.locator('#openShopBtn');
        if (await shopBtn.isVisible({ timeout: 2000 })) {
            await shopBtn.click();
            await page.waitForTimeout(300);
            
            const shopContent = await page.locator('#shop').textContent();
            console.log('Shop visible, content length:', shopContent?.length);
            expect(shopContent?.length).toBeGreaterThan(50);
        }
    });
});

test.describe('🌍 World & Rendering', () => {
    
    test('Chunks and rendering initialize', async ({ page }) => {
        await setupGame(page);
        
        const world = await page.evaluate(() => ({
            hasChunkGrid: typeof window.gameState?.chunkGrid === 'object',
            chunkCount: Object.keys(window.gameState?.chunkGrid || {}).length,
            chunkGridSize: window.gameState?.chunkGridSize,
            baseFOV: window.gameState?.baseFOV,
            is2DMode: window.gameState?.is2DMode
        }));
        
        console.log('World state:', world);
        expect(world.hasChunkGrid).toBe(true);
        expect(world.chunkCount).toBeGreaterThan(0);
        expect(world.chunkGridSize).toBe(200);
        expect(world.baseFOV).toBe(75);
    });

    test('Canvas uses WebGL', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('canvas', { timeout: 5000 });
        
        const contextType = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            if (canvas?.getContext('webgl2')) return 'webgl2';
            if (canvas?.getContext('webgl')) return 'webgl';
            return 'unknown';
        });
        
        console.log('Canvas context:', contextType);
        expect(['webgl', 'webgl2']).toContain(contextType);
    });
});

test.describe('🔌 Multiplayer State', () => {
    
    test('Multiplayer state initializes correctly', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('canvas', { timeout: 5000 });
        
        const mpState = await page.evaluate(() => ({
            isMultiplayer: window.gameState?.isMultiplayer,
            isHost: window.gameState?.isHost,
            playerId: window.gameState?.playerId,
            roomCode: window.gameState?.roomCode
        }));
        
        console.log('Multiplayer state:', mpState);
        expect(mpState.isMultiplayer).toBe(false);
        expect(mpState.isHost).toBe(false);
        expect(mpState.playerId).toBeNull();
        expect(mpState.roomCode).toBeNull();
    });
});

test.describe('🚔 Police & Combat', () => {
    
    test('Police and combat systems initialize', async ({ page }) => {
        await setupGame(page);
        
        const combat = await page.evaluate(() => ({
            policeCars: Array.isArray(window.gameState?.policeCars),
            policeKilled: window.gameState?.policeKilled,
            collisionDistance: window.gameState?.collisionDistance,
            arrestDistance: window.gameState?.arrestDistance,
            arrested: window.gameState?.arrested,
            projectiles: Array.isArray(window.gameState?.projectiles)
        }));
        
        console.log('Combat state:', combat);
        expect(combat.policeCars).toBe(true);
        expect(combat.policeKilled).toBe(0);
        expect(combat.collisionDistance).toBe(25);
        expect(combat.arrestDistance).toBe(30);
        expect(combat.arrested).toBe(false);
        expect(combat.projectiles).toBe(true);
    });
});
