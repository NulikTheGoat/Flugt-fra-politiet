# 🛠️ Developer Guide - Flugt fra Politiet

## Welcome, Developer! 👋

This guide will help you get started with developing and contributing to Flugt fra Politiet. Whether you're fixing a bug, adding a feature, or just exploring the code, this document has you covered.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Development Environment Setup](#development-environment-setup)
3. [Project Structure](#project-structure)
4. [Common Development Tasks](#common-development-tasks)
5. [Code Style Guidelines](#code-style-guidelines)
6. [Testing Your Changes](#testing-your-changes)
7. [Debugging Tips](#debugging-tips)
8. [Common Patterns](#common-patterns)
9. [Performance Best Practices](#performance-best-practices)
10. [Contributing Guidelines](#contributing-guidelines)

---

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- A modern web browser (Chrome, Firefox, Edge)
- A code editor (VS Code recommended)
- Git

### Get the Code
```bash
git clone https://github.com/NulikTheGoat/Flugt-fra-politiet.git
cd Flugt-fra-politiet
```

### Run Single Player (No Installation)
```bash
npx serve
# Open http://localhost:3000
```

### Run Multiplayer (Requires Installation)
```bash
npm install
npm start
# Open http://localhost:3000
```

### Make Changes
1. Edit files in `js/` directory
2. Refresh browser to see changes
3. No build step needed! 🎉

---

## Development Environment Setup

### Recommended VS Code Extensions
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Live Server** - Alternative to npx serve
- **Three.js Snippets** - Helpful Three.js code snippets
- **GitLens** - Enhanced Git integration

### VS Code Settings (Optional)
Create `.vscode/settings.json`:
```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "files.eol": "\n"
}
```

### Browser DevTools Setup
1. Open DevTools (F12)
2. Enable "Preserve log" in Console tab
3. Consider installing [Three.js Inspector extension](https://github.com/threejs/three-devtools)

---

## Project Structure

```
Flugt-fra-politiet/
├── index.html              # Main game page - UI structure
├── config.html             # Configuration page (settings)
├── server.js               # Multiplayer server (WebSocket)
├── package.json            # Dependencies (only 'ws' for WebSocket)
│
├── js/                     # All game logic (ES6 modules)
│   ├── main.js             # 🔑 Entry point, game loop
│   ├── state.js            # 🔑 Global state (read this first!)
│   ├── config.js           # 🔧 Tunable parameters
│   ├── constants.js        # 📊 Game data (car specs, etc.)
│   ├── core.js             # 🎬 Three.js setup
│   ├── player.js           # 🚗 Player physics and input
│   ├── police.js           # 👮 Police AI and spawning
│   ├── sheriff.js          # 🎖️ Special sheriff AI
│   ├── world.js            # 🌍 Terrain and buildings
│   ├── ui.js               # 📱 HUD and menus
│   ├── particles.js        # ✨ Visual effects
│   ├── network.js          # 🌐 Multiplayer client
│   ├── commentary.js       # 🎙️ LLM commentary (optional)
│   ├── levelEditor.js      # 🗺️ Level editor (experimental)
│   ├── utils.js            # 🔧 Utility functions
│   └── assets.js           # 🎨 Asset loading
│
├── tests/                  # Test scripts
│   └── test_speed_calibration.js
│
├── docs/                   # Documentation (you're reading it!)
│   ├── PROJECT_CONTEXT.md       # 📖 Overview for LLMs
│   ├── CODE_ARCHITECTURE.md     # 🏗️ Technical deep dive
│   ├── DEVELOPER_GUIDE.md       # 👨‍💻 This file
│   └── CHANGELOG.md             # 📋 Version history
│
└── [plan files]            # Development roadmaps
    ├── IMPLEMENTATION_PLAN.md
    ├── llm_commentary_plan.md
    └── ... (various other plans)
```

**🔑 Key Files to Understand**:
1. **state.js** - All game state lives here
2. **main.js** - Game loop and initialization
3. **player.js** - How the player car works
4. **police.js** - How police AI works

---

## Common Development Tasks

### Task 1: Add a New Car Type

**Step 1**: Define car specs in `js/constants.js`
```javascript
export const cars = {
  // ... existing cars
  
  mynewcar: {
    speed: 130,           // Max speed
    acceleration: 45,     // How fast it accelerates
    handling: 7,          // Turn rate (1-10)
    health: 90,           // Starting health
    drift: 0.7,           // Drift factor (0-1)
    color: 0xff00ff,      // Car color (hex)
    price: 5000,          // Cost in shop
    damageReduction: 1.0, // Damage multiplier (Tank is 0.4)
    canShoot: false       // Can it shoot? (Tank only)
  }
};
```

**Step 2**: Add to shop UI in `js/ui.js` (search for "shopCarList")
```javascript
// Find the buildShopUI() function and add your car
<div class="shop-car-item" data-car="mynewcar">
  <div class="shop-car-name">My New Car</div>
  <div class="shop-car-stats">
    <!-- Add stats display -->
  </div>
  <button class="shop-buy-btn">Køb (5000 kr)</button>
</div>
```

**Step 3**: Test by starting game and going to shop

### Task 2: Add a New Police Type

**Step 1**: Define in `js/constants.js`
```javascript
export const policeTypes = {
  // ... existing types
  
  superfast: {
    speed: 150,
    acceleration: 70,
    health: 100,
    color: 0xff0000,
    model: 'standard',  // Visual model to use
    canShoot: false,
    shootInterval: 0,
    minHeat: 5          // Only spawn at heat level 5+
  }
};
```

**Step 2**: Add spawning logic in `js/police.js` (search for "spawnPoliceBasedOnHeat")
```javascript
function spawnPoliceBasedOnHeat() {
  const heat = gameState.heatLevel;
  
  if (heat >= 5 && Math.random() < 0.2) {
    spawnPoliceCar('superfast');
  }
  // ... rest of spawn logic
}
```

**Step 3**: Test by playing until heat level 5

### Task 3: Adjust Physics Parameters

**Edit `js/config.js`**:
```javascript
export const gameConfig = {
  player: {
    acceleration: 50,     // Increase for faster acceleration
    maxSpeed: 200,        // Increase for higher top speed
    turnSpeed: 2.5,       // Increase for sharper turns
    friction: 1.5,        // Increase to slow down faster
    driftGrip: 0.3        // Decrease for more sliding
  },
  // ... other config
};
```

**Test**: Just refresh browser and drive!

### Task 4: Add a New Collectible

**Step 1**: Create collectible in `js/world.js`
```javascript
function createMyCollectible(position) {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const collectible = new THREE.Mesh(geometry, material);
  
  collectible.position.copy(position);
  collectible.userData.type = 'mycollectible';
  scene.add(collectible);
  
  gameState.myCollectibles.push(collectible);
}
```

**Step 2**: Add collection logic in `updateCollectibles()`
```javascript
// Check for collection
const dist = playerCar.position.distanceTo(collectible.position);
if (dist < 5) {
  // Player collected it!
  applyPowerUp();
  removeCollectible(collectible);
}
```

### Task 5: Modify Police AI Behavior

**Edit `js/police.js`**, find `updatePoliceAI()`:
```javascript
function updatePoliceAI(deltaTime) {
  policeArray.forEach(police => {
    // Example: Make police more aggressive at night
    const isNight = gameState.time % 240 < 120;
    const aggressionMultiplier = isNight ? 1.5 : 1.0;
    
    police.speed *= aggressionMultiplier;
    
    // ... rest of AI logic
  });
}
```

### Task 6: Add a HUD Element

**Step 1**: Add HTML in `index.html`
```html
<div id="myNewHudElement" class="hud-item">
  <span id="myValue">0</span>
</div>
```

**Step 2**: Update in `js/ui.js`
```javascript
function updateHUD() {
  // ... existing HUD updates
  
  // Update your element
  const myValueElement = document.getElementById('myValue');
  if (myValueElement) {
    myValueElement.textContent = gameState.myValue;
  }
}
```

**Step 3**: Style in CSS (add to index.html `<style>` section)
```css
#myNewHudElement {
  position: absolute;
  top: 100px;
  left: 20px;
  color: white;
  font-size: 18px;
}
```

---

## Code Style Guidelines

### Language
- **Code & Comments**: English
- **UI Text**: Danish
- **Variable Names**: English, descriptive

### Naming Conventions
```javascript
// Variables and functions: camelCase
let playerSpeed = 100;
function updatePlayer() { }

// Constants: UPPER_SNAKE_CASE
const MAX_POLICE_COUNT = 20;
const SPAWN_INTERVAL = 10;

// File names: lowercase with extensions
// player.js, police.js, ui.js

// CSS classes: kebab-case
// .hud-item, .shop-car-item
```

### Code Formatting
- **Indentation**: 2 spaces (not tabs)
- **Line Length**: Keep under 100 characters when possible
- **Semicolons**: Use them consistently
- **Quotes**: Single quotes `'string'` preferred, but be consistent
- **Braces**: Always use braces for if/for/while

### Comments
```javascript
// Good: Explain WHY, not WHAT
// Increase speed gradually to avoid jarring acceleration
velocity.z += acceleration * deltaTime * 0.5;

// Bad: Stating the obvious
// Add acceleration to velocity
velocity.z += acceleration;

// Good: Document complex logic
/**
 * Calculate predictive intercept point for police AI.
 * Uses player velocity to aim where player will be,
 * not where they currently are.
 */
function calculateInterceptPoint(player, police) { }
```

### Module Structure
```javascript
// 1. Imports at top
import { gameState } from './state.js';
import { gameConfig } from './config.js';

// 2. Module-level variables
let localVariable = 0;

// 3. Private functions (not exported)
function privateHelper() { }

// 4. Public functions (exported)
export function publicFunction() { }

// 5. No code execution at module level (except initialization)
```

---

## Testing Your Changes

### Manual Testing Checklist

#### Basic Functionality
- [ ] Game loads without console errors
- [ ] Player car spawns and is visible
- [ ] Controls work (WASD/Arrows, Space)
- [ ] Camera follows player smoothly
- [ ] Police spawn and chase player
- [ ] Collisions work (player hits buildings)
- [ ] HUD updates correctly

#### Game Mechanics
- [ ] Coins can be collected
- [ ] Money increases when collecting coins
- [ ] Health decreases on collision
- [ ] Game over triggers at 0 health
- [ ] Shop opens and cars can be purchased
- [ ] Heat level increases over time
- [ ] Different police types spawn at appropriate heat

#### Performance
- [ ] Game runs at 60 FPS with 0-5 police
- [ ] Game runs smoothly with 10+ police
- [ ] No memory leaks (play for 5+ minutes)
- [ ] No stuttering when buildings load

#### Multiplayer (if applicable)
- [ ] Room can be created
- [ ] Room code is displayed
- [ ] Players can join with code
- [ ] Game starts when host clicks start
- [ ] State syncs between host and clients
- [ ] Other players are visible on minimap

### Browser Console Checks
```javascript
// Check for errors
// Open DevTools (F12), look for red errors

// Inspect game state
console.log(gameState);

// Check FPS
// Three.js stats can be added for FPS monitoring
```

### Testing Specific Features

**Test Physics Changes**:
```javascript
// Add to main.js temporarily
console.log('Speed:', playerVelocity);
console.log('Position:', playerCar.position);
```

**Test AI Changes**:
```javascript
// Add to police.js temporarily
console.log('Police count:', policeArray.length);
console.log('Police at position:', police.position);
```

**Test UI Changes**:
- Check in browser inspector (right-click → Inspect)
- Verify styling in Elements tab
- Test on different screen sizes

---

## Debugging Tips

### Console Logging
```javascript
// Basic logging
console.log('Player health:', gameState.health);

// Object inspection
console.log('Full state:', gameState);
console.dir(playerCar);  // More detailed object view

// Conditional logging
if (gameState.health < 20) {
  console.warn('Low health!');
}

// Performance timing
console.time('update');
updatePlayer(deltaTime);
console.timeEnd('update');
```

### Common Issues and Solutions

#### Issue: "Cannot read property 'x' of undefined"
**Cause**: Object not initialized  
**Fix**: Add null checks
```javascript
// Before
playerCar.position.x += 10;

// After
if (playerCar) {
  playerCar.position.x += 10;
}
```

#### Issue: Game is laggy/slow
**Cause**: Too many objects or inefficient code  
**Fix**: 
1. Check object count: `console.log(scene.children.length);`
2. Use object pooling for frequently created objects
3. Limit particle effects
4. Use Chrome Performance profiler

#### Issue: Physics feels wrong
**Cause**: Not using delta time  
**Fix**: 
```javascript
// Wrong
position += velocity;

// Correct
position += velocity * deltaTime;
```

#### Issue: Multiplayer desync
**Cause**: Client modifying state instead of host  
**Fix**: Only host should modify gameState, clients just render

#### Issue: Three.js objects not visible
**Checklist**:
1. Added to scene? `scene.add(mesh);`
2. Position set? `mesh.position.set(x, y, z);`
3. Material has color? `material.color.set(0xff0000);`
4. Camera looking at it? Check camera position
5. Lighting? Some materials need lights

### Browser DevTools

**Sources Tab**: Set breakpoints in code
1. Open DevTools → Sources
2. Find file (e.g., js/player.js)
3. Click line number to set breakpoint
4. Refresh page, code will pause at breakpoint

**Performance Tab**: Profile performance
1. Open DevTools → Performance
2. Click Record
3. Play game for a few seconds
4. Stop recording
5. Analyze where time is spent

**Network Tab**: Debug multiplayer
1. Open DevTools → Network
2. Filter by WS (WebSocket)
3. Click WebSocket connection
4. View messages sent/received

---

## Common Patterns

### Pattern 1: Accessing Game State
```javascript
import { gameState } from './state.js';

// Reading
const currentMoney = gameState.money;

// Writing
gameState.money += 100;

// Conditional
if (gameState.gameActive) {
  updatePlayer();
}
```

### Pattern 2: Creating Three.js Objects
```javascript
// Geometry
const geometry = new THREE.BoxGeometry(width, height, depth);

// Material
const material = new THREE.MeshStandardMaterial({ 
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(x, y, z);

// Add to scene
scene.add(mesh);

// Remember to dispose when done!
scene.remove(mesh);
mesh.geometry.dispose();
mesh.material.dispose();
```

### Pattern 3: Delta Time Physics
```javascript
function update(deltaTime) {
  // Velocity integration
  velocity += acceleration * deltaTime;
  
  // Position integration
  position += velocity * deltaTime;
  
  // Friction
  velocity *= (1 - friction * deltaTime);
  
  // Rotation
  rotation += angularVelocity * deltaTime;
}
```

### Pattern 4: Collision Detection
```javascript
// Distance-based collision
const distance = objectA.position.distanceTo(objectB.position);
if (distance < collisionRadius) {
  handleCollision();
}

// Raycasting collision
const raycaster = new THREE.Raycaster();
raycaster.set(position, direction);
const intersects = raycaster.intersectObjects(obstacles);
if (intersects.length > 0) {
  // Collision detected at intersects[0].point
}
```

### Pattern 5: Event Logging (for commentary)
```javascript
import { logEvent, EVENTS } from './commentary.js';

// Log an event
logEvent(EVENTS.DRIFT_START, {
  speed: currentSpeed,
  position: { x, y, z }
});

// With context
logEvent(EVENTS.POLICE_KILLED, {
  policeType: 'interceptor',
  heatLevel: gameState.heatLevel
});
```

---

## Performance Best Practices

### 1. Reuse Objects (Object Pooling)
```javascript
// Bad: Create and destroy constantly
function spawnBullet() {
  const bullet = new THREE.Mesh(geometry, material);
  scene.add(bullet);
  // Later: scene.remove(bullet);
}

// Good: Reuse from pool
const bulletPool = [];
function spawnBullet() {
  let bullet = bulletPool.find(b => !b.active);
  if (!bullet) {
    bullet = new THREE.Mesh(geometry, material);
    bulletPool.push(bullet);
  }
  bullet.active = true;
  scene.add(bullet);
}
```

### 2. Share Geometries and Materials
```javascript
// Bad: Create new for each object
for (let i = 0; i < 100; i++) {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geo, mat);
}

// Good: Reuse geometry and material
const sharedGeo = new THREE.BoxGeometry(1, 1, 1);
const sharedMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
for (let i = 0; i < 100; i++) {
  const mesh = new THREE.Mesh(sharedGeo, sharedMat);
}
```

### 3. Limit Raycasts
```javascript
// Bad: Raycast every direction every frame
for (let angle = 0; angle < 360; angle += 1) {
  raycaster.set(position, angleToVector(angle));
  raycaster.intersectObjects(objects);
}

// Good: Only essential directions
const directions = [forward, backward, left, right];
for (const dir of directions) {
  raycaster.set(position, dir);
  raycaster.intersectObjects(objects);
}
```

### 4. Use Delta Time
```javascript
// Ensures consistent speed regardless of frame rate
velocity += acceleration * deltaTime;
position += velocity * deltaTime;
```

### 5. Chunk Loading
```javascript
// Load/unload objects based on camera distance
function updateChunks(cameraPos) {
  // Only load nearby chunks
  const chunkX = Math.floor(cameraPos.x / CHUNK_SIZE);
  const chunkZ = Math.floor(cameraPos.z / CHUNK_SIZE);
  
  loadChunksNear(chunkX, chunkZ);
  unloadChunksDistant(chunkX, chunkZ);
}
```

---

## Contributing Guidelines

### Before You Start
1. Check existing issues on GitHub
2. Read PROJECT_CONTEXT.md and CODE_ARCHITECTURE.md
3. Set up your development environment
4. Run the game to understand how it works

### Making Changes
1. **Create a branch**: `git checkout -b feature/my-feature`
2. **Make small commits**: Commit logical chunks of work
3. **Test thoroughly**: Use checklist above
4. **Write good commit messages**:
   ```
   Add new UFO car type
   
   - Added UFO specs to constants.js
   - Added UFO to shop UI
   - Balanced stats for difficulty
   - Tested in-game purchase and driving
   ```

### Code Review Checklist
Before submitting a PR:
- [ ] Code follows style guidelines
- [ ] No console errors
- [ ] Game runs smoothly (60 FPS)
- [ ] Changes are tested manually
- [ ] Commit messages are descriptive
- [ ] No commented-out code left in
- [ ] No debug console.logs left in (unless intentional)

### Pull Request Process
1. Push your branch: `git push origin feature/my-feature`
2. Create PR on GitHub
3. Fill out PR description:
   - What does this PR do?
   - How to test it?
   - Screenshots if UI changes
4. Wait for review
5. Address feedback
6. Merge when approved

---

## Resources

### Three.js Documentation
- [Three.js Docs](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [Three.js Fundamentals](https://threejs.org/manual/)

### JavaScript/ES6
- [MDN Web Docs](https://developer.mozilla.org/)
- [ES6 Features](https://es6-features.org/)

### Game Development
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [Physics for Game Programmers](https://www.gdcvault.com/)

### This Project
- [README.md](../README.md) - User documentation
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) - Project overview
- [CODE_ARCHITECTURE.md](CODE_ARCHITECTURE.md) - Technical details
- [CHANGELOG.md](CHANGELOG.md) - Version history

---

## Getting Help

### Where to Ask Questions
1. **GitHub Issues** - Bug reports and feature requests
2. **GitHub Discussions** - General questions
3. **Code Comments** - Inline documentation

### Useful Debug Commands
```javascript
// Print game state
console.log(gameState);

// Print all scene objects
console.log(scene.children);

// Print player position
console.log(playerCar.position);

// Print police count
console.log(policeArray.length);

// Check FPS
// Add stats.js library for FPS counter
```

---

## Glossary

- **Heat Level**: Difficulty level that increases over time
- **Delta Time**: Time elapsed since last frame (for frame-rate independence)
- **Raycast**: Shooting a ray to detect collisions
- **Mesh**: 3D object in Three.js (geometry + material)
- **State**: The gameState object containing all game data
- **Pooling**: Reusing objects instead of creating/destroying them
- **Chunk**: A section of the world that can be loaded/unloaded
- **Instance**: A copy of a mesh (for performance)

---

**Happy Coding! 🚗💨**

Feel free to ask questions, experiment, and make the game your own!

---

**Last Updated**: 2026-01-23  
**Maintainer**: NulikTheGoat  
**For Questions**: Open an issue on GitHub
