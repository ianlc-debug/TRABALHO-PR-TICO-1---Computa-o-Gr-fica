import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

let scene, camera, renderer, currentShoe, mainLight, controls;
let rotatingBase;
let rotationSpeed = 0.01;

function init() {
    // Mundo 3D
    scene = new THREE.Scene();

    // Carregando o ficheiro HDRI (.exr)
    new EXRLoader().load('models/ferndale_studio_04_4k.exr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    });

    // Ponto de visão do usuário (Câmera)
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 3, -8);

    // Renderizador WebGL
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Controles de câmera
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Iluminação
    mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    // Adicionando o chão (Cilindro com texturas)
    const textureLoader = new THREE.TextureLoader();
    const floorGeometry = new THREE.CylinderGeometry(6, 6, 0.2, 64);
    
    const baseColorMap = textureLoader.load('texturas/prata/Collection_VidroReflectaPrata_sl_basecolor.jpg');
    const metallicMap = textureLoader.load('texturas/prata/Collection_VidroReflectaPrata_sl_metallic.jpg');
    const normalMap = textureLoader.load('texturas/prata/Collection_VidroReflectaPrata_sl_normal.jpg');
    const roughnessMap = textureLoader.load('texturas/prata/Collection_VidroReflectaPrata_sl_roughness.jpg');

    const floorMaterial = new THREE.MeshStandardMaterial({
        map: baseColorMap,
        metalnessMap: metallicMap,
        roughnessMap: roughnessMap,
        normalMap: normalMap,
        metalness: 1.0
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1;
    floor.receiveShadow = true;
    scene.add(floor);

    // Cilindro de madeira (Base rotativa interna)
    const woodColor = textureLoader.load('textures/wood_texture/dark_wood_diff_2k.jpg');
    const woodNormal = textureLoader.load('textures/wood_texture/dark_wood_nor_gl_2k.jpg');
    const woodRoughness = textureLoader.load('textures/wood_texture/dark_wood_rough_2k.jpg');

    const woodCylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(4.0, 4.0, 0.56, 128),
        new THREE.MeshStandardMaterial({
            map: woodColor,
            normalMap: woodNormal,
            roughnessMap: woodRoughness,
            roughness: 0.2,
            metalness: 0.0
        })
    );

    woodCylinder.position.y = -0.65;
    woodCylinder.receiveShadow = true;
    woodCylinder.castShadow = true;

    rotatingBase = new THREE.Group();
    scene.add(rotatingBase);
    rotatingBase.add(woodCylinder);

    const loader = new GLTFLoader();

    window.loadShoe = (fileName) => {
        if (currentShoe) {
            rotatingBase.remove(currentShoe);
        }

        loader.load(`models/${fileName}.glb`, (gltf) => {
            currentShoe = gltf.scene;

            currentShoe.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            const box = new THREE.Box3().setFromObject(currentShoe);
            const center = box.getCenter(new THREE.Vector3());
            currentShoe.position.sub(center);
            
            currentShoe.position.y = 1;
            currentShoe.scale.set(3, 3, 3);

            if (fileName === 'adidas_ozelia') {
                currentShoe.scale.set(1.5, 1.5, 1.5);
                currentShoe.position.y = -0.50;
                currentShoe.rotation.y -= 5;
            }

            rotatingBase.add(currentShoe);
        });
    };

    loadShoe('nike_air_zoom_pegasus_36');
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    if (rotatingBase) {
        rotatingBase.rotation.y += rotationSpeed;
    }

    renderer.render(scene, camera);
}

// --- EVENTOS DE INTERFACE ---

// Mudança de cor no tênis

document.querySelectorAll('.color-part-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.dataset.color;

        if (currentShoe) {
            currentShoe.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone();
                    child.material.color.set(color);
                }
            });
        }
    });
});

// Controle de Intensidade da Luz
document.getElementById('lightIntensity').addEventListener('input', (e) => {
    mainLight.intensity = parseFloat(e.target.value);
});

// Troca de Modelos (Marcas)
document.querySelectorAll('.brand-item').forEach(btn => {
    btn.addEventListener('click', () => loadShoe(btn.dataset.brand));
});

// Controle de Velocidade de Rotação
document.getElementById('speedControl').addEventListener('input', (e) => {
    rotationSpeed = parseFloat(e.target.value);
});

// Ajuste de Janela (Resize)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();