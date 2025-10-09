import React, { useContext, useEffect } from "react";
import { AppConetxt } from "../context/context";

const Testimonials = ({allTestimonials}) => {
  

  return (
    <div
      className="relative bg-[url('img/carousel/7.png')] bg-cover bg-fixed bg-center px-6 py-8 sm:px-8 lg:px-12 lg:py-10 mx-auto max-w-7xl rounded-xl overflow-hidden"
      aria-label="Customer testimonials section"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 pointer-events-none rounded-xl"></div>

      <div className="relative z-10 flex items-center justify-center w-full mb-2">
        <div className="flex-grow max-w-30 border-t border-white/50 opacity-70"></div>
        <h2 className="mx-6 text-2xl md:text-2xl uppercase text-white oswald_span tracking-wider">
          Customers Stories
        </h2>
        <div className="flex-grow max-w-30 border-t border-white/50 opacity-70"></div>
      </div>

      <div className="flex w-full z-10 justify-center mb-6 opacity-90">
        <p className="text-orange-200 mb-2 italic text-center text-lg md:text-xl maven-pro">
          “Real stories from the people who found their dream homes with us.”
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allTestimonials &&
          allTestimonials.map(({ name, position, message }, idx) => (
            <article
              key={idx}
              className="flex flex-col backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-default"
              role="group"
              tabIndex={0}
              aria-label={`Testimonial from ${name}, ${position}`}
            >
              <div className="flex-grow border-b py-2">
                <p className="text-white italic text-base md:text-lg leading-relaxed">
                  “{message}”
                </p>
              </div>

              <footer className="mt-4">
                <h3 className="text-lg font-semibold text-black">{name}</h3>
                <p className="text-gray-300 text-sm">{position}</p>
              </footer>
            </article>
          ))}
      </div>
    </div>
  );
};

export default Testimonials;
