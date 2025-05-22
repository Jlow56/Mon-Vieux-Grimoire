const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer-config');
// const resize  = require('../middlewares/sharp-config'); 
const resize = require('../middlewares/fake-sharp');

const bookCtrl = require('../controllers/bookController');
console.log(" router>book.js bookCtrl:", bookCtrl);
console.log(' router>book.js upload middleware:', typeof upload);   
console.log(' router>book.js resize middleware:', typeof resize);

router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getBookById);
router.get("/bestrating", bookCtrl.get3BestRatedBooks);

router.post('/', auth, upload, resize, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

router.put("/:id", auth, upload, resize, bookCtrl.updateBook);

router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
