const express   = require('express');
const connectDB = require('./config/database');
const cors      = require('cors');
const path      = require('path');

const userRouter = require('./router/user');
const bookRoutes = require('./router/book');

const app = express();

// 1) Connexion à MongoDB
connectDB();

app.use('/images', express.static(path.join(__dirname, 'images')));

// 2) Middlewares de base
app.use(express.json());
app.use(cors({ origin: '*' }));

// 3) CORS global
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// 4) Routes de l’API
app.use('/api/auth', userRouter);
app.use('/api/books', bookRoutes);

// ) Middleware global d’erreurs
app.use((err, req, res, next) => {
  console.error('🔴 Erreur attrapée par Express :', err.stack || err);
  res.status(500).json({ error: err.message });
});

module.exports = app;