'use strict';

const should   = require('should');
const request  = require('supertest');
const app      = require('../app.js');
const agent    = request(app);
const Book     = require('mongoose').model('Book');

describe('Book Crud Test', () => {
  it('Should allow a book to be posted and return a read and _id', (done) => {
    const bookPost = {
      title: 'new Book',
      author: 'Jon',
      genre: 'Fiction'
    };

    agent.post('/api/Books')
      .send(bookPost)
      .expect(201)
      .end((err, results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.remove().exec();
    done();
  });
});
