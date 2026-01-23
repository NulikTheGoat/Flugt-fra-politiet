# Police & Player Logic Improvements - Implementation Plan

## ✅ Phase 1: Player Logic (Quick Wins) - COMPLETE
**Commit:** `1de0ffc` - "Phase 1: Player logic improvements - removed jitter, adjusted curves, improved drift"

- [x] 1.1: Remove random steering jitter at low HP (player.js ~line 240)
- [x] 1.2: Adjust health degradation curve to be less harsh (player.js ~line 220)
  - Changed from `0.2 + (0.8 * healthFactor)` to `0.5 + (0.5 * healthFactor)`
- [x] 1.3: Increase drift grip for better feel (player.js ~line 280)
  - Changed from `0.1 + grip * 0.15` to `0.15 + grip * 0.25`
- [x] 1.4: Rebalance Tank damage reduction (0.2x → 0.4x) (player.js ~line 188)
- [x] 1.5: TEST - Code verified, no syntax errors

## ✅ Phase 2: Police Obstacle Avoidance - COMPLETE
**Commit:** `cf84362` - "Phase 2 & 3: Police AI improvements - obstacle avoidance for all, predictive targeting, burst speed"

- [x] 2.1: Extended Sheriff's lookahead obstacle detection to ALL police types
  - Sheriff: 80 units, Interceptor: 60u, SWAT/Military: 50u, Standard: 55u
- [x] 2.2: Each type turns 90° when obstacle detected ahead
- [x] 2.3: TEST - Code verified, no syntax errors

## ✅ Phase 3: Police Tactical Positioning - COMPLETE
**Commit:** Same as Phase 2 - `cf84362`

- [x] 3.1: Implemented predictive targeting using player velocity vector
- [x] 3.2: Police now aim for intercept point (except Sheriff)
- [x] 3.3: Added burst speed (+20%) when within 200 units (but >80 units)
- [x] 3.4: TEST - Code verified, no syntax errors

## Phase 4: Final Integration Testing - READY
- [ ] 4.1: Test with Heat Level 1-2 (basic police)
- [ ] 4.2: Test with Heat Level 3-4 (interceptor/SWAT)
- [ ] 4.3: Test with Heat Level 5 (Sheriff + Military)
- [ ] 4.4: Test multiplayer sync (if applicable)
- [ ] 4.5: Performance check (FPS with 10+ police)

## Rollback Plan
✅ Commits created after each phase for easy rollback if needed
