import { sharedGeometries, sharedMaterials } from './assets.js';

// Reusable geometry cache to prevent memory leaks and improve performance
const carGeometries = {
    // Formula 1
    f1Nose: new THREE.BoxGeometry(6, 6, 45),
    f1Cockpit: new THREE.BoxGeometry(7, 4, 15),
    f1SidePod: new THREE.BoxGeometry(6, 6, 20),
    f1FrontWing: new THREE.BoxGeometry(24, 1, 5),
    f1RearWing: new THREE.BoxGeometry(18, 1, 6),
    f1RearSupport: new THREE.BoxGeometry(1, 8, 4),
    f1Head: new THREE.SphereGeometry(2, 16, 16),
    f1Wheel: new THREE.CylinderGeometry(4.5, 4.5, 7, 24),

    // Monster Truck
    mtCab: new THREE.BoxGeometry(18, 10, 16),
    mtBed: new THREE.BoxGeometry(18, 6, 18),
    mtHood: new THREE.BoxGeometry(18, 7, 14),
    mtRollBar: new THREE.BoxGeometry(16, 8, 2),
    mtFrame: new THREE.BoxGeometry(10, 4, 30),
    mtWheel: new THREE.CylinderGeometry(8, 8, 10, 24),
    mtStrut: new THREE.CylinderGeometry(1, 1, 6, 8),

    // Buggy
    buggyFloor: new THREE.BoxGeometry(14, 2, 30),
    buggyPost: new THREE.BoxGeometry(1, 12, 1),
    buggyRoof: new THREE.BoxGeometry(12, 1, 12),
    buggyEngine: new THREE.BoxGeometry(8, 6, 6),
    buggyWheel: new THREE.CylinderGeometry(4, 4, 4, 16),

    // Hot Rod
    hrCabin: new THREE.BoxGeometry(14, 10, 14),
    hrNose: new THREE.BoxGeometry(10, 8, 20),
    hrEngine: new THREE.BoxGeometry(6, 6, 12),
    hrPipe: new THREE.CylinderGeometry(0.5, 0.5, 6, 8),
    hrWheelFront: new THREE.CylinderGeometry(3, 3, 3, 16),
    hrWheelRear: new THREE.CylinderGeometry(6, 6, 10, 16),

    // Pickup
    puCab: new THREE.BoxGeometry(18, 11, 18),
    puBed: new THREE.BoxGeometry(18, 5, 20),
    puRailFront: new THREE.BoxGeometry(18, 5, 2),
    puRailSide: new THREE.BoxGeometry(2, 4, 18),
    puTailGate: new THREE.BoxGeometry(18, 5, 1),
    puHood: new THREE.BoxGeometry(18, 6, 12),

    // Rally
    rallyBody: new THREE.BoxGeometry(18, 10, 36),
    rallyRoof: new THREE.BoxGeometry(16, 6, 18),
    rallySpoiler: new THREE.BoxGeometry(16, 1, 4),
    rallyFlap: new THREE.BoxGeometry(4, 4, 0.5),
    rallyLightPod: new THREE.BoxGeometry(8, 2, 2),
    rallyLightScale: new THREE.SphereGeometry(1, 8, 8),

    // Shared / Generic
    headlight: new THREE.BoxGeometry(3, 2, 1),
    taillight: new THREE.BoxGeometry(3, 2, 1)
};

// Reusable standard materials
const materials = {
    dark: new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5, metalness: 0.2 }),
    tire: new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }),
    chrome: new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2 }),
    pipe: new THREE.MeshStandardMaterial({ color: 0xffaa00, metalness: 0.8 }),
    strut: new THREE.MeshStandardMaterial({ color: 0xAAAAAA }),
    flap: new THREE.MeshBasicMaterial({ color: 0xcc3333 }),
    lightWhite: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    headlight: new THREE.MeshBasicMaterial({ color: 0xfff6d5 }),
    taillight: new THREE.MeshBasicMaterial({ color: 0xff2a2a })
};

/**
 * Creates headlights and taillights for a vehicle
 */
