# 🚗 Flugt fra Politiet - Project Context for LLMs

## Project Overview

**Flugt fra Politiet** (English: "Escape from the Police") is a fast-paced 3D car chase game built with Three.js where players outrun police, collect coins, and upgrade their vehicles.

**Repository:** https://github.com/NulikTheGoat/Flugt-fra-politiet  
**Language:** Danish (UI), English (code)  
**Framework:** Three.js r128  
**Platform:** Web-based, runs in browser  
**Game Type:** 3D arcade racing, single-player & LAN multiplayer

---

## Quick Facts

- **Primary Language**: JavaScript (ES6 modules)
- **3D Engine**: Three.js r128
- **Physics**: Custom implementation (not using physics engine)
- **UI Framework**: Vanilla HTML/CSS/JavaScript
- **Multiplayer**: WebSocket-based (ws library) for LAN play
- **Server**: Node.js + Express-style HTTP server
- **Development**: No build step required, runs directly in browser
- **Package Manager**: npm

---

## Core Game Loop

1. **Player** drives a car using keyboard controls (WASD/Arrows)
2. **Police** spawn and chase the player using AI
3. **Player** collects coins to earn money
4. **Heat Level** increases over time, spawning tougher police
5. **Health** depletes from collisions and police attacks
6. **Game Over** when health reaches zero or player is arrested

---

## Project Structure

```
Flugt-fra-politiet/
├── index.html                 # Main game page
├── config.html                # Configuration UI
├── server.js                  # Multiplayer server (WebSocket + HTTP)
├── package.json               # Dependencies (ws for WebSocket)
├── js/                        # All game logic
│   ├── main.js                # Entry point, game initialization
│   ├── core.js                # Three.js scene, camera, renderer setup
│   ├── state.js               # Global game state management
│   ├── config.js              # Game configuration and settings
│   ├── constants.js           # Constants (car specs, police types, etc.)
│   ├── player.js              # Player car logic and physics
│   ├── police.js              # Police AI, spawning, and behavior
│   ├── sheriff.js             # Sheriff (special boss police) logic
│   ├── world.js               # World generation (ground, buildings, trees)
│   ├── ui.js                  # HUD, menus, overlays
│   ├── particles.js           # Visual effects (tire marks, sparks, etc.)
│   ├── network.js             # Multiplayer networking client
│   ├── commentary.js          # LLM-powered live commentary (optional)
│   ├── levelEditor.js         # Level editor for custom maps
│   ├── utils.js               # Utility functions
│   └── assets.js              # Asset loading and management
├── tests/                     # Test scripts
│   └── test_speed_calibration.js
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore file
├── README.md                  # User-facing documentation
├── PROJECT_CONTEXT.md         # This file - for LLMs
├── CODE_ARCHITECTURE.md       # Detailed code architecture (to be created)
├── CHANGELOG.md               # Version history (to be created)
└── [various plan files]       # Development roadmaps and plans
    ├── IMPLEMENTATION_PLAN.md
    ├── llm_commentary_plan.md
    ├── llm_funktioner_plan.md
    ├── economy_gamification_plan.md
    ├── police_improvement_plan.md
    ├── small_improvements.md
    └── TEST_AND_OPTIMIZATION_PLAN.md
```

---

## Key Technologies

### Frontend
- **Three.js r128**: 3D rendering engine
- **JavaScript ES6 Modules**: Native browser modules (no bundler)
- **CSS3**: Styling and animations
- **HTML5**: Structure and canvas

### Backend (Multiplayer)
- **Node.js**: Runtime environment
- **WebSocket (ws)**: Real-time multiplayer communication
- **HTTP Server**: Serves static files and API endpoints

### Optional Features
- **LLM Integration**: Claude Haiku via LEGO MPS for live commentary
- **API Proxy**: Server-side API calls to protect credentials

---

## Game Mechanics

### Player Controls
- **Movement**: WASD or Arrow keys
- **Drift**: Space (handbrake)
- **Shoot**: F key (Tank car only)
- **Camera Toggle**: C key (top-down view)

### Car Types
1. **Standard** - Free starter car
2. **Compact** - Agile, good turning (1,500 kr)
3. **Sport** - High speed (8,000 kr)
4. **Muscle** - Durable, high health (15,000 kr)
5. **Tank** - Can shoot projectiles (75,000 kr)
6. **UFO** - Special unlock, alien speed

### Police Types
1. **Standard** - Basic patrol cars (Heat Level 1)
2. **Interceptor** - Fast pursuit vehicles (Heat Level 2)
3. **SWAT** - Armored trucks (Heat Level 3)
4. **Military** - Armed vehicles that shoot (Heat Level 4+)
5. **Sheriff** - Special boss unit with advanced AI

### Heat System
- Increases over time based on survival duration
- Higher heat = more and tougher police
- Affects police spawn rate and types

### Economy
- Collect coins scattered around the map
- More survival time = higher coin value multiplier
- Spend money at shop to buy new cars

---

## Code Architecture Highlights

### Module System
- Uses ES6 import/export
- Each file is a separate module
- No build step, runs directly in browser

### State Management
- `state.js` contains all global game state
- Exported mutable object `gameState`
- Other modules import and modify state

### Physics
- Custom physics implementation (no library)
- Updates happen in `updatePlayer()` and `updatePoliceAI()`
- Uses delta time for frame-rate independence

