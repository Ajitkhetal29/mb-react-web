import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AppConetxt } from "../context/context";
import { useNavigate } from "react-router-dom";
const FeaturedProjects = ({ projects, projectBtn }) => {
  
  const parentSection = useRef(null);
  const btnParent = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { backendUrl } = useContext(AppConetxt);

  useEffect(() => {
    if (projects && parentSection.current) {
      const btn = btnParent.current;
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              obs.unobserve(entry.target);
            }
            if (entry.target === btn) {
              if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      const items = parentSection.current.querySelectorAll(".fade-item");

      items.forEach((item) => observer.observe(item));
      if (btn) observer.observe(btn);
      return () => observer.disconnect();
    }
  }, [projects]);

  if (!projects) return <div>Loading...</div>;

  return (
    <section className="bg-gray-100 py-15 px-6 lg:px-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3">
          <div className="flex-grow max-w-[80px] border-t border-black"></div>
          <h2 className="text-2xl md:text-2xl uppercase  oswald_span text-gray-900 ">
            {t("featuredProject.Featured Projects")}
          </h2>
          <div className="flex-grow max-w-[80px] border-t border-black"></div>
        </div>
        <div className="w-full mt-2">
          <span className="maven-pro italic text-lg md:text-xl text-orange-500">
            " We create spaces that enable Everyday Joys, one community, one
            family, and one home at a time. "
          </span>
        </div>
        {projectBtn && (
          <div className="mt-6 flex justify-end">
            <button  onClick={()=>navigate('/allProjects')} className="border  cursor-pointer border-black px-5 py-2 uppercase text-sm font-medium bg-black text-white hover:bg-white hover:text-black transition-all duration-500">
              {t("featuredProject.Explore all properties")}
            </button>
          </div>
        )}
      </div>

      <div
        ref={parentSection}
        className="grid  gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto"
      >
        {projects &&
          projects.map((project, index) => (
            <a
              onClick={() => navigate(`/project/${project._id}`)}
              key={index}
              className="group cursor-pointer relative bg-white border border-transparent hover:border-black/70 rounded-xl shadow-md hover:shadow-xl hover:border-orange-700 hover:-translate-y-10 transition-all duration-800 ease-in-out overflow-hidden fade-item"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={`${backendUrl}/${project.coverImage}`}
                  alt={project.name}
                  className="object-conatin w-full h-56 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500"></div>
              </div>

              <div className="p-4">
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  <img className="h-4" src="img/icons/location.png" alt="" />
                  <span className="group-hover:text-black">
                    {project.location}
                  </span>
                </p>

                <h3 className="mt-2 text-lg group-hover:font-medium text-gray-900 group-hover:text-black maven-pro">
                  {project.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 border border-gray-300 px-2 py-0.5 rounded-full text-xs text-gray-700 group-hover:text-blue-500">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.332 7.999c0-3.68 2.98-6.667 6.66-6.667a6.67 6.67 0 0 1 6.673 6.667 6.67 6.67 0 0 1-6.673 6.666A6.663 6.663 0 0 1 1.332 8Zm6.667 2.3 2.146 1.293a.33.33 0 0 0 .494-.36l-.567-2.447 1.887-1.633a.334.334 0 0 0-.187-.587l-2.493-.213-.974-2.293a.332.332 0 0 0-.613 0l-.973 2.3-2.494.213a.337.337 0 0 0-.193.587l1.887 1.633-.567 2.44a.335.335 0 0 0 .5.36l2.147-1.293Z"
                        fill="#63BBEB"
                      />
                    </svg>
                    {t("featuredProject.NEW LAUNCH")}
                  </span>

                  <img
                    className="h-5 w-5 border border-gray-400 rounded-full p-1 group-hover:bg-black transition-all"
                    src="img/icons/arrow.png"
                    alt=""
                  />
                </div>
              </div>
            </a>
          ))}
      </div>

      {/* Bottom Button */}
      {projectBtn && (
        <div ref={btnParent} className="mt-10 fade-btn flex justify-center">
          <button className="border cursor-pointer border-black px-5 py-2 uppercase text-sm font-medium bg-black text-white hover:bg-white hover:text-black transition-all duration-500">
            {t("featuredProject.Explore all properties")}
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedProjects;
