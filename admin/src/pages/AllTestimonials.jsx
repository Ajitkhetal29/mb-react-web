import React from "react";
import { useContext } from "react";
import { AppConetxt } from "../context/context";
import { useEffect } from "react";

const AllTestimonials = () => {
  const { allTestimonials, deleteTestimonial, getAllTestimonials, navigate } =
    useContext(AppConetxt);

  useEffect(() => {
    console.log("allblogs:", allTestimonials);
    getAllTestimonials();
  }, []);

  if (!allTestimonials) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-300">
        Loading Testimonials...
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header Action */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => navigate("/addTestimonial")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition-colors"
        >
          + Add Testimonail
        </button>
      </div>

      {allTestimonials && allTestimonials.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">Mame</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Poition</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {allTestimonials.map((test) => (
                <tr
                  key={test._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {test.name}
                  </td>
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
        <div className="p-6 text-center text-gray-500 dark:text-gray-300 border rounded-lg shadow-sm">
          No Testimonial Found
        </div>
      )}
    </div>
  );
};

export default AllTestimonials;
