# Changelog

All notable changes to Flugt fra Politiet will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Comprehensive documentation for LLMs and developers
  - PROJECT_CONTEXT.md - Project overview and quick reference
  - CODE_ARCHITECTURE.md - Detailed technical architecture
  - DEVELOPER_GUIDE.md - Getting started guide for developers
  - This CHANGELOG.md file

---

## [1.0.0] - 2026-01-23

### Added
- Core gameplay mechanics
  - Player car with physics-based driving
  - Police AI with chase behavior
  - Heat level system that escalates difficulty
  - Health and damage system
  - Coin collection and economy system
  - Multiple car types with different stats
  - Shop system for purchasing cars

- Game features
  - 5 playable car types (Standard, Compact, Sport, Muscle, Tank)
  - 5 police types (Standard, Interceptor, SWAT, Military, Sheriff)
  - Drift mechanics with handbrake
  - Combat system (Tank can shoot)
  - Camera toggle (behind car / top-down)
  - HUD with speed, money, health, heat indicators
  - Minimap showing player and police positions

- Multiplayer support
  - LAN-based multiplayer via WebSocket
  - Host and join system with room codes
  - Up to 4 players per room
  - Real-time state synchronization
  - Multiplayer lobby with player list
  - Drop-in/drop-out support (optional)

- World generation
  - Procedurally generated city with buildings
  - Trees and environmental props
  - Hotdog stands
  - Ground plane with texture
  - Skybox with distant cityscape
  - Chunk-based loading/unloading

- Visual effects
  - Tire marks
  - Collision sparks
  - Speed lines
  - Drift smoke
  - Explosion effects
  - Screen shake on collision
  - Damage tint overlay

- UI/UX
  - Main menu with game mode selection
  - Shop interface for buying cars
  - Game over screen with stats
  - Multiplayer lobby interface
  - Touch arrest countdown
  - Damage visual feedback

- Optional features
  - LLM-powered live commentary (requires API key)
  - Commentary system with event tracking
  - API proxy in server for security
  - Level editor (experimental)

- Configuration
  - Tunable game parameters in config.js
  - Car specifications in constants.js
  - Police type definitions
  - Environment variables for API keys

- Documentation
  - Comprehensive README with setup instructions
  - Multiple planning documents
  - API integration documentation

### Technical Details
- Built with Three.js r128
- ES6 modules (no build step)
- Custom physics engine
- WebSocket multiplayer (ws library)
- Node.js server for multiplayer
- No external dependencies for single player

---

## Version History Summary

### Phase 1: Core Implementation (Commits: 1de0ffc, cf84362)
- Player logic improvements
  - Removed steering jitter at low HP
  - Adjusted health degradation curve
  - Improved drift mechanics
  - Rebalanced Tank damage reduction

- Police AI improvements
  - Extended obstacle avoidance to all police types
  - Implemented predictive targeting
  - Added burst speed when chasing
  - Improved pathfinding

### Phase 2: Look and Feel (PR #5)
- UI improvements
- Visual polish
- Better game feel

### Phase 3: Documentation (Current)
- Added comprehensive documentation for LLMs
- Created project context files
- Improved code maintainability

---

## Known Issues

See individual plan documents for roadmap:
- `IMPLEMENTATION_PLAN.md` - Police & player improvements
- `llm_commentary_plan.md` - AI commentary status
- `economy_gamification_plan.md` - Economy balancing
- `police_improvement_plan.md` - AI behavior enhancements
- `small_improvements.md` - Quality of life improvements
- `TEST_AND_OPTIMIZATION_PLAN.md` - Testing and performance

---

## Upgrade Notes

### From Pre-1.0 to 1.0
- No breaking changes
- Single player works out of the box
- Multiplayer requires `npm install` and `npm start`

---

## Future Roadmap

### Planned Features
- Voice commentary (Text-to-Speech for AI commentary)
- More car types and customization
- Power-ups and special abilities
- More diverse police behaviors
- Better balancing for economy and difficulty
- Additional maps and environments
- Save/load game progress
- Achievements and challenges

### Experimental
- Level editor improvements
- Custom map support
- Modding support

---

## Contributing

When adding to this changelog:
1. Use the format: `## [Version] - YYYY-MM-DD`
2. Group changes by type: Added, Changed, Deprecated, Removed, Fixed, Security
3. Reference commit hashes where relevant
4. Keep descriptions clear and concise
5. Update the [Unreleased] section as you work

---

**Changelog Format**: Based on [Keep a Changelog](https://keepachangelog.com/)  
**Versioning**: Follows [Semantic Versioning](https://semver.org/)

**Last Updated**: 2026-01-23
