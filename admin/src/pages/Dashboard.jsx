import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AppConetxt } from "../context/context";

const Dashboard = () => {
  const { allProjects, navigate, getAllProjects } = useContext(AppConetxt);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getAllProjects();

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
      <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-default flex flex-col items-center justify-center bg-white">
        <span className="text-lg font-semibold text-gray-700">Total Projects</span>
        <span className="mt-2 text-3xl font-bold text-indigo-600">{allProjects.length}</span>
      </div>

      <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-default flex flex-col items-center justify-center bg-white">
        <span className="text-lg font-semibold text-gray-700">Total Blogs</span>
        <span className="mt-2 text-3xl font-bold text-indigo-600">—</span>
      </div>

      <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-default flex flex-col items-center justify-center bg-white">
        <span className="text-lg font-semibold text-gray-700">Total Testimonials</span>
        <span className="mt-2 text-3xl font-bold text-indigo-600">—</span>
      </div>

      <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-default flex flex-col items-center justify-center bg-white">
        <span className="text-lg font-semibold text-gray-700">FAQ</span>
        <span className="mt-2 text-3xl font-bold text-indigo-600">—</span>
      </div>
    </div>
  </div>
</>
  );
};

export default Dashboard;
