// LLM Commentary System
// Tracks game events and requests AI commentary

import { gameState } from './state.js';

// Event types
export const EVENTS = {
    DRIFT_START: 'DRIFT_START',
    DRIFT_COMBO: 'DRIFT_COMBO',
    SPEED_MILESTONE: 'SPEED_MILESTONE',
    POLICE_KILLED: 'POLICE_KILLED',
    POLICE_LOOT: 'POLICE_LOOT',
    CRASH: 'CRASH',
    NEAR_MISS: 'NEAR_MISS',
    HEAT_INCREASE: 'HEAT_INCREASE',
    LOW_HEALTH: 'LOW_HEALTH',
    ARRESTED: 'ARRESTED',
    BUILDING_DESTROYED: 'BUILDING_DESTROYED',
    GAME_START: 'GAME_START',
    TREE_DESTROYED: 'TREE_DESTROYED',
    LONG_DRIFT: 'LONG_DRIFT',
    HIGH_SPEED_CHASE: 'HIGH_SPEED_CHASE',
    MONEY_MILESTONE: 'MONEY_MILESTONE',
    SURVIVAL_MILESTONE: 'SURVIVAL_MILESTONE',
    POLICE_SWARM: 'POLICE_SWARM',
    CLOSE_CALL: 'CLOSE_CALL',
    HEALTH_CRITICAL: 'HEALTH_CRITICAL'
};

// Commentary state
const commentaryState = {
    eventBuffer: [],
    lastRequestTime: 0,
    requestCooldown: 5000, // 5 seconds between API calls
    commentaryQueue: [],
    isDisplaying: false,
    displayDuration: 6000,
    enabled: true,
    lastSpeedMilestone: 0,
    lastHeatLevel: 1,
    lastHealthWarning: false,
    lastDriftCombo: 0,
    lastMoneyMilestone: 0,
    lastSurvivalMilestone: 0,
    lastPoliceSwarm: 0,
    driftStartTime: 0,
    isDrifting: false,
    activeBubbles: [], // Track active bubbles for stacking
    lastPoliceMessageTime: 0,
    policeMessageCooldown: 12000 // 12 seconds cooldown for police radio (less frequent than commentary)
};

// System prompt for the commentator
const SYSTEM_PROMPT = `Du er en begejstret sportskommentator til et ulovligt gaderæs-spil kaldet "Flugt fra Politiet".
Du er dramatisk, munter og elsker at hype spillerens handlinger.
SKRIV ALTID PÅ DANSK!
Hold svarene KORTE - maksimalt 1-2 sætninger, under 25 ord i alt.
Brug racerløbs- og actionfilm-referencer og ordspil.
Vær altid positiv og opmuntrende, selv når tingene går galt.
Tal i nutid som om du ser det live.
Brug udtryk som "Fantastisk!", "Helt vildt!", "Nej hvor fedt!", "Av for den!", "Sikke en tur!".
Brug aldrig hashtags eller emojis i din kommentar.`;

// System prompt for Police Scanner
const POLICE_SCANNER_PROMPT = `Du er en politi-dispatch radiooperatør i spillet "Flugt fra Politiet".
Du kommunikerer kort og præcist med patruljevogne.
SKRIV KUN RADIO-BESKEDER PÅ DANSK.
Brug politi-koder og jargon (10-4, mistænkte, eftersættelse, centralen).
Hold det hektisk og seriøst, men gerne med en snert af frustration over spillerens vanvidskørsel.
Maks 15 ord.
Ingen emojis.`;

// Fallback phrases for Police Scanner
const POLICE_FALLBACKS = [
    "Centralen her, mistænkte observeret med høj fart. 10-4.",
    "Vi har brug for øjeblikkelig forstærkning!",
    "Han kører vanvittigt! Ryd gaden!",
    "Bilen er efterlyst. Stands ham for enhver pris.",
    "Alle enheder, form en blokade nu!",
    "Dæk dækkene! Skyd efter dækkene!",
    "Mistænkte er farlig. Vær forsigtig derude.",
    "Vi mister ham! Hvor er den helikopter?!",
    "Centralen til patrulje 4, hvad er jeres status?",
    "Han rammer alt på sin vej! Stop ham!"
];

