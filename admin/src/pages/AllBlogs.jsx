import React, { useContext, useEffect } from "react";
import { AppConetxt } from "../context/context";

const AllBlogs = () => {
  const { allBlogs, deleteBlog, navigate, getAllBlogs } = useContext(AppConetxt);

  useEffect(() => {
    console.log("allblogs:", allBlogs);
    getAllBlogs()

  }, []);

  if (!allBlogs) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-300">
        Loading Blogs...
      </div>
    );
  }

  return (
   <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
  {/* Header Action */}
  <div className="flex justify-end mb-3">
    <button
      type="button"
      onClick={() => navigate("/addBlog")}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
    >
      + Add Blog
    </button>
  </div>

  {allBlogs && allBlogs.length > 0 ? (
    <div className="overflow-x-auto rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead className="text-xs uppercase bg-gray-900 text-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 select-none">
          <tr>
            <th className="px-6 py-3 border-r border-gray-00 dark:border-gray-600">Blog Title</th>
            <th className="px-6 py-3 border-r border-gray-300 dark:border-gray-600">Date</th>
            <th className="px-6 py-3 border-r border-gray-300 dark:border-gray-600 max-w-sm">Content</th>
            <th className="px-6 py-3 border-r border-gray-300 dark:border-gray-600">Writer</th>
            <th className="px-6 py-3 border-r border-gray-300 dark:border-gray-600">Action</th>
          </tr>
        </thead>

        <tbody>
          {allBlogs.map((blog) => (
            <tr
              key={blog._id}
              className="bg-white dark:bg-gray-800 border-r border-blac dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="px-6 py-3 font-semibold text-gray-900 dark:text-white border-r border-black max-w-xs truncate" title={blog.title}>
                {blog.title}
              </td>
              <td className="px-6 py-3 whitespace-nowrap border-r border-black">
                {new Date(blog.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-3 max-w-md truncate border-r border-black" title={blog.content}>
                {blog.content}
              </td>
              <td className="px-6 py-3 whitespace-nowrap border-r border-black">
                {blog.writer}
              </td>

              <td className="px-6 py-3 flex flex-wrap gap-2 border-r border-black">
                <button
                  type="button"
                  onClick={() => deleteBlog(blog._id)}
                  className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label={`Delete blog titled ${blog.title}`}
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
    <div className="p-8 text-center text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm font-semibold select-none">
      No Blogs Found
    </div>
  )}
</div>
  );
};

export default AllBlogs;
