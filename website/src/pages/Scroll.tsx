import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, NearestFilter, Texture, TextureLoader } from "three";

const parameters = {
  materialColor: "#ffeded",
};

type MeshProps = {
  gradientTexture?: Texture;
  position?: [number, number, number];
};

const Mesh1: React.FC<MeshProps> = ({
  gradientTexture,
  position = [0, 0, 0],
}) => {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.rotation.x = clock.getElapsedTime() * 0.1;
    ref.current.rotation.y = clock.getElapsedTime() * 0.12;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1, 0.4, 16, 60]} />
      <meshToonMaterial
        color={parameters.materialColor}
        gradientMap={gradientTexture}
      />
    </mesh>
  );
};

const Mesh2: React.FC<MeshProps> = ({
  gradientTexture,
  position = [0, 0, 0],
}) => {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.rotation.x = clock.getElapsedTime() * 0.1;
    ref.current.rotation.y = clock.getElapsedTime() * 0.12;
  });

  return (
    <mesh ref={ref} position={position}>
      <coneGeometry args={[1, 2, 32]} />
      <meshToonMaterial
        color={parameters.materialColor}
        gradientMap={gradientTexture}
      />
    </mesh>
  );
};

const Mesh3: React.FC<MeshProps> = ({
  gradientTexture,
  position = [0, 0, 0],
}) => {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.rotation.x = clock.getElapsedTime() * 0.1;
    ref.current.rotation.y = clock.getElapsedTime() * 0.12;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
      <meshToonMaterial
        color={parameters.materialColor}
        gradientMap={gradientTexture}
      />
    </mesh>
  );
};

const Meshes = () => {
  const gradientImagePath: string = "/textures/gradients/3.jpg";
  const [gradientTexture] = useLoader(TextureLoader, [gradientImagePath]);
  gradientTexture.magFilter = NearestFilter;

  const objectsDistance: number = 4;

  return (
    <>
      <Mesh1
        gradientTexture={gradientTexture}
        position={[0, -objectsDistance * 0, 0]}
      />
      <Mesh2
        gradientTexture={gradientTexture}
        position={[0, -objectsDistance * 1, 0]}
      />
      <Mesh3
        gradientTexture={gradientTexture}
        position={[0, -objectsDistance * 2, 0]}
      />
    </>
  );
};

const Scroll = () => {
  return (
    <div style={{ background: "#1e1a20" }}>
      <Canvas
        style={{
          height: "calc(100vh - 96px)",
          position: "fixed",
          left: "0",
          top: "96px",
        }}
        camera={{ position: [0, 0, 3] }}
      >
        <Meshes />
        <directionalLight
          color={"#ffffff"}
          intensity={3}
          position={[1, 1, 0]}
        />
      </Canvas>
      <section className="flex items-center h-[calc(100vh-96px)] relative text-[#ffeded] text-[7vmin] uppercase px-[10%]">
        <h1>My Portfolio</h1>
      </section>
      <section className="flex items-center justify-end h-[calc(100vh-96px)] relative text-[#ffeded] text-[7vmin] uppercase px-[10%]">
        <h1>My Projects</h1>
      </section>
      <section className="flex items-center h-[calc(100vh-96px)] relative text-[#ffeded] text-[7vmin] uppercase px-[10%]">
        <h1>Contact Me</h1>
      </section>
    </div>
  );
};

export default Scroll;
