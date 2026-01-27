/**
 * World Director collision logic tests
 * Run with: node tests/test_world_director_collision.mjs
 */

import logic from '../js/worldDirectorCollisionLogic.cjs';

const { resolveCollision, BONUS1_REWARD } = logic;

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        testsPassed++;
        console.log(`  ✅ ${message}`);
    } else {
        testsFailed++;
        console.log(`  ❌ ${message}`);
    }
}

function describe(name, fn) {
    console.log(`\n📋 ${name}`);
    fn();
}

describe('World Director - Ambulance Bonus', () => {
    const result = resolveCollision({
        type: 'ambulance',
        config: { damage: 20 },
        speed: 50,
        shieldActive: false
    });

    assert(result.despawn === true, 'Ambulance despawns on collision');
    assert(result.moneyDelta === BONUS1_REWARD, `Awards BONUS1 (${BONUS1_REWARD})`);
    assert(result.sfx === 'pickup', 'Ambulance plays pickup SFX');
    assert(result.bonusLabel === 'BONUS1', 'Ambulance bonus label is BONUS1');
    assert(result.damage === 0, 'Ambulance collision does not apply damage directly');
});

describe('World Director - Breakable Obstacles', () => {
    const config = { damage: 12, breakable: true };

    const fastHit = resolveCollision({
        type: 'roadblock',
        config,
        speed: 30,
        shieldActive: false
    });

    assert(fastHit.damage === 12, 'Damage applied on obstacle hit');
    assert(fastHit.breakable === true, 'Breakable object shatters at high speed');

    const slowHit = resolveCollision({
        type: 'roadblock',
        config,
        speed: 10,
        shieldActive: false
    });

    assert(slowHit.damage === 12, 'Damage applied even at low speed');
    assert(slowHit.breakable === false, 'No shatter at low speed');
});

describe('World Director - Shield Protection', () => {
    const config = { damage: 20, breakable: true };

    const shielded = resolveCollision({
        type: 'barrier',
        config,
        speed: 40,
        shieldActive: true
    });

    assert(shielded.damage === 0, 'Shield prevents damage');
    assert(shielded.breakable === false, 'Shield prevents break logic');
    assert(shielded.sfx === null, 'Shielded collision does not play damage SFX');
});

console.log(`\n✅ Tests passed: ${testsPassed}`);
if (testsFailed > 0) {
    console.log(`❌ Tests failed: ${testsFailed}`);
    process.exit(1);
}