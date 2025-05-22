
const sharp  = require('sharp');
const resize = require('./middlewares/sharp-config');

// 1) Génère un buffer PNG 100×100
(async () => {
  try {
    const buffer = await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 3,
        background: { r: 255, g: 255, b: 255 }
      }
    })
    .png()
    .toBuffer();

    // 2) Simule req.file
    const req = { file: { buffer, mimetype: 'image/png' } };
    const res = {};

    // 3) Promettons-nous de terminer après next()
    await new Promise((resolve, reject) => {
      resize(req, res, err => {
        if (err) return reject(err);
        console.log('✅ Sharp a réussi, filename =', req.file.filename);
        resolve();
      });
    });
  } catch (err) {
    console.error('❌ Erreur durant le test Sharp :', err);
    process.exit(1);
  }
})();