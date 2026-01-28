import * as CANNON from 'cannon-es';
import { GRAVITY } from './constants.js';

// Debris collision damage constants
export const DEBRIS_DAMAGE = {
    MIN_IMPACT_VELOCITY: 8,      // Minimum velocity to cause damage
    PLAYER_DAMAGE_MULT: 0.5,     // Damage multiplier for player
    POLICE_DAMAGE_MULT: 0.8,     // Damage multiplier for police
    BUILDING_DAMAGE_MULT: 0.3,   // Damage multiplier for buildings
    MASS_DAMAGE_FACTOR: 0.1,     // How much mass contributes to damage
    VELOCITY_DAMAGE_FACTOR: 0.2, // How much velocity contributes to damage
    MIN_DAMAGE: 2,               // Minimum damage dealt
    MAX_DAMAGE: 50,              // Cap damage per hit
    HIT_COOLDOWN: 500,           // ms between hits from same debris
};

class PhysicsWorld {
    constructor() {
        this.world = new CANNON.World({
            gravity: new CANNON.Vec3(0, GRAVITY, 0),
        });

        // Optimization: Broadphase
        this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        this.world.allowSleep = true;
        
        // More solver iterations for accurate stacking/collisions
        this.world.solver.iterations = 10;
        
        // Higher body limit for persistent debris
        this.MAX_BODIES = 1000;
        
        // Collision callbacks - set externally
        this.onDebrisHitPlayer = null;
        this.onDebrisHitPolice = null;
        this.onDebrisHitBuilding = null;

        // Materials
        this.defaultMaterial = new CANNON.Material('default');
        this.groundMaterial = new CANNON.Material('ground');
        
        // Contact Materials
        const groundContact = new CANNON.ContactMaterial(
            this.groundMaterial, 
            this.defaultMaterial, 
            {
                friction: 0.5,
                restitution: 0.2 // Not too bouncy
            }
        );
        this.world.addContactMaterial(groundContact);
        
        // Default-to-default for debris-to-debris collisions
        const defaultContact = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0.4,
                restitution: 0.1
            }
        );
        this.world.addContactMaterial(defaultContact);
        
        // Set world default material so all bodies collide with ground
        this.world.defaultContactMaterial = new CANNON.ContactMaterial(
            this.groundMaterial,
            this.defaultMaterial,
            { friction: 0.5, restitution: 0.15 }
        );

        // Debug
        this.bodies = [];
        this.meshes = [];
        
        // Collision tracking to prevent spam
        this.recentHits = new Map(); // bodyId -> lastHitTime
    }

    /**
     * Calculate damage from debris impact
     * @param {CANNON.Body} body The debris body
     * @param {number} impactVelocity Speed at impact
     * @returns {number} Damage amount
     */
    calculateDebrisDamage(body, impactVelocity) {
        if (impactVelocity < DEBRIS_DAMAGE.MIN_IMPACT_VELOCITY) return 0;
        
        const mass = body.mass || 1;
        const damage = (mass * DEBRIS_DAMAGE.MASS_DAMAGE_FACTOR + 
                       impactVelocity * DEBRIS_DAMAGE.VELOCITY_DAMAGE_FACTOR);
        
        return Math.min(DEBRIS_DAMAGE.MAX_DAMAGE, 
                       Math.max(DEBRIS_DAMAGE.MIN_DAMAGE, Math.floor(damage)));
    }

    /**
     * Check if a debris body can hit a target (cooldown check)
     * @param {number} bodyId 
     * @returns {boolean}
     */
    canDebrisHit(bodyId) {
        const now = Date.now();
        const lastHit = this.recentHits.get(bodyId);
        if (lastHit && now - lastHit < DEBRIS_DAMAGE.HIT_COOLDOWN) {
            return false;
        }
        this.recentHits.set(bodyId, now);
        return true;
    }

    /**
     * Check debris collisions against game objects
     * Call this from main game loop
     * @param {THREE.Vector3} playerPos Player position
     * @param {Array} policeCars Array of police car meshes
     * @param {Object} chunkGrid Chunk grid map (optional)
     * @param {number} chunkGridSize Grid size (optional)
     */
    checkDebrisCollisions(playerPos, policeCars, chunkGrid, chunkGridSize = 200) {
        const PLAYER_RADIUS = 8;  // Collision radius for player
        const POLICE_RADIUS = 6;  // Collision radius for police
        const BUILDING_RADIUS = 10; // Collision radius for buildings
        const SEARCH_RADIUS = 1;
        
        for (let i = 0; i < this.bodies.length; i++) {
            const body = this.bodies[i];
            if (!body || body.sleepState === CANNON.Body.SLEEPING) continue;
            
            // Get velocity magnitude
            const vel = body.velocity;
            const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z);
            if (speed < DEBRIS_DAMAGE.MIN_IMPACT_VELOCITY) continue;
            
            const pos = body.position;
            
            // Check player collision
            if (playerPos && this.onDebrisHitPlayer) {
                const dx = pos.x - playerPos.x;
                const dy = pos.y - playerPos.y;
                const dz = pos.z - playerPos.z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (dist < PLAYER_RADIUS && this.canDebrisHit(body.id)) {
                    const damage = this.calculateDebrisDamage(body, speed) * DEBRIS_DAMAGE.PLAYER_DAMAGE_MULT;
                    if (damage > 0) {
                        this.onDebrisHitPlayer(Math.floor(damage), body, this.meshes[i]);
                    }
                }
            }
            
            // Check police collisions
            if (policeCars && this.onDebrisHitPolice) {
                for (const police of policeCars) {
                    if (!police || !police.position) continue;
                    
                    const dx = pos.x - police.position.x;
                    const dy = pos.y - (police.position.y || 0);
                    const dz = pos.z - police.position.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    
                    if (dist < POLICE_RADIUS && this.canDebrisHit(body.id + '_' + police.uuid)) {
                        const damage = this.calculateDebrisDamage(body, speed) * DEBRIS_DAMAGE.POLICE_DAMAGE_MULT;
                        if (damage > 0) {
                            this.onDebrisHitPolice(Math.floor(damage), police, body, this.meshes[i]);
                        }
                    }
                }
            }
            
            // Check building chunk collisions
            if (chunkGrid && this.onDebrisHitBuilding) {
                const buildingChunks = this.getNearbyBuildingChunks(pos, chunkGrid, chunkGridSize, SEARCH_RADIUS);
                for (const chunk of buildingChunks) {
                    if (!chunk || !chunk.position || chunk.userData?.isHit) continue;
                    
                    const dx = pos.x - chunk.position.x;
                    const dy = pos.y - chunk.position.y;
                    const dz = pos.z - chunk.position.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    
                    if (dist < BUILDING_RADIUS && this.canDebrisHit(body.id + '_bld_' + chunk.uuid)) {
                        const damage = this.calculateDebrisDamage(body, speed) * DEBRIS_DAMAGE.BUILDING_DAMAGE_MULT;
                        if (damage > 0) {
                            this.onDebrisHitBuilding(Math.floor(damage), chunk, body, this.meshes[i]);
                        }
                    }
                }
            }
        }
        
        // Cleanup old hit records (every 100 calls)
        if (Math.random() < 0.01) {
            const now = Date.now();
            for (const [key, time] of this.recentHits) {
                if (now - time > DEBRIS_DAMAGE.HIT_COOLDOWN * 2) {
                    this.recentHits.delete(key);
                }
            }
        }
    }

    /**
     * Get nearby building chunks from the chunk grid
     * @param {CANNON.Vec3} position
     * @param {Object} chunkGrid
     * @param {number} gridSize
     * @param {number} searchRadius
     * @returns {Array}
     */
    getNearbyBuildingChunks(position, chunkGrid, gridSize, searchRadius) {
        const chunks = [];
        const centerGx = Math.floor(position.x / gridSize);
        const centerGz = Math.floor(position.z / gridSize);

        for (let dx = -searchRadius; dx <= searchRadius; dx++) {
            for (let dz = -searchRadius; dz <= searchRadius; dz++) {
                const key = `${centerGx + dx},${centerGz + dz}`;
                const gridChunks = chunkGrid[key];
                if (gridChunks) {
                    for (const chunk of gridChunks) {
                        if (chunk && !chunk.userData?.isHit) {
                            chunks.push(chunk);
                        }
                    }
                }
            }
        }

        return chunks;
    }

    init() {
        // Create a ground plane
        const groundShape = new CANNON.Plane();
        const groundBody = new CANNON.Body({ mass: 0, material: this.groundMaterial });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate to be flat X-Z
        this.world.addBody(groundBody);
        console.log('[Physics] World initialized');
    }

    /**
     * Step the physics simulation
     * @param {number} dt Delta time in seconds
     */
    update(dt) {
        // Limit max substeps to avoid spiral of death
        // Fixed time step is critical for stable physics
        this.world.fixedStep(1 / 60, dt, 3);

        // Sync visual meshes
        for (let i = 0; i < this.meshes.length; i++) {
            const mesh = this.meshes[i];
            const body = this.bodies[i];
            
            if (body && mesh) {
                mesh.position.copy(body.position);
                mesh.quaternion.copy(body.quaternion);
            }
        }
    }

    /**
     * Add an object to the physics world
     * @param {THREE.Mesh} mesh Visual mesh
     * @param {CANNON.Body} body Physics body
     */
    add(mesh, body) {
        // Enforce body limit - remove oldest sleeping body if at cap
        if (this.bodies.length >= this.MAX_BODIES) {
            for (let i = 0; i < this.bodies.length; i++) {
                if (this.bodies[i].sleepState === CANNON.Body.SLEEPING) {
                    this.remove(this.meshes[i]);
                    break;
                }
            }
        }
        
        // Configure sleep thresholds for realism
        body.sleepSpeedLimit = 0.1;  // Very slow before sleeping
        body.sleepTimeLimit = 2.0;   // Must be still for 2 seconds
        
        this.world.addBody(body);
        
        if (mesh) {
            // Keep track for syncing
            this.bodies.push(body);
            this.meshes.push(mesh);
            
            // Link them for reference
            mesh.userData.physicsBody = body;
            body.userData = { meshUuid: mesh.uuid };
        }
    }

    reset() {
        // Remove all bodies except ground (which is body 0 usually)
        // Actually, safer to clear everything and re-init ground or keep ground valid
        
        // Remove all dynamic bodies
        for(let i = this.world.bodies.length - 1; i >= 0; i--){
             const b = this.world.bodies[i];
             // If mass > 0, it's dynamic. If mass 0, it's static (ground)
             if(b.mass > 0) {
                 this.world.removeBody(b);
             }
        }
        
        this.bodies = [];
        this.meshes = [];
        console.log('[Physics] World reset');
    }

    remove(mesh) {
        if (!mesh || !mesh.userData.physicsBody) return;
        
        const body = mesh.userData.physicsBody;
        this.world.removeBody(body);
        
        const index = this.meshes.indexOf(mesh);
        if (index !== -1) {
            this.meshes.splice(index, 1);
            this.bodies.splice(index, 1);
        }
        
        mesh.userData.physicsBody = null;
    }
}

export const physicsWorld = new PhysicsWorld();