import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Color,
  Material,
  Mesh,
  MeshBasicMaterial,
  Raycaster,
  Vector2,
  Vector3,
} from "three";

const Spheres = () => {
  const [positionOne, setPositionOne] = useState<[number, number, number]>([
    -2, 0, 0,
  ]);
  const [positionTwo, setPositionTwo] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [positionThree, setPositionThree] = useState<[number, number, number]>([
    2, 0, 0,
  ]);

  useFrame(({ clock }) => {
    const elapsedTime: number = clock.getElapsedTime();

    setPositionOne([-2, Math.sin(elapsedTime * 0.3) * 1.5, 0]);
    setPositionTwo([0, Math.sin(elapsedTime * 0.8) * 1.5, 0]);
    setPositionThree([2, Math.sin(elapsedTime * 1.4) * 1.5, 0]);
  });

  return (
    <>
      <Sphere position={positionOne} />
      <Sphere position={positionTwo} />
      <Sphere position={positionThree} />
    </>
  );
};

type SphereProps = {
  position: [number, number, number];
};

const Sphere: React.FC<SphereProps> = ({ position }) => {
  const ref = useRef<Mesh>(null!);

  useFrame(() => {
    if (ref.current && ref.current.material instanceof MeshBasicMaterial) {
      ref.current.material.color.set("#ff0000");
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
};

const FixedRaycaster = () => {
  const raycaster: Raycaster = new Raycaster();
  const origin: Vector3 = new Vector3(-3, 0, 0);
  const direction: Vector3 = new Vector3(10, 0, 0);
  direction.normalize();

  useFrame(({ scene }) => {
    raycaster.set(origin, direction);
    const intersects = raycaster.intersectObjects(scene.children);

    for (const intersect of intersects) {
      const { object } = intersect;
      if ("material" in object && object.material instanceof Material) {
        if ("color" in object.material) {
          (object.material as Material & { color: Color }).color.set("#0000ff");
        }
      }
    }
  });

  return null;
};

const MouseRaycaster = () => {
  const { gl, camera, scene } = useThree();
  const raycaster: Raycaster = new Raycaster();
  const mouse = useRef<Vector2>(new Vector2());

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const canvas = gl.domElement;
      const rect = canvas.getBoundingClientRect();

      const x: number = event.clientX - rect.left;
      const y: number = event.clientY - rect.top;

      mouse.current.x = (x / rect.width) * 2 - 1;
      mouse.current.y = -(y / rect.height) * 2 + 1;
    },
    [gl]
  );

  useEffect(() => {
    gl.domElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gl, handleMouseMove]);

  useFrame(() => {
    raycaster.setFromCamera(mouse.current, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for (const intersect of intersects) {
      const { object } = intersect;
      if ("material" in object && object.material instanceof Material) {
        if ("color" in object.material) {
          (object.material as Material & { color: Color }).color.set("#0000ff");
        }
      }
    }
  });

  return null;
};

const App = () => {
  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <h1 className="title">Raycast</h1>
      <h2 className="subtitle">Basic Raycaster</h2>
      <Canvas style={{ height: "600px" }} camera={{ position: [0, 0, 3] }}>
        <Spheres />
        <FixedRaycaster />
        <OrbitControls enablePan={false} />
      </Canvas>

      <h2 className="subtitle">Mouse Raycaster</h2>
      <Canvas
        style={{ height: "600px" }}
        camera={{ position: [0, 0, 3] }}
        id="canvas"
      >
        <Spheres />
        <MouseRaycaster />
        <OrbitControls enablePan={false} />
      </Canvas>
    </section>
  );
};

export default App;
