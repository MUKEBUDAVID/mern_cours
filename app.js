const express = require("express");
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/Stuff.js");
const userRoutes = require("./routes/User.js");
const path = require('path');
const { log } = require("console");

// Charger dotenv le plus tôt possible
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});
 

// Connexion MongoDB avec options améliorées
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => {
  console.error('Connexion à MongoDB échouée !', err);
  process.exit(1);
});

// Routes
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;