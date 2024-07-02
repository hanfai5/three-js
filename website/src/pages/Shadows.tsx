import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  CameraHelper,
  DirectionalLight,
  Mesh,
  PointLight,
  SpotLight,
  TextureLoader,
} from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

const bakedShadowImagePath: string = "/public/textures/shadows/bakedShadow.jpg";
const simpleShadowImagePath: string =
  "/public/textures/shadows/simpleShadow.jpg";

const SimpleShadow = ({
  position,
  rotation,
  opacity,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  opacity: number;
}) => {
  const [simpleShadowTexture] = useLoader(TextureLoader, [
    simpleShadowImagePath,
  ]);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial
        color={0x000000}
        transparent
        alphaMap={simpleShadowTexture}
        opacity={opacity}
      />
    </mesh>
  );
};

const Sphere = ({
  position,
  animate,
  setShadowPosition,
  setShadowOpacity,
}: {
  position: [number, number, number];
  animate?: boolean;
  setShadowPosition: Dispatch<SetStateAction<[number, number, number]>>;
  setShadowOpacity: Dispatch<SetStateAction<number>>;
}) => {
  const ref = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    if (!animate) return;
    ref.current.position.x = Math.cos(clock.getElapsedTime()) * 1.5;
    ref.current.position.y = Math.abs(Math.sin(clock.getElapsedTime() * 3));
    ref.current.position.z = Math.sin(clock.getElapsedTime()) * 1.5;

    setShadowPosition([
      ref.current.position.x,
      -0.5 + 0.01,
      ref.current.position.z,
    ]);

    setShadowOpacity((1 - ref.current.position.y) * 0.5);
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial roughness={0.7} />
    </mesh>
  );
};

const Plane = ({
  position,
  rotation,
  bakedShadow,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  bakedShadow?: boolean;
}) => {
  const ref = useRef<Mesh>(null!);
  const [bakedShadowTexture] = useLoader(TextureLoader, [bakedShadowImagePath]);

  return (
    <mesh ref={ref} position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[5, 5]} />
      {!bakedShadow && <meshStandardMaterial roughness={0.7} />}
      {bakedShadow && <meshBasicMaterial map={bakedShadowTexture} />}
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

const SpotLightWithHelper = () => {
  const lightRef = useRef<SpotLight>(null!);
  const helperRef = useRef<CameraHelper>(null!);
  const { scene } = useThree();

  useEffect(() => {
    const helper = new CameraHelper(lightRef.current.shadow.camera);
    helperRef.current = helper;
    scene.add(helper);

    return () => {
      if (helperRef.current) {
        scene.remove(helperRef.current);
      }
    };
  });

  return (
    <spotLight
      ref={lightRef}
      color={0xffffff}
      intensity={3.6}
      distance={10}
      angle={Math.PI * 0.3}
      position={[0, 2, 2]}
      castShadow={true}
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      shadow-camera-near={1}
      shadow-camera-far={6}
    />
  );
};

const PointLightWithHelper = () => {
  const lightRef = useRef<PointLight>(null!);
  const helperRef = useRef<CameraHelper>(null!);
  const { scene } = useThree();

  useEffect(() => {
    const helper = new CameraHelper(lightRef.current.shadow.camera);
    helperRef.current = helper;
    scene.add(helper);

    return () => {
      if (helperRef.current) {
        scene.remove(helperRef.current);
      }
    };
  });

  return (
    <pointLight
      ref={lightRef}
      color={0xffffff}
      intensity={2.7}
      position={[0, 2, 2]}
      castShadow={true}
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      shadow-camera-near={1}
      shadow-camera-far={6}
    />
  );
};

const Shadows = () => {
  const spherePosition: [number, number, number] = [0, 0, 0];
  const planePosition: [number, number, number] = [0, -0.5, 0];
  const planeRotation: [number, number, number] = [-Math.PI * 0.5, 0, 0];
  const shadowRotation: [number, number, number] = [-Math.PI * 0.5, 0, 0];
  const [shadowPosition, setShadowPosition] = useState<
    [number, number, number]
  >([planePosition[0], planePosition[1] + 0.01, planePosition[2]]);
  const [shadowOpacity, setShadowOpacity] = useState<number>(
    1 - spherePosition[1]
  );

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Shadows</h1>

      <h2 className="subtitle">Directional Light</h2>
      <Canvas style={{ height: "400px" }} shadows>
        <OrbitControls enablePan={false} enableRotate={true} />
        <Sphere
          position={spherePosition}
          animate={false}
          setShadowPosition={setShadowPosition}
          setShadowOpacity={setShadowOpacity}
        />
        <Plane position={planePosition} rotation={planeRotation} />
        <ambientLight color={0xffffff} intensity={1} />
        <DirectionalLightWithHelper />
      </Canvas>

      <h2 className="subtitle">Spot Light</h2>
      <Canvas style={{ height: "400px" }} shadows>
        <OrbitControls enablePan={false} enableRotate={true} />
        <Sphere
          position={spherePosition}
          setShadowPosition={setShadowPosition}
          setShadowOpacity={setShadowOpacity}
        />
        <Plane position={planePosition} rotation={planeRotation} />
        <ambientLight color={0xffffff} intensity={1} />
        <SpotLightWithHelper />
      </Canvas>

      <h2 className="subtitle">Point Light</h2>
      <Canvas style={{ height: "400px" }} shadows>
        <OrbitControls enablePan={false} enableRotate={true} />
        <Sphere
          position={spherePosition}
          setShadowPosition={setShadowPosition}
          setShadowOpacity={setShadowOpacity}
        />
        <Plane position={planePosition} rotation={planeRotation} />
        <ambientLight color={0xffffff} intensity={1} />
        <PointLightWithHelper />
      </Canvas>

      <h2 className="subtitle">Baked Shadow</h2>
      <Canvas style={{ height: "400px" }} shadows>
        <OrbitControls enablePan={false} enableRotate={true} />
        <Sphere
          position={spherePosition}
          setShadowPosition={setShadowPosition}
          setShadowOpacity={setShadowOpacity}
        />
        <Plane
          position={planePosition}
          rotation={planeRotation}
          bakedShadow={true}
        />
        <ambientLight color={0xffffff} intensity={1} />
      </Canvas>

      <h2 className="subtitle">Simple Shadow</h2>
      <Canvas style={{ height: "400px" }} shadows>
        <OrbitControls enablePan={false} enableRotate={true} />
        <Sphere
          position={spherePosition}
          animate={true}
          setShadowPosition={setShadowPosition}
          setShadowOpacity={setShadowOpacity}
        />
        <Plane position={planePosition} rotation={planeRotation} />
        <SimpleShadow
          position={shadowPosition}
          rotation={shadowRotation}
          opacity={shadowOpacity}
        />
        <ambientLight color={0xffffff} intensity={1.5} />
      </Canvas>
    </section>
  );
};

export default Shadows;
