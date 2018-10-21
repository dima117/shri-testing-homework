const Git = require('../../utils/git');
const indexController = require('../../controllers/indexController');
const Navigation = require('../../utils/navigation');
const { expect } = require('chai');
const sinon = require('sinon');

const gitHistoryResult = [
  {
    author: 'Dmitry Andriyanov',
    hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
    msg: 'исправлена опечатка в readme',
    timestamp: '2018-10-16 12:49:56 +0300'
  },
  {
    author: 'Dmitry Andriyanov',
    hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
    msg: 'readme',
    timestamp: '2018-10-16 12:36:32 +0300'
  },
  {
    author: 'Dmitry Andriyanov',
    hash: '7e013ae0440ad6e91082599376a6aaebe20d2112',
    msg: 'codestyle',
    timestamp: '2018-10-16 12:10:05 +0300'
  }
];

const list = [
  {
    author: 'Dmitry Andriyanov',
    hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
    href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/',
    msg: 'исправлена опечатка в readme',
    timestamp: '2018-10-16 12:49:56 +0300'
  },
  {
    author: 'Dmitry Andriyanov',
    hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
    href: '/files/cc2284293758e32c50fa952da2f487c8c5e8d023/',
    msg: 'readme',
    timestamp: '2018-10-16 12:36:32 +0300'
  },
  {
    author: 'Dmitry Andriyanov',
    hash: '7e013ae0440ad6e91082599376a6aaebe20d2112',
    href: '/files/7e013ae0440ad6e91082599376a6aaebe20d2112/',
    msg: 'codestyle',
    timestamp: '2018-10-16 12:10:05 +0300'
  }
];

const expectedResult = [
  'index',
  {
    title: 'history',
    breadcrumbs: [
      {
        text: 'HISTORY',
        href: undefined
      }
    ],
    list
  }
];

describe('testing \'indexController\'', () => {
  const req = {};
  const sandbox = sinon.createSandbox();
  sandbox.stub(Navigation, 'buildFolderUrl')
    .withArgs('90180910fc27a11272a3e5caeeb119a51e5c0545', '').returns('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
    .withArgs('cc2284293758e32c50fa952da2f487c8c5e8d023', '').returns('/files/cc2284293758e32c50fa952da2f487c8c5e8d023/')
    .withArgs('7e013ae0440ad6e91082599376a6aaebe20d2112', '').returns('/files/7e013ae0440ad6e91082599376a6aaebe20d2112/');

  let res;
  beforeEach(() => {
    res = {
      render: sinon.spy()
    };
  });

  describe('calling controller with correct params', () => {
    it('\'response.render\' should be called once', async () => {
      sandbox.stub(Git, 'gitHistory').withArgs(1, 20).returns(Promise.resolve(gitHistoryResult));
      await indexController(req, res);
      expect(res.render.calledOnce).to.be.true;
    });

    it('\'response.render\' should be called with right arguments', async () => {
      sandbox.stub(Git, 'gitHistory').withArgs(1, 20).returns(Promise.resolve(gitHistoryResult));
      await indexController(req, res);
      expect(res.render.firstCall.args).to.deep.equal(expectedResult);
    });
  });

  describe('\'gitHisory\' method returns error', () => {
    it('\'response.render\' should not be called', async () => {
      const next = sinon.fake();
      sandbox.replace(Git, 'gitHistory', () => Promise.reject(new Error('Git Error')));
      await indexController(req, res, next);
      expect(res.render.calledOnce).to.be.false;
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
