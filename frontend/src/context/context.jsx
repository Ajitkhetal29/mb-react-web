import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AppConetxt = createContext();

const AppConetxtProvider = (props) => {
  const [allProjects, setAllProjects] = useState([]);
  const [allBlogs, setAllblogs] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [allFaq, setAllFaq] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // fetch  from backend

  // fetch all projects
  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/project/allProjects`);
      if (response.data.success) {
        setAllProjects(response.data.allProjects);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all blogs
  const getAllBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/blog/allBlogs`);
      if (response.data.success) {
        setAllblogs(response.data.allblogs);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get FAQ
  const getAllFaq = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/faq/allFaqs`);
      if (response.data.success) {
        setAllFaq(response.data.allFaqs);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTestimonials = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/testimonial/allTestimonials`
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

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        console.log("Fetching all data...");

        await Promise.all([
          getAllProjects(),
          getAllBlogs(),
          getAllFaq(),
          getAllTestimonials(),
        ]);

        console.log("All data fetched");
      } catch (error) {
        console.log("Error while fetching data:", error);
      } finally {
        setLoading(false); // only stop loading after all data fetched
      }
    };

    fetchAllData();
  }, []);

  // new project

  // raw data

  const galleryItems = [
    { src: "/img/gallery/5.webp", title: "Modern Kitchen" },
    { src: "/img/gallery/2.webp", title: "Spacious Living Room" },
    { src: "/img/gallery/3.webp", title: "Cozy Bedroom" },
    { src: "/img/gallery/4.webp", title: "Elegant Dining Area" },
    { src: "/img/gallery/5.webp", title: "Luxurious Bathroom" },
    { src: "/img/gallery/6.webp", title: "Outdoor Patio" },
    { src: "/img/gallery/3.webp", title: "Home Office" },
    { src: "/img/gallery/8.webp", title: "Modern Kitchen 2" },
    { src: "/img/gallery/9.webp", title: "Open Floor Plan" },
  ];

  const caraouselImages = [
    { src: "/img/carousel/1.png", title: "1" },
    { src: "/img/carousel/5.png", title: "5" },
    { src: "/img/carousel/6.png", title: "6" },
    { src: "/img/carousel/7.png", title: "7" },
    { src: "/img/carousel/8.png", title: "8" },
  ];




  const [lang, setLang] = useState("english");

  const value = {
    allProjects,
    allTestimonials,
    allBlogs,
    allFaq,
    lang,
    setLang,
    galleryItems,
    caraouselImages,
    backendUrl,
    loading,
  };

  return (
    <AppConetxt.Provider value={value}>{props.children}</AppConetxt.Provider>
  );
};

export default AppConetxtProvider;