// Fallback phrases if API fails
const FALLBACK_PHRASES = {
    [EVENTS.DRIFT_START]: [
        "Han glider ind som en professionel!",
        "Det drift er ren poesi i bevægelse!",
        "Sidelæns er den eneste vej!"
    ],
    [EVENTS.DRIFT_COMBO]: [
        "Combo-tid! Bliv ved!",
        "Drift-multiplikatoren er HELT OPPE!",
        "En drift-konge i støbeskeen!"
    ],
    [EVENTS.SPEED_MILESTONE]: [
        "SPEEDEREN I BUND!",
        "Denne fartdjævel kender ingen grænser!",
        "Hurtigere end en fartbøde!"
    ],
    [EVENTS.POLICE_KILLED]: [
        "Endnu en bider i græsset!",
        "Den politibil blev lige PENSIONERET!",
        "Politi nede! Helt vildt!"
    ],
    [EVENTS.POLICE_LOOT]: [
        "Ka-ching! Det er sød retfærdighed!",
        "Den der finder, må beholde, betjent!",
        "Samler politikassen ind!"
    ],
    [EVENTS.CRASH]: [
        "Et lille bump har aldrig skadet nogen... meget!",
        "Lakken er overvurderet alligevel!",
        "Det kan nok fikses... måske!"
    ],
    [EVENTS.HEAT_INCREASE]: [
        "Det varmer op! Flere betjente på vej!",
        "De sender forstærkning! GODT!",
        "Nu bliver det hedt!"
    ],
    [EVENTS.LOW_HEALTH]: [
        "Det bliver lidt sprødt derovre! Pas på!",
        "Skadekontrol nødvendig NU!",
        "Stadig i spillet, stadig kæmpende!"
    ],
    [EVENTS.BUILDING_DESTROYED]: [
        "EJENDOMSSKADE! Forsikringsselskaber hader det her!",
        "Den bygning havde fortjent det!",
        "Hvem har brug for strukturel integritet?!"
    ],
    [EVENTS.GAME_START]: [
        "Mine damer og herrer, START JERES MOTORER!",
        "Jagten er i gang! Lad os skabe kaos!",
        "Tid til at vise politiet hvad vi er lavet af!"
    ],
    [EVENTS.ARRESTED]: [
        "Fanget! Men sikke en vild tur!",
        "De fik dig denne gang... men du vender tilbage!",
        "Game over, men legender dør aldrig!"
    ],
    [EVENTS.TREE_DESTROYED]: [
        "TRÆFÆLDNING! Miljøministeren græder!",
        "Det træ stod i vejen!",
        "Naturen må vige for farten!"
    ],
    [EVENTS.LONG_DRIFT]: [
        "Sikke et drift! Dækmandens mareridt!",
        "Sidelæns i EVIGHEDER! Fantastisk!",
        "Driften fortsætter! Helt vildt!"
    ],
    [EVENTS.HIGH_SPEED_CHASE]: [
        "Fuldstændig vanvittig fart! De kan ikke følge med!",
        "Speedometeret eksploderer næsten!",
        "KØR KØR KØR! Politiet spiser støv!"
    ],
    [EVENTS.MONEY_MILESTONE]: [
        "Pengene vælter ind! Cha-ching!",
        "Sikke en formue! Kriminalitet betaler sig!",
        "Bankkontoen takker!"
    ],
    [EVENTS.SURVIVAL_MILESTONE]: [
        "Stadig på fri fod! Imponerende!",
        "Minutterne flyver! Legendarisk flugt!",
        "Politiet må være frustrerede nu!"
    ],
    [EVENTS.POLICE_SWARM]: [
        "DE KOMMER FRA ALLE SIDER!",
        "Sikke en sværm af blå blink!",
        "Hele politistyrken er ude!"
    ],
    [EVENTS.CLOSE_CALL]: [
        "LIGE VED OG NÆSTEN! Puha!",
        "Det var tæt på! Hjertet banker!",
        "Sneg sig lige forbi! Nej hvor vildt!"
    ],
    [EVENTS.HEALTH_CRITICAL]: [
        "BILEN FALDER SNART SAMMEN!",
        "Kritisk skade! Kør forsigtigt... eller ej!",
        "Røgen vælter ud! Det ser ikke godt ud!"
    ]
};

