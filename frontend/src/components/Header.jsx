import React from "react";

import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  return (
    <>
      <section className="relative flex items-center justify-center h-[70vh] md:h-[85vh] lg:h-[95vh] overflow-hidden">
        {/* Background Video */}
        <video
          src="img/carousel/header-video.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        ></video>

        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20 z-20"></div>

        {/* Content */}
        <div className="relative z-30 flex flex-col items-center text-center px-4 sm:px-8 animate-fadeInUp">
          {/* Logo */}
          <img
            src="img/logo/logo-white.png"
            className="h-14 sm:h-16 md:h-20 w-auto mb-6 drop-shadow-lg"
            alt="Mira Bhayandar Projects Hub"
          />

          {/* Tagline */}
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-5 gilda-display-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wider">
            <li className="border-r pr-3 sm:pr-5 border-white">FEEL IT</li>
            <li className="border-r pr-3 sm:pr-5 border-white">LIVE IT</li>
            <li>OWN IT</li>
          </ul>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mt-8">
            <button onClick={()=>navigate('/allProjects')} className="border cursor-pointer border-white/80 px-6 py-2 text-sm sm:text-base text-white hover:bg-white hover:text-black transition-all duration-300 rounded-md maven-pro tracking-wide">
              ALL PROPERTIES
            </button>
            <button onClick={()=>navigate('/allProjects#contact')} className="border cursor-pointer border-white/80 px-6 py-2 text-sm sm:text-base text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 rounded-md maven-pro tracking-wide">
              CONTACT US
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
