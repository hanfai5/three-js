import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  PointLight,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from "three";
import { GUI } from "lil-gui";
import { useCallback, useEffect, useRef, useState } from "react";

const Floor = () => {
  const floorAlphaImagePath: string = "/textures/floor/alpha.jpg";
  const floorColorImagePath: string =
    "/textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg";
  const floorARMImagePath: string =
    "/textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg";
  const floorNormalImagePath: string =
    "/textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg";
  const floorDisplacementImagePath: string =
    "/textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg";

  const [
    floorAlphaTexture,
    floorColorTexture,
    floorARMTexture,
    floorNormalTexture,
    floorDisplacementTexture,
  ]: Texture[] = useLoader(TextureLoader, [
    floorAlphaImagePath,
    floorColorImagePath,
    floorARMImagePath,
    floorNormalImagePath,
    floorDisplacementImagePath,
  ]) as Texture[];

  floorColorTexture.colorSpace = SRGBColorSpace;

  floorColorTexture.repeat.set(4, 4);
  floorARMTexture.repeat.set(4, 4);
  floorDisplacementTexture.repeat.set(4, 4);
  floorNormalTexture.repeat.set(4, 4);

  floorColorTexture.wrapS = RepeatWrapping;
  floorARMTexture.wrapS = RepeatWrapping;
  floorDisplacementTexture.wrapS = RepeatWrapping;
  floorNormalTexture.wrapS = RepeatWrapping;

  floorColorTexture.wrapT = RepeatWrapping;
  floorARMTexture.wrapT = RepeatWrapping;
  floorDisplacementTexture.wrapT = RepeatWrapping;
  floorNormalTexture.wrapT = RepeatWrapping;

  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[20, 20, 100, 100]} />
      <meshStandardMaterial
        alphaMap={floorAlphaTexture}
        transparent
        map={floorColorTexture}
        aoMap={floorARMTexture}
        roughnessMap={floorARMTexture}
        metalnessMap={floorARMTexture}
        normalMap={floorNormalTexture}
        displacementMap={floorDisplacementTexture}
        displacementScale={0.5}
        displacementBias={-0.2}
      />
    </mesh>
  );
};

const Walls = () => {
  const wallColorImagePath =
    "/textures/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg";
  const wallARMImagePath =
    "/textures/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg";
  const wallNormalImagePath =
    "/textures/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg";

  const [wallColorTexture, wallARMTexture, wallNormalTexture] = useLoader(
    TextureLoader,
    [wallColorImagePath, wallARMImagePath, wallNormalImagePath]
  );

  return (
    <mesh position={[0, 1.25, 0]}>
      <boxGeometry args={[4, 2.5, 4]} />
      <meshStandardMaterial
        map={wallColorTexture}
        aoMap={wallARMTexture}
        roughnessMap={wallARMTexture}
        metalnessMap={wallARMTexture}
        normalMap={wallNormalTexture}
      />
    </mesh>
  );
};

const Roof = () => {
  const roofColorImagePath: string =
    "/textures/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg";
  const roofARMImagePath: string =
    "/textures/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg";
  const roofNormalImagePath: string =
    "/textures/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg";

  const [roofColorTexture, roofARMTexture, roofNormalTexture]: Texture[] =
    useLoader(TextureLoader, [
      roofColorImagePath,
      roofARMImagePath,
      roofNormalImagePath,
    ]) as Texture[];

  roofColorTexture.colorSpace = SRGBColorSpace;

  roofColorTexture.repeat.set(3, 1);
  roofARMTexture.repeat.set(3, 1);
  roofNormalTexture.repeat.set(3, 1);

  roofColorTexture.wrapS = RepeatWrapping;
  roofARMTexture.wrapS = RepeatWrapping;
  roofNormalTexture.wrapS = RepeatWrapping;

  return (
    <mesh position={[0, 2.5 + 0.75, 0]} rotation={[0, -Math.PI * 0.25, 0]}>
      <coneGeometry args={[3.5, 1.5, 4]} />
      <meshStandardMaterial
        map={roofColorTexture}
        aoMap={roofARMTexture}
        roughnessMap={roofARMTexture}
        metalnessMap={roofARMTexture}
        normalMap={roofNormalTexture}
      />
    </mesh>
  );
};

