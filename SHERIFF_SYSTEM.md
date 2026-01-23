# AI Sheriff System Documentation

## Overview
The AI Sheriff is a special police unit that uses a connected LLM (Large Language Model) to generate tactical commands for other police cars. The Sheriff acts as a field commander, analyzing the game state and issuing strategic orders to coordinate the police pursuit.

## Features

### 1. LLM-Driven Decision Making
- The Sheriff uses an AI model (Anthropic Claude Haiku by default) to analyze the current game situation
- Commands are generated based on:
  - Player speed
  - Number of active police units
  - Number of destroyed police units
  - Current heat level (1-6)
  - Distance to player
  - Player health
  - Survival time
  - Recent command history

### 2. Tactical Command System
The Sheriff can issue six different types of commands:

- **CHASE**: Aggressive direct pursuit (increases police speed by 30%)
- **BLOCK**: Block escape routes (police try to get ahead of player)
- **SURROUND**: Encircle the target (police position at different angles)
- **SPREAD**: Spread out formation (police maintain distance from each other)
- **RETREAT**: Fall back and regroup (police slow down and back away)
- **INTERCEPT**: Cut off predicted path (police predict player movement)

### 3. Sheriff Spawning
- Sheriff spawns at Heat Level 3 or higher
- Only ONE Sheriff can be active at a time
- 10% chance to spawn when conditions are met
- Sheriff has:
  - 800 HP (highest of all police units)
  - Slower speed (180 km/h base)
  - Dark goldenrod color (#8b6914)
  - 1.3x scale (larger than standard police)

### 4. Visual Feedback

#### HUD Indicators
- **⭐ SHERIFF AKTIV** indicator appears when Sheriff is on the field
- Gold/yellow color scheme (#ffd700) for Sheriff-related UI

#### Police Scanner
- Sheriff commands appear in the police scanner radio
- Special styling: Gold text on dark gold background
- Header changes to "SHERIFF COMMAND CHANNEL"

### 5. Command Execution
All non-Sheriff police cars respond to the Sheriff's commands:
- Commands affect speed, direction, and behavior
- Each command type modifies police AI parameters
- Commands expire after 15 seconds
- Police cars track their active command in `userData.activeCommand`

## Technical Implementation

### Server Side (`server.js`)
```javascript
// Endpoint: POST /api/sheriff-command
// Rate limit: 8 seconds between requests
// Input: Game state JSON
// Output: { command: "tactical command text" }
```

The server endpoint:
1. Validates game state input
2. Builds context from game metrics
3. Sends prompt to LLM with Sheriff system prompt
4. Parses response and extracts command type
5. Returns command text to client

### Client Side

#### `js/sheriff.js`
- Manages Sheriff state and command history
- `requestSheriffCommand()`: Requests new command from server
- `getCurrentSheriffCommand()`: Gets active command
- `applySheriffCommand()`: Applies command behavior to police car

#### `js/police.js`
- Spawns Sheriff at appropriate heat level
- Integrates Sheriff commands into police AI update loop
- Applies command modifiers to police speed and direction

#### `js/commentary.js`
- `displaySheriffCommand()`: Shows command in police scanner
- Special visual styling for Sheriff communications

#### `js/ui.js`
- Updates Sheriff active indicator in HUD
- Shows when Sheriff is on the field

## Configuration

### Environment Variables
Configure in `.env` file (see `.env.example`):

```bash
MPS_ENDPOINT=https://your-api-endpoint.com/v1/messages
MPS_API_KEY=your_api_key_here
MPS_DEPLOYMENT=anthropic.claude-haiku-4-5-20251001-v1:0
MPS_MAX_TOKENS=256
MPS_ANTHROPIC_VERSION=2023-06-01
```

### Cooldowns
- **Sheriff LLM Request**: 8 seconds (server-side)
- **Command Duration**: 15 seconds
- **Command Request**: 10 seconds (client-side)

### Sheriff Stats (in `js/constants.js`)
```javascript
sheriff: { 
    color: 0x8b6914,    // Dark goldenrod
    speed: 180,         // km/h
    scale: 1.3,         // Size multiplier
    name: 'Sheriff', 
    health: 800         // Very high HP
}
```

## Usage

### For Players
1. Survive until Heat Level 3 or higher
2. Wait for Sheriff to spawn (10% chance per spawn)
3. When Sheriff appears, you'll see "⭐ SHERIFF AKTIV" in HUD
4. Sheriff commands will appear in gold text on police scanner
5. Police will coordinate based on Sheriff's commands

### For Developers

#### Testing Without LLM
If no API key is configured, the Sheriff will still spawn but won't issue commands. To test:

1. Set Heat Level to 3+ in game
2. Force spawn Sheriff: Modify spawn probability in `js/police.js`
3. Monitor console for "[Sheriff]" logs

#### Adding New Command Types
1. Add command to `SHERIFF_COMMANDS` enum in `js/sheriff.js`
2. Update system prompt in `server.js` to include new command
3. Add behavior logic in `applySheriffCommand()` function
4. Test command execution

## Performance Considerations

- LLM requests are rate-limited to prevent API overuse
- Commands are cached for 15 seconds to reduce API calls
- Only one Sheriff spawns to limit complexity
- Sheriff-specific AI logic is isolated in `sheriff.js`

## Future Enhancements

Potential improvements:
- Multiple Sheriff command chains (sequences)
- Voice synthesis for Sheriff commands (Text-to-Speech)
- Sheriff skill progression (learns from player behavior)
- Sheriff retreat/retreat when heavily damaged
- Player countermeasures against Sheriff commands
- Multiplayer: Each player's pursuers have their own Sheriff

## Troubleshooting

### Sheriff Not Spawning
- Check Heat Level is 3 or higher
- Verify only one Sheriff exists (check console logs)
- Adjust spawn probability in `spawnPoliceCar()`

### No Commands Being Issued
- Check `.env` file has valid API credentials
- Verify server logs for "[Sheriff]" messages
- Check rate limits aren't being hit
- Confirm Sheriff is alive (not dead)

### Commands Not Affecting Police
- Verify `applySheriffCommand()` is being called
- Check police cars have `userData.activeCommand` set
- Ensure commands aren't expired (>15 seconds old)

## Credits
The AI Sheriff system integrates the existing LLM commentary infrastructure with a new tactical command layer, creating a dynamic field commander that adapts to player behavior in real-time.
