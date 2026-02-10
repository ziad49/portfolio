const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test (important)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Route contact (sera utilisée par le formulaire)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  console.log('Nouveau message :', { name, email, message });

  res.json({ success: true });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
