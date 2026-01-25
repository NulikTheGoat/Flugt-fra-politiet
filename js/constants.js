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
        mass: 0.1
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
        mass: 0.2
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
        mass: 0.25
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
        mass: 0.4
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
        mass: 1.0
    },
    sport: {
        name: 'Sportsvogn',
        price: 35000,
        maxSpeed: 30,       // ~110 km/h display
        acceleration: 0.12,
        handling: 0.07,
        health: 90,
        color: 0xffff00,
        mass: 1.1
    },
    muscle: {
        name: 'Muscle Car',
        price: 55000,
        maxSpeed: 28,       // ~100 km/h display
        acceleration: 0.14,
        handling: 0.04,
        health: 130,
        color: 0x0000ff,
        mass: 1.4
    },
    super: {
        name: 'Superbil',
        price: 95000,
        maxSpeed: 42,       // ~150 km/h display
        acceleration: 0.18,
        handling: 0.09,
        health: 100,        // Buffed from 70
        color: 0xff00ff,
        mass: 1.2
    },
    hyper: {
        name: 'Hyperbil',
        price: 400000,
        maxSpeed: 55,       // ~200 km/h display
        acceleration: 0.25,
        handling: 0.12,
        health: 120,        // Nerfed from 150
        color: 0x00ffff,
        mass: 1.3
    },
    tank: {
        name: 'Kampvogn',
        price: 700000,
        maxSpeed: 17,       // ~60 km/h display
        acceleration: 0.05,
        handling: 0.08,
        health: 300,        // Nerfed from 500 - stadig tanky!
        color: 0x2f4f4f,
        type: 'tank',
        canRam: true,       // Can destroy police cars on impact
        reqRebirth: 0,
        mass: 5.0
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
        mass: 0.8
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
