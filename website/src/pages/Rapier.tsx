import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Lights = () => {
  return (
    <>
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
    </>
  );
};

const Rapier = () => {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, 2, 6],
      }}
      style={{
        height: "calc(100vh - 96px)",
        position: "fixed",
        left: "0",
        top: "96px",
      }}
    >
      <color args={["green"]} attach={"background"} />
      <OrbitControls enablePan={false} />
      <Lights />
      <mesh castShadow position={[-2, 2, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color={"orange"} />
      </mesh>
      <mesh castShadow position={[2, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"mediumpurple"} />
      </mesh>
      <mesh receiveShadow position-y={-1.25}>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </Canvas>
  );
};

export default Rapier;
