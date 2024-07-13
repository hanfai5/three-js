import { useSphere, Physics, usePlane } from "@react-three/cannon";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const Sphere = () => {
  const [environmentMapTexture] = useTexture([
    "/textures/environmentMaps/0/px.png",
    "/textures/environmentMaps/0/nx.png",
    "/textures/environmentMaps/0/py.png",
    "/textures/environmentMaps/0/ny.png",
    "/textures/environmentMaps/0/pz.png",
    "/textures/environmentMaps/0/nz.png",
  ]);

  const [ref] = useSphere(
    () => ({
      args: [0.5],
      mass: 1,
      position: [0, 3, 0],
      material: { friction: 0.1, restitution: 0.7 },
    }),
    useRef<Mesh>(null!)
  );

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5, 20, 20]} />
      <meshStandardMaterial
        metalness={0.3}
        roughness={0.4}
        envMap={environmentMapTexture}
        envMapIntensity={0.5}
      />
    </mesh>
  );
};

const Floor = () => {
  const [environmentMapTexture] = useTexture([
    "/textures/environmentMaps/0/px.png",
    "/textures/environmentMaps/0/nx.png",
    "/textures/environmentMaps/0/py.png",
    "/textures/environmentMaps/0/ny.png",
    "/textures/environmentMaps/0/pz.png",
    "/textures/environmentMaps/0/nz.png",
  ]);

  const [ref] = usePlane(
    () => ({
      mass: 0,
      rotation: [-Math.PI * 0.5, 0, 0],
      material: { friction: 0.1, restitution: 0.7 },
    }),
    useRef<Mesh>(null!)
  );

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial
        metalness={0.3}
        roughness={0.4}
        envMap={environmentMapTexture}
        envMapIntensity={0.5}
      />
    </mesh>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight color={0xffffff} intensity={2.1} />
      <directionalLight
        color={0xffffff}
        intensity={1}
        position={[5, 5, 5]}
        castShadow
      />
    </>
  );
};

const App = () => {
  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Physics</h1>

      <Canvas
        style={{ height: "600px" }}
        camera={{ position: [-3, 3, 3] }}
        shadows
      >
        <Physics gravity={[0, -9.82, 0]}>
          <Sphere />
          <Floor />
        </Physics>
        <Lights />
        <OrbitControls enablePan={false} />
      </Canvas>
    </section>
  );
};

export default App;
