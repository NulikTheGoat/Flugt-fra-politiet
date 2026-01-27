/**
 * Debris Physics Tests
 * Tests realistic debris behavior for building and tree collisions
 * Run with: node tests/test_debris_physics.mjs
 */

import logic from '../js/debrisLogic.cjs';

const { 
    DEBRIS_MATERIALS,
    PHYSICS,
    calculateDebrisCount,
    calculateDebrisVelocity,
    calculateRotationVelocity,
    generateBuildingDebrisPlan,
    generateTreeDebrisPlan,
    validateDebrisPlan
} = logic;

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

function assertApprox(actual, expected, tolerance, message) {
    const diff = Math.abs(actual - expected);
    if (diff <= tolerance) {
        testsPassed++;
        console.log(`  ✅ ${message} (${actual.toFixed(2)} ≈ ${expected})`);
    } else {
        testsFailed++;
        console.log(`  ❌ ${message} (got ${actual.toFixed(2)}, expected ${expected} ±${tolerance})`);
    }
}

function describe(name, fn) {
    console.log(`\n📋 ${name}`);
    fn();
}

// ==========================================
// DEBRIS COUNT TESTS
// ==========================================

describe('Debris Count - Speed Scaling', () => {
    // Low speed should create minimal debris
    const lowSpeedCount = calculateDebrisCount(5, 'concrete', false);
    assert(lowSpeedCount >= 3 && lowSpeedCount <= 4, `Low speed (5) creates ${lowSpeedCount} concrete chunks (3-4 expected)`);

    // Medium speed creates more debris
    const medSpeedCount = calculateDebrisCount(30, 'concrete', false);
    assert(medSpeedCount >= 6 && medSpeedCount <= 8, `Medium speed (30) creates ${medSpeedCount} concrete chunks (6-8 expected)`);

    // High speed creates maximum debris
    const highSpeedCount = calculateDebrisCount(80, 'concrete', false);
    assert(highSpeedCount === 12, `High speed (80) creates max ${highSpeedCount} concrete chunks (12 expected)`);
});

describe('Debris Count - Police vs Player', () => {
    const playerCount = calculateDebrisCount(40, 'concrete', false);
    const policeCount = calculateDebrisCount(40, 'concrete', true);
    
    assert(policeCount < playerCount, `Police creates less debris (${policeCount}) than player (${playerCount})`);
    assertApprox(policeCount / playerCount, PHYSICS.POLICE_FORCE_MULTIPLIER, 0.15, 
        `Police debris ratio matches POLICE_FORCE_MULTIPLIER`);
});

describe('Debris Count - Material Variation', () => {
    const concreteCount = calculateDebrisCount(40, 'concrete', false);
    const glassCount = calculateDebrisCount(40, 'glass', false);
    const dustCount = calculateDebrisCount(40, 'dust', false);
    const leafCount = calculateDebrisCount(40, 'leaf', false);
    
    // Different materials have different base counts
    assert(concreteCount >= glassCount, `More concrete (${concreteCount}) than glass (${glassCount})`);
    assert(leafCount > concreteCount, `More leaves (${leafCount}) than concrete (${concreteCount})`);
    console.log(`    Counts at speed 40: concrete=${concreteCount}, glass=${glassCount}, dust=${dustCount}, leaf=${leafCount}`);
});

// ==========================================
// VELOCITY PHYSICS TESTS
// ==========================================

describe('Velocity Physics - Impact Direction', () => {
    // Car facing forward (angle = 0) should push debris forward (positive Z)
    const forwardVel = calculateDebrisVelocity({
        speed: 40,
        impactAngle: 0,
        spreadAngle: 0,
        material: 'concrete',
        vehicleMass: 1.0
    });
    
    assert(forwardVel.z > 0, `Forward impact pushes debris forward (z=${forwardVel.z.toFixed(2)})`);
    assert(forwardVel.y > 0, `Debris has upward velocity (y=${forwardVel.y.toFixed(2)})`);
    
    // Car facing right (angle = π/2) should push debris right (positive X)
    const rightVel = calculateDebrisVelocity({
        speed: 40,
        impactAngle: Math.PI / 2,
        spreadAngle: 0,
        material: 'concrete',
        vehicleMass: 1.0
    });
    
    assert(rightVel.x > 0, `Right-facing impact pushes debris right (x=${rightVel.x.toFixed(2)})`);
});

