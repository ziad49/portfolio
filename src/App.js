import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ExpertiseSection from './components/ExpertiseSection';
import ContactSection from './components/ContactSection';

import './App.css';

function App() {
  return (
    <div className="portfolio">
      <Navbar />
      <Hero />

      <main className="px-[10%]">
        <ExperienceSection />
        <ProjectsSection />
        <ExpertiseSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