// Log a game event
export function logEvent(type, value = null, context = {}) {
    if (!commentaryState.enabled) return;
    
    const event = {
        type,
        value,
        timestamp: Date.now(),
        context: {
            speed: Math.round(gameState.speed * 3.6), // Convert to km/h
            heatLevel: gameState.heatLevel,
            policeCount: gameState.policeCars.filter(p => !p.userData.dead).length,
            health: Math.round(gameState.health),
            money: gameState.money,
            ...context
        }
    };
    
    commentaryState.eventBuffer.push(event);
    console.log('[Commentary] Event logged:', type, value);
    
    // Trim buffer to last 20 events
    if (commentaryState.eventBuffer.length > 20) {
        commentaryState.eventBuffer.shift();
    }
}

// Check for automatic events based on game state changes
export function checkStateEvents() {
    const currentSpeed = Math.round(gameState.speed * 3.6);
    const now = Date.now();
    
    // Speed milestones (50, 100, 150, 200 km/h)
    const milestones = [50, 100, 150, 200];
    for (const milestone of milestones) {
        if (currentSpeed >= milestone && commentaryState.lastSpeedMilestone < milestone) {
            logEvent(EVENTS.SPEED_MILESTONE, milestone);
            commentaryState.lastSpeedMilestone = milestone;
        }
    }
    if (currentSpeed < commentaryState.lastSpeedMilestone - 20) {
        commentaryState.lastSpeedMilestone = Math.floor(currentSpeed / 50) * 50;
    }
    
    // High speed chase (sustained 150+ km/h)
    if (currentSpeed >= 150 && !commentaryState.highSpeedStart) {
        commentaryState.highSpeedStart = now;
    } else if (currentSpeed < 130) {
        commentaryState.highSpeedStart = null;
    }
    if (commentaryState.highSpeedStart && (now - commentaryState.highSpeedStart > 5000)) {
        logEvent(EVENTS.HIGH_SPEED_CHASE, currentSpeed);
        commentaryState.highSpeedStart = null; // Reset to not spam
    }
    
    // Heat level increase
    if (gameState.heatLevel > commentaryState.lastHeatLevel) {
        logEvent(EVENTS.HEAT_INCREASE, gameState.heatLevel);
        commentaryState.lastHeatLevel = gameState.heatLevel;
    }
    
    // Low health warning
    if (gameState.health < 30 && gameState.health > 10 && !commentaryState.lastHealthWarning) {
        logEvent(EVENTS.LOW_HEALTH, gameState.health);
        commentaryState.lastHealthWarning = true;
    } else if (gameState.health >= 50) {
        commentaryState.lastHealthWarning = false;
    }
    
    // Critical health (under 10%)
    if (gameState.health <= 10 && gameState.health > 0 && !commentaryState.criticalHealthWarning) {
        logEvent(EVENTS.HEALTH_CRITICAL, gameState.health);
        commentaryState.criticalHealthWarning = true;
    } else if (gameState.health > 15) {
        commentaryState.criticalHealthWarning = false;
    }
    
    // Drift tracking
    if (gameState.driftFactor > 0.4 && !commentaryState.isDrifting) {
        commentaryState.isDrifting = true;
        commentaryState.driftStartTime = now;
        logEvent(EVENTS.DRIFT_START);
    } else if (gameState.driftFactor < 0.2 && commentaryState.isDrifting) {
        // Check for long drift
        const driftDuration = now - commentaryState.driftStartTime;
        if (driftDuration > 3000) {
            logEvent(EVENTS.LONG_DRIFT, Math.round(driftDuration / 1000));
        }
        commentaryState.isDrifting = false;
    }
    
    // Money milestones (every 5000)
    const moneyMilestone = Math.floor(gameState.money / 5000) * 5000;
    if (moneyMilestone > commentaryState.lastMoneyMilestone && moneyMilestone >= 5000) {
        logEvent(EVENTS.MONEY_MILESTONE, moneyMilestone);
        commentaryState.lastMoneyMilestone = moneyMilestone;
    }
    
    // Survival milestones (every 60 seconds)
    const survivalSeconds = Math.floor((now - gameState.startTime) / 1000);
    const survivalMinutes = Math.floor(survivalSeconds / 60);
    if (survivalMinutes > commentaryState.lastSurvivalMilestone && survivalMinutes >= 1) {
        logEvent(EVENTS.SURVIVAL_MILESTONE, survivalMinutes);
        commentaryState.lastSurvivalMilestone = survivalMinutes;
    }
    
    // Police swarm (5+ active cops)
    const activePolice = gameState.policeCars.filter(p => !p.userData.dead).length;
    if (activePolice >= 5 && commentaryState.lastPoliceSwarm < activePolice - 1) {
        logEvent(EVENTS.POLICE_SWARM, activePolice);
        commentaryState.lastPoliceSwarm = activePolice;
    } else if (activePolice < 3) {
        commentaryState.lastPoliceSwarm = 0;
    }
}

