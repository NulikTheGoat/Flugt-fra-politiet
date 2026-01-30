# Economy & Gamification Enhancement Plan

## 1. Economy Strategy
Currently, money is earned passively every 10 seconds. We will transition to an active + scaling passive economy.

### Features:
- **Collectible Money:** Spawn "coins" or "cash stacks" randomly on the road or map.
    - **Visual:** Spinning gold cylinders or floating text.
    - **Value:** Base value (e.g., $50).
- **Survival Multiplier:** 
    - The longer the player survives, the higher the value of collected money.
    - Passive income increases per "Heat Level".

## 2. Gamification & Difficulty (Heat System)
Introduction of a "Wanted Level" or "Heat Level" that increases over time.

### Heat Levels:
*   **Level 1 (0-45s):** 
    *   **Enemy:** Standard Police Cruiser.
    *   **Behavior:** Normal following.
*   **Level 2 (45-90s):** 
    *   **Enemy:** Sport Interceptor (Black/White).
    *   **Behavior:** Faster, matches Player's top speed.
*   **Level 3 (90-150s):** 
    *   **Enemy:** SWAT Van (Armored Truck).
    *   **Behavior:** Heavy mass, hard to knock around, creates roadblocks.
*   **Level 4 (150s+):** 
    *   **Enemy:** Military Humvee (Camo).
    *   **Behavior:** Very fast, high acceleration, aggressive AI.

## 3. Shop Enhancements
- Update prices to balance with the increased money flow.
- Ensure the shop UI reflects the current money correctly after game over.
- (Optional) Add "Upgrades" besides just new cars (e.g., Armor, Magnet for coins).

## Implementation Steps
- [x] **Refactor Game State:** Add `heatLevel`, `scoreMultiplier`.
- [x] **Money System:**
    - [x] Create `createMoney()` function (in `js/world.js`).
    - [x] Add array `gameState.collectibles`.
    - [x] Add collision check in game loop (`updateCollectibles`).
    - [x] Add floating text visual effect.
- [x] **Enemy Types:**
    - [x] Create `createEnemy(type)` factory logic (in `js/police.js`).
    - [x] Define properties for distinct enemies (mesh color/size, speed, mass).
- [x] **Progression Logic:**
    - [x] Update `updateHUD` or game loop to check elapsed time and upgrade `heatLevel`.
    - [x] Update `spawnPoliceCar` to pick enemy type based on `heatLevel`.
- [x] **Shop Enhancements:**
    - [x] Fix money transfer interaction between Game Over and Shop.
