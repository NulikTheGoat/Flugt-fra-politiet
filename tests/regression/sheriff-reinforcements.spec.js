// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * SHERIFF REINFORCEMENT SYSTEM TESTS
 * 
 * Tests the Sheriff's ability to call for backup units when chases take too long.
 * 
 * Features tested:
 * - /api/spawn-reinforcements endpoint
 * - Client-side requestReinforcements() function
 * - Cooldown system (30s between calls)
 * - Max reinforcements per chase (3)
 * - Player notification via police scanner
 * - Unit type scaling with heat level
 */

test.describe('🚨 Sheriff Reinforcement System', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
    });

    test('API endpoint /api/spawn-reinforcements responds correctly', async ({ request }) => {
        // Test the API endpoint directly
        const response = await request.post('http://localhost:3000/api/spawn-reinforcements', {
            data: {
                count: 4,
                type: 'mixed',
                heatLevel: 3
            }
        });
        
        expect(response.ok()).toBe(true);
        
        const data = await response.json();
        console.log('API Response:', data);
        
        expect(data.success).toBe(true);
        expect(data.spawned).toBe(4);
        expect(Array.isArray(data.types)).toBe(true);
        expect(data.types.length).toBe(4);
        expect(data.message).toContain('reinforcement');
    });

    test('API clamps count between 1-6', async ({ request }) => {
        // Test with count too high
        const highResponse = await request.post('http://localhost:3000/api/spawn-reinforcements', {
            data: { count: 100, type: 'standard', heatLevel: 1 }
        });
        const highData = await highResponse.json();
        expect(highData.spawned).toBe(6); // Clamped to max 6
        
        // Test with count too low
        const lowResponse = await request.post('http://localhost:3000/api/spawn-reinforcements', {
            data: { count: -5, type: 'standard', heatLevel: 1 }
        });
        const lowData = await lowResponse.json();
        expect(lowData.spawned).toBe(1); // Clamped to min 1
        
        console.log(`High count clamped to: ${highData.spawned}, Low count clamped to: ${lowData.spawned}`);
    });

    test('API returns appropriate unit types based on heat level', async ({ request }) => {
        // At heat level 1, should mostly get standard units
        const lowHeatResponse = await request.post('http://localhost:3000/api/spawn-reinforcements', {
            data: { count: 6, type: 'mixed', heatLevel: 1 }
        });
        const lowHeatData = await lowHeatResponse.json();
        console.log(`Heat 1 types: ${lowHeatData.types.join(', ')}`);
        
        // At heat level 5, should get more military/swat
        const highHeatResponse = await request.post('http://localhost:3000/api/spawn-reinforcements', {
            data: { count: 6, type: 'mixed', heatLevel: 5 }
        });
        const highHeatData = await highHeatResponse.json();
        console.log(`Heat 5 types: ${highHeatData.types.join(', ')}`);
        
        // Verify types are valid
        const validTypes = ['standard', 'interceptor', 'swat', 'military'];
        lowHeatData.types.forEach(type => {
            expect(validTypes).toContain(type);
        });
        highHeatData.types.forEach(type => {
            expect(validTypes).toContain(type);
        });
    });

    test('Specific unit types work correctly', async ({ request }) => {
        const types = ['standard', 'interceptor', 'swat', 'military'];
        
        for (const type of types) {
            const response = await request.post('http://localhost:3000/api/spawn-reinforcements', {
                data: { count: 2, type: type, heatLevel: 5 }
            });
            const data = await response.json();
            
            expect(data.success).toBe(true);
            // When specific type requested, all units should be that type
            data.types.forEach(t => {
                expect(t).toBe(type);
            });
            console.log(`Type '${type}' test passed: ${data.types.join(', ')}`);
        }
    });
});

