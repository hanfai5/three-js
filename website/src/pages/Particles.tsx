import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const BasicParticles = () => {
  return (
    <points>
      <sphereGeometry args={[1, 32, 32]} />
      <pointsMaterial size={0.02} sizeAttenuation />
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
      <Canvas
        style={{ height: "400px" }}
        camera={{ position: cameraPosition }}
      ></Canvas>
    </section>
  );
};

export default Particles;