const Door = () => {
  const doorColorImagePath: string = "/textures/door/color.jpg";
  const doorAlphaImagePath: string = "/textures/door/alpha.jpg";
  const doorAmbientOcclusionImagePath: string =
    "/textures/door/ambientOcclusion.jpg";
  const doorHeightImagePath: string = "/textures/door/height.jpg";
  const doorNormalImagePath: string = "/textures/door/normal.jpg";
  const doorMetalnessImagePath: string = "/textures/door/metalness.jpg";
  const doorRoughnessImagePath: string = "/textures/door/metalness.jpg";

  const [
    doorColorTexture,
    doorAlphaTexture,
    doorAmbientOcclusionTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
  ] = useLoader(TextureLoader, [
    doorColorImagePath,
    doorAlphaImagePath,
    doorAmbientOcclusionImagePath,
    doorHeightImagePath,
    doorNormalImagePath,
    doorMetalnessImagePath,
    doorRoughnessImagePath,
  ]) as Texture[];

  return (
    <mesh position={[0, 1, 2 + 0.001]}>
      <planeGeometry args={[2.2, 2, 100, 100]} />
      <meshStandardMaterial
        map={doorColorTexture}
        alphaMap={doorAlphaTexture}
        aoMap={doorAmbientOcclusionTexture}
        displacementMap={doorHeightTexture}
        normalMap={doorNormalTexture}
        metalnessMap={doorMetalnessTexture}
        roughnessMap={doorRoughnessTexture}
        displacementScale={0.15}
        displacementBias={-0.04}
      />
    </mesh>
  );
};

const DoorLight = () => {
  return (
    <pointLight color={"#ff7d46"} intensity={5} position={[0, 2.2, 2.5]} />
  );
};

const House = () => {
  return (
    <group>
      <Walls />
      <Roof />
      <Door />
      <DoorLight />
    </group>
  );
};

const Grave = ({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) => {
  const graveColorImagePath: string =
    "/textures/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg";
  const graveARMImagePath: string =
    "/textures/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg";
  const graveNormalImagePath: string =
    "/textures/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg";

  const [greveColorTexture, graveARMTexture, graveNormalTexture] = useLoader(
    TextureLoader,
    [graveColorImagePath, graveARMImagePath, graveNormalImagePath]
  ) as Texture[];

  greveColorTexture.colorSpace = SRGBColorSpace;

  greveColorTexture.repeat.set(0.3, 0.4);
  graveARMTexture.repeat.set(0.3, 0.4);
  graveNormalTexture.repeat.set(0.3, 0.4);

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[0.6, 0.8, 0.2]} />
      <meshStandardMaterial
        map={greveColorTexture}
        aoMap={graveARMTexture}
        roughnessMap={graveARMTexture}
        metalnessMap={graveARMTexture}
        normalMap={graveNormalTexture}
      />
    </mesh>
  );
};

const Bush = ({
  position,
  rotation,
  scale,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}) => {
  const bushColorImagePath: string =
    "/textures/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg";
  const bushARMImagePath: string =
    "/textures/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg";
  const bushNormalImagePath: string =
    "/textures/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg";

  const [bushColorTexture, bushARMTexture, bushNormalTexture]: Texture[] =
    useLoader(TextureLoader, [
      bushColorImagePath,
      bushARMImagePath,
      bushNormalImagePath,
    ]) as Texture[];

  bushColorTexture.colorSpace = SRGBColorSpace;

  bushColorTexture.repeat.set(2, 1);
  bushARMTexture.repeat.set(2, 1);
  bushNormalTexture.repeat.set(2, 1);

  bushColorTexture.wrapS = RepeatWrapping;
  bushARMTexture.wrapS = RepeatWrapping;
  bushNormalTexture.wrapS = RepeatWrapping;

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        map={bushColorTexture}
        aoMap={bushARMTexture}
        roughnessMap={bushARMTexture}
        metalnessMap={bushARMTexture}
        normalMap={bushNormalTexture}
      />
    </mesh>
  );
};

const Ghosts = () => {
  const ghost1Ref = useRef<PointLight>(null);
  const [ghost1Angle, setGhost1Angle] = useState<number>(0);
  const ghost1Position: [number, number, number] = [0, 0, 0];

  const ghost2Ref = useRef<PointLight>(null);
  const [ghost2Angle, setGhost2Angle] = useState<number>(0);
  const ghost2Position: [number, number, number] = [0, 0, 0];

  const ghost3Ref = useRef<PointLight>(null);
  const [ghost3Angle, setGhost3Angle] = useState<number>(0);
  const ghost3Position: [number, number, number] = [0, 0, 0];

  useFrame(({ clock }) => {
    if (!ghost1Ref.current || !ghost2Ref.current || !ghost3Ref.current) return;

    setGhost1Angle(clock.getElapsedTime() * 0.5);
    ghost1Ref.current.position.x = Math.sin(ghost1Angle) * 4;
    ghost1Ref.current.position.z = Math.cos(ghost1Angle) * 4;
    ghost1Ref.current.position.y =
      Math.sin(ghost1Angle) *
      Math.sin(ghost1Angle * 2.34) *
      Math.sin(ghost1Angle * 3.45);

    setGhost2Angle(-clock.getElapsedTime() * 0.5);
    ghost2Ref.current.position.x = Math.sin(ghost2Angle) * 4;
    ghost2Ref.current.position.z = Math.cos(ghost2Angle) * 4;
    ghost2Ref.current.position.y =
      Math.sin(ghost2Angle) *
      Math.sin(ghost2Angle * 2.34) *
      Math.sin(ghost2Angle * 3.45);

    setGhost3Angle(-clock.getElapsedTime() * 0.23);
    ghost3Ref.current.position.x = Math.sin(ghost3Angle) * 6;
    ghost3Ref.current.position.z = Math.cos(ghost3Angle) * 6;
    ghost3Ref.current.position.y =
      Math.sin(ghost3Angle) *
      Math.sin(ghost3Angle * 2.34) *
      Math.sin(ghost3Angle * 3.45);
  });

  return (
    <>
      <pointLight
        ref={ghost1Ref}
        color={"#8800ff"}
        intensity={6}
        position={ghost1Position}
      />
      <pointLight
        ref={ghost2Ref}
        color={"#ff0088"}
        intensity={6}
        position={ghost2Position}
      />
      <pointLight
        ref={ghost3Ref}
        color={"#ff0000"}
        intensity={6}
        position={ghost3Position}
      />
    </>
  );
};

