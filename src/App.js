import React from 'react';
import { getAvailability } from './logic'; 
import './App.css';

function App() {
  const currentYear = new Date().getFullYear();
  const statusBadge = getAvailability(currentYear);

  return (
    <div className="portfolio">
      {/* Barre de navigation */}
      <nav className="navbar">
        <h1 className="logo">Ziad FREIJ</h1>
        <ul className="nav-links">
          <li><a href="#about">À propos</a></li>
          <li><a href="#skills">Compétences</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Section Accueil (Hero) */}
      <header className="hero">
        <div className="hero-content">
          <h2>Ingénieur en Développement Logiciel</h2>
          <p>Étudiant à l'ISEN | Passionné par l'innovation et le Cloud</p>
          <span className="status-tag">{statusBadge}</span>
        </div>
      </header>

      {/* Section À propos */}
      <section id="about" className="section">
        <h3>À propos de moi</h3>
        <p>
          Actuellement étudiant en cycle ingénieur, je me spécialise dans la création 
          d'architectures logicielles robustes et l'automatisation des processus (CI/CD).
        </p>
      </section>

      {/* Section Compétences */}
      <section id="skills" className="section light-bg">
        <h3>Mes Compétences</h3>
        <div className="skills-container">
          <div className="skill-card">React / JS</div>
          <div className="skill-card">Node.js</div>
          <div className="skill-card">Jenkins / DevOps</div>
          <div className="skill-card">Git / GitHub</div>
        </div>
      </section>

      {/* Pied de page / Contact */}
      <footer id="contact" className="footer">
        <h3>Me contacter</h3>
        <p>Email : ziad.freij@isen.fr</p>
        <p>© 2026 - Portfolio automatisé via Jenkins</p>
      </footer>
    </div>
  );
}

export default App;