// LLM Commentary System
// Tracks game events and requests AI commentary

import { gameState } from './state.js';
import { camera } from './core.js';
import { playerCar } from './player.js';

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
    requestCooldown: 15000, // 15 seconds between API calls (was 5s)
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
    policeMessageCooldown: 25000, // 25 seconds cooldown for police radio (was 12s)
    lastGPSMessageTime: 0,
    gpsCooldown: 30000, // 30 seconds cooldown for GPS (was 15s)
    lastMovementTime: 0, // Track idle time
    activeMission: null, // { type, target, progress, text, reward, startTime }
    lastMissionTime: 0,
    missionCooldown: 60000, // 60 seconds between missions (was 45s)
    voiceEnabled: true // New flag for Text-to-Speech
};

// ==========================================
// Unified Chat Pane (Right side)
// ==========================================

function ensureChatPane() {
    let pane = document.getElementById('chatPane');
    if (!pane) {
        pane = document.createElement('div');
        pane.id = 'chatPane';
        pane.style.cssText = `
            position: fixed;
            top: 110px;
            right: 20px;
            width: 280px;
            max-height: 40vh;
            background: rgba(10, 10, 20, 0.7);
            border: 1px solid rgba(0, 136, 255, 0.25);
            border-radius: 12px;
            padding: 10px 10px 6px 10px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            z-index: 10000;
            pointer-events: none;
            backdrop-filter: blur(6px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            overflow: hidden;
        `;

        const header = document.createElement('div');
        header.textContent = 'RADIO';
        header.style.cssText = `
            font-size: 10px;
            letter-spacing: 2px;
            color: #9bbcff;
            font-weight: 700;
            text-align: center;
            margin-bottom: 2px;
            opacity: 0.6;
        `;

        const list = document.createElement('div');
        list.id = 'chatMessageList';
        list.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 6px;
            overflow: hidden;
        `;

        pane.appendChild(header);
        pane.appendChild(list);
        document.body.appendChild(pane);
    }
    return pane;
}

// Message queue system to prevent spam
const messageQueue = [];
let isProcessingQueue = false;
const MESSAGE_DELAY = 1500; // 1.5 seconds between messages
let lastMessageTime = 0;

function processMessageQueue() {
    if (isProcessingQueue || messageQueue.length === 0) return;
    
    const now = Date.now();
    const timeSinceLastMessage = now - lastMessageTime;
    
    if (timeSinceLastMessage < MESSAGE_DELAY) {
        // Wait for the remaining delay
        setTimeout(processMessageQueue, MESSAGE_DELAY - timeSinceLastMessage);
        return;
    }
    
    isProcessingQueue = true;
    const msg = messageQueue.shift();
    lastMessageTime = Date.now();
    
    displayChatMessage(msg);
    
    isProcessingQueue = false;
    
    // Process next message after delay
    if (messageQueue.length > 0) {
        setTimeout(processMessageQueue, MESSAGE_DELAY);
    }
}

function appendChatMessage({ source, text, variant = 'default' }) {
    if (!text) return;
    
    // Add to queue instead of displaying immediately
    messageQueue.push({ source, text, variant });
    
    // Limit queue size (drop oldest if too many pending)
    while (messageQueue.length > 8) {
        messageQueue.shift();
    }
    
    processMessageQueue();
}

function displayChatMessage({ source, text, variant = 'default' }) {
    ensureChatPane();
    const list = document.getElementById('chatMessageList');
    if (!list) return;

    const bubble = document.createElement('div');
    const colorMap = {
        default: '#3b82f6',
        commentary: '#f59e0b',
        gps: '#38bdf8',
        boss: '#22c55e',
        police: '#22c55e',
        sheriff: '#facc15'
    };
    const accent = colorMap[variant] || colorMap.default;

    bubble.style.cssText = `
        background: rgba(0,0,0,0.65);
        border: 1px solid ${accent};
        color: #eef2ff;
        border-radius: 12px;
        padding: 8px 10px;
        font-size: 12px;
        line-height: 1.35;
        box-shadow: 0 6px 16px rgba(0,0,0,0.25);
        opacity: 0;
        transform: translateX(12px);
        transition: opacity 0.25s ease, transform 0.25s ease;
    `;

    const title = document.createElement('div');
    title.textContent = source || 'System';
    title.style.cssText = `
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.6px;
        color: ${accent};
        text-transform: uppercase;
        margin-bottom: 4px;
    `;

    const content = document.createElement('div');
    content.textContent = text;

    bubble.appendChild(title);
    bubble.appendChild(content);
    list.appendChild(bubble);

    requestAnimationFrame(() => {
        bubble.style.opacity = '1';
        bubble.style.transform = 'translateX(0)';
    });

    // Auto-fade after 6 seconds
    setTimeout(() => {
        bubble.style.transition = 'opacity 0.5s ease';
        bubble.style.opacity = '0.3';
    }, 6000);

    // Remove after 12 seconds
    setTimeout(() => {
        bubble.style.opacity = '0';
        setTimeout(() => {
            if (bubble.parentNode) bubble.remove();
        }, 500);
    }, 12000);

    // Limit visible messages to 5 (remove oldest immediately if over limit)
    while (list.children.length > 5) {
        const oldest = list.firstChild;
        if (oldest) {
            oldest.style.opacity = '0';
            setTimeout(() => oldest.remove(), 300);
        }
    }
}

const MISSION_TYPES = {
    DESTROY: 'DESTROY', // Smash police cars
    SURVIVE: 'SURVIVE', // Survive time without crashing (reset on crash?) or just survive duration
    COLLECT: 'COLLECT', // Collect money
    SPEED: 'SPEED'      // Maintain speed (hard to track duration, maybe just "Reach X speed")
};

// ==========================================
// System prompt for The Boss
const BOSS_PROMPT = `Du er "The Boss", en kriminel bagmand der sender SMS til en flugtbilist.
Du er kynisk, magtfuld og taler i gadesprog ("makker", "yo", "hør her").
Du giver en ordre.
SKRIV EN KORT SMS PÅ DANSK (max 20 ord).
Vær direkte. Hvis opgaven er udført, ros kort ("Godt arbejde", "Sådan skal det gøres").
Ingen emojis.`;

// Fallbacks for Boss
const BOSS_FALLBACKS = {
    NEW: [
        "Jeg mangler penge. Kør som en gal og skaf mig 5000 kr!",
        "Politiet irriterer mig. Smadr 3 af deres biler, nu.",
        "Vis mig hvad du kan. Overlev i 60 sekunder uden at blive fanget.",
        "Jeg keder mig. Kør over 150 km/t og giv den gas!"
    ],
    COMPLETE: [
        "Godt arbejde, makker. Her er din andel.",
        "Respekt. Du leverede varen.",
        "Ikke dårligt. Vi ses ved næste job.",
        "Sådan. Pengene er overført."
    ]
};

// System prompt for Newspaper
const NEWSPAPER_PROMPT = `Du er en journalist for formiddagsavisen "Dagens Drama".
Du skal skrive en SENSATIONALISTISK FORSIDE-OVERSKRIFT og en underoverskrift om en biljagt der lige er sluttet.
SKRIV PÅ DANSK.
Format: "OVERSKRIFT: [Kort, stor overskrift, maks 5 ord]\\nUNDEROVERSKRIFT: [Sjov, tabloidoverskrift, maks 15 ord]"
Brug store bogstaver og udråbstegn. Vær overdrevet dramatisk.
Eksempel:
OVERSKRIFT: VANVIDSBILIST AMOK!
UNDEROVERSKRIFT: "Han kørte som om han havde stjålet både bilen og benzinen!" siger chokeret vidne.`;

// Fallback phrases for Newspaper
const NEWSPAPER_FALLBACKS = [
    { headline: "KAOS I GADERNE!", subheadline: "Mystisk bilist skaber ravage i midtbyen - politiet målløse!" },
    { headline: "VEJENS SKRÆK FANGET!", subheadline: "Efter timelang jagt er fartsynderen endelig bag tremmer." },
    { headline: "REKORD I ØDELÆGGELSE!", subheadline: "Forsikringsselskaber græder: Skader for millioner efter vanvidskørsel." },
    { headline: "AMOK-KØRER STOPPET!", subheadline: "Byrådet indkalder til krisemøde efter nattens begivenheder." }
];

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

// System prompt for Judge
const JUDGE_PROMPT = `Du er en streng dommer i en retssal.
Spilleren er lige blevet arresteret i spillet "Flugt fra Politiet".
Du skal afsige en DOM baseret på statistikken.
Vær kreativ, humoristisk og streng.
SKRIV EN KORT DOM PÅ DANSK (max 30 ord).
Inddrag deres "forbrydelser" (fart, ødelæggelse, varighed af flugt).
Idøm en straf (fængsel, samfundstjeneste, bøde, eller en skør straf).
Eksempel: "For at smadre 4 politibiler og køre som en galning, idømmes du at vaske politigårdens biler i 10 år med en tandbørste!"`;

// System prompt for Sarcastic GPS
const GPS_PROMPT = `Du er en sarkastisk og livstræt GPS i en flugtbil.
Du taler direkte til føreren (spilleren).
SKRIV KUN PÅ DANSK (maks 15 ord).
Du er sur, nedladende og ironisk.
Du hader når bilen bliver skadet, og du synes føreren kører elendigt.
Ingen emojis.`;

// Fallback phrases for GPS
const GPS_FALLBACKS = [
    "Drej til højre... ind i fængslet, måske?",
    "Min kofanger græder lige nu.",
    "Beregner ny rute væk fra din kørefærdighed.",
    "Har du overvejet at tage bussen?",
    "Advarsel: Idiot bag rattet.",
    "Du kører som en brækket arm.",
    "Kunne vi undgå at ramme ting? Tak.",
    "Jeg har ikke nok RAM til din dumhed.",
    "Du behøver ikke ramme samtlige træer.",
    "Skal vi køre eller holder vi picnic?"
];

// Fallback phrases for Judge
const JUDGE_FALLBACKS = [
    "Retten finder dig skyldig i grov uansvarlighed! 10 års fængsel!",
    "Du idømmes samfundstjeneste: 500 timer som trafiklys!",
    "Kørekortet er hermed makuleret. Du skal cykle resten af livet!",
    "Dommen er klar: Livstid i fængsel for vanvidskørsel!",
    "Juryen er chokerede. Du skal betale alle skaderne!",
    "Du er til fare for samfundet! Bure ham inde!"
];

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

    // Update Mission Progress for events
    if (commentaryState.activeMission && commentaryState.activeMission.type === MISSION_TYPES.DESTROY) {
        if (type === EVENTS.POLICE_KILLED) {
            commentaryState.activeMission.progress++;
            if (commentaryState.activeMission.progress >= commentaryState.activeMission.target) {
                completeMission();
            }
        }
    }

    // Specific triggers for Sarcastic GPS
    if (type === EVENTS.CRASH) {
        // Chance to trigger GPS on crash
        if (Math.random() < 0.7) { // 70% chance
            triggerGPSComment('CRASH');
        }
    }
    
    // Trim buffer to last 20 events
    if (commentaryState.eventBuffer.length > 20) {
        commentaryState.eventBuffer.shift();
    }
}

// Check for automatic events based on game state changes
export function checkStateEvents() {
    const currentSpeed = Math.round(gameState.speed * 3.6);
    const now = Date.now();
    
    // GPS Idle Check
    if (currentSpeed > 5 || !commentaryState.lastMovementTime) {
        commentaryState.lastMovementTime = now;
    } else if (now - commentaryState.lastMovementTime > 10000) { // 10 seconds idle
        triggerGPSComment('IDLE');
    }

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
        // GPS complaint
        triggerGPSComment('LOW_HEALTH', { health: Math.round(gameState.health) });
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

// Helper to make LLM requests
async function callLLM(systemPrompt, eventSummary) {
    try {
        const response = await fetch('/api/commentary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ systemPrompt, eventSummary })
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.commentary || null;
        }
    } catch (error) {
        console.error('LLM Call Error:', error);
    }
    return null;
}

// Request commentary from server
async function requestCommentary() {
    const summary = buildEventSummary();
    if (!summary) return;
    
    // Clear processed events immediately to avoid double processing
    commentaryState.eventBuffer = [];
    
    const commentary = await callLLM(SYSTEM_PROMPT, summary);
    if (commentary) {
        queueCommentary(commentary);
    } else {
        console.warn('[Commentary] API request failed, using fallback');
        useFallbackCommentary();
    }
}

// Use fallback phrases when API fails
function useFallbackCommentary() {
    console.warn('[Commentary] LLM Connection Failed - Using FALLBACK content');
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

// Display commentary in UI - unified chat pane on right side
function showCommentaryBubble(text) {
    appendChatMessage({
        source: 'Kommentator',
        text,
        variant: 'commentary'
    });
}

function hideCommentaryBubble() {
    // Clear all chat messages
    const list = document.getElementById('chatMessageList');
    if (list) list.innerHTML = '';
}

// Main update function - call this from game loop
export function updateCommentary() {
    checkStateEvents();
    updateMissionProgress();
    
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

    // Check for NEW MISSION trigger
    // Only if: No active mission, no game over, cooldown passed, and random chance
    if (!commentaryState.activeMission && 
        !gameState.arrested && 
        now - commentaryState.lastMissionTime > commentaryState.missionCooldown &&
        Math.random() < 0.01) { // Low chance per frame
        triggerNewMission();
    }
    
    // Update visual positions for dynamic bubbles (Sheriff Radio)
    updateBubblePositions();
}

function updateBubblePositions() {
    // 1. Police Scanner Bubble (Updated to handle Sheriff or just active police)
    const bubble = document.getElementById('policeScannerBubble');
    
    if (bubble && bubble.style.opacity !== '0') {
        // Look for active Sheriff
        const sheriff = gameState.policeCars.find(p => p.userData.type === 'sheriff' && !p.userData.dead);
        
        if (sheriff && camera) {
            // Project 3D position to 2D screen
            const vector = sheriff.position.clone();
            vector.y += 30; // Float above car
            vector.project(camera);

            const x = (vector.x * .5 + .5) * window.innerWidth;
            const y = (-(vector.y * .5) + .5) * window.innerHeight;

            // Check if car is in front of camera
            if (vector.z < 1) {
                bubble.style.position = 'fixed'; 
                bubble.style.left = `${x}px`;
                bubble.style.top = `${y}px`;
                bubble.style.bottom = 'auto'; // Clear default
                bubble.style.transform = 'translate(-50%, -100%)'; // Center above
                
                // Add a "tail" style dynamically if needed
                bubble.style.borderBottomLeftRadius = '0';
            } else {
                // Behind camera? Hide or fallback? fallback to corner
                resetScannerPosition(bubble);
            }
        } else {
            // Fallback to corner if no Sheriff
            resetScannerPosition(bubble);
        }
    }

    // 2. Boss Prompt Bubble (Attached to Player Car)
    const bossBubble = document.getElementById('bossMessageContainer');
    if (bossBubble && bossBubble.style.opacity !== '0' && playerCar && camera) {
        const vector = playerCar.position.clone();
        vector.y += 25; // Float above player car
        vector.project(camera);

        const x = (vector.x * .5 + .5) * window.innerWidth;
        const y = (-(vector.y * .5) + .5) * window.innerHeight;

        if (vector.z < 1) {
             bossBubble.style.left = `${x - 120}px`; // Shifted left
             bossBubble.style.top = `${y}px`;
             // Ensure it stays centered above the point
             bossBubble.style.transform = 'translate(-50%, -100%)';
        } else {
             // Off screen processing (optional)
        }
    }
}

function resetScannerPosition(bubble) {
    bubble.style.position = 'fixed';
    bubble.style.bottom = '20px';
    bubble.style.left = '20px';
    bubble.style.top = 'auto';
    bubble.style.transform = 'none';
    bubble.style.borderBottomLeftRadius = '5px'; // Restore radius
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
    commentaryState.lastGPSMessageTime = 0;
    commentaryState.lastMovementTime = Date.now();
    
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
// NEWSPAPER FUNCTIONS
// ==========================================

export async function generateNewspaper(stats) {
    const summary = `Biljagt afsluttet.
    Varighed: ${Math.floor(stats.time)} sekunder.
    Smadrede politibiler: ${stats.policeKilled}.
    Max Speed: ${stats.maxSpeed} km/t.
    Skade på byen: ${stats.heatLevel >= 4 ? 'TOTAL ØDELÆGGELSE' : 'MODERAT'}.`;

    const text = await callLLM(NEWSPAPER_PROMPT, summary);
    if (text) {
        // Parse the response tailored to format "OVERSKRIFT: ... \nUNDEROVERSKRIFT: ..."
        const lines = text.split('\n');
        let headline = "EKSTRA OPLAG!";
        let subheadline = "Læs alt om det vilde ræs her.";
        
        lines.forEach(line => {
            if (line.includes('OVERSKRIFT:') && !line.includes('UNDER')) {
                headline = line.replace('OVERSKRIFT:', '').trim();
            } else if (line.includes('UNDEROVERSKRIFT:')) {
                subheadline = line.replace('UNDEROVERSKRIFT:', '').trim();
            }
        });
        
        return { headline, subheadline };
    }
    
    return getNewspaperFallback();
}

function getNewspaperFallback() {
    console.warn('[Newspaper] LLM Connection Failed - Using FALLBACK headline');
    return NEWSPAPER_FALLBACKS[Math.floor(Math.random() * NEWSPAPER_FALLBACKS.length)];
}

// ==========================================
// JUDGE / GAME OVER FUNCTIONS
// ==========================================

export async function generateVerdict(stats) {
    const summary = `Tiltalte arresteret. 
    Varighed: ${Math.floor(stats.time)} sekunder. 
    Smadrede politibiler: ${stats.policeKilled}. 
    Heat Level: ${stats.heatLevel}/5. 
    Indsamlede penge: ${stats.money} kr.`;
    
    const verdict = await callLLM(JUDGE_PROMPT, summary);
    if (verdict) {
        return verdict;
    }
    return getJudgeFallback();
}

function getJudgeFallback() {
    console.warn('[Judge] LLM Connection Failed - Using FALLBACK verdict');
    const fallback = JUDGE_FALLBACKS[Math.floor(Math.random() * JUDGE_FALLBACKS.length)];
    return fallback;
}

// ==========================================
// GPS FUNCTIONS
// ==========================================

async function triggerGPSComment(triggerType, contextData = {}) {
    const now = Date.now();
    if (now - commentaryState.lastGPSMessageTime < commentaryState.gpsCooldown) return;
    
    commentaryState.lastGPSMessageTime = now;
    
    let summary = "";
    switch(triggerType) {
        case 'IDLE':
            summary = "Spilleren holder stille og laver ingenting.";
            break;
        case 'LOW_HEALTH':
            summary = `Bilen er ved at gå i stykker! Kun ${contextData.health}% liv tilbage.`;
            break;
        case 'CRASH':
            summary = "Spilleren crashede ind i noget hårdt.";
            break;
        case 'BAD_DRIVING':
            summary = "Spilleren kører forfærdeligt lige nu.";
            break;
        default:
            summary = "Spilleren gør noget irriterende.";
    }

    const comment = await callLLM(GPS_PROMPT, summary);
    if (comment) {
        showGPSBubble(comment);
    } else {
        useGPSFallback();
    }
}

function useGPSFallback() {
    console.warn('[GPS] LLM Connection Failed - Using FALLBACK message');
    const phrase = GPS_FALLBACKS[Math.floor(Math.random() * GPS_FALLBACKS.length)];
    showGPSBubble(phrase);
}

function showGPSBubble(text) {
    appendChatMessage({
        source: 'GPS',
        text,
        variant: 'gps'
    });
}

// ==========================================
// BOSS MISSION FUNCTIONS
// ==========================================

async function triggerNewMission() {
    if (commentaryState.activeMission) return;
    
    // Select random mission type
    const types = Object.values(MISSION_TYPES);
    const type = types[Math.floor(Math.random() * types.length)];
    
    let mission = {
        type: type,
        target: 0,
        progress: 0,
        reward: 0,
        startTime: Date.now(),
        description: "" // For LLM input
    };

    switch(type) {
        case MISSION_TYPES.DESTROY:
            mission.target = 3;
            mission.reward = 5000;
            mission.description = "Smadr 3 politibiler";
            break;
        case MISSION_TYPES.SURVIVE:
            mission.target = 60; // Seconds
            mission.reward = 3000;
            mission.description = "Overlev i 60 sekunder uden at blive fanget";
            break;
        case MISSION_TYPES.COLLECT:
            mission.target = 2000; // Cash
            mission.startValue = gameState.totalMoney || gameState.money; // Track from current
            mission.reward = 4000;
            mission.description = "Saml 2000 kr";
            break;
        case MISSION_TYPES.SPEED:
            mission.target = 180; // km/t
            mission.reward = 2500;
            mission.description = "Opnå 180 km/t";
            break;
    }
    
    commentaryState.activeMission = mission;
    commentaryState.lastMissionTime = Date.now();
    
    // Ask LLM to generate the SMS
    const summary = `Ny mission til spilleren: ${mission.description}. Skriv SMS'en.`;
    
    const text = await callLLM(BOSS_PROMPT, summary);
    if (text) {
        showBossMessage(text);
    } else {
        useBossFallback('NEW');
    }
}

async function completeMission() {
    if (!commentaryState.activeMission) return;
    
    const mission = commentaryState.activeMission;
    gameState.money += mission.reward; // Give reward
    logEvent(EVENTS.MONEY_MILESTONE, mission.reward, { source: "MISSION_REWARD" });
    
    // Success sound/effect could go here
    
    // Clear mission
    commentaryState.activeMission = null;
    commentaryState.lastMissionTime = Date.now();
    
    // Ask LLM for success message
    const summary = `Spilleren klarede missionen: ${mission.description}. Skriv rosende SMS.`;
    
    const text = await callLLM(BOSS_PROMPT, summary);
    if (text) {
        showBossMessage(text, true);
    } else {
        useBossFallback('COMPLETE');
    }
}

function useBossFallback(type) { // type: 'NEW' or 'COMPLETE'
    console.warn('[Boss] LLM Connection Failed - Using FALLBACK mission text');
    const phrases = BOSS_FALLBACKS[type];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    showBossMessage(phrase, type === 'COMPLETE');
}

function showBossMessage(text, isSuccess = false) {
    appendChatMessage({
        source: 'The Boss',
        text,
        variant: 'boss'
    });
}

// Update Mission Progress
function updateMissionProgress() {
    if (!commentaryState.activeMission) return;
    
    const mission = commentaryState.activeMission;
    
    switch(mission.type) {
        case MISSION_TYPES.SURVIVE:
            // Check if timer done
            if (Date.now() - mission.startTime > mission.target * 1000) {
                completeMission();
            }
            break;
            
        case MISSION_TYPES.SPEED: {
            const currentSpeed = Math.round(gameState.speed * 3.6);
            if (currentSpeed >= mission.target) {
                completeMission();
            }
            break;
        }
            
        case MISSION_TYPES.COLLECT: {
            const currentMoney = gameState.totalMoney || gameState.money;
            const collected = currentMoney - (mission.startValue || 0);
            if (collected >= mission.target) {
                completeMission();
            }
            break;
        }
        // DESTROY is handled in logEvent
    }
}


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
    
    const message = await callLLM(POLICE_SCANNER_PROMPT, summary);
    if (message) {
        showPoliceScannerBubble(message);
    } else {
        usePoliceFallback();
    }
}

function usePoliceFallback() {
    console.warn('[Police] LLM Connection Failed - Using FALLBACK scanner message');
    const phrase = POLICE_FALLBACKS[Math.floor(Math.random() * POLICE_FALLBACKS.length)];
    showPoliceScannerBubble(phrase);
}

function showPoliceScannerBubble(text) {
    const sheriff = gameState.policeCars.find(p => p.userData.type === 'sheriff' && !p.userData.dead);
    const source = sheriff ? 'Sheriff' : 'Politi';
    const variant = sheriff ? 'sheriff' : 'police';
    appendChatMessage({
        source,
        text,
        variant
    });
}

/**
 * Display Sheriff Command - shows LLM-generated tactical commands
 * @param {string} commandText - The command text from the LLM
 */
export function displaySheriffCommand(commandText) {
    if (!commandText) return;
    
    // Display command as a police scanner message with special styling
    showPoliceScannerBubble(commandText);
    
    console.log('[Sheriff Command]:', commandText);
}
