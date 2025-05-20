const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const sharp = require('../middlewares/sharp-config');

const bookCtrl = require('../controllers/bookController');
console.log("bookCtrl:", bookCtrl);
console.log('multer:', typeof uploadImage);
console.log('sharp:', typeof resizeImage);

router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getBookById);
router.get("/bestrating", bookCtrl.get3BestRatedBooks);

router.post("/", auth, multer, sharp, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

router.put("/:id", auth, multer, sharp, bookCtrl.updateBook);

router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
