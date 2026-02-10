import React from "react";
import { profile } from "../data/portfolioData";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 scroll-mt-24">
      <h2 className="text-2xl font-extrabold text-slate-900">Contact</h2>
      <p className="text-slate-600 mt-2">
        Une question, une opportunité, un échange ? Contactez-moi.
      </p>

      <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-slate-500">Localisation</p>
            <p className="text-slate-900 font-semibold">{profile.location}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">Email</p>
            <a
              className="text-blue-700 font-semibold hover:underline"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">Téléphone</p>
            <a
              className="text-blue-700 font-semibold hover:underline"
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
            >
              {profile.phone}
            </a>
          </div>

          <div className="flex gap-3 sm:justify-end sm:items-end">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition"
            >
              Envoyer un email
            </a>
            <a
              href="#home"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition"
            >
              Retour en haut
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
