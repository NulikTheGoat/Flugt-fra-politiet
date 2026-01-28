// Physics constants
export const GRAVITY = -9.82; // Earth gravity (m/s²)

export const enemies = {
    standard: { color: 0x0000ff, speed: 250, scale: 1, name: 'Politibil', health: 50, killReward: 150, pickupReward: 300, mass: 1.0 },
    interceptor: { color: 0x111111, speed: 300, scale: 1, name: 'Interceptor', health: 40, killReward: 200, pickupReward: 400, mass: 1.1 },
    swat: { color: 0x333333, speed: 220, scale: 1.5, name: 'SWAT', health: 150, killReward: 350, pickupReward: 700, mass: 2.5 },
    military: { color: 0x556b2f, speed: 350, scale: 1.2, name: 'Militær', health: 180, killReward: 500, pickupReward: 1000, mass: 1.8 },
    sheriff: { color: 0x8b6914, speed: 180, scale: 1.3, name: 'Sheriff', health: 800, killReward: 1000, pickupReward: 2000, mass: 3.0 }
};

/**
 * @typedef {Object} CarDefinition
 * @property {string} name
 * @property {number} price
 * @property {number} maxSpeed  // world units per second (HUD shows km/h as maxSpeed*3.6)
 * @property {number} acceleration
 * @property {number} handling
 * @property {number} health
 * @property {number} color
 * @property {string=} type
 * @property {number=} scale
 * @property {number=} reqRebirth
 * @property {number=} mass
 */

/** @type {Record<string, CarDefinition>} */
export const cars = {
    // === STARTER ===
    onfoot: {
        name: 'Til Fods',
        price: 100,         // Billig start, men ikke gratis!
        maxSpeed: 2.5,      // ~9 km/h display (jogging speed)
        acceleration: 0.02,
        handling: 0.15,     // Very agile on foot
        health: 20,
        color: 0xFFAA00,    // Orange (person)
        type: 'onfoot',
        scale: 0.4,
        mass: 0.1,
        grip: 1.0           // Perfect grip on foot
    },
    bicycle: {
        name: 'Cykel',
        price: 800,         // Første rigtige opgradering
        maxSpeed: 7,        // ~25 km/h display
        acceleration: 0.035,
        handling: 0.08,
        health: 30,
        color: 0x32CD32,    // Lime green
        type: 'bicycle',
        scale: 0.6,
        mass: 0.2,
        grip: 0.9           // Good grip on bicycle
    },
    scooter_electric: {
        name: 'El-løbehjul',
        price: 1800,        // Mellemklasse opgradering
        maxSpeed: 10,       // ~36 km/h display
        acceleration: 0.05,
        handling: 0.10,
        health: 25,
        color: 0x00CED1,    // Dark turquoise
        type: 'scooter_electric',
        scale: 0.5,
        mass: 0.25,
        grip: 0.75          // Small whe
    },
    scooter: {
        name: 'Knallert',
        price: 5000,        // Solid mellemklasse
        maxSpeed: 13,       // ~47 km/h display
        acceleration: 0.065,
        handling: 0.06,
        health: 50,
        color: 0xFFD700,    // Gold
        type: 'scooter',
        scale: 0.7,
        mass: 0.4,
        grip: 0.7           // Moderate grip
    },
    
    // === BILER ===
    standard: {
        name: 'Standard Bil',
        price: 9999,        // Første rigtige bil!
        maxSpeed: 22,       // ~80 km/h display
        acceleration: 0.08,
        handling: 0.05,
        health: 100,
        color: 0xff0000,
        mass: 1.0,
        grip: 0.7           // Basic tire grip
    },
    sport: {
        name: 'Sportsvogn',
        price: 35000,
        maxSpeed: 30,       // ~110 km/h display
        acceleration: 0.12,
        handling: 0.07,
        health: 90,
        color: 0xffff00,
        mass: 1.1,
        grip: 0.85          // Sport tires = better grip
    },
    muscle: {
        name: 'Muscle Car',
        price: 55000,
        maxSpeed: 28,       // ~100 km/h display
        acceleration: 0.14,
        handling: 0.04,
        health: 130,
        color: 0x0000ff,
        mass: 1.4,
        grip: 0.55          // Muscle cars slide more (classic feel)
    },
    buggy: {
        name: 'Strandbuggy',
        price: 25000,
        maxSpeed: 26,       // ~94 km/h display
        acceleration: 0.11,
        handling: 0.09,     // Good handling, off-road capable
        health: 95,
        color: 0xFF6B35,    // Orange/sandy color
        type: 'buggy',
        mass: 0.9,
        grip: 0.75          // Good off-road grip
    },
    pickup: {
        name: 'Pickup Truck',
        price: 45000,
        maxSpeed: 24,       // ~86 km/h display
        acceleration: 0.10,
        handling: 0.045,
        health: 140,
        color: 0x8B4513,    // Saddle brown
        type: 'pickup',
        mass: 1.5,
        grip: 0.65          // Heavy but stable
    },
    super: {
        name: 'Superbil',
        price: 95000,
        maxSpeed: 42,       // ~150 km/h display
        acceleration: 0.18,
        handling: 0.09,
        health: 100,        // Buffed from 70
        color: 0xff00ff,
        mass: 1.2,
        grip: 0.9           // Performance tires
    },
    rally: {
        name: 'Rallybil',
        price: 65000,
        maxSpeed: 36,       // ~130 km/h display
        acceleration: 0.16,
        handling: 0.11,     // Excellent handling
        health: 105,
        color: 0x00FF7F,    // Spring green
        type: 'rally',
        mass: 1.15,
        grip: 0.88          // Rally tires - great grip
    },
    hyper: {
        name: 'Hyperbil',
        price: 400000,
        maxSpeed: 55,       // ~200 km/h display
        acceleration: 0.25,
        handling: 0.12,
        health: 120,        // Nerfed from 150
        color: 0x00ffff,
        mass: 1.3,
        grip: 0.95          // Racing slicks
    },
    hotrod: {
        name: 'Hot Rod',
        price: 120000,
        maxSpeed: 38,       // ~137 km/h display
        acceleration: 0.20,
        handling: 0.06,     // Less handling, more power
        health: 110,
        color: 0xFF1493,    // Deep pink (classic hot rod)
        type: 'hotrod',
        mass: 1.25,
        grip: 0.70          // Classic street tires
    },
    monstertruck: {
        name: 'Monster Truck',
        price: 250000,
        maxSpeed: 20,       // ~72 km/h display
        acceleration: 0.08,
        handling: 0.07,
        health: 200,        // Still tanky but less immortal
        color: 0x32CD32,    // Lime green (monster truck style)
        mass: 2.4,          // Heavy, but not unstoppable
        type: 'monstertruck',
        canRam: true,       // Requires speed threshold (see police AI)
        grip: 0.80,         // Big tires = good grip
        scale: 1.4          // Bigger visual size
    },
    formula: {
        name: 'Racerbil F1',
        price: 500000,
        maxSpeed: 60,       // ~216 km/h display
        acceleration: 0.28,
        handling: 0.14,     // Best handling
        health: 85,         // Fragile
        color: 0xFF0000,    // Racing red
        type: 'formula',
        mass: 0.85,
        grip: 0.98,         // Racing slicks, maximum grip
        scale: 0.9          // Smaller, low profile
    },
    tank: {
        name: 'Kampvogn',
        price: 700000,
        maxSpeed: 17,       // ~60 km/h display
        acceleration: 0.05,
        handling: 0.08,
        health: 260,        // Further nerfed for balance
        color: 0x2f4f4f,
        type: 'tank',
        canRam: true,       // Can destroy police cars on impact
        reqRebirth: 0,
        mass: 4.0,
        grip: 0.6           // Tank treads = moderate grip
    },
    ufo: {
        name: 'UFO Prototype',
        price: 1200000,
        maxSpeed: 83,       // ~300 km/h display
        acceleration: 0.5,
        handling: 0.2,
        health: 100,        // Nerfed from 150 - glass cannon
        color: 0x999999,
        type: 'ufo',
        reqRebirth: 1,
        mass: 0.8,
        grip: 1.0           // Anti-gravity = perfect grip
    }
};

