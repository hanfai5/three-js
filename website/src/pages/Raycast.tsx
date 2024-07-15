import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

type SphereProps = {
  position: [number, number, number];
};

const Spheres = () => {
  const positionOne: [number, number, number] = [-2, 0, 0];
  const positionTwo: [number, number, number] = [0, 0, 0];
  const positionThree: [number, number, number] = [2, 0, 0];

  return (
    <>
      <Sphere position={positionOne} />
      <Sphere position={positionTwo} />
      <Sphere position={positionThree} />
    </>
  );
};

const Sphere: React.FC<SphereProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
};

const App = () => {
  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Raycast</h1>
      <Canvas style={{ height: "600px" }} camera={{ position: [0, 0, 3] }}>
        <Spheres />
        <OrbitControls enablePan={false} />
      </Canvas>
    </section>
  );
};

export default App;
