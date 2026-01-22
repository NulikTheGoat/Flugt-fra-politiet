// Shared Geometries and Materials
import { enemies } from './constants.js';
import { scene } from './core.js';

export const sharedGeometries = {
    wheel: new THREE.CylinderGeometry(5, 5, 8, 16),
    coin: new THREE.CylinderGeometry(5, 5, 2, 8),
    carBody: new THREE.BoxGeometry(20, 12, 45),
    carRoof: new THREE.BoxGeometry(18, 8, 20),
    policeStripe: new THREE.BoxGeometry(20, 2, 45),
    policeLight: new THREE.BoxGeometry(8, 3, 8),
    tankBody: new THREE.BoxGeometry(26, 14, 50),
    militaryCamo: new THREE.BoxGeometry(18, 5, 40),
    militaryTurretBase: new THREE.CylinderGeometry(6, 8, 5, 8),
    militaryTurretBarrel: new THREE.CylinderGeometry(1.5, 1.5, 20, 8),
    projectile: new THREE.SphereGeometry(3, 8, 8),
    spark: new THREE.BoxGeometry(1, 1, 3),
    speedParticle: new THREE.BoxGeometry(0.5, 0.5, 3),
    smoke: new THREE.BoxGeometry(3, 3, 3),
    tireMark: new THREE.PlaneGeometry(3, 8)
};

export const sharedMaterials = {
    wheel: new THREE.MeshLambertMaterial({ color: 0x000000 }),
    coin: new THREE.MeshLambertMaterial({ color: 0xffd700 }),
    redLight: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    blueLight: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    projectile: new THREE.MeshBasicMaterial({ color: 0xff4400 }),
    spark: new THREE.MeshBasicMaterial({ color: 0xffaa00 }),
    white: new THREE.MeshLambertMaterial({ color: 0xffffff }),
    camo: new THREE.MeshLambertMaterial({ color: 0x3b4a25 }),
    darkGrey: new THREE.MeshLambertMaterial({ color: 0x2a2a2a }),
    smoke: new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.6 }),
    fire: new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.8 }),
    speedParticle: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }),
    tireMark: new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
};

// Initialize enemy materials
Object.values(enemies).forEach(enemy => {
    enemy.bodyMaterial = new THREE.MeshLambertMaterial({ color: enemy.color });
    enemy.roofMaterial = new THREE.MeshLambertMaterial({ color: enemy.color });
    enemy.roofMaterial.color.multiplyScalar(0.8);
});

// Particle Pooling
export const particlePool = {
    spark: [],
    smoke: [],
    speed: []
};

export function getParticleFromPool(type, geometry, material) {
    let particle;
    if (particlePool[type] && particlePool[type].length > 0) {
        particle = particlePool[type].pop();
        particle.visible = true;
        // Reset scale if it was modified (smoke does this)
        particle.scale.set(1, 1, 1);
        // Reset opacity if modified
        if (particle.material.opacity !== undefined) particle.material.opacity = 1;
    } else {
        particle = new THREE.Mesh(geometry, material.clone()); // Clone material to allow individual opacity fading
    }
    return particle;
}

export function returnParticleToPool(particle, type) {
    particle.visible = false;
    scene.remove(particle); // Remove from scene graph for now
    if (particlePool[type]) {
        particlePool[type].push(particle);
    }
}
