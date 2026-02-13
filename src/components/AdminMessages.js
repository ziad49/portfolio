import React, { useEffect, useState } from "react";

export default function AdminMessages() {
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Erreur");
      setMessages(data);
    } catch {
      setError("Backend inaccessible");
    }
  };

  const saveToken = async () => {
    localStorage.setItem("adminToken", token);
    await fetchMessages();
  };

  const markRead = async (id, read) => {
    await fetch(`http://localhost:5000/api/messages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ read }),
    });
    fetchMessages();
  };

  const del = async (id) => {
    await fetch(`http://localhost:5000/api/messages/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
    fetchMessages();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-[10%] py-10">
      <h1 className="text-2xl font-extrabold text-slate-900">Admin — Messages</h1>
      <p className="text-slate-600 mt-1">Accès protégé par token.</p>

      <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5 max-w-2xl">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Admin Token
        </label>
        <div className="flex gap-2">
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg px-4 py-2"
            placeholder="Entrez le token admin"
          />
          <button
            onClick={saveToken}
            className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            Valider
          </button>
        </div>

        {error && <p className="text-red-700 font-semibold mt-3">{error}</p>}
      </div>

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

        {token && messages.length === 0 && (
          <p className="text-slate-600">Aucun message.</p>
        )}
      </div>
    </div>
  );
}
