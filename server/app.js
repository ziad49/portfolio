const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "messages.json");

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "ZIAD_ADMIN_TOKEN";

function requireAdmin(req, res, next) {
  const token = req.header("x-admin-token");
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}


function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readMessages() {
  ensureStorage();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // si le fichier est cassé, on repart sur un tableau vide
    return [];
  }
}

function saveMessages(messages) {
  ensureStorage();
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Champs manquants" });
  }
  if (!String(email).includes("@")) {
    return res.status(400).json({ error: "Email invalide" });
  }

  const newMsg = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
    read: false,
  };

  const all = readMessages();
  all.push(newMsg);
  saveMessages(all);

  console.log("Nouveau message enregistré :", newMsg.id);
  return res.json({ success: true, id: newMsg.id });
});

// Admin - lire tous les messages
app.get("/api/messages", requireAdmin, (req, res) => {
  const all = readMessages();
  // tri du plus récent au plus ancien
  all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(all);
});

// Admin - marquer comme lu/non lu
app.patch("/api/messages/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  const all = readMessages();
  const idx = all.findIndex((m) => m.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  all[idx].read = Boolean(read);
  saveMessages(all);
  res.json({ success: true, message: all[idx] });
});

//Admin - supprimer un message
app.delete("/api/messages/:id", requireAdmin, (req, res) => {
  const { id } = req.params;

  const all = readMessages();
  const next = all.filter((m) => m.id !== id);

  if (next.length === all.length) return res.status(404).json({ error: "Not found" });

  saveMessages(next);
  res.json({ success: true });
});


module.exports = { app, DATA_FILE, readMessages, saveMessages };
