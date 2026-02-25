import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const [token, setToken] = useState("");
  const [submittedToken, setSubmittedToken] = useState("");
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-800 text-white" : "bg-white";

  return (
    <div className="px-[10%] py-10">
        <div className="mb-6">
        <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:underline"
        >
        ← Retour au portfolio
        </Link>
        </div>
      <h1 className="text-4xl font-extrabold mb-2">Admin</h1>
      <p className="text-gray-600 mb-8">Accès protégé par token.</p>

      {/* Token */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
        <label className="block text-sm font-semibold mb-2">Admin Token</label>

        <div className="flex gap-3">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Entrez le token admin"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={() => setSubmittedToken(token)}
            className="bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Valider
          </button>
        </div>
      </div>

      {/* Menu admin */}
      <div className="flex gap-3 mb-8">
        <Link
          to="/admin/messages"
          className={`px-4 py-2 rounded-xl border ${isActive("/admin/messages") || isActive("/admin")}`}
        >
          Messages
        </Link>
        <Link
          to="/admin/dashboard"
          className={`px-4 py-2 rounded-xl border ${isActive("/admin/dashboard")}`}
        >
          Dashboard
        </Link>
      </div>

      <Outlet context={{ adminToken: submittedToken }} />
    </div>
  );
}