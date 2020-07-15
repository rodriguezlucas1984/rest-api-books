const { Router } = require('express');
const router = Router();
const authors = require('../Authors.json');
const _ = require('lodash');
const books = require('../Books.json');

router.get('/authors', (req, res) => {
    res.json(authors);
});

router.post('/authors', (req, res) => {
    const { name, lastname } = req.body;
    if (name && lastname) {
        const newAuthor = { ...req.body };
        authors.push(newAuthor);
        res.json({ 'added': 'ok' });
    } else {
        res.status(400).json({ 'statusCode': 'BadRequest' });
    }

});

router.delete('/authors/:id', (req, res) => {
    const id = req.params.id;
    let cantidad = 0;
    _.each(books, (book) => {
        if (book.authorId == id) {
            cantidad += 1;
        }
    });
    if (cantidad == 0) {
        _.remove(authors, (author) => {
            return author.id == id;
        });
        res.json(authors);
    } else {
        res.json({ 'deleted': 'existen ' + cantidad + ' libros de este autor' });
    }
});

router.put('/authors/:id', (req, res) => {
    const id = req.params.id;
    const { name, lastname } = req.body;
    _.each(authors, (author) => {
        if (author.id == id) {
            author.name = name;
            author.lastname = lastname;
        }
    });
    res.json({ 'modified': 'ok' });
});

module.exports = router;