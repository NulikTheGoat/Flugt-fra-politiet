# Flugt fra Politiet - Luanti Edition

This is a Luanti (formerly Minetest) adaptation of the car chase game "Flugt fra Politiet" (Escape from the Police).

## Installation

1. Install Luanti from https://www.luanti.org/
2. Copy this `luanti_game` folder to your Luanti games directory:
   - **Linux**: `~/.luanti/games/` or `~/.minetest/games/`
   - **Windows**: `%APPDATA%\Luanti\games\` or `%APPDATA%\Minetest\games\`
   - **macOS**: `~/Library/Application Support/luanti/games/`
3. Launch Luanti
4. Create a new world and select "Flugt fra Politiet" as the game
5. Start playing!

## How to Play

### Controls
- **WASD** - Move your vehicle
- **Space** - Jump / Brake
- **Shift** - Sprint / Turbo
- **Mouse** - Look around
- **Right Click** - Use / Interact
- **E** - Open inventory / Shop

### Goal
- 🏃 Run away from police as long as you can
- 💰 Pick up coins to get money
- 🛒 Buy better vehicles in the shop
- ❤️ Don't let your health go to zero!
- 🚨 If police catch you = ARRESTED!

## Features

### Vehicles
Start on foot and work your way up:
- 🚶 **On Foot** - Free (starting)
- 🚲 **Bike** - 100 kr
- 🛴 **E-Scooter** - 300 kr
- 🏍️ **Motorcycle** - 700 kr
- 🚗 **Standard Car** - 2,000 kr
- 🏎️ **Sports Car** - 8,000 kr
- 💪 **Muscle Car** - 15,000 kr
- ⚡ **Supercar** - 50,000 kr
- 🚀 **Hypercar** - 100,000 kr
- 🛡️ **Tank** - 75,000 kr (can shoot!)
- 🛸 **UFO** - 200,000 kr

### Police Levels
- 🟢 **Level 1** - Normal police cars
- 🟡 **Level 2** - Fast interceptors
- 🟠 **Level 3** - SWAT trucks + AI Sheriff
- 🔴 **Level 4+** - Military vehicles that shoot!

### Game World
- Procedurally generated city with roads and buildings
- Dynamic day/night cycle
- Weather effects
- Destructible environment elements

## Technical Details

This Luanti game includes:
- Custom vehicle entities with realistic physics
- AI-controlled police with pursuit behavior
- Economy and progression system
- Multiplayer support via Luanti's networking
- Particle effects (tire marks, explosions)
- HUD showing speed, health, money, and heat level

## Differences from Web Version

The Luanti version adapts the original Three.js web game to work in a voxel environment:
- **Voxel-based world** instead of 3D meshes
- **Node-based construction** for buildings and roads
- **Entity system** for vehicles and police
- **Formspec UI** for menus and shop
- Uses Luanti's built-in **multiplayer** instead of WebSocket

## Development

The game is structured as mods within the `mods/` directory:
- `vehicle_system` - Vehicle entities and physics
- `police_ai` - Police spawning and AI behavior
- `economy` - Money, coins, and shop system
- `world_gen` - City generation and environment
- `hud` - User interface and displays

## License

ISC License - Same as the original web version

## Links

- Original Repository: https://github.com/NulikTheGoat/Flugt-fra-politiet
- Luanti Website: https://www.luanti.org/
