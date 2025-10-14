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
  const Projects = [
    {
      img: "img/projects/anandam.png",
      location: "BHAYANDAR WEST",
      name: "Anandam Estate",
    },
    {
      img: "img/projects/anjani one.png",
      location: "BHAYANDAR EAST",
      name: "Anjani One",
    },
    {
      img: "img/projects/skyline.png",
      location: "BHAYANDAR WEST",
      name: "Skyline Estate",
    },
    {
      img: "img/projects/pentagon.png",
      location: "BHAYANDAR EAST",
      name: "Pentagon Estate",
    },
    {
      img: "img/projects/golden avenue.png",
      location: "BHAYANDAR EAST",
      name: "Gold Avenue Estate",
    },
    {
      img: "img/projects/mukundam.png",
      location: "BHAYANDAR WEST",
      name: "Mukundam Estate",
    },
    {
      img: "img/projects/sky heights.png",
      location: "MIRA ROAD",
      name: "Sky Heights",
    },
    {
      img: "img/projects/tirupati complex.png",
      location: "BHAYANDAR WEST",
      name: "Tirupati Complex",
    },
  ];

  // raw data

  const galleryItems = [
    { src: "img/gallery/5.jpg", title: "Modern Kitchen" },
    { src: "img/gallery/2.jpg", title: "Spacious Living Room" },
    { src: "img/gallery/3.jpg", title: "Cozy Bedroom" },
    { src: "img/gallery/4.jpg", title: "Elegant Dining Area" },
    { src: "img/gallery/5.jpg", title: "Luxurious Bathroom" },
    { src: "img/gallery/6.jpeg", title: "Outdoor Patio" },
    { src: "img/gallery/3.jpg", title: "Home Office" },
    { src: "img/gallery/8.jpeg", title: "Modern Kitchen 2" },
    { src: "img/gallery/9.jpeg", title: "Open Floor Plan" },
  ];

  const CustReviews = [
    {
      text: "I'm absolutely floored by the level of care and attention to detail the team at HS have put into this theme and for one can guarantee that I will be a return customer.",
      name: "Nicole Grazioso",
      position: "Director Payments & Risk | HubSpot",
    },
    {
      text: "With Preline, we're able to easily track our performance in full detail.It's become an essential tool for us to grow and engage with our audience.",
      name: "Josh Tyson",
      position: "Product Manager | Capsule",
    },
    {
      text: "In September, I will be using this theme for 2 years. I went through multiple updates and changes and I'm very glad to see the consistency and effort made by the team.",
      name: "Luisa",
      position: "Senior Director of Operations | Fitbit",
    },
  ];

  const blogs = [
    {
      img: "https://pagedone.io/asset/uploads/1696244579.png",
      date: "March 16, 2025",
      title: "The Mumbai Metropolitan Region (MMR).",
      content:
        "The Mumbai Metropolitan Region (MMR) continues to be one of India's most dynamic real estate markets, with Bhayandar emerging as a prime investment destination. As we move through 2024, several key trends are reshaping the landscape...",
      author: "Harsh C.",
    },
    {
      img: "https://pagedone.io/asset/uploads/1696244619.png",
      date: "March 16, 2025",
      title: "The Mumbai Metropolitan Region (MMR).",
      content:
        "The Mumbai Metropolitan Region (MMR) continues to be one of India's most dynamic real estate markets, with Bhayandar emerging as a prime investment destination. As we move through 2024, several key trends are reshaping the landscape...",
      author: "Harsh C.",
    },
    {
      img: "https://pagedone.io/asset/uploads/1696244553.png",
      date: "March 16, 2025",
      title: "The Mumbai Metropolitan Region (MMR).",
      content:
        "The Mumbai Metropolitan Region (MMR) continues to be one of India's most dynamic real estate markets, with Bhayandar emerging as a prime investment destination. As we move through 2024, several key trends are reshaping the landscape...",
      author: "Harsh C.",
    },
  ];

  const faq = [
    {
      que: "How do I schedule a property viewing?",
      ans: "You can request a showing directly on the property’s listing page or contact us via phone or email. We’ll confirm a convenient date and time and guide you through the viewing process.",
    },
    {
      que: "Do I need mortgage pre-approval before house hunting?",
      ans: "Its highly recommended. Pre-approval helps you understand your budget, strengthens your offer, and speeds up the closing process once you find the right property.",
    },
    {
      que: "How do I schedule a property viewing?",
      ans: "You can request a showing directly on the propertys listing page or contact us via phone or email. Well confirm a convenient date and time and guide you through the viewing process.",
    },
    {
      que: "What are the costs involved in buying a home?",
      ans: "You can request a showing directly on the propertys listing page or contact us via phone or email. Well confirm a convenient date and time and guide you through the viewing process.",
    },
    {
      que: "How do I schedule a property viewing?",
      ans: " Beyond the purchase price, buyers should budget for closing costs (typically 2-5% of the home price), inspections, appraisal fees, and potential HOA or maintenance charges.",
    },
    {
      que: "How do you market a property you list?",
      ans: " Yes! Whether youre looking for a rental, a vacation home, or an income property, we can assist with finding and negotiating the right opportunity.",
    },
  ];
  const [lang, setLang] = useState("english");

  const caraouselImages = [
    {
      title: "Anandam Estate",
      src: "img/carousel/1.png",
    },
    {
      title: "Anandam Estate",
      src: "img/carousel/5.png",
    },
    {
      title: "Anandam Estate",
      src: "img/carousel/6.png",
    },
    {
      title: "Anandam Estate",
      src: "img/carousel/7.png",
    },

    { title: "Anandam Estate", src: "img/carousel/5.png" },

    { title: "Anandam Estate", src: "img/carousel/8.png" },
  ];

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
