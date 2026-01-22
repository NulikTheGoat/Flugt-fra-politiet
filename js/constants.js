export const enemies = {
    standard: { color: 0x0000ff, speed: 250, scale: 1, name: 'Politibil', health: 50 },
    interceptor: { color: 0x111111, speed: 300, scale: 1, name: 'Interceptor', health: 40 },
    swat: { color: 0x333333, speed: 220, scale: 1.5, name: 'SWAT', health: 150 },
    military: { color: 0x556b2f, speed: 350, scale: 1.2, name: 'Militær', health: 300 }
};

export const cars = {
    standard: {
        name: 'Standard Bil',
        price: 0,
        maxSpeed: 80,
        acceleration: 0.3,
        handling: 0.05,
        health: 100, // Baseline
        color: 0xff0000
    },
    sport: {
        name: 'Sportsvogn',
        price: 2500,
        maxSpeed: 110,
        acceleration: 0.45,
        handling: 0.07,
        health: 80, // Less health (lighter)
        color: 0xffff00
    },
    muscle: {
        name: 'Muscle Car',
        price: 8000,
        maxSpeed: 100,
        acceleration: 0.5,
        handling: 0.04,
        health: 120, // Sturdy
        color: 0x0000ff
    },
    super: {
        name: 'Superbil',
        price: 25000,
        maxSpeed: 150,
        acceleration: 0.7,
        handling: 0.09,
        health: 70, // Fragile
        color: 0xff00ff
    },
    hyper: {
        name: 'Hyperbil',
        price: 75000,
        maxSpeed: 200,
        acceleration: 1.0,
        handling: 0.12,
        health: 150, // Carbon fiber reinforced
        color: 0x00ffff
    },
    tank: {
        name: 'Kampvogn',
        price: 200000,
        maxSpeed: 60,
        acceleration: 0.2, // Slow
        handling: 0.08, // Turns okay (tracks)
        health: 500, // Massive Tank
        color: 0x2f4f4f,
        type: 'tank',
        reqRebirth: 0
    },
    ufo: {
        name: 'UFO Prototype',
        price: 500000,
        maxSpeed: 300,
        acceleration: 2.0,
        handling: 0.2,
        health: 150, // Shielded (but not tank level)
        color: 0x999999,
        type: 'ufo',
        reqRebirth: 1 // Needs 1 rebirth
    }
};
