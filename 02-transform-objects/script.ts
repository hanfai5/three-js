import * as THREE from "three";
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Object
const geometry: THREE.geometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Position
mesh.position.set(0, 0, 0);

// Scale
mesh.scale.set(1, 1, 1);

// Rotation
mesh.rotation.set(Math.PI / 4, Math.PI / 4, 0);

// Axes helper
const axeshelper = new THREE.AxesHelper(2);
scene.add(axeshelper);

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

console.log(mesh.position.distanceTo(camera.position));

// Renderer
const renderer: THREE.Renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
