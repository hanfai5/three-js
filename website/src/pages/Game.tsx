import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Lights = () => {
  return (
    <>
      <directionalLight
        castShadow
        position={[4, 4, 1]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1.5} />
    </>
  );
};

const Game = () => {
  return (
    <Canvas
      shadows
      camera={{ fov: 45, near: 0.1, far: 200, position: [2.5, 4, 5] }}
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
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </Canvas>
  );
};

export default Game;
