import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, Vector3, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Cursor } from "../types";
import * as THREE from "three";

const CameraController = ({ position }: { position: Vector3 }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (boxRef.current && cameraRef.current) {
      cameraRef.current.lookAt(boxRef.current.position);
    }
  });
  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={position} />
      <mesh ref={boxRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </>
  );
};

const Box = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime();
    ref.current.rotation.y = clock.getElapsedTime();
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

const Camera = () => {
  const [cursor, setCursor] = useState<Cursor>({
    x: 0,
    y: 0,
  });

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <Canvas
        style={{ height: "400px" }}
        onPointerMove={(e) => {
          setCursor({ x: e.clientX / 1200 - 0.5, y: -e.clientY / 400 + 0.5 });
        }}
        onPointerLeave={() => {
          setCursor({ x: 0, y: 0 });
        }}
      >
        <CameraController position={[cursor.x * 3, cursor.y * 3, 3]} />
        <ambientLight />
      </Canvas>

      <Canvas style={{ height: "400px" }} camera={{ position: [0, 0, 2] }}>
        <Box />
        <OrbitControls enablePan={false} />
        <ambientLight />
      </Canvas>

      <h1 className="title">Cameras</h1>
      <h3>
        Here we can adjust the position of the camera with custom controls and
        OrbitControls
      </h3>
    </section>
  );
};

export default Camera;
