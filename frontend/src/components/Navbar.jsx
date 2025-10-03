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

          {/* Projects Dropdown Mega Menu */}
          <li className="group relative">
            <button
              className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300 focus:outline-none focus:text-yellow-400"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="maven-pro">{t("nav.Projects")}</span>
              <svg
                className="w-4  h-4 transform transition-transform duration-300 group-hover:-rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div
              className="absolute left-1/2 top-full origin-top -translate-x-1/2 w-[90vw] max-w-6xl bg-gray-900/95 shadow-2xl rounded-lg p-8 mt-3 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out max-h-[calc(100vh-80px)] overflow-y-auto z-50"
              role="menu"
              aria-label="Projects submenu"
            >
              {[1, 2, 3].map((section) => (
                <div
                  key={section}
                  className="grid grid-cols-4 gap-6 mb-6 last:mb-0"
                >
                  {[...Array(4)].map((_, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="block group text-center focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                      role="menuitem"
                    >
                      <img
                        src="/img/pages/home-2.jpg"
                        alt={`Project ${idx + 1}`}
                        className="rounded-lg mb-2 w-full h-28 object-cover group-hover:brightness-110 transition"
                      />
                      <p className="text-sm text-white group-hover:text-yellow-400 truncate">
                        {`Luxury Duplex ${idx + 1}`}
                      </p>
                    </a>
                  ))}
                </div>
              ))}
            </div>
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
