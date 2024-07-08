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
const textureLoader: THREE.TextureLoader = new THREE.TextureLoader();

const gradientImagePath: string = "/static/textures/gradients/3.jpg";
const gradientTexture: THREE.Textures = textureLoader.load(gradientImagePath);
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

const objectsDistance: number = 4;
mesh1.position.x = 2;
mesh2.position.x = -2;
mesh3.position.x = 2;

mesh1.position.y = -objectsDistance * 0;
mesh2.position.y = -objectsDistance * 1;
mesh3.position.y = -objectsDistance * 2;

scene.add(mesh1, mesh2, mesh3);

// Lights
const directionalLight: THREE.Lights = new THREE.DirectionalLight("ffffff", 3);
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

/**
 * Camera
 */
// Group
const cameraGroup: THREE.Group = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

// Renderer
const renderer: THREE.Renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

// Scroll
let scrollY: number = window.scrollY;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

// Animate
const clock = new THREE.Clock();
let previousTime: number = 0;

const sectionMeshes: THREE.Textures[] = [mesh1, mesh2, mesh3];

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime: number = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX: number = cursor.x;
  const parallaxY: number = -cursor.y;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
