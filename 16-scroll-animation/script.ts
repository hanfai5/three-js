import * as THREE from "three";
import GUI from "lil-gui";

// Debug
const gui = new GUI();

const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor").onChange(() => {
  material.color.set(parameters.materialColor);
});

// Textures

const textureLoader = new THREE.TextureLoader();

const gradientImagePath: string = "/static/textures/gradients/3.jpg";
const gradientTexture = textureLoader.load(gradientImagePath);
gradientTexture.magFilter = THREE.NearestFilter;

// Canvas
const canvas: HTMLElement | null = document.querySelector(".webgl");

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Objects
const material: THREE.material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
});

const mesh1: THREE.Mesh = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.4, 16, 60),
  material
);
const mesh2: THREE.Mesh = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 32),
  material
);
const mesh3: THREE.Mesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material
);
scene.add(mesh1, mesh2, mesh3);

// Lights
const directionalLight = new THREE.DirectionalLight("ffffff", 3);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
scene.add(camera);

// Renderer
const renderer: THREE.Renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
