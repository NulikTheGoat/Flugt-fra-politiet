# Police & Player Logic Improvements - Implementation Plan

## Phase 1: Player Logic (Quick Wins)
- [ ] 1.1: Remove random steering jitter at low HP (player.js ~line 240)
- [ ] 1.2: Adjust health degradation curve to be less harsh (player.js ~line 220)
- [ ] 1.3: Increase drift grip for better feel (player.js ~line 280)
- [ ] 1.4: Rebalance Tank damage reduction (0.2x → 0.4x) (player.js ~line 188)
- [ ] 1.5: TEST - Play with low HP, verify no jitter, better performance

## Phase 2: Police Obstacle Avoidance
- [ ] 2.1: Add lookahead obstacle detection for standard police (police.js ~line 370)
- [ ] 2.2: Implement lateral scanning (±45°) for alternate routes
- [ ] 2.3: TEST - Spawn police near buildings, verify they avoid collisions

## Phase 3: Police Tactical Positioning
- [ ] 3.1: Calculate player velocity vector for predictive positioning
- [ ] 3.2: Implement "cutoff" logic - some police spawn/move ahead
- [ ] 3.3: Remove speed matching when player is slow (police.js ~line 420)
- [ ] 3.4: Add burst speed (+30%) when within 150 units
- [ ] 3.5: TEST - High-speed chase, verify police pressure and tactics

## Phase 4: Final Integration Testing
- [ ] 4.1: Test with Heat Level 1-2 (basic police)
- [ ] 4.2: Test with Heat Level 3-4 (interceptor/SWAT)
- [ ] 4.3: Test with Heat Level 5 (Sheriff + Military)
- [ ] 4.4: Test multiplayer sync (if applicable)
- [ ] 4.5: Performance check (FPS with 10+ police)

## Rollback Plan
- Git commit after each phase
- If issues found, revert to previous commit
