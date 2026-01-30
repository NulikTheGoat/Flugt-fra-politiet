// Level Editor Module
import * as THREE from 'three';
import { gameState } from './state.js';
import { scene, camera, renderer } from './core.js';
import { 
    createSingleBuilding, 
    createSingleTree, 
    createSingleHotdogStand,
    removeObjectFromWorld,
    addObjectToWorld
} from './world.js';
import { BUILDING_TYPES } from './constants.js';

// Editor state
const editorState = {
    active: false,
    deleteMode: false,
    placedObjects: [],
    undoStack: [],
    selectedType: 'building',
    buildingType: 'GENERIC',
    width: 100,
    depth: 80,
    height: 150,
    previewMesh: null,
    gridHelper: null,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    groundPlane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
};

// DOM Elements
let editorPanel, objectTypeSelect, buildingTypeSelect, buildingOptions;
let widthSlider, depthSlider, heightSlider;
let widthVal, depthVal, heightVal;
let deleteModeBtn, undoBtn, clearBtn, saveBtn, loadBtn, exportBtn, closeBtn, startGameBtn;
let coordsDisplay, objectCountDisplay, fileInput;

export function initLevelEditor() {
    // Get DOM elements
    editorPanel = document.getElementById('levelEditor');
    objectTypeSelect = document.getElementById('editorObjectType');
    buildingTypeSelect = document.getElementById('editorBuildingType');
    buildingOptions = document.getElementById('buildingOptions');
    widthSlider = document.getElementById('editorWidth');
    depthSlider = document.getElementById('editorDepth');
    heightSlider = document.getElementById('editorHeight');
    widthVal = document.getElementById('widthVal');
    depthVal = document.getElementById('depthVal');
    heightVal = document.getElementById('heightVal');
    deleteModeBtn = document.getElementById('editorDeleteMode');
    undoBtn = document.getElementById('editorUndo');
    clearBtn = document.getElementById('editorClear');
    saveBtn = document.getElementById('editorSave');
    loadBtn = document.getElementById('editorLoad');
    exportBtn = document.getElementById('editorExport');
    closeBtn = document.getElementById('editorClose');
    startGameBtn = document.getElementById('editorStartGame');
    coordsDisplay = document.getElementById('editorCoords');
    objectCountDisplay = document.getElementById('objectCount');
    fileInput = document.getElementById('editorFileInput');

    // Event listeners
    objectTypeSelect.addEventListener('change', onObjectTypeChange);
    buildingTypeSelect.addEventListener('change', (e) => editorState.buildingType = e.target.value);
    
    widthSlider.addEventListener('input', (e) => {
        editorState.width = parseInt(e.target.value);
        widthVal.textContent = editorState.width;
        updatePreview();
    });
    
    depthSlider.addEventListener('input', (e) => {
        editorState.depth = parseInt(e.target.value);
        depthVal.textContent = editorState.depth;
        updatePreview();
    });
    
    heightSlider.addEventListener('input', (e) => {
        editorState.height = parseInt(e.target.value);
        heightVal.textContent = editorState.height;
        updatePreview();
    });

    deleteModeBtn.addEventListener('click', toggleDeleteMode);
    undoBtn.addEventListener('click', undoLastAction);
    clearBtn.addEventListener('click', clearAllPlaced);
    saveBtn.addEventListener('click', saveLevel);
    loadBtn.addEventListener('click', () => fileInput.click());
    exportBtn.addEventListener('click', exportToClipboard);
    closeBtn.addEventListener('click', closeLevelEditor);
    startGameBtn.addEventListener('click', startGameFromEditor);
    fileInput.addEventListener('change', loadLevel);

    // Mouse events on renderer
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);

    // Keyboard shortcut to open editor - use window level listener
    window.addEventListener('keydown', (e) => {
        console.log('Key pressed:', e.key);
        if (e.key === '0') {
            e.preventDefault();
            console.log('🏗️ Opening Level Editor...');
            toggleLevelEditor();
        }
        if (editorState.active) {
            if (e.key === 'Escape') closeLevelEditor();
            if (e.key === 'z' && e.ctrlKey) undoLastAction();
            if (e.key === 'd') toggleDeleteMode();
        }
    });

    console.log('🏗️ Level Editor initialized (Press 0 to open)');
}

