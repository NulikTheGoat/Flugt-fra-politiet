# 🧪 Regression Test Suite

## Oversigt

Denne test suite er designet til at være **AI-venlig** - med klare log outputs, strukturerede tests og god dokumentation.

## Hurtig Start

```bash
# Kør alle regression tests
npm run test:regression

# Kør specifikke kategorier
npm run test:core      # Gameplay mekanikker
npm run test:ui        # UI elementer
npm run test:physics   # Fysik & kollision
npm run test:shop      # Butik & økonomi
npm run test:police    # Politi AI
npm run test:mp        # Multiplayer
npm run test:world     # Verden & rendering

# Kør med browser synlig (headed mode)
npm run test:regression:headed

# Kør ALT (unit tests + Playwright)
npm run test:all
```

## Test Kategorier

### 🎮 Core Gameplay (`core-gameplay.spec.js`)
- Game initialization
- Acceleration & deceleration
- Steering mekanikker
- Handbrake drift
- Speed caps per bil
- Health system
- Økonomi integration
- Heat levels
- Politi spawning

### 🖥️ UI Elements (`ui-elements.spec.js`)
- HUD elementer (hastighed, health, penge, heat, timer)
- Menu system
- Shop modal
- Game over skærm
- High scores

### ⚡ Physics & Collision (`physics-collision.spec.js`)
- Velocity komponenter
- Friktion & deceleration
- Vægtoverførsel
- Angular velocity
- Drift mekanikker
- Collision detection
- Car stats validering

### 💰 Shop & Economy (`shop-economy.spec.js`)
- Start penge
- Money display
- Penge tjent i gameplay
- Shop modal
- Bil priser
- Persistence (localStorage)
- High scores lagring

### 🚔 Police AI (`police-ai.spec.js`)
- Politi spawning
- Heat level system
- Sheriff boss
- Difficulty skalering

### 🌐 Multiplayer (`multiplayer.spec.js`)
- UI elementer
- Network state
- Socket.IO integration
- Room system

### 🌍 World & Rendering (`world-rendering.spec.js`)
- Chunk generation
- Render distance
- Canvas setup
- Camera system
- World objects (bygninger, veje)

## AI Optimering

Hver test fil inkluderer:

1. **Detaljeret logging** - `console.log()` outputs viser værdier
2. **Strukturerede tests** - Grupperet med `test.describe()`
3. **Emoji markører** - Hurtig visuel kategorisering
4. **Tolerance ranges** - Håntering af frame-rate variation
5. **Dokumentation** - Kommentarer i koden

## Output Format

Når tests køres, vil output se således ud:

```
Running 45 tests using 4 workers

⚡ Physics Simulation
  ✓ Velocity components update correctly (2.5s)
    Initial velocity: {x: 0, z: 0}
    Velocity after moving: {x: 0.5, z: 12.3, speed: 12.3}
  
🎯 Car Stats Application
  ✓ All car types have required stats (1.2s)
    Car validation results:
      standard: ✅ (max: 79 km/h)
      sport: ✅ (max: 108 km/h)
      hyper: ✅ (max: 198 km/h)
```

## Fejlfinding for AI

Hvis en test fejler:

1. **Læs log output** - Viser faktiske vs forventede værdier
2. **Check gameState** - Tests eksponerer `window.gameState`
3. **Kør headed mode** - `npm run test:regression:headed`
4. **Isoler test** - Kør kun én fil ad gangen

## Tilføj Nye Tests

Template for nye tests:

```javascript
test('Descriptive test name', async ({ page }) => {
    // Setup
    const initialValue = await page.evaluate(() => window.gameState?.property);
    console.log(`Initial: ${initialValue}`);
    
    // Action
    await page.keyboard.down('w');
    await page.waitForTimeout(1000);
    await page.keyboard.up('w');
    
    // Assert
    const finalValue = await page.evaluate(() => window.gameState?.property);
    console.log(`Final: ${finalValue}, Changed: ${finalValue !== initialValue}`);
    expect(finalValue).toBeGreaterThan(initialValue);
});
```

## Vedligeholdelse

- Kør tests efter HVER code ændring
- Opdater tests når features ændres
- Tilføj nye tests for nye features
- Hold tests hurtige (< 30s per test)
