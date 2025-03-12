import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// eslint-disable-next-line unicorn/prefer-query-selector
const renderer = new THREE.WebGLRenderer({ canvas: htmlNode.getElementById('webglCanvas') as HTMLCanvasElement, alpha: true });
renderer.setSize(window.innerWidth - 50, window.innerHeight - 50);
renderer.setClearColor('0xaaaaaa'); // Light gray background
// eslint-disable-next-line unicorn/prefer-dom-node-append
htmlNode.appendChild(renderer.domElement);

// Add light sources
const ambientLight = new THREE.AmbientLight('0xffffff', 1); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('0xffffff', 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();

loader.load('http://localhost:5032/conveyorTest.glb', function (gltf) {
    // Add the loaded scene to the main scene
    scene.add(gltf.scene);

    // Set the camera position and look at the scene
    camera.position.z = 5;
    camera.lookAt(scene.position);

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Update controls
        renderer.render(scene, camera);
    }
    animate();
	console.log('rendering complete');
	
}, undefined, function (error) {
    console.error('An error happened', error);
});

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.25; // Damping factor
controls.screenSpacePanning = false; // Disable panning
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation
