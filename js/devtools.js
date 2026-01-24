/**
 * DEVTOOLS / AI ENTRYPOINT
 *
 * Goal: provide a single, stable place to inspect and drive the game from tests,
 * debugging, or AI agents.
 *
 * This avoids scattering `window.*` exports across modules.
 */

import { gameState } from './state.js';
import { cars } from './constants.js';

/**
 * Expose stable hooks on `window.__game`.
 * Keep this object small and predictable.
 *
 * @param {Record<string, any>} extra
 */
export function exposeDevtools(extra = {}) {
    window.__game = {
        gameState,
        cars,
        ...extra
    };
}
