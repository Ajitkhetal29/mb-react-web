import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import i18n from "./i18/i18";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Navbar from "./components/Navbar";
import AllProjects from "./pages/AllProjects";
import About from "./pages/About";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/allProjects" element={<AllProjects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
