# 🚗 Flugt fra Politiet (Escape from the Police)

A fast-paced 3D car chase game built with Three.js! Outrun the cops, collect coins, and upgrade your ride!

![Game Preview](https://img.shields.io/badge/Game-Play%20Now-green)

---

## 🎮 How to Play

### Controls
| Key | Action |
|-----|--------|
| `W` / `↑` | Accelerate |
| `S` / `↓` | Brake / Reverse |
| `A` / `←` | Turn Left |
| `D` / `→` | Turn Right |
| `Space` | Handbrake (Drift!) |
| `C` | Toggle Bird's Eye View |
| `F` | Fire (Tank only) |

### Goal
- 🏃 Escape from the police as long as possible
- 💰 Collect coins to earn money
- 🛒 Buy faster cars in the shop
- ⚠️ Don't let your health drop to zero!
- 🚨 If you're too slow when police are near, you'll get arrested!

---

## 🚀 How to Run the Game (Easy Guide!)

### Option 1: Using Node.js (Recommended)

**Step 1:** Make sure you have Node.js installed
- Download from: https://nodejs.org
- Choose the "LTS" version (the big green button)

**Step 2:** Open Terminal
- On Mac: Press `Cmd + Space`, type "Terminal", press Enter
- On Windows: Press `Win + R`, type "cmd", press Enter

**Step 3:** Navigate to the game folder
```bash
cd path/to/Flugt-fra-politiet
```
(Replace `path/to/` with where you saved the game)

**Step 4:** Start the server
```bash
npx serve
```
If it asks "Ok to proceed?", type `y` and press Enter.

**Step 5:** Open the game
- Open your browser (Chrome works best!)
- Go to: **http://localhost:3000**

🎉 **That's it! Have fun!**

---

### Option 2: Using Python

If you have Python installed:

```bash
cd path/to/Flugt-fra-politiet
python3 -m http.server 8080
```

Then open: **http://localhost:8080**

---

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click `index.html`
3. Click "Open with Live Server"

---

## ❓ Troubleshooting

### "Black screen when I open index.html directly"
You MUST use a local server! The game uses JavaScript modules which don't work when opening the file directly. Follow the steps above.

### "Command not found: npx"
You need to install Node.js first. Download it from https://nodejs.org

### "Port already in use"
Try a different port:
```bash
npx serve -l 8081
```

---

## 🏎️ Cars & Upgrades

| Car | Price | Top Speed | Special |
|-----|-------|-----------|---------|
| Standard | Free | ⭐⭐ | - |
| Compact | 1,500 kr | ⭐⭐⭐ | Agile |
| Sport | 8,000 kr | ⭐⭐⭐⭐ | Fast |
| Muscle | 15,000 kr | ⭐⭐⭐⭐ | Tough |
| Tank | 75,000 kr | ⭐⭐ | Can shoot! |
| UFO | Rebirth | ⭐⭐⭐⭐⭐ | Alien tech |

---

## 👮 Heat Levels

The longer you survive, the harder it gets!

1. 🟢 **Level 1** - Standard police cars
2. 🟡 **Level 2** - Interceptors join the chase
3. 🟠 **Level 3** - SWAT vehicles appear
4. 🔴 **Level 4+** - Military vehicles that shoot!

---

## 🔄 Rebirth System

Once you've earned enough money, you can "Rebirth" to:
- Reset your progress
- Unlock special cars (like the UFO!)
- Get 2x money multiplier

---

## 🛠️ Built With

- [Three.js](https://threejs.org/) - 3D Graphics
- Vanilla JavaScript (ES6 Modules)
- HTML5 & CSS3

---

## 📝 License

Made for fun! Feel free to modify and share.

---

**Have fun escaping! 🚗💨**
