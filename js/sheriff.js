import { normalizeAngleRadians } from './utils.js';
import { gameState } from './state.js';
import { displaySheriffCommand } from './commentary.js';

// Command types that Sheriff can issue
export const SHERIFF_COMMANDS = {
    CHASE: 'CHASE',         // Aggressive pursuit
    BLOCK: 'BLOCK',         // Block escape routes
    SURROUND: 'SURROUND',   // Encircle target
    SPREAD: 'SPREAD',       // Spread out formation
    RETREAT: 'RETREAT',     // Fall back and regroup
    INTERCEPT: 'INTERCEPT'  // Cut off target's path
};

// Sheriff state management
export const sheriffState = {
    currentCommand: null,
    lastCommandTime: 0,
    commandCooldown: 10000, // 10 seconds between LLM commands
    lastLLMRequestTime: 0,
    llmRequestCooldown: 8000, // 8 seconds between LLM requests
    awaitingLLMResponse: false,
    commandHistory: [],
    maxHistorySize: 5
};

export const SheriffAI = {
    // Configuration specific to Sheriff
    config: {
        lookAheadDistance: 80,
        evasiveTurnMultiplier: 3.0,
        optimalDistance: 400,
        buffer: 50
    },

    /**
     * Updates the specific behavior variables for the Sheriff
     * @param {Object} policeCar - The police car object
     * @param {number} distance - Distance to player
     * @param {number} playerSpeedKmH - Player speed in km/h
     * @param {boolean} hasObstacle - Whether an obstacle is detected ahead
     * @param {number} delta - Time delta
     * @returns {Object} - Contains { speedMultiplier, specialRotation } if applicable
     */
    updateBehavior: (policeCar, distance, playerSpeedKmH, hasObstacle, delta) => {
        let speedMultiplier = 1.0;
        let targetDirectionOffset = 0;

        // "The Observer" Logic
        // 1. Maintain Distance Logic
        if (distance < SheriffAI.config.optimalDistance - SheriffAI.config.buffer) {
            // Too close: Slow down massively to let player pull away
            speedMultiplier = 0.5;
            
            // If VERY close, steer away
            if (distance < 200 && !hasObstacle) { 
                // Don't conflict with obstacle avoidance which is handled in main loop, 
                // but here we provide an offset to turn away
                targetDirectionOffset = Math.PI; 
            }
        } else if (distance > SheriffAI.config.optimalDistance + SheriffAI.config.buffer) {
            // Too far: Speed up slightly
            speedMultiplier = 1.1; 
        } else {
            // In sweet spot: Match player speed approx
            // We return a specialized speed override logic in main if needed, 
            // but here we can just hint the multiplier or return a specific speed request
            // For now, we'll handle the base logic here but the exact speed setting needs the player speed
        }

        return {
            speedMultiplier,
            targetDirectionOffset
        };
    },

    /**
     * Calculates the target speed for the Sheriff
     * @param {number} currentDistance 
     * @param {number} playerSpeed 
     * @returns {number} The calculated target speed
     */
    calculateTargetSpeed: (distance, playerSpeed) => {
        if (distance > SheriffAI.config.optimalDistance + SheriffAI.config.buffer) {
             return null; // Let default logic handle "catch up" with multiplier
        }
        
        if (distance >= SheriffAI.config.optimalDistance - SheriffAI.config.buffer && 
            distance <= SheriffAI.config.optimalDistance + SheriffAI.config.buffer) {
            // Match player speed
            let targetSpeed = Math.abs(playerSpeed * 3.6); 
            if (targetSpeed > 200) targetSpeed = 200; // Cap sheriff speed
            return targetSpeed;
        }
        
        return null; // Let default logic handle
    }
};

/**
 * Request a tactical command from the LLM based on current game state
 * @returns {Promise<Object|null>} Command object or null if unavailable
 */