export function makeCarLights(carGroup, opts = {}) {
    const {
        headlightColor = 0xfff6d5,
        taillightColor = 0xff2a2a,
        y = 10,
        zFront = 23,
        zRear = -23,
        x = 8
    } = opts;

    // Use shared or custom materials
    const headMat = (headlightColor === 0xfff6d5) ? materials.headlight : new THREE.MeshBasicMaterial({ color: headlightColor });
    const tailMat = (taillightColor === 0xff2a2a) ? materials.taillight : new THREE.MeshBasicMaterial({ color: taillightColor });
    
    // Use shared geometries
    const headGeo = carGeometries.headlight;
    const tailGeo = carGeometries.taillight;

    const headlights = [];
    const taillights = [];

    [-x, x].forEach((lx) => {
        const h = new THREE.Mesh(headGeo, headMat);
        h.position.set(lx, y, zFront);
        h.name = 'headlight';
        carGroup.add(h);
        headlights.push(h);

        const t = new THREE.Mesh(tailGeo, tailMat);
        t.position.set(lx, y, zRear);
        t.name = 'taillight';
        carGroup.add(t);
        taillights.push(t);
    });

    // Append to existing arrays if they exist (for complex groups)
    if (!carGroup.userData.headlights) carGroup.userData.headlights = [];
    if (!carGroup.userData.taillights) carGroup.userData.taillights = [];
    
    carGroup.userData.headlights.push(...headlights);
    carGroup.userData.taillights.push(...taillights);
}

/**
 * Builders for specific car types
 */
