
// Simulation of Player vs Police physics
// To calibrate "crazy" police values

console.log("=== PHYSICS SIMULATION ===");

// 1. Player Physics (from player.js)
// ----------------------------------
const player = {
    speed: 0,
    maxSpeed: 80,
    acceleration: 0.3,
    pos: 0
};

// Simulate Player 0 -> Max
let frames = 0;
while(player.speed < player.maxSpeed * 0.95) {
    player.speed = Math.min(player.speed + player.acceleration, player.maxSpeed);
    player.pos += player.speed;
    frames++;
}
console.log(`PLAYER Stats:`);
console.log(`- Max Speed (units/frame): ${player.maxSpeed}`);
console.log(`- Time to 95% Max Speed: ${frames} frames (${(frames/60).toFixed(2)}s)`);
console.log(`- Dist covered: ${player.pos.toFixed(0)}`);
console.log("");

// 2. Police Physics (Current Implementation)
// ------------------------------------------
const enemies = {
    standard: { speed: 250 }
};

const police = {
    currentSpeed: 0, // km/h (internal var)
    targetSpeed: 250, // km/h (base config)
    pos: 0
};

// Logic from my recent fix
// accelRate = 5 * delta
// move = (currentSpeed / 3.6) * delta
const policeAccelRate = 5; 

frames = 0;
police.currentSpeed = 0;
police.pos = 0;

while(police.currentSpeed < police.targetSpeed * 0.95) {
    if (police.currentSpeed < police.targetSpeed) {
        police.currentSpeed = Math.min(police.currentSpeed + policeAccelRate, police.targetSpeed);
    }
    const move = police.currentSpeed / 3.6;
    police.pos += move;
    frames++;
}

console.log(`POLICE (Current) Stats:`);
const topSpeedUnits = police.targetSpeed / 3.6;
console.log(`- Top Speed (units/frame): ${topSpeedUnits.toFixed(2)} (Player is ${player.maxSpeed})`);
console.log(`- Time to 95% speed: ${frames} frames (${(frames/60).toFixed(2)}s)`);
console.log(`  (Player takes ${(player.maxSpeed / player.acceleration).toFixed(0)} frames)`);
console.log(`- Accel Factor vs Player: ${((topSpeedUnits/frames) / (player.maxSpeed/(player.maxSpeed/player.acceleration))).toFixed(2)}x`);
console.log("");

// 3. Tuning
// --------------------
// We want Police to accelerate similar to player or slightly better, not 5x better.
// Player 0-80 in 266 frames.
// Police 0-69 in ? frames.
// If we want Police to take ~200 frames (3.3s) to reach top speed.
// Target Speed (km/h internal) = 250.
// Accel per frame needed = 250 / 200 = 1.25.

console.log("=== TUNING PROPOSAL ===");
const proposedAccel = 1.2; 
const proposedBrake = 3.0;

frames = 0;
police.currentSpeed = 0;
police.pos = 0;
while(police.currentSpeed < police.targetSpeed * 0.95) {
    police.currentSpeed = Math.min(police.currentSpeed + proposedAccel, police.targetSpeed);
    const move = police.currentSpeed / 3.6;
    police.pos += move;
    frames++;
}
console.log(`POLICE (Proposed Accel ${proposedAccel}) Stats:`);
console.log(`- Time to 95% speed: ${frames} frames (${(frames/60).toFixed(2)}s)`);
console.log(`- Compare to Player: ${(player.maxSpeed / player.acceleration).toFixed(0)} frames`);

