# 🚗 Flugt fra Politiet (Escape from the Police)

A fast-paced 3D car chase game! Outrun the cops, collect coins, upgrade your ride, and play with friends on LAN!

> 🆕 **Godot Engine POC**: Check out the [Godot POC](godot-poc/) - a proof of concept showing how this game could be built with Godot Engine! See [godot-poc/README.md](godot-poc/README.md) for details.

---

## 📚 Documentation

**For Players**: Continue reading below for how to play and setup instructions.

**For Developers & LLMs**: Check out our comprehensive documentation:
- **[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)** - Project overview, structure, and quick reference for LLMs
- **[CODE_ARCHITECTURE.md](CODE_ARCHITECTURE.md)** - Technical deep dive into the codebase
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Step-by-step guide for developers
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and release notes

**Tech Stack**: Three.js r128 • JavaScript ES6 • WebSocket • Node.js

---

## 🎮 How to Play

### Controls
| Key | What it does |
|-----|--------|
| `W` or `↑` | Go forward |
| `S` or `↓` | Brake / Go backwards |
| `A` or `←` | Turn Left |
| `D` or `→` | Turn Right |
| `Space` | Drift! (Handbrake) |
| `C` | See map from above |
| `F` | Shoot (only works with Tank) |

### Goal
- 🏃 Run away from police as long as you can
- 💰 Pick up coins to get money
- 🛒 Buy cooler cars in the shop
- ❤️ Don't let your health go to zero!
- 🚨 If you stop when police are near = ARRESTED!

---

## 🚀 How to Start the Game

### Option 1: Single Player (Quick Start)

#### Step 1: Download Node.js (one time only)