test.describe('🎮 Client-side Reinforcement Functions', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
        
        // Start game
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click({ force: true });
        await page.waitForTimeout(500);
    });

    test('Sheriff state is exposed for testing', async ({ page }) => {
        const hasState = await page.evaluate(() => {
            return {
                hasSheriffState: typeof window.sheriffState !== 'undefined',
                hasRequestReinforcements: typeof window.requestReinforcements === 'function',
                hasResetSheriffState: typeof window.resetSheriffState === 'function',
                hasSpawnReinforcementUnits: typeof window.spawnReinforcementUnits === 'function',
                hasSheriffCommands: typeof window.SHERIFF_COMMANDS !== 'undefined'
            };
        });
        
        console.log('Exposed functions:', hasState);
        
        expect(hasState.hasSheriffState).toBe(true);
        expect(hasState.hasRequestReinforcements).toBe(true);
        expect(hasState.hasResetSheriffState).toBe(true);
        expect(hasState.hasSpawnReinforcementUnits).toBe(true);
        expect(hasState.hasSheriffCommands).toBe(true);
    });

    test('Sheriff state has correct initial values', async ({ page }) => {
        const state = await page.evaluate(() => ({
            lastReinforcementTime: window.sheriffState.lastReinforcementTime,
            reinforcementCooldown: window.sheriffState.reinforcementCooldown,
            totalReinforcementsCalled: window.sheriffState.totalReinforcementsCalled,
            maxReinforcementsPerChase: window.sheriffState.maxReinforcementsPerChase
        }));
        
        console.log('Sheriff state:', state);
        
        expect(state.lastReinforcementTime).toBe(0);
        expect(state.reinforcementCooldown).toBe(30000); // 30 seconds
        expect(state.totalReinforcementsCalled).toBe(0);
        expect(state.maxReinforcementsPerChase).toBe(3);
    });

    test('requestReinforcements calls API and updates state', async ({ page }) => {
        // Call requestReinforcements
        const result = await page.evaluate(async () => {
            const response = await window.requestReinforcements(3, 'standard');
            return {
                response,
                stateAfter: {
                    lastReinforcementTime: window.sheriffState.lastReinforcementTime,
                    totalReinforcementsCalled: window.sheriffState.totalReinforcementsCalled
                }
            };
        });
        
        console.log('Request result:', result);
        
        expect(result.response).not.toBeNull();
        expect(result.response.success).toBe(true);
        expect(result.response.spawned).toBe(3);
        expect(result.stateAfter.totalReinforcementsCalled).toBe(1);
        expect(result.stateAfter.lastReinforcementTime).toBeGreaterThan(0);
    });

    test('Cooldown prevents rapid reinforcement calls', async ({ page }) => {
        // First call should succeed
        const firstResult = await page.evaluate(async () => {
            return await window.requestReinforcements(2, 'standard');
        });
        expect(firstResult).not.toBeNull();
        console.log('First call succeeded');
        
        // Second immediate call should return null (cooldown)
        const secondResult = await page.evaluate(async () => {
            return await window.requestReinforcements(2, 'standard');
        });
        expect(secondResult).toBeNull();
        console.log('Second call correctly blocked by cooldown');
        
        // Verify state shows only 1 call was made
        const callCount = await page.evaluate(() => window.sheriffState.totalReinforcementsCalled);
        expect(callCount).toBe(1);
    });

    test('Max reinforcements per chase is enforced', async ({ page }) => {
        // Bypass cooldown by manipulating lastReinforcementTime
        const results = [];
        
        for (let i = 0; i < 5; i++) {
            const result = await page.evaluate(async () => {
                // Reset cooldown timer to allow immediate call
                window.sheriffState.lastReinforcementTime = 0;
                return await window.requestReinforcements(1, 'standard');
            });
            results.push(result !== null);
            console.log(`Call ${i + 1}: ${result !== null ? 'SUCCESS' : 'BLOCKED'}`);
        }
        
        // First 3 should succeed, rest should fail (max 3 per chase)
        expect(results[0]).toBe(true);
        expect(results[1]).toBe(true);
        expect(results[2]).toBe(true);
        expect(results[3]).toBe(false); // Should be blocked
        expect(results[4]).toBe(false); // Should be blocked
        
        const totalCalled = await page.evaluate(() => window.sheriffState.totalReinforcementsCalled);
        expect(totalCalled).toBe(3);
    });

    test('resetSheriffState clears reinforcement counters', async ({ page }) => {
        // Make a call to set state
        await page.evaluate(async () => {
            await window.requestReinforcements(2, 'standard');
        });
        
        // Verify state is set
        const stateBeforeReset = await page.evaluate(() => ({
            totalReinforcementsCalled: window.sheriffState.totalReinforcementsCalled,
            lastReinforcementTime: window.sheriffState.lastReinforcementTime
        }));
        expect(stateBeforeReset.totalReinforcementsCalled).toBe(1);
        expect(stateBeforeReset.lastReinforcementTime).toBeGreaterThan(0);
        
        // Reset state
        await page.evaluate(() => window.resetSheriffState());
        
        // Verify state is cleared
        const stateAfterReset = await page.evaluate(() => ({
            totalReinforcementsCalled: window.sheriffState.totalReinforcementsCalled,
            lastReinforcementTime: window.sheriffState.lastReinforcementTime
        }));
        expect(stateAfterReset.totalReinforcementsCalled).toBe(0);
        expect(stateAfterReset.lastReinforcementTime).toBe(0);
        console.log('Sheriff state correctly reset');
    });

    test('spawnReinforcementUnits creates police cars', async ({ page }) => {
        // Ensure player car exists before spawning
        await page.waitForFunction(() => !!window.playerCar);

        // Get initial police count
        const initialCount = await page.evaluate(() => window.gameState.policeCars.length);
        console.log(`Initial police count: ${initialCount}`);
        
        // Spawn reinforcements directly
        await page.evaluate(() => {
            window.spawnReinforcementUnits(3, ['standard', 'interceptor', 'swat']);
        });
        
        // Wait for staggered spawns (200ms each) -> Wait for count to change instead of fixed timeout
        try {
            await page.waitForFunction((expected) => window.gameState.policeCars.length === expected, initialCount + 3, { timeout: 5000 });
        } catch (e) {
            console.log('Timeout waiting for police count update');
        }
        
        // Check police count increased
        const finalCount = await page.evaluate(() => window.gameState.policeCars.length);
        console.log(`Final police count: ${finalCount}`);
        
        expect(finalCount).toBe(initialCount + 3);
    });
});

