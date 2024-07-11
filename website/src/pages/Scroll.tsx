import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import {
  Group,
  Mesh,
  NearestFilter,
  Texture,
  TextureLoader,
  Vector3,
} from "three";

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

const Meshes = (): JSX.Element => {
  const gradientImagePath: string = "/textures/gradients/3.jpg";
  const [gradientTexture] = useLoader(TextureLoader, [gradientImagePath]);
  gradientTexture.magFilter = NearestFilter;

  return (
    <>
      <Mesh1
        gradientTexture={gradientTexture}
        position={[2, -objectsDistance * 0, 0]}
      />
      <Mesh2
        gradientTexture={gradientTexture}
        position={[-2, -objectsDistance * 1, 0]}
      />
      <Mesh3
        gradientTexture={gradientTexture}
        position={[2, -objectsDistance * 2, 0]}
      />
    </>
  );
};

const CameraController = () => {
  const { camera } = useThree();
  const groupRef = useRef<Group>(null);

  const targetPosition = useRef(new Vector3(0, 0, 3));
  const mousePosition = useRef(new Vector3(0, 0, 0));

  const handleScroll = useCallback((): void => {
    targetPosition.current.y =
      (-window.scrollY / (window.innerHeight - 96)) * objectsDistance; // Adjust multiplier as needed
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent): void => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    const parallaxX: number = clientX / innerWidth - 0.5;
    const parallaxY = Math.max(0, clientY - 96) / (innerHeight - 96) - 0.5;

    mousePosition.current.set(parallaxX, -parallaxY, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y +=
      (targetPosition.current.y - groupRef.current.position.y) * 0.1;
    camera.position.x += (mousePosition.current.x - camera.position.x) * 0.1;
    camera.position.y += (mousePosition.current.y - camera.position.y) * 0.1;

    camera.updateProjectionMatrix();
  });

  return (
    <group ref={groupRef}>
      <primitive object={camera} />
    </group>
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
