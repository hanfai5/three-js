import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import * as THREE from "three";

const Box = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const [color, setColor] = useState("#00ff00");
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [subdivisions, setSubdivisions] = useState<number>(1);

  useEffect(() => {
    const gui = new GUI();
    gui.add(ref.current.rotation, "x", 0, Math.PI * 2);

    const subdivisionController = gui.add({ subdivisions }, "subdivisions");
    const wireframeController = gui.add({ wireframe }, "wireframe");
    const colorController = gui.addColor({ color }, "color");

    subdivisionController.onFinishChange((value) => setSubdivisions(value));
    wireframeController.onChange((value) => setWireframe(value));
    colorController.onChange((value) => setColor(value));

    return () => {
      gui.destroy();
    };
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1, subdivisions, subdivisions, subdivisions]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
};

const DebugUI = () => {
  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <Canvas style={{ height: "400px" }} camera={{ position: [0, 0, 2] }}>
        <Box />
        <OrbitControls enablePan={false} />
        <ambientLight />
      </Canvas>
    </section>
  );
};

export default DebugUI;
