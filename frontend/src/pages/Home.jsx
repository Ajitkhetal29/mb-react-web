import React, { useContext, useState } from "react";
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

  const {Projects, galleryItems} = useContext(AppConetxt);
  

  return (
    <div>
      <Header/>
      <Hero/>
      <Brands />
      <FeaturedProjects projectBtn={true} projects={Projects.slice(0,8)} />
      <HeroAbout />
       <Gallery  galleryItems={galleryItems} />
      <Testimonials />
      <Blog />
      <Faq/>
      <Footer />
      <BackTotopBtn/>
      <Contact/>
    </div>
  );
};

export default Home;
