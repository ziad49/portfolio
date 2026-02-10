import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  
    useEffect(() => {
    const sections = ["home", "experience", "projects", "expertise", "contact"];
    const navOffset = 120; // hauteur navbar + marge

    const handleScroll = () => {
    const navOffset = 120;
    const scrollPos = window.scrollY + navOffset;

    // ✅ Si on est tout en bas, on force "contact"
    const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

    if (nearBottom) {
        setActiveSection("contact");
        return;
    }

    let current = "home";
    for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;

        if (el.offsetTop <= scrollPos) {
        current = section;
        }
    }

    setActiveSection(current);
    };


    handleScroll(); // important au chargement
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);


  
  const getLinkStyle = (section) => {
    return activeSection === section
      ? "bg-blue-800 px-4 py-2 rounded-md transition-all duration-300 shadow-inner" // Style encadré
      : "hover:text-blue-300 transition-colors duration-300 px-4 py-2"; // Style normal
  };

  return (
    <nav className="bg-blue-900 text-white py-4 px-[10%] flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="font-extrabold text-2xl tracking-tight">ZF</span>
        <div className="h-6 w-[2px] bg-blue-400 mx-2"></div>
        <span className="text-sm font-light text-blue-200 uppercase tracking-widest">Portfolio</span>
      </div>

      <ul className="flex items-center gap-2 text-sm font-semibold">
        <li><a href="#home" className={getLinkStyle('home')}>Accueil</a></li>
        <li><a href="#experience" className={getLinkStyle('experience')}>Expériences Pro</a></li>
        <li><a href="#projects" className={getLinkStyle('projects')}>Projets</a></li>
        <li><a href="#expertise" className={getLinkStyle('expertise')}>Expertise</a></li>
        <li><a href="#contact" className={getLinkStyle('contact')}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;