// Build event summary for LLM
function buildEventSummary() {
    if (commentaryState.eventBuffer.length === 0) return null;
    
    const recentEvents = commentaryState.eventBuffer.slice(-5);
    const summary = recentEvents.map(e => {
        switch(e.type) {
            case EVENTS.DRIFT_START:
                return `Spilleren startede et drift!`;
            case EVENTS.DRIFT_COMBO:
                return `Spilleren ramte en ${e.value}x drift combo!`;
            case EVENTS.LONG_DRIFT:
                return `Spilleren driftede i ${e.value} sekunder!`;
            case EVENTS.SPEED_MILESTONE:
                return `Spilleren nåede ${e.value} km/t!`;
            case EVENTS.HIGH_SPEED_CHASE:
                return `Spilleren kører vanvittigt hurtigt - ${e.value} km/t i lang tid!`;
            case EVENTS.POLICE_KILLED:
                return `Spilleren smadrede en politibil!`;
            case EVENTS.POLICE_LOOT:
                return `Spilleren samlede ${e.value} kr fra en ødelagt politibil!`;
            case EVENTS.CRASH:
                return `Spilleren crashede ind i ${e.value || 'noget'}!`;
            case EVENTS.HEAT_INCREASE:
                return `Efterlysningsniveau steg til ${e.value} stjerner!`;
            case EVENTS.LOW_HEALTH:
                return `Spillerens bil er nede på ${e.value}% liv!`;
            case EVENTS.HEALTH_CRITICAL:
                return `KRITISK! Bilen har kun ${e.value}% liv tilbage!`;
            case EVENTS.BUILDING_DESTROYED:
                return `Spilleren smadrede gennem en bygning!`;
            case EVENTS.TREE_DESTROYED:
                return `Spilleren væltede et træ!`;
            case EVENTS.GAME_START:
                return `Jagten er begyndt!`;
            case EVENTS.MONEY_MILESTONE:
                return `Spilleren har samlet ${e.value} kr!`;
            case EVENTS.SURVIVAL_MILESTONE:
                return `Spilleren har undgået politiet i ${e.value} minut${e.value > 1 ? 'ter' : ''}!`;
            case EVENTS.POLICE_SWARM:
                return `Der er nu ${e.value} politibiler efter spilleren!`;
            case EVENTS.CLOSE_CALL:
                return `Spilleren undgik lige akkurat anholdelse!`;
            default:
                return `${e.type} skete`;
        }
    }).join(' ');
    
    const latestContext = recentEvents[recentEvents.length - 1].context;
    const contextInfo = `Status: ${latestContext.speed} km/t, ${latestContext.policeCount} betjente i forfølgelse, efterlysningsniveau ${latestContext.heatLevel}/5, ${latestContext.health}% liv, ${latestContext.money} kr samlet.`;
    
    return `${summary}\n${contextInfo}\n\nGiv en kort, spændende kommentar på dansk om hvad der lige skete!`;
}

