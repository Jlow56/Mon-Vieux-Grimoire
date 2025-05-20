const multer = require('multer');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  'image/jpg':  'jpg',
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
};

const MAX_SIZE = 10 * 1024 * 1024; // 10 Mo
const IMAGE_DIR = path.resolve('images');// Je m'assure que le dossier existe

if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });// crée aussi les dossiers parents si besoin

}

exports.multer = multer({
  storage: multer.memoryStorage(), // traitement en mémoire avant conversion, stockes le fichier en mémoire (dans un buffer RAM, pas sur le disque).
  limits: { fileSize: MAX_SIZE },  // limite pour éviter OOM
  fileFilter: (req, file, cb) => { //cb = callback
    MIME_TYPES[file.mimetype]
      ? cb(null, true)
      : cb(new Error('Type de fichier non supporté'), false);
  }
}).single('image');    

module.exports = multer;