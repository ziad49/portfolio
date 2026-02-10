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
  };

  const all = readMessages();
  all.push(newMsg);
  saveMessages(all);

  console.log("Nouveau message enregistré :", newMsg.id);
  return res.json({ success: true, id: newMsg.id });
});

module.exports = { app, DATA_FILE, readMessages, saveMessages };
