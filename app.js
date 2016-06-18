'use strict';

const express    = require('express');
const mongoose   = require('mongoose');
const Book       = require('./models/bookModel');
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb://mint-vm:27017/bookAPI');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bookRouter = express.Router();

bookRouter.route('/Books')
  .post((req, res) => {
    const book = new Book(req.body);

    book.save();
    res.status(201).send(book);
  })
  .get((req, res) => {
    let query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  });

bookRouter.route('/Books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(book);
      }
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to the simple node express service');
});

app.listen(port, () => {
  console.log('Running on port ' + port);
});
