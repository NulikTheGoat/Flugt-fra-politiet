import { gameState } from './state.js';
import { gameConfig } from './config.js';
import { scene, camera } from './core.js';
import { sharedGeometries, sharedMaterials } from './assets.js';
import { playerCar, takeDamage } from './player.js';
import { createSmoke, createSpark } from './particles.js';
import { addMoney, showFloatingMoney } from './ui.js';
import { logEvent, EVENTS } from './commentary.js';
import { BUILDING_TYPES, cars, GAME_CONFIG } from './constants.js';
import { physicsWorld } from './physicsWorld.js';
import { 
    generateBuildingDebrisPlan, 
    generateTreeDebrisPlan,
    DEBRIS_MATERIALS,
    classifyDebrisSize,
    getDebrisCollisionProps,
    calculateShatterPieces,
    calculateVehicleDebrisCollision,
    createDebrisBody
} from './debrisLogic.js';

/** @type {any} */
let skyMesh = null;

export function createSky() {
    // Gradient Sky
    // Use local position for gradient calculation so it remains consistent relative to the sphere center (player)
    const vertexShader = `
        varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;
    const fragmentShader = `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vPosition;
        void main() {
            float h = normalize( vPosition + vec3(0, offset, 0) ).y;
            gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );
        }
    `;

    const uniforms = {
        topColor: { value: new THREE.Color(0x0077ff) },
        bottomColor: { value: new THREE.Color(0xffffff) },
        offset: { value: 33 }, // Offset moved to vector addition in shader
        exponent: { value: 0.6 }
    };
    uniforms.bottomColor.value.copy(scene.fog.color); // Blend horizon with fog

    // Radius 20000 to fit inside camera.far (25000) and outside fog (9000)
    const skyGeo = new THREE.SphereGeometry(20000, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
    skyMesh = sky;
}

// Helper to create a procedural window texture for background buildings - Enhanced version
function createWindowTexture() {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 128; // Increased resolution
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        // Background (Dark building facade with subtle texture)
        const gradient = ctx.createLinearGradient(0, 0, 128, 128);
        gradient.addColorStop(0, '#1a1a1a');
        gradient.addColorStop(1, '#0d0d0d');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
        
        // Add subtle concrete texture
        for (let i = 0; i < 200; i++) {
            ctx.fillStyle = `rgba(${Math.random() * 40 + 10}, ${Math.random() * 40 + 10}, ${Math.random() * 40 + 10}, 0.3)`;
            ctx.fillRect(Math.random() * 128, Math.random() * 128, 1, 1);
        }
        
        // Windows with more variety and detail
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 4; x++) {
                const isLit = Math.random() > 0.35;
                const hasBlind = Math.random() > 0.7;
                
                if (Math.random() > 0.3) { // Some windows missing for variety
                    const wx = 8 + x * 32;
                    const wy = 8 + y * 16;
                    
                    // Window frame
                    ctx.fillStyle = '#2a2a2a';
                    ctx.fillRect(wx, wy, 20, 10);
                    
                    // Window glass
                    if (isLit) {
                        const lightVariation = Math.random();
                        if (lightVariation > 0.7) {
                            ctx.fillStyle = '#FEF9E7'; // Warm white
                        } else if (lightVariation > 0.4) {
                            ctx.fillStyle = '#F4D03F'; // Yellow
                        } else {
                            ctx.fillStyle = '#F39C12'; // Orange
                        }
                    } else {
                        ctx.fillStyle = '#1c2833'; // Dark/off
                    }
                    
                    // Draw twin windows
                    ctx.fillRect(wx + 2, wy + 2, 7, 6);
                    ctx.fillRect(wx + 11, wy + 2, 7, 6);
                    
                    // Window divider
                    ctx.fillStyle = '#1a1a1a';
                    ctx.fillRect(wx + 9, wy + 2, 2, 6);
                    
                    // Blinds/curtains
                    if (hasBlind && isLit) {
                        ctx.fillStyle = 'rgba(200, 200, 180, 0.3)';
                        ctx.fillRect(wx + 2, wy + 2, 16, 6);
                    }
                    
                    // Window reflection (subtle)
                    if (isLit) {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                        ctx.fillRect(wx + 2, wy + 2, 7, 2);
                        ctx.fillRect(wx + 11, wy + 2, 7, 2);
                    }
                }
            }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.LinearFilter; // Smoother look
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.anisotropy = 4; // Better quality at angles
        return texture;
    } catch (e) {
        console.error("Window texture creation failed", e);
        return null;
    }
}

export function createDistantCityscape() {
    // Disabled - distant buildings removed for cleaner look
}

export function createGround() {
    // Larger initial ground - endless system extends it further
    // Position ground slightly below y=0 to prevent Z-fighting with roads
    const groundGeometry = new THREE.PlaneGeometry(15000, 15000);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1; // Slightly below to prevent Z-fighting
    ground.receiveShadow = true;
    scene.add(ground);

    // Main Road - North/South (along Z axis) - Removed long static road to let Loops take over
    // We only keep a small intersection patch to ensure clean connection
    const roadGeometry = new THREE.BoxGeometry(300, 0.5, 300);
    const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.position.set(0, 0.25, 0); // Raised to prevent Z-fighting with ground
    road.receiveShadow = true;
    scene.add(road);

    // Main Road - East/West (along X axis)
    const roadHorizontal = new THREE.Mesh(
        new THREE.BoxGeometry(15000, 0.5, 300),
        roadMaterial
    );
    roadHorizontal.position.set(0, 0.25, 0); // Raised to prevent Z-fighting
    roadHorizontal.receiveShadow = true;
    scene.add(roadHorizontal);

    // Road markings - extend further
    const markingGeometry = new THREE.PlaneGeometry(5, 150);
    const markingMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    
    // Z-axis markings (along the road)
    for (let i = -5000; i < 5000; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(0, 0.55, i);
        marking.receiveShadow = true;
        scene.add(marking);
    }

    // X-axis markings
    for (let i = -5000; i < 5000; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.rotation.z = Math.PI / 2;
        marking.position.set(i, 0.55, 0);
        marking.receiveShadow = true;
        scene.add(marking);
    }
}

export function createTrees() {
    const treePositions = [
        [-300, -1500], [300, -1500],
        [-1500, -1200], [1500, -1200],
        [-1600, 500], [1600, 500],
        [-200, 1500], [200, 1500],
        [-1400, 1200], [1400, 1200],
        [-800, -2000], [800, -2000],
        [0, 2000],
        // Ekstra træer
        [-900, -400], [900, -400],
        [-1100, 600], [1100, 600],
        [-500, 1800], [500, 1800],
        [-1800, -800], [1800, -800],
        [-2200, 400], [2200, 400],
    ];

    const trunkGeometry = new THREE.CylinderGeometry(8, 12, 50, 8);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x5D4037 });
    const foliageGeometry = new THREE.ConeGeometry(35, 70, 8);
    const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x2E7D32 });

    treePositions.forEach(pos => {
        const group = createSingleTree(pos[0], pos[1]);
        scene.add(group);
    });
}


// Create "Pølsevogn" (Hotdog Stand) around the map - BIGGER and more visible!
export function createHotdogStands() {
    console.log("🌭 Creating Hotdog Stands...");
    
    // Positions around the map - away from roads but visible
    const standPositions = [
        // Near spawn - on the corners of the intersection
        [200, 200],
        [-200, -200]
    ];

    standPositions.forEach(pos => {
        const stand = createSingleHotdogStand(pos[0], pos[1]);
        scene.add(stand);
    });
    
    console.log(`🌭 Created ${standPositions.length} Hotdog stands!`);
}

// Skab et vindue
function createWindow(x, y, z, rotY, width, height, isLit) {
    const windowGeometry = new THREE.PlaneGeometry(width, height);
    const windowColor = isLit ? 
        (Math.random() > 0.5 ? 0xFFF9C4 : 0xFFE082) : // Gult lys
        0x263238; // Mørkt vindue
    const windowMaterial = new THREE.MeshBasicMaterial({ 
        color: windowColor,
        side: THREE.DoubleSide
    });
    const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
    windowMesh.position.set(x, y, z);
    windowMesh.rotation.y = rotY;
    return windowMesh;
}

// Optimized window creation: Attaches merged windows to chunks to reduce draw calls significantly
function addWindowsToChunks(chunks, buildingX, buildingZ, width, depth, height, type, dx, dy, dz, nx, ny, nz) {
    const windowWidth = 12;
    const windowHeight = 15;
    const windowSpacingX = 25;
    const windowSpacingY = 35;
    
    const isGlass = type.isGlass;
    const wW = (isGlass ? windowSpacingX - 3 : windowWidth) / 2; // Half width for vertex calc
    const wH = (isGlass ? windowSpacingY - 5 : windowHeight) / 2; // Half height

    const windowsPerFloor = Math.floor((width - 20) / windowSpacingX);
    const windowsPerSide = Math.floor((depth - 20) / windowSpacingX);
    const floors = Math.floor((height - 20) / windowSpacingY);
    
    // Per-chunk data storage
    // Map<Chunk, { [matIndex]: Array<WindowProps> }>
    const chunkData = new Map();

    const getChunkData = (chunk) => {
        if (!chunkData.has(chunk)) {
            chunkData.set(chunk, { 0: [], 1: [], 2: [] });
        }
        return chunkData.get(chunk);
    };

    const getChunk = (localX, localY, localZ) => {
        const ix = Math.min(Math.max(Math.floor(localX / dx), 0), nx - 1);
        const iy = Math.min(Math.max(Math.floor(localY / dy), 0), ny - 1);
        const iz = Math.min(Math.max(Math.floor(localZ / dz), 0), nz - 1);
        return (chunks[ix] && chunks[ix][iy]) ? chunks[ix][iy][iz] : null;
    };

    // 1. Collect all window positions grouped by chunk and material
    for (let floor = 0; floor < floors; floor++) {
        const windowY = 20 + floor * windowSpacingY;
        
        // Front & Back
        for (let w = 0; w < windowsPerFloor; w++) {
            const isLit = Math.random() > 0.4;
            const matIdx = isLit ? (Math.random() > 0.5 ? 1 : 2) : 0;
            const currentX = (15 + w * windowSpacingX) - width/2;
            const localX = (15 + w * windowSpacingX);

            // Front
            let chunk = getChunk(localX, windowY, depth - 1);
            if (chunk) {
                // Pos relative to chunk (same logic as before)
                // Chunk local pos relative to building is needed.
                // chunk.position is relative to building center (which is 0,0,0 relative to building group).
                // Wait, chunk.position is Set relative to startX/Y/Z which are absolute to World in createSingleBuilding
                // EXCEPT createSingleBuilding adds them to buildingGroup!
                // So chunk.position is local to buildingGroup.
                // And buildingGroup is at 0,0,0? No, buildingGroup is returned and added to scene. 
                // Ah, createSingleBuilding does `chunk.position.set(startX...)` where startX is based on building center X passed in.
                // BUT `buildingGroup` is a Group. If we add chunks to it, their positions behave as local.
                // IF buildingGroup is placed at 0,0,0, then chunk positions are World positions.
                // IF buildingGroup is placed at building X,Z, then chunk positions should be local integers.
                
                // Let's check createSingleBuilding:
                // startX = x - width/2...
                // chunk.position.set(startX...)
                // buildingGroup.add(chunk)
                // scene.add(buildingGroup)
                // This means buildingGroup is at 0,0,0 and chunks are at World Coords.
                // Correct.
                
                // So: Window World Pos needs to be computed.
                // Window World X = buildingX + currentX
                // Chunk World X = chunk.position.x
                // RelX = (buildingX + currentX) - chunk.position.x
                
                getChunkData(chunk)[matIdx].push({
                    x: (buildingX + currentX) - chunk.position.x,
                    y: windowY - chunk.position.y,
                    z: (buildingZ + depth/2 + 0.6) - chunk.position.z,
                    rot: 0 // 0 rad
                });
            }

            // Back
            chunk = getChunk(localX, windowY, 0);
            if (chunk) {
                getChunkData(chunk)[matIdx].push({
                    x: (buildingX + currentX) - chunk.position.x,
                    y: windowY - chunk.position.y,
                    z: (buildingZ - depth/2 - 0.6) - chunk.position.z,
                    rot: Math.PI
                });
            }
        }
        
        // Sides
        for (let w = 0; w < windowsPerSide; w++) {
            const isLit = Math.random() > 0.4;
            const matIdx = isLit ? (Math.random() > 0.5 ? 1 : 2) : 0;
            const currentZ = (15 + w * windowSpacingX) - depth/2;
            const localZ = 15 + w * windowSpacingX;

            // Left
            let chunk = getChunk(0, windowY, localZ);
            if (chunk) {
                getChunkData(chunk)[matIdx].push({
                    x: (buildingX - width/2 - 0.6) - chunk.position.x,
                    y: windowY - chunk.position.y,
                    z: (buildingZ + currentZ) - chunk.position.z,
                    rot: Math.PI/2
                });
            }

            // Right
            chunk = getChunk(width - 1, windowY, localZ);
            if (chunk) {
                getChunkData(chunk)[matIdx].push({
                    x: (buildingX + width/2 + 0.6) - chunk.position.x,
                    y: windowY - chunk.position.y,
                    z: (buildingZ + currentZ) - chunk.position.z,
                    rot: -Math.PI/2
                });
            }
        }
    }

    // 2. Generate Merged Meshes per Chunk
    const materials = [winMatDark, winMatLit1, winMatLit2];
    
    chunkData.forEach((data, chunk) => {
        for (let i = 0; i < 3; i++) {
            const wins = data[i];
            if (wins.length === 0) continue;

            // Create BufferGeometry manually
            const vertexCount = wins.length * 4;
            const indexCount = wins.length * 6;
            
            const positionAttr = new Float32Array(vertexCount * 3);
            const indexAttr = new Uint16Array(indexCount);
            // Normals and UVs omitted for performance (BasicMaterial doesn't strictly need them if lighting/textures off)
            // But if we switch to StandardMaterial later, we'd need normals. For now windows are simple.
            
            let vIdx = 0;
            let iIdx = 0;
            let offset = 0;

            for (const win of wins) {
                // Compute corners based on rotation
                // Base: (-wW, -wH), (wW, -wH), (-wW, wH), (wW, wH) ?
                // PlaneGeometry normal is usually +Z. Vertices:
                // 0: -w, +h, 0
                // 1: +w, +h, 0
                // 2: -w, -h, 0
                // 3: +w, -h, 0
                
                const cos = Math.cos(win.rot);
                const sin = Math.sin(win.rot);

                const addVert = (lx, ly, lz) => {
                    // Rotate around Y
                    const rx = lx * cos - lz * sin;
                    const rz = lx * sin + lz * cos;
                    
                    positionAttr[vIdx++] = win.x + rx;
                    positionAttr[vIdx++] = win.y + ly;
                    positionAttr[vIdx++] = win.z + rz;
                };

                // TL
                addVert(-wW, wH, 0);
                // TR
                addVert(wW, wH, 0);
                // BL
                addVert(-wW, -wH, 0);
                // BR
                addVert(wW, -wH, 0);

                // Indices (0, 2, 1, 2, 3, 1)
                indexAttr[iIdx++] = offset + 0;
                indexAttr[iIdx++] = offset + 2;
                indexAttr[iIdx++] = offset + 1;
                indexAttr[iIdx++] = offset + 2;
                indexAttr[iIdx++] = offset + 3;
                indexAttr[iIdx++] = offset + 1;
                
                offset += 4;
            }

            const geom = new THREE.BufferGeometry();
            geom.setAttribute('position', new THREE.BufferAttribute(positionAttr, 3));
            geom.setIndex(new THREE.BufferAttribute(indexAttr, 1));
            
            const mesh = new THREE.Mesh(geom, materials[i]);
            chunk.add(mesh);
        }
    });
}

// Old functions removed/replaced
// function addWindowsToBuilding(...) { ... }
// function createWindow(...) { ... }

// Skab markise til butikker
function createAwning(x, z, width, depth, color) {
    const awningGeometry = new THREE.BoxGeometry(width + 10, 3, 20);
    const awningMaterial = new THREE.MeshLambertMaterial({ color: color });
    const awning = new THREE.Mesh(awningGeometry, awningMaterial);
    awning.position.set(x, 35, z + depth/2 + 10);
    awning.rotation.x = -0.2;
    return awning;
}

// Skab søjler til banker/parlament
function createColumns(x, z, width, depth, height, numColumns) {
    const columns = new THREE.Group();
    const columnGeometry = new THREE.CylinderGeometry(4, 5, height * 0.6, 8);
    const columnMaterial = new THREE.MeshLambertMaterial({ color: 0xECEFF1 });
    
    const spacing = width / (numColumns + 1);
    for (let i = 1; i <= numColumns; i++) {
        const column = new THREE.Mesh(columnGeometry, columnMaterial);
        column.position.set(x - width/2 + i * spacing, height * 0.3, z + depth/2 + 8);
        column.castShadow = true;
        columns.add(column);
    }
    return columns;
}

// Skab kirketårn
function createChurchTower(x, z, baseHeight) {
    const tower = new THREE.Group();
    
    // Tårn base
    const towerGeometry = new THREE.BoxGeometry(25, 80, 25);
    const towerMaterial = new THREE.MeshLambertMaterial({ color: 0xECEFF1 });
    const towerMesh = new THREE.Mesh(towerGeometry, towerMaterial);
    towerMesh.position.set(x, baseHeight + 40, z);
    tower.add(towerMesh);
    
    // Spir
    const spireGeometry = new THREE.ConeGeometry(15, 50, 4);
    const spireMaterial = new THREE.MeshLambertMaterial({ color: 0x5D4037 });
    const spire = new THREE.Mesh(spireGeometry, spireMaterial);
    spire.position.set(x, baseHeight + 105, z);
    tower.add(spire);
    
    // Kors
    const crossV = new THREE.Mesh(
        new THREE.BoxGeometry(3, 20, 3),
        new THREE.MeshLambertMaterial({ color: 0xFFD700 })
    );
    crossV.position.set(x, baseHeight + 140, z);
    tower.add(crossV);
    
    const crossH = new THREE.Mesh(
        new THREE.BoxGeometry(12, 3, 3),
        new THREE.MeshLambertMaterial({ color: 0xFFD700 })
    );
    crossH.position.set(x, baseHeight + 145, z);
    tower.add(crossH);
    
    return tower;
}

// Skab kuppel til parlament
function createDome(x, z, baseHeight, radius) {
    const dome = new THREE.Group();
    
    // Kuppel base
    const baseGeometry = new THREE.CylinderGeometry(radius, radius + 5, 15, 16);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0xBCAAA4 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, baseHeight + 7.5, z);
    dome.add(base);
    
    // Kuppel
    const domeGeometry = new THREE.SphereGeometry(radius, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = new THREE.MeshLambertMaterial({ color: 0x78909C });
    const domeMesh = new THREE.Mesh(domeGeometry, domeMaterial);
    domeMesh.position.set(x, baseHeight + 15, z);
    dome.add(domeMesh);
    
    return dome;
}

// Skab ko til toppen af parlamentet
function createCow(x, z, height) {
    const cow = new THREE.Group();
    
    // Krop
    const bodyGeometry = new THREE.BoxGeometry(20, 12, 10);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xF5F5F5 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(x, height + 6, z);
    cow.add(body);
    
    // Pletter
    const spotMaterial = new THREE.MeshLambertMaterial({ color: 0x1A1A1A });
    const spot1 = new THREE.Mesh(new THREE.BoxGeometry(6, 5, 0.5), spotMaterial);
    spot1.position.set(x - 3, height + 7, z + 5.3);
    cow.add(spot1);
    const spot2 = new THREE.Mesh(new THREE.BoxGeometry(5, 4, 0.5), spotMaterial);
    spot2.position.set(x + 5, height + 5, z + 5.3);
    cow.add(spot2);
    
    // Hoved
    const headGeometry = new THREE.BoxGeometry(8, 8, 8);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(x + 14, height + 8, z);
    cow.add(head);
    
    // Snude
    const snoutGeometry = new THREE.BoxGeometry(4, 4, 4);
    const snoutMaterial = new THREE.MeshLambertMaterial({ color: 0xFFCDD2 });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.position.set(x + 19, height + 6, z);
    cow.add(snout);
    
    // Horn
    const hornGeometry = new THREE.ConeGeometry(1.5, 6, 6);
    const hornMaterial = new THREE.MeshLambertMaterial({ color: 0x8D6E63 });
    const hornL = new THREE.Mesh(hornGeometry, hornMaterial);
    hornL.position.set(x + 12, height + 14, z - 3);
    hornL.rotation.z = -0.3;
    cow.add(hornL);
    const hornR = new THREE.Mesh(hornGeometry, hornMaterial);
    hornR.position.set(x + 12, height + 14, z + 3);
    hornR.rotation.z = -0.3;
    cow.add(hornR);
    
    // Ben
    const legGeometry = new THREE.BoxGeometry(3, 8, 3);
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0xF5F5F5 });
    [[-6, -3], [-6, 3], [6, -3], [6, 3]].forEach(([ox, oz]) => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(x + ox, height - 4, z + oz);
        cow.add(leg);
    });
    
    // Hale
    const tailGeometry = new THREE.BoxGeometry(2, 10, 2);
    const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
    tail.position.set(x - 12, height + 2, z);
    tail.rotation.z = 0.5;
    cow.add(tail);
    
    return cow;
}

// Skab butiksskilt
function createSign(x, z, width, height, text, bgColor, textColor) {
    const sign = new THREE.Group();
    
    const signBg = new THREE.Mesh(
        new THREE.BoxGeometry(width * 0.6, 15, 3),
        new THREE.MeshLambertMaterial({ color: bgColor })
    );
    signBg.position.set(x, height - 20, z);
    sign.add(signBg);
    
    return sign;
}

// Skab flagstang til politistation
function createFlagpole(x, z, height) {
    const group = new THREE.Group();
    
    // Stang
    const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1.5, 60, 8),
        new THREE.MeshLambertMaterial({ color: 0x9E9E9E })
    );
    pole.position.set(x, height/2 + 30, z);
    group.add(pole);
    
    // Flag (dansk)
    const flagGeometry = new THREE.PlaneGeometry(25, 15);
    const flagMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xC62828, 
        side: THREE.DoubleSide 
    });
    const flag = new THREE.Mesh(flagGeometry, flagMaterial);
    flag.position.set(x + 13, height/2 + 52, z);
    group.add(flag);
    
    // Hvidt kors
    const crossH = new THREE.Mesh(
        new THREE.PlaneGeometry(25, 3),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })
    );
    crossH.position.set(x + 13, height/2 + 52, z + 0.1);
    group.add(crossH);
    
    const crossV = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 15),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })
    );
    crossV.position.set(x + 8, height/2 + 52, z + 0.1);
    group.add(crossV);
    
    return group;
}

export function createBuildings() {
    // Definerede bygningspositioner med typer
    // [x, z, width, depth, height, type]
    const buildingConfigs = [
        // === HOVEDGADEN (langs z-aksen) ===
        // Venstre side - indre
        [-600, -800, 100, 80, 150, BUILDING_TYPES.SHOP],
        [-700, -500, 120, 90, 180, BUILDING_TYPES.OFFICE],
        [-550, -200, 90, 70, 140, BUILDING_TYPES.PIZZERIA],
        [-800, 100, 110, 85, 160, BUILDING_TYPES.BANK],
        [-650, 400, 100, 75, 150, BUILDING_TYPES.RESIDENTIAL],
        [-750, 700, 130, 95, 190, BUILDING_TYPES.OFFICE],
        [-600, 1000, 95, 80, 145, BUILDING_TYPES.SHOP],
        
        // Højre side - indre
        [600, -800, 105, 85, 155, BUILDING_TYPES.RESIDENTIAL],
        [700, -500, 115, 88, 175, BUILDING_TYPES.SHOP],
        [550, -200, 95, 72, 145, BUILDING_TYPES.WAREHOUSE],
        [800, 100, 120, 90, 170, BUILDING_TYPES.OFFICE],
        [650, 400, 105, 78, 155, BUILDING_TYPES.PIZZERIA],
        [750, 700, 125, 92, 185, BUILDING_TYPES.BANK],
        [600, 1000, 100, 82, 150, BUILDING_TYPES.RESIDENTIAL],
        
        // === POLITI STATION - centralt placeret ===
        [-350, 600, 140, 100, 120, BUILDING_TYPES.POLICE_STATION],
        
        // === PARLAMENT - stort og imponerende ===
        [350, -600, 180, 120, 140, BUILDING_TYPES.PARLIAMENT],
        
        // === KIRKE i enden af vejen ===
        [0, -2800, 120, 80, 100, BUILDING_TYPES.CHURCH],
        
        // Yderligere bygninger
        [-1200, -600, 90, 70, 140, BUILDING_TYPES.RESIDENTIAL],
        [-1300, 200, 110, 85, 160, BUILDING_TYPES.SHOP],
        [-1100, 800, 100, 78, 150, BUILDING_TYPES.WAREHOUSE],
        
        [1200, -600, 95, 75, 145, BUILDING_TYPES.OFFICE],
        [1300, 200, 115, 88, 170, BUILDING_TYPES.RESIDENTIAL],
        [1100, 800, 105, 80, 155, BUILDING_TYPES.SHOP],
        
        // Spredte bygninger
        [-400, -1200, 85, 65, 130, BUILDING_TYPES.RESIDENTIAL],
        [400, -1200, 90, 70, 135, BUILDING_TYPES.SHOP],
        [-1100, -400, 100, 75, 150, BUILDING_TYPES.GENERIC],
        [1100, -400, 105, 80, 155, BUILDING_TYPES.GENERIC],
        
        // Udvidet kort
        [-800, 1800, 120, 90, 200, BUILDING_TYPES.OFFICE],
        [0, 2200, 150, 100, 220, BUILDING_TYPES.GENERIC],
        [800, 1800, 110, 85, 180, BUILDING_TYPES.RESIDENTIAL],
        [-1500, 2000, 100, 80, 160, BUILDING_TYPES.WAREHOUSE],
        [1500, 2000, 105, 82, 170, BUILDING_TYPES.SHOP],
        [-800, -1800, 115, 88, 190, BUILDING_TYPES.RESIDENTIAL],
        [800, -1800, 100, 80, 175, BUILDING_TYPES.OFFICE],
        [-1500, -2000, 95, 75, 155, BUILDING_TYPES.GENERIC],
        [1500, -2000, 110, 85, 165, BUILDING_TYPES.SHOP],
        [-2000, -1000, 130, 95, 200, BUILDING_TYPES.OFFICE],
        [-2200, 0, 140, 100, 230, BUILDING_TYPES.GENERIC],
        [-2000, 1000, 120, 90, 190, BUILDING_TYPES.RESIDENTIAL],
        [-2500, -500, 100, 80, 160, BUILDING_TYPES.WAREHOUSE],
        [-2500, 500, 105, 82, 170, BUILDING_TYPES.GENERIC],
        [2000, -1000, 125, 92, 195, BUILDING_TYPES.OFFICE],
        [2200, 0, 145, 98, 225, BUILDING_TYPES.GENERIC],
        [2000, 1000, 115, 88, 185, BUILDING_TYPES.RESIDENTIAL],
        [2500, -500, 98, 78, 155, BUILDING_TYPES.SHOP],
        [2500, 500, 102, 80, 165, BUILDING_TYPES.GENERIC],
    ];

    const chunkSize = 30;

    buildingConfigs.forEach(([x, z, width, depth, height, type]) => {
        const building = createSingleBuilding(x, z, width, depth, height, type);
        scene.add(building);
    });
}

export function updateBuildingChunks(delta) {
    if(!playerCar) return;
    const d = delta || 1;

    // Active Chunks (falling/moving) - only process non-physics chunks
    for (let i = gameState.activeChunks.length - 1; i >= 0; i--) {
        const chunk = gameState.activeChunks[i];
        
        // Skip physics-managed chunks (they're updated by physicsWorld.update())
        if (chunk.userData.physicsBody) continue;
        
        // Skip chunks without velocity (shouldn't happen but safety check)
        if (!chunk.userData.velocity) continue;
        
        chunk.position.x += chunk.userData.velocity.x * d;
        chunk.position.y += chunk.userData.velocity.y * d;
        chunk.position.z += chunk.userData.velocity.z * d;
        chunk.rotation.x += chunk.userData.rotVelocity.x * d;
        chunk.rotation.y += chunk.userData.rotVelocity.y * d;
        chunk.rotation.z += chunk.userData.rotVelocity.z * d;
        
        // Use individual gravity or default
        const gravity = chunk.userData.gravity || 0.5;
        chunk.userData.velocity.y -= gravity * d;
        
        // Ground collision
        const groundY = chunk.userData.height ? chunk.userData.height/2 : 0.5;
        if (chunk.position.y < groundY) {
            chunk.position.y = groundY;
            chunk.userData.velocity.y *= -0.4; // Less bounce
            
            const frictionFactor = Math.pow(0.75, d);
            chunk.userData.velocity.x *= frictionFactor;
            chunk.userData.velocity.z *= frictionFactor;
            chunk.userData.rotVelocity.multiplyScalar(frictionFactor);
        }
        
        // Air resistance for small debris
        if (chunk.userData.isSmallDebris) {
            chunk.userData.velocity.x *= 0.98;
            chunk.userData.velocity.z *= 0.98;
        }
        
        // Flying debris to building collision - large/medium debris can destroy buildings
        if (!chunk.userData.isSmallDebris && chunk.userData.velocity) {
            const debrisSpeed = Math.sqrt(
                chunk.userData.velocity.x ** 2 + 
                chunk.userData.velocity.y ** 2 + 
                chunk.userData.velocity.z ** 2
            );
            
            // Only check if moving fast enough
            if (debrisSpeed > 15) {
                const debrisSize = Math.max(chunk.userData.width || 10, chunk.userData.depth || 10);
                
                // Check collision with standing building chunks (using grid)
                const dgx = Math.floor(chunk.position.x / gameState.chunkGridSize);
                const dgz = Math.floor(chunk.position.z / gameState.chunkGridSize);
                
                outerLoop:
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dz = -1; dz <= 1; dz++) {
                        const key = `${dgx + dx},${dgz + dz}`;
                        const buildingChunks = gameState.chunkGrid[key];
                        if (!buildingChunks) continue;
                        
                        for (const bChunk of buildingChunks) {
                            if (bChunk.userData.isHit) continue;
                            
                            const bdx = bChunk.position.x - chunk.position.x;
                            const bdz = bChunk.position.z - chunk.position.z;
                            const bdy = bChunk.position.y - chunk.position.y;
                            const distSq = bdx * bdx + bdz * bdz + bdy * bdy;
                            
                            const collDist = (debrisSize + (bChunk.userData.width || 30)) / 2;
                            
                            if (distSq < collDist * collDist && debrisSize >= 8) {
                                // Flying debris destroys building chunk!
                                bChunk.userData.isHit = true;
                                bChunk.matrixAutoUpdate = true;
                                gameState.activeChunks.push(bChunk);
                                
                                // Building chunk gets velocity from impact
                                const impactForce = debrisSpeed * 0.3;
                                bChunk.userData.velocity.set(
                                    chunk.userData.velocity.x * 0.5,
                                    5 + Math.random() * 5,
                                    chunk.userData.velocity.z * 0.5
                                );
                                bChunk.userData.rotVelocity.set(
                                    (Math.random() - 0.5) * 0.3,
                                    (Math.random() - 0.5) * 0.3,
                                    (Math.random() - 0.5) * 0.3
                                );
                                
                                // Flying debris loses momentum
                                chunk.userData.velocity.x *= 0.3;
                                chunk.userData.velocity.z *= 0.3;
                                chunk.userData.velocity.y *= 0.5;
                                
                                // Create debris particles
                                createBuildingDebris(bChunk.position, bChunk.material.color, debrisSpeed);
                                createSmoke(bChunk.position);
                                
                                gameState.destructionCount = (gameState.destructionCount || 0) + 1;
                                logEvent(EVENTS.BUILDING_DESTROYED, "Debris cascade!", { speed: debrisSpeed });
                                
                                break outerLoop; // Only one collision per frame
                            }
                        }
                    }
                }
            }
        }
        
        // When chunk comes to rest, mark as fallen debris
        // Use slightly larger thresholds to ensure chunks settle reliably
        if (Math.abs(chunk.userData.velocity.y) < 0.5 && 
            Math.abs(chunk.userData.velocity.x) < 0.5 && 
            Math.abs(chunk.userData.velocity.z) < 0.5 &&
            chunk.position.y <= groundY + 1) {
             gameState.activeChunks.splice(i, 1);
             
             // Ensure chunk is properly on the ground
             chunk.position.y = groundY;
             
             // Optimization: Disable updates again as it's now static debris
             chunk.matrixAutoUpdate = false;
             chunk.updateMatrix(); // Ensure final position is locked

             // Mark as fallen debris - solid but no damage, can be shattered
             // Classify debris by size for proper collision handling
             const debrisSize = classifyDebrisSize(
                 chunk.userData.width || 10,
                 chunk.userData.height || 10,
                 chunk.userData.depth || 10
             );
             
             // Only track collidable debris (not tiny)
             if (debrisSize !== 'tiny') {
                 chunk.userData.isFallenDebris = true;
                 chunk.userData.debrisSize = debrisSize;
                 chunk.userData.isCollidable = true;
                 if (!gameState.fallenDebris) gameState.fallenDebris = [];
                 gameState.fallenDebris.push(chunk);
                 
                 // Also add to unified debris array
                 if (!gameState.debris) gameState.debris = [];
                 gameState.debris.push(chunk);
             }
        }
    }

    // Collisions with standing building chunks
    const carPos = playerCar.position;
    const isOnFoot = gameState.selectedCar === 'onfoot' || playerCar.userData?.visualType === 'onfoot';
    const canDestroyWorld = !isOnFoot;
    const carRadius = isOnFoot ? 10 : 15;
    
    const gridSize = gameState.chunkGridSize;
    const px = Math.floor(carPos.x / gridSize);
    const pz = Math.floor(carPos.z / gridSize);
    
    for(let x = px-1; x <= px+1; x++) {
        for(let z = pz-1; z <= pz+1; z++) {
            const key = `${x},${z}`;
            const chunks = gameState.chunkGrid[key];
            if(!chunks) continue;
            
            for(let i=0; i< chunks.length; i++) {
                const chunk = chunks[i];
                if(chunk.userData.isHit) continue; 
                
                if (Math.abs(chunk.position.x - carPos.x) < 40 && Math.abs(chunk.position.z - carPos.z) < 40) {
                     const dx = chunk.position.x - carPos.x;
                     const dz = chunk.position.z - carPos.z;
                     const distSq = dx*dx + dz*dz;
                     
                     const collisionDist = (carRadius + chunk.userData.width/2 + 5);
                     if (distSq < collisionDist * collisionDist) {
                         if (Math.abs(chunk.position.y - carPos.y) < (chunk.userData.height/2 + 10)) {

                             // Any non-ground chunk collision should count as a "hit" for police engagement.
                             // This is especially important for on-foot (cannot destroy) but also applies to cars.
                             if (!gameState.hasHitObject) gameState.hasHitObject = true;
                             
                             const carSpeed = Math.abs(gameState.speed);
                             const carAngle = playerCar.rotation.y;
                             const angleToChunk = Math.atan2(dx, dz);

                             // On-foot: collide but never destroy the world
                             if (!canDestroyWorld) {
                                 const dist = Math.sqrt(distSq) || 1;
                                 const overlap = collisionDist - dist;
                                 if (overlap > 0) {
                                     // Push player away from the chunk
                                     playerCar.position.x -= (dx / dist) * overlap * 1.1;
                                     playerCar.position.z -= (dz / dist) * overlap * 1.1;
                                 }

                                 // Stop/slow movement on impact
                                 gameState.speed *= 0.3;
                                 gameState.velocityX *= 0.3;
                                 gameState.velocityZ *= 0.3;
                                 gameState.screenShake = Math.max(gameState.screenShake || 0, 0.05);
                                 // Tiny damage only (no smoke)
                                 takeDamage(Math.min(2, Math.floor(carSpeed * 0.05)));
                                 continue;
                             }
                             
                             // Special handling for trees
                             if (chunk.userData.isTree) {
                                 chunk.userData.health--;
                                 
                                 if (chunk.userData.health <= 0 || carSpeed > 25) {
                                     // Tree falls!
                                     chunk.userData.isHit = true;
                                     chunk.matrixAutoUpdate = true; // Enable physics updates
                                     gameState.activeChunks.push(chunk);
                                     
                                     // Fell the tree in the direction of impact
                                     chunk.userData.velocity.set(
                                        Math.sin(carAngle) * carSpeed * 0.3,
                                        2 + Math.random() * 3,
                                        Math.cos(carAngle) * carSpeed * 0.3
                                     );
                                     
                                     chunk.userData.rotVelocity.set(
                                        (Math.random() - 0.5) * 0.3,
                                        0,
                                        (Math.random() - 0.5) * 0.3
                                     );
                                     
                                     // Also knock down foliage
                                     if (chunk.userData.linkedFoliage) {
                                         const foliage = chunk.userData.linkedFoliage;
                                         foliage.userData.isHit = true;
                                         foliage.matrixAutoUpdate = true;
                                         gameState.activeChunks.push(foliage);
                                         foliage.userData.velocity = chunk.userData.velocity.clone();
                                         foliage.userData.velocity.y += 3;
                                         foliage.userData.rotVelocity = new THREE.Vector3(
                                            (Math.random() - 0.5) * 0.5,
                                            (Math.random() - 0.5) * 0.3,
                                            (Math.random() - 0.5) * 0.5
                                         );
                                     }
                                     
                                     createTreeDebris(chunk.position, carSpeed);
                                     
                                     // Log tree destruction for commentary
                                     logEvent(EVENTS.TREE_DESTROYED, null, { speed: carSpeed });
                                     gameState.destructionCount = (gameState.destructionCount || 0) + 1;
                                 } else {
                                     // Tree shakes but doesn't fall
                                     gameState.screenShake = 0.2;
                                 }
                                 
                                 gameState.speed *= 0.85;
                                 takeDamage(Math.floor(carSpeed * 0.15) + 8);
                                 gameState.screenShake = 0.4;
                                 createSmoke(chunk.position);
                             }
                             // Special handling for Hotdog stands (Destructible)
                             else if (chunk.userData.isHotdogStand) {
                                 chunk.userData.isHit = true;
                                 chunk.matrixAutoUpdate = true;
                                 gameState.activeChunks.push(chunk);
                                 
                                 // Fly away!
                                 chunk.userData.velocity.set(
                                    Math.sin(carAngle) * (carSpeed * 0.3 + 5), // Reduced force
                                    5 + Math.random() * 5, // Reduced height
                                    Math.cos(carAngle) * (carSpeed * 0.3 + 5)
                                 );
                                 
                                 chunk.userData.rotVelocity.set(
                                    (Math.random() - 0.5) * 0.2, // Reduced rotation spin
                                    (Math.random() - 0.5) * 0.2,
                                    (Math.random() - 0.5) * 0.2
                                 );
                                 
                                 // Add money for vandalism!
                                 if(typeof addMoney === 'function') { 
                                     addMoney(50);
                                     logEvent(EVENTS.COLLISION, "SMADREDE PØLSEVOGN!!");
                                     gameState.destructionCount = (gameState.destructionCount || 0) + 1;
                                 }
                                 
                                 // Particles
                                 for(let p=0; p<2; p++) { // Reduced particles
                                     createTreeDebris(chunk.position, carSpeed); // Reuse generic debris for now
                                 }
                             } else {
                                 // Normal building chunk
                                 chunk.userData.isHit = true;
                                 chunk.matrixAutoUpdate = true;
                                 gameState.activeChunks.push(chunk);
                                 
                                 chunk.userData.velocity.set(
                                    Math.sin(carAngle) * carSpeed * 0.2 + (Math.sin(angleToChunk) * 5),
                                    Math.abs(carSpeed) * 0.1 + 5 + Math.random() * 5,
                                    Math.cos(carAngle) * carSpeed * 0.2 + (Math.cos(angleToChunk) * 5)
                                 );
                                 
                                 chunk.userData.rotVelocity.set(
                                    (Math.random() - 0.5) * 0.5,
                                    (Math.random() - 0.5) * 0.5,
                                    (Math.random() - 0.5) * 0.5
                                 );

                                 // Create building debris particles based on speed
                                 createBuildingDebris(chunk.position, chunk.material.color, carSpeed);
                                 
                                 // Log building destruction for commentary
                                 logEvent(EVENTS.BUILDING_DESTROYED, null, { speed: carSpeed });
                                 gameState.destructionCount = (gameState.destructionCount || 0) + 1;
                                 
                                 // Rigid Body Physics: Mass affects momentum conservation
                                 const mass = cars[gameState.selectedCar]?.mass || 1.0;
                                 
                                 // Heavier cars lose less speed (Momentum = mv)
                                 const baseRetention = GAME_CONFIG.PLAYER_BUILDING_SPEED_RETENTION || 0.85;
                                 const speedRetention = Math.min(0.99, baseRetention + (mass * 0.02) - (0.05 / mass));
                                 gameState.speed *= Math.max(0.5, speedRetention); 
                                 
                                 // Heavier cars impart more force to debris
                                 chunk.userData.velocity.multiplyScalar(Math.sqrt(mass));

                                 // Calculate damage using centralized config
                                 const baseDamage = GAME_CONFIG.PLAYER_BUILDING_COLLISION_DAMAGE_BASE || 5;
                                 const speedMult = GAME_CONFIG.PLAYER_BUILDING_COLLISION_DAMAGE_SPEED_MULT || 0.1;
                                 const damage = Math.floor(carSpeed * speedMult) + baseDamage;
                                 takeDamage(damage);
                                 
                                 // Log collision for dev tools
                                 if (window.__game?.logCollision) {
                                     window.__game.logCollision('PLAYER→BLDG', 
                                         `Speed: ${Math.round(carSpeed * 3.6)} km/h, Dmg: ${damage}`);
                                 }
                                 
                                 gameState.screenShake = 0.3;
                                 createSmoke(chunk.position);
                             }
                         }
                     }
                }
            }
        }
    }

    // Collisions with standing building chunks (Police cars)
    if (gameState.policeCars && gameState.policeCars.length > 0) {
        gameState.policeCars.forEach(policeCar => {
            if (!policeCar || policeCar.userData?.dead) return;

            const pPos = policeCar.position;
            const pSpeed = Math.abs(policeCar.userData?.speed || 0);
            const pAngle = policeCar.rotation.y || 0;
            const pRadius = 15;

            const pX = Math.floor(pPos.x / gridSize);
            const pZ = Math.floor(pPos.z / gridSize);

            for (let x = pX - 1; x <= pX + 1; x++) {
                for (let z = pZ - 1; z <= pZ + 1; z++) {
                    const key = `${x},${z}`;
                    const chunks = gameState.chunkGrid[key];
                    if (!chunks) continue;

                    for (let i = 0; i < chunks.length; i++) {
                        const chunk = chunks[i];
                        if (chunk.userData.isHit) continue;

                        if (Math.abs(chunk.position.x - pPos.x) < 40 && Math.abs(chunk.position.z - pPos.z) < 40) {
                            const dx = chunk.position.x - pPos.x;
                            const dz = chunk.position.z - pPos.z;
                            const distSq = dx * dx + dz * dz;
                            const collisionDist = (pRadius + chunk.userData.width / 2 + 5);

                            if (distSq < collisionDist * collisionDist) {
                                if (Math.abs(chunk.position.y - pPos.y) < (chunk.userData.height / 2 + 10)) {
                                    const dist = Math.sqrt(distSq) || 1;
                                    const overlap = collisionDist - dist;
                                    if (overlap > 0) {
                                        pPos.x -= (dx / dist) * overlap * 1.05;
                                        pPos.z -= (dz / dist) * overlap * 1.05;
                                    }

                                    const angleToChunk = Math.atan2(dx, dz);

                                    if (chunk.userData.isTree) {
                                        chunk.userData.health--;

                                        if (chunk.userData.health <= 0 || pSpeed > 25) {
                                            chunk.userData.isHit = true;
                                            chunk.matrixAutoUpdate = true;
                                            gameState.activeChunks.push(chunk);

                                            chunk.userData.velocity.set(
                                                Math.sin(pAngle) * pSpeed * 0.3,
                                                2 + Math.random() * 3,
                                                Math.cos(pAngle) * pSpeed * 0.3
                                            );

                                            chunk.userData.rotVelocity.set(
                                                (Math.random() - 0.5) * 0.3,
                                                0,
                                                (Math.random() - 0.5) * 0.3
                                            );

                                            if (chunk.userData.linkedFoliage) {
                                                const foliage = chunk.userData.linkedFoliage;
                                                foliage.userData.isHit = true;
                                                foliage.matrixAutoUpdate = true;
                                                gameState.activeChunks.push(foliage);
                                                foliage.userData.velocity = chunk.userData.velocity.clone();
                                                foliage.userData.velocity.y += 3;
                                                foliage.userData.rotVelocity = new THREE.Vector3(
                                                    (Math.random() - 0.5) * 0.5,
                                                    (Math.random() - 0.5) * 0.3,
                                                    (Math.random() - 0.5) * 0.5
                                                );
                                            }

                                            createTreeDebris(chunk.position, pSpeed, {
                                                isPolice: true,
                                                impactAngle: pAngle,
                                                vehicleMass: 1.0
                                            });
                                            policeCar.userData.speed *= 0.7;
                                        }
                                    } else if (chunk.userData.isHotdogStand) {
                                        chunk.userData.isHit = true;
                                        chunk.matrixAutoUpdate = true;
                                        gameState.activeChunks.push(chunk);

                                        chunk.userData.velocity.set(
                                            Math.sin(pAngle) * (pSpeed * 0.3 + 5),
                                            5 + Math.random() * 5,
                                            Math.cos(pAngle) * (pSpeed * 0.3 + 5)
                                        );

                                        chunk.userData.rotVelocity.set(
                                            (Math.random() - 0.5) * 0.2,
                                            (Math.random() - 0.5) * 0.2,
                                            (Math.random() - 0.5) * 0.2
                                        );

                                        createTreeDebris(chunk.position, pSpeed, {
                                            isPolice: true,
                                            impactAngle: pAngle,
                                            vehicleMass: 1.0
                                        });
                                        policeCar.userData.speed *= 0.7;
                                    } else {
                                        chunk.userData.isHit = true;
                                        chunk.matrixAutoUpdate = true;
                                        gameState.activeChunks.push(chunk);

                                        chunk.userData.velocity.set(
                                            Math.sin(pAngle) * pSpeed * 0.2 + (Math.sin(angleToChunk) * 5),
                                            Math.abs(pSpeed) * 0.1 + 5 + Math.random() * 5,
                                            Math.cos(pAngle) * pSpeed * 0.2 + (Math.cos(angleToChunk) * 5)
                                        );

                                        chunk.userData.rotVelocity.set(
                                            (Math.random() - 0.5) * 0.5,
                                            (Math.random() - 0.5) * 0.5,
                                            (Math.random() - 0.5) * 0.5
                                        );

                                        createBuildingDebris(chunk.position, chunk.material.color, pSpeed, {
                                            isPolice: true,
                                            impactAngle: pAngle,
                                            vehicleMass: 1.0,
                                            hasWindows: true
                                        });
                                        policeCar.userData.speed *= 0.6;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Collision with fallen debris (solid collision, size-based response)
    if (gameState.fallenDebris && gameState.fallenDebris.length > 0) {
        for (let i = gameState.fallenDebris.length - 1; i >= 0; i--) {
            const debris = gameState.fallenDebris[i];
            if (!debris || !debris.userData || !debris.userData.isFallenDebris) continue;
            
            // Use debris.position directly - since buildingGroup is at origin, 
            // local position equals world position for direct children
            const dx = debris.position.x - carPos.x;
            const dz = debris.position.z - carPos.z;
            const distSq = dx * dx + dz * dz;
            
            // Use actual debris size for collision
            const debrisWidth = debris.userData.width || 10;
            const debrisDepth = debris.userData.depth || 10;
            const debrisSizeVal = Math.max(debrisWidth, debrisDepth) / 2;
            const collisionDist = carRadius + debrisSizeVal + 2; // Add buffer
            
            if (distSq < collisionDist * collisionDist) {
                const dist = Math.sqrt(distSq) || 1;
                const carSpeed = Math.abs(gameState.speed);

                // Debris collision counts as a "hit" for police engagement.
                if (!gameState.hasHitObject) gameState.hasHitObject = true;
                
                // Classify debris and get collision properties
                const debrisSizeCategory = debris.userData.debrisSize || 
                    classifyDebrisSize(debrisWidth, debris.userData.height || 10, debrisDepth);
                const collisionResponse = calculateVehicleDebrisCollision(carSpeed, debrisSizeCategory);
                
                // Calculate push direction (away from debris center)
                const normX = -dx / dist;
                const normZ = -dz / dist;
                
                // Push CAR back (solid collision - no passing through!)
                const overlap = collisionDist - dist;
                if (overlap > 0) {
                    const pushBack = overlap * collisionResponse.pushBackForce;
                    playerCar.position.x += normX * pushBack;
                    playerCar.position.z += normZ * pushBack;
                }
                
                // Apply screen shake
                gameState.screenShake = Math.max(gameState.screenShake || 0, collisionResponse.screenShake);
                
                // Shatter into smaller pieces if going fast enough (not on foot)
                if (!isOnFoot && collisionResponse.shouldShatter) {
                    // Remove from fallen debris
                    gameState.fallenDebris.splice(i, 1);
                    
                    // Also remove from unified debris array
                    const debrisIdx = gameState.debris?.indexOf(debris);
                    if (debrisIdx > -1) gameState.debris.splice(debrisIdx, 1);
                    
                    // Remove from scene
                    if (debris.parent) {
                        debris.parent.remove(debris);
                    } else {
                        scene.remove(debris);
                    }
                    
                    // Create smaller debris pieces based on size
                    const numPieces = calculateShatterPieces(debrisSizeCategory, carSpeed);
                    shatterDebris(debris, carSpeed, numPieces);
                    
                    // Speed reduction based on collision response
                    gameState.speed = collisionResponse.newSpeed;
                    
                    logEvent(EVENTS.COLLISION, "Debris shattered!");
                } else {
                    // Slow collision - push debris instead of shattering
                    gameState.speed = collisionResponse.newSpeed;
                    
                    // Push debris based on car momentum
                    const pushForce = Math.max(2, carSpeed * 0.5);
                    debris.position.x += (-normX) * pushForce;
                    debris.position.z += (-normZ) * pushForce;
                    
                    // Add some rotation to pushed debris
                    debris.rotation.y += (Math.random() - 0.5) * 0.3;
                    
                    // Re-enable matrix updates and update immediately so the visual position updates
                    debris.matrixAutoUpdate = true;
                    debris.updateMatrix();
                }
            }
        }
    }
    
    // Police collision with fallen debris (solid body physics)
    if (gameState.fallenDebris && gameState.fallenDebris.length > 0 && 
        gameState.policeCars && gameState.policeCars.length > 0) {
        gameState.policeCars.forEach(policeCar => {
            if (!policeCar || policeCar.userData?.dead) return;
            
            const pPos = policeCar.position;
            const pSpeed = Math.abs(policeCar.userData?.speed || 0);
            const pRadius = 15;
            
            for (let i = gameState.fallenDebris.length - 1; i >= 0; i--) {
                const debris = gameState.fallenDebris[i];
                if (!debris || !debris.userData || !debris.userData.isFallenDebris) continue;
                
                // Use debris.position directly - since buildingGroup is at origin,
                // local position equals world position for direct children
                const dx = debris.position.x - pPos.x;
                const dz = debris.position.z - pPos.z;
                const distSq = dx * dx + dz * dz;
                
                const debrisWidth = debris.userData.width || 10;
                const debrisDepth = debris.userData.depth || 10;
                const debrisSizeVal = Math.max(debrisWidth, debrisDepth) / 2;
                const collisionDist = pRadius + debrisSizeVal + 2;
                
                if (distSq < collisionDist * collisionDist) {
                    const dist = Math.sqrt(distSq) || 1;
                    const normX = -dx / dist;
                    const normZ = -dz / dist;
                    
                    // Classify debris and get collision properties
                    const debrisSizeCategory = debris.userData.debrisSize || 
                        classifyDebrisSize(debrisWidth, debris.userData.height || 10, debrisDepth);
                    const collisionResponse = calculateVehicleDebrisCollision(pSpeed, debrisSizeCategory);
                    
                    // Push police car back (solid collision)
                    const overlap = collisionDist - dist;
                    if (overlap > 0) {
                        const pushBack = overlap * collisionResponse.pushBackForce;
                        pPos.x += normX * pushBack;
                        pPos.z += normZ * pushBack;
                    }
                    
                    // Police can push debris around but at reduced speed
                    if (collisionResponse.shouldShatter) {
                        // High speed: shatter the debris
                        gameState.fallenDebris.splice(i, 1);
                        
                        // Also remove from unified debris array
                        const debrisIdx = gameState.debris?.indexOf(debris);
                        if (debrisIdx > -1) gameState.debris.splice(debrisIdx, 1);
                        
                        if (debris.parent) {
                            debris.parent.remove(debris);
                        } else {
                            scene.remove(debris);
                        }
                        const numPieces = calculateShatterPieces(debrisSizeCategory, pSpeed);
                        shatterDebris(debris, pSpeed, numPieces);
                        policeCar.userData.speed = collisionResponse.newSpeed;
                    } else {
                        // Low speed: push the debris
                        policeCar.userData.speed = collisionResponse.newSpeed;
                        const pushForce = Math.max(1, pSpeed * 0.3);
                        debris.position.x += (-normX) * pushForce;
                        debris.position.z += (-normZ) * pushForce;
                        debris.rotation.y += (Math.random() - 0.5) * 0.2;
                        
                        // Re-enable matrix updates and update immediately so the visual position updates
                        debris.matrixAutoUpdate = true;
                        debris.updateMatrix();
                    }
                }
            }
        });
    }
    
    // Check for unsupported chunks (floating buildings) - apply delayed gravity
    checkFloatingChunks(delta);
    
    // Collision with small debris - can also be smashed further
    if (gameState.smallDebris && gameState.smallDebris.length > 0) {
        for (let i = gameState.smallDebris.length - 1; i >= 0; i--) {
            const piece = gameState.smallDebris[i];
            if (!piece || !piece.userData) continue;
            
            const dx = piece.position.x - carPos.x;
            const dz = piece.position.z - carPos.z;
            const distSq = dx * dx + dz * dz;
            
            const pieceSize = (piece.userData.width || 3) / 2;
            const collisionDist = carRadius + pieceSize;
            
            if (distSq < collisionDist * collisionDist) {
                const carSpeed = Math.abs(gameState.speed);
                
                // Small debris gets kicked around or destroyed
                if (carSpeed > 5 && piece.userData.width > 1.5) {
                    // Smash small debris into even tinier pieces
                    scene.remove(piece);
                    gameState.smallDebris.splice(i, 1);
                    const idx = gameState.activeChunks.indexOf(piece);
                    if (idx > -1) gameState.activeChunks.splice(idx, 1);
                    
                    // Create tiny fragments
                    createTinyFragments(piece.position, piece.material, carSpeed);
                    
                    // Minimal speed loss
                    gameState.speed *= 0.95;
                } else {
                    // Kick the debris away
                    const dist = Math.sqrt(distSq) || 1;
                    const kickX = -dx / dist * (carSpeed * 0.8);
                    const kickZ = -dz / dist * (carSpeed * 0.8);
                    
                    if (piece.userData.velocity) {
                        piece.userData.velocity.x += kickX;
                        piece.userData.velocity.z += kickZ;
                        piece.userData.velocity.y += carSpeed * 0.3;
                    }
                    
                    // Almost no speed loss from tiny debris
                    gameState.speed *= 0.98;
                }
            }
        }
    }
}

/**
 * Create tree debris (wood chunks and leaves)
 * Uses unified debris physics for consistency
 * 
 * @param {any} position - Impact position
 * @param {number} carSpeed - Speed at impact
 * @param {Partial<{ isPolice: boolean, impactAngle: number, vehicleMass: number }>} [options]
 */
function createTreeDebris(position, carSpeed, options = {}) {
    const {
        isPolice = false,
        impactAngle = playerCar?.rotation.y || 0,
        vehicleMass = 1.0
    } = options;
    
    // Generate debris plan using unified physics
    const plan = generateTreeDebrisPlan({
        speed: carSpeed,
        impactAngle,
        vehicleMass,
        isPolice,
        position: { x: position.x, y: position.y, z: position.z }
    });
    
    // Create wood splinters
    for (const splinterData of plan.wood) {
        const splinterGeometry = new THREE.BoxGeometry(
            splinterData.size.width,
            splinterData.size.height,
            splinterData.size.depth
        );
        const splinterMaterial = new THREE.MeshLambertMaterial({ 
            color: splinterData.color 
        });
        const splinter = new THREE.Mesh(splinterGeometry, splinterMaterial);
        
        splinter.position.set(
            splinterData.position.x,
            splinterData.position.y,
            splinterData.position.z
        );
        
        splinter.userData = {
            isSmallDebris: true,
            lifetime: splinterData.lifetime
        };

        const body = createDebrisBody({
            width: splinterData.size.width,
            height: splinterData.size.height,
            depth: splinterData.size.depth,
            material: 'wood',
            position: splinterData.position,
            velocity: splinterData.velocity,
            rotation: splinterData.rotation
        });
        
        scene.add(splinter);
        physicsWorld.add(splinter, body);

        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(splinter);
    }
    
    // Create leaves
    for (const leafData of plan.leaves) {
        const leafGeometry = new THREE.BoxGeometry(
            leafData.size.width,
            leafData.size.height,
            leafData.size.depth
        );
        const leafMaterial = new THREE.MeshLambertMaterial({ 
            color: leafData.color 
        });
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        
        leaf.position.set(
            leafData.position.x,
            leafData.position.y,
            leafData.position.z
        );
        
        leaf.userData = {
            isSmallDebris: true
        };

        const body = createDebrisBody({
            width: leafData.size.width,
            height: leafData.size.height,
            depth: leafData.size.depth,
            material: 'leaf',
            position: leafData.position,
            velocity: leafData.velocity,
            rotation: leafData.rotation
        });
        
        scene.add(leaf);
        physicsWorld.add(leaf, body);

        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(leaf);
    }
}

/**
 * Create building debris (concrete chunks, glass shards, dust particles)
 * Uses unified debris physics for consistency between player and police
 * 
 * @param {any} position - Impact position
 * @param {any} buildingColor - Color of the building material
 * @param {number} carSpeed - Speed at impact
 * @param {Partial<{ isPolice: boolean, impactAngle: number, vehicleMass: number, hasWindows: boolean }>} [options]
 */
export function createBuildingDebris(position, buildingColor, carSpeed, options = {}) {
    const {
        isPolice = false,
        impactAngle = playerCar?.rotation.y || 0,
        vehicleMass = 1.0,
        hasWindows = true
    } = options;
    
    // Convert color to hex if it's a THREE.Color
    let colorHex = buildingColor;
    if (buildingColor && buildingColor.getHex) {
        colorHex = buildingColor.getHex();
    } else if (!buildingColor) {
        colorHex = DEBRIS_MATERIALS.concrete.color;
    }
    
    // Generate debris plan using unified physics
    const plan = generateBuildingDebrisPlan({
        speed: carSpeed,
        impactAngle,
        vehicleMass,
        isPolice,
        position: { x: position.x, y: position.y, z: position.z },
        buildingColor: colorHex,
        hasWindows
    });
    
    // Create concrete chunks
    const baseColor = new THREE.Color(colorHex);
    for (const chunkData of plan.concrete) {
        const chunkGeometry = new THREE.BoxGeometry(
            chunkData.size.width,
            chunkData.size.height,
            chunkData.size.depth
        );
        
        // Vary color slightly for realism
        const variedColor = baseColor.clone();
        variedColor.offsetHSL(0, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.2);
        const chunkMaterial = new THREE.MeshLambertMaterial({ color: variedColor });
        const chunk = new THREE.Mesh(chunkGeometry, chunkMaterial);
        
        chunk.position.set(
            chunkData.position.x,
            chunkData.position.y,
            chunkData.position.z
        );
        
        // Initial rotation handled by physics body sync
        
        chunk.userData = {
            isSmallDebris: true,
            lifetime: chunkData.lifetime
        };

        // Create Physics Body
        const body = createDebrisBody({
            width: chunkData.size.width,
            height: chunkData.size.height,
            depth: chunkData.size.depth,
            material: 'concrete',
            position: chunkData.position,
            velocity: chunkData.velocity,
            rotation: chunkData.rotation
        });
        
        scene.add(chunk);
        physicsWorld.add(chunk, body);
        
        // gameState.activeChunks.push(chunk); // REMOVED: Managed by PhysicsWorld
        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(chunk);
    }
    
    // Create glass shards
    for (const shardData of plan.glass) {
        const shardGeometry = new THREE.BoxGeometry(
            shardData.size.width,
            shardData.size.height,
            shardData.size.depth
        );
        const shardMaterial = new THREE.MeshBasicMaterial({ 
            color: shardData.color,
            transparent: shardData.transparent,
            opacity: shardData.opacity
        });
        const shard = new THREE.Mesh(shardGeometry, shardMaterial);
        
        shard.position.set(
            shardData.position.x,
            shardData.position.y,
            shardData.position.z
        );
        
        shard.userData = {
            isSmallDebris: true,
            lifetime: shardData.lifetime
        };

        const body = createDebrisBody({
            width: shardData.size.width,
            height: shardData.size.height,
            depth: shardData.size.depth,
            material: 'glass',
            position: shardData.position,
            velocity: shardData.velocity,
            rotation: shardData.rotation
        });
        
        scene.add(shard);
        physicsWorld.add(shard, body);

        // gameState.activeChunks.push(shard); // REMOVED
        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(shard);
    }
    
    // Create dust particles as small solid debris
    for (const dustData of plan.dust) {
        const dustGeometry = new THREE.SphereGeometry(
            dustData.size.width / 2, 6, 6
        );
        const dustMaterial = new THREE.MeshBasicMaterial({ 
            color: dustData.color,
            transparent: dustData.transparent,
            opacity: dustData.opacity
        });
        const dust = new THREE.Mesh(dustGeometry, dustMaterial);
        
        dust.position.set(
            dustData.position.x,
            dustData.position.y,
            dustData.position.z
        );
        
        dust.userData = {
            isSmallDebris: true,
            isDust: true
        };

        const body = createDebrisBody({
            width: dustData.size.width,
            height: dustData.size.height,
            depth: dustData.size.depth,
            material: 'dust',
            position: dustData.position,
            velocity: dustData.velocity
        });
        
        scene.add(dust);
        physicsWorld.add(dust, body);

        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(dust);
    }
    
    // Create sparks on impact
    createDebrisSparks(position, plan.sparkCount);
}

/**
 * Check for unsupported building chunks (floating in air) and make them fall with gravity.
 * A chunk is "unsupported" if there's no chunk directly below it, or the chunk below was destroyed.
 * Chunks get a delay before falling (wobble effect) to make it look realistic.
 */
function checkFloatingChunks(delta) {
    const gridSize = gameState.chunkGridSize;
    const checkRadius = 100; // Only check chunks near player for performance
    
    if (!playerCar) return;
    
    const playerX = playerCar.position.x;
    const playerZ = playerCar.position.z;
    
    // Get grid cells near player
    const pGridX = Math.floor(playerX / gridSize);
    const pGridZ = Math.floor(playerZ / gridSize);
    
    for (let gx = pGridX - 2; gx <= pGridX + 2; gx++) {
        for (let gz = pGridZ - 2; gz <= pGridZ + 2; gz++) {
            const key = `${gx},${gz}`;
            const chunks = gameState.chunkGrid[key];
            if (!chunks) continue;
            
            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                
                // Skip chunks already falling, hit, or trees/hotdog stands
                if (!chunk || chunk.userData.isHit || chunk.userData.isTree || 
                    chunk.userData.isHotdogStand || chunk.userData.isFloating) continue;
                
                // Skip chunks on the ground level (first layer)
                const chunkHeight = chunk.userData.height || 80;
                if (chunk.position.y <= chunkHeight / 2 + 5) continue;
                
                // Check distance from player (only process nearby chunks)
                const dx = chunk.position.x - playerX;
                const dz = chunk.position.z - playerZ;
                if (dx * dx + dz * dz > checkRadius * checkRadius) continue;
                
                // Check if this chunk has support below it
                const hasSupport = checkChunkSupport(chunk, chunks, key);
                
                if (!hasSupport) {
                    // Mark as floating and start the fall timer
                    if (!chunk.userData.floatTimer) {
                        chunk.userData.floatTimer = 0;
                        chunk.userData.isUnsupported = true;
                    }
                    
                    // Increment timer
                    chunk.userData.floatTimer += delta;
                    
                    // Wobble effect before falling (creates tension)
                    if (chunk.userData.floatTimer < 1.0) {
                        // Slight wobble
                        chunk.position.x += (Math.random() - 0.5) * 0.3;
                        chunk.position.z += (Math.random() - 0.5) * 0.3;
                        chunk.rotation.x = (Math.random() - 0.5) * 0.02;
                        chunk.rotation.z = (Math.random() - 0.5) * 0.02;
                        chunk.updateMatrix();
                    } else {
                        // Time to fall!
                        chunk.userData.isHit = true;
                        chunk.userData.isFloating = true;
                        chunk.matrixAutoUpdate = true;
                        
                        // Start Physics
                        const w = chunk.userData.width || 40; // Default building width approx
                        const h = chunk.userData.height || 35;
                        const d = chunk.userData.depth || 40;

                        const body = createDebrisBody({
                             width: w, height: h, depth: d,
                             material: 'concrete',
                             position: chunk.position,
                             velocity: { x: (Math.random()-0.5)*2, y: -1, z: (Math.random()-0.5)*2 },
                             rotation: { 
                                 x: (Math.random() - 0.5) * 0.2,
                                 y: (Math.random() - 0.5) * 0.1,
                                 z: (Math.random() - 0.5) * 0.2
                             }
                        });
                        
                        // Increase mass significantly for whole building blocks
                        body.mass *= 400; 
                        body.updateMassProperties();

                        physicsWorld.add(chunk, body);
                        
                        // Remove from grid to avoid double-processing
                        const idx = chunks.indexOf(chunk);
                        if (idx > -1) chunks.splice(idx, 1);
                        
                        // Create dust particles as chunk starts falling
                        createSmoke({ 
                            x: chunk.position.x, 
                            y: chunk.position.y - chunkHeight/2, 
                            z: chunk.position.z 
                        });
                    }
                }
            }
        }
    }
}

/**
 * Check if a chunk has support from chunks below it
 */
function checkChunkSupport(chunk, sameGridChunks, gridKey) {
    const chunkHeight = chunk.userData.height || 80;
    const chunkWidth = chunk.userData.width || 80;
    const chunkDepth = chunk.userData.depth || 80;
    const tolerance = 10;
    
    // Position of center of chunk below this one
    const belowY = chunk.position.y - chunkHeight;
    
    // If at ground level, it's supported
    if (belowY <= tolerance) return true;
    
    // Check chunks in same grid cell
    for (const other of sameGridChunks) {
        if (other === chunk || other.userData.isHit) continue;
        
        // Check if other chunk is directly below
        const yDiff = Math.abs(other.position.y - belowY);
        if (yDiff > tolerance) continue;
        
        // Check horizontal overlap
        const xDiff = Math.abs(other.position.x - chunk.position.x);
        const zDiff = Math.abs(other.position.z - chunk.position.z);
        
        const otherWidth = other.userData.width || 80;
        const otherDepth = other.userData.depth || 80;
        
        // Needs at least partial overlap to count as support
        if (xDiff < (chunkWidth + otherWidth) / 2 - tolerance &&
            zDiff < (chunkDepth + otherDepth) / 2 - tolerance) {
            return true;
        }
    }
    
    // Also check adjacent grid cells for support
    const gridSize = gameState.chunkGridSize;
    const [gx, gz] = gridKey.split(',').map(Number);
    
    for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
            if (dx === 0 && dz === 0) continue;
            
            const neighborKey = `${gx + dx},${gz + dz}`;
            const neighborChunks = gameState.chunkGrid[neighborKey];
            if (!neighborChunks) continue;
            
            for (const other of neighborChunks) {
                if (other === chunk || other.userData.isHit) continue;
                
                const yDiff = Math.abs(other.position.y - belowY);
                if (yDiff > tolerance) continue;
                
                const xDiff = Math.abs(other.position.x - chunk.position.x);
                const zDiff = Math.abs(other.position.z - chunk.position.z);
                
                const otherWidth = other.userData.width || 80;
                const otherDepth = other.userData.depth || 80;
                
                if (xDiff < (chunkWidth + otherWidth) / 2 - tolerance &&
                    zDiff < (chunkDepth + otherDepth) / 2 - tolerance) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

// Shatter fallen debris into smaller pieces
function shatterDebris(debris, carSpeed = 15, numPieces = 6) {
    const actualPieces = Math.max(4, numPieces + Math.floor(Math.random() * 3)); // Variable pieces
    const baseSize = Math.min(debris.userData.width, debris.userData.height, debris.userData.depth) / 2;
    
    // Impact direction based on car velocity
    const impactX = Math.sin(playerCar?.rotation.y || 0);
    const impactZ = Math.cos(playerCar?.rotation.y || 0);
    
    for (let i = 0; i < actualPieces; i++) {
        const pieceSize = baseSize * (0.2 + Math.random() * 0.5);
        const geometry = new THREE.BoxGeometry(pieceSize, pieceSize * (0.5 + Math.random() * 0.5), pieceSize);
        const piece = new THREE.Mesh(geometry, debris.material.clone());
        
        // Scatter around original position
        piece.position.set(
            debris.position.x + (Math.random() - 0.5) * debris.userData.width,
            debris.position.y + Math.random() * 3,
            debris.position.z + (Math.random() - 0.5) * debris.userData.depth
        );
        
        piece.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        // Velocity based on car speed and impact direction
        const spreadX = (Math.random() - 0.5) * carSpeed * 0.6;
        const spreadZ = (Math.random() - 0.5) * carSpeed * 0.6;
        
        piece.userData = {
            isSmallDebris: true,
            canShatter: pieceSize > 2, // Larger pieces can be shattered again
            velocity: new THREE.Vector3(
                impactX * carSpeed * 0.4 + spreadX,
                2 + Math.random() * (carSpeed * 0.3),
                impactZ * carSpeed * 0.4 + spreadZ
            ),
            rotVelocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5
            ),
            width: pieceSize,
            height: pieceSize,
            depth: pieceSize,
            lifetime: 400 + Math.floor(Math.random() * 200), // Variable lifetime
            gravity: 0.15 + Math.random() * 0.1
        };
        
        scene.add(piece);
        gameState.activeChunks.push(piece);
        
        // Track small debris for cleanup
        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(piece);
    }
    
    // Create dust/smoke effect
    createSmoke(debris.position);
    createDebrisSparks(debris.position, Math.min(8, Math.floor(carSpeed / 3)));
}

// Create tiny fragments when small debris is hit
function createTinyFragments(position, material, carSpeed) {
    const numFragments = 3 + Math.floor(Math.random() * 4);
    
    const impactX = Math.sin(playerCar?.rotation.y || 0);
    const impactZ = Math.cos(playerCar?.rotation.y || 0);
    
    for (let i = 0; i < numFragments; i++) {
        const size = 0.3 + Math.random() * 0.7;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const piece = new THREE.Mesh(geometry, material.clone());
        
        piece.position.copy(position);
        piece.position.y += Math.random() * 2;
        
        piece.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        piece.userData = {
            isSmallDebris: true,
            canShatter: false, // Too small to shatter
            velocity: new THREE.Vector3(
                impactX * carSpeed * 0.5 + (Math.random() - 0.5) * carSpeed * 0.8,
                1 + Math.random() * carSpeed * 0.2,
                impactZ * carSpeed * 0.5 + (Math.random() - 0.5) * carSpeed * 0.8
            ),
            rotVelocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.8,
                (Math.random() - 0.5) * 0.8,
                (Math.random() - 0.5) * 0.8
            ),
            width: size,
            height: size,
            depth: size,
            lifetime: 150 + Math.floor(Math.random() * 100), // Short lifetime
            gravity: 0.25
        };
        
        scene.add(piece);
        gameState.activeChunks.push(piece);
        
        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(piece);
    }
    
    // Tiny dust puff
    createSmoke(position, 0.5);
}

// Create sparks effect for debris collision
function createDebrisSparks(position, count = 5) {
    for (let i = 0; i < count; i++) {
        createSpark(position);
    }
}

// Update and cleanup small debris - DISABLED for realistic persistent debris
// All debris now stays in the world permanently as solid physics objects
export function cleanupSmallDebris() {
    // No cleanup - debris persists forever for realism
    // Physics engine handles sleeping bodies for performance
    return;
}

export function createMoney() {
    const coin = new THREE.Mesh(sharedGeometries.coin, sharedMaterials.coin);
    
    // 40% chance to spawn near player (within 200-500 units), rest random on map
    const nearPlayer = Math.random() < 0.4 && playerCar;
    
    if (nearPlayer) {
        // Spawn in a ring around the player (not too close, not too far)
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 300; // 200-500 units away
        coin.position.set(
            playerCar.position.x + Math.cos(angle) * distance,
            5,
            playerCar.position.z + Math.sin(angle) * distance
        );
    } else {
        const mapSize = 3500;
        coin.position.set(
            (Math.random() - 0.5) * mapSize * 2,
            5,
            (Math.random() - 0.5) * mapSize * 2
        );
    }
    coin.rotation.z = Math.PI / 2;
    coin.castShadow = true;
    
    scene.add(coin);
    gameState.collectibles.push(coin);
}

export function updateCollectibles() {
    if (gameState.arrested) return;

    // Higher spawn rate for better early game (8% chance per frame)
    // Also spawn more coins when player has less money (helps early progression)
    const spawnChance = gameState.money < 200 ? 0.12 : 0.06;
    
    if (Math.random() < spawnChance) { 
         createMoney();
         if (gameState.collectibles.length > 80) {
             const oldCoin = gameState.collectibles.shift();
             scene.remove(oldCoin);
         }
    }

    const playerX = playerCar ? playerCar.position.x : 0;
    const playerZ = playerCar ? playerCar.position.z : 0;
    const pickupRadiusSq = 400; // 20^2
    
    for (let i = gameState.collectibles.length - 1; i >= 0; i--) {
        const coin = gameState.collectibles[i];
        coin.rotation.y += 0.05;

        // Ensure coin is upright
        coin.rotation.z = Math.PI / 2;

        if(!playerCar) continue;
        const dx = playerX - coin.position.x;
        const dz = playerZ - coin.position.z;
        if (dx*dx + dz*dz < pickupRadiusSq) {
            // Save position for visual effect before removing
            const coinPos = coin.position.clone();
            
            scene.remove(coin);
            gameState.collectibles.splice(i, 1);
            
            const time = (gameState.arrested ? gameState.elapsedTime : (Date.now() - gameState.startTime) / 1000) || 0;
            const baseValue = gameConfig.coinBaseValue;
            const timeBonus = Math.floor(time / 10) * 10; 
            const rebirthMult = (gameState.rebirthPoints || 0) + 1;
            
            const totalAmount = (baseValue + timeBonus) * rebirthMult;
            addMoney(totalAmount);
            showFloatingMoney(totalAmount, coinPos, camera);
        }
    }
}

/**
 * MODULARE SKABELSESFUNKTIONER 
 * Bruges af både den indledende verden og Level Editoren
 */

export function removeObjectFromWorld(object) {
    if (!object) return;
    
    // Recursive search for chunks to remove from grid
    object.traverse(child => {
        // If it's a chunk or physics object (has userData)
        if (child.userData && (child.userData.buildingType || child.userData.isTree || child.userData.isHotdogStand || child.userData.isTreeFoliage)) {
             // Remove from chunks array
             if (gameState.chunks) {
                 const chunkIndex = gameState.chunks.indexOf(child);
                 if (chunkIndex > -1) {
                      gameState.chunks.splice(chunkIndex, 1);
                 }
             }
     
             // Remove from chunkGrid
             // We estimate key from current world position
             const worldPos = new THREE.Vector3();
             child.getWorldPosition(worldPos);
             
             const gridX = Math.floor(worldPos.x / gameState.chunkGridSize);
             const gridZ = Math.floor(worldPos.z / gameState.chunkGridSize);
             
             // Check this key and neighbors (in case of boundary issues)
             const keysToCheck = [
                 `${gridX},${gridZ}`,
                 `${gridX+1},${gridZ}`, `${gridX-1},${gridZ}`,
                 `${gridX},${gridZ+1}`, `${gridX},${gridZ-1}`
             ];
             
             keysToCheck.forEach(key => {
                 if (gameState.chunkGrid[key]) {
                      const idx = gameState.chunkGrid[key].indexOf(child);
                      if (idx > -1) {
                          gameState.chunkGrid[key].splice(idx, 1);
                      }
                 }
             });
        }
    });
    
    scene.remove(object);
}

export function addObjectToWorld(object) {
    if (!object) return;
    
    scene.add(object);
    
    // Recursive search for chunks to add to grid (restore physics)
    object.traverse(child => {
        if (child.userData && (child.userData.buildingType || child.userData.isTree || child.userData.isHotdogStand || child.userData.isTreeFoliage)) {
             if (gameState.chunks && gameState.chunks.indexOf(child) === -1) {
                 gameState.chunks.push(child);
             }
             
             // Re-calculate key
             const worldPos = new THREE.Vector3();
             child.getWorldPosition(worldPos);
             
             const gridX = Math.floor(worldPos.x / gameState.chunkGridSize);
             const gridZ = Math.floor(worldPos.z / gameState.chunkGridSize);
             const key = `${gridX},${gridZ}`;
             
             if (!gameState.chunkGrid[key]) gameState.chunkGrid[key] = [];
             if (gameState.chunkGrid[key].indexOf(child) === -1) {
                 gameState.chunkGrid[key].push(child);
             }
        }
    });
}

// Shared Window Materials
const winMatDark = new THREE.MeshBasicMaterial({ color: 0x263238, side: THREE.DoubleSide });
const winMatLit1 = new THREE.MeshBasicMaterial({ color: 0xFFF9C4, side: THREE.DoubleSide });
const winMatLit2 = new THREE.MeshBasicMaterial({ color: 0xFFE082, side: THREE.DoubleSide });

export function createSingleBuilding(x, z, width, depth, height, type) {
    const buildingGroup = new THREE.Group();
    
    // Vælg farve baseret på bygningstype
    const colors = type.colors;
    const buildingColor = colors[Math.floor(Math.random() * colors.length)];
    
    // BALANCED OPTIMIZATION:
    // chunkSize 80 gives a good balance between destruction detail and performance.
    // Windows are merged per-chunk to minimize draw calls.
    const chunkSize = 80; 
    const nx = Math.ceil(width / chunkSize);
    const ny = Math.ceil(height / chunkSize);
    const nz = Math.ceil(depth / chunkSize);

    const dx = width / nx;
    const dy = height / ny;
    const dz = depth / nz;

    const chunkGeometry = new THREE.BoxGeometry(dx, dy, dz);
    // Enhanced material with better lighting properties
    const buildingMaterial = new THREE.MeshStandardMaterial({ 
        color: buildingColor,
        roughness: 0.7,
        metalness: 0.1
    });
    
    const startX = x - width / 2 + dx / 2;
    const startY = dy / 2;
    const startZ = z - depth / 2 + dz / 2;

    // Store chunks in a grid for window attachment
    const chunks = []; 
    for(let ix = 0; ix < nx; ix++) {
        chunks[ix] = [];
        for(let iy = 0; iy < ny; iy++) {
            chunks[ix][iy] = [];
        }
    }

    for(let ix = 0; ix < nx; ix++) {
        for(let iy = 0; iy < ny; iy++) {
            for(let iz = 0; iz < nz; iz++) {
                const chunk = new THREE.Mesh(chunkGeometry, buildingMaterial);
                
                chunk.position.set(
                    startX + ix * dx,
                    startY + iy * dy,
                    startZ + iz * dz
                );

                chunk.matrixAutoUpdate = false;
                chunk.updateMatrix();
                
                chunk.userData = {
                    isHit: false,
                    buildingType: type.name,
                    velocity: new THREE.Vector3(),
                    rotVelocity: new THREE.Vector3(),
                    width: dx,
                    height: dy,
                    depth: dz
                };
                
                buildingGroup.add(chunk); 
                gameState.chunks.push(chunk);
                // Store in 3D array
                const chunkRow = chunks[ix] || (chunks[ix] = []);
                const chunkCol = chunkRow[iy] || (chunkRow[iy] = []);
                chunkCol[iz] = chunk;

                const gridX = Math.floor(chunk.position.x / gameState.chunkGridSize);
                const gridZ = Math.floor(chunk.position.z / gameState.chunkGridSize);
                const key = `${gridX},${gridZ}`;
                if (!gameState.chunkGrid[key]) gameState.chunkGrid[key] = [];
                gameState.chunkGrid[key].push(chunk);
            }
        }
    }
    
    // Add windows attached directly to chunks so they move with debris
    addWindowsToChunks(chunks, x, z, width, depth, height, type, dx, dy, dz, nx, ny, nz);
    
    // Tilføj specielle elementer baseret på type
    if (type.hasAwning) {
        const awningColor = type.name === 'pizzeria' ? 0x388E3C : 0x1565C0;
        const awning = createAwning(x, z, width, depth, awningColor);
        buildingGroup.add(awning);
    }
    
    if (type.hasColumns) {
        const numCols = type.name === 'parliament' ? 6 : 4;
        const columns = createColumns(x, z, width, depth, height, numCols);
        buildingGroup.add(columns);
    }
    
    if (type.hasTower) {
        const tower = createChurchTower(x, z - depth/4, height);
        buildingGroup.add(tower);
    }
    
    if (type.hasDome) {
        const dome = createDome(x, z, height, 30);
        buildingGroup.add(dome);
    }
    
    if (type.hasCow) {
        const cow = createCow(x, z, height + 45);
        buildingGroup.add(cow);
    }
    
    if (type.hasFlagpole) {
        const flagpole = createFlagpole(x + width/2 + 15, z + depth/2 + 10, 0);
        buildingGroup.add(flagpole);
    }
    
    if (type.signColor) {
        const sign = createSign(x, z + depth/2 + 2, width, height, type.name, type.signColor, 0x000000);
        buildingGroup.add(sign);
    }
    
    scene.add(buildingGroup);
    return buildingGroup;
}

export function createSingleTree(x, z) {
    const trunkGeometry = new THREE.CylinderGeometry(8, 12, 50, 8);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x5D4037 });
    const foliageGeometry = new THREE.ConeGeometry(35, 70, 8);
    const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x2E7D32 });

    const treeGroup = new THREE.Group();

    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 25, z);
    trunk.matrixAutoUpdate = false;
    trunk.updateMatrix();

    trunk.castShadow = true;
    trunk.userData = {
        isTree: true,
        isHit: false,
        health: 2,
        velocity: new THREE.Vector3(),
        rotVelocity: new THREE.Vector3(),
        width: 20,
        height: 50,
        depth: 20
    };
    // scene.add(trunk); // REMOVED
    gameState.chunks.push(trunk);
    
    const gridX = Math.floor(trunk.position.x / gameState.chunkGridSize);
    const gridZ = Math.floor(trunk.position.z / gameState.chunkGridSize);
    const key = `${gridX},${gridZ}`;
    if (!gameState.chunkGrid[key]) gameState.chunkGrid[key] = [];
    gameState.chunkGrid[key].push(trunk);

    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.set(x, 80, z);
    foliage.matrixAutoUpdate = false;
    foliage.updateMatrix();
    foliage.castShadow = true;
    
    foliage.userData = {
        isTreeFoliage: true,
        linkedTrunk: trunk,
        isHit: false,
        velocity: new THREE.Vector3(),
        rotVelocity: new THREE.Vector3(),
        width: 35,
        height: 70,
        depth: 35
    };
    // scene.add(foliage); // REMOVED
    // Note: for trees, we don't necessarily need the foliage in the grid if hitting the trunk is enough, 
    // but building hits check everything in the grid.
    // The physics loop for chunks iterates activeChunks.
    // Collision loop iterates gameState.chunks via the grid.
    
    gameState.chunks.push(foliage);
    const fGridX = Math.floor(foliage.position.x / gameState.chunkGridSize);
    const fGridZ = Math.floor(foliage.position.z / gameState.chunkGridSize);
    const fKey = `${fGridX},${fGridZ}`;
    if (!gameState.chunkGrid[fKey]) gameState.chunkGrid[fKey] = [];
    gameState.chunkGrid[fKey].push(foliage);

    trunk.userData.linkedFoliage = foliage;
    
    treeGroup.add(trunk);
    treeGroup.add(foliage);
    return treeGroup;
}

export function createSingleHotdogStand(x, z) {
    const standGroup = new THREE.Group();

    // Body (destructible)
    const bodyGeo = new THREE.BoxGeometry(30, 22, 18);
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(x, 17, z);
    
    body.userData = {
        isHotdogStand: true,
        isHit: false,
        velocity: new THREE.Vector3(),
        rotVelocity: new THREE.Vector3(),
        width: 30,
        height: 22,
        depth: 18
    };
    
    // scene.add(body); // REMOVED
    gameState.chunks.push(body);
    
    const gridX = Math.floor(body.position.x / gameState.chunkGridSize);
    const gridZ = Math.floor(body.position.z / gameState.chunkGridSize);
    const key = `${gridX},${gridZ}`;
    if (!gameState.chunkGrid[key]) gameState.chunkGrid[key] = [];
    gameState.chunkGrid[key].push(body);

    // Stripe (destructible/child)
    const stripeGeo = new THREE.BoxGeometry(30.5, 5, 18.5);
    const redMat = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
    const stripe = new THREE.Mesh(stripeGeo, redMat);
    stripe.position.set(0, 3, 0); 
    body.add(stripe);

    // Umbrella (destructible/child)
    const umbrellaGeo = new THREE.ConeGeometry(25, 10, 8);
    const umbrella = new THREE.Mesh(umbrellaGeo, redMat);
    umbrella.position.set(0, 40, 0);
    body.add(umbrella);

    // Pole (destructible/child)
    const poleGeo = new THREE.CylinderGeometry(1, 1, 40);
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x888888 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(0, 18, 0);
    body.add(pole);

    // Wheels (destructible/child)
    const wheelGeo = new THREE.CylinderGeometry(4, 4, 2, 8);
    const wheelMat = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel1 = new THREE.Mesh(wheelGeo, wheelMat);
    wheel1.rotation.z = Math.PI / 2;
    wheel1.position.set(-10, -10, 9);
    body.add(wheel1);
    
    const wheel2 = wheel1.clone();
    wheel2.position.set(10, -10, 9);
    body.add(wheel2);
    
    const wheel3 = wheel1.clone();
    wheel3.position.set(-10, -10, -9);
    body.add(wheel3);
    
    const wheel4 = wheel1.clone();
    wheel4.position.set(10, -10, -9);
    body.add(wheel4);
    
    return body;
}

// ============================================
// ENDLESS WORLD SYSTEM - Procedural Generation
// ============================================

// Track which world regions have been generated
const generatedRegions = new Set();
const REGION_SIZE = 1500; // Size of each procedurally generated region
const RENDER_DISTANCE = 3; // How many regions to keep loaded around player
const regionObjects = {}; // Store objects per region for cleanup

// PERFORMANCE: Shared geometries and materials for region generation
const regionSharedGeo = {
    ground: new THREE.PlaneGeometry(REGION_SIZE, REGION_SIZE),
    roadSegment: new THREE.BoxGeometry(300, 0.5, 310),
    roadMarking: new THREE.BoxGeometry(4, 0.6, 150),
    roadEdge: new THREE.BoxGeometry(3, 0.55, 300),
    roadPatchX: new THREE.BoxGeometry(REGION_SIZE + 10, 0.5, 300),
    roadMarkingX: new THREE.PlaneGeometry(5, 150)
};
const regionSharedMat = {
    ground: new THREE.MeshLambertMaterial({ color: 0x444444 }), // Match main ground color
    road: new THREE.MeshLambertMaterial({ color: 0x222222 }),
    markingYellow: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    edgeWhite: new THREE.MeshBasicMaterial({ color: 0xffffff })
};

// Seeded random number generator for consistent world generation
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Generate a deterministic seed from region coordinates
function regionSeed(rx, rz) {
    return rx * 73856093 + rz * 19349663;
}

// Generate content for a specific region
function generateRegion(rx, rz) {
    const regionKey = `${rx},${rz}`;
    if (generatedRegions.has(regionKey)) return;
    
    generatedRegions.add(regionKey);
    regionObjects[regionKey] = [];
    
    const seed = regionSeed(rx, rz);
    const baseX = rx * REGION_SIZE;
    const baseZ = rz * REGION_SIZE;
    
    // Don't generate buildings in the spawn region (0,0) - that has static buildings
    const isSpawnRegion = rx >= -1 && rx <= 1 && rz >= -1 && rz <= 1;
    
    // Check if this region is on a main road axis (roads go infinitely along x=0 and z=0)
    const isOnMainRoadX = Math.abs(baseX) < 200; // Road along Z axis
    const isOnMainRoadZ = Math.abs(baseZ) < 200; // Road along X axis
    
    // Generate buildings for this region - avoid road areas
    const numBuildings = isSpawnRegion ? 0 : 4 + Math.floor(seededRandom(seed) * 6);
    for (let i = 0; i < numBuildings; i++) {
        const bSeed = seed + i * 1000;
        let bx = baseX + seededRandom(bSeed) * REGION_SIZE - REGION_SIZE/2;
        let bz = baseZ + seededRandom(bSeed + 1) * REGION_SIZE - REGION_SIZE/2;
        
        // Avoid main straight roads
        if (Math.abs(bx) < 250) bx += (bx >= 0 ? 300 : -300);
        if (Math.abs(bz) < 250) bz += (bz >= 0 ? 300 : -300);
        
        const width = 80 + seededRandom(bSeed + 2) * 60;
        const depth = 60 + seededRandom(bSeed + 3) * 50;
        const height = 100 + seededRandom(bSeed + 4) * 150;
        const typeIndex = Math.floor(seededRandom(bSeed + 5) * Object.keys(BUILDING_TYPES).length);
        const type = Object.values(BUILDING_TYPES)[typeIndex];
        
        try {
            const building = createSingleBuilding(bx, bz, width, depth, height, type);
            scene.add(building);
            regionObjects[regionKey].push(building);
        } catch(e) { /* skip failed buildings */ }
    }
    
    // Generate trees for this region
    const numTrees = 3 + Math.floor(seededRandom(seed + 500) * 5);
    for (let i = 0; i < numTrees; i++) {
        const tSeed = seed + 500 + i * 100;
        let tx = baseX + seededRandom(tSeed) * REGION_SIZE - REGION_SIZE/2;
        let tz = baseZ + seededRandom(tSeed + 1) * REGION_SIZE - REGION_SIZE/2;
        
        // Avoid main roads
        if (Math.abs(tx) < 200 || Math.abs(tz) < 200) continue;
        
        try {
            const tree = createSingleTree(tx, tz);
            scene.add(tree);
            regionObjects[regionKey].push(tree);
        } catch(e) { /* skip failed trees */ }
    }
    
    // Generate ground for ALL regions (endless ground) - using shared geometry/material
    const groundPatch = new THREE.Mesh(regionSharedGeo.ground, regionSharedMat.ground);
    groundPatch.rotation.x = -Math.PI / 2;
    groundPatch.position.set(baseX, -0.1, baseZ);
    groundPatch.receiveShadow = true;
    scene.add(groundPatch);
    regionObjects[regionKey].push(groundPatch);
    
    // === SIMPLE STRAIGHT ROADS ===
    // Road along Z-axis (at x=0) - continues infinitely north/south
    if (Math.abs(rx) === 0) {
        const roadPatchZ = new THREE.Mesh(regionSharedGeo.roadPatchX, regionSharedMat.road);
        roadPatchZ.rotation.y = Math.PI / 2; // Rotate to align with Z axis
        roadPatchZ.position.set(0, 0.25, baseZ); // Raised to prevent Z-fighting
        roadPatchZ.receiveShadow = true;
        scene.add(roadPatchZ);
        regionObjects[regionKey].push(roadPatchZ);
        
        // Road markings (center line)
        for (let i = 0; i < 3; i++) {
            const markingsZ = new THREE.Mesh(regionSharedGeo.roadMarkingX, regionSharedMat.markingYellow);
            markingsZ.rotation.x = -Math.PI / 2;
            markingsZ.position.set(0, 0.35, baseZ - REGION_SIZE/2 + (i + 0.5) * REGION_SIZE/3);
            scene.add(markingsZ);
            regionObjects[regionKey].push(markingsZ);
        }
        
        // Edge lines
        const edgeLeftZ = new THREE.Mesh(regionSharedGeo.roadEdge, regionSharedMat.edgeWhite);
        edgeLeftZ.position.set(-140, 0.32, baseZ);
        scene.add(edgeLeftZ);
        regionObjects[regionKey].push(edgeLeftZ);
        
        const edgeRightZ = new THREE.Mesh(regionSharedGeo.roadEdge, regionSharedMat.edgeWhite);
        edgeRightZ.position.set(140, 0.32, baseZ);
        scene.add(edgeRightZ);
        regionObjects[regionKey].push(edgeRightZ);
    }
    
    // Road along X-axis (at z=0) - continues infinitely east/west
    if (Math.abs(rz) === 0 && Math.abs(rx) > 0) {
        const roadPatchX = new THREE.Mesh(regionSharedGeo.roadPatchX, regionSharedMat.road);
        roadPatchX.position.set(baseX, 0.25, 0); // Raised to prevent Z-fighting
        roadPatchX.receiveShadow = true;
        scene.add(roadPatchX);
        regionObjects[regionKey].push(roadPatchX);
        
        // Road markings (center line)
        for (let i = 0; i < 3; i++) {
            const markingsX = new THREE.Mesh(regionSharedGeo.roadMarkingX, regionSharedMat.markingYellow);
            markingsX.rotation.x = -Math.PI / 2;
            markingsX.rotation.z = Math.PI / 2;
            markingsX.position.set(baseX - REGION_SIZE/2 + (i + 0.5) * REGION_SIZE/3, 0.35, 0);
            scene.add(markingsX);
            regionObjects[regionKey].push(markingsX);
        }
        
        // Edge lines
        const edgeLeft = new THREE.Mesh(regionSharedGeo.roadEdge, regionSharedMat.edgeWhite);
        edgeLeft.rotation.y = Math.PI / 2;
        edgeLeft.position.set(baseX, 0.32, -140);
        scene.add(edgeLeft);
        regionObjects[regionKey].push(edgeLeft);
        
        const edgeRight = new THREE.Mesh(regionSharedGeo.roadEdge, regionSharedMat.edgeWhite);
        edgeRight.rotation.y = Math.PI / 2;
        edgeRight.position.set(baseX, 0.32, 140);
        scene.add(edgeRight);
        regionObjects[regionKey].push(edgeRight);
    }
}

// Remove a region's objects from the scene
function unloadRegion(rx, rz) {
    const regionKey = `${rx},${rz}`;
    if (!regionObjects[regionKey]) return;
    
    regionObjects[regionKey].forEach(obj => {
        scene.remove(obj);
        // Clean up geometries and materials
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(m => m.dispose());
            } else {
                obj.material.dispose();
            }
        }
        // Recursively clean children
        obj.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => m.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
    });
    
    delete regionObjects[regionKey];
    generatedRegions.delete(regionKey);
}

// Update endless world based on player position
export function updateEndlessWorld(playerPosition) {
    if (!playerPosition) return;

    // Move sky with player to maintain "endless" horizon illusion
    if (skyMesh) {
        skyMesh.position.x = playerPosition.x;
        skyMesh.position.z = playerPosition.z;
        skyMesh.position.y = 0; // Keep sky grounded
    }
    
    const playerRX = Math.floor(playerPosition.x / REGION_SIZE);
    const playerRZ = Math.floor(playerPosition.z / REGION_SIZE);
    
    // Generate regions around player
    for (let dx = -RENDER_DISTANCE; dx <= RENDER_DISTANCE; dx++) {
        for (let dz = -RENDER_DISTANCE; dz <= RENDER_DISTANCE; dz++) {
            generateRegion(playerRX + dx, playerRZ + dz);
        }
    }
    
    // Unload distant regions more aggressively
    const regionsToUnload = [];
    for (const key of generatedRegions) {
        const [rx, rz] = key.split(',').map(Number);
        // Unload if more than RENDER_DISTANCE away (was +1, now exact)
        if (Math.abs(rx - playerRX) > RENDER_DISTANCE || 
            Math.abs(rz - playerRZ) > RENDER_DISTANCE) {
            regionsToUnload.push([rx, rz]);
        }
    }
    
    regionsToUnload.forEach(([rx, rz]) => unloadRegion(rx, rz));
}
