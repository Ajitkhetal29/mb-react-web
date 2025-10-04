import React, { useState, useEffect } from "react";

const images = [
  "img/carousel/1.png",
  "img/carousel/5.png",
  "img/carousel/6.png",
  "img/carousel/7.png",
  "img/carousel/8.png",
];

const SimpleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative px-8 py-5 w-full max-w-6xl mx-auto">
      <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute top-1/2 left-1/2 w-full max-w-full max-h-full object-cover
              -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-in-out
              ${
                index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default SimpleCarousel;