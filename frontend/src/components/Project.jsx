import React from "react";

const Project = () => {
  return (
    <>
      {/* header */}
      <section className="w-full flex items-center justify-center relative h-[90vh] bg-[url('https://framerusercontent.com/images/4207UCMpGfd1yz62fn7VkACtag.jpg?scale-down-to=1024')] bg-cover bg-center md:bg-cover bg-fixed">
        <div className="absolute z-20 inset-0 bg-black/60"></div>
        <div className="flex flex-col items-center justify-center z-30">
          <img src="img/logo/anandam logo.png" className="h-50 w-50" alt="" />
          <h1 className="italiana-regular text-white font-bold text-7xl">
            Ananadam{" "}
          </h1>
          <span className="text-gray-200 maven-pro">Mira Road</span>
        </div>
      </section>

      {/* header ends */}

      {/* about section */}

      <section className="w-full flex px-10 bg-gray-200 py-10 relative h-[90vh] ">
        <div className="flex flex-col">
          <span className="text-gray-400 maven-pro text-3xl">ABOUT </span>
          <h2 className="ml-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-900 text-6xl italiana-regular font-bold">
            Ananadam
          </h2>
        </div>
      </section>
      {/* about section end*/}
    </>
  );
};

export default Project;
