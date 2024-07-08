import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import GUI from "lil-gui";
import { useCallback, useEffect, useRef, useState } from "react";
import { AdditiveBlending, BufferAttribute, Points } from "three";

const GalaxyGenerator = () => {
  const pointsRef = useRef<Points>(null);
  const [count, setCount] = useState<number>(1000);
  const [size, setSize] = useState<number>(0.02);

  const generatePositions = useCallback(() => {
    const positions: Float32Array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3: number = i * 3;

      positions[i3] = (Math.random() - 0.5) * 3;
      positions[i3 + 1] = (Math.random() - 0.5) * 3;
      positions[i3 + 2] = (Math.random() - 0.5) * 3;
    }
    return [positions];
  }, [count]);

  useEffect(() => {
    if (pointsRef.current) {
      const newPositions = generatePositions()[0];
      pointsRef.current.geometry.setAttribute(
        "position",
        new BufferAttribute(newPositions, 3)
      );
    }
  }, [count, generatePositions]);

  useEffect(() => {
    const gui = new GUI();

    const galaxyControls = {
      count: count,
      size: size,
    };

    gui
      .add(galaxyControls, "count", 100, 1000000, 100)
      .onFinishChange((value: number) => setCount(value));
    gui
      .add(galaxyControls, "size", 0.001, 0.1, 0.001)
      .onFinishChange((value: number) => setSize(value));

    return () => {
      gui.destroy();
    };
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          array={generatePositions()[0]}
          count={generatePositions()[0].length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        depthWrite
        blending={AdditiveBlending}
      />
    </points>
  );
};

const Galaxy = () => {
  return (
    <Canvas
      style={{ height: "calc(100vh - 96px" }}
      camera={{ position: [0, 0, 3] }}
    >
      <GalaxyGenerator />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
};

export default Galaxy;
