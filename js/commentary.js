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
    GAME_START: 'GAME_START'
};

// Commentary state
const commentaryState = {
    eventBuffer: [],
    lastRequestTime: 0,
    requestCooldown: 6000, // 6 seconds between API calls
    commentaryQueue: [],
    isDisplaying: false,
    displayDuration: 5000,
    enabled: true,
    lastSpeedMilestone: 0,
    lastHeatLevel: 1,
    lastHealthWarning: false,
    lastDriftCombo: 0
};

// System prompt for the commentator
const SYSTEM_PROMPT = `You are an excited sports commentator for an illegal street racing game called "Flugt fra Politiet" (Escape from Police).
You're dramatic, cheerful, and love to hype up the player's actions.
Keep responses SHORT - maximum 1-2 sentences, under 25 words total.
Use racing/action movie references and puns.
Always be positive and encouraging, even when things go wrong.
Speak in present tense as if watching live.
Mix in occasional Danish phrases like "Fantastisk!", "Helt vildt!", "Nej hvor fedt!" for local flavor.
Never use hashtags or emojis in your commentary.`;

// Fallback phrases if API fails
const FALLBACK_PHRASES = {
    [EVENTS.DRIFT_START]: [
        "Sliding into action like a pro!",
        "That drift is pure poetry in motion!",
        "Sideways is the only way!"
    ],
    [EVENTS.DRIFT_COMBO]: [
        "Combo city! Keep it going!",
        "The drift multiplier is OFF THE CHARTS!",
        "Drift king in the making!"
    ],
    [EVENTS.SPEED_MILESTONE]: [
        "PEDAL TO THE METAL!",
        "This speedster knows no limits!",
        "Faster than a speeding ticket!"
    ],
    [EVENTS.POLICE_KILLED]: [
        "Another one bites the dust!",
        "That cop car just got RETIRED!",
        "Police down! Helt vildt!"
    ],
    [EVENTS.POLICE_LOOT]: [
        "Ka-ching! That's some sweet justice money!",
        "Finders keepers, officer!",
        "Collecting that cop cash!"
    ],
    [EVENTS.CRASH]: [
        "A little bump never hurt anyone... much!",
        "Paint is overrated anyway!",
        "That'll buff out... probably!"
    ],
    [EVENTS.HEAT_INCREASE]: [
        "Things are heating up! More cops incoming!",
        "They're bringing backup! GOOD!",
        "The heat is ON!"
    ],
    [EVENTS.LOW_HEALTH]: [
        "Getting a bit crispy there! Watch out!",
        "Damage control needed ASAP!",
        "Still in the game, still fighting!"
    ],
    [EVENTS.BUILDING_DESTROYED]: [
        "PROPERTY DAMAGE! Insurance companies hate this!",
        "That building had it coming!",
        "Who needs structural integrity anyway?!"
    ],
    [EVENTS.GAME_START]: [
        "Ladies and gentlemen, START YOUR ENGINES!",
        "The chase is ON! Let's make some chaos!",
        "Time to show these cops what we're made of!"
    ],
    [EVENTS.ARRESTED]: [
        "Caught! But what a wild ride!",
        "They got you this time... but you'll be back!",
        "Game over, but legends never die!"
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
    // Speed milestones (50, 100, 150, 200 km/h)
    const currentSpeed = Math.round(gameState.speed * 3.6);
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
    
    // Heat level increase
    if (gameState.heatLevel > commentaryState.lastHeatLevel) {
        logEvent(EVENTS.HEAT_INCREASE, gameState.heatLevel);
        commentaryState.lastHeatLevel = gameState.heatLevel;
    }
    
    // Low health warning
    if (gameState.health < 30 && !commentaryState.lastHealthWarning) {
        logEvent(EVENTS.LOW_HEALTH, gameState.health);
        commentaryState.lastHealthWarning = true;
    } else if (gameState.health >= 50) {
        commentaryState.lastHealthWarning = false;
    }
}

// Build event summary for LLM
function buildEventSummary() {
    if (commentaryState.eventBuffer.length === 0) return null;
    
    const recentEvents = commentaryState.eventBuffer.slice(-5);
    const summary = recentEvents.map(e => {
        switch(e.type) {
            case EVENTS.DRIFT_COMBO:
                return `Player hit a ${e.value}x drift combo!`;
            case EVENTS.SPEED_MILESTONE:
                return `Player reached ${e.value} km/h!`;
            case EVENTS.POLICE_KILLED:
                return `Player destroyed a police car!`;
            case EVENTS.POLICE_LOOT:
                return `Player collected $${e.value} from a wrecked cop car!`;
            case EVENTS.CRASH:
                return `Player crashed into ${e.value || 'something'}!`;
            case EVENTS.HEAT_INCREASE:
                return `Heat level increased to ${e.value} stars!`;
            case EVENTS.LOW_HEALTH:
                return `Player's car is at ${e.value}% health!`;
            case EVENTS.BUILDING_DESTROYED:
                return `Player smashed through a building!`;
            case EVENTS.GAME_START:
                return `The chase has just begun!`;
            default:
                return `${e.type} event occurred`;
        }
    }).join(' ');
    
    const latestContext = recentEvents[recentEvents.length - 1].context;
    const contextInfo = `Current status: ${latestContext.speed} km/h, ${latestContext.policeCount} cops chasing, heat level ${latestContext.heatLevel}/5, ${latestContext.health}% health, $${latestContext.money} collected.`;
    
    return `${summary}\n${contextInfo}\n\nGive a short, exciting commentary on what just happened!`;
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
    
    if (!commentaryState.isDisplaying) {
        displayNextCommentary();
    }
}

// Display commentary in UI
function displayNextCommentary() {
    if (commentaryState.commentaryQueue.length === 0) {
        commentaryState.isDisplaying = false;
        hideCommentaryBubble();
        return;
    }
    
    commentaryState.isDisplaying = true;
    const text = commentaryState.commentaryQueue.shift();
    showCommentaryBubble(text);
    
    // Auto-dismiss and show next
    setTimeout(() => {
        displayNextCommentary();
    }, commentaryState.displayDuration);
}

// UI Functions
function showCommentaryBubble(text) {
    let bubble = document.getElementById('commentaryBubble');
    if (!bubble) {
        // Create bubble if it doesn't exist
        bubble = document.createElement('div');
        bubble.id = 'commentaryBubble';
        bubble.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            color: #fff;
            padding: 15px 25px;
            border-radius: 20px;
            font-size: 18px;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
            text-align: center;
            max-width: 600px;
            z-index: 10000;
            border: 2px solid #ffcc00;
            box-shadow: 0 4px 20px rgba(255, 204, 0, 0.3);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(bubble);
    }
    
    bubble.textContent = '';
    bubble.style.opacity = '1';
    
    // Typewriter effect
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            bubble.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 30);
}

function hideCommentaryBubble() {
    const bubble = document.getElementById('commentaryBubble');
    if (bubble) {
        bubble.style.opacity = '0';
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
    
    // Log game start event
    logEvent(EVENTS.GAME_START);
}

// Export for testing
export const _internal = {
    commentaryState,
    FALLBACK_PHRASES
};
