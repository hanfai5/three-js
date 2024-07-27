import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useRef } from "react";

const Lights = () => {
  return (
    <>
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
    </>
  );
};

const Rapier = () => {
  const cube = useRef<RigidBody>(null);

  const cubeJump = (): void => {
    if (!cube.current) return;

    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

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
      <Perf position="top-left" />
      <OrbitControls enablePan={false} />
      <Lights />

      <Physics debug>
        <RigidBody colliders="ball" position={[-1.5, 2, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color={"orange"} />
          </mesh>
        </RigidBody>

        <RigidBody ref={cube}>
          <mesh castShadow position={[1.5, 2, 0]} onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </Canvas>
  );
};

export default Rapier;
