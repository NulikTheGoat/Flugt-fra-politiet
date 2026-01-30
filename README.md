# 🚗 Flugt fra Politiet (Escape from the Police)

A fast-paced 3D car chase game! Outrun the cops, collect coins, upgrade your ride, and play with friends on LAN!

**Tech Stack**: Three.js r160 • Cannon-es Physics • JavaScript ES6 • WebSocket • Node.js

Three.js - for 3D graphics rendering
Cannon-ES - for physics simulation
Vite - as the build tool/dev server
Plain HTML/CSS/JS - no frontend framework
LMM MCP API Connection - Anthropic

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| `W`/`↑` | Accelerate |
| `S`/`↓` | Brake/Reverse |
| `A`/`←` `D`/`→` | Steer |
| `Space` | Drift (Handbrake) |
| `C` | Bird's-eye view |
| `F` | Shoot (Tank only) |

**Goal**: Escape police, collect coins, buy cars. Don't let health hit zero or get arrested when stopped!

---

## 🚀 Quick Start

### Prerequisites
Download and install [Node.js LTS](https://nodejs.org)

### Single Player
```bash
npx serve
# Open http://localhost:3000 → Click "KØR NU" → SOLO
```

### Multiplayer (LAN)
```bash
npm install   # First time only
npm start
```
Share the Network URL (e.g., `http://192.168.1.100:3000`) with friends on the same WiFi.

**To host**: Click "HOST MULTIPLAYER" → share the 6-letter room code  
**To join**: Enter room code → "JOIN SPIL"

---

## 🏎️ Vehicles

| Vehicle | Price | Speed | Notes |
|---------|-------|-------|-------|
| 🚶 On Foot | Free | ~15 km/h | Starting point |
| 🚗 Standard | 2.000 kr | ~90 km/h | First car |
| 🏎️ Sport | 8.000 kr | ~130 km/h | Fast acceleration |
| 💪 Muscle | 15.000 kr | ~115 km/h | High health (150) |
| ⚡ Super | 50.000 kr | ~160 km/h | Very fast |
| 🚀 Hyper | 100.000 kr | ~180 km/h | Top speed |
| 🛡️ Tank | 75.000 kr | ~70 km/h | Can shoot! (300 HP) |
| 🛸 UFO | 200.000 kr | ~200 km/h | Alien tech |

---

## 👮 Heat Levels

| Level | Threat |
|-------|--------|
| 🟢 1 | Normal police |
| 🟡 2 | Fast interceptors |
| 🟠 3 | SWAT trucks + AI Sheriff may spawn |
| 🔴 4+ | Military vehicles that shoot! |

---

## 🛠️ Development

```bash
git clone https://github.com/NulikTheGoat/Flugt-fra-politiet.git
cd Flugt-fra-politiet
npm install && npm start
```

### Documentation
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) – Project overview
- [CODE_ARCHITECTURE.md](CODE_ARCHITECTURE.md) – Technical architecture
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) – Contributing guide
- [CHANGELOG.md](CHANGELOG.md) – Version history

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| `npx` not recognized | Install Node.js first |
| Black screen | Use `http://localhost:3000`, don't open HTML directly |
| Port in use | Run `npx serve -l 8080` |
| Can't connect (MP) | Use `npm start`, ensure same WiFi, check firewall |

---

## 💡 Tips

- **Drift** around corners with Space
- **Ram police** at high speed to damage them
- **Higher heat** = more money, but more danger
- **Watch for Sheriff** – police become coordinated at Heat 3+

---

**Have fun escaping! 🚗💨**
