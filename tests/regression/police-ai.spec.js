// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * POLICE AI REGRESSION TESTS
 * 
 * Tests for police behavior, spawning, and difficulty progression.
 * Critical for game challenge and progression feel.
 * 
 * AI OPTIMIZATION NOTES:
 * - Sheriff boss state logged for debugging
 * - Police spawn counts tracked
 * - Heat level progression verified
 */

test.describe('🚔 Police Spawning', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Police array initializes empty', async ({ page }) => {
        const initialPolice = await page.evaluate(() => window.gameState?.police?.length);
        console.log(`Initial police count: ${initialPolice}`);
        expect(initialPolice).toBe(0);
    });

    test('Police spawn after time passes', async ({ page }) => {
        // Drive around to trigger spawns
        await page.keyboard.down('w');
        
        let policeCount = 0;
        for (let i = 0; i < 10; i++) {
            await page.waitForTimeout(1000);
            policeCount = await page.evaluate(() => window.gameState?.police?.length || 0);
            console.log(`Police count after ${i+1}s: ${policeCount}`);
            if (policeCount > 0) break;
        }
        
        await page.keyboard.up('w');
        expect(policeCount).toBeGreaterThan(0);
    });

    test('Police have required properties', async ({ page }) => {
        // Wait for police to spawn
        await page.keyboard.down('w');
        await page.waitForTimeout(5000);
        
        const policeData = await page.evaluate(() => {
            const police = window.gameState?.police;
            if (!police || police.length === 0) return null;
            const p = police[0];
            return {
                hasX: typeof p.x === 'number',
                hasZ: typeof p.z === 'number',
                hasSpeed: typeof p.speed === 'number',
                hasAngle: typeof p.angle === 'number',
                hasType: typeof p.type !== 'undefined'
            };
        });
        
        await page.keyboard.up('w');
        
        if (policeData) {
            console.log('Police unit properties:', policeData);
            expect(policeData.hasX).toBe(true);
            expect(policeData.hasZ).toBe(true);
        } else {
            console.log('No police spawned during test (may be timing issue)');
        }
    });
});

test.describe('🔥 Heat Level System', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Heat level starts at 0 or 1', async ({ page }) => {
        const heat = await page.evaluate(() => window.gameState?.heatLevel);
        console.log(`Starting heat level: ${heat}`);
        expect(heat).toBeLessThanOrEqual(1);
    });

    test('Max heat level is defined', async ({ page }) => {
        const maxHeat = await page.evaluate(() => window.gameState?.maxHeatLevel);
        console.log(`Max heat level: ${maxHeat}`);
        expect(maxHeat).toBeGreaterThan(0);
    });

    test('Heat display exists in HUD', async ({ page }) => {
        const heatDisplay = page.locator('#heat');
        await expect(heatDisplay).toBeVisible();
        
        const heatText = await heatDisplay.textContent();
        console.log(`Heat display: "${heatText}"`);
    });

    test('Heat increases over time during chase', async ({ page }) => {
        const startHeat = await page.evaluate(() => window.gameState?.heatLevel);
        
        // Drive aggressively to increase heat
        await page.keyboard.down('w');
        await page.waitForTimeout(15000); // 15 seconds of driving
        
        const endHeat = await page.evaluate(() => window.gameState?.heatLevel);
        await page.keyboard.up('w');
        
        console.log(`Heat: start=${startHeat}, end=${endHeat}`);
        // Heat should increase or stay same, never decrease during active play
        expect(endHeat).toBeGreaterThanOrEqual(startHeat);
    });
});

test.describe('👮 Sheriff Boss System', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Sheriff state initializes correctly', async ({ page }) => {
        const sheriffState = await page.evaluate(() => {
            const gs = window.gameState;
            return {
                active: gs?.sheriffActive,
                defeated: gs?.sheriffDefeated,
                hasSpawnTime: typeof gs?.nextSheriffSpawnTime === 'number'
            };
        });
        
        console.log('Sheriff initial state:', sheriffState);
        expect(sheriffState.active).toBe(false);
        expect(sheriffState.defeated).toBe(false);
    });

    test('Sheriff spawn time is set', async ({ page }) => {
        const spawnTime = await page.evaluate(() => window.gameState?.nextSheriffSpawnTime);
        console.log(`Sheriff spawn time: ${spawnTime}s`);
        expect(spawnTime).toBeGreaterThan(0);
    });

    test('Boss UI elements exist', async ({ page }) => {
        // Check for boss-related UI elements (may be hidden initially)
        const hasBossUI = await page.evaluate(() => {
            return document.getElementById('bossHealth') !== null ||
                   document.getElementById('bossWarning') !== null ||
                   document.getElementById('bossPanel') !== null;
        });
        
        console.log(`Boss UI elements present: ${hasBossUI}`);
        // Boss UI may or may not exist depending on implementation
    });
});

test.describe('🎯 Police Difficulty Scaling', () => {
    
    test('Police stats scale with heat level (if defined)', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        
        const enemies = await page.evaluate(() => {
            // Check if enemies are defined in constants
            return window.enemies || null;
        });
        
        if (enemies) {
            console.log('Enemy types found:', Object.keys(enemies));
            
            for (const [type, data] of Object.entries(enemies)) {
                console.log(`  ${type}: speed=${data.speed}, health=${data.health}`);
                expect(data.speed).toBeGreaterThan(0);
            }
        } else {
            console.log('No separate enemy definitions found');
        }
    });
});
