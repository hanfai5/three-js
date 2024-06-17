import { Canvas } from "@react-three/fiber";

const BasicScene = () => {
  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} intensity={1.5} />
        <mesh rotation={[-Math.PI / 3, 0, -Math.PI / 3]}>
          <boxGeometry />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </Canvas>
      <h1 className="title">Basic Scene</h1>
      <h3>
        A scene consists of the following - Canvas, Mesh, Camera, Renderer
      </h3>

      <h2 className="subtitle">Canvas</h2>
      <h3>
        A renderer will render our objects and camera and place it into a canvas
      </h3>

      <h2 className="subtitle">Mesh</h2>
      <h3>
        A Mesh is a basic scene in Three.js, it holds the geometry and the
        material needed to create the object
      </h3>

      <h2 className="subtitle">Camera</h2>
      <h3>A Camera is not visible as it is merely just a point of view</h3>
    </section>
  );
};

export default BasicScene;
