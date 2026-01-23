# LLM Live Commentary Feature Plan

## Overview
Add AI-powered live commentary to the car chase game. The LLM will provide dramatic, cheerful commentary based on real-time game events.

## API Configuration
Using LEGO MPS (Model Prediction Service) with Anthropic Claude:
- **Base URL**: `https://models.assistant.legogroup.io/anthropic`
- **Endpoint**: `/v1/messages`
- **Model**: `anthropic.claude-haiku-4-5-20251001-v1:0`
- **Max Tokens**: 256 (keep commentary short and punchy)

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Game Events    │ ──▶ │  Event Buffer    │ ──▶ │  LLM Request    │
│  (player.js,    │     │  (commentary.js) │     │  (via server)   │
│   police.js)    │     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  UI Display     │ ◀── │  Commentary      │ ◀── │  LLM Response   │
│  (speech bubble)│     │  Queue           │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## Implementation Checklist

### Phase 1: Event Tracking System
- [x] Create `js/commentary.js` module
- [x] Define event types to track:
  - [x] `DRIFT_START` - Player starts drifting
  - [x] `DRIFT_COMBO` - Drift combo milestone (5x, 10x, 20x)
  - [x] `SPEED_MILESTONE` - Hitting 50, 100, 150 km/h
  - [x] `POLICE_KILLED` - Destroyed a police car
  - [x] `POLICE_LOOT` - Collected money from dead police
  - [x] `CRASH` - Player hit something
  - [x] `NEAR_MISS` - Barely avoided collision
  - [x] `HEAT_INCREASE` - Heat level went up
  - [x] `LOW_HEALTH` - Health below 30%
  - [x] `ARRESTED` - Game over (arrested)
  - [x] `BUILDING_DESTROYED` - Crashed through building
- [x] Create event buffer with timestamps
- [x] Add hooks in player.js, police.js, world.js

### Phase 2: Server API Proxy
- [x] Add `/api/commentary` endpoint to `server.js`
- [x] Implement MPS API call with proper headers
- [x] Handle rate limiting (max 1 request per 5 seconds)
- [x] Create system prompt for commentator personality

### Phase 3: Client-Side Commentary Manager
- [x] Batch events into summaries (every 5-8 seconds)
- [x] Send event summary to server
- [x] Queue received commentary
- [x] Display commentary one at a time

### Phase 4: UI Display
- [x] Create speech bubble overlay
- [x] Typewriter effect for text
- [x] Auto-dismiss after 4-5 seconds
- [x] Style: positioned top-center, semi-transparent background

### Phase 5: Polish & Optimization
- [x] Add fallback static phrases if API fails
- [ ] Tune commentary frequency
- [ ] Add variety to prompts
- [ ] Test with different game scenarios

### Phase 6: Voice
- [ ] Add text to speech ( maybe whisper or something like it)

## Event Data Structure

```javascript
{
    type: 'DRIFT_COMBO',
    value: 10,
    timestamp: Date.now(),
    context: {
        speed: 85,
        heatLevel: 3,
        policeCount: 5
    }
}
```

## System Prompt (Commentator Personality)

```
You are an excited sports commentator for an illegal street racing game. 
You're dramatic, cheerful, and love to hype up the player's actions.
Keep responses SHORT (1-2 sentences max, under 30 words).
Use racing/action movie references and puns.
Always be positive and encouraging, even when things go wrong.
Speak in present tense as if watching live.
```

## API Request Format

```javascript
POST https://models.assistant.legogroup.io/anthropic/v1/messages
Headers:
  Content-Type: application/json
  Authorization: Bearer <API_KEY>
  api-key: <API_KEY>
  anthropic-version: 2023-06-01

Body:
{
    "model": "anthropic.claude-haiku-4-5-20251001-v1:0",
    "system": "<system prompt>",
    "messages": [{"role": "user", "content": "<event summary>"}],
    "max_tokens": 256
}
```

## Files to Modify/Create

| File | Action | Description |
|------|--------|-------------|
| `js/commentary.js` | CREATE | Event tracking & commentary manager |
| `server.js` | MODIFY | Add /api/commentary endpoint |
| `js/main.js` | MODIFY | Initialize commentary system |
| `js/player.js` | MODIFY | Add event hooks for player actions |
| `js/police.js` | MODIFY | Add event hooks for police events |
| `js/ui.js` | MODIFY | Add commentary display UI |
| `index.html` | MODIFY | Add commentary bubble container |
| `.env` | CREATE | Store API key (gitignored) |
| `.env.example` | CREATE | Template for API config |

## Progress Log

| Date | Status | Notes |
|------|--------|-------|
| Today | 🚧 In Progress | Created plan, setting up infrastructure |

---

## Quick Start (After Implementation)

1. Copy `.env.example` to `.env`
2. Add your MPS API key
3. Run `npm start`
4. Play the game and enjoy the commentary!
