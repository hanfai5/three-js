import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { BoxGeometry, Material, MeshStandardMaterial } from "three";

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

const BlockSpinner = ({
  position = [0, 0, 0],
}: {
  position: [number, number, number];
}) => {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <mesh
        geometry={boxGeometry}
        material={obstacleMaterial}
        scale={[3.5, 0.3, 0.3]}
        castShadow
        receiveShadow
      />
    </group>
  );
};

const Level = () => {
  return (
    <>
      <BlockStart position={[0, 0, 4]} />
      <BlockSpinner position={[0, 0, 0]} />
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
      <color args={["limeyellow"]} attach={"background"} />
      <OrbitControls enablePan={false} />

      <Physics debug>
        <Lights />
        <Level />
      </Physics>
    </Canvas>
  );
};

export default Game;