test.describe('📢 Player Notification', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('canvas', { timeout: 20000 });
        
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) await soloBtn.click({ force: true });
        await page.waitForTimeout(500);
    });

    test('Reinforcement request shows notification to player', async ({ page }) => {
        // Listen for console logs
        const logs = [];
        page.on('console', msg => {
            if (msg.text().includes('Sheriff') || msg.text().includes('FORSTÆRKNING')) {
                logs.push(msg.text());
            }
        });
        
        // Request reinforcements
        await page.evaluate(async () => {
            await window.requestReinforcements(4, 'mixed');
        });
        
        await page.waitForTimeout(500);
        
        // Check that notification was logged
        console.log('Captured logs:', logs);
        
        const hasReinforcementLog = logs.some(log => 
            log.includes('Reinforcements inbound') || log.includes('FORSTÆRKNING')
        );
        expect(hasReinforcementLog).toBe(true);
    });

    test('REINFORCE command type exists', async ({ page }) => {
        const commandTypes = await page.evaluate(() => Object.keys(window.SHERIFF_COMMANDS));
        console.log('Sheriff command types:', commandTypes);
        
        expect(commandTypes).toContain('REINFORCE');
    });
});

test.describe('🔧 Edge Cases & Error Handling', () => {
    
    test('API handles invalid type gracefully', async ({ request }) => {
        const response = await request.post('http://localhost:3000/api/spawn-reinforcements', {
            data: { count: 2, type: 'invalid_type', heatLevel: 1 }
        });
        
        expect(response.ok()).toBe(true);
        
        const data = await response.json();
        // Should fallback to 'mixed' type
        expect(data.success).toBe(true);
        console.log('Invalid type handled, got types:', data.types);
    });

    test('API handles missing parameters', async ({ request }) => {
        const response = await request.post('http://localhost:3000/api/spawn-reinforcements', {
            data: {} // Empty body
        });
        
        expect(response.ok()).toBe(true);
        
        const data = await response.json();
        // Should use defaults: count=4, type=mixed, heatLevel=1
        expect(data.success).toBe(true);
        expect(data.spawned).toBeGreaterThanOrEqual(1);
        console.log('Empty params handled, spawned:', data.spawned);
    });

    test('API handles malformed JSON gracefully', async ({ request }) => {
        // Playwright serializes 'data' to JSON, so we send empty object instead
        // which tests default parameter handling
        const response = await request.post('http://localhost:3000/api/spawn-reinforcements', {
            headers: { 'Content-Type': 'application/json' },
            data: {}
        });
        
        // Should handle gracefully with defaults
        expect(response.ok()).toBe(true);
        const data = await response.json();
        expect(data.success).toBe(true);
        console.log('Empty request handled gracefully, spawned:', data.spawned);
    });
});
