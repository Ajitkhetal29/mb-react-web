import React from "react";

const Hero = () => {
  return (
    <section className="relative flex flex-col w-full items-center justify-center px-6 py-10 md:px-16 lg:px-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div class="flex  w-full flex-row items-center gap-2 justify-center">
        <div class="flex-grow max-w-40 border-t border-black"></div>
        <h2 class="text-2xl text-black mb-2 oswald_span uppercase text-bold">
          ABOUT
        </h2>
        <div class="flex-grow max-w-40 border-t border-black"></div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
        <div className="flex flex-col justify-center space-y-4 text-left">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold gilda-display-regular leading-tight text-gray-900">
            Build Your Dream
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 maven-pro leading-relaxed max-w-lg">
            We provide end-to-end property solutions with expertise,
            transparency, and care. Whether you're buying, selling, or investing
            — we help you make your dream home a reality.
          </p>

          <div className="mt-4">
            <button className="px-6 py-2 text-white bg-orange-600 hover:bg-orange-700 rounded-md maven-pro transition-all duration-300">
              Know More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-100/50 to-transparent rounded-full blur-3xl"></div>
          <img
            src="img/backgrounds/hands.png"
            alt="Modern real estate cityscape"
            className="relative z-10 w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
