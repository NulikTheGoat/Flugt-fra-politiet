/**
 * debrisLogic.cjs - Pure logic for building debris physics
 * Testable without Three.js dependencies
 * 
 * Physics Model:
 * - Uses realistic momentum transfer (p = mv)
 * - Debris spread based on impact angle and speed
 * - Material-specific behavior (concrete dense, glass light, dust floats)
 */

// Material properties for realistic debris behavior
const DEBRIS_MATERIALS = {
    concrete: {
        density: 2.4,      // kg/L - concrete is heavy
        friction: 0.6,     // rough surface
        restitution: 0.2,  // doesn't bounce much
        color: 0x8D6E63,
        minSize: 1,
        maxSize: 5,
        gravity: 0.35
    },
    brick: {
        density: 1.9,
        friction: 0.55,
        restitution: 0.25,
        color: 0x8B4513,
        minSize: 1,
        maxSize: 4,
        gravity: 0.32
    },
    glass: {
        density: 2.5,       // glass is dense but thin
        friction: 0.3,      // smooth
        restitution: 0.1,   // shatters, doesn't bounce
        color: 0x90CAF9,
        minSize: 0.5,
        maxSize: 2.5,
        gravity: 0.25,
        transparent: true,
        opacity: 0.7
    },
    wood: {
        density: 0.7,       // wood floats
        friction: 0.5,
        restitution: 0.3,
        color: 0x5D4037,
        minSize: 2,
        maxSize: 6,
        gravity: 0.30
    },
    dust: {
        density: 0.001,     // essentially weightless
        friction: 0.0,
        restitution: 0.0,
        color: 0x9E9E9E,
        minSize: 1,
        maxSize: 3,
        gravity: -0.02,     // rises then dissipates
        transparent: true,
        opacity: 0.4,
        lifetime: { min: 80, max: 150 }
    },
    leaf: {
        density: 0.01,
        friction: 0.8,      // air resistance
        restitution: 0.0,
        color: 0x2E7D32,
        minSize: 3,
        maxSize: 6,
        gravity: 0.08,      // floats down slowly
        lifetime: { min: 300, max: 500 }
    }
};

// Physics constants
const PHYSICS = {
    BASE_UPWARD_VELOCITY: 2.0,      // minimum upward kick
    SPEED_TO_VELOCITY_FACTOR: 0.15, // how much car speed affects debris velocity
    SPREAD_ANGLE_VARIANCE: Math.PI * 2, // full circle spread
    ROTATION_MAX: 0.8,              // max rotation speed
    MIN_SPEED_FOR_DEBRIS: 5,        // below this, minimal debris
    SPEED_DEBRIS_SCALE: 8,          // debris count scales with speed/this
    MAX_DEBRIS_PER_TYPE: 15,        // cap to prevent performance issues
    IMPACT_FORCE_MULTIPLIER: 1.2,   // force multiplier for heavier vehicles
    POLICE_FORCE_MULTIPLIER: 0.8,   // police cars cause slightly less debris
    MIN_LIFETIME: 100,
    MAX_LIFETIME_BONUS: 200
};

/**
 * Calculate the number of debris pieces based on speed and type
 * @param {number} speed - Impact speed
 * @param {string} debrisType - Type of debris (concrete, glass, etc.)
 * @param {boolean} isPolice - Whether this is police collision
 * @returns {number} Number of debris pieces
 */
function calculateDebrisCount(speed, debrisType, isPolice = false) {
    const baseCount = {
        concrete: 3,
        brick: 3,
        glass: 2,
        wood: 4,
        dust: 3,
        leaf: 8
    };

    const maxCount = {
        concrete: 12,
        brick: 10,
        glass: 8,
        wood: 8,
        dust: 10,
        leaf: 15
    };

    const base = baseCount[debrisType] || 3;
    const max = maxCount[debrisType] || 10;
    
    // Scale with speed
    let count = base + Math.floor(speed / PHYSICS.SPEED_DEBRIS_SCALE);
    
    // Police causes slightly less debris (lighter impacts)
    if (isPolice) {
        count = Math.floor(count * PHYSICS.POLICE_FORCE_MULTIPLIER);
    }
    
    return Math.min(max, Math.max(1, count));
}

/**
 * Calculate initial velocity for a debris piece
 * Uses realistic momentum transfer physics
 * 
 * @param {Object} params
 * @param {number} params.speed - Car speed at impact
 * @param {number} params.impactAngle - Angle of impact (car rotation)
 * @param {number} params.spreadAngle - Random angle for this debris piece
 * @param {string} params.material - Material type
 * @param {number} params.vehicleMass - Mass of hitting vehicle (1.0 = normal car)
 * @returns {Object} {x, y, z} velocity components
 */
