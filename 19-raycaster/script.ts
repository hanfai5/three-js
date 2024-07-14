import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// Debug
const gui: GUI = new GUI();

// Canvas
const canvas: HTMLElement | null = document.querySelector(".webgl");

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Objects
const object1: THREE.Mesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "red" })
);
object1.position.x = -2;

const object2: THREE.Mesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "red" })
);

const object3: THREE.Mesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "red" })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

// Raycaster
const raycaster: THREE.Raycaster = new THREE.Raycaster();
// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
// rayDirection.normalize();
// raycaster.set(rayOrigin, rayDirection);

// const intersect = raycaster.intersectObject(object2);
// console.log(intersect);
// const intersects = raycaster.intersectObjects([object1, object2, object3]);
// console.log(intersects);

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
  renderer.setSize(sizes.width);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

// Camera
const camera: THREE.Camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 3);
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
// controls.target.set(0, 0.75, 0);
controls.enableDamping = true;
controls.enablePan = false;

// Animate
const clock: THREE.Clock = new THREE.Clock();

const tick = () => {
  const elapsedTime: number = clock.getElapsedTime();

  // Animate objects
  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

  // Cast a ray
  const rayOrigin = new THREE.Vector3(-3, 0, 0);
  const rayDirection = new THREE.Vector3(1, 0, 0);
  rayDirection.normalize();

  raycaster.set(rayOrigin, rayDirection);

  const objectsToTest = [object1, object2, object3];
  const intersects = raycaster.intersectObjects(objectsToTest);

  for (const object of objectsToTest) {
    object.material.color.set("#ff0000");
  }

  for (const intersect of intersects) {
    intersect.object.material.color.set("#0000ff");
  }

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
