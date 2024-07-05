import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { RepeatWrapping, SRGBColorSpace, Texture, TextureLoader } from "three";

const floorAlphaImagePath: string = "/textures/floor/alpha.jpg";
const floorColorImagePath: string =
  "/textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg";
const floorARMImagePath: string =
  "/textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg";
const floorNormalImagePath: string =
  "/textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg";
const floorDisplacementImagePath: string =
  "/textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg";

const Floor = () => {
  const [
    floorAlphaTexture,
    floorColorTexture,
    floorARMTexture,
    floorNormalTexture,
    floorDisplacementTexture,
  ] = useLoader(TextureLoader, [
    floorAlphaImagePath,
    floorColorImagePath,
    floorARMImagePath,
    floorNormalImagePath,
    floorDisplacementImagePath,
  ]);

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

const wallColorImagePath =
  "/textures/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg";
const wallARMImagePath =
  "/textures/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg";
const wallNormalImagePath =
  "/textures/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg";

const Walls = () => {
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

const roofColorImagePath: string =
  "/textures/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg";
const roofARMImagePath: string =
  "/textures/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg";
const roofNormalImagePath: string =
  "/textures/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg";

const Roof = () => {
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
  return (
    <mesh position={[0, 1, 2 + 0.001]}>
      <planeGeometry args={[2.2, 2]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
};

const House = () => {
  return (
    <group>
      <Walls />
      <Roof />
      <Door />
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
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[0.6, 0.8, 0.2]} />
      <meshStandardMaterial color={"green"} />
    </mesh>
  );
};

const bushColorImagePath: string =
  "/textures/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg";
const bushARMImagePath: string =
  "/textures/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg";
const bushNormalImagePath: string =
  "/textures/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg";

const Bush = ({
  position,
  rotation,
  scale,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}) => {
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

      <ambientLight color={0xffffff} intensity={1.5} />
      <directionalLight
        color={0xffffff}
        intensity={1.5}
        position={[3, 2, -8]}
      />
      <OrbitControls enablePan={false} enableRotate={true} />
    </Canvas>
  );
};

export default HauntedHouse;
