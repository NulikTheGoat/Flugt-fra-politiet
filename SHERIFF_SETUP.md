# Setting Up the AI Sheriff

## Quick Start

### 1. Get API Credentials
You need access to an Anthropic Claude API (or compatible endpoint) to power the Sheriff's AI.

1. Get your API endpoint and key from your AI service provider
2. Copy `.env.example` to `.env`
3. Fill in your credentials:

```bash
MPS_ENDPOINT=https://your-api-endpoint.com/v1/messages
MPS_API_KEY=your_api_key_here
```

### 2. Start the Server
```bash
npm install
npm start
```

The server will start on port 3000 with WebSocket on port 3001.

### 3. Play the Game
1. Open http://localhost:3000 in your browser
2. Start a game (SOLO or multiplayer)
3. Survive until Heat Level 3+
4. Watch for the Sheriff to spawn with gold coloring
5. Look for "⭐ SHERIFF AKTIV" in the HUD
6. Sheriff commands will appear in the police scanner in gold text

## What to Expect

### When Sheriff Spawns
- You'll see "[POLICE] Spawned police #X (sheriff)..." in server console
- Gold "⭐ SHERIFF AKTIV" indicator appears in game HUD
- Police scanner header changes to "SHERIFF COMMAND CHANNEL"

### Sheriff Commands
Every 8-10 seconds, the Sheriff will:
1. Analyze the current game situation
2. Generate a tactical command using AI
3. Display it in the police scanner (gold text)
4. All police cars adjust their behavior accordingly

Example commands:
- "CHASE: Alle enheder, maksimal hastighed - grib mistænkten!"
- "SURROUND: Omring fra alle sider - ingen flugtmuligheder!"
- "BLOCK: Skær vejen af ved næste kryds!"

### Police Behavior Changes
You'll notice police cars:
- Coordinate their movements
- Speed up or slow down based on commands
- Position themselves strategically
- React more intelligently to your actions

## Testing Without API Key

If you don't have API credentials, you can still test the system:

1. Sheriff will spawn normally
2. Commands won't be generated (no LLM calls)
3. Police will use default AI behavior
4. You can still see the Sheriff (gold car) on the field

To force-spawn Sheriff for testing, temporarily change the spawn chance in `js/police.js`:
```javascript
// Line ~140
if (!hasSheriff && gameState.heatLevel >= 3 && rand > 0.1) { // Changed from 0.9
    type = 'sheriff';
}
```

## Troubleshooting

### "API not configured" Error
- Make sure `.env` file exists in the project root
- Check that `MPS_API_KEY` is set
- Restart the server after creating/editing `.env`

### Sheriff Commands Not Appearing
- Check server console for "[Sheriff]" log messages
- Verify API requests aren't failing (429 = rate limit)
- Ensure Sheriff is alive (not destroyed)

### Police Not Responding to Commands
- This is normal! The system has cooldowns to prevent spam
- Wait 8-10 seconds between commands
- Check browser console for errors

## Advanced Configuration

### Adjust Command Frequency
In `server.js`:
```javascript
const SHERIFF_COOLDOWN = 8000; // Change this (milliseconds)
```

In `js/sheriff.js`:
```javascript
commandCooldown: 10000, // Change this (milliseconds)
```

### Modify Sheriff Stats
In `js/constants.js`:
```javascript
sheriff: { 
    color: 0x8b6914,  // Color (hex)
    speed: 180,       // Speed in km/h
    scale: 1.3,       // Size multiplier
    name: 'Sheriff', 
    health: 800       // HP (default police = 50)
}
```

### Change Spawn Rate
In `js/police.js` line ~140:
```javascript
if (!hasSheriff && gameState.heatLevel >= 3 && rand > 0.9) { // Higher = rarer
```

### Customize System Prompt
Edit the Sheriff system prompt in `server.js` around line 60 to change the AI's personality and command style.

## Monitoring

### Server Logs
Watch for these messages:
- `[Sheriff] Requesting tactical command from MPS...`
- `[Sheriff] Command issued: [command text]`
- `[POLICE] Spawned police #X (sheriff)...`

### Browser Console
Watch for these messages:
- `[Sheriff] New command: [command text]`
- `[Sheriff] LLM request failed: [error]`
- `[Sheriff Command]: [command text]`

## Performance Notes

- Each Sheriff command costs one API call
- Commands are rate-limited to ~6-8 per minute max
- Sheriff logic adds minimal CPU overhead
- Only one Sheriff can exist at a time

## Have Fun!

The AI Sheriff adds an extra layer of challenge and unpredictability to the game. The police are no longer just mindless pursuers - they have a smart commander calling the shots!
