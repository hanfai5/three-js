import { Canvas } from "@react-three/fiber";

const Box = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
};
const Scroll = () => {
  return (
    <>
      <Canvas
        style={{
          height: "calc(100vh - 96px)",
          position: "fixed",
          left: "0",
          top: "96px",
        }}
        camera={{ position: [0, 0, 3] }}
      >
        <Box />
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
    </>
  );
};

export default Scroll;
