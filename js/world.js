import { gameState } from './state.js';
import { gameConfig } from './config.js';
import { scene } from './core.js';
import { sharedGeometries, sharedMaterials } from './assets.js';
import { playerCar, takeDamage } from './player.js';
import { createSmoke, createSpark } from './particles.js';
import { addMoney } from './ui.js';
import { logEvent, EVENTS } from './commentary.js';
import { BUILDING_TYPES } from './constants.js';

export function createSky() {
    // Gradient Sky
    const vertexShader = `
        varying vec3 vWorldPosition;
        void main() {
            vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;
    const fragmentShader = `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
            float h = normalize( vWorldPosition + offset ).y;
            gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );
        }
    `;

    const uniforms = {
        topColor: { value: new THREE.Color(0x0077ff) },
        bottomColor: { value: new THREE.Color(0xffffff) },
        offset: { value: 33 },
        exponent: { value: 0.6 }
    };
    uniforms.bottomColor.value.copy(scene.fog.color); // Blend horizon with fog

    const skyGeo = new THREE.SphereGeometry(8000, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
}

// Helper to create a procedural window texture for background buildings
function createWindowTexture() {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Background (Dark)
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, 64, 64);
        
        // Windows
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 4; x++) {
                if (Math.random() > 0.4) {
                     ctx.fillStyle = Math.random() > 0.5 ? '#FEF9E7' : '#F4D03F'; // Warm lights
                     // Draw pairs of windows
                     ctx.fillRect(4 + x * 16, 4 + y * 8, 4, 4);
                     ctx.fillRect(10 + x * 16, 4 + y * 8, 4, 4);
            }
        }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter; // Pixelated look
    return texture;
    } catch (e) {
        console.error("Window texture creation failed", e);
        return null;
    }
}

export function createDistantCityscape() {
    try {
        // Generate a dense city ring at the EDGE of the map (Map radius is approx 5000)
        // Moved further out as requested
        const buildingCount = 450; 
        const minRadius = 4200;
        const maxRadius = 4900;
        const windowTexture = createWindowTexture();
        
        const buildingGeo = new THREE.BoxGeometry(100, 300, 100);
        // Fallback to basic color if texture fails
        const buildingMat = new THREE.MeshLambertMaterial({ 
            map: windowTexture,
            emissiveMap: windowTexture,
            emissive: 0x555555,
            emissiveIntensity: 0.8,
            color: 0xffffff // White base allows instance colors to show through
        });
        
        // Instanced mesh for performance
        const instancedMesh = new THREE.InstancedMesh(buildingGeo, buildingMat, buildingCount);
        
        // Explicitly create instanceColor buffer to avoid potential crash
        if (!instancedMesh.instanceColor) {
             // Let Three.js handle it or verify version compatibility
        }

        const dummy = new THREE.Object3D();
        const color = new THREE.Color();
        // Colorful palette for distant buildings (Neon/Cyberpunk-ish dark tones)
        const palette = [
            0x2C3E50, // Dark Blue
            0x8E44AD, // Purple
            0x2980B9, // Blue
            0xC0392B, // Dark Red
            0xD35400, // Pumpkin
            0x27AE60, // Green
            0x1A252F  // Dark Slate
        ];
        
        for (let i = 0; i < buildingCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = minRadius + Math.random() * (maxRadius - minRadius);
            
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            
            const width = 120 + Math.random() * 200;
            const depth = 120 + Math.random() * 200;
            const height = 300 + Math.random() * 800; 
            
            dummy.position.set(x, height / 2, z);
            dummy.rotation.y = Math.random() * Math.PI;
            dummy.scale.set(width / 100, height / 300, depth / 100);
            dummy.updateMatrix();
            
            instancedMesh.setMatrixAt(i, dummy.matrix);
            
            // Random dark color variation
            color.setHex(palette[Math.floor(Math.random() * palette.length)]);
            instancedMesh.setColorAt(i, color);
        }
        
        instancedMesh.instanceMatrix.needsUpdate = true;
        if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
        
        scene.add(instancedMesh);
        
        // Add "Radio Towers"
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = minRadius + Math.random() * (maxRadius - minRadius);
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            
            const towerHeight = 1000 + Math.random() * 500;
            
            const towerGeo = new THREE.CylinderGeometry(5, 30, towerHeight, 4);
            const towerMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
            const tower = new THREE.Mesh(towerGeo, towerMat);
            tower.position.set(x, towerHeight / 2, z);
            scene.add(tower);
            
            const lightGeo = new THREE.SphereGeometry(40, 4, 4);
            const lightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const light = new THREE.Mesh(lightGeo, lightMat);
            light.position.set(0, towerHeight / 2, 0);
            tower.add(light);
        }
    } catch (err) {
        console.error("Distant cityscape generation failed:", err);
    }
}

export function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Main Road - Horizontal
    const roadGeometry = new THREE.BoxGeometry(300, 0.4, 10000);
    const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.position.set(0, 0.2, 0);
    road.receiveShadow = true;
    scene.add(road);

    // Main Road - Vertical
    const roadVertical = new THREE.Mesh(roadGeometry, roadMaterial);
    roadVertical.rotation.y = Math.PI / 2;
    roadVertical.position.set(0, 0.2, 0);
    roadVertical.receiveShadow = true;
    scene.add(roadVertical);

    // Road markings
    const markingGeometry = new THREE.PlaneGeometry(5, 150);
    const markingMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    
    // Horizontal markings
    for (let i = -2500; i < 2500; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(0, 0.55, i); // Raised to prevent z-fighting
        marking.receiveShadow = true;
        scene.add(marking);
    }

    // Vertical markings
    for (let i = -2500; i < 2500; i += 300) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.rotation.x = -Math.PI / 2;
        marking.position.set(i, 0.55, 0); // Raised to prevent z-fighting
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
        // Near spawn - easy to find!
        [80, 80],
        [-80, -80]
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

// Tilføj vinduer til en bygning
function addWindowsToBuilding(building, buildingX, buildingZ, width, depth, height, type) {
    const windowWidth = 12;
    const windowHeight = 15;
    const windowSpacingX = 25;
    const windowSpacingY = 35;
    const windowsPerFloor = Math.floor((width - 20) / windowSpacingX);
    const floors = Math.floor((height - 20) / windowSpacingY);
    
    const isGlass = type.isGlass;
    
    // Front og bag vinduer
    for (let floor = 0; floor < floors; floor++) {
        for (let w = 0; w < windowsPerFloor; w++) {
            const isLit = Math.random() > 0.4;
            const windowX = buildingX - width/2 + 15 + w * windowSpacingX;
            const windowY = 20 + floor * windowSpacingY;
            
            // Front
            const frontWindow = createWindow(
                windowX, windowY, buildingZ + depth/2 + 0.5, 0,
                isGlass ? windowSpacingX - 3 : windowWidth, 
                isGlass ? windowSpacingY - 5 : windowHeight, 
                isLit
            );
            building.add(frontWindow);
            
            // Bag
            const backWindow = createWindow(
                windowX, windowY, buildingZ - depth/2 - 0.5, Math.PI,
                isGlass ? windowSpacingX - 3 : windowWidth,
                isGlass ? windowSpacingY - 5 : windowHeight,
                isLit
            );
            building.add(backWindow);
        }
    }
    
    // Side vinduer
    const windowsPerSide = Math.floor((depth - 20) / windowSpacingX);
    for (let floor = 0; floor < floors; floor++) {
        for (let w = 0; w < windowsPerSide; w++) {
            const isLit = Math.random() > 0.4;
            const windowZ = buildingZ - depth/2 + 15 + w * windowSpacingX;
            const windowY = 20 + floor * windowSpacingY;
            
            // Venstre side
            const leftWindow = createWindow(
                buildingX - width/2 - 0.5, windowY, windowZ, Math.PI/2,
                isGlass ? windowSpacingX - 3 : windowWidth,
                isGlass ? windowSpacingY - 5 : windowHeight,
                isLit
            );
            building.add(leftWindow);
            
            // Højre side
            const rightWindow = createWindow(
                buildingX + width/2 + 0.5, windowY, windowZ, -Math.PI/2,
                isGlass ? windowSpacingX - 3 : windowWidth,
                isGlass ? windowSpacingY - 5 : windowHeight,
                isLit
            );
            building.add(rightWindow);
        }
    }
}

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

    // Active Chunks (falling/moving)
    for (let i = gameState.activeChunks.length - 1; i >= 0; i--) {
        const chunk = gameState.activeChunks[i];
        
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
        
        // When chunk comes to rest, mark as fallen debris
        if (Math.abs(chunk.userData.velocity.y) < 0.1 && 
            Math.abs(chunk.userData.velocity.x) < 0.1 && 
            Math.abs(chunk.userData.velocity.z) < 0.1 &&
            chunk.position.y <= groundY + 0.1) {
             gameState.activeChunks.splice(i, 1);
             
             // Optimization: Disable updates again as it's now static debris
             chunk.matrixAutoUpdate = false;
             chunk.updateMatrix(); // Ensure final position is locked

             // Mark as fallen debris - solid but no damage, can be shattered once
             if (!chunk.userData.isSmallDebris) {
                 chunk.userData.isFallenDebris = true;
                 chunk.userData.hasShattered = false; // Track if it has been shattered already
                 if (!gameState.fallenDebris) gameState.fallenDebris = [];
                 gameState.fallenDebris.push(chunk);
             }
        }
    }

    // Collisions with standing building chunks
    const carPos = playerCar.position;
    const carRadius = 15;
    
    // Speed-based collision detection radius to prevent tunneling at high speeds
    const carSpeed = Math.abs(gameState.speed);
    const speedFactor = Math.max(1, carSpeed / 30); // Increase detection range when moving fast
    const effectiveCarRadius = carRadius * speedFactor;
    
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
                
                // Expand bounding box check based on speed
                const checkRadius = 40 * speedFactor;
                if (Math.abs(chunk.position.x - carPos.x) < checkRadius && Math.abs(chunk.position.z - carPos.z) < checkRadius) {
                     const dx = chunk.position.x - carPos.x;
                     const dz = chunk.position.z - carPos.z;
                     const distSq = dx*dx + dz*dz;
                     
                     // Use speed-adjusted collision radius to prevent tunneling
                     const collisionRadius = effectiveCarRadius + chunk.userData.width/2 + 5;
                     if (distSq < collisionRadius * collisionRadius) {
                         if (Math.abs(chunk.position.y - carPos.y) < (chunk.userData.height/2 + 10)) {
                             
                             const carSpeed = Math.abs(gameState.speed);
                             const carAngle = playerCar.rotation.y;
                             const angleToChunk = Math.atan2(dx, dz);
                             
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
                                 
                                 gameState.speed *= 0.95; 
                                 takeDamage(Math.floor(carSpeed * 0.1) + 5);
                                 gameState.screenShake = 0.3;
                                 createSmoke(chunk.position);
                             }
                         }
                     }
                }
            }
        }
    }
    
    // Collision with fallen debris (no damage, solid push, shatter once)
    if (gameState.fallenDebris && gameState.fallenDebris.length > 0) {
        for (let i = gameState.fallenDebris.length - 1; i >= 0; i--) {
            const debris = gameState.fallenDebris[i];
            if (!debris || !debris.userData || !debris.userData.isFallenDebris) continue;
            
            const dx = debris.position.x - carPos.x;
            const dz = debris.position.z - carPos.z;
            const distSq = dx * dx + dz * dz;
            
            // Use actual debris size for collision, with minimum size
            const debrisSize = Math.max(
                (debris.userData.width || 10),
                (debris.userData.depth || 10)
            ) / 2;
            
            // Speed-based collision detection to prevent tunneling at high speeds
            const speedBasedBuffer = Math.max(2, carSpeed * 0.3);
            const collisionDist = effectiveCarRadius + debrisSize + speedBasedBuffer;
            
            if (distSq < collisionDist * collisionDist) {
                const dist = Math.sqrt(distSq) || 1;
                
                // Calculate push direction (away from debris center)
                const normX = -dx / dist;
                const normZ = -dz / dist;
                
                // Push CAR back (solid collision - no passing through!)
                const overlap = collisionDist - dist;
                if (overlap > 0) {
                    playerCar.position.x += normX * overlap * 1.5; // Stronger push to prevent tunneling
                    playerCar.position.z += normZ * overlap * 1.5;
                }
                
                // Only shatter if not already shattered and going fast enough
                if (!debris.userData.hasShattered && carSpeed > 10) {
                    // Mark as shattered to prevent re-shattering
                    debris.userData.hasShattered = true;
                    
                    // Remove from fallen debris
                    gameState.fallenDebris.splice(i, 1);
                    scene.remove(debris);
                    
                    // Create smaller debris pieces - more pieces at higher speed
                    const numPieces = Math.min(10, 4 + Math.floor(carSpeed / 4));
                    shatterDebris(debris, carSpeed, numPieces);
                    
                    // Speed reduction based on speed (no damage!)
                    gameState.speed *= 0.85;
                    gameState.screenShake = Math.min(0.3, carSpeed / 40);
                } else {
                    // Slow collision OR already shattered - just push the car and debris
                    gameState.speed *= 0.65; // More significant slowdown for solid collision
                    
                    // Push debris based on car momentum (only if not already shattered)
                    if (!debris.userData.hasShattered) {
                        const pushForce = Math.max(2, carSpeed * 0.4);
                        debris.position.x += (-normX) * pushForce;
                        debris.position.z += (-normZ) * pushForce;
                        
                        // Add some rotation to pushed debris
                        debris.rotation.y += (Math.random() - 0.5) * 0.3;
                    }
                }
            }
        }
    }
    
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

// Create tree debris (wood chunks and leaves)
function createTreeDebris(position, carSpeed) {
    const impactX = Math.sin(playerCar?.rotation.y || 0);
    const impactZ = Math.cos(playerCar?.rotation.y || 0);
    
    // Wood splinters
    const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x5D4037 });
    for (let i = 0; i < 6; i++) {
        const splinterGeometry = new THREE.BoxGeometry(
            2 + Math.random() * 3,
            8 + Math.random() * 15,
            2 + Math.random() * 3
        );
        const splinter = new THREE.Mesh(splinterGeometry, woodMaterial.clone());
        
        splinter.position.copy(position);
        splinter.position.y += Math.random() * 30;
        splinter.position.x += (Math.random() - 0.5) * 10;
        splinter.position.z += (Math.random() - 0.5) * 10;
        
        splinter.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        splinter.userData = {
            isSmallDebris: true,
            velocity: new THREE.Vector3(
                impactX * carSpeed * 0.3 + (Math.random() - 0.5) * 10,
                5 + Math.random() * 8,
                impactZ * carSpeed * 0.3 + (Math.random() - 0.5) * 10
            ),
            rotVelocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.6,
                (Math.random() - 0.5) * 0.6,
                (Math.random() - 0.5) * 0.6
            ),
            width: 3,
            height: 10,
            depth: 3,
            lifetime: 300,
            gravity: 0.3
        };
        
        scene.add(splinter);
        gameState.activeChunks.push(splinter);
        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(splinter);
    }
    
    // Leaves
    const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x2E7D32 });
    for (let i = 0; i < 12; i++) {
        const leafGeometry = new THREE.BoxGeometry(
            3 + Math.random() * 4,
            1,
            3 + Math.random() * 4
        );
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial.clone());
        
        leaf.position.copy(position);
        leaf.position.y += 40 + Math.random() * 40;
        leaf.position.x += (Math.random() - 0.5) * 30;
        leaf.position.z += (Math.random() - 0.5) * 30;
        
        leaf.userData = {
            isSmallDebris: true,
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 8,
                2 + Math.random() * 4,
                (Math.random() - 0.5) * 8
            ),
            rotVelocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.4,
                (Math.random() - 0.5) * 0.4,
                (Math.random() - 0.5) * 0.4
            ),
            width: 4,
            height: 1,
            depth: 4,
            lifetime: 400,
            gravity: 0.08 // Leaves float down slowly
        };
        
        scene.add(leaf);
        gameState.activeChunks.push(leaf);
        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(leaf);
    }
}

// Create building debris (concrete chunks, glass shards, dust particles)
export function createBuildingDebris(position, buildingColor, carSpeed) {
    const impactX = Math.sin(playerCar?.rotation.y || 0);
    const impactZ = Math.cos(playerCar?.rotation.y || 0);
    
    // Number of debris based on speed
    const numChunks = Math.min(15, 4 + Math.floor(carSpeed / 5));
    
    // Concrete/brick chunks
    const chunkColor = buildingColor || new THREE.Color(0x8D6E63);
    for (let i = 0; i < numChunks; i++) {
        const size = 1 + Math.random() * 4;
        const chunkGeometry = new THREE.BoxGeometry(
            size * (0.5 + Math.random()),
            size * (0.5 + Math.random()),
            size * (0.5 + Math.random())
        );
        // Slightly vary the color for each chunk
        const variedColor = chunkColor.clone();
        variedColor.offsetHSL(0, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.2);
        const chunkMaterial = new THREE.MeshLambertMaterial({ color: variedColor });
        const chunk = new THREE.Mesh(chunkGeometry, chunkMaterial);
        
        chunk.position.copy(position);
        chunk.position.y += Math.random() * 20;
        chunk.position.x += (Math.random() - 0.5) * 15;
        chunk.position.z += (Math.random() - 0.5) * 15;
        
        chunk.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        // More realistic spread pattern - debris follows impact direction with limited spread
        // Instead of random 360° spread, debris mostly goes in the impact direction
        const impactAngle = Math.atan2(impactX, impactZ);
        const spreadAngle = impactAngle + (Math.random() - 0.5) * Math.PI * 0.4; // ±36° spread instead of 360°
        const spreadForce = 2 + Math.random() * carSpeed * 0.25; // Reduced spread force
        
        chunk.userData = {
            isSmallDebris: true,
            velocity: new THREE.Vector3(
                impactX * carSpeed * 0.3 + Math.sin(spreadAngle) * spreadForce,
                3 + Math.random() * (carSpeed * 0.2), // Reduced vertical velocity
                impactZ * carSpeed * 0.3 + Math.cos(spreadAngle) * spreadForce
            ),
            rotVelocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.8,
                (Math.random() - 0.5) * 0.8,
                (Math.random() - 0.5) * 0.8
            ),
            width: size,
            height: size,
            depth: size,
            lifetime: 250 + Math.floor(Math.random() * 150),
            gravity: 0.35
        };
        
        scene.add(chunk);
        gameState.activeChunks.push(chunk);
        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(chunk);
    }
    
    // Glass shards (if building has windows)
    const numShards = Math.min(8, 2 + Math.floor(carSpeed / 8));
    for (let i = 0; i < numShards; i++) {
        const shardGeometry = new THREE.BoxGeometry(
            0.5 + Math.random() * 2,
            0.2,
            0.5 + Math.random() * 2
        );
        const shardMaterial = new THREE.MeshBasicMaterial({ 
            color: Math.random() > 0.3 ? 0x90CAF9 : 0xE3F2FD,
            transparent: true,
            opacity: 0.7
        });
        const shard = new THREE.Mesh(shardGeometry, shardMaterial);
        
        shard.position.copy(position);
        shard.position.y += 10 + Math.random() * 30;
        shard.position.x += (Math.random() - 0.5) * 20;
        shard.position.z += (Math.random() - 0.5) * 20;
        
        shard.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        shard.userData = {
            isSmallDebris: true,
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 12,
                2 + Math.random() * 6,
                (Math.random() - 0.5) * 12
            ),
            rotVelocity: new THREE.Vector3(
                (Math.random() - 0.5) * 1.2,
                (Math.random() - 0.5) * 1.2,
                (Math.random() - 0.5) * 1.2
            ),
            width: 1.5,
            height: 0.2,
            depth: 1.5,
            lifetime: 180 + Math.floor(Math.random() * 100),
            gravity: 0.25
        };
        
        scene.add(shard);
        gameState.activeChunks.push(shard);
        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(shard);
    }
    
    // Dust particles
    const numDust = Math.min(10, 3 + Math.floor(carSpeed / 6));
    for (let i = 0; i < numDust; i++) {
        const dustGeometry = new THREE.SphereGeometry(1 + Math.random() * 2, 6, 6);
        const dustMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x9E9E9E,
            transparent: true,
            opacity: 0.4 + Math.random() * 0.3
        });
        const dust = new THREE.Mesh(dustGeometry, dustMaterial);
        
        dust.position.copy(position);
        dust.position.y += Math.random() * 15;
        dust.position.x += (Math.random() - 0.5) * 10;
        dust.position.z += (Math.random() - 0.5) * 10;
        
        dust.userData = {
            isSmallDebris: true,
            isDust: true,
            velocity: new THREE.Vector3(
                impactX * carSpeed * 0.15 + (Math.random() - 0.5) * 5,
                1 + Math.random() * 3,
                impactZ * carSpeed * 0.15 + (Math.random() - 0.5) * 5
            ),
            rotVelocity: new THREE.Vector3(0, 0, 0),
            width: 2,
            height: 2,
            depth: 2,
            lifetime: 120 + Math.floor(Math.random() * 80),
            gravity: -0.02 // Dust rises slightly then dissipates
        };
        
        scene.add(dust);
        gameState.activeChunks.push(dust);
        if (!gameState.smallDebris) gameState.smallDebris = [];
        gameState.smallDebris.push(dust);
    }
    
    // Create sparks on impact
    createDebrisSparks(position, Math.min(6, Math.floor(carSpeed / 5)));
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

// Update and cleanup small debris (call this from the active chunks loop)
export function cleanupSmallDebris() {
    if (!gameState.smallDebris) return;
    
    for (let i = gameState.smallDebris.length - 1; i >= 0; i--) {
        const piece = gameState.smallDebris[i];
        if (piece.userData.lifetime !== undefined) {
            piece.userData.lifetime--;
            if (piece.userData.lifetime <= 0) {
                scene.remove(piece);
                gameState.smallDebris.splice(i, 1);
                // Also remove from activeChunks if still there
                const idx = gameState.activeChunks.indexOf(piece);
                if (idx > -1) gameState.activeChunks.splice(idx, 1);
            }
        }
    }
}

export function createMoney() {
    const coin = new THREE.Mesh(sharedGeometries.coin, sharedMaterials.coin);
    
    const mapSize = 3500;
    coin.position.set(
        (Math.random() - 0.5) * mapSize * 2,
        5,
        (Math.random() - 0.5) * mapSize * 2
    );
    coin.rotation.z = Math.PI / 2;
    coin.castShadow = true;
    
    scene.add(coin);
    gameState.collectibles.push(coin);
}

export function updateCollectibles() {
    if (gameState.arrested) return;

    if (Math.random() < 0.02) { 
         createMoney();
         if (gameState.collectibles.length > 50) {
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
            scene.remove(coin);
            gameState.collectibles.splice(i, 1);
            
            const time = (gameState.arrested ? gameState.elapsedTime : (Date.now() - gameState.startTime) / 1000) || 0;
            const baseValue = gameConfig.coinBaseValue;
            const timeBonus = Math.floor(time / 10) * 10; 
            const rebirthMult = (gameState.rebirthPoints || 0) + 1;
            addMoney((baseValue + timeBonus) * rebirthMult);
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

export function createSingleBuilding(x, z, width, depth, height, type) {
    const buildingGroup = new THREE.Group();
    
    // Vælg farve baseret på bygningstype
    const colors = type.colors;
    const buildingColor = colors[Math.floor(Math.random() * colors.length)];
    
    const chunkSize = 30;
    const nx = Math.ceil(width / chunkSize);
    const ny = Math.ceil(height / chunkSize);
    const nz = Math.ceil(depth / chunkSize);

    const dx = width / nx;
    const dy = height / ny;
    const dz = depth / nz;

    const chunkGeometry = new THREE.BoxGeometry(dx, dy, dz);
    const buildingMaterial = new THREE.MeshLambertMaterial({ color: buildingColor });
    
    const startX = x - width / 2 + dx / 2;
    const startY = dy / 2;
    const startZ = z - depth / 2 + dz / 2;

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
                
                // scene.add(chunk); // REMOVED: Managed by group
                buildingGroup.add(chunk); // ADDED: Add to group
                gameState.chunks.push(chunk);

                const gridX = Math.floor(chunk.position.x / gameState.chunkGridSize);
                const gridZ = Math.floor(chunk.position.z / gameState.chunkGridSize);
                const key = `${gridX},${gridZ}`;
                if (!gameState.chunkGrid[key]) gameState.chunkGrid[key] = [];
                gameState.chunkGrid[key].push(chunk);
            }
        }
    }
    
    // Tilføj vinduer til bygningen (vinduer er visuelle og ikke destruerbare)
    addWindowsToBuilding(buildingGroup, x, z, width, depth, height, type);
    
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
