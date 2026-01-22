# 🚗 Flugt fra Politiet (Escape from the Police)

A fast-paced 3D car chase game! Outrun the cops, collect coins, and upgrade your ride!

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

## 🚀 How to Start the Game (Super Easy Guide for Windows!)

### Step 1: Download Node.js (one time only)

1. Open your browser (Chrome, Edge, whatever)
2. Go to: **https://nodejs.org**
3. Click the big green button that says **"LTS"** (it's the recommended one)
4. A file will download - double click it to install
5. Just click "Next" "Next" "Next" until it's done ✅

---

### Step 2: Open the game folder

1. Find where you saved the game folder (`Flugt-fra-politiet`)
2. Open that folder
3. You should see files like `index.html` and a folder called `js`

---

### Step 3: Open Command Prompt in the game folder

**Easy way:**
1. Click in the address bar at the top of the folder (where it shows the path)
2. Type `cmd` and press Enter
3. A black window will open - this is Command Prompt!

**Or another way:**
1. Hold `Shift` and right-click in the folder
2. Click "Open PowerShell window here" or "Open command window here"

---

### Step 4: Start the game server

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

---

### Step 5: Play the game! 🎉

1. Open your browser
2. Go to: **http://localhost:3000**
3. Click "Start" in the shop to begin!

**Pro tip:** Go to **http://localhost:3000/start** to skip the shop and start playing immediately!

---

### Step 6: When you're done playing

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
Just do Step 3 and 4 again!

---

## 🏎️ Cars You Can Buy

| Car | Price | How Fast | Special Power |
|-----|-------|----------|---------------|
| Standard | Free | ⭐⭐ | Nothing special |
| Compact | 1,500 kr | ⭐⭐⭐ | Easy to turn |
| Sport | 8,000 kr | ⭐⭐⭐⭐ | Really fast |
| Muscle | 15,000 kr | ⭐⭐⭐⭐ | Hard to break |
| Tank | 75,000 kr | ⭐⭐ | Can shoot! Press F |
| UFO | Special | ⭐⭐⭐⭐⭐ | Alien speed! |

---

## 👮 Police Levels

The longer you survive, the harder it gets!

| Level | What happens |
|-------|--------------|
| 🟢 Level 1 | Normal police cars |
| 🟡 Level 2 | Fast interceptors join |
| 🟠 Level 3 | Big SWAT trucks appear |
| 🔴 Level 4+ | Military vehicles that SHOOT at you! |

---

## 💡 Pro Tips

- **Drift around corners** - Hold Space while turning for sick drifts
- **Don't stop!** - If police catch you standing still, you're arrested in 3 seconds
- **Crash into police** - Going fast? Ram them to damage their cars!
- **Collect coins** - More time = more money per coin
- **Watch your health** - When it's low, your car gets slower and harder to control

---

**Have fun escaping! 🚗💨**
