// src/data/portfolioData.js

export const profile = {
  name: "Ziad FREIJ",
  title: "Étudiant en école d’ingénieur",
  status: "Stage trouvé - En poste",
  location: "Brest - FRANCE",
  email: "ziadfr2002@gmail.com",
  phone: "+33 7 64 25 31 26",
};

export const experiences = [
  {
    date: "2025",
    company: "BUTEL SARL",
    role: "Stage - Développement application web de gestion",
    bullets: [
      "Développement d’une application web de gestion (clients, agents, contrats, sites, plannings).",
      "Mise en place d’une gestion des droits et traçabilité des données.",
      "Base de données relationnelle + interfaces CRUD.",
    ],
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
  },
  {
    date: "2023",
    company: "IBM Maroc",
    role: "Stage - Tableau de bord interne",
    bullets: [
      "Création d’un tableau de bord pour le suivi de projets.",
      "Affichage et filtrage dynamique de données.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
  },
];

export const projects = [
  {
    title: "Portfolio CI/CD (React + Jenkins)",
    period: "2026",
    description:
      "Portfolio moderne avec pipeline Jenkins, exécution de tests unitaires Jest et publication des rapports JUnit sur Jenkins.",
    stack: ["React", "Jest", "Jenkins", "GitHub"],
  },
  {
    title: "Développement d'un site web Full-Stack",
    period: "2025",
    description:
      "Conception et développement d’un site web interactif pour une association, permettant de suivre en temps réel l’installation de toilettes compostables au Sénégal.",
    stack: ["Laravel", "MySQL", "JavaScript"],
  },
  {
    title: "Projet IA accidents de la route",
    period: "2024",
    description:
      "Analyse et prédiction sur un dataset d’accidents (modèles IA + visualisation).",
    stack: ["Python", "R", "MySQL"],
  },
];

export const expertise = {
  skills: [
    { group: "Web", items: ["React", "HTML", "CSS", "JavaScript", "PHP", "SQL"] },
    { group: "DevOps / CI", items: ["Jenkins", "Git/GitHub", "ngrok"] },
    { group: "Data", items: ["Python", "R", "Power BI", "Google Analytics"] },
    { group: "Base de données", items: ["MySQL", "PostgreSQL", "Firebase"] },
    { group: "Outils", items: ["Figma", "Canva", "Office 365"] },
  ],
  languages: ["Français (courant)", "Anglais (courant)", "Arabe (courant)", "Espagnol (B1)"],
};
