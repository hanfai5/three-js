import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Object
const geometry: THREE.geometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera: THREE.Camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer: THREE.Renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animations
// Basic
// const tick = () => {
//   mesh.rotation.y += 0.01;
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// Adapt to the framerate
// let time = Date.now();

// const tick = () => {
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;

//   mesh.rotation.y += 0.01 * deltaTime;
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// Using Clock
// const clock = new THREE.Clock();
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   camera.position.x = Math.cos(elapsedTime);
//   camera.position.y = Math.sin(elapsedTime);
//   camera.lookAt(mesh.position);
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
