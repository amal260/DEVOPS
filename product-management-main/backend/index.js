const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Importer cors
const app = express();
require("dotenv").config();

// Middleware pour activer CORS
app.use(cors()); // Ajouter cors comme middleware

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/stock_management";
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Exemple de route
app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

// Démarrer le serveur
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
