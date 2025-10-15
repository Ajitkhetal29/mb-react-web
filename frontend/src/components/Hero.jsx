import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useTranslation} from 'react-i18next'

const Hero = () => {
  const navigate = useNavigate();
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const{ t} = useTranslation();

  // State to track if animations are applied
  const [textAnimated, setTextAnimated] = useState(false);
  const [imageAnimated, setImageAnimated] = useState(false);

  useEffect(() => {
    const textTarget = textRef.current;
    const imageTarget = imageRef.current;

    const observerOptions = { threshold: 0.2 };

    // Observer callback for text
    const textObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTextAnimated(true);
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer callback for image
    const imageObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageAnimated(true);
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (textTarget) textObserver.observe(textTarget);
    if (imageTarget) imageObserver.observe(imageTarget);

    return () => {
      if (textTarget) textObserver.unobserve(textTarget);
      if (imageTarget) imageObserver.unobserve(imageTarget);
    };
  }, []);

  // Scroll to top handler for the arrow button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col w-full items-center justify-center px-6 py-20 md:px-16 lg:px-24 bg-gradient-to-b from-white via-[#faf7f4] to-gray-50 overflow-hidden">
      {/* Top Divider + Heading */}
      <div className="flex w-full flex-row items-center gap-4 justify-center mb-6">
        <div className="flex-grow max-w-40 border-t border-gray-400"></div>
        <h2 className="text-2xl text-gray-800 tracking-wider oswald_span uppercase font-semibold">
        {t('about.About')}
        </h2>
        <div className="flex-grow max-w-40 border-t border-gray-400"></div>
      </div>

      {/* Quote */}
      <div className="flex justify-center w-full items-center text-center mb-12">
        <p className="text-orange-600 italic text-lg md:text-xl maven-pro tracking-wide">
           “ {t('about.Building spaces that inspire trust, comfort, and a better tomorrow')}. ”
        </p>
      </div>

      {/* Content Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
        {/* Left Text Section */}
        <div
          ref={textRef}
          className={`flex flex-col justify-center space-y-6 text-left ${
            textAnimated ? "animate-slideInLeft" : "opacity-0"
          }`}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold gilda-display-regular leading-tight text-gray-900">
            {t("about.Build Your Dream")} 
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 maven-pro leading-relaxed max-w-lg">
            {t(`about.We provide end-to-end property solutions with expertise, transparency, and care. Whether you're buying, selling, or investing — we help you make your dream home a reality.`)}
          </p>

          <div>
            <button
              onClick={() => navigate("/about")}
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-white bg-orange-600 rounded-full transition-all duration-300 hover:bg-orange-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400"
              aria-label="Navigate to About page"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative cursor-pointer z-10 font-medium tracking-wide maven-pro">
                {t('about.Know More')}
              </span>
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div
          ref={imageRef}
          className={`flex justify-center items-center relative ${
            imageAnimated ? "animate-fadeIn" : "opacity-0"
          }`}
        >
          <div className="absolute w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <img
            src="/img/backgrounds/beautiful-towers-background (1).png"
            alt="Modern real estate cityscape with a beautiful tower"
            className="relative z-10 w-full max-w-md transition-transform duration-500 hover:scale-105 md:max-w-lg object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

     
    </section>
  );
};

export default Hero;