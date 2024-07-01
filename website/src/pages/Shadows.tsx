import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { CameraHelper, DirectionalLight } from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

const Sphere = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial roughness={0.7} />
    </mesh>
  );
};

const Plane = ({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) => {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial roughness={0.7} />
    </mesh>
  );
};

const DirectionalLightWithHelper = () => {
  const lightRef = useRef<DirectionalLight>(null!);
  const helperRef = useRef<CameraHelper>(null!);
  const { scene } = useThree();

  useEffect(() => {
    const gui = new GUI();

    if (lightRef.current) {
      gui.add(lightRef.current.position, "x", -5, 5, 0.001);
      gui.add(lightRef.current.position, "y", -5, 5, 0.001);
      gui.add(lightRef.current.position, "z", -5, 5, 0.001);

      const helper = new CameraHelper(lightRef.current.shadow.camera);
      helperRef.current = helper;
      scene.add(helper);
    }

    return () => {
      gui.destroy();

      if (helperRef.current) {
        scene.remove(helperRef.current);
      }
    };
  });

  return (
    <directionalLight
      ref={lightRef}
      color={0xffffff}
      intensity={1.5}
      position={[2, 2, -1]}
      castShadow
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      shadow-camera-near={1}
      shadow-camera-far={6}
      shadow-camera-top={2}
      shadow-camera-bottom={-2}
      shadow-camera-right={2}
      shadow-camera-left={-2}
    />
  );
};

const Shadows = () => {
  const spherePosition: [number, number, number] = [0, 0, 0];
  const planePosition: [number, number, number] = [0, -0.65, 0];
  const planeRotation: [number, number, number] = [-Math.PI * 0.5, 0, 0];

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Shadows</h1>

      <h2 className="subtitle">Directional Light</h2>
      <Canvas style={{ height: "400px" }} shadows>
        <OrbitControls enablePan={false} enableRotate={true} />
        <Sphere position={spherePosition} />
        <Plane position={planePosition} rotation={planeRotation} />
        <ambientLight color={0xffffff} intensity={1} />
        <DirectionalLightWithHelper />
      </Canvas>
    </section>
  );
};

export default Shadows;
