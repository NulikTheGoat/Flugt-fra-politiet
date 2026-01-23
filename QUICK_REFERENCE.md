# 📋 Quick Reference Guide

**Quick lookup reference for common tasks, commands, and file locations.**

---

## 🚀 Quick Commands

### Start the Game
```bash
# Single Player (Quick)
npx serve

# Multiplayer (LAN)
npm install    # First time only
npm start
```

### Open in Browser
- **Single Player**: http://localhost:3000
- **Multiplayer**: http://localhost:3000 + network URL
- **Level Editor**: http://localhost:3000/editor

---

## 📁 File Locations

### Need to find...

**Where game logic lives?**
→ `/js/` directory

**Where player physics is?**
→ `/js/player.js`

**Where police AI is?**
→ `/js/police.js`

**Where game state is stored?**
→ `/js/state.js`

**Where to tune game parameters?**
→ `/js/config.js`

**Where car specs are defined?**
→ `/js/constants.js`

**Where UI/HUD is handled?**
→ `/js/ui.js`

**Where the main game loop is?**
→ `/js/main.js` (function `animate()`)

**Where multiplayer server code is?**
→ `/server.js`

**Where HTML structure is?**
→ `/index.html`

---

## 📖 Documentation Map

### I want to...

**Understand the project quickly**
→ Read [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)

**Learn the technical architecture**
→ Read [CODE_ARCHITECTURE.md](CODE_ARCHITECTURE.md)

**Start developing/contributing**
→ Read [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)

**See what changed between versions**
→ Read [CHANGELOG.md](CHANGELOG.md)

**Learn how to play the game**
→ Read [README.md](README.md)

**Find implementation plans**
→ Check `IMPLEMENTATION_PLAN.md`, `*_plan.md` files

---

## 🔧 Common Tasks

### Add a New Car
1. Edit `/js/constants.js` → `cars` object
2. Edit `/js/ui.js` → add to shop
3. Test by buying in-game

### Add a New Police Type
1. Edit `/js/constants.js` → `policeTypes` object
2. Edit `/js/police.js` → spawning logic
3. Test by playing until heat level spawns it

### Adjust Physics
1. Edit `/js/config.js` → `player` section
2. Refresh browser to test

### Modify AI Behavior
1. Edit `/js/police.js` → `updatePoliceAI()` function
2. Refresh browser to test

### Add HUD Element
1. Add HTML to `/index.html`
2. Update in `/js/ui.js` → `updateHUD()` function
3. Style in CSS

### Debug Multiplayer
1. Open browser DevTools (F12)
2. Go to Network tab → Filter: WS
3. View WebSocket messages

---

## 🎯 Key Concepts

### State Management
```javascript
import { gameState } from './state.js';
gameState.money += 100;  // Direct access
```

### Delta Time (Frame-rate Independence)
```javascript
position += velocity * deltaTime;
```

