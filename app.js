'use strict';

const express  = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const db = mongoose.connect('mongodb://mint-vm:27017/bookAPI');

const app = express();
const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter
  .route('/Books')
  .get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        console.log(err);
      } else {
        res.json(books);
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
