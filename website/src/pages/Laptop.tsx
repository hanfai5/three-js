import {
  Environment,
  Float,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Laptop = () => {
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  return (
    <Canvas
      camera={{ fov: 45, near: 0.1, far: 2000, position: [-3, 1.5, 4] }}
      style={{
        height: "calc(100vh - 96px)",
        position: "fixed",
        left: "0",
        top: "96px",
        touchAction: "none",
      }}
    >
      <color args={["#241a1a"]} attach={"background"} />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <primitive object={computer.scene} position-y={-1.2} />
        </Float>
      </PresentationControls>

      <Environment preset="city" />
    </Canvas>
  );
};

export default Laptop;