function calculateDebrisVelocity(params) {
    const { speed, impactAngle, spreadAngle, material, vehicleMass = 1.0 } = params;
    const matProps = DEBRIS_MATERIALS[material] || DEBRIS_MATERIALS.concrete;
    
    // Heavier materials get less velocity (momentum conservation)
    const massRatio = 1.0 / Math.sqrt(matProps.density);
    
    // Heavier vehicles impart more force
    const forceMult = Math.sqrt(vehicleMass) * PHYSICS.IMPACT_FORCE_MULTIPLIER;
    
    // Base velocity from impact direction
    const impactX = Math.sin(impactAngle);
    const impactZ = Math.cos(impactAngle);
    
    // Speed-based spread force
    const spreadForce = (1 + Math.random() * speed * PHYSICS.SPEED_TO_VELOCITY_FACTOR) * massRatio;
    
    // Combine impact direction with random spread
    const vx = impactX * speed * PHYSICS.SPEED_TO_VELOCITY_FACTOR * forceMult + 
               Math.sin(spreadAngle) * spreadForce;
    const vy = PHYSICS.BASE_UPWARD_VELOCITY + 
               Math.random() * speed * PHYSICS.SPEED_TO_VELOCITY_FACTOR * massRatio;
    const vz = impactZ * speed * PHYSICS.SPEED_TO_VELOCITY_FACTOR * forceMult + 
               Math.cos(spreadAngle) * spreadForce;
    
    return { x: vx, y: vy, z: vz };
}

/**
 * Calculate rotation velocity for a debris piece
 * @param {string} material - Material type
 * @returns {Object} {x, y, z} rotation velocity
 */
function calculateRotationVelocity(material) {
    const matProps = DEBRIS_MATERIALS[material] || DEBRIS_MATERIALS.concrete;
    
    // Lighter materials spin more
    const spinFactor = Math.min(1.0, 0.3 / matProps.density) * PHYSICS.ROTATION_MAX;
    
    return {
        x: (Math.random() - 0.5) * spinFactor,
        y: (Math.random() - 0.5) * spinFactor,
        z: (Math.random() - 0.5) * spinFactor
    };
}

/**
 * Calculate debris piece size
 * @param {string} material - Material type  
 * @param {number} [randomSeed] - Optional seed for deterministic testing
 * @returns {Object} {width, height, depth}
 */
function calculateDebrisSize(material, randomSeed) {
    const matProps = DEBRIS_MATERIALS[material] || DEBRIS_MATERIALS.concrete;
    const rand = randomSeed !== undefined ? (() => randomSeed) : Math.random;
    
    const baseSize = matProps.minSize + rand() * (matProps.maxSize - matProps.minSize);
    
    // Non-uniform shapes for realism
    return {
        width: baseSize * (0.5 + rand() * 0.5),
        height: baseSize * (0.5 + rand() * 0.5),
        depth: baseSize * (0.5 + rand() * 0.5)
    };
}

/**
 * Generate a complete debris plan for building collision
 * This is the main entry point for debris generation
 * 
 * @param {Object} params
 * @param {number} params.speed - Impact speed
 * @param {number} params.impactAngle - Car angle at impact
 * @param {number} params.vehicleMass - Mass of vehicle (1.0 = normal)
 * @param {boolean} params.isPolice - Is this a police collision
 * @param {Object} params.position - {x, y, z} impact position
 * @param {Object} [params.buildingColor] - Color to use for concrete/brick
 * @param {boolean} [params.hasWindows] - Whether building has windows (adds glass)
 * @returns {Object} Debris plan with arrays for each type
 */