// Bygnings typer med deres karakteristika
export const BUILDING_TYPES = {
    GENERIC: { name: 'generic', colors: [0xE55039, 0xE58E26, 0x4A69BD, 0x60A3BC, 0x78E08F] }, // Colorful bricks
    SHOP: { name: 'shop', colors: [0xF6B93B, 0xFA983A, 0xE58E26], hasAwning: true, signColor: 0xFEEAFA }, // Bright Orange/Gold
    BANK: { name: 'bank', colors: [0x82CCDD, 0x60A3BC, 0x3C6382], hasColumns: true, signColor: 0xF8EFBA }, // Clean Blue-Greys
    PIZZERIA: { name: 'pizzeria', colors: [0xEB2F06, 0xB71540, 0xE55039], hasAwning: true, signColor: 0xF8C291 }, // Vibrant Red
    CHURCH: { name: 'church', colors: [0xF1F2F6, 0xDFE4EA], hasTower: true, hasRoof: true }, // White/Light Grey (Traditional)
    POLICE_STATION: { name: 'police', colors: [0x0C2461, 0x1E3799, 0x4A69BD], hasFlagpole: true, signColor: 0xFFFFFF }, // Policing Blue
    PARLIAMENT: { name: 'parliament', colors: [0xD7CCC8, 0xBCAAA4], hasDome: true, hasColumns: true, hasCow: true }, // Stone color
    RESIDENTIAL: { name: 'residential', colors: [0xF8C291, 0xE77F67, 0xFDA7DF, 0xD980FA, 0xB53471] }, // Pastel warmth and pinks
    OFFICE: { name: 'office', colors: [0x7EFFF5, 0x7158E2, 0x17C0EB], isGlass: true }, // Cyan/Neon Blue
    WAREHOUSE: { name: 'warehouse', colors: [0x95A5A6, 0x7F8C8D, 0xA4B0BE], hasRollerDoor: true }, // Grey (Standard concrete)
};

// Gameplay tuning constants - centralized for easy balancing
export const GAME_CONFIG = {
    // Collision damage values
    POLICE_BUILDING_COLLISION_DAMAGE: 25,      // Police take meaningful damage but survive light taps
    PLAYER_BUILDING_COLLISION_DAMAGE_BASE: 8,  // Base damage player takes hitting buildings
    PLAYER_BUILDING_COLLISION_DAMAGE_SPEED_MULT: 0.06, // Additional damage per speed unit (so 100 km/h ≈ +6)
    
    // Physics multipliers
    BUILDING_DEBRIS_VELOCITY_MULT: 0.18,       // Slightly calmer debris throw
    BUILDING_DEBRIS_HEIGHT_BASE: 4,            // Lower base upward velocity
    BUILDING_DEBRIS_HEIGHT_RANDOM: 3,          // Less random vertical impulse
    
    // Speed retention on impact (1.0 = no loss, 0.0 = full stop)
    PLAYER_BUILDING_SPEED_RETENTION: 0.7,      // Player loses more speed on impact for realism
    POLICE_BUILDING_SPEED_RETENTION: 0.6       // Police lose more speed when they slam into buildings
};
