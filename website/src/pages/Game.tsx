import {
  KeyboardControls,
  useGLTF,
  useKeyboardControls,
} from "@react-three/drei";
import { addEffect, Canvas, useFrame } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
  useRapier,
} from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BoxGeometry,
  DirectionalLight,
  Euler,
  Material,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from "three";
import { Vector } from "three/examples/jsm/Addons.js";
import useGame from "../stores/useGame";

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
  const light = useRef<DirectionalLight>(null);

  useFrame((state) => {
    if (!light.current) return;

    light.current.position.z = state.camera.position.z + 1 - 4;
    light.current.target.position.z = state.camera.position.z - 4;
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={light}
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

const Bounds = ({ length = 1 }) => {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          position={[2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          castShadow
        ></mesh>
        <mesh
          position={[-2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          receiveShadow
        ></mesh>
        <mesh
          position={[0, 0.75, -(length * 4) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        ></mesh>
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
};

const Level = ({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
  seed = 0,
}) => {
  const blocks = useMemo(() => {
    const blocks = [];
    console.log(seed);

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
};

const Player = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const body = useRef<RapierRigidBody>(null);
  const { rapier, world } = useRapier();
  const [smoothedCameraPosition] = useState(() => new Vector3());
  const [smoothedCameraTarget] = useState(() => new Vector3());
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount: number = useGame((state) => state.blocksCount);

  const jump = (): void => {
    if (!body.current) return;

    const origin: Vector = body.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (!hit) return;

    if (hit.timeOfImpact < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, false);
    }
  };

  const reset = (): void => {
    if (!body.current) return;

    body.current.setTranslation({ x: 0, y: 0, z: 0 }, false);
    body.current.setLinvel({ x: 0, y: 0, z: 0 }, false);
    body.current.setAngvel({ x: 0, y: 0, z: 0 }, false);
  };

  useFrame((state, delta) => {
    if (!body.current) return;

    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength: number = 0.6 * delta;
    const torqueStrength: number = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse, false);
    body.current.applyTorqueImpulse(torque, false);

    /**
     * Camera
     */
    const bodyPosition: Vector = body.current.translation();

    const cameraPosition: Vector3 = new Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget: Vector3 = new Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    // Phases
    if (bodyPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }

    if (bodyPosition.y < -4) {
      restart();
    }
  });

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") {
          reset();
        }
      }
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump();
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeReset();
      unsubscribeJump();
      unsubscribeAny();
    };
  });

  return (
    <>
      <RigidBody
        ref={body}
        position={[0, 1, 0]}
        colliders="ball"
        restitution={0.2}
        friction={1}
        canSleep={false}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color={"mediumpurple"} />
        </mesh>
      </RigidBody>
    </>
  );
};

const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const time = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const { startTime, endTime, phase } = useGame.getState();

      let elapsedTime = 0;
      if (phase === "playing") {
        elapsedTime = Date.now() - startTime;
      } else if (phase === "ended") {
        elapsedTime = endTime - startTime;
      }

      if (time.current) {
        time.current.textContent = (elapsedTime / 1000).toFixed(2);
      }
    });

    return () => {
      unsubscribeEffect();
    };
  });

  return (
    <div className="fixed top-[96px] left-0 w-full h-[calc(100vh-96px)] pointer-events-auto">
      {/* Time */}
      <div
        ref={time}
        className={`absolute top-[15%] left-0 w-full text-white text-8xl text-center pb-[1rem] bg-[#00000033]`}
      >
        100
      </div>

      {/* Restart */}
      {phase === "ended" && (
        <div
          onClick={restart}
          className="absolute flex justify-center top-[40%] left-0 w-full text-white text-9xl bg-[#00000033] cursor-pointer pb-[1rem] z-10"
        >
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="absolute w-full bottom-[10%] left-0 pointer-events-none">
        {/* Up Key */}
        <div className="flex justify-center">
          <div
            className={`w-[40px] h-[40px] m-1 border-solid border-2 ${
              forward ? "bg-[#ffffff99]" : "bg-[#ffffff44]"
            }`}
          ></div>
        </div>

        {/* Left, Right and Bottom Key */}
        <div className="flex justify-center">
          <div
            className={`w-[40px] h-[40px] m-1 bg-[#ffffff44] border-solid border-2 ${
              leftward ? "bg-[#ffffff99]" : "bg-[#ffffff44]"
            }`}
          ></div>
          <div
            className={`w-[40px] h-[40px] m-1 bg-[#ffffff44] border-solid border-2 ${
              backward ? "bg-[#ffffff99]" : "bg-[#ffffff44]"
            }`}
          ></div>
          <div
            className={`w-[40px] h-[40px] m-1 bg-[#ffffff44] border-solid border-2 ${
              rightward ? "bg-[#ffffff99]" : "bg-[#ffffff44]"
            }`}
          ></div>
        </div>

        {/* Space bar */}
        <div className="flex justify-center">
          <div
            className={`w-[144px] h-[40px] m-1 bg-[#ffffff44] border-solid border-2 ${
              jump ? "bg-[#ffffff99]" : "bg-[#ffffff44]"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed: number = useGame((state) => state.blocksSeed);

  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
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
        {/* <OrbitControls enablePan={false} /> */}

        <Physics>
          <Lights />
          <Level count={blocksCount} seed={blocksSeed} />
          <Player />
        </Physics>
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
};

export default Game;
