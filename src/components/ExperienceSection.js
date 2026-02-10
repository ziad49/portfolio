import React from "react";
import { experiences } from "../data/portfolioData";

const Tag = ({ children }) => (
  <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-100">
    {children}
  </span>
);

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 scroll-mt-32">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-slate-900">Expériences Pro</h2>
        <p className="text-slate-600">
          Stages et missions de développement logiciel / web.
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        {experiences.map((exp, idx) => (
          <article
            key={idx}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
          >
            <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                <p className="text-slate-700 font-medium">{exp.company}</p>
              </div>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span>{exp.date}</span>
              </div>
            </header>

            {exp.bullets?.length > 0 && (
              <ul className="mt-4 space-y-2 text-slate-700">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {exp.stack?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {exp.stack.map((t, i) => (
                  <Tag key={i}>{t}</Tag>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
