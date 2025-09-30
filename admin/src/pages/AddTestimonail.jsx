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
    <div>
      <h2>Add Testimonial</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            {" "}
            client Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            {" "}
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleFormChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            {" "}
            Position
          </label>
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleFormChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            {" "}
            compnay Name
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleFormChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition-colors"
        >
          Add Testimonial
        </button>
      </form>
    </div>
  );
};

export default AddTestimonail;
