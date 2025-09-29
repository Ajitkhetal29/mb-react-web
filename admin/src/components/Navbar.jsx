import { useState, useEffect, useContext } from "react";
import { AppConetxt } from "../context/context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { logout } = useContext(AppConetxt);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="siteHeader"
      className={`z-50 w-full bg-black transition-colors duration-300 ${
        scrolled ? "fixed top-0 left-0" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <NavLink to="/dashboard" className="text-2xl font-bold text-white flex items-center">
          <img
            src="/img/logo/logo.png"
            alt="logo"
            className="h-10 w-auto max-w-[150px]"
          />
        </NavLink>

        <ul className="hidden md:flex space-x-8 text-white font-medium relative">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-yellow-200" : "text-white"
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allProjects"
              className={({ isActive }) =>
                isActive ? "text-yellow-200" : "text-white"
              }
            >
              Projects
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive ? "text-yellow-200" : "text-white"
              }
            >
              Blogs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/testimonials"
              className={({ isActive }) =>
                isActive ? "text-yellow-200" : "text-white"
              }
            >
              Testimonials
            </NavLink>
          </li>
        </ul>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-2 rounded cursor-pointer border border-black"
        >
          Logout
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white text-3xl"
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden text-white text-center shadow px-4 pb-4 overflow-x-hidden">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block py-2 sm:border-b ${isActive ? "text-yellow-200" : "text-white"}`
            }
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/allProjects"
            className={({ isActive }) =>
              `block py-2 sm:border-b ${isActive ? "text-yellow-200" : "text-white"}`
            }
            onClick={() => setMobileOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `block py-2 sm:border-b ${isActive ? "text-yellow-200" : "text-white"}`
            }
            onClick={() => setMobileOpen(false)}
          >
            Blogs
          </NavLink>
          <NavLink
            to="/testimonials"
            className={({ isActive }) =>
              `block py-2 sm:border-b ${isActive ? "text-yellow-200" : "text-white"}`
            }
            onClick={() => setMobileOpen(false)}
          >
            Testimonials
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;