function toggleLevelEditor() {
    if (editorState.active) {
        closeLevelEditor();
    } else {
        openLevelEditor();
    }
}

export function openLevelEditor() {
    editorState.active = true;
    editorPanel.style.display = 'block';
    
    // Switch to 2D view for easier placement
    gameState.is2DMode = true;
    
    // Create preview mesh
    createPreviewMesh();
    
    // Create grid helper
    if (!editorState.gridHelper) {
        editorState.gridHelper = new THREE.GridHelper(10000, 100, 0x444444, 0x222222);
        editorState.gridHelper.position.y = 1; // Slightly above ground
        scene.add(editorState.gridHelper);
    }
    
    updateObjectCount();
    console.log('🏗️ Level Editor opened');
}

export function closeLevelEditor() {
    editorState.active = false;
    editorPanel.style.display = 'none';
    editorState.deleteMode = false;
    editorPanel.classList.remove('delete-mode');
    deleteModeBtn.classList.remove('active');
    
    // Remove preview
    if (editorState.previewMesh) {
        scene.remove(editorState.previewMesh);
        editorState.previewMesh = null;
    }

    // Remove grid
    if (editorState.gridHelper) {
        scene.remove(editorState.gridHelper);
        editorState.gridHelper = null;
    }
    
    console.log('🏗️ Level Editor closed');
}

// Start the game from editor - closes editor and begins gameplay
function startGameFromEditor() {
    console.log('🎮 Starting game from editor...');
    
    // Close the editor first
    closeLevelEditor();
    
    // Reset 2D mode
    gameState.is2DMode = false;
    
    // Trigger game start - look for the play button callback
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.click();
    } else {
        // Fallback: dispatch a custom event that main.js can listen to
        window.dispatchEvent(new CustomEvent('editorStartGame'));
    }
}

function onObjectTypeChange(e) {
    editorState.selectedType = e.target.value;
    
    // Show/hide building options
    if (editorState.selectedType === 'building') {
        buildingOptions.style.display = 'block';
    } else {
        buildingOptions.style.display = 'none';
    }
    
    updatePreview();
}

function createPreviewMesh() {
    if (editorState.previewMesh) {
        scene.remove(editorState.previewMesh);
    }
    
    let geometry, material;
    
    switch (editorState.selectedType) {
        case 'building':
            geometry = new THREE.BoxGeometry(editorState.width, editorState.height, editorState.depth);
            material = new THREE.MeshBasicMaterial({ 
                color: 0x00ff00, 
                transparent: true, 
                opacity: 0.4,
                wireframe: true
            });
            break;
        case 'hotdog':
            geometry = new THREE.CylinderGeometry(15, 15, 50, 8);
            material = new THREE.MeshBasicMaterial({ 
                color: 0xff6600, 
                transparent: true, 
                opacity: 0.4,
                wireframe: true
            });
            break;
        case 'tree':
            geometry = new THREE.ConeGeometry(25, 60, 8);
            material = new THREE.MeshBasicMaterial({ 
                color: 0x00aa00, 
                transparent: true, 
                opacity: 0.4,
                wireframe: true
            });
            break;
    }
    
    editorState.previewMesh = new THREE.Mesh(geometry, material);
    editorState.previewMesh.visible = false;
    scene.add(editorState.previewMesh);
}

function updatePreview() {
    createPreviewMesh();
}