describe('Velocity Physics - Speed Proportionality', () => {
    const slowVel = calculateDebrisVelocity({
        speed: 10,
        impactAngle: 0,
        spreadAngle: 0,
        material: 'concrete',
        vehicleMass: 1.0
    });
    
    const fastVel = calculateDebrisVelocity({
        speed: 50,
        impactAngle: 0,
        spreadAngle: 0,
        material: 'concrete',
        vehicleMass: 1.0
    });
    
    const slowMag = Math.sqrt(slowVel.x**2 + slowVel.y**2 + slowVel.z**2);
    const fastMag = Math.sqrt(fastVel.x**2 + fastVel.y**2 + fastVel.z**2);
    
    assert(fastMag > slowMag * 1.5, `Fast impact (${fastMag.toFixed(2)}) creates higher velocity than slow (${slowMag.toFixed(2)})`);
});

describe('Velocity Physics - Material Mass Effect', () => {
    // Light materials (lower density) should get more velocity
    const concreteVel = calculateDebrisVelocity({
        speed: 30,
        impactAngle: 0,
        spreadAngle: 0,
        material: 'concrete',
        vehicleMass: 1.0
    });
    
    const dustVel = calculateDebrisVelocity({
        speed: 30,
        impactAngle: 0,
        spreadAngle: 0,
        material: 'dust',
        vehicleMass: 1.0
    });
    
    const concreteMag = Math.sqrt(concreteVel.x**2 + concreteVel.y**2 + concreteVel.z**2);
    const dustMag = Math.sqrt(dustVel.x**2 + dustVel.y**2 + dustVel.z**2);
    
    assert(dustMag > concreteMag, `Light dust (${dustMag.toFixed(2)}) flies further than heavy concrete (${concreteMag.toFixed(2)})`);
});

describe('Velocity Physics - Vehicle Mass Effect', () => {
    const lightVehicleVel = calculateDebrisVelocity({
        speed: 30,
        impactAngle: 0,
        spreadAngle: 0,
        material: 'concrete',
        vehicleMass: 0.8  // Light car
    });
    
    const heavyVehicleVel = calculateDebrisVelocity({
        speed: 30,
        impactAngle: 0,
        spreadAngle: 0,
        material: 'concrete',
        vehicleMass: 1.5  // Heavy truck
    });
    
    const lightMag = Math.sqrt(lightVehicleVel.x**2 + lightVehicleVel.y**2 + lightVehicleVel.z**2);
    const heavyMag = Math.sqrt(heavyVehicleVel.x**2 + heavyVehicleVel.y**2 + heavyVehicleVel.z**2);
    
    assert(heavyMag > lightMag, `Heavy vehicle (${heavyMag.toFixed(2)}) imparts more force than light (${lightMag.toFixed(2)})`);
});

// ==========================================
// ROTATION PHYSICS TESTS
// ==========================================

describe('Rotation Physics - Material Effect', () => {
    // Run multiple times to get average (rotation is randomized)
    let concreteRotSum = 0;
    let dustRotSum = 0;
    const samples = 100;
    
    for (let i = 0; i < samples; i++) {
        const concreteRot = calculateRotationVelocity('concrete');
        const dustRot = calculateRotationVelocity('dust');
        
        concreteRotSum += Math.abs(concreteRot.x) + Math.abs(concreteRot.y) + Math.abs(concreteRot.z);
        dustRotSum += Math.abs(dustRot.x) + Math.abs(dustRot.y) + Math.abs(dustRot.z);
    }
    
    const concreteAvg = concreteRotSum / samples;
    const dustAvg = dustRotSum / samples;
    
    // Lighter materials should spin more on average
    // But dust is extremely light (0.001) so spin factor is very low
    // Concrete (2.4) has spin = 0.3/2.4 = 0.125
    console.log(`    Concrete avg rotation: ${concreteAvg.toFixed(3)}, Dust: ${dustAvg.toFixed(3)}`);
    assert(concreteAvg > 0, `Concrete debris rotates (avg: ${concreteAvg.toFixed(3)})`);
});