### Three.js Object Creation
```javascript
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### Event Logging (Commentary)
```javascript
logEvent(EVENTS.DRIFT_START, { speed: currentSpeed });
```

---

## 🐛 Debug Checklist

**Game not loading?**
- [ ] Check browser console for errors (F12)
- [ ] Verify all files are in correct locations
- [ ] Check if port 3000 is available

**Physics feel wrong?**
- [ ] Check if delta time is being used
- [ ] Verify config.js values
- [ ] Check for console errors

**Police not spawning?**
- [ ] Check `gameState.hasStartedMoving` is true
- [ ] Verify heat level is appropriate
- [ ] Check spawn interval in config.js

**Multiplayer not connecting?**
- [ ] Verify server is running (`npm start`)
- [ ] Check WebSocket port 3001 is open
- [ ] Ensure all players on same network
- [ ] Verify room code is correct

**Performance issues?**
- [ ] Check object count: `console.log(scene.children.length)`
- [ ] Verify police count is reasonable
- [ ] Check for memory leaks (long sessions)
- [ ] Use Chrome Performance profiler

---

## 📊 Game Data

### Car Types
| Car | Price | Speed | Special |
|-----|-------|-------|---------|
| Standard | Free | ⭐⭐ | None |
| Compact | 1,500 | ⭐⭐⭐ | Agile |
| Sport | 8,000 | ⭐⭐⭐⭐ | Fast |
| Muscle | 15,000 | ⭐⭐⭐⭐ | Durable |
| Tank | 75,000 | ⭐⭐ | Shoots |
| UFO | Special | ⭐⭐⭐⭐⭐ | Alien |

### Police Types
| Type | Heat Level | Speed | Special |
|------|-----------|-------|---------|
| Standard | 1+ | Normal | Basic chase |
| Interceptor | 2+ | Fast | Pursuit |
| SWAT | 3+ | Normal | Armored |
| Military | 4+ | Normal | Shoots |
| Sheriff | 5+ | Fast | Advanced AI |

### Controls
| Key | Action |
|-----|--------|
| W/↑ | Forward |
| S/↓ | Brake/Reverse |
| A/← | Turn Left |
| D/→ | Turn Right |
| Space | Drift |
| C | Camera Toggle |
| F | Shoot (Tank) |

---

## 🔍 Code Search Tips

### Find where X is defined
```bash
grep -r "export const X" js/
```

### Find where X is used
```bash
grep -r "X" js/
```

### Find function definition
```bash
grep -n "function functionName" js/
```

### Find all imports
```bash
grep "^import" js/*.js
```

---

## 💻 Git Commands

### Make Changes
```bash
git checkout -b feature/my-feature
# Make changes
git add .
git commit -m "Description"
git push origin feature/my-feature
```

### Check Status
```bash
git status
git diff
```

### View History
```bash
git log --oneline -10
```

---

## 🌐 Multiplayer Ports

| Service | Port | Protocol |
|---------|------|----------|
| HTTP Server | 3000 | HTTP |
| WebSocket | 3001 | WS |

**Firewall**: Ensure both ports are open for LAN play

---

## 📞 Getting Help

| Question Type | Where to Ask |
|--------------|--------------|
| Bug Report | [GitHub Issues](https://github.com/NulikTheGoat/Flugt-fra-politiet/issues) |
| Feature Request | [GitHub Issues](https://github.com/NulikTheGoat/Flugt-fra-politiet/issues) |
| General Question | [GitHub Discussions](https://github.com/NulikTheGoat/Flugt-fra-politiet/discussions) |
| Code Question | Check inline comments or docs |

---

## 🎓 Learning Resources

**Three.js**:
- [Official Docs](https://threejs.org/docs/)
- [Examples](https://threejs.org/examples/)
- [Fundamentals](https://threejs.org/manual/)

**Game Dev**:
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [JavaScript Info](https://javascript.info/)

**This Project**:
- [README.md](README.md) - Player documentation
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) - Project overview
- [CODE_ARCHITECTURE.md](CODE_ARCHITECTURE.md) - Technical details
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Developer guide

---

## ⚡ Performance Tips

1. **Limit Objects**: Keep scene.children.length reasonable
2. **Reuse Geometries**: Share geometries between meshes
3. **Object Pooling**: Reuse objects instead of create/destroy
4. **Chunk Loading**: Load/unload based on distance
5. **Delta Time**: Always use for physics calculations
6. **Dispose Properly**: Call geometry.dispose() and material.dispose()

---

## 🎨 Code Style

- **Indentation**: 2 spaces
- **Naming**: camelCase for variables, UPPER_SNAKE_CASE for constants
- **Language**: English for code, Danish for UI text
- **Comments**: Explain WHY, not WHAT
- **Semicolons**: Use consistently

---

**Last Updated**: 2026-01-23  
**Version**: 1.0.0

**Quick Tip**: Use Ctrl+F (or Cmd+F) to search this document!