// Request commentary from server
async function requestCommentary() {
    const summary = buildEventSummary();
    if (!summary) return;
    
    try {
        const response = await fetch('/api/commentary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                systemPrompt: SYSTEM_PROMPT,
                eventSummary: summary 
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.commentary) {
                queueCommentary(data.commentary);
            }
        } else {
            console.warn('[Commentary] API request failed, using fallback');
            useFallbackCommentary();
        }
    } catch (error) {
        console.error('[Commentary] Error:', error);
        useFallbackCommentary();
    }
    
    // Clear processed events
    commentaryState.eventBuffer = [];
}

// Use fallback phrases when API fails
function useFallbackCommentary() {
    const recentEvents = commentaryState.eventBuffer.slice(-3);
    if (recentEvents.length === 0) return;
    
    // Pick a random recent event type
    const event = recentEvents[Math.floor(Math.random() * recentEvents.length)];
    const phrases = FALLBACK_PHRASES[event.type];
    if (phrases) {
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        queueCommentary(phrase);
    }
}

// Add commentary to display queue
function queueCommentary(text) {
    commentaryState.commentaryQueue.push(text);
    console.log('[Commentary] Queued:', text);
    
    // Immediately show the bubble (don't wait)
    showCommentaryBubble(text);
}

// Display commentary in UI - create stacking chat bubbles on right side
function showCommentaryBubble(text) {
    // Create container if it doesn't exist
    let container = document.getElementById('commentaryContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'commentaryContainer';
        container.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 10000;
            pointer-events: none;
            max-height: 60vh;
            overflow: hidden;
        `;
        document.body.appendChild(container);
    }
    
    // Create new bubble
    const bubble = document.createElement('div');
    bubble.className = 'commentary-bubble';
    bubble.style.cssText = `
        background: rgba(0, 0, 0, 0.85);
        color: #fff;
        padding: 10px 16px;
        border-radius: 16px 16px 4px 16px;
        font-size: 13px;
        font-family: 'Arial', sans-serif;
        font-weight: 500;
        text-align: left;
        max-width: 280px;
        border: 2px solid #ffcc00;
        box-shadow: 0 4px 15px rgba(255, 204, 0, 0.3);
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.4s ease, transform 0.4s ease;
        line-height: 1.4;
    `;
    
    // Add to container at the top
    container.insertBefore(bubble, container.firstChild);
    
    // Push existing bubbles down (animate)
    const existingBubbles = container.querySelectorAll('.commentary-bubble');
    existingBubbles.forEach((b, index) => {
        if (index > 0) {
            b.style.opacity = Math.max(0.3, 1 - index * 0.2).toString();
        }
    });
    
    // Limit number of bubbles
    while (container.children.length > 4) {
        const lastBubble = container.lastChild;
        lastBubble.style.opacity = '0';
        lastBubble.style.transform = 'translateX(50px)';
        setTimeout(() => lastBubble.remove(), 300);
    }
    
    // Animate in
    requestAnimationFrame(() => {
        bubble.style.opacity = '1';
        bubble.style.transform = 'translateX(0)';
    });
    
    // Typewriter effect
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            bubble.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 25);
    
    // Fade out after display duration
    setTimeout(() => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateX(50px)';
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        }, 400);
    }, commentaryState.displayDuration);
}

function hideCommentaryBubble() {
    // Clear all bubbles
    const container = document.getElementById('commentaryContainer');
    if (container) {
        container.innerHTML = '';
    }
}

// Main update function - call this from game loop
export function updateCommentary() {
    checkStateEvents();
    
    const now = Date.now();
    
    // Request commentary if we have events and cooldown has passed
    if (commentaryState.eventBuffer.length > 0 && 
        now - commentaryState.lastRequestTime > commentaryState.requestCooldown) {
        commentaryState.lastRequestTime = now;
        requestCommentary();
    }
    
    // Check for police scanner triggers (independent of event buffer, but based on state)
    if (gameState.heatLevel >= 2 && 
        now - commentaryState.lastPoliceMessageTime > commentaryState.policeMessageCooldown) {
        // Chance to trigger police scanner is higher at higher heat
        const chance = 0.005 * gameState.heatLevel; // e.g. 0.01 at heat 2 per frame? No, updateCommentary is called every frame? 
        // Better logic: If cooldown passed, just do it if interesting things happen?
        // Let's just use cooldown and high heat condition for now, maybe with a small random factor so it's not exact intervals
        if (Math.random() < 0.05) { // 5% chance per frame once cooldown is passed is too high. 
            // Actually updateCommentary is likely called in the game loop (60fps).
            // Let's just trigger it solely on cooldown + intense action check inside the function
             triggerPoliceScanner();
        }
    }
}

// Enable/disable commentary
export function setCommentaryEnabled(enabled) {
    commentaryState.enabled = enabled;
    if (!enabled) {
        hideCommentaryBubble();
        commentaryState.commentaryQueue = [];
        commentaryState.eventBuffer = [];
    }
}

// Reset state (call on game start)
export function resetCommentary() {
    commentaryState.eventBuffer = [];
    commentaryState.lastRequestTime = 0;
    commentaryState.commentaryQueue = [];
    commentaryState.isDisplaying = false;
    commentaryState.lastSpeedMilestone = 0;
    commentaryState.lastHeatLevel = 1;
    commentaryState.lastHealthWarning = false;
    commentaryState.lastDriftCombo = 0;
    commentaryState.lastMoneyMilestone = 0;
    commentaryState.lastSurvivalMilestone = 0;
    commentaryState.lastPoliceSwarm = 0;
    commentaryState.driftStartTime = 0;
    commentaryState.isDrifting = false;
    commentaryState.highSpeedStart = null;
    commentaryState.criticalHealthWarning = false;
    
    // Clear any existing bubbles
    hideCommentaryBubble();
    
    // Log game start event
    logEvent(EVENTS.GAME_START);
}

// Export for testing
export const _internal = {
    commentaryState,
    FALLBACK_PHRASES
}; 

// ==========================================
// POLICE SCANNER FUNCTIONS
// ==========================================

async function triggerPoliceScanner() {
    commentaryState.lastPoliceMessageTime = Date.now();
    
    // Create specific context for police
    const context = {
        speed: Math.round(gameState.speed * 3.6),
        heat: gameState.heatLevel,
        location: "City Center", // Placeholder
        violation: "Reckless Driving"
    };
    
    // Only request if actually interesting
    if (context.heat < 2 && context.speed < 80) return;

    const summary = `Situation: Suspect moving at ${context.speed} km/t. Heat Level ${context.heat}/5. Active Pursuit.`;
    
    try {
        const response = await fetch('/api/commentary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                systemPrompt: POLICE_SCANNER_PROMPT,
                eventSummary: summary 
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.commentary) {
                showPoliceScannerBubble(data.commentary);
            }
        } else {
            usePoliceFallback();
        }
    } catch (error) {
        // Silent fail or fallback
        usePoliceFallback();
    }
}

function usePoliceFallback() {
    const phrase = POLICE_FALLBACKS[Math.floor(Math.random() * POLICE_FALLBACKS.length)];
    showPoliceScannerBubble(phrase);
}

function showPoliceScannerBubble(text) {
    let bubble = document.getElementById('policeScannerBubble');
    if (!bubble) {
        bubble = document.createElement('div');
        bubble.id = 'policeScannerBubble';
        bubble.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 20, 0, 0.9);
            color: #00ff00;
            padding: 10px 15px;
            border: 1px solid #00ff00;
            border-radius: 5px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 14px;
            max-width: 300px;
            z-index: 9999;
            text-transform: uppercase;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.5s;
        `;
        
        // Add "SCANNING..." header
        const header = document.createElement('div');
        header.style.cssText = "font-size: 10px; margin-bottom: 5px; opacity: 0.7; border-bottom: 1px solid #004400; padding-bottom: 2px;";
        header.textContent = "POLICE FREQUENCY 112.5 MHz";
        bubble.appendChild(header);
        
        const content = document.createElement('div');
        content.id = 'policeScannerContent';
        bubble.appendChild(content);
        
        document.body.appendChild(bubble);
    }
    
    const content = bubble.querySelector('#policeScannerContent');
    content.textContent = "";
    bubble.style.opacity = "1";
    
    // Typewriter effect
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            content.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 20);
    
    // Static noise sound effect could be added here
    
    // Hide after duration
    setTimeout(() => {
        bubble.style.opacity = "0";
    }, 6000);
}
