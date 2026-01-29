# Physics Engine Migration Plan (Upgrade to Cannon.js)

## Goal
Replace the custom arcade physics for debris and dynamic objects with **Cannon.js** (a rigid body physics engine) to achieve "Physion-level" realism (stacking, chain reactions, improved tumbling).

## Architecture: Hybrid Approach
*   **Player Car & Police**: Start with existing Arcade Physics (Kinematic Bodies in Physics World) to preserve fun driving feel.
*   **Debris / Buildings / Props**: Fully stimulated Dynamic Bodies in Physics World.

## Steps

### Phase 1: Setup & Integration
1.  **Install Cannon.js**: `npm install cannon-es` (Done).
2.  **Import Map**: update `index.html` to map `cannon-es` to the local node_modules path.
3.  **Physics Module**: Create `js/physicsWorld.js` to manage the `CANNON.World`.
4.  **Game Loop Integration**: Update `js/main.js` to step the physics world.

### Phase 2: Debris System Refactor
1.  **Refactor `js/debrisLogic.js`**:
    *   Remove custom `updateDebris` movement logic.
    *   Add `createDebrisBody` function to generate Cannon bodies.
    *   Add collision material definitions (concrete, glass, etc.).
2.  **Sync System**: Ensure Three.js meshes copy position/rotation from Cannon bodies every frame.

### Phase 3: Player Interaction
1.  **Kinematic Player**: Add a simple box in the Physics World that follows the Player Car.
2.  **Collision Handling**: Ensure the kinematic player pushes dynamic debris realistically.

### Phase 4: Stress Testing
1.  **Performance Check**: Limit body count (max ~300-500 active bodies) to maintain 60FPS.
2.  **Cleanup**: Automatically sleep or remove bodies that fall out of the world or stop moving to save CPU.

## Physics Config (Proposed)
*   **Gravity**: -9.82 m/s² (Standard Earth gravity)
*   **Materials**:
    *   `groundMaterial`: High friction.
    *   `carMaterial`: Low friction (slippery for debris).
    *   `debrisMaterial`: High friction, low restitution (doesn't bounce forever).
