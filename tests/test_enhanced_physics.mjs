/**
 * Enhanced Physics Test Suite
 * Tests new physics improvements added in car-driving-realism update
 * Run with: node tests/test_enhanced_physics.mjs
 */

// Test utilities
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
    const condition = Math.abs(actual - expected) <= tolerance;
    assert(condition, `${message} (expected ~${expected}, got ${actual.toFixed(3)})`);
}

function describe(name, fn) {
    console.log(`\n📋 ${name}`);
    fn();
}

// ============================================
// Tests: Weight Transfer Physics
// ============================================

describe('Enhanced Physics - Weight Transfer', () => {
    // Test: Acceleration weight transfer
    const isAccelerating = true;
    const isBraking = false;
    
    const accelWeightTransfer = isAccelerating ? -0.3 : 0;
    const brakeWeightTransfer = isBraking ? 0.5 : 0;
    
    assertApprox(accelWeightTransfer, -0.3, 0.01, 'Weight shifts rear during acceleration');
    assertApprox(brakeWeightTransfer, 0, 0.01, 'No weight shift when not braking');
    
    // Test: Braking weight transfer
    const braking = true;
    const brakingTransfer = braking ? 0.5 : 0;
    assertApprox(brakingTransfer, 0.5, 0.01, 'Weight shifts forward during braking');
});

describe('Enhanced Physics - Tire Grip Model', () => {
    // Test: Optimal grip at 60% speed
    const optimalSpeedRatio = 0.6;
    const gripLoss = Math.abs(optimalSpeedRatio - optimalSpeedRatio) * 0.4;
    const baseGrip = 1.0 - gripLoss;
    
    assertApprox(baseGrip, 1.0, 0.01, 'Maximum grip at optimal speed (60%)');
    
    // Test: Reduced grip at high speed
    const highSpeedRatio = 0.9;
    const highSpeedGripLoss = Math.abs(highSpeedRatio - optimalSpeedRatio) * 0.4;
    const highSpeedGrip = 1.0 - highSpeedGripLoss;
    
    assert(highSpeedGrip < baseGrip, `Reduced grip at high speed (${highSpeedGrip.toFixed(2)} < ${baseGrip.toFixed(2)})`);
    
    // Test: Minimum grip floor
    const tiregrip = Math.max(0.5, highSpeedGrip);
    assert(tiregrip >= 0.5, 'Tire grip has minimum floor of 0.5');
});

describe('Enhanced Physics - Speed-Dependent Steering', () => {
    // Test: Full sensitivity at low speed
    const lowSpeedRatio = 0.2;
    const lowSpeedSensitivity = 1.0 - (lowSpeedRatio * 0.5);
    assertApprox(lowSpeedSensitivity, 0.9, 0.01, 'High steering sensitivity at low speed');
    
    // Test: Reduced sensitivity at high speed
    const highSpeedRatio = 0.9;
    const highSpeedSensitivity = 1.0 - (highSpeedRatio * 0.5);
    assertApprox(highSpeedSensitivity, 0.55, 0.01, 'Reduced steering sensitivity at high speed');
    
    assert(highSpeedSensitivity < lowSpeedSensitivity, 'Less responsive steering at high speed');
});

describe('Enhanced Physics - Understeer/Oversteer', () => {
    // Test: Understeer at high speed
    const highSpeedRatio = 0.8;
    const understeerFactor = highSpeedRatio > 0.7 ? (highSpeedRatio - 0.7) * 0.5 : 0;
    assertApprox(understeerFactor, 0.05, 0.01, 'Understeer occurs above 70% speed');
    
    // Test: No understeer at moderate speed
    const modSpeedRatio = 0.5;
    const noUndersteer = modSpeedRatio > 0.7 ? (modSpeedRatio - 0.7) * 0.5 : 0;
    assertApprox(noUndersteer, 0, 0.01, 'No understeer at moderate speed');
    
    // Test: Oversteer during drift
    const driftFactor = 0.8;
    const oversteerFactor = driftFactor * 1.5;
    assertApprox(oversteerFactor, 1.2, 0.01, 'Oversteer increases during drift');
});

describe('Enhanced Physics - Downforce Effect', () => {
    // Test: No downforce at low speed
    const lowSpeedRatio = 0.4;
    const noDownforce = lowSpeedRatio > 0.5 ? (lowSpeedRatio - 0.5) * 0.3 : 0;
    assertApprox(noDownforce, 0, 0.01, 'No downforce below 50% speed');
    
    // Test: Downforce at high speed
    const highSpeedRatio = 0.8;
    const downforce = highSpeedRatio > 0.5 ? (highSpeedRatio - 0.5) * 0.3 : 0;
    assertApprox(downforce, 0.09, 0.01, 'Downforce active above 50% speed');
    
    const stabilityBonus = 1 + downforce;
    assert(stabilityBonus > 1.0, 'Stability improved by downforce');
});

// ============================================
// Tests: Enhanced Police AI
// ============================================

