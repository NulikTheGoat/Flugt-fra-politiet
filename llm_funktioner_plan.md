# LLM Funktioner Plan

Her er en plan for sjove og opfindsomme LLM funktioner til spillet:

## 1. 🚓 Politi-Radioen (Police Scanner)
- [x] Implementere UI til politi-radio
- [x] Tilføje logik til at generere politi-beskeder via LLM
- [x] Integrere med spil-events

I stedet for kun at kommentere på spilleren, kan LLM'en generere intern politi-kommunikation.

*   **Koncept:** Du opsnapper politiets radiobølger.
*   **Eksempel:**
    *   "Centralen, den røde sportsvogn kører som en brækket arm! Jeg kan ikke følge med!"
    *   "Han har lige smadret Jens' pølsevogn! Send SWAT-teamet!"
    *   "Mistænkte drifter i cirkler... jeg bliver køresyg, over."
*   **UI:** En lille "radio-tekst" i venstre hjørne med en anden skrifttype (fx grøn terminal-tekst).

## 2. ⚖️ Dommerens Dom (Game Over Screen)
- [x] Designe 'Dommerens Dom' skærm ved Game Over
- [x] Samle statistik til LLM prompt
- [x] Implementere LLM-kald ved slutningen af spillet

Når spilleren bliver ARRESTED, bruger vi statistikken fra spillet til at generere en unik domsfældelse.

*   **Koncept:** En "Breaking News" eller en retsudskrift.
*   **Input til LLM:** Antal smadrede biler, træer, fartbøder, varighed.
*   **Output:**
    *   "Tiltalte idømmes 14 års fængsel for at køre 200 km/t i en byzone og for at have fornærmet en betjents overskæg."
    *   "Dommeren var målløs over de 45 ødelagte lygtepæle. Kørekortet er brændt offentligt."

## 3. 🗺️ Den Sarkastiske GPS
- [ ] Tilføje GPS stemme/tekst UI
- [ ] Lave triggers for lavt liv, crash og tomgang
- [ ] Skrive personlighedsprompt til LLM

Giv bilen en personlighed (lidt som KITT fra Knight Rider, men træt af livet).

*   **Koncept:** Når health er lav, eller du kører dårligt, kommer GPS'en med kommentarer.
*   **Eksempler:**
    *   *Ved lavt liv:* "Har du overvejet at bremse? Bare en tanke."
    *   *Ved crash:* "Av! Det var min kofanger, din idiot."
    *   *Ved tomgang:* "Skal vi køre, eller venter vi på at ruste op?"

## 4. 📱 "The Boss" - Dynamiske Missioner
- [ ] Lave misssions-system logic
- [ ] Designe SMS notifikation UI
- [ ] Implementere belønningssystem

En kriminel bagmand sender SMS'er til spilleren med tilfældige mini-missioner genereret af LLM'en baseret på omgivelserne.

*   **Koncept:** Giver spilleren et mål udover bare at overleve.
*   **Eksempel:**
    *   "Hey makker. Jeg skal bruge brænde. Vælt 5 træer indenfor 30 sekunder!"
    *   "Politiet har stjålet mine donuts. Smadr 3 politibiler NU!"
*   **Belønning:** Hvis spilleren gør det, giver "The Boss" ekstra penge (vi kan parse LLM'ens svar for at se om missionen gav mening, eller bare give penge når spilleren udfører handlingen).

## 5. 📰 Dagens Avis (Highscore Context)
- [ ] Lave Avis-forside UI til Highscore skærm
- [ ] Trigger ved ny highscore

Når man sætter en ny Highscore, genererer LLM'en en forside-overskrift til "Ekstra Bladet" eller "BT".

*   **Overskrift:** "VANVIGSBILIST TERRORISERER BYEN!"
*   **Underoverskrift:** "Vidner udtaler: 'Han driftede forbi mens han spiste en hotdog'."
