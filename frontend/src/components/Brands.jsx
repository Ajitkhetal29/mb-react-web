import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const Brands = () => {
  const textRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const target = textRef.current;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            target.classList.add("fade-slide-up");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (target) observer.observe(target);
  }, []);

  return (
    <section
      id="partnersSection"
      className="relative w-full py-16 px-6 bg-[url('img/backgrounds/testimonal-bg.jpeg')] bg-cover bg-fixed bg-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div
        ref={textRef}
        className="relat  ive z-30 max-w-5xl mx-auto text-center opacity-0 transition-all duration-700"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex-grow max-w-[80px] border-t border-white"></div>
          <h2 className="text-xl md:text-2xl  text-white uppercase oswald_span ">
            {t("brands.Our Partners")}
          </h2>
          <div className="flex-grow max-w-[80px] border-t border-white"></div>
        </div>

        <p className="text-orange-200 italic mb-10 text-lg md:text-xl maven-pro">
          {t("brands.We are pleased to work with our partners.")}
        </p>

        <div className="overflow-hidden relative">
          <div className="flex items-center  gap-10 animate-scroll group-hover:[animation-play-state:paused]">
            {[
              "anandam logo.png",
              "anjani one logo.png",
              "euphoria_logo.png",
              "golden_avenue.png",
              "meadows_logo.png",
              "mukundam_logo.png",
              "pentagon_logo.png",
              "sky_avenue_logo.png",
              "sky_heights_logo.png",
              "skyline_logo.png",
              "sneham_logo.png",
              "tirupati_complex_logo.png",
            ].map((logo, index) => (
              <img
                key={index}
                src={`img/logo/${logo}`}
                alt={`Brand ${index + 1}`}
                className="h-16 bg-black/70 w-auto object-contain opacity-100 hover:opacity-100 transition-all duration-300 "
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
