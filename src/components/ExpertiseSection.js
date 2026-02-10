import React from "react";
import { expertise } from "../data/portfolioData";

const Badge = ({ children }) => (
  <span className="text-xs font-semibold bg-blue-50 text-blue-900 px-3 py-1 rounded-full border border-blue-100">
    {children}
  </span>
);

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="py-16 scroll-mt-24">
      <h2 className="text-2xl font-extrabold text-slate-900">Expertise</h2>
      <p className="text-slate-600 mt-2">
        Compétences techniques et langues.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
          {expertise.skills.map((block, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900">{block.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {block.items.map((it, i) => (
                  <Badge key={i}>{it}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-900">Langues</h3>
          <ul className="mt-4 space-y-2 text-slate-700">
            {expertise.languages.map((l, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