function generateBuildingDebrisPlan(params) {
    const { 
        speed, 
        impactAngle, 
        vehicleMass = 1.0, 
        isPolice = false,
        position = { x: 0, y: 0, z: 0 },
        buildingColor = null,
        hasWindows = true
    } = params;
    
    const plan = {
        concrete: [],
        glass: [],
        dust: [],
        sparkCount: Math.min(6, Math.floor(speed / 5)),
        totalPieces: 0
    };
    
    // Concrete chunks - main debris
    const concreteCount = calculateDebrisCount(speed, 'concrete', isPolice);
    for (let i = 0; i < concreteCount; i++) {
        const spreadAngle = Math.random() * PHYSICS.SPREAD_ANGLE_VARIANCE;
        const velocity = calculateDebrisVelocity({
            speed,
            impactAngle,
            spreadAngle,
            material: 'concrete',
            vehicleMass
        });
        
        const size = calculateDebrisSize('concrete');
        const rotation = calculateRotationVelocity('concrete');
        const matProps = DEBRIS_MATERIALS.concrete;
        
        plan.concrete.push({
            position: {
                x: position.x + (Math.random() - 0.5) * 6,
                y: position.y + Math.random() * 8,
                z: position.z + (Math.random() - 0.5) * 6
            },
            velocity,
            rotation,
            size,
            color: buildingColor || matProps.color,
            gravity: matProps.gravity,
            lifetime: PHYSICS.MIN_LIFETIME + Math.floor(Math.random() * PHYSICS.MAX_LIFETIME_BONUS)
        });
    }
    
    // Glass shards - if building has windows
    if (hasWindows) {
        const glassCount = calculateDebrisCount(speed, 'glass', isPolice);
        for (let i = 0; i < glassCount; i++) {
            const spreadAngle = Math.random() * PHYSICS.SPREAD_ANGLE_VARIANCE;
            const velocity = calculateDebrisVelocity({
                speed,
                impactAngle,
                spreadAngle,
                material: 'glass',
                vehicleMass
            });
            
            const size = calculateDebrisSize('glass');
            const rotation = calculateRotationVelocity('glass');
            const matProps = DEBRIS_MATERIALS.glass;
            
            // Glass starts higher (windows are elevated)
            plan.glass.push({
                position: {
                    x: position.x + (Math.random() - 0.5) * 12,
                    y: position.y + 10 + Math.random() * 25,
                    z: position.z + (Math.random() - 0.5) * 12
                },
                velocity: {
                    x: velocity.x * 1.5, // Glass flies further
                    y: velocity.y * 1.2,
                    z: velocity.z * 1.5
                },
                rotation,
                size: { ...size, height: 0.2 }, // Glass is thin
                color: Math.random() > 0.3 ? 0x90CAF9 : 0xE3F2FD,
                gravity: matProps.gravity,
                lifetime: 120 + Math.floor(Math.random() * 80),
                transparent: true,
                opacity: matProps.opacity
            });
        }
    }
    
    // Dust particles
    const dustCount = calculateDebrisCount(speed, 'dust', isPolice);
    for (let i = 0; i < dustCount; i++) {
        const matProps = DEBRIS_MATERIALS.dust;
        
        plan.dust.push({
            position: {
                x: position.x + (Math.random() - 0.5) * 8,
                y: position.y + Math.random() * 12,
                z: position.z + (Math.random() - 0.5) * 8
            },
            velocity: {
                x: Math.sin(impactAngle) * speed * 0.1 + (Math.random() - 0.5) * 4,
                y: 1 + Math.random() * 2,
                z: Math.cos(impactAngle) * speed * 0.1 + (Math.random() - 0.5) * 4
            },
            rotation: { x: 0, y: 0, z: 0 },
            size: { width: 2, height: 2, depth: 2 },
            color: matProps.color,
            gravity: matProps.gravity,
            lifetime: matProps.lifetime.min + Math.floor(Math.random() * (matProps.lifetime.max - matProps.lifetime.min)),
            transparent: true,
            opacity: 0.3 + Math.random() * 0.3
        });
    }
    
    plan.totalPieces = plan.concrete.length + plan.glass.length + plan.dust.length;
    
    return plan;
}

/**
 * Generate debris plan for tree collision
 * @param {Object} params - Same as generateBuildingDebrisPlan
 * @returns {Object} Debris plan with wood and leaves
 */
