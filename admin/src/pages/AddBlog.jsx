import React, { useContext, useState } from "react";
import { AppConetxt } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";

const AddBlog = () => {
  const { navigate, backendUrl } = useContext(AppConetxt);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    writer: "",
  });

  const [blogImage, setBlogImage] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("content", formData.content);
    fd.append("writer", formData.writer);
    fd.append("blogImage", blogImage);

    try {
      const response = await axios.post(`${backendUrl}/blog/addBlog`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Blog Created", { autoClose: 2000 });
        navigate("/allBlogs");
      } else {
        toast.error("Failed to create blog", { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred", { autoClose: 2000 });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      <div className="relative bg-black/70 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Add New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              required
              placeholder="Enter blog title"
              className="w-full rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleFormChange}
              required
              placeholder="Write your blog content..."
              rows={5}
              className="w-full rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Writer */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Writer
            </label>
            <input
              type="text"
              name="writer"
              value={formData.writer}
              onChange={handleFormChange}
              required
              placeholder="Author name"
              className="w-full rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Blog Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
            {blogImage && (
              <p className="mt-2 text-sm text-gray-200">
                Selected: {blogImage.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition-colors"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
