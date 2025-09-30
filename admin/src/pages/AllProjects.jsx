import React, { useContext, useEffect } from "react";
import { AppConetxt } from "../context/context";

const AllProjects = () => {
  const { allProjects, navigate, deleteProject } = useContext(AppConetxt);

  useEffect(() => {
    console.log("allProjects:", allProjects);
  }, [allProjects]);

  if(!allProjects) {
    return <div className="p-4 text-center text-gray-500 dark:text-gray-300">Loading Projects...</div>;
  }

  return (
    <div className="p-4">
      {/* Header Action */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => navigate("/addProject")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition-colors"
        >
          + Add Project
        </button>
      </div>

      {allProjects && allProjects.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700 ">
              <tr>
                <th className="px-6 py-3 boder border-r border-gray-600">Sr. No</th>
                <th className="px-6 py-3 boder border-r border-gray-600">Project Name</th>
                <th className="px-6 py-3 boder border-r border-gray-600">Builder</th>
                <th className="px-6 py-3 boder border-r border-gray-600">Location</th>
                <th className="px-6 py-3 boder border-r border-gray-600">Status</th>
                <th className="px-6 py-3 boder border-r border-gray-600">Description</th>
                <th className="px-6 py-3 boder border-r border-gray-600">Features</th>
                <th className="px-6 py-3 boder border-r border-gray-600">Gallery</th>
                <th className="px-6 py-3 boder border-r border-gray-600">Layouts</th>
                <th className="px-6 py-3 boder border-r border-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {allProjects.map((project, i) => (
                <tr
                  key={project._id || project.name}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white border-r border-gray-600">
                    {i+1}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white border-r border-gray-600">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-600">{project.builder}</td>
                  <td className="px-6 py-4 border-r border-gray-600">{project.location}</td>
                  <td className="px-6 py-4 border-r border-gray-600">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium  ${
                        project.status === "ongoing"
                          ? "bg-yellow-100 text-yellow-700"
                          : project.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r border-gray-600">{project.description}</td>
                  <td className="px-6 py-4 border-r border-gray-600">{project.features}</td>
                  <td className="px-6 py-4 space-y-1 border-r border-gray-600">
                    {project.galleryImages?.map((img, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-blue-100  text-blue-700 px-2 py-1 rounded inline-block"
                      >
                        {img.filename}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 space-y-1 border-r border-gray-600">
                    {project.layouts?.map((layout, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded inline-block"
                      >
                        {layout.title}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 flex flex-wrap gap-2 border-r border-gray-600">
                    <button
                      onClick={() => navigate(`/updateProject/${project._id}`)}
                      className="px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow transition"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProject(project._id)}
                      className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500 dark:text-gray-300 border rounded-lg shadow-sm">
          No Projects Found
        </div>
      )}
    </div>
  );
};

export default AllProjects; 
