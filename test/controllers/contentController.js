const contentController = require('../../controllers/contentController');
const Git = require('../../utils/git');
const { expect } = require('chai');
const sinon = require('sinon');

const commit = '90180910fc27a11272a3e5caeeb119a51e5c0545';
const gitFileTreeResult = [
  {
    hash: 'c9d18582f6c7fb78fb2c611bcd6c0d5f87304072',
    path: 'controllers/contentController.js',
    type: 'blob'
  },
  {
    hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
    path: '.gitignore',
    type: 'blob'
  }
];

const gitFileContent = 'const { gitFileContent, gitFileTree } = require(\'../utils/git\');\n' +
'const { buildFolderUrl, buildBreadcrumbs } = require(\'../utils/navigation\');\n\n' +
'module.exports = function(req, res, next) {\nconst { hash } = req.params;\n' +
'const path = req.params[0].split(\'/\').filter(Boolean);\n};\n';

describe('testing \'contentController\'', () => {
  const sandbox = sinon.createSandbox();

  let res;
  beforeEach(() => {
    res = {
      render: sinon.spy()
    };
  });

  describe('calling controller with path to \'blob\' file', () => {
    it('\'response.render\' should be called once', async () => {
      const req = {
        params: {
          0: 'controllers/contentController.js',
          hash: commit
        }
      };
      sandbox.stub(Git, 'gitFileTree')
        .withArgs(commit, 'controllers/contentController.js').returns(Promise.resolve(gitFileTreeResult[0]));
      sandbox.stub(Git, 'gitFileContent')
        .withArgs('c9d18582f6c7fb78fb2c611bcd6c0d5f87304072').returns(Promise.resolve(gitFileContent));
      await contentController(req, res);
      expect(res.render.calledOnce).to.be.true;
    });

    it('\'response.render\' should be called with right arguments', async () => {
      const req = {
        params: {
          0: 'controllers/contentController.js',
          hash: commit
        }
      };

      const expectedResult = [
        'content',
        {
          title: 'content',
          breadcrumbs: [
            {
              href: '/',
              text: 'HISTORY'
            },
            {
              href: `/files/${commit}/`,
              text: 'ROOT'
            },
            {
              href: `/files/${commit}/controllers/`,
              text: 'controllers'
            },
            {
              text: 'contentController.js'
            }
          ],
          content: gitFileContent
        }
      ];

      sandbox.stub(Git, 'gitFileTree')
        .withArgs(commit, 'controllers/contentController.js').returns(Promise.resolve(gitFileTreeResult[0]));
      sandbox.stub(Git, 'gitFileContent')
        .withArgs('c9d18582f6c7fb78fb2c611bcd6c0d5f87304072').returns(Promise.resolve(gitFileContent));
      await contentController(req, res);
      expect(res.render.firstCall.args).to.deep.equal(expectedResult);
    });
  });

  describe('calling controller with path to \'tree\' file', () => {
    it('\'response.render\' should not be called', async () => {
      const req = {
        params: {
          0: 'public',
          hash: '6a033b657f10911ad9b65c27c3f9b6fb6130b058'
        }
      };
      sandbox.replace(Git, 'gitFileTree', () => Promise.resolve([]));
      await contentController(req, res);
      expect(res.render.called).to.be.false;
    });
  });

  describe('\'gitFileContent\' method returns empty file', () => {
    it('\'response.render\' should not be called', async () => {
      const req = {
        params: {
          0: '.gitignore',
          hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023'
        }
      };
      sandbox.replace(Git, 'gitFileContent', () => Promise.resolve(''));
      const next = sinon.fake();
      await contentController(req, res, next);
      expect(res.render.called).to.be.false;
    });
  });

  describe('\'gitFileTree\' method returns error', () => {
    it('\'response.render\' should not be called', async () => {
      const req = {
        params: {
          0: '.gitignore',
          hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023'
        }
      };
      const next = sinon.fake();
      sandbox.replace(Git, 'gitFileTree', () => Promise.reject(new Error('Git Error')));
      await contentController(req, res, next);
      expect(res.render.calledOnce).to.be.false;
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