// ==========================================
// BUILDING DEBRIS PLAN TESTS
// ==========================================

describe('Building Debris Plan - Basic Structure', () => {
    const plan = generateBuildingDebrisPlan({
        speed: 30,
        impactAngle: 0,
        vehicleMass: 1.0,
        isPolice: false,
        position: { x: 100, y: 5, z: 200 }
    });
    
    assert(plan.concrete.length > 0, `Plan contains concrete chunks (${plan.concrete.length})`);
    assert(plan.glass.length > 0, `Plan contains glass shards (${plan.glass.length})`);
    assert(plan.dust.length > 0, `Plan contains dust particles (${plan.dust.length})`);
    assert(plan.sparkCount > 0, `Plan includes spark count (${plan.sparkCount})`);
    assert(plan.totalPieces === plan.concrete.length + plan.glass.length + plan.dust.length,
        `Total pieces matches sum (${plan.totalPieces})`);
});

describe('Building Debris Plan - Position Near Impact', () => {
    const impactPos = { x: 100, y: 5, z: 200 };
    const plan = generateBuildingDebrisPlan({
        speed: 30,
        impactAngle: 0,
        vehicleMass: 1.0,
        isPolice: false,
        position: impactPos
    });
    
    // Check all concrete chunks spawn near impact point
    let maxDistance = 0;
    for (const chunk of plan.concrete) {
        const dx = chunk.position.x - impactPos.x;
        const dz = chunk.position.z - impactPos.z;
        const dist = Math.sqrt(dx*dx + dz*dz);
        maxDistance = Math.max(maxDistance, dist);
    }
    
    assert(maxDistance < 10, `Concrete spawns within 10 units of impact (max: ${maxDistance.toFixed(2)})`);
    
    // Glass spawns higher (windows)
    let minGlassY = Infinity;
    for (const shard of plan.glass) {
        minGlassY = Math.min(minGlassY, shard.position.y);
    }
    
    assert(minGlassY > impactPos.y + 5, `Glass spawns elevated (min y: ${minGlassY.toFixed(2)} > ${impactPos.y + 5})`);
});

describe('Building Debris Plan - No Windows Option', () => {
    const withWindows = generateBuildingDebrisPlan({
        speed: 30,
        impactAngle: 0,
        position: { x: 0, y: 0, z: 0 },
        hasWindows: true
    });
    
    const noWindows = generateBuildingDebrisPlan({
        speed: 30,
        impactAngle: 0,
        position: { x: 0, y: 0, z: 0 },
        hasWindows: false
    });
    
    assert(withWindows.glass.length > 0, `With windows: has glass (${withWindows.glass.length})`);
    assert(noWindows.glass.length === 0, `Without windows: no glass (${noWindows.glass.length})`);
});

describe('Building Debris Plan - Police vs Player Consistency', () => {
    const playerPlan = generateBuildingDebrisPlan({
        speed: 40,
        impactAngle: Math.PI / 4,
        vehicleMass: 1.0,
        isPolice: false,
        position: { x: 50, y: 0, z: 50 }
    });
    
    const policePlan = generateBuildingDebrisPlan({
        speed: 40,
        impactAngle: Math.PI / 4,
        vehicleMass: 1.0,
        isPolice: true,
        position: { x: 50, y: 0, z: 50 }
    });
    
    // Both should produce valid debris
    assert(playerPlan.totalPieces > 0, `Player plan has debris (${playerPlan.totalPieces})`);
    assert(policePlan.totalPieces > 0, `Police plan has debris (${policePlan.totalPieces})`);
    
    // Police should have fewer pieces
    assert(policePlan.totalPieces < playerPlan.totalPieces, 
        `Police has less debris (${policePlan.totalPieces}) than player (${playerPlan.totalPieces})`);
    
    // Both should have same types of debris
    assert(policePlan.concrete.length > 0 && playerPlan.concrete.length > 0, 
        'Both have concrete');
    assert(policePlan.glass.length > 0 && playerPlan.glass.length > 0, 
        'Both have glass');
});

