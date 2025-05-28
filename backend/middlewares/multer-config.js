const multer = require('multer');
const fs    = require('fs');
const path  = require('path');

const MIME_TYPES = {
  'image/jpg':  'jpg',
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp'
};
const MAX_SIZE   = 10 * 1024 * 1024; // 10 Mo
const IMAGE_DIR  = path.resolve('images');

if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    MIME_TYPES[file.mimetype]
      ? cb(null, true)
      : cb(new Error('Type de fichier non supporté'), false);
  }
}).single('image');

module.exports = upload;