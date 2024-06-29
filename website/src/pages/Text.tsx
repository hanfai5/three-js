import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, TextureLoader } from "three";

const matcapImagePath: string = "/public/textures/matcaps/5.png";
const helvetikerRegularFontPath: string =
  "/public/fonts/helvetiker_regular.typeface.json";

type DonutProps = {
  position: [number, number, number];
  rotation: [number, number, number];
};

const Donut = ({ position, rotation }: DonutProps) => {
  const ref = useRef<Mesh>(null!);
  const [matcapTexture] = useLoader(TextureLoader, [matcapImagePath]);

  useFrame(({ clock }) => {
    ref.current.rotation.x = 0.5 * clock.getElapsedTime();
    ref.current.rotation.y = 0.5 * clock.getElapsedTime();
    ref.current.rotation.z = 0.5 * clock.getElapsedTime();
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[0.3, 0.2, 16, 32]} />
      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
};

const Message = () => {
  const [matcapTexture] = useLoader(TextureLoader, [matcapImagePath]);

  return (
    <mesh>
      <Center>
        <Text3D font={helvetikerRegularFontPath}>
          Hello World!
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
    </mesh>
  );
};

const Text = () => {
  const donuts = Array.from({ length: 100 }, (_, i) => (
    <Donut
      key={i}
      position={[
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ]}
      rotation={[
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ]}
    />
  ));

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <Canvas style={{ height: "400px" }} camera={{ position: [0, 0, 2] }}>
        <OrbitControls />
        <Message />
        {donuts}
      </Canvas>
    </section>
  );
};

export default Text;