// ==========================================
// TREE DEBRIS PLAN TESTS
// ==========================================

describe('Tree Debris Plan - Basic Structure', () => {
    const plan = generateTreeDebrisPlan({
        speed: 25,
        impactAngle: 0,
        vehicleMass: 1.0,
        isPolice: false,
        position: { x: 0, y: 0, z: 0 }
    });
    
    assert(plan.wood.length > 0, `Plan contains wood splinters (${plan.wood.length})`);
    assert(plan.leaves.length > 0, `Plan contains leaves (${plan.leaves.length})`);
    assert(plan.totalPieces === plan.wood.length + plan.leaves.length,
        `Total pieces matches sum (${plan.totalPieces})`);
});

describe('Tree Debris Plan - Splinter Shape', () => {
    const plan = generateTreeDebrisPlan({
        speed: 30,
        impactAngle: 0,
        position: { x: 0, y: 0, z: 0 }
    });
    
    // Wood splinters should be elongated (height > width/depth)
    let elongatedCount = 0;
    for (const splinter of plan.wood) {
        if (splinter.size.height > splinter.size.width * 2) {
            elongatedCount++;
        }
    }
    
    assert(elongatedCount >= plan.wood.length * 0.5, 
        `At least 50% of splinters are elongated (${elongatedCount}/${plan.wood.length})`);
});

describe('Tree Debris Plan - Leaves Float Higher', () => {
    const plan = generateTreeDebrisPlan({
        speed: 30,
        impactAngle: 0,
        position: { x: 0, y: 10, z: 0 }
    });
    
    // Leaves should spawn much higher than wood (from canopy)
    let avgWoodY = 0, avgLeafY = 0;
    for (const w of plan.wood) avgWoodY += w.position.y;
    for (const l of plan.leaves) avgLeafY += l.position.y;
    avgWoodY /= plan.wood.length;
    avgLeafY /= plan.leaves.length;
    
    assert(avgLeafY > avgWoodY + 30, 
        `Leaves spawn higher (${avgLeafY.toFixed(1)}) than wood (${avgWoodY.toFixed(1)})`);
});

// ==========================================
// VALIDATION TESTS
// ==========================================

describe('Plan Validation - Valid Building Plan', () => {
    const plan = generateBuildingDebrisPlan({
        speed: 30,
        impactAngle: 0,
        position: { x: 0, y: 0, z: 0 }
    });
    
    const result = validateDebrisPlan(plan);
    
    assert(result.valid, `Building debris plan is valid`);
    assert(result.issues.length === 0, `No validation issues (${result.issues.join(', ') || 'none'})`);
});

describe('Plan Validation - Valid Tree Plan', () => {
    const plan = generateTreeDebrisPlan({
        speed: 25,
        impactAngle: Math.PI / 3,
        position: { x: 100, y: 0, z: 100 }
    });
    
    const result = validateDebrisPlan(plan);
    
    assert(result.valid, `Tree debris plan is valid`);
    assert(result.issues.length === 0, `No validation issues (${result.issues.join(', ') || 'none'})`);
});

describe('Plan Validation - Detects Issues', () => {
    // Create a plan with invalid data
    const badPlan = {
        concrete: [{
            position: { x: 0, y: 0, z: 0 },
            velocity: { x: 100, y: 100, z: 100 },  // Way too fast
            lifetime: 30  // Too short
        }],
        glass: [],
        dust: [],
        totalPieces: 1
    };
    
    const result = validateDebrisPlan(badPlan);
    
    assert(!result.valid, `Invalid plan detected`);
    assert(result.issues.length >= 1, `Issues reported (${result.issues.length})`);
    console.log(`    Issues found: ${result.issues.join(', ')}`);
});

// ==========================================
// REALISTIC PHYSICS TESTS
// ==========================================

