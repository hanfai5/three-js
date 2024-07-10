import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import GUI from "lil-gui";
import { useCallback, useEffect, useRef, useState } from "react";
import { AdditiveBlending, BufferAttribute, Color, Points } from "three";

const GalaxyGenerator = () => {
  const pointsRef = useRef<Points>(null);
  const [count, setCount] = useState<number>(10000);
  const [size, setSize] = useState<number>(0.02);
  const [radius, setRadius] = useState<number>(5);
  const [branches, setBranches] = useState<number>(3);
  const [spin, setSpin] = useState<number>(1);
  const [randomness, setRandomness] = useState<number>(0.2);
  const [randomnessPower, setRandomnessPower] = useState<number>(3);
  const [insideColor, setInsideColor] = useState<string>("#ff6030");
  const [outsideColor, setOutsideColor] = useState<string>("#1b3984");

  const generatePositions: () => [Float32Array, Float32Array] =
    useCallback(() => {
      const positions: Float32Array = new Float32Array(count * 3);
      const colors: Float32Array = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const i3: number = i * 3;

        const galaxyRadius: number = Math.random() * radius;
        const branchAngle: number = ((i % branches) / branches) * Math.PI * 2;
        const spinAngle: number = galaxyRadius * spin;

        const randomX: number =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          randomness *
          galaxyRadius;
        const randomY: number =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          randomness *
          galaxyRadius;
        const randomZ: number =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          randomness *
          galaxyRadius;

        positions[i3] =
          Math.cos(branchAngle + spinAngle) * galaxyRadius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * galaxyRadius + randomZ;

        const colorInside: Color = new Color(insideColor);
        const colorOutside: Color = new Color(outsideColor);
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, galaxyRadius / radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      return [positions, colors];
    }, [
      count,
      radius,
      branches,
      spin,
      randomness,
      randomnessPower,
      insideColor,
      outsideColor,
    ]);

  useEffect(() => {
    if (pointsRef.current) {
      const newPositions = generatePositions()[0];
      pointsRef.current.geometry.setAttribute(
        "position",
        new BufferAttribute(newPositions, 3)
      );
    }
  }, [generatePositions]);

  useEffect(() => {
    const gui = new GUI();

    const galaxyControls = {
      count: count,
      size: size,
      radius: radius,
      branches: branches,
      spin: spin,
      randomness: randomness,
      randomnessPower: randomnessPower,
      insideColor: insideColor,
      outsideColor: outsideColor,
    };

    gui
      .add(galaxyControls, "count", 100, 1000000, 100)
      .onFinishChange((value: number) => setCount(value));
    gui
      .add(galaxyControls, "size", 0.001, 0.1, 0.001)
      .onFinishChange((value: number) => setSize(value));
    gui
      .add(galaxyControls, "radius", 0.01, 20, 0.01)
      .onFinishChange((value: number) => setRadius(value));
    gui
      .add(galaxyControls, "branches", 2, 20, 1)
      .onFinishChange((value: number) => setBranches(value));
    gui
      .add(galaxyControls, "spin", -5, 5, 0.001)
      .onFinishChange((value: number) => setSpin(value));
    gui
      .add(galaxyControls, "randomness", 0, 2, 0.001)
      .onFinishChange((value: number) => setRandomness(value));
    gui
      .add(galaxyControls, "randomnessPower", 1, 10, 0.001)
      .onFinishChange((value: number) => setRandomnessPower(value));
    gui
      .add(galaxyControls, "insideColor")
      .onFinishChange((value: string) => setInsideColor(value));
    gui
      .add(galaxyControls, "outsideColor")
      .onFinishChange((value: string) => setOutsideColor(value));

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
        <bufferAttribute
          attach={"attributes-color"}
          array={generatePositions()[1]}
          count={generatePositions()[1].length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        depthWrite
        blending={AdditiveBlending}
        vertexColors
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
