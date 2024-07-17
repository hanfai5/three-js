import {
  ContactShadows,
  Environment,
  Float,
  Html,
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
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"ff6900"}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />

          <primitive
            object={computer.scene}
            position-y={-1.2}
            rotation-x={0.13}
          >
            <Html
              transform
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe
                className="w-[1024px] h-[670px] rounded-[20px] bg-black"
                style={{ border: "none" }}
                src="https://bruno-simon.com/html/"
              />
            </Html>
          </primitive>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />

      <Environment preset="city" />
    </Canvas>
  );
};

export default Laptop;
