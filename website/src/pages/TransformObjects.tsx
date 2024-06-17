import { Canvas, Vector3 } from "@react-three/fiber";

const TransformObjects = () => {
  const scale: Vector3 = [2, 1, 1];
  const position: Vector3 = [1, -1, 2];
  const rotation: [number, number, number] = [Math.PI / 4, Math.PI / 4, 0];

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <Canvas camera={{ position: [0, 0, 5] }} style={{ height: "400px" }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} intensity={1.5} />
        <mesh scale={scale} position={position} rotation={rotation}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </Canvas>

      <h1 className="title">Transform Object</h1>
      <h3>We can transform objects by - position, scale and rotation</h3>

      <h2 className="subtitle">Position</h2>
      <h3>Position consists of 3 properties - z, y and z</h3>
      <h3>
        In Three.js, y axis is going up, z axis is going backward, and x axis is
        going to the right
      </h3>

      <h2 className="subtitle">Scale</h2>
      <h3>Scale consists of 3 properties - z, y and z</h3>

      <h2 className="subtitle">Rotation</h2>
      <h3>Rotation consists of 3 properties - z, y and z</h3>
    </section>
  );
};

export default TransformObjects;
