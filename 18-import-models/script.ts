import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// Debug
const gui: GUI = new GUI();

// Canvas
const canvas: HTMLElement | null = document.querySelector(".webgl");

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Models
const defaultGLTFPath: string = "/static/models/Duck/glTF/Duck.gltf";
const gltfBinaryPath: string = "/static/models/Duck/glTF-Binary/Duck.glb";
const gltfEmbeddedPath: string = "/static/models/Duck/glTF-Embedded/Duck.gltf";
const gltfDracoPath: string = "/static/models/Duck/glTF-Draco/Duck.gltf";

const flightHelmetGLTFPath: string =
  "/static/models/FlightHelmet/glTF/FlightHelmet.gltf";

const defaultFoxGTLFPath: string = "/static/models/Fox/glTF/Fox.gltf";

let mixer = null;

const gltfLoader: GLTFLoader = new GLTFLoader();
gltfLoader.load(defaultFoxGTLFPath, (gltf) => {
  console.log(gltf);
  gltf.scene.scale.set(0.025, 0.025, 0.025);
  scene.add(gltf.scene);

  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[2]);
  action.play();
});

// Floor
const floor: THREE.Mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#444444",
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// Lights
const ambientLight: THREE.Lights = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

const directionalLight: THREE.Lights = new THREE.DirectionalLight(
  0xffffff,
  1.8
);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
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
  renderer.setSize(sizes.width);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(2, 2, 2);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enablePan = false;

// Animate
const clock: THREE.Clock = new THREE.Clock();
let previousTime: number = 0;

const tick = () => {
  const elaspedTime: number = clock.getElapsedTime();
  const deltaTime: number = elaspedTime - previousTime;
  previousTime = elaspedTime;

  if (mixer) {
    mixer.update(deltaTime);
  }

  // Update controls
  controls.update();

  // Renders
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
