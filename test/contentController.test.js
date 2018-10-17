const server = require('../app');
const { contentController } = require('../controllers/contentController');
const { Git } = require('../utils/git');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('contentController tests', () => {
  it('проверяем ....', async () => {
    Git.executeGit = function() {
      return new Promise((resolve, reject) => {
        resolve(this.testString);
      });
    };

    Git.gitFileTree = function() {
      return new Promise(resolve => {
        // подменяем метод gitTree
        [
          {
            type: 'blob',
            hash: '123',
            path: 'app.js'
          },
          {
            type: 'tree',
            hash: '1234',
            path: 'test'
          }
        ];
      });
    };
    Git.gitFileContent = function() {
      return new Promise(resolve => {
        `const path = require('path');
      const express = require('express');
      app.listen(3000);
      module.exports = app;`;
      });
    };

    const response = await chai.request(server).get('/content/123/app.js');
    chai.expect(response).to.have.status(200);
  });
});
