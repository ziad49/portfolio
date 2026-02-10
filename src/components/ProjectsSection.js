import React from "react";
import { projects } from "../data/portfolioData";

const Badge = ({ children }) => (
  <span className="text-xs font-semibold bg-slate-50 text-slate-800 px-3 py-1 rounded-full border border-slate-200">
    {children}
  </span>
);

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 scroll-mt-24">
      <h2 className="text-2xl font-extrabold text-slate-900">Projets</h2>
      <p className="text-slate-600 mt-2">
        Une sélection de projets techniques (web, CI/CD, data).
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((p, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
              <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">{p.period}</span>
            </div>

            <p className="mt-3 text-slate-700">{p.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((t, i) => (
                <Badge key={i}>{t}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
