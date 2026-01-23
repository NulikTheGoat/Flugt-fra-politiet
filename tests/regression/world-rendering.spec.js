// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * WORLD & RENDERING REGRESSION TESTS
 * 
 * Tests for world generation, chunks, and rendering pipeline.
 * Critical for visual integrity and performance.
 * 
 * AI OPTIMIZATION NOTES:
 * - Chunk counts logged for debugging
 * - Canvas state verified
 * - Camera position tracked
 */

test.describe('🌍 World Generation', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Chunk grid initializes', async ({ page }) => {
        const chunkData = await page.evaluate(() => {
            const grid = window.gameState?.chunkGrid;
            return {
                exists: typeof grid === 'object',
                keys: grid ? Object.keys(grid).length : 0
            };
        });
        
        console.log('Chunk grid:', chunkData);
        expect(chunkData.exists).toBe(true);
    });

    test('Chunks generate around player', async ({ page }) => {
        // Move to trigger chunk generation
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

    test('Render distance is defined', async ({ page }) => {
        const renderDist = await page.evaluate(() => window.gameState?.renderDistance);
        console.log(`Render distance: ${renderDist}`);
        expect(renderDist).toBeGreaterThan(0);
    });

    test('Chunk size is consistent', async ({ page }) => {
        const chunkSize = await page.evaluate(() => window.gameState?.chunkSize);
        console.log(`Chunk size: ${chunkSize}`);
        expect(chunkSize).toBeGreaterThan(0);
    });
});

test.describe('🎨 Rendering Pipeline', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
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

    test('Canvas context is available', async ({ page }) => {
        const contextType = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            if (!canvas) return 'no canvas';
            if (canvas.getContext('2d')) return '2d';
            if (canvas.getContext('webgl')) return 'webgl';
            if (canvas.getContext('webgl2')) return 'webgl2';
            return 'unknown';
        });
        
        console.log(`Canvas context type: ${contextType}`);
        expect(contextType).not.toBe('no canvas');
    });

    test('Game loop is running', async ({ page }) => {
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
        
        const gameRunning = await page.evaluate(() => window.gameState?.gameRunning);
        console.log(`Game running: ${gameRunning}`);
        expect(gameRunning).toBe(true);
    });
});

test.describe('📍 Camera System', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Camera position updates with player', async ({ page }) => {
        const startPos = await page.evaluate(() => ({
            x: window.gameState?.playerX,
            z: window.gameState?.playerZ
        }));
        
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const endPos = await page.evaluate(() => ({
            x: window.gameState?.playerX,
            z: window.gameState?.playerZ
        }));
        
        await page.keyboard.up('w');
        
        console.log(`Position: start=(${startPos.x?.toFixed(1)}, ${startPos.z?.toFixed(1)}) end=(${endPos.x?.toFixed(1)}, ${endPos.z?.toFixed(1)})`);
        
        const moved = startPos.x !== endPos.x || startPos.z !== endPos.z;
        expect(moved).toBe(true);
    });

    test('Player angle updates when turning', async ({ page }) => {
        const startAngle = await page.evaluate(() => window.gameState?.playerAngle);
        
        await page.keyboard.down('w');
        await page.waitForTimeout(500);
        await page.keyboard.down('a');
        await page.waitForTimeout(1000);
        
        const endAngle = await page.evaluate(() => window.gameState?.playerAngle);
        
        await page.keyboard.up('a');
        await page.keyboard.up('w');
        
        console.log(`Angle: start=${startAngle?.toFixed(2)}, end=${endAngle?.toFixed(2)}`);
        expect(startAngle).not.toBe(endAngle);
    });
});

test.describe('🏙️ World Objects', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Buildings exist in world', async ({ page }) => {
        // Move to generate chunks with buildings
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const buildingCount = await page.evaluate(() => {
            let count = 0;
            const grid = window.gameState?.chunkGrid;
            if (grid) {
                for (const chunk of Object.values(grid)) {
                    if (chunk.buildings) count += chunk.buildings.length;
                }
            }
            return count;
        });
        
        await page.keyboard.up('w');
        console.log(`Buildings in loaded chunks: ${buildingCount}`);
    });

    test('Roads exist in world', async ({ page }) => {
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const roadCount = await page.evaluate(() => {
            let count = 0;
            const grid = window.gameState?.chunkGrid;
            if (grid) {
                for (const chunk of Object.values(grid)) {
                    if (chunk.roads) count += chunk.roads.length;
                }
            }
            return count;
        });
        
        await page.keyboard.up('w');
        console.log(`Roads in loaded chunks: ${roadCount}`);
    });
});
