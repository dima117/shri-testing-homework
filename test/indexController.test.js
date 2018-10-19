const indexController = require('../controllers/indexController');
const { Git } = require('../utils/git');
const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);

describe('Отображение истории', () => {
  before(function() {
    sinon.stub(Git.prototype, 'gitHistory').callsFake(() => {
      return new Promise((resolve, reject) => {
        resolve([
          {
            hash: '      123456',
            author: 'Olga',
            timestamp: '2018-10-16 12:52:56 +0300',
            msg: 'заглушка stub-4'
          },
          {
            hash: '      1234567',
            author: 'Olga',
            timestamp: '2018-10-16 12:53:56 +0300',
            msg: 'заглушка stub-5'
          },
          {
            hash: '      12345678',
            author: 'Olga',
            timestamp: '2018-10-16 12:54:56 +0300',
            msg: 'заглушка stub-6'
          }
        ]);
      });
    });
  });

  after(function() {
    Git.prototype.gitHistory.restore();
  });
  it('проверяем, что response вызывает render с параметрами index', async () => {
    const req = mockReq();
    const res = mockRes();
    const handlerResult = indexController(req, res);

    await handlerResult;
    const expectResponce = {
      breadcrumbs: [{ href: undefined, text: 'HISTORY' }],
      list: [
        {
          author: 'Olga',
          hash: '      123456',
          href: '/files/      123456/',
          msg: 'заглушка stub-4',
          timestamp: '2018-10-16 12:52:56 +0300'
        },
        {
          author: 'Olga',
          hash: '      1234567',
          href: '/files/      1234567/',
          msg: 'заглушка stub-5',
          timestamp: '2018-10-16 12:53:56 +0300'
        },
        {
          author: 'Olga',
          hash: '      12345678',
          href: '/files/      12345678/',
          msg: 'заглушка stub-6',
          timestamp: '2018-10-16 12:54:56 +0300'
        }
      ],
      title: 'history'
    };
    expect(res.render).to.be.calledWith('index', expectResponce);
  });
});
