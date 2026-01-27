// Pure spawn planning logic (no DOM/Three dependencies)

const SIDE_RANGES = {
    left: { min: -120, max: -60 },
    right: { min: 60, max: 120 },
    center: { min: -40, max: 40 },
    random: { min: -200, max: 200 }
};

function randBetween(min, max, rng) {
    return min + (max - min) * rng();
}

export function computeSpawnPositions({
    baseZ,
    count,
    side,
    spawnDistance,
    spacing,
    jitter,
    rng
}) {
    const positions = [];
    const range = SIDE_RANGES[side] || SIDE_RANGES.random;
    const effectiveJitter = Math.min(jitter, spacing);

    for (let i = 0; i < count; i++) {
        const x = randBetween(range.min, range.max, rng);
        const z = baseZ + spawnDistance + (i * spacing) + randBetween(0, effectiveJitter, rng);
        positions.push({ x, z });
    }

    return positions;
}

export function buildSpawnPlan(objectList, baseZ, options = {}, rng = Math.random) {
    const spawnDistance = options.spawnDistance ?? 1200;
    const spacing = options.spacing ?? 90;
    const jitter = options.jitter ?? 180;

    const plan = [];
    if (!Array.isArray(objectList)) return plan;

    objectList.forEach(objDef => {
        const count = Math.min(objDef.count || 1, 8);
        const side = objDef.side || 'random';
        const positions = computeSpawnPositions({
            baseZ,
            count,
            side,
            spawnDistance,
            spacing,
            jitter,
            rng
        });

        positions.forEach(pos => {
            plan.push({
                type: objDef.type,
                x: pos.x,
                z: pos.z,
                moving: !!objDef.moving,
                speed: objDef.speed || 0
            });
        });
    });

    return plan;
}
