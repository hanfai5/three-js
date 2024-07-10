import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { Mesh, NearestFilter, Texture, TextureLoader, Vector3 } from "three";

const parameters = {
  materialColor: "#ffeded",
};

type MeshProps = {
  gradientTexture?: Texture;
  position?: [number, number, number];
};

const objectsDistance: number = 4;

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

const CameraController = () => {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3(0, 0, 3));

  const handleScroll = useCallback(() => {
    targetPosition.current.y =
      (-window.scrollY / (window.innerHeight - 96)) * objectsDistance; // Adjust multiplier as needed
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useFrame(() => {
    camera.position.y += (targetPosition.current.y - camera.position.y) * 0.1;
    camera.updateProjectionMatrix();
  });

  return null;
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
        camera={{ position: [0, 0, 3], rotation: [0, 0, 0] }}
      >
        <CameraController />
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
