// Helper function to darken a hex color
export function darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// Helper to normalize angle to -PI to PI
export function normalizeAngleRadians(angle) {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
}

// Helper clamp
export function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

// Linear interpolation
export function lerp(current, target, factor) {
    return current + (target - current) * factor;
}

// Smooth rotation interpolation (handles wraparound)
export function lerpAngle(current, target, factor) {
    let diff = target - current;
    if (diff > Math.PI) diff -= Math.PI * 2;
    if (diff < -Math.PI) diff += Math.PI * 2;
    return current + diff * factor;
}
