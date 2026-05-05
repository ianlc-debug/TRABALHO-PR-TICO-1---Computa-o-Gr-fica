import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, currentShoe, mainLight, controls;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 3);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const loader = new GLTFLoader();

    window.loadShoe = (fileName) => {
        if (currentShoe) scene.remove(currentShoe);

        loader.load(`models/${fileName}.glb`, (gltf) => {
            currentShoe = gltf.scene;
            
            const box = new THREE.Box3().setFromObject(currentShoe);
            const center = box.getCenter(new THREE.Vector3());
            currentShoe.position.sub(center); 
            
            scene.add(currentShoe);
        });
    };

    loadShoe('nike_air_zoom_pegasus_36');

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

document.getElementById('lightIntensity').addEventListener('input', (e) => {
    mainLight.intensity = parseFloat(e.target.value);
});

document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        if (currentShoe) {
            currentShoe.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(color);
                }
            });
        }
    });
});

document.querySelectorAll('.brand-item').forEach(btn => {
    btn.addEventListener('click', () => loadShoe(btn.dataset.brand));
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
