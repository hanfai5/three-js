import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  CylinderCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import { Euler, Quaternion } from "three";
import hit from "/sounds/hit.mp3";

const Lights = () => {
  return (
    <>
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
    </>
  );
};

const Experience = () => {
  const cube = useRef<RapierRigidBody>(null);
  const twister = useRef<RapierRigidBody>(null);
  const [hitSound] = useState(() => new Audio(hit));
  const hamburger = useGLTF("/models/hamburger.glb");

  const cubeJump = (): void => {
    if (!cube.current) return;

    const mass: number = cube.current.mass();

    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, false);
    cube.current.applyTorqueImpulse(
      {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5,
      },
      false
    );
  };

  const collisionEnter = (): void => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  useFrame(({ clock }) => {
    if (!twister.current) return;

    const time: number = clock.getElapsedTime();
    const eulerRotation: Euler = new Euler(0, time, 0);
    const quaternionRotation: Quaternion = new Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle: number = time * 0.5;
    const x: number = Math.cos(angle) * 2;
    const z: number = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  return (
    <>
      <Physics debug gravity={[0, -9.81, 0]}>
        <RigidBody colliders="ball" position={[-1.5, 2, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color={"orange"} />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          // onCollisionEnter={collisionEnter}
          // onCollisionExit={() => {
          //   console.log("collision exit");
          // }}
          // onSleep={() => {
          //   console.log("sleep");
          // }}
          // onWake={() => {
          //   console.log("wake");
          // }}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
        </RigidBody>

        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" restitution={0} friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.2]} />
        </RigidBody>
      </Physics>
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
      <Experience />
      <Lights />
    </Canvas>
  );
};

export default Rapier;