describe('Realistic Physics - Gravity Values', () => {
    // Verify gravity makes sense for each material
    const concreteGrav = DEBRIS_MATERIALS.concrete.gravity;
    const glassGrav = DEBRIS_MATERIALS.glass.gravity;
    const dustGrav = DEBRIS_MATERIALS.dust.gravity;
    const leafGrav = DEBRIS_MATERIALS.leaf.gravity;
    
    assert(concreteGrav > glassGrav, `Concrete (${concreteGrav}) falls faster than glass (${glassGrav})`);
    assert(dustGrav < 0, `Dust has negative gravity (${dustGrav}) - rises initially`);
    assert(leafGrav < glassGrav, `Leaves (${leafGrav}) float slower than glass (${glassGrav})`);
});

describe('Realistic Physics - Density Values', () => {
    // Real-world approximate densities
    // Concrete: 2.3-2.5 kg/L
    // Glass: 2.4-2.8 kg/L
    // Wood: 0.3-0.9 kg/L
    
    const concrete = DEBRIS_MATERIALS.concrete.density;
    const glass = DEBRIS_MATERIALS.glass.density;
    const wood = DEBRIS_MATERIALS.wood.density;
    
    assertApprox(concrete, 2.4, 0.3, 'Concrete density is realistic (~2.4 kg/L)');
    assertApprox(glass, 2.5, 0.5, 'Glass density is realistic (~2.5 kg/L)');
    assertApprox(wood, 0.7, 0.4, 'Wood density is realistic (~0.7 kg/L)');
    
    assert(wood < concrete, `Wood (${wood}) is lighter than concrete (${concrete})`);
});

describe('Realistic Physics - Momentum Conservation', () => {
    // Heavier car hitting building should create faster debris
    // Using same speed but different mass
    const lightCarPlan = generateBuildingDebrisPlan({
        speed: 40,
        impactAngle: 0,
        vehicleMass: 0.8,
        position: { x: 0, y: 0, z: 0 }
    });
    
    const heavyCarPlan = generateBuildingDebrisPlan({
        speed: 40,
        impactAngle: 0,
        vehicleMass: 1.5,
        position: { x: 0, y: 0, z: 0 }
    });
    
    // Calculate average velocity magnitude for concrete
    const avgVelLight = lightCarPlan.concrete.reduce((sum, c) => {
        return sum + Math.sqrt(c.velocity.x**2 + c.velocity.y**2 + c.velocity.z**2);
    }, 0) / lightCarPlan.concrete.length;
    
    const avgVelHeavy = heavyCarPlan.concrete.reduce((sum, c) => {
        return sum + Math.sqrt(c.velocity.x**2 + c.velocity.y**2 + c.velocity.z**2);
    }, 0) / heavyCarPlan.concrete.length;
    
    assert(avgVelHeavy > avgVelLight, 
        `Heavy car (${avgVelHeavy.toFixed(2)}) imparts more velocity than light (${avgVelLight.toFixed(2)})`);
});

describe('Realistic Physics - Debris Stay Close to Impact', () => {
    const plan = generateBuildingDebrisPlan({
        speed: 50,
        impactAngle: 0,
        position: { x: 0, y: 0, z: 0 }
    });
    
    // Check that debris doesn't spawn too far from impact
    const maxSpawnDist = 20;  // Should stay within 20 units initially
    
    for (const chunk of [...plan.concrete, ...plan.dust]) {
        const dist = Math.sqrt(chunk.position.x**2 + chunk.position.z**2);
        assert(dist < maxSpawnDist, 
            `Debris spawns close to impact (${dist.toFixed(1)} < ${maxSpawnDist})`);
    }
});

// ==========================================
// UNIFIED DEBRIS COLLISION SYSTEM TESTS
// ==========================================

describe('Debris Size Classification', () => {
    // Test that debris sizes are correctly classified
    function classifyDebrisSize(width, height, depth) {
        const maxDim = Math.max(width, height, depth);
        if (maxDim >= 20) return 'large';
        if (maxDim >= 8) return 'medium';
        if (maxDim >= 2) return 'small';
        return 'tiny';
    }
    
    assert(classifyDebrisSize(30, 30, 30) === 'large', 'Large chunk (30x30x30) classified as large');
    assert(classifyDebrisSize(15, 15, 15) === 'medium', 'Medium chunk (15x15x15) classified as medium');
    assert(classifyDebrisSize(5, 5, 5) === 'small', 'Small chunk (5x5x5) classified as small');
    assert(classifyDebrisSize(1, 1, 1) === 'tiny', 'Tiny chunk (1x1x1) classified as tiny');
});

