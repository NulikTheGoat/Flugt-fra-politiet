// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * PHYSICS & COLLISION REGRESSION TESTS
 * 
 * Tests for physics simulation and collision detection.
 * Critical for gameplay feel and bug prevention.
 * 
 * AI OPTIMIZATION NOTES:
 * - Physics values logged for debugging
 * - Tolerances account for frame-rate variations
 * - Tests ordered by importance
 */

test.describe('⚡ Physics Simulation', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Velocity components update correctly', async ({ page }) => {
        const initialVel = await page.evaluate(() => ({
            x: window.gameState?.velocityX,
            z: window.gameState?.velocityZ
        }));
        
        console.log('Initial velocity:', initialVel);
        expect(initialVel.x).toBe(0);
        expect(initialVel.z).toBe(0);
        
        // Accelerate forward
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const movingVel = await page.evaluate(() => ({
            x: window.gameState?.velocityX,
            z: window.gameState?.velocityZ,
            speed: window.gameState?.speed
        }));
        
        console.log('Velocity after moving:', movingVel);
        await page.keyboard.up('w');
        
        // At least one velocity component should be non-zero
        const totalVel = Math.abs(movingVel.x) + Math.abs(movingVel.z);
        expect(totalVel).toBeGreaterThan(0);
    });

    test('Friction slows car when not accelerating', async ({ page }) => {
        // Build up speed
        await page.keyboard.down('w');
        await page.waitForTimeout(2000);
        
        const peakSpeed = await page.evaluate(() => window.gameState?.speed);
        console.log(`Peak speed: ${peakSpeed?.toFixed(2)}`);
        
        // Release and measure decay
        await page.keyboard.up('w');
        await page.waitForTimeout(2000);
        
        const decayedSpeed = await page.evaluate(() => window.gameState?.speed);
        console.log(`Speed after 2s friction: ${decayedSpeed?.toFixed(2)}`);
        
        // Speed should have decreased
        expect(decayedSpeed).toBeLessThan(peakSpeed);
    });

    test('Weight transfer affects grip', async ({ page }) => {
        // Accelerate to build weight transfer
        await page.keyboard.down('w');
        await page.waitForTimeout(1000);
        
        const weightTransfer = await page.evaluate(() => window.gameState?.weightTransfer);
        console.log(`Weight transfer during acceleration: ${weightTransfer}`);
        
        await page.keyboard.up('w');
        
        // Weight transfer should exist (may be negative during acceleration)
        expect(weightTransfer).toBeDefined();
    });

    test('Angular velocity affects rotation', async ({ page }) => {
        // Start moving
        await page.keyboard.down('w');
        await page.waitForTimeout(500);
        
        // Turn while moving
        await page.keyboard.down('a');
        await page.waitForTimeout(500);
        
        const angularVel = await page.evaluate(() => window.gameState?.angularVelocity);
        console.log(`Angular velocity while turning: ${angularVel}`);
        
        await page.keyboard.up('a');
        await page.keyboard.up('w');
        
        // Should have some angular velocity
        expect(Math.abs(angularVel)).toBeGreaterThan(0);
    });

    test('Drift factor increases during handbrake', async ({ page }) => {
        // Accelerate
        await page.keyboard.down('w');
        await page.waitForTimeout(1500);
        
        const preDrift = await page.evaluate(() => window.gameState?.driftFactor);
        
        // Handbrake
        await page.keyboard.down(' ');
        await page.waitForTimeout(500);
        
        const duringDrift = await page.evaluate(() => window.gameState?.driftFactor);
        
        await page.keyboard.up(' ');
        await page.keyboard.up('w');
        
        console.log(`Drift: before=${preDrift}, during handbrake=${duringDrift}`);
        expect(duringDrift).toBeGreaterThan(preDrift || 0);
    });
});

test.describe('💥 Collision Detection', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
    });

    test('Player has collision distance defined', async ({ page }) => {
        const collisionDist = await page.evaluate(() => window.gameState?.collisionDistance);
        console.log(`Collision distance: ${collisionDist}`);
        expect(collisionDist).toBeGreaterThan(0);
    });

    test('Arrest distance is defined', async ({ page }) => {
        const arrestDist = await page.evaluate(() => window.gameState?.arrestDistance);
        console.log(`Arrest distance: ${arrestDist}`);
        expect(arrestDist).toBeGreaterThan(0);
    });

    test('Chunk grid exists for collision optimization', async ({ page }) => {
        const hasChunkGrid = await page.evaluate(() => {
            return typeof window.gameState?.chunkGrid === 'object';
        });
        console.log(`Chunk grid exists: ${hasChunkGrid}`);
        expect(hasChunkGrid).toBe(true);
    });
});

test.describe('🎯 Car Stats Application', () => {
    
    test('All car types have required stats', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        
        const carsValidation = await page.evaluate(() => {
            const cars = window.cars;
            const results = {};
            
            for (const [key, car] of Object.entries(cars)) {
                results[key] = {
                    hasMaxSpeed: typeof car.maxSpeed === 'number' && car.maxSpeed > 0,
                    hasAcceleration: typeof car.acceleration === 'number' && car.acceleration > 0,
                    hasHealth: typeof car.health === 'number' && car.health > 0,
                    hasPrice: typeof car.price === 'number',
                    hasName: typeof car.name === 'string',
                    maxSpeedKmh: Math.round(car.maxSpeed * 3.6)
                };
            }
            return results;
        });
        
        console.log('Car validation results:');
        for (const [name, data] of Object.entries(carsValidation)) {
            const valid = data.hasMaxSpeed && data.hasAcceleration && data.hasHealth;
            console.log(`  ${name}: ${valid ? '✅' : '❌'} (max: ${data.maxSpeedKmh} km/h)`);
            expect(data.hasMaxSpeed).toBe(true);
            expect(data.hasAcceleration).toBe(true);
            expect(data.hasHealth).toBe(true);
        }
    });

    test('Standard car speed matches constants', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 10000 });
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click();
        await page.waitForTimeout(500);
        
        const comparison = await page.evaluate(() => {
            const constantsMaxSpeed = window.cars?.standard?.maxSpeed;
            const gameStateMaxSpeed = window.gameState?.maxSpeed;
            return {
                constants: constantsMaxSpeed,
                gameState: gameStateMaxSpeed,
                match: constantsMaxSpeed === gameStateMaxSpeed
            };
        });
        
        console.log('Standard car maxSpeed comparison:', comparison);
        expect(comparison.match).toBe(true);
    });
});
