import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Box = () => {
  const myMesh = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    myMesh.current.rotation.x = clock.getElapsedTime();
    myMesh.current.rotation.y = clock.getElapsedTime();
  });

  return (
    <mesh ref={myMesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

const Animations = () => {
  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-y-4">
      <Canvas camera={{ position: [0, 0, 2] }} style={{ height: "400px" }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} intensity={1.5} />
        <Box />
      </Canvas>

      <h1 className="title">Animations</h1>
      <h3>We can animate objects by using Three.js Clock</h3>

      <h2 className="subtitle">Using Clock</h2>
      <h3>
        Here, we are using useFrame, a Fiber hook that lets us execute code on
        every frame of Fiber's render loop
      </h3>
      <h3>
        By using the UseFrame, we will use the Three.js clock to know how much
        time has been elapsed in our applicaiton on every time frame
      </h3>
      <h3>We can then use that time to animate a value</h3>
    </section>
  );
};

export default Animations;
