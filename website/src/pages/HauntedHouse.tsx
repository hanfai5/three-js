import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const floorAlphaImagePath: string = "/public/textures/floor/alpha.jpg";

const Floor = () => {
  const [alphaTexture] = useLoader(TextureLoader, [floorAlphaImagePath]);

  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial alphaMap={alphaTexture} transparent />
    </mesh>
  );
};

const Walls = () => {
  return (
    <mesh position={[0, 1.25, 0]}>
      <boxGeometry args={[4, 2.5, 4]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

const Roof = () => {
  return (
    <mesh position={[0, 2.5 + 0.75, 0]} rotation={[0, -Math.PI * 0.25, 0]}>
      <coneGeometry args={[3.5, 1.5, 4]} />
      <meshStandardMaterial />
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

const Bush = ({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: [number, number, number];
}) => {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={"aqua"} />
    </mesh>
  );
};

const HauntedHouse = () => {
  return (
    <Canvas style={{ height: "calc(100vh - 96px" }}>
      <Floor />
      <House />
      <Bush position={[0.8, 0.2, 2.2]} scale={[0.5, 0.5, 0.5]} />
      <Bush position={[1.4, 0.1, 2.1]} scale={[0.25, 0.25, 0.25]} />
      <Bush position={[-0.8, 0.1, 2.2]} scale={[0.4, 0.4, 0.4]} />
      <Bush position={[-1, 0.05, 2.6]} scale={[0.15, 0.15, 0.15]} />
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

      <ambientLight color={0xffffff} intensity={1} />
      <OrbitControls enablePan={false} enableRotate={true} />
    </Canvas>
  );
};

export default HauntedHouse;
