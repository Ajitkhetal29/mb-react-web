import React, { useContext, useEffect } from "react";
import { AppConetxt } from "../context/context";

const AllTestimonials = () => {
  const { allTestimonials, deleteTestimonial, getAllTestimonials, navigate } =
    useContext(AppConetxt);

  useEffect(() => {
    getAllTestimonials();
  }, []);

  if (!allTestimonials) {
    return (
      <div className="p-6 text-center text-gray-400 dark:text-gray-300">
        Loading Testimonials...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-900">
      {/* Header Action */}
      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={() => navigate("/addTestimonial")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition-colors"
        >
          + Add Testimonial
        </button>
      </div>

      {allTestimonials.length > 0 ? (
        <div className="overflow-x-auto shadow-2xl rounded-2xl bg-gray-800 border border-gray-700">
          <table className="w-full text-sm text-left text-gray-200">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {allTestimonials.map((test) => (
                <tr
                  key={test._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 font-semibold">{test.name}</td>
                  <td className="px-6 py-4">{test.message}</td>
                  <td className="px-6 py-4">{test.position}</td>
                  <td className="px-6 py-4">{test.company}</td>
                  <td className="px-6 py-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => deleteTestimonial(test._id)}
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
        <div className="p-6 text-center text-gray-400 border border-gray-700 rounded-lg shadow-lg mt-6">
          No Testimonials Found
        </div>
      )}
    </div>
  );
};

export default AllTestimonials;
