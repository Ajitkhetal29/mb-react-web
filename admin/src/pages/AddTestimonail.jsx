import React from "react";
import { useContext } from "react";
import { AppConetxt } from "../context/context";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddTestimonail = () => {
  const { navigate, backendUrl } = useContext(AppConetxt);

  const [form, setForm] = useState({
    name: "",
    message: "",
    position: "",
    company: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/testimonial/addTestimonial`,
        form,
        {}
      );

      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 2000 });
        navigate("/allTestimonials");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error); 
    }
  };

  return (
    <div className="min-h-screen p-5 pb-15 flex items-center justify-center bg-gray-900">
      <div className="bg-black backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-6 max-w-5xl w-full space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-white">
          Add New Testimonial
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm  mb-2 text-white">
              {" "}
              Client Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              required
              placeholder="Enter Client Name"
              className="w-full text-white rounded-lg border border-gray-300 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm text-white mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleFormChange}
              required
              placeholder="Write your blog content..."
              rows={5}
              className="w-full text-white rounded-lg border border-gray-300 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Writer */}
          <div>
            <label className="block text-sm  text-white mb-1">Position</label>
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleFormChange}
              required
              placeholder="Author name"
              className="w-full text-white rounded-lg border border-gray-300 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

         <div>
            <label className="block text-sm  text-white mb-1">compnay Name</label>
            <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleFormChange}
            required
              placeholder="Author name"
              className="w-full text-white rounded-lg border border-gray-300 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-yellow-200  border rounded-md text-black shadow-md hover:bg-black hover:text-white hover:border-white transition"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>

   
  );
};

export default AddTestimonail;
