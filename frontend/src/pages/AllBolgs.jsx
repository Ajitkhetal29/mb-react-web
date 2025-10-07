import React, { useContext } from "react";
import { AppConetxt } from "../context/context";
import Footer from "../components/Footer";

const AllBolgs = () => {
  const { blogs } = useContext(AppConetxt);

  if (!blogs) return <div>Loading...</div>;

  return (
    <>
      {/* header */}
      <section className="relative w-full h-[80vh] md:h-[70vh] lg:h-[90vh] flex items-center justify-center bg-gray-900">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="img/carousel/Codename-LIT.jpg"
            alt="Blog Background"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col lg:flex-row items-center justify-center max-w-6xl px-6 gap-10 text-center lg:text-left">
          {/* Text */}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold italiana-regular text-white mb-4 drop-shadow-lg">
              Blogs
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-orange-200 maven-pro">
              Stay updated with our latest news and insights
            </p>
            <div className="mt-6 flex justify-center lg:justify-start gap-4">
              <a
                href="#"
                className="text-white maven-pro border border-white bg-black border-black px-6 py-2 rounded-md shadow-lg hover:bg-white hover:text-black transition-colors"
              >
                Read Latest
              </a>
            </div>
          </div>

          {/* Decorative Image */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <img
              src="img/backgrounds/blog-header.png"
              alt="Blog Illustration"
              className="w-100 h-auto rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* blog section */}
      <section className="w-full flex flex-col items-center justify-center px-6 py-12 md:px-16 md:py-16 bg-gray-100">
        <div className="flex items-center justify-center w-full mb-6">
          <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
          <h2 className="mx-6 text-2xl md:text-2xl uppercase text-gray-900 oswald_span tracking-wide">
            Blogs
          </h2>
          <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
        </div>

        <p className="w-full text-center text-lg md:text-xl italic maven-pro text-orange-500 mb-10 max-w-3xl">
          “Discover ideas, inspiration, and expert advice — one article at a
          time.”
        </p>

        {/* Blog Grid */}
        <div className="w-full grid grid-cols-1  md:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-64 md:h-56 lg:h-64 object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="mb-4">
                    <span className="text-gray-400 text-sm md:text-base maven-pro">
                      {blog.date}
                    </span>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 maven-pro">
                      {blog.title}
                    </h3>
                    <p className="text-gray-700 text-base md:text-lg maven-pro leading-relaxed">
                      {blog.content}
                    </p>
                  </div>
                  <div className="mt-auto pt-2 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-gray-800 font-semibold maven-pro">
                      {blog.author}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center py-20">
              <p className="text-gray-500 text-lg">No blogs available</p>
            </div>
          )}
        </div>
      </section>

      {/* footer */}

      <Footer/>
    </>
  );
};

export default AllBolgs;
