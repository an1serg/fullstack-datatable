const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.post('/books', bookController.createBook);
router.get('/books', bookController.getBooks);
router.get('/books', bookController.getBookByUser);
router.put('/books', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
