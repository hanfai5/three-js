import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// Debug
const gui = new GUI();

// Textures
const doorColorImagePath = "/static/textures/door/color.jpg";
const doorAlphaImagePath = "/static/textures/door/alpha.jpg";
const ambientOcclusionImagePath = "/static/textures/door/ambientOcclusion.jpg";
const doorHeightImagePath = "/static/textures/door/height.jpg";
const doorNormalImagePath = "/static/textures/door/normal.jpg";
const doorMetalnessImagePath = "/static/textures/door/metalness.jpg";
const doorRoughnessImagePath = "/static/textures/door/roughness.jpg";
const matcapImagePath = "/static/textures/matcaps/7.png";
const gradientImagePath = "/static/textures/gradients/3.jpg";
const environmentMapImagePath = "/static/textures/environmentMap/2k.hdr";

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load(doorColorImagePath);
const doorAlphaTexture = textureLoader.load(doorAlphaImagePath);
const doorAmbientOcclusionTexture = textureLoader.load(
  ambientOcclusionImagePath
);
const doorHeightTexture = textureLoader.load(doorHeightImagePath);
const doorNormalTexture = textureLoader.load(doorNormalImagePath);
const doorMetalnessTexture = textureLoader.load(doorMetalnessImagePath);
const doorRoughnessTexture = textureLoader.load(doorRoughnessImagePath);
const matcapTexture = textureLoader.load(matcapImagePath);
const gradientTexture = textureLoader.load(gradientImagePath);

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Object
// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture,
//   color: "red",
//   wireframe: true,
// });

// const material = new THREE.MeshNormalMaterial();

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial({
//   matcap: matcapTexture,
// });

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial({
//   shininess: 100,
//   specular: new THREE.Color(0x1188ff),
// });

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial({
//   gradientMap: gradientTexture,
//   minFilter: THREE.NearestFilter,
//   magFilter: THREE.NearestFilter,
// });

// MeshStandardMaterial
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.2,
  map: doorColorTexture,
  aoMap: doorAmbientOcclusionTexture,
  aoMapIntensity: 1,
});
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);

sphere.position.x = -1.5;
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

// Environment Map
const rgbeLoader = new RGBELoader();
rgbeLoader.load(environmentMapImagePath, (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  (sizes.width = window.innerWidth), (sizes.height = window.innerHeight);

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

// Clock
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.1 * elapsedTime;
  plane.rotation.x = 0.1 * elapsedTime;
  torus.rotation.x = 0.1 * elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
