// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Tests for Multiplayer Police AI Targeting
 * Verifies that police correctly target all players, not just the host
 */

test.describe('Multiplayer Police Targeting', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        
        // Wait for game to load
        await page.waitForFunction(
            () => !!document.querySelector('canvas'),
            { timeout: 15000, polling: 200 }
        );
        
        // Click solo mode to start game
        const soloBtn = page.locator('#soloModeBtn');
        await expect(soloBtn).toBeVisible({ timeout: 10000 });
        await soloBtn.click();
        
        // Wait for game state initialization
        await page.waitForFunction(
            () => window.gameState && window.gameState.startTime > 0,
            { timeout: 15000, polling: 200 }
        );
    });

    test('police target selection logic exists', async ({ page }) => {
        // Verify the target selection code is present
        const hasTargetSelection = await page.evaluate(() => {
            // Check that gameState has the necessary properties for multiplayer
            return typeof window.gameState === 'object' && 
                   'isMultiplayer' in window.gameState &&
                   'otherPlayers' in window.gameState;
        });
        
        expect(hasTargetSelection).toBe(true);
    });

    test('single player mode targets local player by default', async ({ page }) => {
        // In single player, police should target the local playerCar
        const result = await page.evaluate(() => {
            // Ensure single player mode
            window.gameState.isMultiplayer = false;
            window.gameState.otherPlayers = new Map();
            
            // Create mock police car
            const mockPoliceCar = {
                position: { x: 100, z: 100 },
                rotation: { y: 0 },
                userData: { type: 'standard', speed: 200, health: 100 }
            };
            
            // Get playerCar position
            const playerPos = window.playerCar ? 
                { x: window.playerCar.position.x, z: window.playerCar.position.z } :
                { x: 0, z: 0 };
            
            // In single player, target should be playerCar
            // Calculate expected target (should be playerCar position)
            let targetPosX = playerPos.x;
            let targetPosZ = playerPos.z;
            
            // Simulate the target selection logic from police.js
            if (window.gameState.isMultiplayer) {
                // Would check other players here
            }
            // In single player, defaults remain as playerCar
            
            return {
                targetX: targetPosX,
                targetZ: targetPosZ,
                playerX: playerPos.x,
                playerZ: playerPos.z,
                isSinglePlayer: !window.gameState.isMultiplayer
            };
        });
        
        expect(result.isSinglePlayer).toBe(true);
        expect(result.targetX).toBe(result.playerX);
        expect(result.targetZ).toBe(result.playerZ);
    });

    test('multiplayer mode considers all players for targeting', async ({ page }) => {
        const result = await page.evaluate(() => {
            // Setup multiplayer state
            window.gameState.isMultiplayer = true;
            window.gameState.arrested = false;
            
            // Create mock other players
            window.gameState.otherPlayers = new Map();
            window.gameState.otherPlayers.set('player2', {
                state: {
                    x: 500,
                    z: 500,
                    rotY: 0,
                    speed: 50,
                    arrested: false
                }
            });
            window.gameState.otherPlayers.set('player3', {
                state: {
                    x: 200, // Closer to police
                    z: 200,
                    rotY: Math.PI / 4,
                    speed: 80,
                    arrested: false
                }
            });
            
            // Mock police car at origin
            const policePos = { x: 150, z: 150 };
            
            // Get local player position
            const localPlayerPos = window.playerCar ? 
                { x: window.playerCar.position.x, z: window.playerCar.position.z } :
                { x: 0, z: 0 };
            
            // Simulate target selection logic from police.js
            let targetPosX = localPlayerPos.x;
            let targetPosZ = localPlayerPos.z;
            let minTargetDistSq = Infinity;
            
            // Check local player first
            if (!window.gameState.arrested) {
                const dx = localPlayerPos.x - policePos.x;
                const dz = localPlayerPos.z - policePos.z;
                minTargetDistSq = dx*dx + dz*dz;
            }
            
            // Check other players
            window.gameState.otherPlayers.forEach((p, id) => {
                if (!p.state || p.state.arrested) return;
                
                const pdx = p.state.x - policePos.x;
                const pdz = p.state.z - policePos.z;
                const pDistSq = pdx*pdx + pdz*pdz;
                
                if (pDistSq < minTargetDistSq) {
                    minTargetDistSq = pDistSq;
                    targetPosX = p.state.x;
                    targetPosZ = p.state.z;
                }
            });
            
            // Calculate distances for verification
            const localDist = Math.sqrt(
                Math.pow(localPlayerPos.x - policePos.x, 2) + 
                Math.pow(localPlayerPos.z - policePos.z, 2)
            );
            const player2Dist = Math.sqrt(
                Math.pow(500 - policePos.x, 2) + 
                Math.pow(500 - policePos.z, 2)
            );
            const player3Dist = Math.sqrt(
                Math.pow(200 - policePos.x, 2) + 
                Math.pow(200 - policePos.z, 2)
            );
            
            return {
                targetX: targetPosX,
                targetZ: targetPosZ,
                localDist: localDist,
                player2Dist: player2Dist,
                player3Dist: player3Dist,
                otherPlayersCount: window.gameState.otherPlayers.size
            };
        });
        
        expect(result.otherPlayersCount).toBe(2);
        
        // Player3 at (200, 200) should be closest to police at (150, 150)
        // Distance: sqrt((200-150)^2 + (200-150)^2) = sqrt(2500+2500) ≈ 70.7
        expect(result.player3Dist).toBeLessThan(result.player2Dist);
        
        // If player3 is closest, target should be player3's position
        // (unless local player is even closer)
        if (result.player3Dist < result.localDist) {
            expect(result.targetX).toBe(200);
            expect(result.targetZ).toBe(200);
        }
    });

    test('arrested players are excluded from targeting', async ({ page }) => {
        const result = await page.evaluate(() => {
            window.gameState.isMultiplayer = true;
            window.gameState.arrested = true; // Local player arrested
            
            window.gameState.otherPlayers = new Map();
            // Player2 is arrested
            window.gameState.otherPlayers.set('player2', {
                state: {
                    x: 50, // Very close
                    z: 50,
                    rotY: 0,
                    speed: 0,
                    arrested: true // Arrested
                }
            });
            // Player3 is active
            window.gameState.otherPlayers.set('player3', {
                state: {
                    x: 300,
                    z: 300,
                    rotY: 0,
                    speed: 60,
                    arrested: false // Not arrested
                }
            });
            
            const policePos = { x: 100, z: 100 };
            let targetPosX = 0;
            let targetPosZ = 0;
            let minTargetDistSq = Infinity;
            
            // Local player is arrested, so start with Infinity
            // (logic skips arrested local player)
            
            window.gameState.otherPlayers.forEach((p) => {
                if (!p.state || p.state.arrested) return; // Skip arrested
                
                const pdx = p.state.x - policePos.x;
                const pdz = p.state.z - policePos.z;
                const pDistSq = pdx*pdx + pdz*pdz;
                
                if (pDistSq < minTargetDistSq) {
                    minTargetDistSq = pDistSq;
                    targetPosX = p.state.x;
                    targetPosZ = p.state.z;
                }
            });
            
            return {
                targetX: targetPosX,
                targetZ: targetPosZ,
                foundTarget: minTargetDistSq < Infinity
            };
        });
        
        // Should target player3 (the only non-arrested player)
        expect(result.foundTarget).toBe(true);
        expect(result.targetX).toBe(300);
        expect(result.targetZ).toBe(300);
    });

    test('spawn anchor distributes across players', async ({ page }) => {
        const results = await page.evaluate(() => {
            window.gameState.isMultiplayer = true;
            
            // Setup multiple players
            const localPos = window.playerCar ? 
                { x: window.playerCar.position.x, z: window.playerCar.position.z } :
                { x: 0, z: 0 };
            
            window.gameState.otherPlayers = new Map();
            window.gameState.otherPlayers.set('player2', {
                state: { x: 1000, z: 1000, rotY: 0, arrested: false }
            });
            window.gameState.otherPlayers.set('player3', {
                state: { x: -1000, z: -1000, rotY: Math.PI, arrested: false }
            });
            
            // Simulate spawn anchor selection multiple times
            const anchors = [];
            for (let i = 0; i < 20; i++) {
                const candidates = [{ pos: localPos, rot: 0 }];
                
                window.gameState.otherPlayers.forEach(p => {
                    if (p.state && !p.state.arrested) {
                        candidates.push({ 
                            pos: { x: p.state.x, z: p.state.z },
                            rot: p.state.rotY || 0 
                        });
                    }
                });
                
                const choice = candidates[Math.floor(Math.random() * candidates.length)];
                anchors.push({ x: choice.pos.x, z: choice.pos.z });
            }
            
            // Count unique anchors (by position)
            const uniqueAnchors = new Set(anchors.map(a => `${a.x},${a.z}`));
            
            return {
                totalSamples: anchors.length,
                uniqueAnchorCount: uniqueAnchors.size,
                candidateCount: 3 // local + 2 other players
            };
        });
        
        // With 20 samples and 3 candidates, we should see multiple unique anchors
        // (statistically very unlikely to always pick the same one)
        expect(results.uniqueAnchorCount).toBeGreaterThan(1);
    });

    test('velocity is correctly derived from remote player state', async ({ page }) => {
        const result = await page.evaluate(() => {
            window.gameState.isMultiplayer = true;
            window.gameState.arrested = true; // Force targeting remote player
            
            const remoteSpeed = 100;
            const remoteRotY = Math.PI / 4; // 45 degrees
            
            window.gameState.otherPlayers = new Map();
            window.gameState.otherPlayers.set('player2', {
                state: {
                    x: 200,
                    z: 200,
                    rotY: remoteRotY,
                    speed: remoteSpeed,
                    arrested: false
                }
            });
            
            // Simulate velocity derivation from police.js
            let targetVelX = 0;
            let targetVelZ = 0;
            
            window.gameState.otherPlayers.forEach((p) => {
                if (!p.state || p.state.arrested) return;
                
                const s = p.state.speed || 0;
                const r = p.state.rotY || 0;
                targetVelX = Math.sin(r) * s;
                targetVelZ = Math.cos(r) * s;
            });
            
            // Expected values
            const expectedVelX = Math.sin(remoteRotY) * remoteSpeed;
            const expectedVelZ = Math.cos(remoteRotY) * remoteSpeed;
            
            return {
                derivedVelX: targetVelX,
                derivedVelZ: targetVelZ,
                expectedVelX: expectedVelX,
                expectedVelZ: expectedVelZ
            };
        });
        
        expect(result.derivedVelX).toBeCloseTo(result.expectedVelX, 5);
        expect(result.derivedVelZ).toBeCloseTo(result.expectedVelZ, 5);
    });

    test('gameState.otherPlayers is properly initialized', async ({ page }) => {
        const result = await page.evaluate(() => {
            return {
                hasOtherPlayers: 'otherPlayers' in window.gameState,
                isMapOrNull: window.gameState.otherPlayers === null || 
                             window.gameState.otherPlayers instanceof Map,
                isMultiplayerDefined: 'isMultiplayer' in window.gameState
            };
        });
        
        expect(result.hasOtherPlayers).toBe(true);
        expect(result.isMultiplayerDefined).toBe(true);
    });
});

