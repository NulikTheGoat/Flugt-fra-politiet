// Three.js Scene Setup (Singletons)
import * as THREE from 'three';

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
// Fog setup - starts at 2000, fully opaque at 9000 to hide the horizon edge smoothly
scene.fog = new THREE.Fog(0x87ceeb, 2000, 9000);

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 25000);

export const listener = new THREE.AudioListener();
camera.add(listener);

export const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Better tone mapping for realistic lighting
renderer.toneMappingExposure = 1.0;

// Handle color space for different Three.js versions
// r152+ uses outputColorSpace, older versions use outputEncoding
if (renderer.outputColorSpace !== undefined) {
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Three.js r152+
} else if (/** @type {any} */ (renderer).outputEncoding !== undefined) {
    /** @type {any} */ (renderer).outputEncoding = /** @type {any} */ (THREE).sRGBEncoding; // Three.js r128-r151
}

// Lighting setup - Enhanced for PBR materials
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Reduced ambient for better contrast
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Increased intensity
directionalLight.position.set(500, 1000, 500);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048; // Higher quality shadows
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.far = 2000;
directionalLight.shadow.camera.left = -1000;
directionalLight.shadow.camera.right = 1000;
directionalLight.shadow.camera.top = 1000;
directionalLight.shadow.camera.bottom = -1000;
directionalLight.shadow.bias = -0.0001; // Reduce shadow acne
scene.add(directionalLight);

// Add hemisphere light for more natural outdoor lighting
const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.3);
scene.add(hemiLight);
