# AI/LLM Guide (Code Map)

This project is intentionally written in “simple JS modules + shared mutable state”.
If you’re an AI agent (or a human) trying to reason about behavior, start here.

## Key Concepts

### `gameState` (single source of truth)
- Defined in `js/state.js` and exported as a plain object.
- Most modules import and mutate it directly.
- Units/invariants are documented in `js/state.js`.

Important invariants:
- `speed`, `maxSpeed`, `velocityX`, `velocityZ`: world units / second
- HUD speed is `Math.round(speed * 3.6)` (km/h)
- `selectedCar` is the key into `cars`.

### `cars`
- Defined in `js/constants.js`.
- Vehicle tuning lives here.
- On-foot is treated as a “vehicle” with `type: 'onfoot'` and low `maxSpeed`.

## Game Lifecycle

### Starting a run
- Entry point: `startGame()` in `js/main.js`
- The reset path is centralized in `resetRunState()`.

### Applying selected vehicle stats
- `applySelectedCarStats()` maps `cars[selectedCar]` → `gameState.*`.
- Tests may set `gameState.selectedCar` before clicking Solo.

## Police Engagement

Design intent:
- Police should not start spawning/chasing until the player has earned money or destroyed something.

State:
- `gameState.policeEngaged` gates first spawn + subsequent spawn intervals.
- `gameState.destructionCount` increments on destruction events.

## Dev/Automation Hooks

## Always run:
`npm run lint && npm run typecheck`

### `window.__game`
`js/devtools.js` exposes stable references:
- `window.__game.gameState`
- `window.__game.cars`
- `window.__game.startGame()`

This is the recommended entrypoint for tests or external tooling.
