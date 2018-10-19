const contentController = require('../controllers/contentController');
const { Git } = require('../utils/git');
const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const { next } = require('express');

chai.use(sinonChai);

describe('Отображение файла', () => {
  before(function() {
    sinon.stub(Git.prototype, 'gitFileTree').callsFake(() => {
      return new Promise((resolve, reject) => {
        resolve([
          {
            type: 'blob',
            hash: '123',
            path: 'app.js'
          }
        ]);
      });
    });
    sinon.stub(Git.prototype, 'gitFileContent').callsFake(() => {
      return `const path = require('path');
        const express = require('express');
        app.listen(3000);
        module.exports = app;`;
    });
  });

  after(function() {
    Git.prototype.gitFileTree.restore();
    Git.prototype.gitFileContent.restore();
  });
  it('проверяем, что response вызывает render с заданными параметрами', async () => {
    const request = {
      params: {
        '0': 'app.js',
        hash: '123'
      }
    };

    const req = mockReq(request);
    const res = mockRes();
    const handlerResult = contentController(req, res);

    await handlerResult;
    const expectResponce = {
      breadcrumbs: [{ href: '/', text: 'HISTORY' }, { href: '/files/123/', text: 'ROOT' }, { text: 'app.js' }],
      content: `const path = require('path');
        const express = require('express');
        app.listen(3000);
        module.exports = app;`,
      title: 'content'
    };
    expect(res.render).to.be.calledWith('content', expectResponce);
  });
});
