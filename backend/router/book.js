const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer-config');
const resize  = require('../middlewares/sharp-config'); 

const bookCtrl = require('../controllers/bookController');

router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.get3BestRatedBooks);
router.get("/:id", bookCtrl.getBookById);


router.post('/', auth, upload, resize, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

router.put("/:id", auth, upload, resize, bookCtrl.updateBook);

router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
