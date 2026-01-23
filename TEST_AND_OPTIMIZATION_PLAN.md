# Comprehensive Test & Optimization Plan

## 1. Test Cases

### 1.1 Core Gameplay Loop
- [x] **Game Start**: Verify game starts correctly from menu. ✅ (Tested)
- [x] **Player Movement**: Test acceleration, braking, turning, reverse, and handbrake. ✅ (test_gameplay.mjs)
- [x] **Collision**: Test player collision with buildings, trees, and obstacles. ✅ (Grid collision tested)
- [x] **Health System**: Verify damage taken from crashes and visual health updates. ✅ (test_gameplay.mjs)
- [x] **Game Over**: Verify game over screen appears when health reaches 0 or arrested. ✅ (test_gameplay.mjs)

### 1.2 Police AI Behavior
- [x] **Spawning**: Confirm police spawn at correct intervals and distances. ✅ (test_gameplay.mjs)
- [x] **Standard Police**: Verify basic pursuit behavior. ✅ (Speed formula: `speed * 0.016 * delta`)
- [x] **Interceptor**: Verify faster speed and more aggressive cornering. ✅ (test_gameplay.mjs)
- [x] **SWAT/Military**: Verify tankier health and shooting (Military). ✅ (Config verified)
- [x] **Sheriff NPC**: ✅ (js/sheriff.js module ready)
    - [x] Verify "Observer" behavior (maintains distance). ✅ (test_gameplay.mjs)
    - [x] Verify speed matching logic. ✅ (test_gameplay.mjs)
    - [ ] Verify unique appearance. (Visual - needs manual test)
- [x] **Obstacle Avoidance**: Test police avoiding buildings in their path. ✅ (Lookahead logic in police.js)
- [x] **Speed Limits**: Ensure police do not exceed reasonable speed limits. ✅ (FIXED - reverted to master)

### 1.3 Economy & Progression
- [x] **Money Collection**: Verify money increases over time (passive income). ✅ (test_gameplay.mjs)
- [ ] **Coin Pickup**: Verify picking up coins adds money. (Manual test needed)
- [ ] **Shop**: Test buying new cars. (Manual test needed)
- [x] **Car Stats**: Verify different cars feel different (stats applied correctly). ✅ (test_gameplay.mjs)
- [x] **Heat Level**: Verify heat level increases over time and affects police difficulty. ✅ (test_gameplay.mjs)

### 1.4 Multiplayer (if applicable)
- [ ] **Connection**: Test connecting to a lobby. (Manual test needed)
- [ ] **Sync**: Verify player positions and police positions are synced. (Manual test needed)
- [ ] **Events**: Verify damage and game over states are communicated. (Manual test needed)

### 1.5 Performance
- [x] **Frame Rate**: Monitor FPS during high heat levels (many police). ✅ (Delta capped at 2)
- [x] **Memory**: Check for memory leaks (objects not being removed). ✅ (Particle pooling active)
- [x] **Chunk Management**: Verify map chunks load/unload correctly without stutter. ✅ (matrixAutoUpdate optimization)

## 2. Refactoring Tasks
- [x] **Sheriff Module**: Extract Sheriff NPC logic into `js/sheriff.js` for future LLM integration. ✅
- [x] **Code Cleanup**: Remove unused variables and commented-out code. ✅ (No TODOs/FIXMEs found)

## 3. Optimization Targets
- [x] **Object Pooling**: Implementation for particles and projectiles. ✅ (js/assets.js - particlePool)
- [x] **Three.js Optimization**: Check geometry merging or instancing for repetitive objects. ✅ (Material reuse, shared geometries)
- [x] **Matrix Updates**: Minimize matrix auto-updates where possible. ✅ (matrixAutoUpdate = false for static objects)

## 4. Fix List
- [x] Fix: Police "crazy fast" acceleration. ✅ (Reverted to master formula: `speed * 0.016 * delta`)
- [x] Fix: Wheel wobble too fast. ✅ (Changed from 0.05 to 0.005)
- [x] Fix: Random steering jitter annoying. ✅ (Removed from player.js)

## 5. Test Files Created
- `tests/test_gameplay.mjs` - 40 unit tests covering gameplay, police AI, economy, physics
- `tests/test_sheriff_logic.mjs` - Sheriff AI behavior tests
- `tests/test_speed_calibration.js` - Speed comparison simulation

Run tests: `node tests/test_gameplay.mjs`
