import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Gsap from "./pages/Gsap";
import BasicScene from "./pages/BasicScene";
import TransformObjects from "./pages/TransformObjects";
import Animations from "./pages/Animations";

const App = () => {
  return (
    <main className="bg-black">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gsap" element={<Gsap />} />
          <Route path="/gsap/basic" element={<BasicScene />} />
          <Route path="/gsap/transform" element={<TransformObjects />} />
          <Route path="/gsap/animate" element={<Animations />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
