import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  // scroll spy uniquement sur la page "/"
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const sections = ["home", "experience", "projects", "expertise", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const getLinkStyle = (section) =>
    activeSection === section
      ? "bg-blue-800 px-4 py-2 rounded-md transition-all duration-300 shadow-inner"
      : "hover:text-blue-300 transition-colors duration-300 px-4 py-2";

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      // si on est sur /admin => on revient à / puis on scroll
      navigate("/");
      setTimeout(() => scrollTo(id), 50);
    } else {
      scrollTo(id);
    }
  };

  return (
    <nav className="bg-blue-900 text-white py-4 px-[10%] flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <Link to="/" className="flex items-center gap-2">
        <span className="font-extrabold text-2xl tracking-tight">ZF</span>
        <div className="h-6 w-[2px] bg-blue-400 mx-2"></div>
        <span className="text-sm font-light text-blue-200 uppercase tracking-widest">Portfolio</span>
      </Link>

      <ul className="flex items-center gap-2 text-sm font-semibold">
        <li><button onClick={() => handleNavClick("home")} className={getLinkStyle("home")}>Accueil</button></li>
        <li><button onClick={() => handleNavClick("experience")} className={getLinkStyle("experience")}>Expériences Pro</button></li>
        <li><button onClick={() => handleNavClick("projects")} className={getLinkStyle("projects")}>Projets</button></li>
        <li><button onClick={() => handleNavClick("expertise")} className={getLinkStyle("expertise")}>Expertise</button></li>
        <li><button onClick={() => handleNavClick("contact")} className={getLinkStyle("contact")}>Contact</button></li>

        {/* ✅ nouveau lien */}
        <li>
          <Link
            to="/admin"
            className={
              location.pathname === "/admin"
                ? "bg-blue-800 px-4 py-2 rounded-md shadow-inner"
                : "hover:text-blue-300 transition-colors duration-300 px-4 py-2"
            }
          >
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;