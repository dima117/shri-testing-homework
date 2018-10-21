const { expect } = require('chai');
const sinon = require('sinon');

const { GitClass } = require('../../utils/git');
const { getOffset } = require('../../utils/helpers');

class GitTestClass extends GitClass {
  constructor(mockExecFile) {
    super();
    this.mockExecFile = mockExecFile;
  }

  getExecFile(args) {
    return new Promise((resolve, reject) => {
      this.mockExecFile(args);
      resolve('');
    });
  }
}

describe('utils/git', () => {
  let mockExecFile;
  let Git;

  beforeEach(() => {
    mockExecFile = sinon.spy();
    Git = new GitTestClass(mockExecFile);
  });

  describe('gitHistory', () => {
    it('should call executeGit with correct params', async () => {
      const page = 1;
      const size = 10;
      await Git.gitHistory(1, 10);
      expect(
        mockExecFile.calledWith([
          'log',
          '--pretty=format:%H%x09%an%x09%ad%x09%s',
          '--date=iso',
          '--skip',
          getOffset(page, size),
          '-n',
          10
        ])
      ).to.eq(true);
    });
  });

  describe('gitFileTree', () => {
    it('should call executeGit with correct params for existing path', async () => {
      const hash = '1a2b3c4d5ehash';
      const path = '/somePath/somePath/';

      await Git.gitFileTree(hash, path);
      expect(mockExecFile.calledWith(['ls-tree', hash, path])).to.eq(true);
    });

    it('should call executeGit with correct params for non-existing path', async () => {
      const hash = '1a2b3c4d5ehash';

      await Git.gitFileTree(hash);
      expect(mockExecFile.calledWith(['ls-tree', hash])).to.eq(true);
    });
  });

  describe('gitFileContent', () => {
    it('should call executeGit with correct params for existing path', async () => {
      const hash = '1a2b3c4d5ehash';

      await Git.gitFileContent(hash);
      expect(mockExecFile.calledWith(['show', hash])).to.eq(true);
    });
  });
});