export const CarBuilders = {
    formula: (chassis, carGroup, color) => {
        const bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.2, metalness: 0.6 });

        const nose = new THREE.Mesh(carGeometries.f1Nose, bodyMat);
        nose.position.y = 4; nose.castShadow = true; chassis.add(nose);

        const cockpit = new THREE.Mesh(carGeometries.f1Cockpit, bodyMat);
        cockpit.position.set(0, 8, -5); chassis.add(cockpit);

        const sidePodGeo = carGeometries.f1SidePod;
        const leftPod = new THREE.Mesh(sidePodGeo, bodyMat); leftPod.position.set(-8, 4, -5); chassis.add(leftPod);
        const rightPod = new THREE.Mesh(sidePodGeo, bodyMat); rightPod.position.set(8, 4, -5); chassis.add(rightPod);

        const fWing = new THREE.Mesh(carGeometries.f1FrontWing, bodyMat); fWing.position.set(0, 2, 24); chassis.add(fWing);
        const rWing = new THREE.Mesh(carGeometries.f1RearWing, bodyMat); rWing.position.set(0, 12, -22); chassis.add(rWing);
        
        const rSupport1 = new THREE.Mesh(carGeometries.f1RearSupport, materials.dark); rSupport1.position.set(-5, 8, -22); chassis.add(rSupport1);
        const rSupport2 = rSupport1.clone(); rSupport2.position.set(5, 8, -22); chassis.add(rSupport2);

        const head = new THREE.Mesh(carGeometries.f1Head, new THREE.MeshStandardMaterial({ color: 0xffd700 }));
        head.position.set(0, 8, -5); chassis.add(head);

        const wheelGeo = carGeometries.f1Wheel;
        const wheelMat = materials.tire;
        carGroup.userData.wheels = []; carGroup.userData.steerWheels = [];
        [
            { x: -12, y: 4.5, z: 15 }, { x: 12, y: 4.5, z: 15 },
            { x: -12, y: 4.5, z: -18 }, { x: 12, y: 4.5, z: -18 }
        ].forEach((pos, i) => {
             const w = new THREE.Mesh(wheelGeo, wheelMat);
             w.rotation.z = Math.PI/2; w.position.set(pos.x, pos.y, pos.z);
             carGroup.userData.wheels.push(w);
             if (i < 2) carGroup.userData.steerWheels.push(w);
             carGroup.add(w);
        });
    },

    monstertruck: (chassis, carGroup, color) => {
        const bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.5 });
        
        const cab = new THREE.Mesh(carGeometries.mtCab, bodyMat); cab.position.set(0, 20, -5); cab.castShadow = true; chassis.add(cab);
        const bed = new THREE.Mesh(carGeometries.mtBed, bodyMat); bed.position.set(0, 18, -22); bed.castShadow = true; chassis.add(bed);
        const hood = new THREE.Mesh(carGeometries.mtHood, bodyMat); hood.position.set(0, 18.5, 10); hood.castShadow = true; chassis.add(hood);
        
        const rollBarBox = new THREE.Mesh(carGeometries.mtRollBar, materials.tire);
        rollBarBox.position.set(0, 24, -14); chassis.add(rollBarBox);

        const frame = new THREE.Mesh(carGeometries.mtFrame, materials.dark);
        frame.position.set(0, 12, 0); chassis.add(frame);

        const wheelGeo = carGeometries.mtWheel;
        const wheelMat = materials.tire;
        carGroup.userData.wheels = []; carGroup.userData.steerWheels = [];
        [
            { x: -14, y: 8, z: 12 }, { x: 14, y: 8, z: 12 },
            { x: -14, y: 8, z: -12 }, { x: 14, y: 8, z: -12 }
        ].forEach((pos, i) => {
             const w = new THREE.Mesh(wheelGeo, wheelMat);
             w.rotation.z = Math.PI/2; w.position.set(pos.x, pos.y, pos.z);
             
             const strutV = new THREE.Mesh(carGeometries.mtStrut, materials.strut);
             strutV.position.set(pos.x * 0.6, 12, pos.z);
             strutV.rotation.z = (pos.x > 0 ? -1 : 1) * 0.5;
             chassis.add(strutV);

             carGroup.userData.wheels.push(w);
             if (i < 2) carGroup.userData.steerWheels.push(w);
             carGroup.add(w);
        });
        makeCarLights(chassis, { y: 20, zFront: 18, zRear: -32, x: 7 });
    },

    buggy: (chassis, carGroup, color) => {
        const tubeMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.6 });
        const floor = new THREE.Mesh(carGeometries.buggyFloor, materials.dark);
        floor.position.y = 4; chassis.add(floor);

        const postGeo = carGeometries.buggyPost;
        [
            [-6, 10, 5], [6, 10, 5], [-6, 10, -10], [6, 10, -10]
        ].forEach(p => {
            const post = new THREE.Mesh(postGeo, tubeMat); post.position.set(...p); chassis.add(post);
        });
        const roof = new THREE.Mesh(carGeometries.buggyRoof, tubeMat); roof.position.set(0, 16, -2.5); chassis.add(roof);

        const engine = new THREE.Mesh(carGeometries.buggyEngine, materials.chrome);
        engine.position.set(0, 8, -10); chassis.add(engine);

        const wheelGeo = carGeometries.buggyWheel;
        const wheelMat = materials.dark;
        carGroup.userData.wheels = []; carGroup.userData.steerWheels = [];
        [
            { x: -10, y: 4, z: 12 }, { x: 10, y: 4, z: 12 },
            { x: -12, y: 4, z: -12 }, { x: 12, y: 4, z: -12 }
        ].forEach((pos, i) => {
             const w = new THREE.Mesh(wheelGeo, wheelMat);
             w.rotation.z = Math.PI/2; w.position.set(pos.x, pos.y, pos.z);
             carGroup.userData.wheels.push(w);
             if (i < 2) carGroup.userData.steerWheels.push(w);
             carGroup.add(w);
        });
        makeCarLights(chassis, { y: 8, zFront: 15, zRear: -15, x: 5 });
    },

    hotrod: (chassis, carGroup, color) => {
        const bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.3, metalness: 0.7 });
        const cabin = new THREE.Mesh(carGeometries.hrCabin, bodyMat); cabin.position.set(0, 9, -5); chassis.add(cabin);
        const nose = new THREE.Mesh(carGeometries.hrNose, bodyMat); nose.position.set(0, 8, 12); chassis.add(nose);
        const engine = new THREE.Mesh(carGeometries.hrEngine, new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9 })); engine.position.set(0, 12, 12); chassis.add(engine);

        const pipeGeo = carGeometries.hrPipe;
        const pipeMat = materials.pipe;
        for(let i=0; i<3; i++) {
            const p1 = new THREE.Mesh(pipeGeo, pipeMat); p1.rotation.z = -Math.PI/3; p1.position.set(4, 12, 10 + i*3); chassis.add(p1);
            const p2 = new THREE.Mesh(pipeGeo, pipeMat); p2.rotation.z = Math.PI/3; p2.position.set(-4, 12, 10 + i*3); chassis.add(p2);
        }

        carGroup.userData.wheels = []; carGroup.userData.steerWheels = [];
        const frontWheelGeo = carGeometries.hrWheelFront;
        const rearWheelGeo = carGeometries.hrWheelRear;
        const wheelMat = materials.tire;
        [
            {x:-8, y:3, z:22}, {x:8, y:3, z:22}, {x:-12, y:6, z:-10}, {x:12, y:6, z:-10}
        ].forEach((pos, i) => {
             const w = new THREE.Mesh(i < 2 ? frontWheelGeo : rearWheelGeo, wheelMat);
             w.rotation.z = Math.PI/2; w.position.set(pos.x, pos.y, pos.z);
             carGroup.userData.wheels.push(w);
             if (i < 2) carGroup.userData.steerWheels.push(w);
             carGroup.add(w);
        });
    },

    pickup: (chassis, carGroup, color) => {
         const bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.6 });
         
        const cab = new THREE.Mesh(carGeometries.puCab, bodyMat); cab.position.set(0, 9.5, 5); cab.castShadow = true; chassis.add(cab);
        const bed = new THREE.Mesh(carGeometries.puBed, bodyMat); bed.position.set(0, 6.5, -14); chassis.add(bed);
        const railFront = new THREE.Mesh(carGeometries.puRailFront, bodyMat); railFront.position.set(0, 11.5, -4); chassis.add(railFront);
        
        const sideRailGeo = carGeometries.puRailSide;
        const leftRail = new THREE.Mesh(sideRailGeo, bodyMat); leftRail.position.set(-8, 9, -14); chassis.add(leftRail);
        const rightRail = new THREE.Mesh(sideRailGeo, bodyMat); rightRail.position.set(8, 9, -14); chassis.add(rightRail);
        
        const tailGate = new THREE.Mesh(carGeometries.puTailGate, bodyMat); tailGate.position.set(0, 6.5, -23.5); chassis.add(tailGate);
        const hood = new THREE.Mesh(carGeometries.puHood, bodyMat); hood.position.set(0, 7, 20); chassis.add(hood);

        const wheelGeo = sharedGeometries.wheel || new THREE.CylinderGeometry(5, 5, 6, 16);
        carGroup.userData.wheels = []; carGroup.userData.steerWheels = [];
        [
            { x: -11, y: 5, z: 20 }, { x: 11, y: 5, z: 20 },
            { x: -11, y: 5, z: -14 }, { x: 11, y: 5, z: -14 }
        ].forEach((pos, i) => {
             const w = new THREE.Mesh(wheelGeo, sharedMaterials.wheel);
             w.rotation.z = Math.PI/2; w.position.set(pos.x, pos.y, pos.z);
             carGroup.userData.wheels.push(w);
             if (i < 2) carGroup.userData.steerWheels.push(w);
             carGroup.add(w);
        });
        makeCarLights(chassis, { y: 8, zFront: 26, zRear: -24, x: 7 });
    },

    rally: (chassis, carGroup, color) => {
        const bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.5, metalness: 0.4 });
        const body = new THREE.Mesh(carGeometries.rallyBody, bodyMat); body.position.set(0, 8, 0); chassis.add(body);
        const roof = new THREE.Mesh(carGeometries.rallyRoof, bodyMat); roof.position.set(0, 16, -2); chassis.add(roof);
        const spoiler = new THREE.Mesh(carGeometries.rallySpoiler, bodyMat); spoiler.position.set(0, 15, -18); chassis.add(spoiler);
        
        const flapGeo = carGeometries.rallyFlap;
        const flapMat = materials.flap;
        [   { x: -9, y: 4, z: -18 }, { x: 9, y: 4, z: -18 } ].forEach(p => {
            const f = new THREE.Mesh(flapGeo, flapMat); f.position.set(p.x, p.y, p.z); chassis.add(f);
        });

        const lightPod = new THREE.Mesh(carGeometries.rallyLightPod, materials.tire); lightPod.position.set(0, 13.5, 14); chassis.add(lightPod);
        const l1 = new THREE.Mesh(carGeometries.rallyLightScale, materials.lightWhite); l1.position.set(-2, 13.5, 15); chassis.add(l1);
        const l2 = l1.clone(); l2.position.set(2, 13.5, 15); chassis.add(l2);

        const wheelGeo = sharedGeometries.wheel;
        carGroup.userData.wheels = []; carGroup.userData.steerWheels = [];
        [   { x: -10, y: 5, z: 12 }, { x: 10, y: 5, z: 12 }, { x: -10, y: 5, z: -12 }, { x: 10, y: 5, z: -12 } ].forEach((pos, i) => {
             const w = new THREE.Mesh(wheelGeo, sharedMaterials.wheel);
             w.rotation.z = Math.PI/2; w.position.set(pos.x, pos.y, pos.z);
             carGroup.userData.wheels.push(w);
             if (i < 2) carGroup.userData.steerWheels.push(w);
             carGroup.add(w);
        });
        makeCarLights(chassis, { y: 10, zFront: 18, zRear: -18, x: 7 });
    }
};
