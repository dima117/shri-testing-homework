const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const { 
  gitHistoryFactory,
  gitFileTreeFactory,
  gitFileContentFactory 
} = require('../../utils/git');

describe('git', function() {
  describe('gitHistory', function() {
    let gitHistory;

    it('calls executeCommand with correct args', async function() {
      const executeCommand = sinon.fake.resolves('');
      gitHistory = gitHistoryFactory(executeCommand);

      await gitHistory(2, 12);

      expect(executeCommand).to.have.been.calledWith('git', [
        'log',
        '--pretty=format:%H%x09%an%x09%ad%x09%s',
        '--date=iso',
        '--skip',
        12,
        '-n',
        12 
      ]);
    });

    it('resolves with parsed history', async function() {
      const gitLogData = require('./gitLogData').join('\n');
      const executeCommand = sinon.fake.resolves(gitLogData);
      gitHistory = gitHistoryFactory(executeCommand);

      const history = await gitHistory();
      const expected = [
        {
          hash: '099400017377ecc65e71db6faf437f989e9af7dc',
          author: 'Patat',
          timestamp: '2018-10-22 16:37:06 +0300',
          msg: 'add navigation tests'
        },
        {
          hash: 'be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca',
          author: 'Patat',
          timestamp: '2018-10-20 02:16:03 +0300',
          msg: 'add hermione tests'
        },
        {
          hash: '999bfb1ec309158f4c86edee76fa5630a3aba565',
          author: 'Patat',
          timestamp: '2018-10-17 05:41:55 +0300',
          msg: 'add tests for indexController'
        }
      ];

      expect(history).to.deep.equal(expected);
    });
  });

  describe('gitFileTree', function() {
    let gitFileTree;

    it('calls executeCommand with correct args', async function() {
      const executeCommand = sinon.fake.resolves('');
      gitFileTree = gitFileTreeFactory(executeCommand);

      await gitFileTree('999bfb1ec309158f4c86edee76fa5630a3aba565', 'controllers/');

      expect(executeCommand).to.have.been.calledWith('git', [
        'ls-tree',
        '999bfb1ec309158f4c86edee76fa5630a3aba565',
        'controllers/'
      ]);
    });

    it('resolves with parsed file tree', async function() {
      const fileTreeData = [
        '100644 blob c9d18582f6c7fb78fb2c611bcd6c0d5f87304072\tcontrollers/contentController.js',
        '100644 blob 02fe732137bea2adfb6f650bce92aa0be2f5cd9d\tcontrollers/filesController.js',
        '100644 blob 7d23f38a44bf6a3ed7e32e07fa49dbdd78635ab8\tcontrollers/indexController.js'
      ].join('\n');
      const executeCommand = sinon.fake.resolves(fileTreeData);
      gitFileTree = gitFileTreeFactory(executeCommand);

      const fileTree = await gitFileTree();
      const expected = [
        {
          type: 'blob',
          hash: 'c9d18582f6c7fb78fb2c611bcd6c0d5f87304072',
          path: 'controllers/contentController.js'
        },
        {
          type: 'blob',
          hash: '02fe732137bea2adfb6f650bce92aa0be2f5cd9d',
          path: 'controllers/filesController.js'
        },
        {
          type: 'blob',
          hash: '7d23f38a44bf6a3ed7e32e07fa49dbdd78635ab8',
          path: 'controllers/indexController.js'
        }
      ];

      expect(fileTree).to.deep.equal(expected);
    });
  });

  describe('gitFileContent', function() {
    let gitFileContent;

    it('calls executeCommand with correct args', async function() {
      const executeCommand = sinon.fake.resolves('');
      gitFileContent = gitFileContentFactory(executeCommand);

      await gitFileContent('999bfb1ec309158f4c86edee76fa5630a3aba565');

      expect(executeCommand).to.have.been.calledWith('git', [
        'show',
        '999bfb1ec309158f4c86edee76fa5630a3aba565'
      ]);
    });
  });
});