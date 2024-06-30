import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Sphere = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  );
};

const Cube = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.75, 0.75, 0.75]} />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  );
};

const Torus = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position}>
      <torusGeometry args={[0.3, 0.2, 32, 64]} />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  );
};

const Plane = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  );
};

const Lights = () => {
  const spherePosition: [number, number, number] = [-1.5, 0, 0];
  const cubePosition: [number, number, number] = [0, 0, 0];
  const torusPosition: [number, number, number] = [1.5, 0, 0];
  const planePosition: [number, number, number] = [0, -0.65, 0];
  const cameraPosition: [number, number, number] = [0, 0, 2];

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Materials</h1>

      <h2 className="subtitle">Ambient Light</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <Sphere position={spherePosition} />
        <Cube position={cubePosition} />
        <Plane position={planePosition} />
        <Torus position={torusPosition} />
        <ambientLight color={"0xffffff"} intensity={1.5} />
      </Canvas>

      <h2 className="subtitle">Directional Light</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <Sphere position={spherePosition} />
        <Cube position={cubePosition} />
        <Plane position={planePosition} />
        <Torus position={torusPosition} />
        <directionalLight
          color={"0x00fffc"}
          intensity={0.9}
          position={[1, 0.25, 0]}
        />
      </Canvas>

      <h2 className="subtitle">Hemisphere Light</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <Sphere position={spherePosition} />
        <Cube position={cubePosition} />
        <Plane position={planePosition} />
        <Torus position={torusPosition} />
        <hemisphereLight
          color={"0xff0000"}
          groundColor={"0x0000ff"}
          intensity={0.9}
        />
      </Canvas>

      <h2 className="subtitle">Point Light</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <Sphere position={spherePosition} />
        <Cube position={cubePosition} />
        <Plane position={planePosition} />
        <Torus position={torusPosition} />
        <pointLight color={"0xff9000"} intensity={1.5} distance={0} decay={2} />
      </Canvas>

      <h2 className="subtitle">Rect Area Light</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <OrbitControls />
        <Sphere position={spherePosition} />
        <Cube position={cubePosition} />
        <Plane position={planePosition} />
        <Torus position={torusPosition} />
        <rectAreaLight color={"0x4e00ff"} intensity={6} width={1} height={1} />
      </Canvas>
    </section>
  );
};

export default Lights;
