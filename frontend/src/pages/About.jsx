import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const About = () => {
  const textRef = useRef(null);
  const imgref = useRef(null);
  const headingRef = useRef(null);
  const parentReF = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const target = textRef.current;
    const img = imgref.current;
    const heading = headingRef.current;
    const parent = parentReF.current;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.target === target && entry.isIntersecting) {
            target.classList.add("fade-in-visible");
            obs.unobserve(target);
          }
          if (entry.target === img && entry.isIntersecting) {
            img.classList.add("image-visible");
            obs.unobserve(img);
          }
          if (entry.target === heading && entry.isIntersecting) {
            heading.classList.add("mission-anim");
            obs.unobserve(heading);
          }
          if (entry.target === parent && entry.isIntersecting) {
            console.log("parent visible");

            parent.classList.add("show");
            obs.unobserve(parent);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (target) observer.observe(target);
    if (img) observer.observe(img);
    if (heading) observer.observe(heading);
    if (parent) observer.observe(parent);

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* header */}
      <div className="flex relative min-h-[50vh] w-full  max-h-[90vh]">
        <div className="absolute inset-0 bg-black/30 "></div>
        <div
          ref={parentReF}
          className="absolute  inset-0 z-10 fade-item flex flex-row items-center justify-center text-center px-4"
        >
          <div>
            <h2 className="italiana-regular text-white text-2xl md:text-6xl mb-5">
              {t(`aboutPage.Welcome To Mira-Bhayandar Project Hub`)}
            </h2>
            <span className="maven-pro italic text-yellow-200  md:text-2xl md:mt-10">
              "{" "}
              {t(
                `aboutPage.Your trusted partner in premium real estate across Mira Bhayandar.`
              )}{" "}
              "
            </span>
          </div>
        </div>
        <video
          src="/img/backgrounds/about-bg.mp4"
          className="w-full object-cover min-h-[50vh] h-full max-h-[90vh]"
          autoPlay
          loop
          muted
        ></video>
      </div>

      {/* about us  */}

      <section className="flex flex-col w-full px-6 py-10 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
        <div className="flex flex-col items-center max-w-5xl mx-auto text-center px-4">
          <div className="flex items-center justify-center w-full mb-5">
            <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
            <h2 className="mx-6 text-2xl font-extrabold uppercase text-gray-900 oswald_span tracking-widest">
              {t(`aboutPage.About Us`)}
            </h2>
            <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
          </div>

          <span
            ref={textRef}
            className="text-lg md:text-xl italic maven-pro text-orange-500 mb-10"
          >
            {t(`aboutPage.A one stop shop for all real estate services`)}
          </span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 px-4 items-center">
          <div className=" border border-orange-700 rounded-xl p-8 shadow-md">
            <h3 className="text-4xl text-red-600 font-semibold oswald_span mb-6">
              {t(`aboutPage.What do we mean?`)}
            </h3>
            <div className="space-y-4 text-gray-800 maven-pro text-base md:text-lg leading-relaxed">
              <p className=" first-letter:text-4xl   first-letter:font-bold">
                {t(
                  `aboutPage.Since our foundation in 2005, our goal has been to use technology to create experiences with a deeper impact.`
                )}
              </p>
              <p className=" first-letter:text-4xl   first-letter:font-bold">
                {t(`aboutPage.We get you the right deal with the best options based on analyzed market inputs and understanding your economic, social & lifestyle needs.`)}
              </p>
            </div>
          </div>

          <div ref={imgref} className="flex justify-center w-full lg:h-[50vh] ">
              <img
                src="/img/backgrounds/search-home.png"
                alt="Illustration depicting real estate services"
                className="w-full h-full  max-w-md md:max-w-xl rounded-lg  shadow-lg"
                loading="lazy"
              />
              {/* <video muted autoPlay loop src="/img/backgrounds/about-person (1).mp4"></video> */}
          </div>
        </div>
      </section>

      {/* mission & vission */}
      <section className="relative flex flex-col items-center justify-center w-full px-6 sm:px-10 md:px-16 py-8 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="relative z-10 w-full max-w-6xl flex flex-col gap-5 text-center">
          <div className="relative z-10 flex items-center justify-center w-full mb-2">
            <div className="flex-grow max-w-30 border-t border-black opacity-70"></div>
            <h2 className="mx-6 text-2xl md:text-2xl uppercase text-black oswald_span tracking-wider">
              {t(`aboutPage.Mission & Vision`)}
            </h2>
            <div className="flex-grow max-w-30 border-t border-black opacity-70"></div>
          </div>

          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto maven-pro animate-fade-in delay-200">
            {t(`aboutPage.Mira Bhayandar Projects has established itself as a key player in Indian real estate. Our goal is to provide`)}
            <span className=" text-orange-500">
              “
              {t(
                `aboutPage.an enhanced lifestyle coupled with a sustainable environment`
              )}
              ”
            </span>
            {t(`aboutPage. . We aim to be the market leader by offering iconic and world-class property developments.`)}
          </p>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                title: "Our Mission",
                desc: "To delight our customers by providing quality life spaces through continuous innovation.",
              },
              {
                title: "Our Vision",
                desc: "To be the most preferred brand in the premium housing segment.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="p-6 md:p-8 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-orange-300/30 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-2xl sm:text-3xl text-black oswald_span  mb-3">
                  {t(`aboutPage.${title}`)}
                </h3>
                <p className="text-gray-700 text-base sm:text-lg maven-pro leading-relaxed">
                  {t(`aboutPage.${desc}`)}
                </p>
              </div>
            ))}
          </div>

          {/* Core Values */}
          <div className="flex flex-col items-center mt-16">
            <div className="relative z-10 flex items-center justify-center w-full mb-10">
              <div className="flex-grow max-w-30 border-t border-black opacity-70"></div>
              <h2 className="mx-6 text-2xl md:text-2xl uppercase text-black oswald_span tracking-wide">
                {t(`aboutPage.Core Values`)}
              </h2>
              <div className="flex-grow max-w-30 border-t border-black opacity-70"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
              {[
                {
                  icon: "img/icons/target.svg",
                  title: "Customer Focus",
                  desc: "Managing expectations of clients and driving customer centricity in the organization.",
                },
                {
                  icon: "img/icons/bulb.svg",
                  title: "Innovation",
                  desc: "Continuous improvement to differentiate our products and services.",
                },
                {
                  icon: "img/icons/speed.svg",
                  title: "Agility",
                  desc: "Speed of decision making and execution.",
                },
                {
                  icon: "img/icons/hands.svg",
                  title: "Integrity",
                  desc: "Delivering what is promised with transparency.",
                },
                {
                  icon: "img/icons/people.svg",
                  title: "Leadership",
                  desc: "Striving to be the best in all we do.",
                },
                {
                  icon: "img/icons/cycle.svg",
                  title: "Sustainability",
                  desc: "Ensuring business continuity and environmental responsibility.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-5 p-6 rounded-3xl bg-white border border-gray-200 shadow-md hover:scale-105 hover:shadow-orange-300/30 transition-all duration-300"
                >
                  <img
                    src={icon}
                    alt={title}
                    className="h-12 w-12 flex-shrink-0 bg-gray-400"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-lg sm:text-xl font-semibold oswald_span text-black">
                      {t(`aboutPage.${title}`)}
                    </span>
                    <p className="text-gray-700 text-sm sm:text-base maven-pro leading-relaxed">
                      {t(`aboutPage.${desc}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* team */}
      <section className="relative w-full px-6 md:px-12 lg:px-20 py-10 bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-full mb-8">
          <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
          <h2 className="mx-6 text-xl sm:text-2xl  uppercase text-gray-900 oswald_span tracking-wide">
            {t(`aboutPage.Our Team`)}
          </h2>
          <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
        </div>

        <p className="text-orange-500 maven-pro italic text-center max-w-2xl mb-12 text-base text-lg md:text-xl">
          {t(`aboutPage.The people behind Mira Bhayandar Projects`)}
        <span> - </span>
         {t(`aboutPage.Building trust, innovation, and excellence in real estate.`)}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl">
          {[
            {
              img: "img/peoples/Kishor_vyas.png",
              name: "Kishore Vyas",
              role: "Director",
            },
            {
              img: "img/peoples/Munawar.png",
              name: "Munawar Pathan",
              role: "Director",
            },
            {
              img: "img/peoples/Naidu_Sir.png",
              name: "Kishore Naidu",
              role: "Director",
            },
          ].map(({ img, name, role }) => (
            <div
              key={name}
              className="group relative flex flex-col items-center bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.03] hover:border hover:border-black"
            >
              <div className="overflow-hidden w-full aspect-[4/4] ">
                <img
                  src={img}
                  alt={name}
                  className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="w-full py-5 px-4 text-center bg-white">
                <h3 className="text-md sm:text-md  text-gray-900 maven-pro">
                  {name}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* video */}
      <section className="relative flex w-full px-5 md:px-16 py-12 bg-center bg-cover bg-[url('/img/carousel/Airica.jpg')] bg-fixed">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-20 mx-auto flex justify-center items-center w-full">
          <iframe
            className="w-full max-w-3xl aspect-video rounded-2xl shadow-2xl border border-white/20"
            src="https://www.youtube.com/embed/8uVQACW7uh4?autoplay=1&mute=1&loop=1&playlist=8uVQACW7uh4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
