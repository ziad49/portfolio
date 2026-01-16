import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react'; // Import des icônes
import { getProfileData } from '../logic';

const Hero = () => {
  const status = getProfileData(new Date().getFullYear());

  return (
    <section className="hero-container">
      <div className="hero-content-wrapper">
        <div className="hero-text">
          <h1 className="name-title">Ziad REIJ</h1>
          <h2 className="job-subtitle">Étudiant en école d’ingénieur</h2>
          
          {/* <div className="availability-tag">
            <span>Disponible à partir d'Avril 2026</span>
          </div> */}

          <p className="description-text">
            Étudiant en école d’ingénieur, passionné par le développement des logiciels et la création de
            solutions technologiques. Mon objectif est de m’investir pleinement dans les missions qui
            me seront confiées, en apportant mes compétences en développement au service de
            l’entreprise. Cela me permettra également de consolider mes acquis et d’appliquer mes
            connaissances académiques dans un cadre professionnel.
          </p>

          <div className="contact-grid">
            <div className="contact-item">
              <MapPin size={20} />
              <span>Brest - FRANCE</span>
            </div>
            <div className="contact-item">
              <Mail size={20} />
              <span>ziadfr2002@gmail.com</span>
            </div>
            <div className="contact-item">
              <Phone size={20} />
              <span>+33 7 64 25 31 26</span>
            </div>
          </div>
        </div>

        {/* Le cercle avec les initiales, sans les badges de build */}
        <div className="profile-section">
          <div className="avatar-circle">
            <span>ZF</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;