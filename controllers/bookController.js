'use strict';

class BookController {
  constructor(Book) {
    this.Book = Book;
  }

  post(req, res) {
    const book = new this.Book(req.body);

    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      book.save();
      res.status(201).send(book);
    }
  };

  get(req, res) {
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    this.Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  };
}

module.exports = BookController;