1. Open your browser (Chrome, Edge, whatever)
2. Go to: **https://nodejs.org**
3. Click the big green button that says **"LTS"** (it's the recommended one)
4. A file will download - double click it to install
5. Just click "Next" "Next" "Next" until it's done ✅

#### Step 2: Open the game folder

1. Find where you saved the game folder (`Flugt-fra-politiet`)
2. Open that folder
3. You should see files like `index.html` and a folder called `js`

#### Step 3: Open Command Prompt in the game folder

**Easy way:**
1. Click in the address bar at the top of the folder (where it shows the path)
2. Type `cmd` and press Enter
3. A black window will open - this is Command Prompt!

**Or another way:**
1. Hold `Shift` and right-click in the folder
2. Click "Open PowerShell window here" or "Open command window here"

#### Step 4: Start the game server

In the black window, type this and press Enter:

```
npx serve
```

**First time only:** It might ask "Ok to proceed? (y)" - just type `y` and press Enter

Wait a few seconds until you see something like:
```
Serving!
- Local: http://localhost:3000
```

#### Step 5: Play the game! 🎉

1. Open your browser
2. Go to: **http://localhost:3000**
3. Click "KØR NU" (Play Now) and choose **SOLO** to play alone!

---

### Option 2: 🌐 Multiplayer (Play with Friends on LAN!)

Want to play with friends on the same network? Here's how:

#### Step 1: Install dependencies (one time only)

In the game folder, open Command Prompt and run:
```
npm install
```

#### Step 2: Start the multiplayer server

```
npm start
```

You'll see something like:
```
╔════════════════════════════════════════════════════════╗
║     🚔  FLUGT FRA POLITIET - MULTIPLAYER SERVER  🚔    ║
╠════════════════════════════════════════════════════════╣
║  Local:    http://localhost:3000                       ║
║  Network:  http://192.168.1.100:3000                   ║
║  WebSocket: ws://192.168.1.100:3001                    ║
╚════════════════════════════════════════════════════════╝
```

#### Step 3: Share the Network URL

Give the **Network URL** (like `http://192.168.1.100:3000`) to your friends on the same WiFi/LAN.

#### Step 4: Host creates a room

**On the HOST computer (the one running the server):**
1. Open browser and go to `http://localhost:3000`
2. Click "KØR NU" (Play Now)
3. Choose **HOST MULTIPLAYER**
4. You'll see a **6-letter room code** (like `ABC123`)
5. Tell your friends the room code!

#### Step 5: Friends join the room

**On EACH FRIEND'S computer:**
1. Open browser and go to the **Network URL** (e.g. `http://192.168.1.100:3000`)
   - ⚠️ NOT localhost! Use the IP address the host shared with you
2. Click "KØR NU" (Play Now)
3. Choose **JOIN MULTIPLAYER**
4. Enter your name
5. Type the **room code** the host gave you
6. Click **JOIN SPIL**

#### Step 6: Start the game

Once everyone has joined:
- Host sees all players in the lobby
- Host clicks **START SPIL** to begin!

#### Multiplayer Features:
- 👥 Up to 4 players per room
- 🎨 Each player gets a unique color
- 🚔 Police chase all players (host controls the AI)
- 📍 See other players on the map in real-time

---

## ⏹️ When you're done playing

Go back to the black window and press `Ctrl + C` to stop the server.

---

## ❓ Problems? Here's how to fix them!

### "It says 'npx' is not recognized"
You need to install Node.js first (go back to Step 1)

### "Nothing happens when I type npx serve"
Wait a bit! It can take 10-30 seconds the first time.

### "The game is just a black screen"
Make sure you opened `http://localhost:3000` in your browser, NOT by double-clicking the index.html file!

### "Port already in use"
Someone else is using that port. Try:
```
npx serve -l 8080
```
Then go to `http://localhost:8080` instead

### "I closed the black window by accident"
Just do the Command Prompt steps again!

### "Multiplayer: Can't connect to server"
- Make sure you ran `npm start` (not `npx serve`) for multiplayer
- Check that port 3000 and 3001 aren't blocked by firewall
- All players must be on the same WiFi/LAN network

### "Multiplayer: Room code doesn't work"
- Make sure the host's server is still running
- Double-check you typed the code correctly (6 letters)

---

## 🏎️ Vehicles & Progression

Start on foot and work your way up to exotic cars!

### Starter Vehicles
| Vehicle | Price | Speed | Health | Notes |
|---------|-------|-------|--------|-------|
| 🚶 Til Fods | 0 kr | ~15 km/h | 20 | Free start - very agile! |
| 🚲 Cykel | 100 kr | ~30 km/h | 30 | First upgrade |
| 🛴 El-løbehjul | 300 kr | ~45 km/h | 25 | Fast but fragile |
| 🏍️ Knallert | 700 kr | ~60 km/h | 35 | Good balance |

### Cars
| Car | Price | Speed | Health | Special |
|-----|-------|-------|--------|---------|
| 🚗 Standard | 2.000 kr | ~90 km/h | 100 | First car |
| 🏎️ Sport | 8.000 kr | ~130 km/h | 70 | Fast acceleration |
| 💪 Muscle | 15.000 kr | ~115 km/h | 150 | Tough and powerful |
| ⚡ Super | 50.000 kr | ~160 km/h | 100 | Very fast |
| 🚀 Hyper | 100.000 kr | ~180 km/h | 120 | Top speed |
| 🛡️ Tank | 75.000 kr | ~70 km/h | 300 | Can SHOOT! (Press F) |
| 🛸 UFO | 200.000 kr | ~200 km/h | 100 | Alien technology |

### Economy Tips
- 💰 **Passive income** increases exponentially with heat level
- 🚔 **Kill enemies** for rewards: 150-1000 kr depending on type
- 📦 **Collect drops** from destroyed enemies: 300-2000 kr
- 🔥 Higher heat = more money, but more danger!

---

## 👮 Police Levels

The longer you survive, the harder it gets!

| Level | What happens |
|-------|--------------|
| 🟢 Level 1 | Normal police cars |
| 🟡 Level 2 | Fast interceptors join |
| 🟠 Level 3 | Big SWAT trucks appear + **AI SHERIFF** can spawn! |
| 🔴 Level 4+ | Military vehicles that SHOOT at you! |

### ⭐ AI Sheriff (NEW!)
At Heat Level 3+, the **Sheriff** may join the chase! This special unit:
- Uses AI to command other police cars
- Issues tactical orders in real-time
- Coordinates police pursuit strategies
- Shows as "⭐ SHERIFF AKTIV" in the HUD
- Commands appear in gold text on the police scanner

See [SHERIFF_SETUP.md](SHERIFF_SETUP.md) for setup instructions.

---

## 🛠️ For Developers

Want to contribute or modify the game? Check out our developer resources:

### Quick Start for Development
```bash
git clone https://github.com/NulikTheGoat/Flugt-fra-politiet.git
cd Flugt-fra-politiet
npm install
npm start
# Game runs on http://localhost:3000
```

### Documentation
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Complete developer guide with examples
- **[CODE_ARCHITECTURE.md](CODE_ARCHITECTURE.md)** - Technical architecture and patterns
- **[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)** - Project overview for LLMs

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for detailed contributing guidelines.

---

## 📝 Project Information

- **Version**: 1.0.0
- **License**: ISC
- **Repository**: https://github.com/NulikTheGoat/Flugt-fra-politiet
- **Issues**: https://github.com/NulikTheGoat/Flugt-fra-politiet/issues

### Technologies Used
- **Frontend**: Three.js r160 (bundled locally, XSS vulnerability patched), JavaScript ES6 Modules, HTML5, CSS3
- **Rendering**: PBR materials (MeshStandardMaterial), enhanced lighting, antialiasing
- **Backend**: Node.js, WebSocket (ws library)
- **No Build Step**: Runs directly in browser!

### Features
- ✅ Single player and LAN multiplayer
- ✅ 5 unique car types with different stats
- ✅ 5 police types with escalating difficulty
- ✅ Dynamic heat level system
- ✅ Economy and shop system
- ✅ Procedurally generated city
- ✅ Real-time physics and AI
- ✅ **Enhanced graphics with PBR materials and improved lighting** 🆕
- ✅ Visual effects (tire marks, sparks, explosions)
- ✅ Optional LLM-powered commentary

### Documentation
- [VISUAL_IMPROVEMENTS.md](VISUAL_IMPROVEMENTS.md) - Visual rendering enhancements 🆕

### Roadmap
See our planning documents:
- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) - Current development status
- [llm_commentary_plan.md](llm_commentary_plan.md) - AI commentary feature
- [economy_gamification_plan.md](economy_gamification_plan.md) - Economy improvements
- [police_improvement_plan.md](police_improvement_plan.md) - AI enhancements

---

## 💡 Pro Tips

- **Drift around corners** - Hold Space while turning for sick drifts
- **Don't stop!** - If police catch you standing still, you're arrested in 3 seconds
- **Crash into police** - Going fast? Ram them to damage their cars!
- **Collect coins** - More time = more money per coin
- **Watch your health** - When it's low, your car gets slower and harder to control
- **Beware the Sheriff** - When the AI Sheriff spawns, police become much more coordinated!

---

**Have fun escaping! 🚗💨**
