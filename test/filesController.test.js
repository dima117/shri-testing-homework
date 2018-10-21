const filesController = require('../controllers/filesController');
const { Git } = require('../utils/git');
const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);

describe('Отображение папки', () => {
  before(function() {
    sinon.stub(Git.prototype, 'gitFileTree').callsFake(() => {
      return new Promise((resolve, reject) => {
        resolve([
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
        ]);
      });
    });
  });

  after(function() {
    Git.prototype.gitFileTree.restore();
  });
  it('проверяем, что response вызывает render c файловой структурой', async () => {
    const request = {
      params: {
        '0': 'undefined',
        hash: '12345'
      }
    };

    const req = mockReq(request);
    const res = mockRes();
    const handlerResult = filesController(req, res);

    await handlerResult;
    const expectResponce = {
      breadcrumbs: [{ href: '/', text: 'HISTORY' }, { href: '/files/12345/', text: 'ROOT' }, { text: 'undefined' }],
      files: [
        {
          hash: '123',
          href: '/content/12345/app.js',
          name: 'app.js',
          path: 'app.js',
          type: 'blob'
        },
        { hash: '1234', href: '/files/12345/test', name: 'test', path: 'test', type: 'tree' }
      ],
      title: 'files'
    };
    expect(res.render).to.be.calledWith('files', expectResponce);
  });
});
