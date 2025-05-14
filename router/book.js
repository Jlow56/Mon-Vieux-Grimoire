const exports = require('express');
const router = exports.Router();
const bookCtrl = require('../controllers/bookController');

router.get('/books', bookCtrl.getBooks);
router.get('/books/:id', bookCtrl.getBookById);
router.get('/books/bestrating', bookCtrl.getBestRatedBooks);
router.post('/books', bookCtrl.createBook);
router.post('/books/:id/rate', bookCtrl.rateBook);
router.put('/books/:id', bookCtrl.updateBook);
router.delete('/books/:id', bookCtrl.deleteBook);

module.exports = router;