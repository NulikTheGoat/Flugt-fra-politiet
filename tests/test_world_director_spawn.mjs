/**
 * World Director spawn plan tests
 * Run with: node tests/test_world_director_spawn.mjs
 */

import logic from '../js/worldDirectorLogic.cjs';

const { buildSpawnPlan } = logic;

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

function createSeededRng(seed = 1234) {
    let s = seed;
    return () => {
        // Simple LCG
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
    };
}

const rng = createSeededRng(42);

// ============================================
// Tests
// ============================================

describe('World Director - Spawn Plan (Driving Straight)', () => {
    const baseZ = 1000;
    const spawnDistance = 1200;
    const spacing = 90;
    const jitter = 180;

    const objects = [
        { type: 'cones', count: 3, side: 'center' },
        { type: 'roadblock', count: 2, side: 'left' },
        { type: 'money', count: 4, side: 'random' }
    ];

    const plan = buildSpawnPlan(objects, baseZ, { spawnDistance, spacing, jitter }, rng);

    // 1) Should spawn total of 9 objects
    assert(plan.length === 9, `Spawns total count (expected 9, got ${plan.length})`);

    // 2) All objects should be beyond the horizon (baseZ + spawnDistance)
    const minZ = baseZ + spawnDistance;
    const allFar = plan.every(p => p.z >= minZ);
    assert(allFar, `All objects spawn beyond horizon (>= ${minZ})`);

    // 3) Z positions should be non-decreasing within each group
    const groupSizes = [3, 2, 4];
    let index = 0;
    for (const size of groupSizes) {
        const group = plan.slice(index, index + size);
        for (let i = 1; i < group.length; i++) {
            assert(group[i].z >= group[i - 1].z, 'Z positions are non-decreasing per group');
        }
        index += size;
    }

    // 4) Left side objects are on negative X
    const leftObjects = plan.slice(3, 5);
    assert(leftObjects.every(p => p.x < 0), 'Left side spawns on negative X');

    // 5) Center objects stay near road center
    const centerObjects = plan.slice(0, 3);
    const centerOk = centerObjects.every(p => Math.abs(p.x) <= 50);
    assert(centerOk, 'Center objects stay near road center');
});

console.log(`\n✅ Tests passed: ${testsPassed}`);
if (testsFailed > 0) {
    console.log(`❌ Tests failed: ${testsFailed}`);
    process.exit(1);
}
