// Physics Engine encapsulating Cannon.js logic
import * as CANNON from 'cannon-es';

class PhysicsEngine {
    constructor() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0); // Standard gravity
        this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        this.world.allowSleep = true;
        this.world.solver.iterations = 10;

        // Materials
        this.materials = {
            ground: new CANNON.Material('ground'),
            car: new CANNON.Material('car'),
            obstacle: new CANNON.Material('obstacle'),
            debris: new CANNON.Material('debris')
        };
        
        // Contact materials
        const carGroundContact = new CANNON.ContactMaterial(
            this.materials.car, 
            this.materials.ground, 
            { friction: 0.3, restitution: 0.1 } // High friction for tires
        );
        this.world.addContactMaterial(carGroundContact);

        const carObstacleContact = new CANNON.ContactMaterial(
            this.materials.car, 
            this.materials.obstacle, 
            { friction: 0.5, restitution: 0.2 } // Bouncy but friction
        );
        this.world.addContactMaterial(carObstacleContact);

        // Bodies map to sync with visual meshes
        this.bodies = new Map(); // uuid -> CANNON.Body

        this.initGround();
    }

    initGround() {
        const groundBody = new CANNON.Body({
            mass: 0, // Static
            shape: new CANNON.Plane(),
            material: this.materials.ground
        });
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        this.world.addBody(groundBody);
    }

    // Add a physics body for a visual mesh
    addBody(mesh, type = 'box', options = {}) {
        if (!mesh) return null;

        const shape = this.createShape(mesh, type, options);
        if (!shape) return null;

        const body = new CANNON.Body({
            mass: options.mass || 0, // 0 = static
            position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z),
            material: this.materials[options.material] || this.materials.obstacle
        });

        body.addShape(shape);
        
        // Sync initial rotation
        body.quaternion.set(mesh.quaternion.x, mesh.quaternion.y, mesh.quaternion.z, mesh.quaternion.w);

        if (options.velocity) {
            body.velocity.copy(options.velocity);
        }

        body.userData = { mesh };

        this.world.addBody(body);
        this.bodies.set(mesh.uuid, body);
        
        // Return body for reference
        return body;
    }

    // Add a kinematic body (used for the player car driven by custom logic)
    addKinematicBody(mesh, type = 'box', options = {}) {
        const body = this.addBody(mesh, type, { ...options, mass: 0 });
        if (!body) return null;
        body.type = CANNON.Body.KINEMATIC;
        body.updateMassProperties();
        return body;
    }

    createShape(mesh, type, options) {
        // Use bounding box to determine size if not provided
        if (!options.size) {
            mesh.geometry.computeBoundingBox();
            const box = mesh.geometry.boundingBox;
            options.size = {
                width: box.max.x - box.min.x,
                height: box.max.y - box.min.y,
                depth: box.max.z - box.min.z
            };
        }

        switch (type) {
            case 'box':
                const halfExtents = new CANNON.Vec3(options.size.width / 2, options.size.height / 2, options.size.depth / 2);
                return new CANNON.Box(halfExtents);
            case 'sphere':
                return new CANNON.Sphere(Math.max(options.size.width, options.size.depth) / 2);
            case 'cylinder':
                return new CANNON.Cylinder(options.size.width / 2, options.size.width / 2, options.size.height, 8);
            default:
                return new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        }
    }

    removeBody(mesh) {
        if (!mesh || !this.bodies.has(mesh.uuid)) return;
        const body = this.bodies.get(mesh.uuid);
        this.world.removeBody(body);
        this.bodies.delete(mesh.uuid);
    }

    // Update a kinematic body's transform to match its mesh
    syncKinematicBody(mesh, velocity = null) {
        if (!mesh || !this.bodies.has(mesh.uuid)) return;
        const body = this.bodies.get(mesh.uuid);
        if (body.type !== CANNON.Body.KINEMATIC) return;

        body.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
        body.quaternion.set(mesh.quaternion.x, mesh.quaternion.y, mesh.quaternion.z, mesh.quaternion.w);
        if (velocity) {
            body.velocity.set(velocity.x || 0, velocity.y || 0, velocity.z || 0);
        }
    }

    applyImpulse(mesh, impulse) {
        if (!mesh || !this.bodies.has(mesh.uuid)) return;
        const body = this.bodies.get(mesh.uuid);
        const imp = new CANNON.Vec3(impulse.x || 0, impulse.y || 0, impulse.z || 0);
        body.applyImpulse(imp, body.position);
    }

    update(delta) {
        // Fixed time step recommended for physics
        this.world.step(1 / 60, delta, 3);

        // Sync visual meshes with physics bodies
        this.bodies.forEach((body) => {
            if (!body.userData || !body.userData.mesh) return;
            // Only sync dynamic bodies (kinematic is driven by game logic)
            if (body.type === CANNON.Body.KINEMATIC) return;
            const mesh = body.userData.mesh;
            mesh.position.set(body.position.x, body.position.y, body.position.z);
            mesh.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
        });
    }
    
    // Check if player collides with anything
    checkCollisions() {
        // Optional: hook into world.contacts if needed
    }
}

export const physicsWorld = new PhysicsEngine();
