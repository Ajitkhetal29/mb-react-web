import { useContext, useEffect, useState } from "react";
import "./App.css";
import i18n from "./i18/i18";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Navbar from "./components/Navbar";
import AllProjects from "./pages/AllProjects";
import About from "./pages/About";
import AllBolgs from "./pages/AllBolgs";
import ScrollToTop from "./pages/ScrollToTop";
import { ToastContainer } from "react-toastify";
import { AppConetxt } from "./context/context";

function App() {
  const { loading: apiLoading } = useContext(AppConetxt);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const handleAssetsLoaded = () => {
      console.log("✅ All images/videos loaded");
      setAssetsLoaded(true);
    };

    if (document.readyState === "complete") {
      handleAssetsLoaded();
    } else {
      window.addEventListener("load", handleAssetsLoaded);
      return () => window.removeEventListener("load", handleAssetsLoaded);
    }
  }, []);

  // 👉 Minimum 1-second loader logic
  useEffect(() => {
    const startTime = Date.now();

    const checkLoading = setInterval(() => {
      if (!apiLoading && assetsLoaded) {
        const elapsed = Date.now() - startTime;
        const remaining = 1000 - elapsed;

        clearInterval(checkLoading);

        if (remaining > 0) {
          setTimeout(() => setShowLoader(false), remaining);
        } else {
          setShowLoader(false);
        }
      }
    }, 100);

    return () => clearInterval(checkLoading);
  }, [apiLoading, assetsLoaded]);

  if (showLoader) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 z-50 transition-opacity duration-500">
        <img
          src="/img/backgrounds/Loader.jpeg"
          className="w-28 h-28 animate-spin-slow"
        />
        <p className="mt-4 text-gray-700 text-xl font-semibold tracking-wide">
          Mira Bhayandar Projects
        </p>
        <p className="text-gray-500 text-sm mt-1 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <ScrollToTop />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/allProjects" element={<AllProjects />} />
          <Route path="/about" element={<About />} />
          <Route path="/allBlogs" element={<AllBolgs />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