const SkyComponent = () => {
  const skyRef = useRef(null);

  const [sunPosition, setSunPosition] = useState<[number, number, number]>([
    100, 0, 100,
  ]);

  const [mieCoefficient, setMieCoefficient] = useState<number>(0.105);
  const [rayleigh, setRayleigh] = useState<number>(2);
  const [turbidity, setTurbidity] = useState<number>(100);

  const updateSunPosition = useCallback((axis: 0 | 1 | 2, value: number) => {
    setSunPosition((prev) => {
      const newPosition = [...prev] as [number, number, number];
      newPosition[axis] = value;
      return newPosition;
    });
  }, []);

  useEffect(() => {
    if (!skyRef.current) return;

    const gui = new GUI();

    const skyControls = {
      sunPositionX: sunPosition[0],
      sunPositionY: sunPosition[1],
      sunPositionZ: sunPosition[2],
      mieCoefficient: mieCoefficient,
      rayleigh: rayleigh,
      turbidity: turbidity,
    };

    gui
      .add(skyControls, "sunPositionX", -5, 5, 0.01)
      .onFinishChange((value: number) => updateSunPosition(0, value));
    gui
      .add(skyControls, "sunPositionY", -5, 5, 0.01)
      .onFinishChange((value: number) => updateSunPosition(1, value));
    gui
      .add(skyControls, "mieCoefficient", -1, 1, 0.01)
      .onFinishChange((value: number) => setMieCoefficient(value));
    gui
      .add(skyControls, "rayleigh", -1, 1, 0.01)
      .onFinishChange((value: number) => setRayleigh(value));
    gui
      .add(skyControls, "turbidity", -100, 100, 0.1)
      .onFinishChange((value: number) => setTurbidity(value));

    return () => {
      gui.destroy();
    };
  });

  return (
    <Sky
      ref={skyRef}
      sunPosition={sunPosition}
      mieCoefficient={mieCoefficient}
      rayleigh={rayleigh}
      turbidity={turbidity}
    />
  );
};

const HauntedHouse = () => {
  return (
    <Canvas style={{ height: "calc(100vh - 96px" }}>
      <Floor />
      <House />
      <Bush
        position={[0.8, 0.2, 2.2]}
        rotation={[-0.75, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
      />
      <Bush
        position={[1.4, 0.1, 2.1]}
        rotation={[-0.75, 0, 0]}
        scale={[0.25, 0.25, 0.25]}
      />
      <Bush
        position={[-0.8, 0.1, 2.2]}
        rotation={[-0.75, 0, 0]}
        scale={[0.4, 0.4, 0.4]}
      />
      <Bush
        position={[-1, 0.05, 2.6]}
        rotation={[-0.75, 0, 0]}
        scale={[0.15, 0.15, 0.15]}
      />
      {Array.from({ length: 30 }).map((_, i) => {
        const angle: number = Math.PI * 2 * Math.random();
        const radius: number = 3 + Math.random() * 4;

        return (
          <Grave
            key={i}
            position={[
              radius * Math.sin(angle),
              Math.random() * 0.4,
              radius * Math.cos(angle),
            ]}
            rotation={[
              (Math.random() - 0.5) * 0.4,
              (Math.random() - 0.5) * 0.4,
              (Math.random() - 0.5) * 0.4,
            ]}
          />
        );
      })}

      <ambientLight color={"#86cdff"} intensity={1.8} />
      <directionalLight
        color={"#86cdff"}
        intensity={1.5}
        position={[3, 2, -8]}
      />
      <OrbitControls enablePan={false} enableRotate={true} />
      <SkyComponent />
      <Ghosts />
      <fogExp2 attach="fog" args={["#04343f", 0.1]} />
    </Canvas>
  );
};

export default HauntedHouse;
