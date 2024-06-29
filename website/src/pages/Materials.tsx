import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Mesh =
  | "basic"
  | "normal"
  | "matcap"
  | "lambert"
  | "phong"
  | "toon"
  | "standard";
type GeometryProps = {
  position: [number, number, number];
  mesh: Mesh;
};

const doorColorImagePath = "/public/textures/door/color.jpg";
const ambientOcclusionImagePath = "/public/textures/door/ambientOcclusion.jpg";
const matcapImagePath = "/public/textures/matcaps/6.png";
const gradientImagePath = "/public/textures/gradients/3.jpg";
const environmentMapImagePath = "/public/textures/environmentMap/2k.hdr";

const Sphere = ({ position, mesh }: GeometryProps) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [
    colorTexture,
    ambientOcclusionTexture,
    matcapTexture,
    gradientTexture,
  ] = useLoader(THREE.TextureLoader, [
    doorColorImagePath,
    ambientOcclusionImagePath,
    matcapImagePath,
    gradientImagePath,
  ]);

  useFrame(({ clock }) => {
    ref.current.rotation.x = 0.5 * clock.getElapsedTime();
    ref.current.rotation.y = 0.5 * clock.getElapsedTime();
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      {mesh === "basic" && <meshBasicMaterial map={colorTexture} />}
      {mesh === "normal" && <meshNormalMaterial />}
      {mesh === "matcap" && <meshMatcapMaterial matcap={matcapTexture} />}
      {mesh === "lambert" && <meshLambertMaterial />}
      {mesh === "phong" && (
        <meshPhongMaterial
          shininess={100}
          specular={new THREE.Color(0x1188ff)}
        />
      )}
      {mesh === "toon" && <meshToonMaterial gradientMap={gradientTexture} />}
      {mesh === "standard" && (
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.2}
          map={colorTexture}
          aoMap={ambientOcclusionTexture}
          aoMapIntensity={1}
        />
      )}
    </mesh>
  );
};

const Plane = ({ position, mesh }: GeometryProps) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [
    colorTexture,
    ambientOcclusionTexture,
    matcapTexture,
    gradientTexture,
  ] = useLoader(THREE.TextureLoader, [
    doorColorImagePath,
    ambientOcclusionImagePath,
    matcapImagePath,
    gradientImagePath,
  ]);

  useFrame(({ clock }) => {
    ref.current.rotation.x = 0.5 * clock.getElapsedTime();
    ref.current.rotation.y = 0.5 * clock.getElapsedTime();
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1, 1]} />
      {mesh === "basic" && <meshBasicMaterial map={colorTexture} />}
      {mesh === "normal" && <meshNormalMaterial />}
      {mesh === "matcap" && <meshMatcapMaterial matcap={matcapTexture} />}
      {mesh === "lambert" && <meshLambertMaterial />}
      {mesh === "phong" && (
        <meshPhongMaterial
          shininess={100}
          specular={new THREE.Color(0x1188ff)}
        />
      )}
      {mesh === "toon" && <meshToonMaterial gradientMap={gradientTexture} />}
      {mesh === "standard" && (
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.2}
          map={colorTexture}
          aoMap={ambientOcclusionTexture}
          aoMapIntensity={1}
        />
      )}
    </mesh>
  );
};

const Torus = ({ position, mesh }: GeometryProps) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [
    colorTexture,
    ambientOcclusionTexture,
    matcapTexture,
    gradientTexture,
  ] = useLoader(THREE.TextureLoader, [
    doorColorImagePath,
    ambientOcclusionImagePath,
    matcapImagePath,
    gradientImagePath,
  ]);

  useFrame(({ clock }) => {
    ref.current.rotation.x = 0.5 * clock.getElapsedTime();
    ref.current.rotation.y = 0.5 * clock.getElapsedTime();
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.3, 0.2, 16, 32]} />
      {mesh === "basic" && <meshBasicMaterial map={colorTexture} />}
      {mesh === "normal" && <meshNormalMaterial />}
      {mesh === "matcap" && <meshMatcapMaterial matcap={matcapTexture} />}
      {mesh === "lambert" && <meshLambertMaterial />}
      {mesh === "phong" && (
        <meshPhongMaterial
          shininess={100}
          specular={new THREE.Color(0x1188ff)}
        />
      )}
      {mesh === "toon" && <meshToonMaterial gradientMap={gradientTexture} />}
      {mesh == "standard" && (
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.2}
          map={colorTexture}
          aoMap={ambientOcclusionTexture}
          aoMapIntensity={1}
        />
      )}
    </mesh>
  );
};

const Materials = () => {
  const spherePosition: [number, number, number] = [-1.5, 0, 0];
  const planePosition: [number, number, number] = [0, 0, 0];
  const torusPosition: [number, number, number] = [1.5, 0, 0];
  const cameraPosition: [number, number, number] = [0, 0, 2];
  const pointLightPosition: [number, number, number] = [2, 3, 4];

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Materials</h1>
      <h3>We apply materials to meshes</h3>

      <h2 className="subtitle">MeshBasicMaterial</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <ambientLight />
        <OrbitControls />
        <Sphere position={spherePosition} mesh={"basic"} />
        <Plane position={planePosition} mesh={"basic"} />
        <Torus position={torusPosition} mesh={"basic"} />
      </Canvas>

      <h2 className="subtitle">MeshNormalMaterial</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <ambientLight />
        <OrbitControls />
        <Sphere position={spherePosition} mesh={"normal"} />
        <Plane position={planePosition} mesh={"normal"} />
        <Torus position={torusPosition} mesh={"normal"} />
      </Canvas>

      <h2 className="subtitle">MeshMatcapMaterial</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <Sphere position={spherePosition} mesh={"matcap"} />
        <Plane position={planePosition} mesh={"matcap"} />
        <Torus position={torusPosition} mesh={"matcap"} />
      </Canvas>

      <h2 className="subtitle">MeshLambertMaterial</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={pointLightPosition} />
        <Sphere position={spherePosition} mesh={"lambert"} />
        <Plane position={planePosition} mesh={"lambert"} />
        <Torus position={torusPosition} mesh={"lambert"} />
      </Canvas>

      <h2 className="subtitle">MeshPhongMaterial</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={pointLightPosition} />
        <Sphere position={spherePosition} mesh={"phong"} />
        <Plane position={planePosition} mesh={"phong"} />
        <Torus position={torusPosition} mesh={"phong"} />
      </Canvas>

      <h2 className="subtitle">MeshToonMaterial</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={pointLightPosition} />
        <Sphere position={spherePosition} mesh={"toon"} />
        <Plane position={planePosition} mesh={"toon"} />
        <Torus position={torusPosition} mesh={"toon"} />
      </Canvas>

      <h2 className="subtitle">MeshStandardMaterial</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={pointLightPosition} />
        <Sphere position={spherePosition} mesh={"standard"} />
        <Plane position={planePosition} mesh={"standard"} />
        <Torus position={torusPosition} mesh={"standard"} />
        <Environment background={true} files={environmentMapImagePath} />
      </Canvas>
    </section>
  );
};

export default Materials;
