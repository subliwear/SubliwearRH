const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API SubliRH' });
});

// Port d'écoute
const PORT = process.env.PORT || 5000;

// Connexion à la base de données et démarrage du serveur
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sublirh', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connecté à MongoDB');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err);
  }); 