const filesController = require('../../controllers/filesController');
const Git = require('../../utils/git');
const { expect } = require('chai');
const sinon = require('sinon');

const gitFileTreeResult = [
  {
    hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
    path: '.gitignore',
    type: 'blob'
  },
  {
    hash: 'ead09676a936eb50ed700dad0d280d65c3df21d8',
    path: '.README.md',
    type: 'blob'
  },
  {
    hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
    path: 'app.js',
    type: 'blob'
  }
];

const result = ['files',
  {
    title: 'files',
    breadcrumbs: [
      {
        href: '/',
        text: 'HISTORY'
      },
      {
        href: undefined,
        text: 'ROOT'
      }
    ],
    files: [
      {
        hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
        href: '/content/90180910fc27a11272a3e5caeeb119a51e5c0545/.gitignore',
        name: '.gitignore',
        path: '.gitignore',
        type: 'blob'
      },
      {
        hash: 'ead09676a936eb50ed700dad0d280d65c3df21d8',
        href: '/content/90180910fc27a11272a3e5caeeb119a51e5c0545/.README.md',
        name: '.README.md',
        path: '.README.md',
        type: 'blob'
      },
      {
        hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
        href: '/content/90180910fc27a11272a3e5caeeb119a51e5c0545/app.js',
        name: 'app.js',
        path: 'app.js',
        type: 'blob'
      }
    ]
  }
];

const commit = '90180910fc27a11272a3e5caeeb119a51e5c0545';
const path = '';
describe('testing \'filesController\'', () => {
  const req = {
    params: {
      0: undefined,
      hash: '90180910fc27a11272a3e5caeeb119a51e5c0545'
    }
  };
  const sandbox = sinon.createSandbox();

  let res;
  beforeEach(() => {
    res = {
      render: sinon.spy()
    };
  });

  describe('calling controller with correct params', () => {
    it('\'response.render\' should be called once', async () => {
      sandbox.stub(Git, 'gitFileTree').withArgs(commit, path).returns(Promise.resolve(gitFileTreeResult));
      await filesController(req, res);
      expect(res.render.calledOnce).to.be.true;
    });

    it('\'response.render\' should be called with right arguments', async () => {
      sandbox.stub(Git, 'gitFileTree').withArgs(commit, path).returns(Promise.resolve(gitFileTreeResult));
      await filesController(req, res);
      expect(res.render.firstCall.args).to.deep.equal(result);
    });
  });

  describe('\'gitFileTree\' method returns error', () => {
    it('\'response.render\' should not be called', async () => {
      const next = sinon.fake();
      sandbox.replace(Git, 'gitFileTree', () => Promise.reject(new Error('Git Error')));
      await filesController(req, res, next);
      expect(res.render.calledOnce).to.be.false;
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