### Rendering Loop
- Three.js animation loop in `main.js`
- 60 FPS target
- Updates physics, AI, particles, and UI each frame

### Multiplayer Architecture
- **Host-based**: One player hosts, others join
- **Room codes**: 6-character alphanumeric codes
- **State sync**: Host broadcasts game state via WebSocket
- **Clients**: Receive state and render other players
- **Drop-in/out**: Players can join/leave mid-game (optional)

---

## Development Commands

### Single Player (Quick Start)
```bash
npx serve
# Opens on http://localhost:3000
```

### Multiplayer (LAN)
```bash
npm install    # First time only
npm start      # Starts WebSocket server on port 3001
# Opens on http://localhost:3000 and http://[YOUR_IP]:3000
```

### Testing
```bash
npm test  # Currently just echoes "no tests"
```

---

## Important Files for LLMs

### For Understanding Game Logic
1. **js/main.js** - Game initialization and main loop
2. **js/player.js** - Player physics and input handling
3. **js/police.js** - AI behavior and spawning
4. **js/state.js** - Global state structure

### For Understanding UI
1. **js/ui.js** - HUD, menus, overlays
2. **index.html** - DOM structure

### For Understanding Multiplayer
1. **server.js** - WebSocket server and room management
2. **js/network.js** - Client-side networking

### For Configuration
1. **js/config.js** - Tunable game parameters
2. **js/constants.js** - Fixed game data (car specs, etc.)

---

## Common Patterns in This Codebase

### 1. Delta Time Usage
```javascript
// Always multiply movement by deltaTime for frame-rate independence
car.position.x += velocity.x * deltaTime;
```

### 2. State Access
```javascript
import { gameState } from './state.js';
// Read state
if (gameState.gameActive) { ... }
// Modify state
gameState.money += 100;
```

### 3. Three.js Object Management
```javascript
// Add object to scene
scene.add(mesh);
// Remove and dispose
scene.remove(mesh);
mesh.geometry.dispose();
mesh.material.dispose();
```

### 4. Event Logging (for commentary)
```javascript
import { logEvent, EVENTS } from './commentary.js';
logEvent(EVENTS.DRIFT_START, { speed: currentSpeed });
```

---

## Danish Terms Used in Code

- **Politi** = Police
- **Bil** = Car
- **Penge** = Money
- **Liv** = Health/Life
- **Hast** = Speed
- **Køb** = Buy
- **Spil** = Game
- **Start** = Start
- **Slut** = End

---

## Performance Considerations

1. **Object Pooling**: Police cars and projectiles are reused
2. **Chunk Loading**: Buildings load/unload based on camera distance
3. **Geometry Sharing**: Same geometries used for multiple objects
4. **Material Reuse**: Materials are cached and reused
5. **Particle Limits**: Tire marks and sparks have maximum counts

---

## Known Issues & TODOs

See individual plan files for detailed roadmaps:
- `IMPLEMENTATION_PLAN.md` - Police & player improvements
- `llm_commentary_plan.md` - AI commentary feature
- `economy_gamification_plan.md` - Economy balancing
- `police_improvement_plan.md` - AI behavior enhancements
- `small_improvements.md` - Quality of life changes

---

## Testing the Game

1. Start the server (`npx serve` or `npm start`)
2. Open browser to localhost
3. Click "KØR NU" (Play Now)
4. Choose SOLO or multiplayer mode
5. Test controls, physics, and UI
6. Check browser console for errors

---

## Debugging Tips

- **Browser Console**: Check for JavaScript errors
- **Three.js Inspector**: Browser extension for debugging 3D scenes
- **Network Tab**: Monitor WebSocket messages (multiplayer)
- **State Logging**: Add `console.log(gameState)` to inspect state

---

## Contributing Guidelines

1. **Code Style**: 
   - Use English for code/comments
   - Use Danish for UI text
   - 2-space indentation
   - Descriptive variable names

2. **Commits**: 
   - Small, focused commits
   - Descriptive commit messages
   - Test before committing

3. **Performance**: 
   - Always consider FPS impact
   - Use delta time for animations
   - Dispose Three.js objects properly

4. **Multiplayer**: 
   - Test both host and client
   - Ensure state sync works
   - Handle disconnections gracefully

---

## API Integrations

### LLM Commentary (Optional)
- **Provider**: LEGO MPS (Anthropic Claude)
- **Model**: Claude Haiku 4.5
- **Endpoint**: `/api/commentary` (proxied via server.js)
- **Rate Limit**: 1 request per 5 seconds
- **Config**: Requires API key in `.env` file

---

## Build & Deployment

### No Build Step
- All JavaScript runs directly in browser
- ES6 modules loaded natively
- Three.js loaded from CDN (check index.html)

### Deployment Options
1. **Static Host**: Any static file hosting (Netlify, Vercel, GitHub Pages)
2. **Node Server**: For multiplayer, needs Node.js hosting (Heroku, Railway, etc.)

---

## Version History

See `CHANGELOG.md` for detailed version history (to be created).

Current version: 1.0.0 (as per package.json)

---

## License

ISC License (as specified in package.json)

---

## Contact & Support

- **Repository**: https://github.com/NulikTheGoat/Flugt-fra-politiet
- **Issues**: https://github.com/NulikTheGoat/Flugt-fra-politiet/issues

---

**Last Updated**: 2026-01-23  
**For LLMs**: This document provides context to help you understand the codebase structure, conventions, and architecture when making changes or answering questions about the project.
