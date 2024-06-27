import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Box = () => {
  const props = useTexture({
    map: "/public/PavingStones092_1K-JPG_Color.jpg",
    normalMap: "/public/PavingStones092_1K-JPG_NormalDX.jpg",
    roughnessMap: "/public/PavingStones092_1K-JPG_Roughness.jpg",
    aoMap: "/public/PavingStones092_1K-JPG_AmbientOcclusion.jpg",
  });

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial {...props} />
    </mesh>
  );
};

const Textures = () => {
  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <Canvas style={{ height: "400px" }} camera={{ position: [0, 0, 2] }}>
        <Box />
        <OrbitControls enablePan={false} />
        <ambientLight />
      </Canvas>

      <h1 className="title">Textures</h1>
    </section>
  );
};

export default Textures;
