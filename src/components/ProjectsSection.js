import React, { useEffect, useState } from "react";

const Tag = ({ children }) => (
  <span className="text-xs font-semibold bg-slate-50 text-slate-800 px-3 py-1 rounded-full border border-slate-200">
    {children}
  </span>
);

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR");
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mets ici l’URL de ton backend (en prod tu pourras le mettre en .env)
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${API_BASE}/api/github/projects`);
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error || "Impossible de charger les projets GitHub.");
          setProjects([]);
          return;
        }

        setProjects(Array.isArray(data.projects) ? data.projects : []);
      } catch (e) {
        setError("Impossible de charger les projets GitHub (backend ou GitHub indisponible).");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section id="projects" className="py-16 scroll-mt-32">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-slate-900">Projets</h2>
        <p className="text-slate-600">
          Projets chargés automatiquement depuis GitHub (via mon backend).
        </p>
      </div>

      {loading && (
        <p className="mt-6 text-slate-600 font-semibold">Chargement des projets...</p>
      )}

      {!loading && error && (
        <p className="mt-6 text-red-700 font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((p, idx) => (
            <article
              key={p.url || idx}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
            >
              <header className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>

                {p.updatedAt && (
                  <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">
                    Maj: {formatDate(p.updatedAt)}
                  </span>
                )}
              </header>

              <p className="mt-3 text-slate-700">
                {p.description ? p.description : "—"}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.language && <Tag>{p.language}</Tag>}
                <Tag>⭐ {p.stars ?? 0}</Tag>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition"
                >
                  GitHub
                </a>

                {p.homepage && (
                  <a
                    href={p.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition"
                  >
                    Démo
                  </a>
                )}
              </div>
            </article>
          ))}

          {projects.length === 0 && (
            <p className="text-slate-600">Aucun projet trouvé.</p>
          )}
        </div>
      )}
    </section>
  );
}