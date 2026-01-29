# Flugt fra Politiet - Godot Engine POC 🚗

Dette er en simpel Proof of Concept (POC) af "Flugt fra Politiet" spillet lavet i Godot Engine 4.2+.

## 📖 Om denne POC

Denne demonstration viser hvordan det originale Three.js spil kunne implementeres i Godot Engine med følgende funktioner:

- ✅ 3D bil med fysik (RigidBody)
- ✅ Spillerkontrol (WASD/piletaster + mellemrum til drift)
- ✅ Simpel politi AI der forfølger spilleren
- ✅ Grundlæggende bane/verden
- ✅ Kamera der følger spilleren
- ✅ HUD med kontroller på dansk

## 🎮 Sådan kører du POC'en

### Forudsætninger

Du skal have Godot Engine installeret:

1. Gå til [https://godotengine.org/download](https://godotengine.org/download)
2. Download Godot 4.2 eller nyere (Standard version er fin)
3. Installer Godot på din computer

### Trin-for-trin

1. **Åbn Godot Engine**
   - Start Godot programmet

2. **Importer projektet**
   - Klik på "Import" i Project Manager
   - Find mappen `godot-poc` i dette repository
   - Vælg filen `project.godot`
   - Klik "Import & Edit"

3. **Kør spillet**
   - Når projektet er åbnet, tryk på F5 eller klik på "Play"-knappen øverst til højre
   - Spillet starter automatisk!

## 🎯 Kontroller

| Tast | Handling |
|------|----------|
| `W` eller `↑` | Kør fremad |
| `S` eller `↓` | Bremse / Bak |
| `A` eller `←` | Drej til venstre |
| `D` eller `→` | Drej til højre |
| `SPACE` | Håndbremse (Drift) |

## 🏗️ Projekt Struktur

```
godot-poc/
├── project.godot          # Hoved projektfil
├── icon.svg              # Projekt ikon
├── scenes/
│   ├── main.tscn         # Hoved scene med verden
│   ├── player_car.tscn   # Spiller bil
│   └── police_car.tscn   # Politi bil
└── scripts/
    ├── car_controller.gd # Spiller bil styring
    └── police_ai.gd      # Politi AI logik
```

## 🔧 Tekniske Detaljer

### Car Controller (`car_controller.gd`)

Spillerens bil bruger Godot's `RigidBody3D` til realistisk fysik:
- Acceleration og max hastighed
- Styrings-logik baseret på hastighed
- Drift/handbrake funktion
- Auto-stabilisering for at forhindre vælten

### Police AI (`police_ai.gd`)

Simpel forfølgelses-AI:
- Finder spilleren automatisk
- Bevæger sig mod spilleren
- Begrænset til detection range
- Roterer for at følge bevægelsesretning

### Scene Struktur

**Main Scene:**
- Miljø med himmel og lys
- Stor flad bane (200x200 enheder)
- Spiller bil
- 2 politi biler
- HUD overlay med kontroller

## 🚀 Næste Skridt / Udvidelser

Hvis du vil udvide denne POC kan du tilføje:

- 🏙️ Procedurel by-generering (ligesom Three.js versionen)
- 💰 Mønt-indsamlings system
- ❤️ Sundhedssystem
- 🎨 Bedre grafik og materialer
- 🔊 Lyde og musik
- 📊 Heat level system
- 🏪 Butik til at købe nye biler
- 🎮 Multiplayer support (med Godot's netværk)
- 🤖 Mere avanceret AI (koordineret politi angreb)

## 📚 Godot Resources

- [Official Documentation](https://docs.godotengine.org/en/stable/)
- [Godot Tutorials](https://docs.godotengine.org/en/stable/community/tutorials.html)
- [GDScript Reference](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html)
- [Physics Introduction](https://docs.godotengine.org/en/stable/tutorials/physics/physics_introduction.html)

## 💡 Fordele ved Godot

Sammenlignet med Three.js implementeringen tilbyder Godot:

1. **Built-in Physics Engine** - Ingen behov for eksterne biblioteker
2. **Visual Scene Editor** - Nemmere at designe verden og objekter
3. **GDScript** - Python-lignende scripting specifikt til spil
4. **Performance** - Kompileret engine med bedre ydeevne
5. **Cross-platform Export** - Nem export til desktop, web, mobil
6. **Integrated Tools** - Animation, partikler, lyd, alt i én editor

## 📝 Notater

Dette er en *proof of concept* - den viser grundlæggende funktionalitet men er ikke en komplet implementering af det fulde spil. Den kan bruges som udgangspunkt for at genskabe "Flugt fra Politiet" i Godot Engine.

---

**Original Spil**: Three.js version (se hovedmappen)  
**POC Version**: Godot Engine 4.2+  
**Sprog**: GDScript med dansk UI tekst
