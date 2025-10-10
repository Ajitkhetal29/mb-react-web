import React, { useState, useEffect, useContext } from "react";
import { AppConetxt } from "../context/context";

const Carousel = ({caraouselImages}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {backendUrl} = useContext(AppConetxt);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % caraouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative px-8 py-5 w-full max-w-6xl mx-auto">
      <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
        {caraouselImages.map((c, index) => (

          <img
            key={index}
            src={c.src ? c.src : `${backendUrl}/${c.image}`}
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

export default Carousel;