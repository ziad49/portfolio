import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function AdminDashboard() {
  const { adminToken } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setError("");

    if (!adminToken) {
      setMessages([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/messages", {
        headers: { "x-admin-token": adminToken },
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Erreur");
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setError("Backend inaccessible");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken]);

  // Helpers
  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const days = useMemo(() => {
    // 7 derniers jours, du plus ancien au plus récent
    const res = [];
    const today = startOfDay(new Date());
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      res.push(d);
    }
    return res;
  }, []);

  const stats = useMemo(() => {
    const total = messages.length;
    const unread = messages.filter((m) => !m.read).length;
    const read = total - unread;

    // messages sur 7 jours (par jour)
    const byDay = days.map((day) => {
      const dayStart = new Date(day);
      const dayEnd = new Date(day);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const count = messages.filter((m) => {
        const t = new Date(m.createdAt);
        return t >= dayStart && t < dayEnd;
      }).length;

      return { day, count };
    });

    const last7Total = byDay.reduce((s, x) => s + x.count, 0);
    const max = Math.max(1, ...byDay.map((x) => x.count)); // éviter division par 0

    // top domaines email
    const domainCount = {};
    for (const m of messages) {
      const email = String(m.email || "");
      const domain = email.includes("@") ? email.split("@")[1].toLowerCase() : "inconnu";
      domainCount[domain] = (domainCount[domain] || 0) + 1;
    }
    const topDomains = Object.entries(domainCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([domain, count]) => ({ domain, count }));

    return { total, unread, read, byDay, last7Total, max, topDomains };
  }, [messages, days]);

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-900">Dashboard</h2>
      <p className="text-slate-600 mt-1">Statistiques sur les messages reçus.</p>

      {!adminToken && (
        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-slate-700">
            Entrez le token ci-dessus puis cliquez sur <b>Valider</b> pour charger les stats.
          </p>
        </div>
      )}

      {error && <p className="text-red-700 font-semibold mt-4">{error}</p>}

      {adminToken && (
        <>
          <div className="mt-6 flex items-center gap-2">
            <button
              onClick={fetchMessages}
              className="px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800"
            >
              Rafraîchir
            </button>
            {loading && <span className="text-slate-600">Chargement...</span>}
          </div>

          {/* KPI cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KpiCard title="Total messages" value={stats.total} />
            <KpiCard title="Non lus" value={stats.unread} accent />
            <KpiCard title="Lus" value={stats.read} />
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 7 derniers jours */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">Activité (7 jours)</h3>
                  <p className="text-sm text-slate-600">
                    Total 7 jours : <b>{stats.last7Total}</b>
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-2 items-end">
                {stats.byDay.map(({ day, count }) => {
                  const h = Math.round((count / stats.max) * 100);
                  const label = day.toLocaleDateString("fr-FR", { weekday: "short" });
                  return (
                    <div key={day.toISOString()} className="flex flex-col items-center gap-2">
                      <div className="text-xs text-slate-500">{count}</div>
                      <div className="w-full h-24 bg-slate-100 rounded-lg flex items-end overflow-hidden">
                        <div
                          className="w-full bg-blue-800"
                          style={{ height: `${h}%` }}
                          title={`${label}: ${count}`}
                        />
                      </div>
                      <div className="text-xs text-slate-600">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top domaines */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-slate-900">Top domaines email</h3>
              <p className="text-sm text-slate-600">Ex: gmail.com, outlook.com…</p>

              <div className="mt-4 space-y-3">
                {stats.topDomains.length === 0 ? (
                  <p className="text-slate-600">Aucune donnée.</p>
                ) : (
                  stats.topDomains.map((d) => (
                    <div key={d.domain} className="flex items-center justify-between">
                      <div className="text-slate-800 font-semibold">{d.domain}</div>
                      <div className="text-slate-600">{d.count}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function KpiCard({ title, value, accent = false }) {
  return (
    <div
      className={`bg-white border rounded-xl p-5 ${
        accent ? "border-blue-300" : "border-slate-200"
      }`}
    >
      <div className="text-sm text-slate-600">{title}</div>
      <div className="mt-2 text-3xl font-extrabold text-slate-900">{value}</div>
    </div>
  );
}