import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import ExpertiseSection from "./components/ExpertiseSection";
import ContactForm from "./components/ContactForm";
import AdminMessages from "./components/AdminMessages";

import "./App.css";

function PortfolioPage() {
  return (
    <div className="portfolio">
      <Navbar />
      <Hero />
      <div className="px-[10%]">
        <ExperienceSection />
        <ProjectsSection />
        <ExpertiseSection />
        <ContactForm />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin" element={<AdminMessages />} />
      </Routes>
    </BrowserRouter>
  );
}
