const fs   = require('fs');
const path = require('path');
const IMAGE_DIR = path.resolve(__dirname, '..', 'images');

module.exports = (req, res, next) => {
  if (!req.file) return next();
  const filename = `fake-${Date.now()}.bin`;
  const out = path.join(IMAGE_DIR, filename);
  fs.writeFile(out, req.file.buffer, err => {
    if (err) {
      console.error('❌ writeFile error:', err);
      return next(err);
    }
    console.log('✅ writeFile OK, créé =', filename);
    req.file.filename = filename;
    req.file.path = out;
    next();
  });
};