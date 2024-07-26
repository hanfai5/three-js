import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { Perf } from "r3f-perf";

const Lights = () => {
  return (
    <>
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
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
      <Perf position="top-left" />
      <OrbitControls enablePan={false} />
      <Lights />

      <Physics debug>
        <RigidBody colliders="ball">
          <mesh castShadow position={[0, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color={"orange"} />
          </mesh>
        </RigidBody>

        {/* <RigidBody>
          <mesh castShadow position={[2, 2, 0]}>
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <mesh castShadow position={[2, 2, 3]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}
        <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation={[Math.PI * 0.2, 0, 0]}
        >
          <BallCollider args={[1.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
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
