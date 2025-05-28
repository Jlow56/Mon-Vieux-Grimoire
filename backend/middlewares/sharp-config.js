const sharp = require("sharp");
const path  = require("path");
const fs    = require("fs");

const IMAGE_DIR = path.resolve(__dirname, "..", "images");
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

const MIME_TYPES = {
  "image/jpg":  "jpg",
  "image/jpeg": "jpg",
  "image/png":  "png",
  "image/webp": "webp",
};

const resize = (req, res, next) => {
  if (!req.file) return next();
  const ext = MIME_TYPES[req.file.mimetype];
  if (!ext) return next(new Error("Type de fichier non supporté pour Sharp"));

  const filename = `resized-${Date.now()}.${ext}`;
  const outputPath = path.join(IMAGE_DIR, filename);

  sharp(req.file.buffer)
    .resize({ width: 410, height : 570 })
    .toBuffer()
    .then(buffer => {
      fs.writeFile(outputPath, buffer, err => {
        if (err) return next(err);
        req.file.filename = filename;
        req.file.path = outputPath;
        console.log(`✅ sharp-config: image enregistrée sous ${filename}`);
        next();
      });
    })
    .catch(next);
};

module.exports = resize;