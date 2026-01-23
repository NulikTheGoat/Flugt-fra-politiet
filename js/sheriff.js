import { normalizeAngleRadians } from './utils.js';

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
