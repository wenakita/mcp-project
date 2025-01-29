import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { SVGLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/SVGLoader.js';
import { GLTFExporter } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/exporters/GLTFExporter.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);  // Dark gray background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add axes helper to visualize orientation
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const loader = new SVGLoader();
const group = new THREE.Group();

// Updated material with white metallic look
const material = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,  // Pure white
    metalness: 0.6,   // Slightly reduced metalness for better white appearance
    roughness: 0.2,   // Keep smooth for shine
    side: THREE.DoubleSide,
    envMapIntensity: 1.0
});

// Refined extrusion settings
const extrudeSettings = { 
    depth: 40,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 2,
    bevelSegments: 5
};

// Function to process SVG data
function processSVGData(data) {
    console.log('Processing SVG data with', data.paths.length, 'paths');
    
    if (data.paths.length === 0) {
        console.error('No paths found in SVG!');
        return;
    }

    data.paths.forEach((path, index) => {
        console.log(`Processing path ${index + 1}/${data.paths.length}`);
        try {
            const shapes = path.toShapes(true);
            console.log(`Created ${shapes.length} shapes from path ${index + 1}`);
            
            shapes.forEach((shape) => {
                const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                const mesh = new THREE.Mesh(geometry, material);
                
                // Rotate each mesh to show depth
                mesh.rotation.x = -Math.PI / 4;  // Tilt forward
                mesh.position.z = 0;  // Keep at origin
                group.add(mesh);
            });
        } catch (error) {
            console.error(`Error processing path ${index + 1}:`, error);
        }
    });
}

// Load SVG file
console.log('Starting to load SVGs...');
loader.load("https://raw.githubusercontent.com/Maia-DAO/token-list-v2/main/logos/Maia_color.svg", 
    (data) => {
        console.log('Maia color SVG loaded successfully');
        processSVGData(data);
        
        scene.add(group);

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        console.log('Model size:', size);
        console.log('Model center:', center);
        
        // Scale down the model
        const scale = 60 / Math.max(size.x, size.y);
        group.scale.multiplyScalar(scale);
        
        // Center the model
        group.position.x = -center.x * scale;
        group.position.y = -center.y * scale;
        
        console.log('Model loaded and centered');
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error loading SVG:', error);
    }
);

// Update lighting to pure white with better positioning
const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);  // Pure white light
frontLight.position.set(0, 50, 100);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.8);  // Pure white light
backLight.position.set(0, -50, -100);
scene.add(backLight);

const rightLight = new THREE.DirectionalLight(0xffffff, 1.2);
rightLight.position.set(100, 0, 0);
scene.add(rightLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Smoother camera position
camera.position.set(40, 60, 120);
camera.lookAt(0, 0, 0);

// Add orbit controls for better viewing
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

document.addEventListener('mousedown', (e) => {
    isDragging = true;
});

document.addEventListener('mouseup', (e) => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };

        group.rotation.y += deltaMove.x * 0.01;
        group.rotation.x += deltaMove.y * 0.01;
    }

    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
});

// Smoother rotation animation
function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
        group.rotation.y += 0.005;  // Slower, smoother rotation
    }
    renderer.render(scene, camera);
}
animate();

const exporter = new GLTFExporter();

// Add download button
const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download GLTF';
downloadButton.style.position = 'absolute';
downloadButton.style.top = '20px';
downloadButton.style.right = '20px';
downloadButton.style.padding = '10px 20px';
downloadButton.style.backgroundColor = '#ffffff';
downloadButton.style.border = 'none';
downloadButton.style.borderRadius = '5px';
downloadButton.style.cursor = 'pointer';
document.body.appendChild(downloadButton);

// Add download functionality
downloadButton.addEventListener('click', () => {
    // Stop rotation animation temporarily
    const wasRotating = !isDragging;
    isDragging = true;
    
    // Reset rotation to front view
    group.rotation.x = 0;
    group.rotation.y = 0;
    group.rotation.z = 0;
    
    // Export the scene
    exporter.parse(
        group,
        function (gltf) {
            const output = JSON.stringify(gltf, null, 2);
            const blob = new Blob([output], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.download = 'maia-logo.gltf';
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            // Restore rotation if it was rotating
            isDragging = !wasRotating;
        },
        function (error) {
            console.error('Error exporting GLTF:', error);
        },
        { binary: false }
    );
}); 