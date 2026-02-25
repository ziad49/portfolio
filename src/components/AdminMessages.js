import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function AdminMessages() {
  const { adminToken } = useOutletContext(); // token venant de AdminLayout
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setError("");

    if (!adminToken) {
      setMessages([]);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        headers: { "x-admin-token": adminToken },
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Erreur");
      setMessages(data);
    } catch {
      setError("Backend inaccessible");
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken]);

  const markRead = async (id, read) => {
    if (!adminToken) return;

    await fetch(`http://localhost:5000/api/messages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": adminToken,
      },
      body: JSON.stringify({ read }),
    });

    fetchMessages();
  };

  const del = async (id) => {
    if (!adminToken) return;

    await fetch(`http://localhost:5000/api/messages/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": adminToken },
    });

    fetchMessages();
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-900">Admin — Messages</h2>
      <p className="text-slate-600 mt-1">Liste des messages reçus.</p>

      {!adminToken && (
        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-slate-700">
            Entrez le token ci-dessus puis cliquez sur <b>Valider</b>.
          </p>
        </div>
      )}

      {error && <p className="text-red-700 font-semibold mt-4">{error}</p>}

      <div className="mt-8 grid gap-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`bg-white border rounded-xl p-5 shadow-sm ${
              m.read ? "border-slate-200" : "border-blue-300"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <p className="font-bold text-slate-900">{m.name}</p>
                <p className="text-sm text-slate-600">{m.email}</p>
              </div>
              <div className="text-sm text-slate-500">
                {new Date(m.createdAt).toLocaleString()}
              </div>
            </div>

            <p className="mt-3 text-slate-800">{m.message}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => markRead(m.id, !m.read)}
                className="px-4 py-2 rounded-lg border border-slate-300 font-semibold hover:bg-slate-50"
              >
                {m.read ? "Marquer non lu" : "Marquer lu"}
              </button>
              <button
                onClick={() => del(m.id)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}

        {adminToken && messages.length === 0 && !error && (
          <p className="text-slate-600">Aucun message.</p>
        )}
      </div>
    </div>
  );
}