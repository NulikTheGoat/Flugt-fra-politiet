# 🏗️ Code Architecture - Flugt fra Politiet

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Module Dependency Graph](#module-dependency-graph)
3. [Core Systems](#core-systems)
4. [Data Flow](#data-flow)
5. [Key Classes and Functions](#key-classes-and-functions)
6. [File-by-File Breakdown](#file-by-file-breakdown)
7. [Multiplayer Architecture](#multiplayer-architecture)
8. [Performance Patterns](#performance-patterns)

---

## Architecture Overview

### Design Pattern: Module-based Architecture
- **No classes**: Uses functional programming with ES6 modules
- **Shared state**: Single source of truth in `state.js`
- **Loose coupling**: Modules communicate via imports and state
- **No framework**: Pure JavaScript with Three.js library

### High-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│                      Browser (Client)                     │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────┐    ┌──────────────┐   ┌─────────────┐ │
│  │ index.html  │───▶│   main.js    │──▶│  core.js    │ │
│  │  (UI DOM)   │    │(Entry Point) │   │(Three.js)   │ │
│  └─────────────┘    └──────────────┘   └─────────────┘ │
│                            │                             │
│         ┌──────────────────┼──────────────────┐         │
│         ▼                  ▼                  ▼         │
│  ┌─────────────┐    ┌──────────┐      ┌──────────┐    │
│  │  player.js  │    │police.js │      │ world.js │    │
│  │  (Physics)  │    │   (AI)   │      │ (Terrain)│    │
│  └─────────────┘    └──────────┘      └──────────┘    │
│         │                  │                  │         │
│         └──────────────────┼──────────────────┘         │
│                            ▼                             │
│                     ┌──────────────┐                    │
│                     │   state.js   │                    │
│                     │ (Game State) │                    │
│                     └──────────────┘                    │
│                            │                             │
│         ┌──────────────────┼──────────────────┐         │
│         ▼                  ▼                  ▼         │
│  ┌─────────────┐    ┌──────────┐      ┌──────────┐    │
│  │   ui.js     │    │network.js│      │particles │    │
│  │   (HUD)     │    │(WebSocket│      │  (VFX)   │    │
│  └─────────────┘    └──────────┘      └──────────┘    │
│                            │                             │
└────────────────────────────┼─────────────────────────────┘
                             │ WebSocket
                             ▼
                 ┌────────────────────────┐
                 │      server.js         │
                 │  (Node.js + WebSocket) │
                 └────────────────────────┘
```

---

## Module Dependency Graph

### Core Dependencies (Load Order)
```
1. state.js          (No dependencies - pure state)
2. config.js         (No dependencies - configuration)
3. constants.js      (No dependencies - data)
4. utils.js          (No dependencies - utilities)
5. core.js           (Three.js setup)
6. assets.js         (Depends on: core)
7. player.js         (Depends on: state, config, core, assets, constants)
8. police.js         (Depends on: state, config, core, assets, constants, player)
9. sheriff.js        (Depends on: police, state, config)
10. world.js         (Depends on: state, config, core, assets)
11. particles.js     (Depends on: state, core)
12. ui.js            (Depends on: state, config, assets)
13. network.js       (Depends on: state, player, police)
14. commentary.js    (Depends on: state, config)
15. levelEditor.js   (Depends on: state, core, world)
16. main.js          (Depends on: ALL modules)
```

### Import Relationships
```
main.js
  ├── imports: state, config, core, constants
  ├── imports: player, police, sheriff, world
  ├── imports: ui, particles, network, commentary
  └── imports: levelEditor

player.js
  ├── imports: state, config, constants, core
  └── exports: createPlayerCar, updatePlayer, playerCar, etc.

police.js
  ├── imports: state, config, constants, core, player
  └── exports: spawnPoliceCar, updatePoliceAI, etc.

ui.js
  ├── imports: state, config, assets
  └── exports: updateHUD, showGameOver, DOM, etc.
```

---

## Core Systems

### 1. State Management System

**File**: `state.js`

```javascript
// Centralized state - single source of truth
export const gameState = {
  // Game flow
  gameActive: false,
  gameMode: 'solo',
  
  // Player state
  health: 100,
  money: 0,
  currentCar: 'standard',
  
  // Police state
  heatLevel: 1,
  policeCount: 0,
  
  // World state
  time: 0,
  coins: [],
  
  // Multiplayer
  isHost: false,
  roomCode: null,
  players: {}
};
```

**Usage Pattern**:
```javascript
import { gameState } from './state.js';

// Read
if (gameState.health < 30) { /* low health */ }

// Write
gameState.money += coinValue;

// No getters/setters - direct access
```

---

### 2. Physics System

**File**: `player.js` (function: `updatePlayer`)

**Key Concepts**:
- Custom physics (no library)
- Uses delta time for frame-rate independence
- Applies forces: acceleration, friction, steering
- Handles collisions with raycasting

**Physics Pipeline**:
```
Input Detection (keys)
  ↓
Apply Acceleration
  ↓
Apply Steering
  ↓
Apply Drift Physics
  ↓
Apply Friction
  ↓
Collision Detection
  ↓
Apply Collision Response
  ↓
Update Position
  ↓
Update Camera
```

**Code Pattern**:
```javascript
function updatePlayer(deltaTime) {
  // 1. Input
  const forward = keys.w || keys.ArrowUp ? 1 : 0;
  
  // 2. Physics
  velocity.z += acceleration * deltaTime;
  velocity.z *= (1 - friction * deltaTime);
  
  // 3. Integration
  playerCar.position.x += velocity.x * deltaTime;
  
  // 4. Constraints
  velocity.z = Math.min(velocity.z, maxSpeed);
}
```

---

### 3. AI System

**File**: `police.js` (function: `updatePoliceAI`)

**AI Behaviors**:
1. **Pursuit**: Chase player with predictive targeting
2. **Obstacle Avoidance**: Raycast ahead to detect obstacles
3. **Collision**: Ram player to deal damage
4. **Shooting**: Military vehicles fire projectiles
5. **Formation**: Maintain spacing between police units

**AI Decision Tree**:
```
Is player visible?
  ├─ Yes: Chase player
  │   ├─ Check obstacles ahead
  │   │   ├─ Clear: Continue pursuit
  │   │   └─ Blocked: Turn 90°
  │   ├─ Within attack range?
  │   │   ├─ Military: Shoot
  │   │   └─ Other: Ram
  │   └─ Close to player: Burst speed
  └─ No: Wander randomly
```

**Code Pattern**:
```javascript
function updatePoliceAI(police, deltaTime) {
  // 1. Target selection
  const targetPos = calculateInterceptPoint(player, police);
  
  // 2. Obstacle detection
  if (raycastObstacle(police.position, direction)) {
    // Avoidance: turn away
    police.rotation.y += Math.PI / 2;
  }
  
  // 3. Movement
  moveTowardsTarget(police, targetPos, deltaTime);
  
  // 4. Attack
  if (distanceToPlayer < attackRange) {
    attack(police);
  }
}
```

---

### 4. Rendering System

**File**: `core.js` + `main.js`

**Three.js Setup**:
```javascript
// core.js - Scene setup
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, ...);
export const renderer = new THREE.WebGLRenderer({ antialias: true });

// main.js - Render loop
function animate() {
  requestAnimationFrame(animate);
  
  // 1. Update physics
  updatePlayer(deltaTime);
  updatePoliceAI(deltaTime);
  
  // 2. Update visuals
  updateParticles(deltaTime);
  updateHUD();
  
  // 3. Render
  renderer.render(scene, camera);
}
```

**Rendering Pipeline**:
```
Game Loop (60 FPS)
  ↓
Update Physics
  ↓
Update AI
  ↓
Update Particles
  ↓
Update UI (HUD)
  ↓
Three.js Render
  ↓
Display to Screen
```

---

### 5. Multiplayer System

**Files**: `server.js` (backend) + `network.js` (frontend)

**Architecture**: Host-based with state synchronization

**Message Flow**:
```
Host Client                Server                 Guest Client
    │                        │                         │
    ├─CREATE_ROOM───────────▶│                         │
    │                        ├─Room Created            │
    │◀────ROOM_CODE──────────┤                         │
    │                        │                         │
    │                        │◀────JOIN_ROOM───────────┤
    │◀────PLAYER_JOINED──────┤                         │
    │                        ├─────PLAYER_JOINED──────▶│
    │                        │                         │
    ├─START_GAME────────────▶│                         │
    │                        ├─────GAME_STARTED───────▶│
    │                        │                         │
    ├─GAME_STATE (every ~50ms)───────────────────────▶│
    │                        │                         │
```

**State Sync**:
- Host is source of truth
- Broadcasts game state 20 times/second
- Clients render based on received state
- Input is client-side, state is server-side

---

## Data Flow

### Single Player Flow
```
User Input (Keyboard)
  ↓
Update gameState (keys)
  ↓
updatePlayer() reads keys
  ↓
Modifies playerCar position
  ↓
updatePoliceAI() reacts to player
  ↓
Modifies police positions
  ↓
updateHUD() displays state
  ↓
renderer.render() shows scene
```

### Multiplayer Flow (Host)
```
User Input
  ↓
updatePlayer() (local)
  ↓
updatePoliceAI() (local)
  ↓
getPoliceStateForNetwork()
  ↓
Network.broadcastGameState()
  ↓
WebSocket to all clients
```

### Multiplayer Flow (Client)
```
WebSocket receives state
  ↓
Network.handleMessage()
  ↓
updateOtherPlayerCar()
  ↓
syncPoliceFromNetwork()
  ↓
Render scene with synced data
```

---

## Key Classes and Functions

### Player System (`player.js`)

**Key Functions**:
```javascript
// Create player's car
createPlayerCar(carType)
  ├─ Creates Three.js mesh
  ├─ Sets car properties from constants
  └─ Returns car object

// Update player physics
updatePlayer(deltaTime)
  ├─ Handle input
  ├─ Apply physics
  ├─ Detect collisions
  ├─ Update health
  └─ Move camera

// Rebuild car (when purchasing new one)
rebuildPlayerCar(carType)
  ├─ Remove old car
  ├─ Create new car
  └─ Preserve state (position, rotation)
```

---

### Police System (`police.js`)

**Key Functions**:
```javascript
// Spawn a new police car
spawnPoliceCar(type, position)
  ├─ Creates Three.js mesh
  ├─ Sets AI parameters
  ├─ Adds to scene and array
  └─ Returns police object

// Update all police AI
updatePoliceAI(deltaTime)
  ├─ For each police:
  │   ├─ Calculate target position
  │   ├─ Check obstacles
  │   ├─ Move towards target
  │   ├─ Attack if in range
  │   └─ Update health
  └─ Remove destroyed police

// Projectile system
firePlayerProjectile()
  └─ Spawns bullet from tank

updateProjectiles(deltaTime)
  ├─ Move projectiles
  ├─ Check collisions
  └─ Remove expired projectiles
```

---

### World System (`world.js`)

**Key Functions**:
```javascript
// Initialize world
createGround()
  └─ Creates infinite-looking ground plane

createBuildings()
  ├─ Generates building chunks
  └─ Uses instanced meshes for performance

createTrees()
  └─ Scatters trees around map

// Runtime world management
updateBuildingChunks(cameraPos)
  ├─ Load chunks near camera
  └─ Unload distant chunks

updateCollectibles(playerPos, deltaTime)
  ├─ Check coin collection
  ├─ Add money to player
  └─ Respawn coins
```

---

### UI System (`ui.js`)

**Key Functions**:
```javascript
// HUD updates
updateHUD()
  ├─ Update speed display
  ├─ Update money display
  ├─ Update heat level
  └─ Update minimap

updateHealthUI()
  └─ Update health bar

// Menus
showGameOver(reason)
  ├─ Display game over screen
  └─ Show final stats

goToShop()
  ├─ Show shop modal
  ├─ Display purchasable cars
  └─ Handle purchases
```

---

## File-by-File Breakdown

### `main.js` - Entry Point (600+ lines)
**Purpose**: Orchestrates entire game, contains main loop

**Key Sections**:
1. **Imports**: All other modules
2. **DOM Setup**: Attach renderer to page
3. **Event Listeners**: Button clicks, keyboard input
4. **Game Modes**: Solo vs. Multiplayer setup
5. **Main Loop**: `animate()` function
6. **Multiplayer Lobby**: Room creation/joining logic

**Main Loop Structure**:
```javascript
function animate() {
  const deltaTime = clock.getDelta();
  
  if (gameState.gameActive) {
    updatePlayer(deltaTime);
    updatePoliceAI(deltaTime);
    updateProjectiles(deltaTime);
    updateParticles(deltaTime);
    updateHUD();
    updateCommentary();
    
    if (isMultiplayerHost) {
      Network.broadcastGameState();
    }
  }
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

---

### `state.js` - Global State (200 lines)
**Purpose**: Single source of truth for game state

**State Categories**:
1. **Game Flow**: `gameActive`, `gameMode`, `gameOver`
2. **Player Stats**: `health`, `money`, `currentCar`, `score`
3. **Physics**: `velocity`, `position`, `rotation`
4. **Police**: `heatLevel`, `policeCount`, `sheriff`
5. **Economy**: `coinValue`, `killReward`
6. **Multiplayer**: `roomCode`, `players`, `isHost`
7. **Input**: `keys` object for keyboard state

**Pattern**: Exported mutable object
```javascript
export const gameState = { /* ... */ };
export const keys = { /* ... */ };
```

---

### `config.js` - Configuration (150 lines)
**Purpose**: Tunable game parameters

**Categories**:
1. **Physics**: Acceleration, friction, max speed
2. **Police**: Spawn rate, AI aggression
3. **Economy**: Coin values, prices
4. **Difficulty**: Heat escalation rate
5. **Multiplayer**: Network settings

**Pattern**: Exported object with nested properties
```javascript
export const gameConfig = {
  player: { acceleration: 50, maxSpeed: 200 },
  police: { spawnInterval: 10, maxCount: 20 },
  // ...
};
```

---

### `constants.js` - Game Data (300 lines)
**Purpose**: Fixed game data (car specs, police types)

**Data Structures**:
1. **Car Specs**: Speed, health, handling for each car type
2. **Police Types**: Stats for Standard, Interceptor, SWAT, etc.
3. **Colors**: Player colors, police colors
4. **Prices**: Shop prices for cars

**Pattern**: Exported objects
```javascript
export const cars = {
  standard: { speed: 100, health: 100, /* ... */ },
  sport: { speed: 150, health: 80, /* ... */ },
  // ...
};

export const policeTypes = {
  standard: { speed: 80, health: 60, /* ... */ },
  interceptor: { speed: 120, health: 80, /* ... */ },
  // ...
};
```

---

### `player.js` - Player Logic (800+ lines)
**Purpose**: Player car physics, input, and collision

**Key Responsibilities**:
1. **Car Creation**: `createPlayerCar()`
2. **Physics Update**: `updatePlayer(deltaTime)`
3. **Input Handling**: Reads `keys` object
4. **Collision Detection**: Raycasting and response
5. **Health Management**: Damage, repair
6. **Camera Follow**: Third-person camera
7. **Multiplayer**: Create/update other players

**Physics Approach**:
- Velocity-based movement
- Friction and air resistance
- Drift mechanics with grip reduction
- Collision pushback

---

### `police.js` - Police AI (1000+ lines)
**Purpose**: Police spawning, AI, and combat

**Key Responsibilities**:
1. **Spawning**: `spawnPoliceCar(type, position)`
2. **AI Update**: `updatePoliceAI(deltaTime)`
3. **Pathfinding**: Predictive targeting
4. **Obstacle Avoidance**: Raycast-based
5. **Combat**: Ramming and shooting
6. **Health**: Damage and destruction
7. **Projectiles**: Bullet system

**AI Techniques**:
- **Predictive Targeting**: Aim where player will be
- **Burst Speed**: Speed boost when chasing
- **Avoidance**: Turn away from obstacles
- **Formation**: Maintain spacing

---

### `world.js` - World Generation (700+ lines)
**Purpose**: Terrain, buildings, props, collectibles

**Key Responsibilities**:
1. **Terrain**: Ground plane with texture
2. **Buildings**: Procedural city generation
3. **Props**: Trees, hotdog stands
4. **Skybox**: Sky and distant cityscape
5. **Collectibles**: Coins, power-ups
6. **Chunk System**: Load/unload based on distance

**Optimization**:
- Instanced meshes for buildings
- Chunk-based loading/unloading
- Geometry sharing

---

### `ui.js` - User Interface (900+ lines)
**Purpose**: HUD, menus, overlays

**Key Responsibilities**:
1. **HUD**: Speed, money, health, heat
2. **Minimap**: Top-down view of area
3. **Shop**: Car purchasing interface
4. **Game Over**: End screen with stats
5. **Menus**: Main menu, pause menu
6. **Damage Effects**: Screen shake, red tint
7. **Notifications**: Pop-up messages

**DOM Elements**: Manages many HTML elements
- Health bar
- Money counter
- Speed display
- Heat level indicator
- Minimap canvas
- Modal dialogs

---

### `particles.js` - Visual Effects (400+ lines)
**Purpose**: Particle systems and visual effects

**Key Systems**:
1. **Tire Marks**: Skid marks on ground
2. **Sparks**: Collision sparks
3. **Speed Lines**: Motion blur effect
4. **Smoke**: Drift smoke
5. **Explosions**: Police destruction effects

**Pattern**: Object pooling for performance
```javascript
const tireMarks = []; // Reuse mark objects
const sparks = []; // Reuse spark particles
```

---

### `network.js` - Multiplayer (500+ lines)
**Purpose**: WebSocket communication

**Key Responsibilities**:
1. **Connection**: Connect to WebSocket server
2. **Room Management**: Create/join rooms
3. **State Sync**: Broadcast/receive game state
4. **Player Management**: Track all players
5. **Error Handling**: Reconnection logic

**Message Types**:
- `CREATE_ROOM` / `JOIN_ROOM`
- `PLAYER_JOINED` / `PLAYER_LEFT`
- `START_GAME` / `GAME_STATE`
- `ROOM_FULL` / `ERROR`

---

### `commentary.js` - LLM Commentary (300+ lines)
**Purpose**: AI-powered live commentary (optional feature)

**Key Responsibilities**:
1. **Event Tracking**: Log game events
2. **Event Buffering**: Batch events
3. **API Calls**: Request commentary from LLM
4. **Display**: Show commentary in UI
5. **Fallbacks**: Static phrases if API fails

**Architecture**:
```
Game Events → Event Buffer → API Request → Commentary Queue → UI Display
```

---

### `server.js` - Multiplayer Server (300+ lines)
**Purpose**: WebSocket server for multiplayer

**Key Responsibilities**:
1. **HTTP Server**: Serve static files
2. **WebSocket**: Real-time communication
3. **Room Management**: Create/join/leave rooms
4. **State Relay**: Broadcast messages
5. **API Proxy**: Commentary API endpoint

**Room Structure**:
```javascript
const rooms = {
  'ABC123': {
    host: wsConnection,
    players: [player1, player2, ...],
    settings: { touchArrest: false, dropIn: true }
  }
};
```

---

## Multiplayer Architecture

### Room-Based System
- **Room Codes**: 6-character alphanumeric (e.g., "ABC123")
- **Capacity**: Up to 4 players per room
- **Lifetime**: Room exists while host is connected

### State Synchronization
- **Host Authority**: Host runs game logic
- **Broadcast Rate**: ~20 updates/second (50ms interval)
- **State Includes**:
  - All player positions/rotations
  - Police positions/rotations
  - Game state (heat, time, etc.)

### Message Protocol
```javascript
// Example: GAME_STATE message
{
  type: 'GAME_STATE',
  state: {
    players: {
      'player1': { x, y, z, rotation, health },
      'player2': { x, y, z, rotation, health }
    },
    police: [
      { x, y, z, rotation, type, health },
      // ...
    ],
    time: 125.5,
    heatLevel: 3
  }
}
```

---

## Performance Patterns

### 1. Object Pooling
**Used for**: Police cars, projectiles, particles

```javascript
// Instead of creating/destroying constantly
const policePool = [];

function spawnPolice() {
  const police = policePool.find(p => !p.active) 
    || createNewPolice();
  police.active = true;
  return police;
}
```

### 2. Chunk-Based Loading
**Used for**: Buildings, trees, props

```javascript
function updateChunks(cameraPos) {
  const chunkX = Math.floor(cameraPos.x / CHUNK_SIZE);
  const chunkZ = Math.floor(cameraPos.z / CHUNK_SIZE);
  
  // Load nearby chunks
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      loadChunk(chunkX + dx, chunkZ + dz);
    }
  }
  
  // Unload distant chunks
  unloadDistantChunks(chunkX, chunkZ);
}
```

### 3. Geometry Instancing
**Used for**: Buildings, trees

```javascript
// Single geometry, multiple instances
const buildingGeometry = new THREE.BoxGeometry(10, 20, 10);
const instances = [];

for (let i = 0; i < 1000; i++) {
  const instance = new THREE.Mesh(buildingGeometry, material);
  instances.push(instance);
}
```

### 4. Delta Time
**Used for**: All movement and physics

```javascript
// Frame-rate independent
velocity += acceleration * deltaTime;
position += velocity * deltaTime;
```

### 5. Raycasting Optimization
**Used for**: Collision detection

```javascript
// Raycast only in relevant directions
const rayDirections = [forward, backward, left, right];
for (const direction of rayDirections) {
  raycaster.set(position, direction);
  const intersects = raycaster.intersectObjects(buildings);
  // ...
}
```

---

## Testing Strategy

### Manual Testing Checklist
1. **Physics**: Drive car, test acceleration/braking/steering
2. **AI**: Verify police chase and avoid obstacles
3. **Collisions**: Hit buildings, police, boundaries
4. **Economy**: Collect coins, buy cars
5. **Heat System**: Play long enough to reach high heat
6. **Multiplayer**: Test host and client roles
7. **UI**: Check all HUD elements update correctly

### Performance Testing
- **FPS Monitor**: Check frame rate with many police (10+)
- **Memory**: Monitor for memory leaks (long play sessions)
- **Network**: Test multiplayer with high latency

---

## Common Pitfalls

### 1. Forgetting Delta Time
❌ `velocity += 10;`  
✅ `velocity += 10 * deltaTime;`

### 2. Not Disposing Three.js Objects
❌ `scene.remove(mesh);`  
✅ 
```javascript
scene.remove(mesh);
mesh.geometry.dispose();
mesh.material.dispose();
```

### 3. State Desync in Multiplayer
❌ Clients modify state directly  
✅ Only host modifies state, clients render

### 4. Collision Detection Bugs
❌ Single raycast forward  
✅ Multiple raycasts in all directions

---

## Extension Points

### Adding a New Car Type
1. Add spec to `constants.js` → `cars` object
2. Add price to shop in `ui.js`
3. Test physics with new specs

### Adding a New Police Type
1. Add spec to `constants.js` → `policeTypes`
2. Add to spawn logic in `police.js`
3. Balance stats for difficulty

### Adding a New Power-Up
1. Create collectible in `world.js`
2. Add collection logic in `updateCollectibles()`
3. Apply effect in `player.js`

### Adding a New Game Mode
1. Add mode to `gameState.gameMode`
2. Add UI button in `index.html`
3. Add logic branch in `main.js` game loop

---

**Last Updated**: 2026-01-23  
**For Developers**: This document provides deep technical insight into how the game's code is structured and how systems interact.
