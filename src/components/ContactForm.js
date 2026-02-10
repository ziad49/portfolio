import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", msg: data.error || "Erreur" });
      } else {
        setStatus({ type: "success", msg: "Message envoyé ✅" });
        setForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Backend inaccessible (serveur éteint ?)" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 scroll-mt-32">
      <h2 className="text-3xl font-extrabold text-slate-900">Contact</h2>
      <p className="text-slate-600 mt-2">
        Une question, une opportunité, un échange ? Écrivez-moi.
      </p>

      <div className="mt-8 bg-white border border-slate-200 rounded-xl shadow-sm p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Nom
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Votre nom"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="exemple@mail.com"
              type="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Votre message..."
              required
            />
          </div>

          <button
            disabled={loading}
            className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>

          {status.msg && (
            <p
              className={`text-sm font-semibold ${
                status.type === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
