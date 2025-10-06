import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const countersRef = useRef([]);
  const { t } = useTranslation();

  useEffect(() => {
    const counters = countersRef.current;

    const animateCount = (el) => {
      const target = +el.dataset.target;
      const duration = 1500;
      const startTime = performance.now();

      const update = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            animateCount(entry.target);
            entry.target.dataset.counted = "true";
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }, []);

  const addCounterRef = (el) => {
    if (el && !countersRef.current.includes(el)) countersRef.current.push(el);
  };

  return (
    <section className="relative w-full px-10 md:px-20 py-10 xl:mr-0 lg:mr-5 mr-0 bg-[url('img/carousel/5.png')] bg-cover bg-center md:bg-cover bg-fixed">
      <div className="absolute inset-0 bg-black/30 w-full"></div>
      <div className="relative z-10 w-full max-w-7xl px md:px-5 lg:px-5 mx-auto transition-opacity opacity-100">
        <div className="w-full  justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full rounded-xl flex-col p-5 justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-4 md:gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center gap-3 flex">
                <h6 className="text-bold text-white text-4xl md:text-6xl text-center md:text-left font-bold leading-relaxed font-bold  italiana-regular">
                  {t("about.Build Your Dream..")}
                </h6>
                <div className="w-full flex-col justify-start lg:items-start items-center gap-5 flex">
                  <h2 className="text-yellow-200 text-2xl md:text-4xl maven-pro  text-start text-center">
                    {t(
                      "about.Engage with us for end to end property solutions."
                    )}
                  </h2>
                  
                </div>
              </div>
            </div>
            <button className="sm:w-fit w-full border border-black group px-3.5 py-2 bg-white hover:bg-white rounded-sm shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
              <span className="px-1.5 leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                {t("about.Read More")}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                  stroke="#4F46E5"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Counters */}
          <section className="py- px-4 sm:py-12 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-left">
                <div className="p-4 sm:p-6 rounded-xl bg-black/50  border border-gray-200 hover:border-gray-400 transition duration-300 flex flex-col gap-2 items-center">
                  <h4 className="text-white maven-pro flex items-baseline gap-1 text-2xl sm:text-3xl font-bold">
                    <span
                      ref={addCounterRef}
                      className="counter"
                      data-target="1000"
                    >
                      0
                    </span>
                    <span>+</span>
                  </h4>
                  <p className="text-gray-200 maven-pro text-center text-sm sm:text-base">
                    {t("about.Crores of Property Transacted")}
                  </p>
                </div>

                <div className="p-4 sm:p-6 rounded-xl bg-black/50 border border-gray-200 hover:border-gray-400 transition duration-300 flex flex-col gap-2 items-center">
                  <h4 className="text-white maven-pro flex items-baseline gap-1 text-2xl sm:text-3xl font-bold">
                    <span
                      ref={addCounterRef}
                      className="counter"
                      data-target="1"
                    >
                      0
                    </span>
                    <span>M</span>
                  </h4>
                  <p className="text-gray-200  text-center text-sm sm:text-base">
                    {t("about.Over 1 Million SQ. FT of Property Sold")}
                  </p>
                </div>

                <div className="p-4 sm:p-6 rounded-xl bg-black/50 border border-gray-200 hover:border-gray-400 transition duration-300 flex flex-col gap-2 items-center">
                  <h4 className="text-white maven-pro flex items-baseline gap-1 text-2xl sm:text-3xl font-bold">
                    <span
                      ref={addCounterRef}
                      className="counter"
                      data-target="100"
                    >
                      0
                    </span>
                    <span>+</span>
                  </h4>
                  <p className="text-gray-200 maven-pro text-center text-sm sm:text-base">
                    {t("about.Developer Brand Partnership")}
                  </p>
                </div>

                <div className="p-4 sm:p-6 rounded-xl bg-black/50 border border-gray-200 hover:border-gray-400 transition duration-300 flex flex-col gap-2 items-center">
                  <h4 className="text-white maven-pro flex items-baseline gap-1 text-2xl sm:text-3xl font-bold">
                    <span
                      ref={addCounterRef}
                      className="counter"
                      data-target="1520"
                    >
                      0
                    </span>
                    <span>+</span>
                  </h4>
                  <p className="text-gray-200 maven-pro text-center text-sm sm:text-base">
                    {t("about.Colleagues & counting more daily")}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
