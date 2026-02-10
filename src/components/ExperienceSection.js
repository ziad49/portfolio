import React from "react";
import { experiences } from "../data/portfolioData";

const Badge = ({ children }) => (
  <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-100">
    {children}
  </span>
);

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 scroll-mt-24">
      <h2 className="text-2xl font-extrabold text-slate-900">Expériences professionnelles</h2>
      <p className="text-slate-600 mt-2">
        Stages et projets en développement logiciel / web.
      </p>

      <div className="mt-8 grid gap-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                <p className="text-slate-700">{exp.company}</p>
              </div>
              <div className="text-sm font-semibold text-slate-500">{exp.date}</div>
            </div>

            <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-1">
              {exp.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {exp.stack.map((t, i) => (
                <Badge key={i}>{t}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
