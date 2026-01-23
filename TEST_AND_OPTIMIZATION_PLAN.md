# Comprehensive Test & Optimization Plan

## 1. Test Cases

### 1.1 Core Gameplay Loop
- [ ] **Game Start**: Verify game starts correctly from menu.
- [ ] **Player Movement**: Test acceleration, braking, turning, reverse, and handbrake.
- [ ] **Collision**: Test player collision with buildings, trees, and obstacles.
- [ ] **Health System**: Verify damage taken from crashes and visual health updates.
- [ ] **Game Over**: Verify game over screen appears when health reaches 0 or arrested.

### 1.2 Police AI Behavior
- [ ] **Spawning**: Confirm police spawn at correct intervals and distances.
- [ ] **Standard Police**: Verify basic pursuit behavior.
- [ ] **Interceptor**: Verify faster speed and more aggressive cornering.
- [ ] **SWAT/Military**: Verify tankier health and shooting (Military).
- [ ] **Sheriff NPC**:
    - [ ] Verify "Observer" behavior (maintains distance).
    - [ ] Verify speed matching logic.
    - [ ] Verify unique appearance.
- [ ] **Obstacle Avoidance**: Test police avoiding buildings in their path.
- [ ] **Speed Limits**: Ensure police do not exceed reasonable speed limits (no "crazy fast" acceleration).

### 1.3 Economy & Progression
- [ ] **Money Collection**: Verify money increases over time (passive income).
- [ ] **Coin Pickup**: Verify picking up coins adds money.
- [ ] **Shop**: Test buying new cars.
- [ ] **Car Stats**: Verify different cars feel different (stats applied correctly).
- [ ] **Heat Level**: Verify heat level increases over time and affects police difficulty.

### 1.4 Multiplayer (if applicable)
- [ ] **Connection**: Test connecting to a lobby.
- [ ] **Sync**: Verify player positions and police positions are synced.
- [ ] **Events**: Verify damage and game over states are communicated.

### 1.5 Performance
- [ ] **Frame Rate**: Monitor FPS during high heat levels (many police).
- [ ] **Memory**: Check for memory leaks (objects not being removed).
- [ ] **Chunk Management**: Verify map chunks load/unload correctly without stutter.

## 2. Refactoring Tasks
- [ ] **Sheriff Module**: Extract Sheriff NPC logic into `js/sheriff.js` for future LLM integration.
- [ ] **Code Cleanup**: Remove unused variables and commented-out code.

## 3. Optimization Targets
- [ ] **Object Pooling**: Implementation for particles and projectiles if performance lags.
- [ ] **Three.js Optimization**: Check geometry merging or instancing for repetitive objects (trees, buildings).
- [ ] **Matrix Updates**: Minimize matrix auto-updates where possible.

## 4. Fix List (To be populated)
- [ ] Fix: Police "crazy fast" acceleration (Completed).
- [ ] Fix: [Placeholder for found bugs]
