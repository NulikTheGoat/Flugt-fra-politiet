# Technology Migration: Three.js → Luanti

## Overview

This repository has been migrated from a **Three.js web-based game** to a **Luanti (formerly Minetest) voxel game engine**.

## What Changed

### Before (Three.js)
- **Technology**: JavaScript, Three.js r128, WebSocket
- **Platform**: Web browser (HTML5)
- **Graphics**: 3D polygon meshes
- **Deployment**: Node.js serve/WebSocket server

### After (Luanti)
- **Technology**: Lua, Luanti game engine
- **Platform**: Desktop application (C++ engine)
- **Graphics**: Voxel-based world
- **Deployment**: Luanti game/mod installation

## New Installation Instructions

### For Players

1. **Install Luanti**
   - Download from: https://www.luanti.org/
   - Follow installation instructions for your OS

2. **Install the Game**
   - Copy the `luanti_game` folder to your Luanti games directory:
     - **Linux**: `~/.luanti/games/` or `~/.minetest/games/`
     - **Windows**: `%APPDATA%\Luanti\games\` or `%APPDATA%\Minetest\games\`
     - **macOS**: `~/Library/Application Support/luanti/games/`

3. **Create a World**
   - Launch Luanti
   - Click "New" to create a new world
   - Select "Flugt fra Politiet" as the game
   - Click "Create" then "Play Game"

4. **Start Playing**
   - Use WASD to move
   - Type `/shop` to open the vehicle shop
   - Collect coins (gold cubes) to earn money
   - Avoid the police (blue entities)!

### For Developers

The game is now structured as a Luanti game with mods:

```
luanti_game/
├── game.conf              # Game metadata
├── README.md              # Player documentation
├── TEXTURES_README.md     # Texture creation guide
└── mods/
    ├── core_game/         # Core game logic and state
    ├── economy/           # Money, coins, and shop
    ├── hud/               # UI elements and displays
    ├── world_gen/         # City generation
    ├── police_ai/         # Police entities and AI
    └── vehicle_system/    # Vehicle physics
```

## Core Gameplay Preserved

The following features have been preserved from the original game:

✅ **Vehicle Progression**
- Start on foot, buy bikes, scooters, cars, supercars, tanks, UFO
- Same vehicle prices and stats

✅ **Police Chase**
- Heat level system (0-5)
- Multiple police types (normal, interceptor, SWAT, military)
- Police spawn based on heat level

✅ **Economy**
- Coin collection
- Passive income based on heat level
- Vehicle shop with /shop command

✅ **Health and Damage**
- Health system per vehicle type
- Police deal damage on contact
- Get arrested if health reaches zero

✅ **Multiplayer**
- Luanti's built-in multiplayer replaces WebSocket
- Players can join any Luanti server running this game

## Key Differences

### Technical Changes

| Aspect | Three.js Version | Luanti Version |
|--------|-----------------|----------------|
| Language | JavaScript | Lua |
| Graphics | 3D Meshes | Voxel Blocks |
| World | Procedural 3D | Voxel Generation |
| Multiplayer | WebSocket | Built-in |
| UI | HTML/CSS | Formspecs |
| Physics | Custom | Luanti API |

### Gameplay Adjustments

1. **Voxel World**: The city is now made of blocks instead of 3D meshes
2. **Movement**: Uses Luanti's character controller instead of custom physics
3. **Camera**: First-person and third-person views (F7 to toggle)
4. **Controls**: Standard Luanti controls (see README.md)
5. **Vehicles**: Represented by physics overrides instead of entity riding

## Development

### Testing Locally

1. Install Luanti development version
2. Symlink the `luanti_game` folder to your games directory
3. Create a test world
4. Enable debug mode with F5
5. Check console with F10

### Adding Features

- Modify Lua files in the `mods/` directories
- Reload the world to see changes
- Use `minetest.log()` for debugging

### Creating Textures

See `TEXTURES_README.md` for texture requirements and creation tips.

## Original Web Version

The original Three.js web version is preserved in the git history and can be accessed by checking out earlier commits. The web version files include:

- `index.html` - Main game page
- `js/` directory - JavaScript game code
- `server.js` - Multiplayer WebSocket server

To run the original web version:
```bash
git checkout <commit-before-migration>
npm install
npm start
```

## Migration Rationale

This migration was requested to leverage Luanti's:
- Robust voxel engine and physics
- Built-in multiplayer networking
- Active modding community
- Cross-platform support
- Mature game engine features

## License

ISC License - Same as the original version

## Links

- **Original Repository**: https://github.com/NulikTheGoat/Flugt-fra-politiet
- **Luanti Website**: https://www.luanti.org/
- **Luanti Documentation**: https://docs.luanti.org/
- **Luanti Forum**: https://forum.luanti.org/
