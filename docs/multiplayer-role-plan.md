# Multiplayer Roles: Challenger vs Contester

## Goal
Make multiplayer more fun by adding two roles when entering multiplayer:
- **Contester**: plays as a driver (current behavior).
- **Challenger**: does not drive, edits the environment live (spawns props, police/NPCs, etc.).

---

## Verfication Plan

Verify/find potential issues and fix for the below implemented points and set a checkmark in the end (/)

### Phase 1 — UX & Role Selection
- [x] Add role selection UI when entering multiplayer (Contester / Challenger).
- [x] Persist selected role in multiplayer state (room + player).
- [x] Display role badges in lobby UI.

### Phase 2 — Challenger Permissions
- [x] Create server-side role checks for Challenger-only actions.
- [x] Create client-side tool panel for Challenger (spawn tools).
- [x] Disable driving input for Challenger clients.

### Phase 3 — Live Environment Editing
- [x] Add spawn API for environment objects (barriers, ramps, debris, etc.).
- [x] Sync spawned objects to all clients in real time.
- [x] Add rate limits + ownership tracking to prevent abuse.

### Phase 4 — Extra Police/NPC Spawning
- [x] Add spawn API for police/NPCs with server validation.
- [x] Ensure spawned units follow normal AI logic.
- [x] Add optional cooldowns per room.

### Phase 5 — Balancing & Polish
- [x] Add basic presets (easy/medium/hard challenges).
- [x] Add visual indicators for Challenger spawns.
- [x] Add on-screen messages when Challenger acts.
- [x] Multiplayer refinement - search for potential challanges with multiplayer
- [x] Create a test testing a Challanger creating objects on a live server


---

## Manual Test Checklist

### Role Selection & Lobby
- [ ] Joining multiplayer shows a role selection step.
- [ ] Selecting Contester lets player drive normally.
- [ ] Selecting Challenger disables driving input.
- [ ] Lobby shows correct role badges for all players.

### Challenger Environment Editing
- [ ] Challenger can spawn environment objects live.
- [ ] All Contesters see spawns immediately.
- [ ] Spawned objects have correct collisions.
- [ ] Rate limits prevent spam.

### Challenger Police/NPC Spawning
- [ ] Challenger can spawn extra police/NPCs.
- [ ] Spawned units behave like normal AI.
- [ ] Contesters can see and interact with spawned units.

### Stability
- [ ] Challenger actions do not crash game.
- [ ] Multiplayer state remains in sync.
- [ ] Leaving/rejoining preserves role state.
