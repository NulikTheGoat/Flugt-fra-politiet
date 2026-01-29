# Visual Overview - Godot POC

## Project Screenshot Description

Since Godot is a visual editor that requires running the Godot Engine application, here's what the project looks like when opened:

### Main Scene (main.tscn)

**3D Viewport:**
```
     [Sky - Blue gradient]
    
         [Directional Light]
              ☀️
              ↓
    
    🚗 (Blue Player Car)
         at (0, 2, 0)
    
🚓                      🚓
(Red Police)      (Red Police)
at (-10,2,-10)   at (10,2,-10)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     [Gray Ground Plane]
     200x200 units
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Camera Position:**
- Behind and above player car
- Angle: Looking down at ~30 degrees
- Distance: ~12 units back, 8 units up

**HUD Overlay (Top-Left):**
```
┌─────────────────────────────────┐
│ Flugt fra Politiet - Godot POC  │
│                                  │
│ Kontrol:                         │
│ W/↑ - Fremad | S/↓ - Bagud      │
│ A/← - Venstre | D/→ - Højre     │
│ SPACE - Håndbremse (Drift)      │
│                                  │
│ Flygt fra de røde politibiler!  │
└─────────────────────────────────┘
```

### Player Car Scene (player_car.tscn)

**Visual Structure:**
```
      [Camera - following]
            🎥
            
     ┌─────────────┐
     │   🔵 Blue   │  <- Body (2x1x4 box)
     │    Body     │     Metallic blue
     └─────────────┘
     
  ⚫        ⚫          <- Front wheels
  ⚫        ⚫          <- Back wheels
```

**Components:**
- Box mesh: 2 units wide, 1 unit tall, 4 units long
- 4 wheel cylinders: 0.3 radius, 0.2 height
- Blue metallic material (0.5 metallic, 0.3 roughness)
- Camera mounted behind and above

### Police Car Scene (police_car.tscn)

**Visual Structure:**
```
       🔴 [Red Siren Light]
          
     ┌─────────────┐
     │   🔴 Red    │  <- Body (2x1x4 box)
     │    Body     │     Red material
     └─────────────┘
     
  ⚫        ⚫          <- Front wheels
  ⚫        ⚫          <- Back wheels
```

**Components:**
- Same dimensions as player car
- Red material (1.0 red, 0.2 green/blue)
- OmniLight3D on top (red, energy 2.0, range 10)
- Black rubber wheels

## Godot Editor View

When opened in Godot Engine, you'll see:

**Project Manager:**
```
╔════════════════════════════════════════╗
║  Flugt fra Politiet - Godot POC       ║
║  ───────────────────────────────────   ║
║  Path: .../godot-poc/project.godot    ║
║  Version: 4.2                         ║
║                                        ║
║  [Edit]  [Run]  [Scan]  [Remove]     ║
╚════════════════════════════════════════╝
```

**Main Editor Interface:**
```
┌────────────────────────────────────────────────┐
│ File  Scene  Project  Debug  Editor  Help     │
├───────────┬────────────────────────┬───────────┤
│           │                        │           │
│ Scene     │   [3D Viewport]        │ Inspector │
│ Tree:     │                        │           │
│           │     🚗 🚓 🚓          │ Node:     │
│ • Main    │    ┌─────┐            │ Main      │
│   • Env   │    │ Car │            │           │
│   • Light │    └─────┘            │ Type:     │
│   • Ground│   ════════════        │ Node3D    │
│   • Player│                        │           │
│   • Police│                        │           │
│   • HUD   │                        │           │
│           │                        │           │
├───────────┴────────────────────────┴───────────┤
│ Output   Console   Debugger   [▶ Play]        │
└────────────────────────────────────────────────┘
```

## Game Running (F5)

When you press F5 to run the game:

```
╔════════════════════════════════════════════════╗
║ Flugt fra Politiet - Godot POC         [_][□][X]║
╠════════════════════════════════════════════════╣
║                                                 ║
║  Flugt fra Politiet - Godot POC                ║
║                                                 ║
║  Kontrol:                   [Sky Background]   ║
║  W/↑ - Fremad | S/↓ - Bagud                   ║
║  A/← - Venstre | D/→ - Højre                  ║
║  SPACE - Håndbremse (Drift)                    ║
║                                                 ║
║  Flygt fra de røde politibiler!                ║
║                                                 ║
║                                                 ║
║              🚗 (Blue - you)                   ║
║                                                 ║
║        🚓            🚓                         ║
║     (Red Police) (Red Police)                  ║
║                                                 ║
║  ─────────────────────────────────────────     ║
║           [Gray Ground]                        ║
║                                                 ║
╚════════════════════════════════════════════════╝

Controls: WASD to drive, SPACE to drift
Police cars will chase you!
```

## Gameplay Flow

1. **Start:** Player spawns at center, police 20 units away
2. **Movement:** Use WASD/Arrows to drive the blue car
3. **Chase:** Red police cars detect player and give chase
4. **Drift:** Press SPACE to activate handbrake for drifting
5. **Physics:** Car tilts, leans, and responds to terrain

## Color Scheme

- **Sky:** Blue gradient (#667ACC top, #B3CCDD horizon)
- **Ground:** Gray (#4D4D4D)
- **Player Car:** Blue (#3380FF) - Metallic
- **Police Car:** Red (#FF3333) - Warning color
- **Wheels:** Black (#1A1A1A) - Rubber material
- **Siren Light:** Bright Red (#FF0000) - Glowing

## Performance

- **Target FPS:** 60
- **Physics Rate:** 60 ticks/second
- **Rendering:** Forward+ (Godot 4.x)
- **Shadows:** Enabled on directional light
- **Anti-aliasing:** MSAA 2x (default)

---

This POC showcases the core gameplay in a clean, minimal Godot implementation with proper 3D graphics, physics, and controls.
