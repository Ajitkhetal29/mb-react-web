import React, { useContext, useState, useEffect } from "react";
import { AppConetxt } from "../context/context";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { allFaq } = useContext(AppConetxt);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  console.log("faq called");

  const { t } = useTranslation();

  const imgs = [
    "https://napa.wpresidence.net/wp-content/uploads/2014/05/2.6-3-2-1-1024x623.webp",
    "https://napa.wpresidence.net/wp-content/uploads/2014/05/4.1-1024x623.webp",
    "https://napa.wpresidence.net/wp-content/uploads/2014/05/2.6-3-2-1-1024x623.webp",
    "https://napa.wpresidence.net/wp-content/uploads/2014/05/4.1-1024x623.webp",
  ];

  const toggleFaq = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));

  const changeSlide = () => {
    setCurrentSlide((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [imgs.length]);

  return (
    <section className="relative w-full py-10 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Title */}
      <div className="flex z-10 relative items-center justify-center w-full mb-2">
        <div className="flex-grow max-w-30 border-t border-black"></div>
        <h2 className="mx-4 text-2xl uppercase text-black oswald_span">
          {t(`faq.frequently asked questions`)}
        </h2>
        <div className="flex-grow flex-grow max-w-30 border-t border-black"></div>
      </div>

      {/* Quote */}
      <p className="text-center italic text-orange-500 text-lg md:text-xl italic maven-pro mb-5">
      “ {t(`faq.Got questions? We’ve got clear answers — because transparency builds trust.`)} ”
      </p>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-12 justify-center items-center w-full max-w-7xl mx-auto">
        {/* Left: Image Slider */}
        <div className="lg:w-1/2 w  -full relative">
          <div className="relative w-full h-64 md:h-[350px] overflow-hidden rounded-2xl shadow-lg">
            {imgs.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className={`absolute w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  currentSlide === idx ? "opacity-100" : "opacity-0"
                }`}
                alt={`Slide ${idx}`}
              />
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
          >
            &#10095;
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {imgs.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  currentSlide === idx ? "bg-orange-500" : "bg-white/70"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Right: FAQ List */}
        <div className="lg:w-1/2 w-full flex flex-col gap-5">
          {allFaq &&
            allFaq.slice(0, 5).map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-300 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full cursor-pointer flex justify-between items-center p-5 text-left text-gray-800 font-medium maven-pro focus:outline-none"
                >
                  <span> {t(`faq.${item.question}`)}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      openIndex === idx ? "rotate-45 text-orange-500" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <div
                  className={`px-5 pb-4 text-green-700 maven-pro transition-all duration-500 ${
                    openIndex === idx
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {t(`faq.${item.answer}`)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