function generateTreeDebrisPlan(params) {
    const { 
        speed, 
        impactAngle, 
        vehicleMass = 1.0, 
        isPolice = false,
        position = { x: 0, y: 0, z: 0 }
    } = params;
    
    const plan = {
        wood: [],
        leaves: [],
        totalPieces: 0
    };
    
    // Wood splinters
    const woodCount = calculateDebrisCount(speed, 'wood', isPolice);
    for (let i = 0; i < woodCount; i++) {
        const spreadAngle = Math.random() * PHYSICS.SPREAD_ANGLE_VARIANCE;
        const velocity = calculateDebrisVelocity({
            speed,
            impactAngle,
            spreadAngle,
            material: 'wood',
            vehicleMass
        });
        
        const matProps = DEBRIS_MATERIALS.wood;
        const rotation = calculateRotationVelocity('wood');
        
        // Splinters are elongated
        plan.wood.push({
            position: {
                x: position.x + (Math.random() - 0.5) * 10,
                y: position.y + Math.random() * 30,
                z: position.z + (Math.random() - 0.5) * 10
            },
            velocity,
            rotation,
            size: {
                width: 2 + Math.random() * 3,
                height: 8 + Math.random() * 15,  // Long splinters
                depth: 2 + Math.random() * 3
            },
            color: matProps.color,
            gravity: matProps.gravity,
            lifetime: 250 + Math.floor(Math.random() * 100)
        });
    }
    
    // Leaves
    const leafCount = calculateDebrisCount(speed, 'leaf', isPolice);
    for (let i = 0; i < leafCount; i++) {
        const matProps = DEBRIS_MATERIALS.leaf;
        
        // Leaves come from the top of the tree
        plan.leaves.push({
            position: {
                x: position.x + (Math.random() - 0.5) * 25,
                y: position.y + 40 + Math.random() * 40,
                z: position.z + (Math.random() - 0.5) * 25
            },
            velocity: {
                x: (Math.random() - 0.5) * 6,
                y: 2 + Math.random() * 3,
                z: (Math.random() - 0.5) * 6
            },
            rotation: {
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.3,
                z: (Math.random() - 0.5) * 0.3
            },
            size: {
                width: 3 + Math.random() * 4,
                height: 1,
                depth: 3 + Math.random() * 4
            },
            color: matProps.color,
            gravity: matProps.gravity,
            lifetime: matProps.lifetime.min + Math.floor(Math.random() * (matProps.lifetime.max - matProps.lifetime.min))
        });
    }
    
    plan.totalPieces = plan.wood.length + plan.leaves.length;
    
    return plan;
}

/**
 * Validate that a debris plan has realistic physics
 * Used for testing
 * 
 * @param {Object} plan - Debris plan from generate functions
 * @returns {Object} { valid: boolean, issues: string[] }
 */
function validateDebrisPlan(plan) {
    const issues = [];
    
    // Check total pieces
    if (plan.totalPieces === 0) {
        issues.push('No debris generated');
    }
    if (plan.totalPieces > 50) {
        issues.push(`Too many debris pieces: ${plan.totalPieces}`);
    }
    
    // Check velocities are reasonable
    const allDebris = [
        ...(plan.concrete || []),
        ...(plan.glass || []),
        ...(plan.dust || []),
        ...(plan.wood || []),
        ...(plan.leaves || [])
    ];
    
    for (const debris of allDebris) {
        const v = debris.velocity;
        const speed = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        
        if (speed > 50) {
            issues.push(`Debris velocity too high: ${speed.toFixed(1)}`);
        }
        // Only check velocity for non-dust particles (dust can have low velocity)
        if (speed < 0.1 && debris.gravity > 0.05) {
            issues.push(`Debris has near-zero velocity`);
        }
        
        // Check upward velocity exists (debris should go up initially, except dust which floats)
        if (v.y < 0 && debris.gravity > 0.05) {
            issues.push(`Debris starting with downward velocity`);
        }
    }
    
    // Check lifetimes
    for (const debris of allDebris) {
        if (debris.lifetime < 50) {
            issues.push(`Debris lifetime too short: ${debris.lifetime}`);
        }
        if (debris.lifetime > 1000) {
            issues.push(`Debris lifetime too long: ${debris.lifetime}`);
        }
    }
    
    return {
        valid: issues.length === 0,
        issues
    };
}

// ==========================================
// UNIFIED DEBRIS SYSTEM HELPERS
// ==========================================

/**
 * Debris size thresholds (in world units)
 */
const DEBRIS_SIZE_THRESHOLDS = {
    LARGE: 20,   // >= 20 units
    MEDIUM: 8,   // >= 8 units
    SMALL: 2,    // >= 2 units
    // < 2 units = tiny
};

/**
 * Classify debris based on its dimensions
 * @param {number} width 
 * @param {number} height 
 * @param {number} depth 
 * @returns {'large'|'medium'|'small'|'tiny'}
 */
function classifyDebrisSize(width, height, depth) {
    const maxDim = Math.max(width, height, depth);
    if (maxDim >= DEBRIS_SIZE_THRESHOLDS.LARGE) return 'large';
    if (maxDim >= DEBRIS_SIZE_THRESHOLDS.MEDIUM) return 'medium';
    if (maxDim >= DEBRIS_SIZE_THRESHOLDS.SMALL) return 'small';
    return 'tiny';
}

/**
 * Get collision properties based on debris size
 * @param {'large'|'medium'|'small'|'tiny'} size 
 * @returns {Object} Collision properties
 */
