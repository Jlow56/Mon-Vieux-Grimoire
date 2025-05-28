// 1) Handlers globaux pour attraper tout crash
process.on('uncaughtException', err => {
  console.error('💥 Uncaught Exception:', err.stack || err);
  process.exit(1);
});
process.on('unhandledRejection', reason => {
  console.error('🔥 Unhandled Rejection:', reason.stack || reason);
  process.exit(1);
});

const http   = require('http');
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

// 2) Normalisation du port
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port))   return val;
  if (port >= 0)     return port;
  return false;
};
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

// 3) Création du serveur
const server = http.createServer(app);

// 4) Gestion des erreurs de démarrage
server.on('error', error => {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
});

// 5) Quand le serveur écoute
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? addr : addr.port;
  console.log(`⚙️  Serveur en écoute sur port ${bind}`);
});

// 6) Démarrage
console.log(`🚀 Démarrage du serveur sur le port ${port}`);
server.listen(port);

