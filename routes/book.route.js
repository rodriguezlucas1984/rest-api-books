const { Router } = require('express');
const router = Router();
const books = require('../Books.json');
const _ = require('lodash');

router.get('/books', (req, res) => {
    res.json(books);
});

router.post('/books', (req, res) => {
    const { name, authorId } = req.body;
    if (name && authorId) {
        const newBook = { ...req.body };
        books.push(newBook);
        res.json({ 'added': 'ok' });
    } else {
        res.status(400).json({ 'statusCode': 'BadRequest' });
    }

});

router.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    _.remove(books, (book) => {
        return book.id == id;
    });
    res.json(books);
});

router.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const { name, authorId } = req.body;
    _.each(books, (book) => {
        if (book.id == id) {
            book.name = name;
            book.authorId = authorId;
        }
    });
    res.json({ 'modified': 'ok' });
});
module.exports = router;