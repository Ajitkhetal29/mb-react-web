import React from "react";
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

const Home = () => {
  return (
    <div>
      {/* <HeroCarousel />   */}
      <Header/>
      {/* <About /> */}
      <Hero/>
      <Brands />
      <FeaturedProjects />
      <HeroAbout />
       <Gallery />
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
