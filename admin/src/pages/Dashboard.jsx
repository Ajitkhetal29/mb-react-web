import React, { useContext } from "react";
import { AppConetxt } from "../context/context";

const Dashboard = () => {
  const { allProjects, allBlogs, allTestimonials, allFaq } =
    useContext(AppConetxt);

 
  const stats = [
    {
      title: "Total Projects",
      value: allProjects.length,
      colorClass: "border-cyan-400",
    },
    {
      title: "Total Blogs",
      value: allBlogs.length,
      colorClass: "border-yellow-400",
    },
    {
      title: "Total Testimonials",
      value: allTestimonials.length,
      colorClass: "border-green-400",
    },
    {
      title: "Total FAQ",
      value: allFaq.length,
      colorClass: "border-purple-400",
    },
  ];

  return (
    // Main container with dark background and full screen height
    <main className="bg-neutral-950 min-h-screen text-white">
      {/* 
        Inner container with padding to account for the fixed navbar.
        Adjust pt-28 if needed to match your navbar's height perfectly.
      */}
      <div className="w-full max-w-7xl mx-auto px-4 py-10 pt-28 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white border-b border-gray-700 pb-4">
            Hello Admin
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Here's a summary of your content.
          </p>
        </div>

        {/* Grid layout for the stat cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* We map over the stats array to generate the cards */}
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`
                bg-neutral-900 rounded-lg p-6 shadow-lg 
                border-t-4 ${stat.colorClass} 
                transition-transform duration-300 hover:scale-105
                flex flex-col items-center justify-center text-center
              `}
            >
              <span className="text-lg font-semibold text-gray-300">
                {stat.title}
              </span>
              <span className="mt-2 text-4xl font-bold text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;