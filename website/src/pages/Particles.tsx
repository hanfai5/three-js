import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  Points,
  Texture,
  TextureLoader,
} from "three";

const BasicParticles = () => {
  return (
    <points>
      <sphereGeometry args={[1, 32, 32]} />
      <pointsMaterial size={0.02} sizeAttenuation />
    </points>
  );
};

type TextureParticlesProps = {
  count?: number;
  size?: number;
  spread?: number;
};

const TextureParticles: React.FC<TextureParticlesProps> = ({
  count = 1000,
  size = 0.2,
  spread = 10,
}) => {
  const particleImagePath: string = "/textures/particles/2.png";
  const [particleTexture]: Texture[] = useLoader(TextureLoader, [
    particleImagePath,
  ]) as Texture[];

  const [positions, colors]: [Float32Array, Float32Array] = useMemo(() => {
    const positions: Float32Array = new Float32Array(count * 3);
    const colors: Float32Array = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      const i3: number = i * 3;

      // Positions
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;

      // Colors
      colors[i3] = Math.random();
      colors[i3 + 1] = Math.random();
      colors[i3 + 2] = Math.random();
    }

    return [positions, colors];
  }, [count, spread]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach={"attributes-color"}
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        alphaMap={particleTexture}
        transparent
        depthWrite
        blending={AdditiveBlending}
        vertexColors
      />
    </points>
  );
};

type TextureAnimationsProps = {
  count?: number;
  size?: number;
  spread?: number;
};

const TextureAnimations: React.FC<TextureAnimationsProps> = ({
  count = 1000,
  size = 0.2,
  spread = 10,
}) => {
  const pointsRef = useRef<Points>(null);

  const particleImagePath: string = "/textures/particles/2.png";
  const [particleTexture]: Texture[] = useLoader(TextureLoader, [
    particleImagePath,
  ]) as Texture[];

  const [positions, colors]: [Float32Array, Float32Array] = useMemo(() => {
    const positions: Float32Array = new Float32Array(count * 3);
    const colors: Float32Array = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      const i3: number = i * 3;

      // Position
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;

      // Colors
      colors[i3] = Math.random();
      colors[i3 + 1] = Math.random();
      colors[i3 + 2] = Math.random();
    }

    return [positions, colors];
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.getAttribute(
      "position"
    ) as BufferAttribute;

    for (let i = 0; i < count; i++) {
      const i3: number = i * 3;

      // Animate y position
      const x: number = positionAttribute.array[i3];
      positionAttribute.array[i3 + 1] = Math.sin(clock.getElapsedTime() + x);
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach={"attributes-color"}
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        alphaMap={particleTexture}
        transparent
        depthWrite
        blending={AdditiveBlending}
        vertexColors
      />
    </points>
  );
};

const Particles = () => {
  const cameraPosition: [number, number, number] = [0, 0, 2];

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Particles</h1>

      <h2 className="subtitle">Basic Particles</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <BasicParticles />
        <OrbitControls enablePan={false} />
      </Canvas>

      <h2 className="subtitle">Particles with Textures</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <TextureParticles />
        <OrbitControls enablePan={false} />
      </Canvas>

      <h2 className="subtitle">Particles with Animations</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: cameraPosition }}>
        <TextureAnimations />
        <OrbitControls enablePan={false} />
      </Canvas>
    </section>
  );
};

export default Particles;