function onMouseMove(event) {
    if (!editorState.active) return;
    
    // Calculate mouse position in normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    editorState.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    editorState.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Get world position on ground plane
    editorState.raycaster.setFromCamera(editorState.mouse, camera);
    const intersectPoint = new THREE.Vector3();
    editorState.raycaster.ray.intersectPlane(editorState.groundPlane, intersectPoint);
    
    if (intersectPoint) {
        // Snap to grid (50 units)
        const snapSize = 50;
        const x = Math.round(intersectPoint.x / snapSize) * snapSize;
        const z = Math.round(intersectPoint.z / snapSize) * snapSize;
        
        // Update preview position
        if (editorState.previewMesh) {
            editorState.previewMesh.visible = true;
            
            let yPos = 0;
            switch (editorState.selectedType) {
                case 'building':
                    yPos = editorState.height / 2;
                    break;
                case 'hotdog':
                    yPos = 25;
                    break;
                case 'tree':
                    yPos = 30;
                    break;
            }
            
            editorState.previewMesh.position.set(x, yPos, z);
            
            // Change color based on mode
            if (editorState.deleteMode) {
                editorState.previewMesh.material.color.setHex(0xff0000);
            } else {
                editorState.previewMesh.material.color.setHex(0x00ff00);
            }
        }
        
        // Update coords display
        coordsDisplay.textContent = `X: ${x}, Z: ${z}`;
    }
}

function onMouseClick(event) {
    if (!editorState.active) return;
    if (event.target !== renderer.domElement) return;
    
    // Get click position
    const rect = renderer.domElement.getBoundingClientRect();
    editorState.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    editorState.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    editorState.raycaster.setFromCamera(editorState.mouse, camera);
    const intersectPoint = new THREE.Vector3();
    editorState.raycaster.ray.intersectPlane(editorState.groundPlane, intersectPoint);
    
    if (!intersectPoint) return;
    
    const snapSize = 50;
    const x = Math.round(intersectPoint.x / snapSize) * snapSize;
    const z = Math.round(intersectPoint.z / snapSize) * snapSize;
    
    if (editorState.deleteMode) {
        deleteObjectAt(x, z);
    } else {
        placeObject(x, z);
    }
}

function placeObject(x, z) {
    let mesh;
    const objectData = {
        type: editorState.selectedType,
        x: x,
        z: z,
        width: editorState.width,
        depth: editorState.depth,
        height: editorState.height,
        buildingType: editorState.buildingType
    };
    
    switch (editorState.selectedType) {
        case 'building':
            mesh = createSingleBuilding(x, z, editorState.width, editorState.depth, editorState.height, BUILDING_TYPES[editorState.buildingType]);
            break;
        case 'hotdog':
            mesh = createSingleHotdogStand(x, z);
            break;
        case 'tree':
            mesh = createSingleTree(x, z);
            break;
    }
    
    if (mesh) {
        mesh.userData.editorObject = true;
        mesh.userData.editorData = objectData;
        scene.add(mesh);
        editorState.placedObjects.push(mesh);
        editorState.undoStack.push({ action: 'add', mesh: mesh, data: objectData });
        updateObjectCount();
        console.log(`🏗️ Placed ${editorState.selectedType} at (${x}, ${z})`);
    }
}

function deleteObjectAt(x, z) {
    const threshold = 60; // Distance threshold for deletion
    
    for (let i = editorState.placedObjects.length - 1; i >= 0; i--) {
        const obj = editorState.placedObjects[i];
        
        let objX = obj.position.x;
        let objZ = obj.position.z;
        
        // Use editorData if available (correct for 0,0,0 groups)
        if (obj.userData.editorData) {
            objX = obj.userData.editorData.x;
            objZ = obj.userData.editorData.z;
        }

        const dx = objX - x;
        const dz = objZ - z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        if (dist < threshold) {
            removeObjectFromWorld(obj);
            editorState.undoStack.push({ 
                action: 'delete', 
                mesh: obj, 
                data: obj.userData.editorData 
            });
            editorState.placedObjects.splice(i, 1);
            updateObjectCount();
            console.log(`🗑️ Deleted object at (${objX}, ${objZ})`);
            return;
        }
    }
}

