import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import { Sky } from "three/addons/objects/Sky.js";
import GUI from "lil-gui";

// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const floorAlphaImagePath = "/static/floor/alpha.jpg";
const floorColorImagePath =
  "/static/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg";
const floorARMImagePath =
  "/static/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg";
const floorNormalImagePath =
  "/static/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg";
const floorDisplacementImagePath =
  "/static/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg";

const textureLoader = new THREE.TextureLoader();

// Floor
const floorAlphaTexture = textureLoader.load(floorAlphaImagePath);
const floorColorTexture = textureLoader.load(floorColorImagePath);
const floorARMTexture = textureLoader.load(floorARMImagePath);
const floorNormalTexture = textureLoader.load(floorNormalImagePath);
const floorDisplacementTexture = textureLoader.load(floorDisplacementImagePath);

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.5,
    displacementBias: -0.3,
  })
);

gui
  .add(floor.material, "displacementScale")
  .min(0)
  .max(1)
  .step(0.001)
  .name("floorDisplacementScale");
gui
  .add(floor.material, "displacementBias")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("floorDisplacementBias");

floor.position.y = 0;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// House container
const house = new THREE.Group();
scene.add(house);

// Walls
const wallColorImagePath =
  "/static/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg";
const wallARMImagePath =
  "/static/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg";
const wallNormalImagePath =
  "/static/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg";

const wallColorTexture = textureLoader.load(wallColorImagePath);
const wallARMTexture = textureLoader.load(wallARMImagePath);
const wallNormalTexture = textureLoader.load(wallNormalImagePath);

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);
walls.position.y = 1.25;
house.add(walls);

// Roof
const roofColorImagePath =
  "/static/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg";
const roofARMImagePath =
  "/static/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg";
const roofNormalImagePath =
  "/static/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg";

const roofColorTexture = textureLoader.load(roofColorImagePath);
const roofARMTexture = textureLoader.load(roofARMImagePath);
const roofNormalTexture = textureLoader.load(roofNormalImagePath);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);
roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const doorColorImagePath: string = "/static/door/color.jpg";
const doorAlphaImagePath: string = "/static/door/alpha.jpg";
const doorAmbientOcclusionImagePath: string =
  "/static/door/ambientOcclusion.jpg";
const doorHeightImagePath: string = "/static/door/height.jpg";
const doorNormalImagePath: string = "/static/door/normal.jpg";
const doorMetalnessImagePath: string = "/static/door/metalness.jpg";
const doorRoughnessImagePath: string = "/static/door/roughness.jpg";

const doorColorTexture: THREE.Textures = textureLoader.load(doorColorImagePath);
const doorAlphaTexture: THREE.Textures = textureLoader.load(doorAlphaImagePath);
const doorAmbientOcclusionTexture: THREE.Textures = textureLoader.load(
  doorAmbientOcclusionImagePath
);
const doorHeightTexture: THREE.Textures =
  textureLoader.load(doorHeightImagePath);
const doorNormalTexture: THREE.Textures =
  textureLoader.load(doorNormalImagePath);
const doorMetalnessTexture: THREE.Textures = textureLoader.load(
  doorMetalnessImagePath
);
const doorRoughnessTexture: THREE.Textures = textureLoader.load(
  doorRoughnessImagePath
);
doorColorTexture.colorSpace = THREE.SRGBColorSpace;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
  })
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Door Light
const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
scene.add(doorLight);

// Bushes
const bushColorImagePath =
  "/static/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg";
const bushARMImagePath =
  "/static/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg";
const bushNormalImagePath =
  "/static/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg";

const bushColorTexture = textureLoader.load(bushColorImagePath);
const bushARMTexture = textureLoader.load(bushARMImagePath);
const bushNormalTexture = textureLoader.load(bushNormalImagePath);
bushColorTexture.colorSpace = THREE.SRGBColorSpace;

bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;

scene.add(bush1, bush2, bush3, bush4);

// Graves
const graveColorImagePath: string =
  "/static/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg";
const graveARMImagePath: string =
  "/static/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg";
const graveNormalImagePath: string =
  "/static/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg";

const graveColorTexture: THREE.Textures =
  textureLoader.load(graveColorImagePath);
const graveARMTexture: THREE.Textures = textureLoader.load(graveARMImagePath);
const graveNormalTexture: THREE.Textures =
  textureLoader.load(graveNormalImagePath);
graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});
const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = radius * Math.sin(angle);
  const z = radius * Math.cos(angle);

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;

  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}

const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

// Lights
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Sky
const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

// Fog
scene.fog = new THREE.FogExp2("#04343f", 0.1);

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
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.width,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.render(scene, camera);

// Cast and receive
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

// walls.castShadow = true;
// walls.receiveShadow = true;
// roof.castShadow = true;
// floor.receiveShadow = true;

// Mappings
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;

const timer = new Timer();

const tick = () => {
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.sin(ghost1Angle) * 4;
  ghost1.position.z = Math.cos(ghost1Angle) * 4;
  ghost1.position.y =
    Math.sin(ghost1Angle) *
    Math.sin(ghost1Angle * 2.34) *
    Math.sin(ghost1Angle * 3.45);

  const ghost2Angle = -elapsedTime * 0.5;
  ghost2.position.x = Math.sin(ghost2Angle) * 5;
  ghost2.position.z = Math.cos(ghost2Angle) * 5;
  ghost2.position.y =
    Math.sin(ghost2Angle) *
    Math.sin(ghost2Angle * 2.34) *
    Math.sin(ghost2Angle * 3.45);

  const ghost3Angle = elapsedTime * 0.23;
  ghost3.position.x = Math.sin(ghost3Angle) * 6;
  ghost3.position.z = Math.cos(ghost3Angle) * 6;
  ghost3.position.y =
    Math.sin(ghost3Angle) *
    Math.sin(ghost3Angle * 2.34) *
    Math.sin(ghost3Angle * 3.45);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