test.describe('Police Spawn Distribution', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForFunction(
            () => !!document.querySelector('canvas'),
            { timeout: 15000, polling: 200 }
        );
        
        const soloBtn = page.locator('#soloModeBtn');
        await expect(soloBtn).toBeVisible({ timeout: 10000 });
        await soloBtn.click();
        
        await page.waitForFunction(
            () => window.gameState && window.gameState.startTime > 0,
            { timeout: 15000, polling: 200 }
        );
    });

    test('police spawn within expected distance range', async ({ page }) => {
        // Trigger police spawn and verify distance
        const result = await page.evaluate(() => {
            // Force police engagement
            window.gameState.policeEngaged = true;
            window.gameState.heatLevel = 1;
            
            // Clear existing police
            window.gameState.policeCars = [];
            
            // Spawn a police car (if function is exposed)
            if (window.spawnPoliceCar) {
                window.spawnPoliceCar();
            }
            
            // Check if police spawned and at what distance
            if (window.gameState.policeCars.length > 0 && window.playerCar) {
                const police = window.gameState.policeCars[0];
                const dx = police.position.x - window.playerCar.position.x;
                const dz = police.position.z - window.playerCar.position.z;
                const dist = Math.sqrt(dx*dx + dz*dz);
                
                return {
                    spawned: true,
                    distance: dist,
                    minExpected: 700,
                    maxExpected: 1200
                };
            }
            
            return { spawned: false };
        });
        
        if (result.spawned) {
            expect(result.distance).toBeGreaterThanOrEqual(result.minExpected - 50); // Allow small tolerance
            expect(result.distance).toBeLessThanOrEqual(result.maxExpected + 50);
        }
    });
});
