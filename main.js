import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js";

// Cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);

// Luzes
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
light.castShadow = true;
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// Palco
const stageGeometry = new THREE.CylinderGeometry(2, 2, 0.3, 64);
const stageMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const stage = new THREE.Mesh(stageGeometry, stageMaterial);
stage.receiveShadow = true;
scene.add(stage);

// Variáveis
let shoe = null;
let rotationSpeed = 0.01;

// Loader
const loader = new GLTFLoader();

loader.load(
  "tenis.glb",
  function (gltf) {
    shoe = gltf.scene;

    shoe.scale.set(2, 2, 2);
    shoe.position.y = 0.5;

    shoe.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

    scene.add(shoe);
  },
  undefined,
  function (error) {
    console.error("Erro ao carregar modelo:", error);
  }
);

// UI - cor
document.getElementById("colorPicker").addEventListener("input", (e) => {
  if (!shoe) return;

  const color = e.target.value;

  shoe.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.color.set(color);
    }
  });
});

// UI - velocidade
document.getElementById("speed").addEventListener("input", (e) => {
  rotationSpeed = parseFloat(e.target.value);
});

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animação
function animate() {
  requestAnimationFrame(animate);

  stage.rotation.y += rotationSpeed;

  renderer.render(scene, camera);
}

animate();
