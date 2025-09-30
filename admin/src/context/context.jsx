import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export const AppConetxt = createContext();

const AppConetxtProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [allBlogs, setAllblogs] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [allFaq, setAllFaq] = useState([]);

  // fetch all projects
  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${backendUrl}/project/allProjects`);
      if (response.data.success) {
        setAllProjects(response.data.allProjects);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete project
  const deleteProject = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/project/deleteProject`, {
        id,
      });
      if (response.data.success) {
        toast.warning("Project Delered", { autoClose: 2000 });

        getAllProjects();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // logout
  const logout = async () => {
    localStorage.removeItem("token");
    toast.warning("Logout Succesfull", { autoClose: 2000 });

    setToken("");
    navigate("/");
  };

  // blogs

  // fetch all blogs
  const getAllBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/blog/allBlogs`);
      if (response.data.success) {
        setAllblogs(response.data.allblogs);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete blog
  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/blog/deleteBlog/${id}`
      );
      if (response.data.success) {
        toast.warning("Blog Deleted", { autoClose: 2000 });
        getAllBlogs();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // testimonials

  // get testimonials
  const getAllTestimonials = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/testimonial/allTestimonials`
      );
      if (response.data.success) {
        setAllTestimonials(response.data.allTestimonials);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete testimonial
  const deleteTestimonial = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/testimonial/deleteTestimonial/${id}`
      );
      if (response.data.success) {
        toast.warning("Testimonial Deleted", { autoClose: 2000 });
        getAllTestimonials();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FAQ

  // get FAQ
  const getAllFaq = async () => {
    try {
      const response = await axios.get(`${backendUrl}/faq/allFaqs`);
      if (response.data.success) {
        setAllFaq(response.data.allFaqs);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete FAQ
  const deleteFaq = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/faq/deleteFaq/${id}`);
      if (response.data.success) {
        toast.warning("FAQ Deleted", { autoClose: 2000 });
        getAllFaq();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch data on refresh or reload
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    getAllProjects();
    getAllBlogs();
    getAllTestimonials();
    getAllFaq();
  }, []);

  const value = {
    backendUrl,
    token,
    navigate,
    setToken,
    getAllProjects,
    allProjects,
    deleteProject,
    logout,
    getAllBlogs,
    deleteBlog,
    allBlogs,
    getAllTestimonials,
    allTestimonials,
    deleteTestimonial,
    allFaq,
    getAllFaq,
    deleteFaq,
  };

  return (
    <AppConetxt.Provider value={value}>{props.children}</AppConetxt.Provider>
  );
};

export default AppConetxtProvider;
