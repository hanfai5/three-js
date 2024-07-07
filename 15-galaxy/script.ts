import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// Debug
const gui = new GUI();

// Canvas
const canvas: HTMLElement | null = document.querySelector(".webgl");

// Scene
const scene: THREE.Scene = new THREE.Scene();

/**
 * Galaxy
 */

type Galaxy = {
  count?: number | null;
  size?: number | null;
  radius?: number | null;
  branches?: number | null;
  spin?: number | null;
  randomness?: number | null;
  randomnessPower?: number | null;
  insideColor?: string | null;
  outsideColor?: string | null;
};

const parameters: Galaxy = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};
let geometry: THREE.BufferGeometry = null;
let material: THREE.PointsMaterial = null;
let points = null;

const generateGalaxy = () => {
  if (points !== null) {
    geometry?.dispose();
    material?.dispose();
    scene.remove(points);
  }

  // Geometry
  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters?.count ?? 100000 * 3);
  const colors = new Float32Array(parameters?.count ?? 100000 * 3);

  for (let i = 0; i < (parameters.count ?? 1); i++) {
    const i3: number = i * 3;

    const radius: number = Math.random() * (parameters?.radius ?? 5);
    const spinAngle: number = radius * (parameters?.spin ?? 1);
    const branchAngle: number =
      ((i % (parameters?.branches ?? 3)) / (parameters?.branches ?? 3)) *
      Math.PI *
      2;

    const randomX =
      Math.pow(Math.random(), parameters?.randomnessPower ?? 3) *
      (Math.random() < 0.5 ? 1 : -1) *
      (parameters?.randomness ?? 0.2) *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters?.randomnessPower ?? 3) *
      (Math.random() < 0.5 ? 1 : -1) *
      (parameters?.randomness ?? 0.2) *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters?.randomnessPower ?? 3) *
      (Math.random() < 0.5 ? 1 : -1) *
      (parameters?.randomness ?? 0.2) *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / (parameters?.radius ?? 5));

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Material
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  // Points
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy();

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(0)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

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
