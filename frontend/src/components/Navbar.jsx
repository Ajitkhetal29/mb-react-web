import { useState, useEffect, useContext } from "react";
import { AppConetxt } from "../context/context";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

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
      className={`fixed z-50 top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-5">
        {/* Logo */}
        <a
          href="#"
          className="flex  items-center text-2xl font-extrabold text-white"
        >
          <img
            src="/img/logo/logo.png"
            alt="logo"
            className="h-10 w-auto max-w-[150px] object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-white font-semibold select-none relative">
          <li>
            <a
              href="#"
              className="hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400"
            >
              {t("nav.Home")}
            </a>
          </li>

          <li>
            <a
              href="#"
              className="hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400"
            >
              {t("nav.About Us")}
            </a>
          </li>

          <li>
            <a
              href="#"
              className="hover:text-yellow-400 maven-pro transition-colors duration-300 focus:outline-none focus:text-yellow-400"
            >
              {t("nav.Projects")}
            </a>
          </li>

          <li>
            <a
              href="#"
              className="hover:text-yellow-400  transition-colors duration-300 focus:outline-none focus:text-yellow-400"
            >
              {t("nav.Contact")}
            </a>
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
          <a
            href="#"
            className="py-2 border-b border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src="/img/logo/logo.png"
              alt="logo"
              className="h-10 w-auto max-w-[150px] object-contain"
            />{" "}
          </a>
          <a
            href="#"
            className="py-2 border-b border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.Home")}
          </a>
          <a
            href="#"
            className="py-2 border-b border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.About Us")}
          </a>
          <a
            href="#"
            className="py-2 border-b border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.Projects")}
          </a>
          <a
            href="#"
            className="py-2 border-b border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.Contact")}
          </a>
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