function toggleDeleteMode() {
    editorState.deleteMode = !editorState.deleteMode;
    
    if (editorState.deleteMode) {
        deleteModeBtn.classList.add('active');
        editorPanel.classList.add('delete-mode');
    } else {
        deleteModeBtn.classList.remove('active');
        editorPanel.classList.remove('delete-mode');
    }
}

function undoLastAction() {
    if (editorState.undoStack.length === 0) return;
    
    const lastAction = editorState.undoStack.pop();
    
    if (lastAction.action === 'add') {
        // Remove the added object
        removeObjectFromWorld(lastAction.mesh);
        const idx = editorState.placedObjects.indexOf(lastAction.mesh);
        if (idx > -1) editorState.placedObjects.splice(idx, 1);
    } else if (lastAction.action === 'delete') {
        // Re-add the deleted object
        addObjectToWorld(lastAction.mesh);
        editorState.placedObjects.push(lastAction.mesh);
    }
    
    updateObjectCount();
    console.log('↩️ Undo');
}

function clearAllPlaced() {
    if (!confirm('Er du sikker på at du vil slette alle placerede objekter?')) return;
    
    editorState.placedObjects.forEach(obj => removeObjectFromWorld(obj));
    editorState.placedObjects = [];
    editorState.undoStack = [];
    updateObjectCount();
    console.log('🧹 Cleared all placed objects');
}

function updateObjectCount() {
    objectCountDisplay.textContent = editorState.placedObjects.length;
}

function saveLevel() {
    const levelData = {
        name: 'Custom Level',
        timestamp: Date.now(),
        objects: editorState.placedObjects.map(obj => obj.userData.editorData)
    };
    
    const json = JSON.stringify(levelData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `level_${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    console.log('💾 Level saved');
}

function loadLevel(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const levelData = JSON.parse(e.target.result);
            
            // Clear existing
            editorState.placedObjects.forEach(obj => removeObjectFromWorld(obj));
            editorState.placedObjects = [];
            editorState.undoStack = [];
            
            // Load objects
            levelData.objects.forEach(objData => {
                let mesh;
                switch (objData.type) {
                    case 'building':
                        mesh = createSingleBuilding(objData.x, objData.z, objData.width, objData.depth, objData.height, BUILDING_TYPES[objData.buildingType]);
                        break;
                    case 'hotdog':
                        mesh = createSingleHotdogStand(objData.x, objData.z);
                        break;
                    case 'tree':
                        mesh = createSingleTree(objData.x, objData.z);
                        break;
                }
                
                if (mesh) {
                    mesh.userData.editorObject = true;
                    mesh.userData.editorData = objData;
                    scene.add(mesh);
                    editorState.placedObjects.push(mesh);
                }
            });
            
            updateObjectCount();
            console.log(`📂 Loaded level with ${levelData.objects.length} objects`);
        } catch (err) {
            console.error('Failed to load level:', err);
            alert('Kunne ikke indlæse level filen!');
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

function exportToClipboard() {
    const levelData = {
        objects: editorState.placedObjects.map(obj => obj.userData.editorData)
    };
    
    // Generate code for world.js
    let code = '// Custom level objects\nconst customObjects = [\n';
    levelData.objects.forEach(obj => {
        if (obj.type === 'building') {
            code += `    [${obj.x}, ${obj.z}, ${obj.width}, ${obj.depth}, ${obj.height}, BUILDING_TYPES.${obj.buildingType}],\n`;
        }
    });
    code += '];\n';
    
    navigator.clipboard.writeText(code).then(() => {
        alert('Kode kopieret til clipboard!\n\nIndsæt i world.js buildingConfigs array.');
        console.log('📋 Code exported to clipboard');
    });
}

export { editorState };
