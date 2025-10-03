import React, { useState } from "react";

const Project = () => {
  const [showFeatures, setShowFeatures] = useState(false);

  const Description = `Welcome to Anandam in Bhayandar West, premium and luxury residences that don't restrict you in any manner. Homes that are more convenient as compared to conventionally designed residences and admirably fulfill the demands of fine living.

Make yourself at home in this premium 2BHKs, replete with the most modern amenities one could wish for. Located in Bhayandar West amongst life's conveniences, Anandam lets everyone experience fine living in a spacious environment.

MahaRERA No - : P51700017515 / P51700017941

G + 24 Storey tower

2 BHK & Jodi Options`;

  const Features = [
    "Gymnasium",
    "Senior Citizen Corner",
    "Kids Play Area",
    "Steam Room",
    "Swimming Pool",
    "CCTV for Security",
    "Clubhouse with AV",
    "Fire Fighting System",
    "Meditation Room",
    "Adequate Parking Spaces",
  ];

  return (
    <>
      {/* Header Section */}
      <section
        className="relative w-full h-[90vh] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://framerusercontent.com/images/4207UCMpGfd1yz62fn7VkACtag.jpg?scale-down-to=1024')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
          <img
            src="img/logo/anandam logo.png"
            alt="Anandam Logo"
            className="h-20 w-20 mb-4"
            loading="lazy"
          />
          <h1 className="text-white text-7xl font-bold italiana-regular select-none">
            Anandam
          </h1>
          <span className="text-gray-200 text-xl maven-pro">Mira Road</span>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full px-10 py-10 min-h-[90vh] flex flex-col">
        <header className="mb-6">
          <span className="text-gray-400 text-2xl maven-pro">ABOUT</span>
          <h2 className="ml-10 text-6xl font-bold italiana-regular bg-gradient-to-r from-red-500 to-red-900 bg-clip-text text-transparent">
            Anandam
          </h2>
        </header>

        <div className="flex min-h-[90vh] flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">
          {/* Description / Features Toggle & Content */}
          <div className="flex-1 flex-col flex-1 max-w-lg">
            <div className="inline-flex border border-black rounded overflow-hidden w-fit mb-4">
              <button
                type="button"
                aria-pressed={!showFeatures}
                onClick={() => setShowFeatures(false)}
                className={`px-5 py-2 transition-colors duration-200 font-medium ${
                  !showFeatures
                    ? "bg-black text-white"
                    : "text-black bg-transparent hover:bg-black hover:text-white"
                }`}
              >
                Description
              </button>
              <button
                type="button"
                aria-pressed={showFeatures}
                onClick={() => setShowFeatures(true)}
                className={`px-5 py-2 transition-colors duration-200 font-medium ${
                  showFeatures
                    ? "bg-black text-white"
                    : "text-black bg-transparent hover:bg-black hover:text-white"
                }`}
              >
                Features
              </button>
            </div>

            <div className="border min-h-[60vh] border-gray-300 p-4 min-h-[40vh] rounded">
              {showFeatures ? (
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4 list-none">
                  {Features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-700 text-md space-x-2"
                    >
                      <img
                        src="img/check-mark-circle-svgrepo-com.svg"
                        alt="Check mark"
                        className="h-5 w-5 flex-shrink-0"
                        loading="lazy"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{Description}</p>
              )}
            </div>
          </div>

          {/* Video Section */}
          <div className="flex w-full max-w-xl aspect-video rounded overflow-hidden shadow-lg">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/-YWwxrt69FI?si=sGgyi0UMu1uJt5E4"
              title="Anandam Project Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;