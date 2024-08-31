import {
  useSphere,
  Physics,
  usePlane,
  useBox,
  useContactMaterial,
} from "@react-three/cannon";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import GUI from "lil-gui";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import useSound from "use-sound";
import hit from "/sounds/hit.mp3";

type PlaySoundFunction = () => void;
type SphereProps = {
  position: [number, number, number];
  playSound?: PlaySoundFunction;
};
type ContactMaterial = {
  friction: number;
  restitution: number;
};

const contactMaterial: ContactMaterial = {
  friction: 0.1,
  restitution: 2,
};

const Sphere: React.FC<SphereProps> = ({ position, playSound }) => {
  useContactMaterial("default", "default", contactMaterial);
  const [environmentMapTexture] = useTexture([
    "/textures/environmentMaps/0/px.png",
    "/textures/environmentMaps/0/nx.png",
    "/textures/environmentMaps/0/py.png",
    "/textures/environmentMaps/0/ny.png",
    "/textures/environmentMaps/0/pz.png",
    "/textures/environmentMaps/0/nz.png",
  ]);

  const [ref] = useSphere(
    () => ({
      args: [0.5],
      mass: 1,
      position: position,
      material: "default",
      onCollide: (e) => {
        if (playSound && e.contact.impactVelocity > 1.5) {
          playSound();
        }
      },
    }),
    useRef<Mesh>(null!)
  );

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5, 20, 20]} />
      <meshStandardMaterial
        metalness={0.3}
        roughness={0.4}
        envMap={environmentMapTexture}
        envMapIntensity={0.5}
      />
    </mesh>
  );
};

type BoxProps = {
  position: [number, number, number];
  playSound?: PlaySoundFunction;
};

const Box: React.FC<BoxProps> = ({ position, playSound }) => {
  useContactMaterial("default", "default", contactMaterial);
  const [environmentMapTexture] = useTexture([
    "/textures/environmentMaps/0/px.png",
    "/textures/environmentMaps/0/nx.png",
    "/textures/environmentMaps/0/py.png",
    "/textures/environmentMaps/0/ny.png",
    "/textures/environmentMaps/0/pz.png",
    "/textures/environmentMaps/0/nz.png",
  ]);

  const [ref] = useBox(
    () => ({
      args: [1, 1.5, 2],
      mass: 1,
      position: position,
      material: "default",
      onCollide: (e) => {
        if (playSound && e.contact.impactVelocity > 1.5) {
          playSound();
        }
      },
    }),
    useRef<Mesh>(null!)
  );

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1.5, 2]} />
      <meshStandardMaterial
        metalness={0.3}
        roughness={0.4}
        envMap={environmentMapTexture}
        envMapIntensity={0.5}
      />
    </mesh>
  );
};

const Floor = () => {
  useContactMaterial("default", "default", {
    friction: 0.1,
    restitution: 0.7,
  });
  const [environmentMapTexture] = useTexture([
    "/textures/environmentMaps/0/px.png",
    "/textures/environmentMaps/0/nx.png",
    "/textures/environmentMaps/0/py.png",
    "/textures/environmentMaps/0/ny.png",
    "/textures/environmentMaps/0/pz.png",
    "/textures/environmentMaps/0/nz.png",
  ]);

  const [ref] = usePlane(
    () => ({
      mass: 0,
      rotation: [-Math.PI * 0.5, 0, 0],
      material: "default",
    }),
    useRef<Mesh>(null!)
  );

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial
        metalness={0.3}
        roughness={0.4}
        envMap={environmentMapTexture}
        envMapIntensity={0.5}
      />
    </mesh>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight color={0xffffff} intensity={2.1} />
      <directionalLight
        color={0xffffff}
        intensity={1}
        position={[5, 5, 5]}
        castShadow
      />
    </>
  );
};

const App = () => {
  const [spheres, setSpheres] = useState<
    { position: [number, number, number] }[]
  >([]);
  const [boxes, setBoxes] = useState<{ position: [number, number, number] }[]>(
    []
  );
  const [playSound] = useSound(hit);

  useEffect(() => {
    const gui = new GUI();
    const params = { addSphere: addNewSphere, addBox: addNewBox };
    gui.add(params, "addSphere").name("Add Sphere");
    gui.add(params, "addBox").name("Add Box");
  }, []);

  const addNewSphere = () => {
    const sphere: { position: [number, number, number] } = {
      position: [(Math.random() - 0.5) * 3, 3, (Math.random() - 0.5) * 3],
    };
    setSpheres((prevSpheres) => [...prevSpheres, sphere]);
  };

  const addNewBox = () => {
    const box: { position: [number, number, number] } = {
      position: [(Math.random() - 0.5) * 3, 3, (Math.random() - 0.5) * 3],
    };
    setBoxes((prevBoxes) => [...prevBoxes, box]);
  };

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Physics</h1>

      <h2 className="subtitle">Simple Physics</h2>
      <Canvas
        style={{ height: "600px" }}
        camera={{ position: [-3, 3, 3] }}
        shadows
      >
        <Physics gravity={[0, -9.82, 0]}>
          <Sphere position={[0, 3, 0]} />
          <Floor />
        </Physics>
        <Lights />
        <OrbitControls enablePan={false} />
      </Canvas>

      <h2 className="subtitle">Adding Objects and Sounds</h2>
      <Canvas
        style={{ height: "600px" }}
        camera={{ position: [-3, 3, 3] }}
        shadows
      >
        <Physics gravity={[0, -9.82, 0]}>
          {spheres.map(({ position }, i) => (
            <Sphere key={i} position={position} playSound={playSound} />
          ))}
          {boxes.map(({ position }, i) => (
            <Box key={i} position={position} playSound={playSound} />
          ))}
          <Floor />
        </Physics>
        <Lights />
        <OrbitControls enablePan={false} />
      </Canvas>
    </section>
  );
};

export default App;