function getDebrisCollisionProps(size) {
    switch (size) {
        case 'large':
            return { 
                isCollidable: true, 
                canShatter: true, 
                canDestroyBuildings: true,
                speedReduction: 0.6,      // 40% speed loss
                pushForce: 1.5
            };
        case 'medium':
            return { 
                isCollidable: true, 
                canShatter: true, 
                canDestroyBuildings: true,
                speedReduction: 0.75,     // 25% speed loss
                pushForce: 1.0
            };
        case 'small':
            return { 
                isCollidable: true, 
                canShatter: true, 
                canDestroyBuildings: false,
                speedReduction: 0.9,      // 10% speed loss
                pushForce: 0.5
            };
        case 'tiny':
        default:
            return { 
                isCollidable: false, 
                canShatter: false, 
                canDestroyBuildings: false,
                speedReduction: 0.98,     // 2% speed loss
                pushForce: 0.1
            };
    }
}

/**
 * Calculate how many pieces debris should shatter into
 * @param {'large'|'medium'|'small'|'tiny'} debrisSize 
 * @param {number} impactSpeed 
 * @returns {number} Number of pieces
 */
function calculateShatterPieces(debrisSize, impactSpeed) {
    const baseCount = debrisSize === 'large' ? 8 : debrisSize === 'medium' ? 5 : 3;
    const speedBonus = Math.floor(impactSpeed / 20);
    return Math.min(12, baseCount + speedBonus);
}

/**
 * Check if debris should settle (become stationary)
 * @param {Object} velocity - {x, y, z}
 * @param {number} posY - Current Y position
 * @param {number} groundY - Ground level (usually half the debris height)
 * @returns {boolean}
 */
function shouldDebrisSettle(velocity, posY, groundY) {
    const SETTLE_VELOCITY_THRESHOLD = 0.5;
    const SETTLE_Y_THRESHOLD = 1.0;
    
    return Math.abs(velocity.x) < SETTLE_VELOCITY_THRESHOLD &&
           Math.abs(velocity.y) < SETTLE_VELOCITY_THRESHOLD &&
           Math.abs(velocity.z) < SETTLE_VELOCITY_THRESHOLD &&
           posY <= groundY + SETTLE_Y_THRESHOLD;
}

/**
 * Check if flying debris can damage a building chunk
 * @param {Object} debris - Debris with velocity and dimensions
 * @param {Object} buildingChunk - Building chunk userData
 * @returns {boolean}
 */
function canDebrisDamageBuilding(debris, buildingChunk) {
    // Building chunk must not already be hit
    if (buildingChunk.isHit) return false;
    
    // Calculate debris speed
    const speed = Math.sqrt(
        debris.velocity.x ** 2 + 
        debris.velocity.y ** 2 + 
        debris.velocity.z ** 2
    );
    
    // Get debris size
    const debrisSize = Math.max(debris.width, debris.height, debris.depth);
    
    // Thresholds
    const MIN_DAMAGE_SPEED = 15;
    const MIN_DAMAGE_SIZE = 8;
    
    return speed >= MIN_DAMAGE_SPEED && debrisSize >= MIN_DAMAGE_SIZE;
}

/**
 * Calculate collision response for vehicle hitting debris
 * @param {number} carSpeed - Vehicle speed
 * @param {'large'|'medium'|'small'|'tiny'} debrisSize - Size category
 * @param {number} debrisMass - Mass multiplier (default 1.0)
 * @returns {Object} Collision response data
 */
function calculateVehicleDebrisCollision(carSpeed, debrisSize, debrisMass = 1.0) {
    const props = getDebrisCollisionProps(debrisSize);
    
    // Push back force depends on debris mass
    const pushBackForce = debrisMass * props.pushForce;
    
    // Speed after collision
    const newSpeed = carSpeed * props.speedReduction;
    
    // Shatter threshold - high speed impacts break debris
    const SHATTER_THRESHOLD = 40;
    const shouldShatter = carSpeed > SHATTER_THRESHOLD && props.canShatter;
    
    // Screen shake based on impact
    const screenShake = Math.min(0.5, carSpeed / 80);
    
    return {
        pushBackForce,
        newSpeed,
        shouldShatter,
        screenShake,
        canDestroyBuildings: props.canDestroyBuildings
    };
}

// Export for both Node.js testing and browser usage
module.exports = {
    DEBRIS_MATERIALS,
    PHYSICS,
    DEBRIS_SIZE_THRESHOLDS,
    calculateDebrisCount,
    calculateDebrisVelocity,
    calculateRotationVelocity,
    calculateDebrisSize,
    generateBuildingDebrisPlan,
    generateTreeDebrisPlan,
    validateDebrisPlan,
    classifyDebrisSize,
    getDebrisCollisionProps,
    calculateShatterPieces,
    shouldDebrisSettle,
    canDebrisDamageBuilding,
    calculateVehicleDebrisCollision
};