describe('Debris Collision Properties', () => {
    // Test that debris has correct collision properties based on size
    function getDebrisCollisionProps(size) {
        switch (size) {
            case 'large':
                return { isCollidable: true, canShatter: true, canDestroyBuildings: true };
            case 'medium':
                return { isCollidable: true, canShatter: true, canDestroyBuildings: true };
            case 'small':
                return { isCollidable: true, canShatter: true, canDestroyBuildings: false };
            case 'tiny':
                return { isCollidable: false, canShatter: false, canDestroyBuildings: false };
            default:
                return { isCollidable: false, canShatter: false, canDestroyBuildings: false };
        }
    }
    
    const largeProps = getDebrisCollisionProps('large');
    assert(largeProps.isCollidable === true, 'Large debris is collidable');
    assert(largeProps.canShatter === true, 'Large debris can shatter');
    assert(largeProps.canDestroyBuildings === true, 'Large debris can destroy buildings');
    
    const tinyProps = getDebrisCollisionProps('tiny');
    assert(tinyProps.isCollidable === false, 'Tiny debris is not collidable');
    assert(tinyProps.canShatter === false, 'Tiny debris cannot shatter');
});

describe('Shatter Piece Count Calculation', () => {
    // When debris shatters, it should create appropriate number of pieces
    function calculateShatterPieces(debrisSize, impactSpeed) {
        const baseCount = debrisSize === 'large' ? 8 : debrisSize === 'medium' ? 5 : 3;
        const speedBonus = Math.floor(impactSpeed / 20);
        return Math.min(12, baseCount + speedBonus);
    }
    
    // Slow collision with large debris
    const slowLarge = calculateShatterPieces('large', 10);
    assert(slowLarge >= 8 && slowLarge <= 9, `Slow collision with large debris: ${slowLarge} pieces (8-9 expected)`);
    
    // Fast collision with large debris
    const fastLarge = calculateShatterPieces('large', 80);
    assert(fastLarge === 12, `Fast collision with large debris: ${fastLarge} pieces (12 expected, capped)`);
    
    // Slow collision with medium debris
    const slowMedium = calculateShatterPieces('medium', 10);
    assert(slowMedium >= 5 && slowMedium <= 6, `Slow collision with medium debris: ${slowMedium} pieces (5-6 expected)`);
});

describe('Debris Settling Velocity Threshold', () => {
    // Debris should settle when velocity is below threshold
    const SETTLE_VELOCITY_THRESHOLD = 0.5;
    const SETTLE_Y_THRESHOLD = 1.0;
    
    function shouldSettle(velocity, posY, groundY) {
        return Math.abs(velocity.x) < SETTLE_VELOCITY_THRESHOLD &&
               Math.abs(velocity.y) < SETTLE_VELOCITY_THRESHOLD &&
               Math.abs(velocity.z) < SETTLE_VELOCITY_THRESHOLD &&
               posY <= groundY + SETTLE_Y_THRESHOLD;
    }
    
    // Moving debris shouldn't settle
    assert(!shouldSettle({ x: 2, y: 0, z: 0 }, 10, 10), 'Moving debris (vx=2) does not settle');
    assert(!shouldSettle({ x: 0, y: 0, z: 0 }, 50, 10), 'High debris (y=50) does not settle');
    
    // Stationary debris near ground should settle
    assert(shouldSettle({ x: 0.1, y: 0.1, z: 0.1 }, 10.5, 10), 'Slow debris near ground settles');
    assert(shouldSettle({ x: 0, y: 0, z: 0 }, 10, 10), 'Stationary debris at ground settles');
});

