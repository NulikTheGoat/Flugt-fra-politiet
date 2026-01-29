# Politi Forbedringsplan: Operation Sheriff

## Formål
At forbedre politiets indsats og taktiske dybde ved at introducere en ny unik enhed: **Sheriff**.
Denne enhed fungerer som en feltkommandør, der styrer slagets gang frem for blot at jagte spilleren blindt.

## Den Nye Enhed: Sheriff

### Profil
*   **Navn:** Sheriff
*   **Rolle:** Taktisk Kommandør / Boss Enhed
*   **Hastighed:** Langsommere end standard politibiler (ca. 80-90% af normal politifart).
*   **Liv (HP):** Markant højere end almindelige enheder (Tank).
*   **Adfærd:** 
    *   Passiv/Observerende.
    *   Holder afstand til spilleren (forsøger ikke at ramme, men at følge med).
    *   **Anti-Crash AI:** Prioriterer at undgå bygninger og forhindringer højere end at fange spilleren. Har forbedret pathfinding.

### Funktioner
1.  **Politi Radio Central:** 
    *   Alle beskeder fra "Politi Radioen" (via LLM/Commentary systemet) skal visuelt komme fra Sheriffs bil som en taleboble, hvis han er aktiv på banen.
2.  **Taktisk Overhoved:** 
    *   Hans tilstedeværelse kan evt. buffe andre enheder eller koordinere angreb (fremtidig udvidelse).

## Implementation Checklist

### Phase 1: Konfiguration & Setup
- [x] Tilføj "Sheriff" til `cars` konfigurationen i `js/constants.js`.
    - [x] Høj HP værdi.
    - [x] Lav hastighed / acceleration.
    - [x] Unik farve (f.eks. Sort/Guld eller Brun/Guld).
- [x] Juster spawn logik i `js/police.js` for at tillade en særlig "Boss Spawn" (f.eks. ved Heat Level 3+ eller 4+).

### Phase 2: AI Logik (Den Kloge Bilist)
- [x] Implementer ny AI-tilstand for Sheriff i `js/police.js`.
    - [x] **Observer Mode:** Hold en cirkulær afstand til spilleren.
    - [x] **Obstacle Avoidance:** Implementer 'raycasting' eller vektor-check foran bilen for at dreje udenom bygninger, før kollision.
    - [x] Sheriff skal aldrig forsøge at ramme spilleren direkte (kamikaze), medmindre spilleren holder stille.

### Phase 3: Radio Integration
- [x] Opdater `js/commentary.js` og `js/ui.js`:
    - [x] Check om en Sheriff er spawned.
    - [x] Hvis ja: Flyt politi-radio boksen (`showPoliceScannerBubble`) så den følger Sheriff-bilens 2D-skærmposition.
    - [x] Hvis nej: Brug standard UI placering (bunden af skærmen).

### Phase 4: Test & Balancering
- [x] Test at Sheriffen ikke kører ind i bygninger (Implementeret proactively AI).
- [x] Test at taleboblerne følger bilen korrekt (Implementeret i update loop).
- [x] Balancer HP så han føles som en boss (HP sat til 800).
