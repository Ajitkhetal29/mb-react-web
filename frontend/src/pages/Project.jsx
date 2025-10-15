import React, { useContext, useEffect, useRef, useState } from "react";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import emailjs from "emailjs-com";
import Carousel from "../components/Carousel";
import { AppConetxt } from "../context/context";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import axios from "axios";

const Project = () => {
  const { projectId } = useParams();
  const { galleryItems, caraouselImages, allProjects, backendUrl } =
    useContext(AppConetxt);
  const [project, setProject] = useState(null);

  const [showFeatures, setShowFeatures] = useState(false);
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [imgBoxOpen, setImgBoxOpen] = useState(false);
  const [mailSent, setMailsent] = useState(false);

  const [showContactForm, setShowContactForm] = useState(false);
  const formRef = useRef(null);
  const contactFormRef = useRef(null);

  useEffect(() => {
    const project = allProjects.find((proj) => proj._id === projectId);
    setProject(project);
    if (project) {
      console.log("Project found:", project);
    } else {
      console.log("No project found with the given ID.");
    }
  }, [projectId, allProjects]);

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
      toast.success(
        "Thank you for contacting us! We'll get back to you soon.",
        { autoClose: 3000 }
      );

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
      toast.success(
        "Thank you for contacting us! We'll get back to you soon.",
        { autoClose: 3000 }
      );
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

  const openImgBox = (src, index) => {
    setImgBoxOpen(true);
  };

  const closeImgBox = () => {
    setImgBoxOpen(false);
  };

  const handleDownload = async () => {
    if (mailSent) {
      const link = document.createElement("a");
      link.href = `${backendUrl}/${project.browcherPdf}`; // external PDF link
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

  if (!project) return <div>Loading...</div>;

  return (
    <>
      {/* Header Section  */}
      <section className="relative w-full h-[90vh] sm:h-[80vh] md:h-[70vh] flex items-center bg-[url('/img/carousel/5.png')] justify-center bg-fixed bg-center bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10"></div>

        {/* Content Container */}
        <div className="relative  z-20 flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-3xl mx-auto">
          <img
            src={`${backendUrl}/${project.logo}`}
            alt="Anandam Logo"
            className="h-32 w-32 md:h-46 md:w-50 mb-6 drop-shadow-lg bg-black/10 rounded-full"
            loading="lazy"
          />
          <h1 className="text-white text-6xl sm:text-7xl md:t ext-8xl font-extrabold italiana-regular select-none drop-shadow-xl">
            {project.name}
          </h1>
          <span className="text-yellow-400 text-2xl sm:text-3xl maven-pro mt-2 tracking-wide drop-shadow-md italic">
            {project.location}
          </span>

          {/* Optional Quote */}
          <span className="mt-10 w-full maven-pro text-orange-200 italic text-lg md:text-xl">
            " Where dreams find a home and life blossoms in every corner."
          </span>
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
              src="/img/logo/logo.png"
              className="w-20 sm:w-24 md:w-28"
              alt="Logo"
            />
          </div>

          {/* conatct us form */}

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

      {/* About Section */}
      <section className="w-full   px-6 md:px-16 py-5 min-h-[70vh] flex flex-col">
        <header className="w-full flex flex-col items-center md:items-start text-center md:text-left mb-6">
          <span className="text-gray-400 text-xl md:text-2xl maven-pro">
            ABOUT
          </span>
          <h2 className="mt-1 text-4xl sm:text-5xl md:text-6xl font-bold italiana-regular bg-gradient-to-r from-red-500 to-red-900 bg-clip-text text-transparent">
            {project.name}
          </h2>
        </header>

        <div className="flex flex-col flex-col-reverse lg:flex-row gap-4 sm:gap-8 md:gap-16 items-start md:items-center">
          <div className="flex flex-col w-full lg:w-1/2 max-w-full md:max-w-xl">
            <div className="inline-flex border-black rounded overflow-hidden w-fit mb-4">
              <button
                type="button"
                aria-pressed={!showFeatures}
                onClick={() => setShowFeatures(false)}
                className={`px-4 sm:px-5 py-2 transition-colors duration-200 font-medium text-sm sm:text-base ${
                  !showFeatures
                    ? "bg-black text-white"
                    : "text-black bg-transparent hover:bg-black hover:text-white"
                }`}
              >
                Description
              </button>
              <button
                type="button"
                aria-pressed={showFeatures}
                onClick={() => setShowFeatures(true)}
                className={`px-4 sm:px-5 py-2 transition-colors duration-200 font-medium text-sm sm:text-base ${
                  showFeatures
                    ? "bg-black text-white"
                    : "text-black bg-transparent hover:bg-black hover:text-white"
                }`}
              >
                Features
              </button>
            </div>

            <div className="border border-gray-300 border-orange-600 rounded p-4 min-h-[40vh]  lg:min-h-[60vh] overflow-auto text-gray-700 text-sm sm:text-base whitespace-pre-wrap">
              {showFeatures ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2  gap-x-4 gap-y-3 list-none">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center maven-pro space-x-2 text-gray-700 text-sm sm:text-base"
                    >
                      <img
                        src="/img/check-mark-circle-svgrepo-com.svg"
                        alt="Check mark"
                        className="h-5 w-5 flex-shrink-0"
                        loading="lazy"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="maven-pro">{project.description}</p>
              )}
            </div>
          </div>
          {/* image Section */}
          <div className="flex justify-center items-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-100/50 to-transparent rounded-full blur-3xl"></div>
            <img
              src={`${backendUrl}/${project.coverImage}`}
              alt="Modern real estate cityscape"
              className="relative z-10 w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl"
            />
          </div>{" "}
        </div>
      </section>

      {/* caraousel */}

      <Carousel caraouselImages={project.carouselImages} />

      {/* layout section */}
      <section className="px-6 md:px-16 py-8 bg-gray-100">
        {/* Section Title */}
        <div className="flex items-center justify-center w-full mb-5">
          <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
          <h2 className="mx-6 text-2xl uppercase text-gray-900 oswald_span tracking-wide">
            Layouts
          </h2>
          <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
        </div>

        <div className="flex w-full z-10 justify-center mb-4 opacity-90">
          <p className="text-orange-500 italic text-center text-lg md:text-xl maven-pro mb-8">
            “A home is more than walls and roofs — it’s about thoughtful spaces
            designed for living, comfort, and connection.”
          </p>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Image Container */}
          <div className="flex-1 bg-black/85 rounded-xl shadow-lg p-4 flex justify-center items-center">
            <img
              src={`${backendUrl}/${project.layouts[layoutIndex].image}`}
              alt={project.layouts[layoutIndex].title}
              onClick={openImgBox}
              className="w-full cursor-pointer h-[350px] md:h-[400px] object-contain rounded-lg"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-1 flex-col justify-between h-full">
            {/* Buttons */}
            <div className="flex  flex-wrap gap-3 mb-6">
              {project.layouts.map((l, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLayoutIndex(idx)}
                  className={`px-5 cursor-pointer maven-pro py-1 rounded-md font-sm transition-all duration-300 ${
                    layoutIndex === idx
                      ? "bg-black text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {l.title}
                </button>
              ))}
            </div>

            {imgBoxOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                <div className="flex flex-col items-center">
                  <img
                    src={`${backendUrl}/${project.layouts[layoutIndex].image}`}
                    alt="Enlarged view"
                    className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                  />
                  <p className="text-white text-md maven-pro mt-4 italic">
                    {project.layouts[layoutIndex].title}
                  </p>
                </div>

                <button
                  className="absolute top-5 right-5 text-yellow-500 hover:rotate-y-60 text-5xl font-bold cursor-pointer"
                  onClick={closeImgBox}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
            )}

            {/* Details Box */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-md text-gray-700 mb-6">
              <p className="mb-2 maven-pro font-semibold">
                Title:{" "}
                <span className="font-normal">
                  {project.layouts[layoutIndex].title}
                </span>
              </p>
              <p className="mb-2 maven-pro font-semibold">
                Area:{" "}
                <span className="font-normal">
                  {project.layouts[layoutIndex].area} sq ft
                </span>
              </p>
              <p className="maven-pro  font-semibold">
                Price:{" "}
                <span className="font-normal">
                  {project.layouts[layoutIndex].price} Lacs
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleDownload}
                className="inline-block cursor-pointer maven-pro px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm transition"
              >
                Download Brochure
              </button>
              <button
                type="button"
                className="px-6 py-2 cursor-pointer maven-pro rounded-md text-white bg-yellow-600 hover:bg-yellow-700 shadow-sm transition"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* video section */}

      <section className="relative flex w-full px-5 md:px-16 py-12 bg-center bg-cover bg-[url('/img/carousel/Airica.jpg')] bg-fixed">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-20 mx-auto flex justify-center items-center w-full">
          <iframe
            className="w-full max-w-3xl aspect-video rounded-2xl shadow-2xl border border-white/20"
            src={`${project.videoLink}?autoplay=1&mute=1&loop=1&playlist=8uVQACW7uh4`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* gallery section */}
      <Gallery galleryItems={project.galleryImages} />

      {/* address */}

      <section className="relative px-6 md:px-16 py-12 bg-[url(/img/carousel/Codename-LIT.jpg)]  bg-fixed bg-cover">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="flex z-20 flex-col  md:flex-row md:space-x-12 gap-10 max-w-7xl mx-auto">
          {/* Address Section */}
          <div className="md:flex-1 relative text-gray-700 ">
            <div className="flex items-center justify-center w-full mb-12">
              <div className="flex-1 max-w-40 border-t-2 border-white" />
              <h2 className="mx-6 text-2xl font-bold uppercase text-white oswald_span tracking-widest">
                Address
              </h2>
              <div className="flex-1 max-w-40 border-t-2 border-white" />
            </div>

            <div className="flex  h-ful justify-center">
              <address className="mt-4   italic text-white/80 text-lg leading-relaxed font-semibold">
                <b>Samruddhi Plaza</b>,<br />
                Mira Bhayandar Rd,
                <br /> Medetiya Nagar, Queens Park,
                <br />
                Mira Road East, Mumbai, Mira Bhayandar,
                <br />
                Maharashtra 401105
              </address>
            </div>
          </div>

          {/* Map Section */}
          <div className="md:flex-1 relative rounded-lg overflow-hidden shadow-lg border border-black ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.789997379166!2d72.8604671743071!3d19.291496545173786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b033ecd6f705%3A0x41e29f1f4e08ba0a!2sDelta%20Yards%20Realty%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1759475201473!5m2!1sen!2sin"
              width="100%"
              height="350"
              className="w-full h-[350px] md:h-[400px]"
              allowFullScreen
              loading="lazy"
              title="Samruddhi Plaza Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* contact */}

      <section className="px-6 py-8 md:px-16 md:py-12 bg-gray-100 flex justify-center items-center min-h-screen">
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

      <Footer />
    </>
  );
};

export default Project;
