import { useState, useEffect, useContext } from "react";
import { AppConetxt } from "../context/context";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useContext(AppConetxt);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="siteHeader"
      className={`fixed font-md z-50 top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-black/20"
      }`}
    >
      <nav className="max-w-7xl  mx-auto flex items-center justify-between px-6 py-4 md:py-5">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center text-2xl font-extrabold text-white"
        >
          <img
            src="/img/logo/logo-white.png"
            alt="logo"
            className="h-10 w-auto max-w-[150px] object-contain"
          />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-white  select-none relative">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              {t("nav.Home")}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              {t("nav.About Us")}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allProjects"
              className={({ isActive }) =>
                `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              {t("nav.Projects")}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allBlogs"
              className={({ isActive }) =>
                `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              {t("nav.Blogs")}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allProjects#contact"
              className={({ isActive }) =>
                `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              {t("nav.Contact")}
            </NavLink>
          </li>
        </ul>

        {/* Language Switcher & Mobile Menu Button */}
        <div className="flex items-center space-x-3">
          <LanguageSwitcher />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden text-white text-3xl focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="relatuve flex flex-col mt-20 space-y-6 px-6 text-white font-semibold select-none">
          <span
            className="absolute top-5 cursor-pointer right-5 text-2xl"
            onClick={() => setMobileOpen(false)}
          >
            {" "}
            X
          </span>
          <NavLink
            to="/"
            className="py-2 border-b border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src="/img/logo/logo.png"
              alt="logo"
              className="h-10 w-auto max-w-[150px] object-contain"
            />{" "}
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                isActive ? "text-yellow-400" : "text-white"
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.Home")}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                isActive ? "text-yellow-400" : "text-white"
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.About Us")}
          </NavLink>
          <NavLink
            to="/allProjects"
            className={({ isActive }) =>
              `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                isActive ? "text-yellow-400" : "text-white"
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.Projects")}
          </NavLink>
          <NavLink
            to="/allBlogs"
            className={({ isActive }) =>
              `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                isActive ? "text-yellow-400" : "text-white"
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            {t('nav.Blogs')}
          </NavLink>
          <NavLink
            to="/allProjects#contact"
            className={({ isActive }) =>
              `hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400 ${
                isActive ? "text-yellow-400" : "text-white"
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.Contact")}
          </NavLink>
        </nav>
      </div>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-40 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;
