import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const colorImagePath = "/static/textures/door/color.jpg";
const alphaImagePath = "/static/textures/door/alpha.jpg";
const heightImagePath = "/static/textures/door/height.jpg";
const normalImagePath = "/static/textures/door/normal.jpg";
const ambientOcclusionImagepath = "/static/textures/door/normal.jpg";
const metalnessImagePath = "/static/textures/door/metalness.jpg";
const roughnessImagePath = "/static/extures/door/roughness.jpg";

// Textures
// const image = new Image();
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace;
// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = imagePath;

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("loading started");
};
loadingManager.onLoad = () => {
  console.log("loading finished");
};
loadingManager.onProgress = () => {
  console.log("loading progressing");
};
loadingManager.onError = () => {
  console.log("loading error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(colorImagePath);
colorTexture.colorSpace = THREE.SRGBColorSpace;
const alphaTexture = textureLoader.load(alphaImagePath);
const heightTexture = textureLoader.load(heightImagePath);
const normalTexture = textureLoader.load(normalImagePath);
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionImagepath);
const metalnessTexture = textureLoader.load(metalnessImagePath);
const roughnessTexture = textureLoader.load(roughnessImagePath);

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({ map: normalTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
