import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Gsap from "./pages/Gsap";
import BasicScene from "./pages/BasicScene";
import TransformObjects from "./pages/TransformObjects";
import Animations from "./pages/Animations";
import Camera from "./pages/Camera";
import Geometries from "./pages/Geometries";
import DebugUI from "./pages/DebugUI";
import Textures from "./pages/Textures";
import Materials from "./pages/Materials";
import Text from "./pages/Text";
import Lights from "./pages/Lights";
import Shadows from "./pages/Shadows";
import HauntedHouse from "./pages/HauntedHouse";
import Particles from "./pages/Particles";
import Galaxy from "./pages/Galaxy";
import Scroll from "./pages/Scroll";

const App = () => {
  return (
    <main className="bg-black">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/haunted-house" element={<HauntedHouse />} />
          <Route path="/galaxy" element={<Galaxy />} />
          <Route path="/scroll" element={<Scroll />} />
          <Route path="/gsap" element={<Gsap />} />
          <Route path="/gsap/basic" element={<BasicScene />} />
          <Route path="/gsap/transform" element={<TransformObjects />} />
          <Route path="/gsap/animate" element={<Animations />} />
          <Route path="/gsap/camera" element={<Camera />} />
          <Route path="/gsap/geometries" element={<Geometries />} />
          <Route path="/gsap/debug-ui" element={<DebugUI />} />
          <Route path="/gsap/textures" element={<Textures />} />
          <Route path="/gsap/materials" element={<Materials />} />
          <Route path="/gsap/text" element={<Text />} />
          <Route path="/gsap/lights" element={<Lights />} />
          <Route path="/gsap/shadows" element={<Shadows />} />
          <Route path="/gsap/particles" element={<Particles />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
