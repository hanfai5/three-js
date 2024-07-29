import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import {
  BoxGeometry,
  Euler,
  Material,
  MeshStandardMaterial,
  Quaternion,
} from "three";

const boxGeometry: BoxGeometry = new BoxGeometry(1, 1, 1);
const floor1Material: Material = new MeshStandardMaterial({
  color: "limegreen",
});
const floor2Material: Material = new MeshStandardMaterial({
  color: "greenyellow",
});
const obstacleMaterial: Material = new MeshStandardMaterial({
  color: "orangered",
});
const wallMaterial: Material = new MeshStandardMaterial({ color: "slategrey" });

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

const BlockStart = ({
  position = [0, 0, 0],
}: {
  position: [number, number, number];
}) => {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
};

const BlockEnd = ({
  position = [0, 0, 0],
}: {
  position: [number, number, number];
}) => {
  const hamburger = useGLTF("/models/hamburger.glb");
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.5, 0]}
        restitution={0.2}
        friction={0}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
};

const BlockSpinner = ({
  position = [0, 0, 0],
}: {
  position: [number, number, number];
}) => {
  const obstacle = useRef<RapierRigidBody>(null);
  const [speed] = useState(
    () => Math.random() + 0.2 * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame(({ clock }) => {
    if (!obstacle.current) return;

    const time: number = clock.getElapsedTime();
    const eulerRotation: Euler = new Euler(0, time * speed, 0);
    const quarternionRotation: Quaternion = new Quaternion();
    quarternionRotation.setFromEuler(eulerRotation);
    obstacle.current.setNextKinematicRotation(quarternionRotation);
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const BlockLimbo = ({
  position = [0, 0, 0],
}: {
  position: [number, number, number];
}) => {
  const obstacle = useRef<RapierRigidBody>(null);
  const [timeOffset] = useState(() => Math.random() * 2 * Math.PI);

  useFrame(({ clock }) => {
    if (!obstacle.current) return;

    const time: number = clock.getElapsedTime();
    const y: number = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const BlockAxe = ({
  position = [0, 0, 0],
}: {
  position: [number, number, number];
}) => {
  const obstacle = useRef<RapierRigidBody>(null);
  const [timeOffset] = useState(() => Math.random() * 2 * Math.PI);

  useFrame(({ clock }) => {
    if (!obstacle.current) return;

    const time: number = clock.getElapsedTime();
    const x: number = Math.sin(time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const Level = () => {
  return (
    <>
      <BlockStart position={[0, 0, 16]} />
      <BlockSpinner position={[0, 0, 12]} />
      <BlockLimbo position={[0, 0, 8]} />
      <BlockAxe position={[0, 0, 4]} />
      <BlockEnd position={[0, 0, 0]} />
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
      <color args={["lightyellow"]} attach={"background"} />
      <OrbitControls enablePan={false} />

      <Physics debug>
        <Lights />
        <Level />
      </Physics>
    </Canvas>
  );
};

export default Game;
