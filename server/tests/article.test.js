import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import faker from 'faker';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Article APIs', () => {
  let article = {
    title: faker.lorem.words(2),
    text:  faker.lorem.paragraphs(2)
  };

  describe('# POST /api/articles', () => {
    it('should create a new article', (done) => {
      request(app)
        .post('/api/articles')
        .send(article)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(article.title);
          expect(res.body.text).to.equal(article.text);
          article = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/articles/', () => {
    it('should get all articles', (done) => {
      request(app)
        .get('/api/articles')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
    it('should get all users (with limit and skip)', (done) => {
      request(app)
        .get('/api/users')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/articles/:articleId', () => {
    it('should get article details', (done) => {
      request(app)
        .get(`/api/articles/${article._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(article.title);
          expect(res.body.text).to.equal(article.text);
          done();
        })
        .catch(done);
    });
    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/articles/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/articles/:articleId', () => {
    it('should update article details', (done) => {
      article.title = 'KK';
      request(app)
        .put(`/api/articles/${article._id}`)
        .send(article)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal('KK');
          expect(res.body.text).to.equal(article.text);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/articles/:articleId', () => {
    it('should delete article', (done) => {
      request(app)
        .delete(`/api/articles/${article._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(article.title);
          expect(res.body.text).to.equal(article.text);
          done();
        })
        .catch(done);
    });
  });


});
