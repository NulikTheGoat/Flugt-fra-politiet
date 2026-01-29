# Unified Debris System Plan

## Overview
Create a unified debris system where all debris (from buildings, trees, etc.) follows consistent physics and collision rules.

## Current Issues
1. `fallenDebris` and `smallDebris` are separate arrays with different collision behavior
2. Fallen chunks don't properly collide with cars
3. Flying chunks don't destroy other buildings
4. Inconsistent debris classification

## Goals
1. **Building Collision** → Chunks fall off (already works)
2. **Fallen Chunks** → Remain solid and collidable with everything
3. **Chunk-Car Collision** → Chunks divide into smaller pieces
4. **Flying Chunk-Building Collision** → Destroys parts of other buildings

---

## Architecture

### Single Debris Array: `gameState.debris`
Replace both `fallenDebris` and `smallDebris` with a unified `debris` array.

Each debris item has:
```javascript
debris.userData = {
    isDebris: true,           // Marks as debris (vs building chunk)
    debrisSize: 'large',      // 'large', 'medium', 'small', 'tiny'
    isMoving: true,           // Currently in motion (physics active)
    isCollidable: true,       // Can collide with vehicles
    canShatter: true,         // Can break into smaller pieces
    canDestroyBuildings: true,// Can damage standing buildings when flying
    sourceType: 'building',   // 'building', 'tree', 'vehicle'
    
    // Physics
    velocity: THREE.Vector3,
    rotVelocity: THREE.Vector3,
    gravity: 0.5,
    
    // Size
    width: number,
    height: number,
    depth: number,
    mass: number,             // Affects collision physics
}
```

### Debris Size Categories
| Size | Width Range | Collidable | Can Shatter | Destroys Buildings |
|------|-------------|------------|-------------|-------------------|
| large | 20-80 | Yes (solid) | Yes → medium | Yes |
| medium | 8-20 | Yes (pushable) | Yes → small | Yes (weak) |
| small | 2-8 | Yes (kickable) | Yes → tiny | No |
| tiny | <2 | No | No | No |

---

## Implementation Steps

### Phase 1: State Refactoring
1. Add `debris` array to gameState
2. Deprecate `fallenDebris` and `smallDebris`
3. Add debris size classification helper

### Phase 2: Debris Creation
1. Update building chunk destruction to create proper debris
2. Set correct debris properties based on chunk size
3. Flying chunks inherit `canDestroyBuildings: true`

### Phase 3: Debris Physics
1. Unified physics update loop for all debris
2. Settling detection (moving → stationary)
3. Re-activation when pushed

### Phase 4: Collision Detection
1. **Vehicle ↔ Debris**: Push back vehicle, shatter/push debris
2. **Debris ↔ Building**: Destroy building chunks, reduce debris velocity
3. **Debris ↔ Debris**: Bounce off each other

### Phase 5: Cleanup
1. Remove tiny debris after timeout
2. Remove debris that falls off map
3. Limit total debris count for performance

---

## Test Plan

### Unit Tests (debrisLogic.cjs)
- [ ] Debris size classification
- [ ] Debris property defaults
- [ ] Shatter piece count calculation

### Integration Tests (playwright)
- [ ] Building collision creates falling chunks
- [ ] Fallen chunks block car movement
- [ ] Car collision with chunk creates smaller pieces
- [ ] Flying chunk destroys other building
- [ ] Police car collides with debris
- [ ] Debris settles and becomes stationary
- [ ] Stationary debris re-activates when pushed

---

## Files to Modify
1. `js/state.js` - Add unified debris array
2. `js/world.js` - Refactor debris creation and collision
3. `js/debrisLogic.js` - Add debris classification helpers
4. `tests/test_debris_physics.mjs` - Unit tests
5. `tests/regression/physics-collision.spec.js` - Integration tests
