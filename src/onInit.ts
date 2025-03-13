import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const webglCanvas: HTMLElement = htmlNode.getElementById('webglCanvas')!;
export let renderer: THREE.WebGLRenderer;
checkWebGLCanvasUsage(webglCanvas);

function checkWebGLCanvasUsage(htmlElement: HTMLElement) {
    if (webglCanvas?.getAttribute('data-inUse') === 'true') {
        console.log("onInit code skipped")
        return; // Skip the rest of the code
    }

    //set scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    //initialize renderer through canvas element
    const renderer = new THREE.WebGLRenderer({ canvas: htmlElement as HTMLCanvasElement, alpha: true });
    webglCanvas?.setAttribute('data-inUse','true');
    renderer.setSize(window.innerWidth - 50, window.innerHeight - 50);
    renderer.setClearColor(0xaaaaaa); // Light gray background
    // htmlNode.appendChild(renderer.domElement);

    // Add light sources
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia)
    controls.dampingFactor = 0.25; // Damping factor
    controls.screenSpacePanning = false; // Disable panning
    controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation

    //initialize GLTF loader and load the .glb file
    const loader = new GLTFLoader();
    loader.load('http://localhost:5032/conveyorTest.glb', function (gltf) {
        // Add the loaded scene to the main scene
        scene.add(gltf.scene);

        // Set the camera position and look at the scene
        camera.position.z = 5;
        camera.lookAt(scene.position);

        // Render loop
        function animate(): void {
            requestAnimationFrame(animate);
            controls.update(); // Update controls
            renderer.render(scene, camera);
        }
        animate();
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
    console.log("one onInit function pass")
}

console.log("bottom of onInit reached");
