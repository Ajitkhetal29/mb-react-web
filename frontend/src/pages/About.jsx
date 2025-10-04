import React from "react";

const About = () => {
  return (
    <>
      {/* header */}
      <div className="flex relative min-h-[50vh] w-full lg:max-h-[90vh]">
        <div className="absolute inset-0"></div>
        <video
          src="img/backgrounds/large.mp4"
          className="w-full object-cover "
          autoPlay
          loop
          muted
        ></video>
      </div>

      {/* about us  */}

      <section className="flex flex-col w-full px-6 py-10 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
        <div className="flex flex-col items-center max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold gilda-display-regular text-gray-900 mb-2">
            Who we are
          </h2>
          <span className="text-lg md:text-xl maven-pro text-orange-500 mb-10">
            A one stop shop for all real estate services
          </span>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 px-4 items-center">
          <div className="border border-orange-700 rounded-xl p-8 shadow-md">
            <h3 className="text-4xl text-red-600 font-semibold oswald_span mb-6">
              What do we mean?
            </h3>
            <div className="space-y-5 text-gray-800 maven-pro text-base md:text-lg leading-relaxed">
              <p>
                <span className="text-3xl font-bold text-black">S</span>ince our
                foundation in 2005, our goal has been to use technology to
                create experiences with a deeper impact.
              </p>
              <p>
                <span className="text-3xl font-bold text-black">W</span>e get
                you the right deal with the best options based on analyzed
                market inputs and understanding your economic, social &
                lifestyle needs.
              </p>
              <p>
                <span className="text-3xl font-bold text-black">L</span>orem
                ipsum dolor sit amet consectetur adipisicing elit. Ex
                necessitatibus molestiae deserunt quibusdam. Consequuntur cum
                vel officia sed quis voluptate nobis nemo non? Ipsum, qui.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="img/backgrounds/about-vector.jpg"
              alt="Illustration depicting real estate services"
              className="w-full max-w-md md:max-w-2xl rounded-lg object-contain shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* mission & vission */}
      <section className="relative flex flex-col items-center justify-center w-full px-6 py-10 bg-[url('img/carousel/Airica.jpg')] bg-cover bg-fixed">
        <div className="absolute inset-0 bg-black/60"></div>
        <h2 className="relative text-3xl md:text-5xl text-center font-extrabold gilda-display-regular text-orange-100 mb-6">
          Mission & Vision
        </h2>

        <div className="relative max-w-5xl w-full flex flex-col gap-8 px-4">
          <p className="text-md md:text-lg maven-pro text-center text-white max-w-3xl mx-auto leading-relaxed">
            Mira Bhayandar Projects has established itself as one of the key
            players in the Indian real estate industry. Our basic purpose is to
            provide “an enhanced lifestyle coupled with sustainable
            environment”. We aspire to be the market leader by offering iconic
            and world-class property development in India.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col px-6">
              <span className="text-2xl gilda-display-regular text-orange-100 mb-3">
                Our Mission
              </span>
              <p className="text-md md:text-lg maven-pro text-white leading-relaxed">
                To delight our customer by providing quality life spaces through
                continuous innovation.
              </p>
            </div>

            <div className="flex flex-col px-6">
              <span className="text-2xl gilda-display-regular text-orange-100 mb-3">
                Our Vision
              </span>
              <p className="text-md md:text-lg maven-pro text-white leading-relaxed">
                To be the most preferred brand in the premium housing segment.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center px-6 mt-10">
            <span className="text-2xl gilda-display-regular text-orange-100 mb-6">
              Core Values
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {[
                {
                  icon: "img/icons/target.svg",
                  title: "Customer Focus",
                  desc: "Managing expectations of clients and driving customer centricity in the organization.",
                },
                {
                  icon: "img/icons/bulb.svg",
                  title: "Innovation",
                  desc: "Continuous improvement to differentiate our products/services.",
                },
                {
                  icon: "img/icons/speed.svg",
                  title: "Agility",
                  desc: "Speed of decision making & execution.",
                },
                {
                  icon: "img/icons/hands.svg",
                  title: "Integrity",
                  desc: "Deliver what is promised.",
                },
                {
                  icon: "img/icons/people.svg",
                  title: "Leadership",
                  desc: "Be the best in what you do.",
                },
                {
                  icon: "img/icons/cycle.svg",
                  title: "Sustainability",
                  desc: "Ability to ensure business continuity and safety.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex relative md:h-20  gap-4 border border-white items-center rounded-xl"
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img
                    src={icon}
                    alt={`${title} icon`}
                    className="h-12 relative w-12 flex-shrink-0 border-r px-1 border-white"
                  />
                  <div className="flex relative flex-col">
                    <span className="text-xl  oswald_span text-red-300">
                      {title}
                    </span>
                    <p className="text-gray-200 maven-pro leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
