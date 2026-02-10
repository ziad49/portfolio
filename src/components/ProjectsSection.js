import React from "react";
import { projects } from "../data/portfolioData";

const Tag = ({ children }) => (
  <span className="text-xs font-semibold bg-slate-50 text-slate-800 px-3 py-1 rounded-full border border-slate-200">
    {children}
  </span>
);

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 scroll-mt-32">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-slate-900">Projets</h2>
        <p className="text-slate-600">
          Une sélection de projets (web, CI/CD, data).
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((p, idx) => (
          <article
            key={idx}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
          >
            <header className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
              {p.period && (
                <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">
                  {p.period}
                </span>
              )}
            </header>

            <p className="mt-3 text-slate-700">{p.description}</p>

            {p.stack?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t, i) => (
                  <Tag key={i}>{t}</Tag>
                ))}
              </div>
            )}

            {/* Optionnel : boutons si tu ajoutes des liens dans tes données */}
            {(p.github || p.demo) && (
              <div className="mt-6 flex gap-3">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition"
                  >
                    GitHub
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition"
                  >
                    Démo
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