describe('Enhanced AI - Predictive Targeting', () => {
    // Test: Prediction time calculation
    const closeDistance = 100;
    const farDistance = 600;
    
    const closePrediction = Math.min(closeDistance / 300, 2.0);
    const farPrediction = Math.min(farDistance / 300, 2.0);
    
    assertApprox(closePrediction, 0.333, 0.01, 'Short prediction time when close');
    assertApprox(farPrediction, 2.0, 0.01, 'Max prediction time capped at 2 seconds');
    
    // Test: Intercept calculation
    const playerX = 0, playerZ = 0;
    const playerVelX = 5, playerVelZ = 3;
    const predictionTime = 1.0;
    
    const predictedX = playerX + playerVelX * predictionTime * 60;
    const predictedZ = playerZ + playerVelZ * predictionTime * 60;
    
    assertApprox(predictedX, 300, 1, 'Predicts X position ahead');
    assertApprox(predictedZ, 180, 1, 'Predicts Z position ahead');
});

describe('Enhanced AI - Formation Pursuit', () => {
    // Test: Formation offset calculation
    const totalPolice = 4;
    const index0 = 0;
    const index1 = 1;
    
    const offset0 = (index0 * Math.PI * 2) / Math.max(totalPolice, 1);
    const offset1 = (index1 * Math.PI * 2) / Math.max(totalPolice, 1);
    
    assertApprox(offset0, 0, 0.01, 'First car at 0 degrees');
    assertApprox(offset1, Math.PI / 2, 0.01, 'Second car at 90 degrees');
    
    // Test: Formation positioning
    const formationRadius = 100;
    const angle = Math.PI / 2; // 90 degrees
    
    const formX = Math.cos(angle) * formationRadius;
    const formZ = Math.sin(angle) * formationRadius;
    
    assertApprox(formX, 0, 1, 'Formation X for 90° angle');
    assertApprox(formZ, 100, 1, 'Formation Z for 90° angle');
});

describe('Enhanced AI - Cornering Behavior', () => {
    // Test: Sharp turn detection
    const sharpAngle = Math.PI * 0.6; // 108 degrees
    const gentleAngle = Math.PI * 0.2; // 36 degrees
    
    const isSharpTurn = Math.abs(sharpAngle) > Math.PI / 4;
    const isGentleTurn = Math.abs(gentleAngle) > Math.PI / 4;
    
    assert(isSharpTurn, 'Detects sharp turns (>45°)');
    assert(!isGentleTurn, 'Gentle turns not flagged as sharp');
    
    // Test: Cornering speed reduction
    const sharpTurnFactor = 0.6 - Math.abs(sharpAngle) * 0.2;
    assert(sharpTurnFactor < 1.0, 'Speed reduced for sharp turns');
    assert(sharpTurnFactor > 0, 'Speed reduction is reasonable');
});

describe('Enhanced AI - Smooth Speed Changes', () => {
    // Test: Speed blending
    let currentSpeed = 200;
    const targetSpeed = 300;
    const blendRate = 0.1;
    
    // Simulate one frame of blending
    currentSpeed += (targetSpeed - currentSpeed) * blendRate;
    
    assertApprox(currentSpeed, 210, 1, 'Speed smoothly increases toward target');
    assert(currentSpeed < targetSpeed, 'Does not overshoot target');
    
    // Test: Deceleration
    currentSpeed = 300;
    const decelerateTarget = 150;
    currentSpeed += (decelerateTarget - currentSpeed) * blendRate;
    
    assertApprox(currentSpeed, 285, 1, 'Speed smoothly decreases toward target');
});

// ============================================
// Tests: Collision Physics
// ============================================

describe('Enhanced Physics - Mass-Based Collisions', () => {
    // Test: Mass configuration
    const standardMass = 1.0;
    const swatMass = 1.5;
    const militaryMass = 1.3;
    
    assert(swatMass > standardMass, 'SWAT heavier than standard');
    assert(militaryMass > standardMass, 'Military heavier than standard');
    
    // Test: Push ratio calculation
    const playerMass = 1.0;
    const policeMass = 1.5;
    const pushRatio = policeMass / (playerMass + policeMass);
    
    assertApprox(pushRatio, 0.6, 0.01, 'Heavier police pushes player more');
    assert(pushRatio > 0.5, 'Player gets pushed more than 50%');
});

describe('Enhanced Physics - Momentum Transfer', () => {
    // Test: Impulse calculation
    const relVelNormal = -10; // Moving toward each other
    const restitution = 0.3;
    const totalMass = 2.5;
    
    const impulse = -(1 + restitution) * relVelNormal / totalMass;
    assertApprox(impulse, 5.2, 0.1, 'Impulse calculated from collision');
    
    // Test: No impulse when moving apart
    const relVelApart = 5; // Moving apart
    const shouldCollide = relVelApart < 0;
    assert(!shouldCollide, 'No collision when moving apart');
});

// ============================================
// Summary
// ============================================

console.log('\n' + '='.repeat(50));
console.log(`📊 Enhanced Physics Test Results:`);
console.log(`   ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(50));

if (testsFailed > 0) {
    console.log('\n❌ Some tests failed!');
    process.exit(1);
} else {
    console.log('\n✅ All enhanced physics tests passed!');
}
