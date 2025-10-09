import React, { useContext, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import About from "../components/About";
import Brands from "../components/Brands";
import FeaturedProjects from "../components/FeaturedProjects";
import HeroAbout from "../components/HeroAbout";
import Testimonials from "../components/Testimonials";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Faq from "../components/Faq";
import BackTotopBtn from "../components/BackTotopBtn";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { AppConetxt } from "../context/context";

const Home = () => {
  const { allProjects, galleryItems, allTestimonials, allBlogs } = useContext(AppConetxt);
  const[visibleTestimonials, setVisibleTestimonials] = useState([]);
  const[visibleBlogs, setVisibleBlogs] = useState([]);

  useEffect(() => {
    if (!allTestimonials || allTestimonials.length === 0) return;

    const getRandomTestimonials = () => {
      const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };

    const getRandomBlogs = () => {
      const shuffled = [...allBlogs].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };

    
    setVisibleTestimonials(getRandomTestimonials());
    setVisibleBlogs(getRandomBlogs());


    const interval = setInterval(() => {
      setVisibleTestimonials(getRandomTestimonials());
      setVisibleBlogs(getRandomBlogs());
    }, 5000);

    return () => clearInterval(interval);
  }, [allTestimonials]);

  return (
    <div>
      <Header />
      <Hero />
      <Brands />
      <FeaturedProjects projectBtn={true} projects={allProjects.slice(0, 8)} />
      <HeroAbout />
      <Gallery galleryItems={galleryItems} />
      <Testimonials allTestimonials={visibleTestimonials} />
      <Blog allBlogs={visibleBlogs} />
      <Faq />
      <Footer />
      <BackTotopBtn />
      <Contact />
    </div>
  );
};

export default Home;
