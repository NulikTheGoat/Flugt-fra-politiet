
import { SheriffAI } from './sheriff_temp.mjs';
import assert from 'assert';

console.log("Testing SheriffAI...");

// Mock inputs
const policeCar = {};
const delta = 1;

// Case 1: Too Close (should slow down)
let distance = 300; // Optimal is 400, buffer 50. 300 < 350.
let result = SheriffAI.updateBehavior(policeCar, distance, 100, false, delta);
console.log(`Distance ${distance}: Speed Mult ${result.speedMultiplier}`);
assert.strictEqual(result.speedMultiplier, 0.5, "Should slow down when too close");
assert.strictEqual(result.targetDirectionOffset, 0, "No turn offset when just too close");

// Case 2: Too Close & Very Close (should steer away)
distance = 150; // < 200
result = SheriffAI.updateBehavior(policeCar, distance, 100, false, delta);
console.log(`Distance ${distance} (Very Close): TargetOffset ${result.targetDirectionOffset}`);
assert.strictEqual(result.speedMultiplier, 0.5, "Should slow down when very close");
assert.strictEqual(result.targetDirectionOffset, Math.PI, "Should turn away when very close");

// Case 3: Too Far (should speed up)
distance = 500; // > 450
result = SheriffAI.updateBehavior(policeCar, distance, 100, false, delta);
console.log(`Distance ${distance}: Speed Mult ${result.speedMultiplier}`);
assert.strictEqual(result.speedMultiplier, 1.1, "Should speed up when too far");

// Case 4: Sweet Spot (should return default mult, but calculateTargetSpeed should return value)
distance = 400; // Exact optimal
result = SheriffAI.updateBehavior(policeCar, distance, 100, false, delta);
console.log(`Distance ${distance}: Speed Mult ${result.speedMultiplier}`);
assert.strictEqual(result.speedMultiplier, 1.0, "Should use normal speed mul in sweet spot");

const targetSpeed = SheriffAI.calculateTargetSpeed(distance, 100); // 100 m/s?? Game uses units. 
// Note: playerSpeed in game is units/frame approx? No, passed as km/h or similar? 
// In police.js call: SheriffAI.updateBehavior(..., gameState.speed * 3.6, ...)
// calculateTargetSpeed(distance, gameState.speed) <- Raw speed.
// Inside calculateBehavior: let targetSpeed = Math.abs(playerSpeed * 3.6);
// So passed input is raw units.
// Let's assume input 50 units.
const rawSpeed = 50;
const expectedSpeedKmh = 50 * 3.6; // 180
const calculated = SheriffAI.calculateTargetSpeed(distance, rawSpeed);
console.log(`Target Speed for raw ${rawSpeed}: ${calculated}`);
assert.strictEqual(calculated, 180, "Should match player speed in km/h");

console.log("✅ All SheriffAI tests passed!");
