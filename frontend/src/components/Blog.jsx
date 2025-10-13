import React, { useContext, useEffect, useRef } from "react";
import { AppConetxt } from "../context/context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Blog = ({ allBlogs }) => {
  const parentSection = useRef(null);

  const { backendUrl } = useContext(AppConetxt);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {}, [allBlogs]);

  useEffect(() => {
    if (parentSection.current) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      const items = parentSection.current.querySelectorAll(".fade-item");

      items.forEach((item) => observer.observe(item));
      return () => observer.disconnect();
    }
  }, []);

  return (
    <section className="py-10 lg:px-20 sm:py-10 bg-white">
      <div className="absolute inset-y-0 bg-black/50"></div>

      <div
        ref={parentSection}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex z-10 relative items-center justify-center w-full mb-2">
          <div className="flex-grow max-w-30 border-t border-black"></div>
          <h2 className="mx-4 text-2xl uppercase text-black oswald_span">
            {t("blog.FROM THE BLOG")}
          </h2>
          <div className="flex-grow flex-grow max-w-30 border-t border-black"></div>
        </div>

        <div className="flex w-full z-10 justify-center mb-4 opacity-90">
          <p className="text-orange-500 italic text-center text-lg md:text-xl maven-pro">
            "{" "}
            {t(
              "blog.Discover ideas, inspiration, and expert advice — one article at a time."
            )}{" "}
            "
          </p>
        </div>

        <div className="flex fade-item  justify-center mb-5 gap-y-5 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          {allBlogs &&
            allBlogs.map((blog) => (
              <div
                key={blog._id}
                className="group relative cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 rounded-2xl p-5 transition-all duration-300 border border-gray-200 hover:border-white overflow-hidden"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={`${backendUrl}/${blog.image}`}
                    alt={blog.title}
                    className="rounded-lg border w-full h-56 object-cover"
                  />
                </div>

                <div className="block">
                  <div className="flex mb-3 items-center justify-between font-medium">
                    <h6 className="text-sm text-gray-500">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(blog.date))}
                    </h6>
                  </div>
                  <div className="flex mb-3 items-center justify-between font-medium">
                    <h6 className="text-sm text-black">
                      {" "}
                      {t(`blog.${blog.title}`)}
                    </h6>
                  </div>
                  <p className="text-gray-600 mb-5">
                    {blog.content.length > 100
                      ? t(`blog.${blog.content}`).slice(0,100) +'...'
                      : t(`blog.${blog.content}`)}
                  </p>
                  <div className="flex items-center justify-between font-medium">
                    <h6 className="text-sm text-gray-900">
                      {t(`blog.${blog.writer}`)}
                    </h6>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center">
                  <button className="translate-y-full flex gap-2 cursor-pointer group-hover:translate-y-0 transition-transform duration-500  text-black px-5 py-2 rounded-md shadow-lg">
                    <p className="text-white">Read More</p>
                    <img src="img/icons/arrow-outward.svg" alt="" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/allBlogs")}
            className="border cursor-pointer border-black px-6 py-2 uppercase text-sm font-medium bg-black text-white hover:bg-white hover:text-black transition-all duration-500"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
