import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, currentShoe, mainLight, controls;

function init() {
    //Mundo 3D: scene = new THREE.Scene();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    //Ponto de visão do usuário(Câmera):
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 3);

    //Renderizador WebGL (Desenha tudo usando a GPU)
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.getElementById('canvas-container').appendChild(renderer.domElement);

    //Permite ao usuário interagir com a cena (girar, zoom, movimentar a câmera)
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    //Adicionando o chão:
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.8;
    floor.receiveShadow = true;
    scene.add(floor);

    const loader = new GLTFLoader();

    window.loadShoe = (fileName) => {
        if (currentShoe) scene.remove(currentShoe);

        //Geometria complexa importada externamente (modelo 3D do tênis):
        loader.load(`models/${fileName}.glb`, (gltf) => {
            currentShoe = gltf.scene;

            //Fazendo o tenis gerar sombras:
            currentShoe.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            const box = new THREE.Box3().setFromObject(currentShoe);
            const center = box.getCenter(new THREE.Vector3());
            currentShoe.position.sub(center);
            //Ajustando a posição do tênis para que fique no chão:
            currentShoe.position.y = -0.35;
            if(fileName == 'adidas_ozelia' ) {
                currentShoe.scale.set(0.5, 0.5, 0.5);
                currentShoe.position.y = -0.79;
                currentShoe.rotation.y += 5;
            }

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
