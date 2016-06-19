'use strict';

const express = require('express');
const BookController = require('../controllers/bookController.js');


const routes = (Book) => {
  const bookRouter = express.Router();
  const controller = new BookController(Book);
  bookRouter.route('/')
    .post(controller.post)
    .get((req, res) => controller.get(req, res));

  bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });

  bookRouter.route('/:bookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      req.book.title  = req.body.title;
      req.book.author = req.body.author;
      req.book.genre  = req.body.genre;
      req.book.read   = req.body.read;
      req.book.save((error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.json(req.book);
        }
      });
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      }

      for (let p in req.body) {
        req.book[p] = req.body[p];
      }

      req.book.save((error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.json(req.book);
        }
      });
    })
    .delete((req, res) => {
      req.book.remove((error) => {
        if (error) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      });
    });

  return bookRouter;
};

module.exports = routes;
