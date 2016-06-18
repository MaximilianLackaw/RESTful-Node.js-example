'user strict';

const bookController = (Book) => {
  const post = (req, res) => {
    const book = new Book(req.body);

    book.save();
    res.status(201).send(book);
  };

  const get = (req, res) => {
    const query = {};

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
  };

  return {
    post: post,
    get: get
  }
}

module.exports = bookController;
