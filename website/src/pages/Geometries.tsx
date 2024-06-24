import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Box = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

const Sphere = () => {
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color={"blue"} wireframe={true} />
    </mesh>
  );
};

const Buffer = () => {
  const positions = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <meshStandardMaterial color={"red"} wireframe={true} />
    </mesh>
  );
};

const Geometries = () => {
  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Geometries</h1>

      <h2 className="subtitle">Box Geometry</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: [0, 0, 2] }}>
        <Box />
        <OrbitControls enablePan={false} />
        <ambientLight />
      </Canvas>

      <h2 className="subtitle">Sphere Geometry</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: [0, 0, 2] }}>
        <Sphere />
        <OrbitControls enablePan={false} />
        <ambientLight />
      </Canvas>

      <h2 className="subtitle">Buffer Geometry</h2>
      <Canvas style={{ height: "400px" }} camera={{ position: [0, 0, 2] }}>
        <Buffer />
        <ambientLight />
        <OrbitControls enablePan={false} />
      </Canvas>
    </section>
  );
};

export default Geometries;
