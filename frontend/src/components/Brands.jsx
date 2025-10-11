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

  const logos = [
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
  ];

  return (
    <section
      id="partnersSection"
      className="relative w-full py-20 px-6 bg-[url('/img/backgrounds/testimonal-bg.jpeg')] bg-cover bg-fixed bg-center overflow-hidden"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      {/* Text Section */}
      <div
        ref={textRef}
        className="relative z-30 max-w-5xl mx-auto text-center opacity-0 transition-all duration-700"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex-grow max-w-[80px] border-t border-white/70"></div>
          <h2 className="text-xl md:text-2xl text-white uppercase oswald_span tracking-wide">
            {t("brands.Our Partners")}
          </h2>
          <div className="flex-grow max-w-[80px] border-t border-white/70"></div>
        </div>

        <p className="text-orange-200 italic mb-10 text-lg md:text-xl maven-pro">
          {t("brands.We are pleased to work with our partners.")}
        </p>

        {/* Logos Carousel */}
        <div className="overflow-hidden relative group">
          <div className="flex items-center gap-10 animate-scroll group-hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((logo, index) => (
              <img
                key={index}
                src={`img/logo/${logo}`}
                alt={`Brand ${index + 1}`}
                className="h-14 sm:h-16 lg:h-20 w-auto object-contain opacity-100 hover:opacity-100 transition-all duration-300 hover:scale-145 hover:drop-shadow-[0_0_10px_rgba(255,165,0,0.4)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
