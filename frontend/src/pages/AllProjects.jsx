import React, { useContext, useEffect, useRef, useState } from "react";
import { AppConetxt } from "../context/context";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import FeaturedProjects from "../components/FeaturedProjects";
import { useLocation } from "react-router-dom";

const AllProjects = () => {
  const location = useLocation();

  const { Projects, caraouselImages } = useContext(AppConetxt);
  const { t } = useTranslation();
  const [filterText, setFilterText] = useState("all");
  const [filteredProject, setFilteredProject] = useState([...Projects]);

  const [mailSent, setMailsent] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const formRef = useRef(null);
  const contactFormRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    choice: "",
    location: "",
    number: "",
  });

  const [conatctFormData, setConatctFormData] = useState({
    name: "",
    email: "",
    message: "",
    choice: "",
    location: "",
    number: "",
  });

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_3qxauyp",
        "template_pvmnnin",
        contactFormRef.current,
        "GoZgeEbgB3GxueDMC"
      );
      console.log("email sent");
      setMailsent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormdata = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactFormdata = (e) => {
    const { name, value } = e.target;
    setConatctFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        "service_3qxauyp",
        "template_pvmnnin",
        formRef.current,
        "GoZgeEbgB3GxueDMC"
      );
      console.log("email sent");
      setMailsent(true);
    } catch (error) {
      console.log(error);
    }

    setShowContactForm(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContactForm(true);
      console.log("Form opened");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if there’s a hash in the URL
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // Scroll smoothly to the element
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleDownload = async () => {
    if (mailSent) {
      const link = document.createElement("a");
      link.href = "https://www.orimi.com/pdf-test.pdf"; // external PDF link
      link.setAttribute("download", "Brochure.pdf"); // suggested filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setShowContactForm(true);
      if (mailSent) {
        const link = document.createElement("a");
        link.href = "https://www.orimi.com/pdf-test.pdf";
        link.setAttribute("download", "Brochure.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        pass;
      }
    }
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
    if (filterText === "all") {
      setFilteredProject([...newLaunchProjects]);
    } else {
      const tempProjects = newLaunchProjects.filter(
        (project) => project.location === filterText
      );

      setFilteredProject([...tempProjects]);
    }
    console.log("filtered Project", filteredProject);
  };

  return (
    <>
      {/* header */}
      <section className="relative w-full h-[90vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center bg-fixed bg-center bg-cover bg-[url('img/carousel/Airica.jpg')]">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 z-10"></div>

        <div className="relative z-20 max-w-7xl w-full px-6 md:px-12 flex flex-col-reverse md:flex-row items-center md:items-stretch justify-center gap-8 md:gap-16 text-center md:text-left">
          <div className="flex flex-col justify-center items-center md:items-start gap-4 md:gap-6 max-w-xl">
            <h1 className="text-yellow-200 italiana-regular font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg">
              Explore All The
            </h1>
            <h2 className="text-yellow-200 italiana-regular font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
              Top Notch Projects
            </h2>
            <span className="text-white maven-pro text-xl sm:text-2xl md:text-3xl drop-shadow-md ">
              Live Your Dream Life...
            </span>
          </div>

          <div className="flex justify-center md:justify-end items-center max-w-sm md:max-w-md lg:max-w-lg rounded-tr-[180px] rounded-bl-[180px] overflow-hidden shadow-2xl border-2 border-yellow-400">
            <img
              src="img/backgrounds/all-project.jpg"
              alt="Top Notch Projects"
              className="object-cover w-full h-64 sm:h-80 md:h-full transition-transform duration-500 hover:scale-105 rounded-tr-[180px] rounded-bl-[180px]"
            />
          </div>
        </div>
      </section>

      {/* conatct form */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
          showContactForm ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Dark backdrop */}
        <div
          onClick={() => setShowContactForm(false)}
          className="absolute inset-0 bg-black/50"
        ></div>

        {/* Modal content */}
        <div
          className={`bg-white rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] 
                max-w-md max-h-[80vh] overflow-y-auto relative transform 
                transition-all duration-500 ${
                  showContactForm
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                } p-4 sm:p-6 md:p-8`}
        >
          {/* Logo */}
          <div className="flex items-center justify-end mb-2 sm:mb-4">
            <img
              src="img/logo/logo.png"
              className="w-20 sm:w-24 md:w-28"
              alt="Logo"
            />
          </div>

          <h2 className="text-xl sm:text-2xl text-center oswald_span mb-2">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base mb-4 text-center maven-pro">
            Please enter the details below to get in touch with us
          </p>

          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3 sm:mb-4 ">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your full name"
                onChange={handleFormdata}
                className="shadow border maven-pro rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Email */}
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="example@domain.com"
                onChange={handleFormdata}
                className="shadow border maven-pro rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Contact Number */}
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="number"
                className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
              >
                Contact No:
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                required
                placeholder="e.g. 9876543210"
                onChange={handleFormdata}
                className="shadow border rounded maven-pro w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Project Choice */}
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="choice"
                className="block text-gray-700  text-sm font-bold mb-1 maven-pro"
              >
                Project:
              </label>
              <select
                name="choice"
                id="choice"
                required
                onChange={handleFormdata}
                className="shadow border maven-pro rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Project</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="1+1 JODI">1+1 JODI</option>
              </select>
            </div>

            {/* Location */}
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="location"
                className="block maven-pro text-gray-700 text-sm font-bold mb-1 maven-pro"
              >
                Location:
              </label>
              <select
                name="location"
                id="location"
                required
                onChange={handleFormdata}
                className="shadow border maven-pro rounded w-full py-2 px-3 maven-pro text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a location</option>
                <option value="Bhayandar East">Bhayandar East</option>
                <option value="Bhayandar West">Bhayandar West</option>
                <option value="Mira road">Mira Road</option>
              </select>
            </div>

            {/* Message */}
            <div className="mb-4 sm:mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Write your message in brief"
                onChange={handleFormdata}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-black maven-pro cursor-pointer text-black  hover:text-white  py-1 px-4 rounded border border-black "
              >
                Send Message
              </button>
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="bg-red-500 hover:bg-black maven-pro text-black cursor-pointer hover:text-white  py-1 px-4 rounded border border-black "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* caraousel */}

      <Carousel caraouselImages={caraouselImages} />

      {/* all projects */}



      <FeaturedProjects projects={filteredProject} projectBtn={false} />

      {/* video section */}
      <section className="relative flex w-full px-5 md:px-16 py-12 bg-center bg-cover bg-[url('img/carousel/Airica.jpg')] bg-fixed">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-20 mx-auto flex justify-center items-center w-full">
          <iframe
            className="w-full max-w-3xl aspect-video rounded-2xl shadow-2xl border border-white/20"
            src="https://www.youtube.com/embed/8uVQACW7uh4?autoplay=1&mute=1&loop=1&playlist=8uVQACW7uh4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* contact form */}

      <section
        id="contact"
        className="px-6 py-8 md:px-16 md:py-12 bg-gray-100 flex justify-center items-center min-h-screen"
      >
        <div className="bg-white rounded-2xl w-full max-w-4xl px-6 py-8 md:px-10 md:py-10 shadow-lg">
          <div className="flex items-center justify-center w-full mb-12">
            <div className="flex-1 max-w-40 border-t-2 border-black" />
            <h2 className="mx-6 text-2xl md:text-3xl font-bold uppercase text-black oswald_span tracking-widest select-none">
              Contact Us
            </h2>
            <div className="flex-1 max-w-40 border-t-2 border-black" />
          </div>
          <form ref={contactFormRef} onSubmit={handleContactFormSubmit}>
            {/* Name and Email */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 mb-6">
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleContactFormdata}
                  required
                  placeholder="example@domain.com"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            {/* Contact No and Project */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 mb-6">
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <label
                  htmlFor="number"
                  className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
                >
                  Contact No:
                </label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  onChange={handleContactFormdata}
                  required
                  placeholder="e.g. 9876543210"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="choice"
                  className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
                >
                  Project:
                </label>
                <select
                  name="choice"
                  id="choice"
                  required
                  onChange={handleContactFormdata}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Project</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="1+1 JODI">1+1 JODI</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
              >
                Location:
              </label>
              <select
                name="location"
                id="location"
                required
                onChange={handleContactFormdata}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a location</option>
                <option value="Bhayandar East">Bhayandar East</option>
                <option value="Bhayandar West">Bhayandar West</option>
                <option value="Mira road">Mira Road</option>
              </select>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-bold mb-1 maven-pro"
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                onChange={handleContactFormdata}
                rows="4"
                placeholder="Write your message in brief"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-start">
              <button
                type="submit"
                className="bg-black text-white py-2 px-6 rounded border border-black hover:bg-yellow-500 hover:text-black transition-colors font-semibold cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* footer */}

      <Footer />
    </>
  );
};

export default AllProjects;
