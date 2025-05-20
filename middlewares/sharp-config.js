const sharp   = require('sharp');
const path    = require('path');
const fs      = require('fs');

const IMAGE_DIR = path.resolve('images');

// Assure‑toi que le dossier existe
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

const resizeImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    // crée un nom de fichier unique basé sur la date
    const timestamp = Date.now();
    const ext       = path.extname(req.file.originalname) || '.jpg';
    const filename  = `resized-${timestamp}${ext}`;
    const outputPath = path.join(IMAGE_DIR, filename);

    // sharp lit le buffer en entrée et écrit le fichier redimensionné
    await sharp(req.file.buffer)
      .resize({ width: 500 })
      .toFile(outputPath);

    // remplace les infos du fichier pour que BookController lise la bonne URL
    req.file.filename = filename;
    req.file.path     = outputPath;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = resizeImage;