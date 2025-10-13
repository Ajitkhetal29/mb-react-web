import React from "react";
import { useTranslation } from "react-i18next";

const HeroAbout = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full bg-fixed bg-[url('/img/backgrounds/hero-2-bg.jpeg')] bg-cover bg-center py-12 md:py-20 flex items-center justify-center overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-12 lg:px-16">
        {/* Text Section */}
        <div className="text-white max-w-xl text-center lg:text-left space-y-4 fade-in-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gilda-display-regular leading-tight">
            {t("heroAbout.Transparent and participative culture")}
          </h2>
          <p className="text-base md:text-lg maven-pro text-gray-200">
            {t("heroAbout.is the bedrock of values at")}
          </p>
          <h3 className="text-2xl md:text-3xl gilda-display-regular font-semibold text-orange-300">
            {t("heroAbout.Mira Bhayandar Projects Hub")}
          </h3>
          <p className="text-sm md:text-base maven-pro text-gray-300">
            {t(
              "heroAbout.In every deal we ensure a trusting, quality-driven and participative transaction."
            )}
          </p>
          <p className="font-medium gilda-display-regular text-gray-100 tracking-wide">
            {t("heroAbout.Mira Bhayandar Projects Hub Pvt Ltd")}
          </p>
        </div>

        {/* Video Section */}
        <div className="fade-in-right w-full h-full max-w-xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/jT6hFzQHkco?autoplay=1&mute=1&loop=1&playlist=jT6hFzQHkco"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
