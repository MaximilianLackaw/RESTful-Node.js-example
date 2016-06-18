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

const bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/Books', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to the simple node express service');
});

app.listen(port, () => {
  console.log('Running on port ' + port);
});
