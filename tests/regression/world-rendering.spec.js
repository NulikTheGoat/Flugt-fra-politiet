// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * WORLD & RENDERING REGRESSION TESTS
 * 
 * Adapted to match actual gameState property names from state.js:
 * - chunks (array)
 * - chunkGrid (object)
 * - activeChunks (array)
 * - chunkGridSize (number, 200)
 * - is2DMode (camera toggle)
 * - currentFOV, baseFOV
 */

test.describe('🌍 World Generation', () => {
    
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

    test('Chunk grid initializes', async ({ page }) => {
        const chunkData = await page.evaluate(() => {
            const gs = window.gameState;
            return {
                hasChunkGrid: typeof gs?.chunkGrid === 'object',
                chunkCount: gs?.chunkGrid ? Object.keys(gs.chunkGrid).length : 0,
                hasChunksArray: Array.isArray(gs?.chunks),
                hasActiveChunks: Array.isArray(gs?.activeChunks)
            };
        });
        
        console.log('Chunk data:', chunkData);
        expect(chunkData.hasChunkGrid).toBe(true);
    });

    test('Chunks generate when playing', async ({ page }) => {
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const chunkCount = await page.evaluate(() => {
            const grid = window.gameState?.chunkGrid;
            return grid ? Object.keys(grid).length : 0;
        });
        
        await page.keyboard.up('w');
        console.log(`Active chunks: ${chunkCount}`);
        expect(chunkCount).toBeGreaterThan(0);
    });

    test('Chunk grid size is 200', async ({ page }) => {
        const gridSize = await page.evaluate(() => window.gameState?.chunkGridSize);
        console.log(`Chunk grid size: ${gridSize}`);
        expect(gridSize).toBe(200);
    });
});

test.describe('🎨 Rendering Pipeline', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
    });

    test('Canvas is properly sized', async ({ page }) => {
        const canvasSize = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            return {
                width: canvas?.width,
                height: canvas?.height,
                clientWidth: canvas?.clientWidth,
                clientHeight: canvas?.clientHeight
            };
        });
        
        console.log('Canvas dimensions:', canvasSize);
        expect(canvasSize.width).toBeGreaterThan(0);
        expect(canvasSize.height).toBeGreaterThan(0);
    });

    test('Canvas uses WebGL', async ({ page }) => {
        const contextType = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            if (!canvas) return 'no canvas';
            if (canvas.getContext('webgl2')) return 'webgl2';
            if (canvas.getContext('webgl')) return 'webgl';
            if (canvas.getContext('2d')) return '2d';
            return 'unknown';
        });
        
        console.log(`Canvas context type: ${contextType}`);
        expect(['webgl', 'webgl2']).toContain(contextType);
    });

    test('FOV settings exist', async ({ page }) => {
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click({ force: true });
        await page.waitForTimeout(500);
        
        const fovData = await page.evaluate(() => ({
            baseFOV: window.gameState?.baseFOV,
            currentFOV: window.gameState?.currentFOV
        }));
        
        console.log('FOV settings:', fovData);
        expect(fovData.baseFOV).toBe(75);
        expect(fovData.currentFOV).toBe(75);
    });

    test('2D mode toggle exists', async ({ page }) => {
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click({ force: true });
        await page.waitForTimeout(500);
        
        const is2DMode = await page.evaluate(() => window.gameState?.is2DMode);
        console.log(`is2DMode: ${is2DMode}`);
        expect(is2DMode).toBe(false);
    });
});

test.describe('📍 Player Position', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click({ force: true });
        await page.waitForTimeout(500);
    });

    test('Velocity components exist', async ({ page }) => {
        const velocity = await page.evaluate(() => ({
            velocityX: window.gameState?.velocityX,
            velocityZ: window.gameState?.velocityZ,
            angularVelocity: window.gameState?.angularVelocity
        }));
        
        console.log('Velocity state:', velocity);
        expect(typeof velocity.velocityX).toBe('number');
        expect(typeof velocity.velocityZ).toBe('number');
        expect(typeof velocity.angularVelocity).toBe('number');
    });

    test('Position changes when moving', async ({ page }) => {
        const startVel = await page.evaluate(() => ({
            x: window.gameState?.velocityX,
            z: window.gameState?.velocityZ
        }));
        
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const endVel = await page.evaluate(() => ({
            x: window.gameState?.velocityX,
            z: window.gameState?.velocityZ
        }));
        
        await page.keyboard.up('w');
        
        console.log(`Velocity: start=(${startVel.x?.toFixed(2)}, ${startVel.z?.toFixed(2)}) end=(${endVel.x?.toFixed(2)}, ${endVel.z?.toFixed(2)})`);
        
        // At least one velocity should have changed
        const moved = startVel.x !== endVel.x || startVel.z !== endVel.z;
        expect(moved).toBe(true);
    });
});

test.describe('✨ Visual Effects', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click({ force: true });
        await page.waitForTimeout(500);
    });

    test('Particle arrays exist', async ({ page }) => {
        const particles = await page.evaluate(() => ({
            sparks: Array.isArray(window.gameState?.sparks),
            tireMarks: Array.isArray(window.gameState?.tireMarks),
            speedParticles: Array.isArray(window.gameState?.speedParticles)
        }));
        
        console.log('Particle arrays:', particles);
        expect(particles.sparks).toBe(true);
        expect(particles.tireMarks).toBe(true);
        expect(particles.speedParticles).toBe(true);
    });

    test('Screen shake starts at 0', async ({ page }) => {
        const screenShake = await page.evaluate(() => window.gameState?.screenShake);
        console.log(`Screen shake: ${screenShake}`);
        expect(screenShake).toBe(0);
    });

    test('Collectibles array exists', async ({ page }) => {
        const collectibles = await page.evaluate(() => window.gameState?.collectibles);
        console.log(`Collectibles array length: ${collectibles?.length}`);
        expect(Array.isArray(collectibles)).toBe(true);
    });
});