export async function requestSheriffCommand(playerCar, policeCount) {
    const now = Date.now();
    
    // Check cooldowns
    if (now - sheriffState.lastLLMRequestTime < sheriffState.llmRequestCooldown) {
        return null;
    }
    
    if (sheriffState.awaitingLLMResponse) {
        return null;
    }
    
    sheriffState.awaitingLLMResponse = true;
    sheriffState.lastLLMRequestTime = now;
    
    try {
        // Build game state for LLM
        const playerSpeed = Math.abs(gameState.speed || 0) * 3.6;
        const playerHealth = gameState.health || 100;
        const survivalTime = Math.floor((now - (gameState.startTime || now)) / 1000);
        
        // Find closest police distance
        let closestDistance = 10000;
        if (gameState.policeCars && gameState.policeCars.length > 0) {
            gameState.policeCars.forEach(car => {
                if (!car.userData.dead && playerCar) {
                    const dx = playerCar.position.x - car.position.x;
                    const dz = playerCar.position.z - car.position.z;
                    const dist = Math.sqrt(dx*dx + dz*dz);
                    if (dist < closestDistance) closestDistance = dist;
                }
            });
        }
        
        const requestData = {
            playerSpeed: Math.round(playerSpeed),
            policeCount: policeCount,
            policeDestroyed: gameState.policeKilled || 0,
            heatLevel: gameState.heatLevel || 1,
            distanceToPlayer: Math.round(closestDistance),
            playerHealth: Math.round(playerHealth),
            survivalTime: survivalTime,
            recentEvents: sheriffState.commandHistory.slice(-2).join(', ')
        };
        
        const response = await fetch('/api/sheriff-command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            console.warn('[Sheriff] LLM request failed:', response.status);
            sheriffState.awaitingLLMResponse = false;
            return null;
        }
        
        const data = await response.json();
        sheriffState.awaitingLLMResponse = false;
        
        if (data.command) {
            // Parse command type from response
            const commandText = data.command.toUpperCase();
            let commandType = SHERIFF_COMMANDS.CHASE; // default
            
            if (commandText.includes('BLOCK')) commandType = SHERIFF_COMMANDS.BLOCK;
            else if (commandText.includes('SURROUND')) commandType = SHERIFF_COMMANDS.SURROUND;
            else if (commandText.includes('SPREAD')) commandType = SHERIFF_COMMANDS.SPREAD;
            else if (commandText.includes('RETREAT')) commandType = SHERIFF_COMMANDS.RETREAT;
            else if (commandText.includes('INTERCEPT')) commandType = SHERIFF_COMMANDS.INTERCEPT;
            
            const command = {
                type: commandType,
                text: data.command,
                timestamp: now
            };
            
            sheriffState.currentCommand = command;
            sheriffState.lastCommandTime = now;
            
            // Add to history
            sheriffState.commandHistory.push(commandType);
            if (sheriffState.commandHistory.length > sheriffState.maxHistorySize) {
                sheriffState.commandHistory.shift();
            }
            
            console.log('[Sheriff] New command:', command.text);
            
            // Display command in UI
            displaySheriffCommand(command.text);
            
            return command;
        }
        
    } catch (error) {
        console.error('[Sheriff] Error requesting command:', error);
        sheriffState.awaitingLLMResponse = false;
    }
    
    return null;
}

/**
 * Get the current active sheriff command
 * @returns {Object|null} Current command or null
 */
export function getCurrentSheriffCommand() {
    const now = Date.now();
    
    // Commands expire after 15 seconds
    if (sheriffState.currentCommand && now - sheriffState.currentCommand.timestamp > 15000) {
        sheriffState.currentCommand = null;
    }
    
    return sheriffState.currentCommand;
}

/**
 * Apply sheriff command to police car behavior
 * @param {string} commandType - The command type
 * @param {Object} policeCar - The police car object
 * @param {Object} playerCar - The player car object
 * @returns {Object} Behavior modifiers { speedMultiplier, targetOffset, behavior }
 */
export function applySheriffCommand(commandType, policeCar, playerCar) {
    if (!commandType || !policeCar || !playerCar) return {};
    
    const dx = playerCar.position.x - policeCar.position.x;
    const dz = playerCar.position.z - policeCar.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    
    switch (commandType) {
        case SHERIFF_COMMANDS.CHASE:
            // Aggressive pursuit - increase speed
            return { speedMultiplier: 1.3, behavior: 'aggressive' };
            
        case SHERIFF_COMMANDS.BLOCK:
            // Try to get ahead of player
            if (distance > 200) {
                return { speedMultiplier: 1.4, targetOffset: Math.PI / 4, behavior: 'blocking' };
            }
            return { speedMultiplier: 0.8, behavior: 'blocking' };
            
        case SHERIFF_COMMANDS.SURROUND:
            // Position around player at different angles
            const angle = policeCar.userData.networkId ? 
                (policeCar.userData.networkId * Math.PI / 4) : 0;
            return { speedMultiplier: 1.0, targetOffset: angle, behavior: 'surrounding' };
            
        case SHERIFF_COMMANDS.SPREAD:
            // Spread out, maintain distance from other police
            return { speedMultiplier: 0.9, spreadOut: true, behavior: 'spreading' };
            
        case SHERIFF_COMMANDS.RETREAT:
            // Fall back
            if (distance < 300) {
                return { speedMultiplier: 0.5, targetOffset: Math.PI, behavior: 'retreating' };
            }
            return { speedMultiplier: 0.7, behavior: 'retreating' };
            
        case SHERIFF_COMMANDS.INTERCEPT:
            // Try to predict player path and intercept
            const playerVelocity = playerCar.userData.velocity || { x: 0, z: 0 };
            const predictedX = playerCar.position.x + playerVelocity.x * 2;
            const predictedZ = playerCar.position.z + playerVelocity.z * 2;
            const toPredicted = Math.atan2(
                predictedX - policeCar.position.x,
                predictedZ - policeCar.position.z
            );
            return { 
                speedMultiplier: 1.2, 
                overrideDirection: toPredicted,
                behavior: 'intercepting' 
            };
            
        default:
            return {};
    }
}
