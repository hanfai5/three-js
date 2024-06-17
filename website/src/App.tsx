import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Gsap from "./pages/Gsap";

const App = () => {
  return (
    <main className="bg-black">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gsap" element={<Gsap />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
