# 💰 Economy Rebalance Plan

## Overview
This plan addresses the game economy imbalances to improve player progression and engagement.

---

## 📊 Current State Analysis

### Income Sources
| Source | Amount | Frequency |
|--------|--------|-----------|
| Passive Income | 100 × heat level | Every 10 sec |
| Coin Pickup | 50 | Random spawns |
| Police Kill | heat × 100 | Per kill |
| Dead Police Pickup | 250 | Per car |
| Mission Rewards | 2,500 - 5,000 | One-time |

### Car Prices (Current)
| Car | Price | Time to Earn (Heat 1) |
|-----|-------|----------------------|
| Standard | 0 | Free |
| Sport | 2,500 | ~4 min |
| Muscle | 8,000 | ~13 min |
| Super | 25,000 | ~42 min |
| Hyper | 75,000 | ~2 hours |
| Tank | 200,000 | ~5.5 hours |
| UFO | 500,000 | ~14 hours |

### Problems Identified
1. **Extreme price jumps** between cars (2.5-3x each tier)
2. **Passive income too slow** - UFO requires ~333 games
3. **No meaningful sinks** - money becomes worthless after buying all cars
4. **Reward imbalance** - enemy tier doesn't affect rewards
5. **No skill-based bonuses** - no rewards for drifting, near misses, combos

---

## ✅ Proposed Changes

### Phase 1: Car Price Rebalancing
**File:** `js/constants.js`

```javascript
// OLD → NEW prices
standard: 0        → 0         // Free starter
sport:    2,500    → 1,500     // ~2.5 min
muscle:   8,000    → 4,000     // ~6 min
super:    25,000   → 12,000    // ~15 min
hyper:    75,000   → 35,000    // ~35 min
tank:     200,000  → 80,000    // ~1 hour
ufo:      500,000  → 150,000   // ~2 hours
```

### Phase 2: Reward Scaling by Enemy Type
**File:** `js/police.js`

| Enemy Type | Kill Reward | Pickup Reward |
|------------|-------------|---------------|
| Standard | 150 | 300 |
| Interceptor | 200 | 400 |
| SWAT | 350 | 700 |
| Military | 500 | 1,000 |
| Sheriff | 1,000 | 2,000 |

### Phase 3: Improved Passive Income
**File:** `js/config.js` and `js/ui.js`

```javascript
// Current: 100 × heat level (linear)
// Proposed: exponential scaling
passiveIncomeBase: 100,
passiveIncomeFormula: base × (heat ^ 1.5)

// Heat 1: 100
// Heat 2: 283
// Heat 3: 520
// Heat 4: 800
// Heat 5: 1,118
// Heat 6: 1,470
```

### Phase 4: Skill-Based Bonuses (NEW)
**File:** `js/player.js` and `js/ui.js`

| Skill Action | Bonus |
|--------------|-------|
| Drift (per second) | +10 kr |
| Near Miss (<50 units) | +50 kr |
| High Speed Bonus | +50% at max speed |
| Combo Multiplier | Up to 5x for chained actions |

### Phase 5: Money Sinks (Optional)
**File:** `js/ui.js` and new shop items

- **Repair Cost**: 10% of car price on death
- **Temporary Boosts**: Shield (500), Nitro (300), Coin Magnet (200)
- **Cosmetics**: Car colors, tire smoke, explosion effects

---

## 📁 Files to Modify

1. `js/constants.js` - Car prices
2. `js/config.js` - Economy settings
3. `js/police.js` - Enemy rewards
4. `js/ui.js` - Income calculations
5. `js/player.js` - Skill bonus detection
6. `index.html` - New HUD elements (combo display)

---

## 🎯 Target Metrics

| Car | Target Time to Unlock |
|-----|----------------------|
| Sport | 2-3 games (~5 min) |
| Muscle | 5-6 games (~15 min) |
| Super | 10-12 games (~30 min) |
| Hyper | 20-25 games (~1 hour) |
| Tank | 30-40 games (~1.5 hours) |
| UFO | 40-50 games (~2-3 hours) |

---

## 📋 Implementation Checklist

- [x] **Phase 1**: Rebalance car prices
- [x] **Phase 2**: Add enemy-based reward scaling
- [x] **Phase 3**: Implement exponential passive income
- [ ] **Phase 4**: Add skill-based bonuses (drift, near miss)
- [ ] **Phase 5**: Add money sinks (optional)
- [ ] **Testing**: Verify progression feels balanced
- [ ] **Playtest**: Get feedback on pacing

---

## 🔄 Rollback Plan

All changes are data-driven in `constants.js` and `config.js`. To rollback:
1. Revert car prices to original values
2. Revert `passiveIncomeBase` to 100 (linear)
3. Remove skill bonus code if added

---

## 📅 Timeline

| Phase | Estimated Time |
|-------|---------------|
| Phase 1 (Prices) | 10 min |
| Phase 2 (Enemy rewards) | 30 min |
| Phase 3 (Passive income) | 15 min |
| Phase 4 (Skill bonuses) | 1-2 hours |
| Phase 5 (Sinks) | 2-3 hours |
| Testing | 1 hour |

**Total: ~5-6 hours for full implementation**
