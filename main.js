import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// --- Cena e Background ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// --- Câmera ---
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);

// --- Renderer ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// --- Controles ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --- Iluminação ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 100);
spotLight.position.set(5, 10, 5);
spotLight.castShadow = true;
scene.add(spotLight);

// --- Palco ---
const stageGroup = new THREE.Group(); // Grupo para girar o palco e o tênis juntos
scene.add(stageGroup);

const stageGeo = new THREE.CylinderGeometry(2, 2, 0.3, 64);
const stageMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
const stage = new THREE.Mesh(stageGeo, stageMat);
stage.receiveShadow = true;
stageGroup.add(stage);

// --- Variáveis de controle ---
let shoe = null;
let rotationSpeed = 0.01;

// --- Carregamento do Modelo ---
const loader = new GLTFLoader();

loader.load(
    'Nike_Glb.glb', // Certifique-se que o nome está idêntico ao arquivo na pasta
    (gltf) => {
        shoe = gltf.scene;
        
        // Ajuste manual de escala (tente valores menores se o tênis não aparecer)
        shoe.scale.set(2, 2, 2); 
        
        // Posiciona o tênis sobre o palco
        shoe.position.set(0, 0.15, 0); 

        shoe.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                // Clonar material permite trocar a cor sem afetar outros objetos
                if (child.material) {
                    child.material = child.material.clone();
                }
            }
        });

        stageGroup.add(shoe);
        console.log("Modelo carregado com sucesso!");
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% carregado');
    },
    (error) => {
        console.error("Erro ao carregar o modelo:", error);
    }
);

// --- Eventos de UI ---
document.getElementById("colorPicker").addEventListener("input", (e) => {
    if (shoe) {
        shoe.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.color.set(e.target.value);
            }
        });
    }
});

document.getElementById("speed").addEventListener("input", (e) => {
    rotationSpeed = parseFloat(e.target.value);
});

// --- Redimensionamento ---
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Loop de Animação ---
function animate() {
    requestAnimationFrame(animate);
    
    // Rotaciona o grupo todo (Palco + Tênis)
    stageGroup.rotation.y += rotationSpeed;
    
    controls.update();
    renderer.render(scene, camera);
}

animate();
