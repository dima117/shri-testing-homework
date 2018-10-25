const { expect } = require('chai');
const sinon = require('sinon').createSandbox();

const GitWorker = require('../../utils/git');

const git = new GitWorker();


describe('class GitWorker, responsible for the getting and parsing stdout from console, has methods:', () => {

  describe('gitHistory, that returns a list of commits of customizable length and offset', () => {
    it('should use the default offset and size of the list when the agruments are not passed', async () => {
      git.executeGit = (...args) => {
        this.stdoutArr = args;
        return Promise.resolve('ok');
      };

      await git.gitHistory();
      expect(this.stdoutArr[0]).to.include(0, 10);
    });

    it('should accept offset and size of the list of commits and correctly calculate them', async () => {
      git.executeGit = (...args) => {
        this.stdoutArr = args;
        return Promise.resolve('ok');
      };

      await git.gitHistory(5, 15);
      expect(this.stdoutArr[0]).to.include(60, 15);
    });

    it('should properly cut a git string on the commits object', async () => {
      const cm1 = '123a\tvasya\t2018-10-24 10:12:22 +0300\tmsg1\n';
      const cm2 = '456b\tpetya\t2018-10-25 11:11:11 +0400\tmsg2';

      const commitString = cm1 + cm2;

      git.executeGit = () => Promise.resolve(commitString);

      const result = await git.gitHistory();
      expect(result).to.deep.equal([
        {
          author: 'vasya',
          hash: '123a',
          msg: 'msg1',
          timestamp: '2018-10-24 10:12:22 +0300',
        },
        {
          author: 'petya',
          hash: '456b',
          msg: 'msg2',
          timestamp: '2018-10-25 11:11:11 +0400',
        },
      ]);
    });
  });


  describe('parseHistoryItem, that creates a commit-object for index page', () => {
    it('should parse a console string into a commit-object, dividing it by tabs', () => {
      const line = 'hash123\tname\tFri Sep 01:02:03 2007 +0300\ttest-msg';
      const result = git.parseHistoryItem(line);

      expect(result).to.deep.equal({
        hash: 'hash123',
        author: 'name',
        timestamp: 'Fri Sep 01:02:03 2007 +0300',
        msg: 'test-msg',
      });
    });
  });


  describe('parseFileTreeItem, that creates a git tree entry for files page', () => {
    it('should parse a git console string into a tree instance object, dividing it by tabs', () => {
      const result = git
        .parseFileTreeItem('102030 blob hash123\tsomething-lewd.png');

      expect(result).to.deep.equal({
        type: 'blob',
        hash: 'hash123',
        path: 'something-lewd.png',
      });
    });
  });


  describe('gitFileTree, that creates a command for Git executor to list all the items in the currently picked commit', () => {
    it('should return with the \'ls-tree\' command and a hash', async () => {
      git.executeGit = (...args) => {
        this.stdoutArr = args;
        return Promise.resolve('ok');
      };
      await git.gitFileTree('hash123');

      expect(this.stdoutArr).to.deep.equal([
        ['ls-tree', 'hash123']]);
    });

    it('should parse a git console string into a commit-object, dividing it by tabs', async () => {
      const cm1 = '123 blob hash123\t.eslintrc\n';
      const cm2 = '456 blob hash456\tindex.js';

      const commitString = cm1 + cm2;
      git.executeGit = () => Promise.resolve(commitString);

      const result = await git.gitFileTree();

      expect(result).to.deep.equal([
        { hash: 'hash123', path: '.eslintrc', type: 'blob' },
        { hash: 'hash456', path: 'index.js', type: 'blob' },
      ]);
    });
  });


  describe('gitFileContent, that passes a command to Git executor to show a single commit file', () => {
    it('should return with the \'show\' command and a hash', async () => {
      git.executeGit = (...args) => {
        this.stdoutArr = args;
        return Promise.resolve();
      };

      await git.gitFileContent('hash123');
      expect(this.stdoutArr).to.deep.equal([['show', 'hash123']]);
    });
  });
});
