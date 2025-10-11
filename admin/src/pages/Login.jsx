import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppConetxt } from "../context/context";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, token, navigate, setToken } = useContext(AppConetxt);

  console.log(backendUrl);

  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {

    console.log('login called');
    

    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        navigate("/dashboard");
        toast.success("Logged In Successfully", { autoClose: 2000 });
        console.log("logged in");
      } else {
        alert(response.data.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });

  return (
    <div
      className="flex flex-1 justify-center items-center bg-gradient-to-br
              from-gray-100 to-gray-200 p-4"
    >
      <div
        className="flex flex-col w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl
                justify-center items-center px-6 py-12 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="img/logo/logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold  text-white oswald_span">
            Admin Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block font-bold  text-sm/6  text-gray-100 maven-pro"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  placeholder="Enter Username"
                  onChange={handleForm}
                  className="block w-full cursor-pointer italic rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block  text-sm/6 font-bold text-gray-100 maven-pro"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  required
                  onChange={handleForm}
                  className="block w-full cursor-pointer italic rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full cursor-pointer maven-pro justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
