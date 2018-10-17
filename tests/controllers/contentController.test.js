const contentController = require('./../../controllers/contentController');
const express = require('express');
const request = require('supertest');
const path = require('path');
const expect = require('chai').expect;

describe('controllers/contentController', () => {
  it('возвращает корректные данные в шаблоне', (done) => {
    const app = express();

    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'hbs');
    app.set('view options', { layout: 'layout', extname: '.hbs' });
    app.get('/content/:hash/*?', contentController);

    request(app)
      .get('/content/0a88cdf2265c0b19663ddbe2733a27e9599724e1/.gitignore')
      .expect(200)
      .expect((res) => {
        expect(res.text).to.include('<div class="file-content">node_modules</div>')
        done()
      })
      .catch(done)
  })
})