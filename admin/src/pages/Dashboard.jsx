import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AppConetxt } from "../context/context";

const Dashboard = () => {
  const {
    allProjects,
    navigate,
    getAllProjects,
    allBlogs,
    allTestimonials,
    allFaq,
  } = useContext(AppConetxt);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    setFetching(false);
  }, []);

  if (fetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-y-8 px-4 py-6 md:px-12">
        <div className="w-full max-w-7xl">
          <h1 className="maven-pro text-4xl md:text-5xl font-extrabold border-b border-gray-300 pb-4">
            Hello Admin
          </h1>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div className="border bg-green-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-default flex flex-col items-center justify-center ">
            <span className="text-lg font-bold text-black ">
              Total Projects
            </span>
            <span className="mt-2 text-3xl font-bold text-indigo-600">
              {allProjects.length}
            </span>
          </div>

          <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-default flex flex-col items-center justify-center bg-yellow-400">
            <span className="text-lg font-bold text-black">
              Total Blogs
            </span>
            <span className="mt-2 text-3xl font-bold text-indigo-600">
              {allBlogs.length}
            </span>
          </div>

          <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-default flex flex-col items-center justify-center bg-blue-300">
            <span className="text-lg font-bold text-black">
              Total Testimonials
            </span>
            <span className="mt-2 text-3xl font-bold text-indigo-600">{allTestimonials.length}</span>
          </div>

          <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-default flex flex-col items-center justify-center bg-orange-300">
            <span className="text-lg font-bold text-black">FAQ</span>
            <span className="mt-2 text-3xl font-bold text-indigo-600">{allFaq.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
