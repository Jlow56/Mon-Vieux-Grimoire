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

// 4) Route de debug Sharp
// const sharp = require('sharp');
// console.log('🔧 Route GET /debug/sharp initialisée');
// app.get('/debug/sharp', async (req, res) => {
//   console.log('🔔  /debug/sharp appelée');
//   try {
//     const buffer = await sharp({
//       create: { width: 50, height: 50, channels: 3, background: 'blue' }
//     }).png().toBuffer();
//     console.log('✅ Buffer généré, longueur =', buffer.length);

//     // Écrit directement l’image sur disque pour tester
//     const outDir  = path.resolve(__dirname, 'images');
//     const outFile = path.join(outDir, `debug-${Date.now()}.png`);
//     const fs      = require('fs');
//     fs.writeFileSync(outFile, buffer);
//     console.log('✅ Image debug écrite dans', outFile);

//     return res.json({ ok: true, file: outFile });
//   } catch (err) {
//     console.error('❌ Erreur dans /debug/sharp :', err.stack || err);
//     return res.status(500).send(err.stack || err.message);
//   }
// });

// 5) Routes de l’API
app.use('/api/auth', userRouter);
app.use('/api/books', bookRoutes);

// 6) Middleware global d’erreurs
app.use((err, req, res, next) => {
  console.error('🔴 Erreur attrapée par Express :', err.stack || err);
  res.status(500).json({ error: err.message });
});

module.exports = app;