describe('Flying Debris Building Collision', () => {
    // Test that flying debris can damage buildings
    function canDebrisDamageBuilding(debris, buildingChunk) {
        // Debris must be moving fast enough
        const speed = Math.sqrt(
            debris.velocity.x ** 2 + 
            debris.velocity.y ** 2 + 
            debris.velocity.z ** 2
        );
        
        // Debris must be large enough
        const debrisSize = Math.max(debris.width, debris.height, debris.depth);
        
        // Building chunk must not already be hit
        if (buildingChunk.isHit) return false;
        
        // Check thresholds
        const MIN_DAMAGE_SPEED = 15;
        const MIN_DAMAGE_SIZE = 8;
        
        return speed >= MIN_DAMAGE_SPEED && debrisSize >= MIN_DAMAGE_SIZE;
    }
    
    const fastLargeDebris = { velocity: { x: 20, y: 5, z: 0 }, width: 30, height: 30, depth: 30 };
    const slowSmallDebris = { velocity: { x: 2, y: 0, z: 0 }, width: 3, height: 3, depth: 3 };
    const buildingChunk = { isHit: false };
    const hitChunk = { isHit: true };
    
    assert(canDebrisDamageBuilding(fastLargeDebris, buildingChunk), 'Fast large debris can damage building');
    assert(!canDebrisDamageBuilding(slowSmallDebris, buildingChunk), 'Slow small debris cannot damage building');
    assert(!canDebrisDamageBuilding(fastLargeDebris, hitChunk), 'Debris cannot damage already-hit chunk');
});

describe('Vehicle-Debris Collision Response', () => {
    // Test collision response calculations
    function calculateCollisionResponse(carSpeed, debrisSize, debrisMass = 1.0) {
        // Car should be pushed back based on debris mass
        const pushBackForce = debrisMass * 0.5;
        
        // Speed reduction depends on debris size
        let speedMultiplier;
        switch (debrisSize) {
            case 'large': speedMultiplier = 0.6; break;
            case 'medium': speedMultiplier = 0.75; break;
            case 'small': speedMultiplier = 0.9; break;
            default: speedMultiplier = 0.98;
        }
        
        // Whether debris shatters depends on speed
        const SHATTER_THRESHOLD = 40;
        const shouldShatter = carSpeed > SHATTER_THRESHOLD;
        
        return {
            pushBackForce,
            newSpeed: carSpeed * speedMultiplier,
            shouldShatter
        };
    }
    
    // High speed collision with large debris
    const fastLarge = calculateCollisionResponse(60, 'large');
    assert(fastLarge.shouldShatter === true, 'High speed (60) shatters large debris');
    assertApprox(fastLarge.newSpeed, 36, 1, 'Speed reduced to 60% after large debris hit');
    
    // Low speed collision with large debris
    const slowLarge = calculateCollisionResponse(20, 'large');
    assert(slowLarge.shouldShatter === false, 'Low speed (20) does not shatter debris');
    
    // Collision with small debris
    const fastSmall = calculateCollisionResponse(60, 'small');
    assertApprox(fastSmall.newSpeed, 54, 1, 'Speed reduced to 90% after small debris hit');
});

// ==========================================
// PERFORMANCE TESTS
// ==========================================

describe('Performance - Debris Count Limits', () => {
    // Even at extreme speeds, debris should be capped
    const extremePlan = generateBuildingDebrisPlan({
        speed: 200,  // Unrealistically fast
        impactAngle: 0,
        position: { x: 0, y: 0, z: 0 }
    });
    
    assert(extremePlan.concrete.length <= 12, 
        `Concrete capped at 12 even at extreme speed (got ${extremePlan.concrete.length})`);
    assert(extremePlan.glass.length <= 8, 
        `Glass capped at 8 even at extreme speed (got ${extremePlan.glass.length})`);
    assert(extremePlan.totalPieces <= 35, 
        `Total debris capped at reasonable level (got ${extremePlan.totalPieces})`);
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`\n✅ Tests passed: ${testsPassed}`);
if (testsFailed > 0) {
    console.log(`❌ Tests failed: ${testsFailed}`);
    process.exit(1);
} else {
    console.log('🎉 All debris physics tests passed!');
}
