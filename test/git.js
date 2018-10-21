const path = require('path');
const {expect} = require('chai');
const GitUtils = require('../utils/git');

describe('GitUtils', () => {
  it('parseHistoryItem: парсит конкретный коммит', () => {
    const gitUtils = new GitUtils();
    const line = `38429be\tuserName\tMon Oct 15 13:22:09 2018 +0300\tcommit message`;
    const result = gitUtils.parseHistoryItem(line);
    expect(result).to.deep.equal({
      hash: '38429be',
      author: 'userName',
      timestamp: 'Mon Oct 15 13:22:09 2018 +0300',
      msg: 'commit message'
    })
  });

  it('parseFileTreeItem: парсит файлы конкретного коммита', () => {
    const gitUtils = new GitUtils();
    const result = gitUtils.parseFileTreeItem('100644 blob ead09676a\tREADME.md');
    expect(result).to.deep.equal({
      type: 'blob',
      hash: 'ead09676a',
      path: 'README.md'
    })
  })

  describe('gitHistory', () => {
    it('executeGit вызывается с нужными аргументами, offset посчитан правильно', async () => {
      const gitUtils = new GitUtils();
      let arguments;
      gitUtils.executeGit = (...args) => {
        arguments = args;
        return Promise.resolve('');
      }

      await gitUtils.gitHistory(3, 30);
      expect(arguments).to.deep.equal([
        'git',
        [
          'log',
          '--pretty=format:%H%x09%an%x09%ad%x09%s',
          '--date=iso',
          '--skip',
          60,
          '-n',
          30
        ]
      ]);
    });

    it('gitHistory вызван с дефолтными аргументами, executeGit вызывается с нужными аргументами', async () => {
      const gitUtils = new GitUtils();
      let arguments;

      gitUtils.executeGit = (...args) => {
        arguments = args;
        return Promise.resolve('');
      }
      
      await gitUtils.gitHistory();
      expect(arguments).to.deep.equal([
        'git',
        [
          'log',
          '--pretty=format:%H%x09%an%x09%ad%x09%s',
          '--date=iso',
          '--skip',
          0,
          '-n',
          10
        ]
      ]);
    });

    it('Парсит историю на отдельные коммиты', async () => {
      const gitUtils = new GitUtils();
      const items = 
        '9018091\tuser1Name\t2018-10-16 12:49:56 +0300\tcommit message1\n' +
        '38429be\tuser2Name\t2018-10-16 12:36:32 +0300\tcommit message2';
      gitUtils.executeGit = () => {
        return Promise.resolve(items);
      }

      const result = await gitUtils.gitHistory();
      expect(result).to.deep.equal([
        {'author': 'user1Name', 'hash': '9018091', 'msg': 'commit message1', 'timestamp': '2018-10-16 12:49:56 +0300'},
        {'author': 'user2Name', 'hash': '38429be', 'msg': 'commit message2', 'timestamp': '2018-10-16 12:36:32 +0300'}
      ]);
    });

    it('Парсит историю на отдельные коммиты, игнорирует лишние переносы строк', async () => {
      const gitUtils = new GitUtils();
      const items = '\n\n9018091\tuser1Name\t2018-10-16 12:49:56 +0300\tcommit message1\n\n';
      gitUtils.executeGit = () => {
        return Promise.resolve(items);
      }

      const result = await gitUtils.gitHistory();
      expect(result).to.deep.equal([
        {'author': 'user1Name', 'hash': '9018091', 'msg': 'commit message1', 'timestamp': '2018-10-16 12:49:56 +0300'},
      ]);
    });
  });

  describe('gitFileTree', () => {
    it('есть path, executeGit вызывается с нужными аргументами', async () => {
      const gitUtils = new GitUtils();
      let arguments;
      gitUtils.executeGit = (...args) => {
        arguments = args;
        return Promise.resolve('');
      }
      const result = await gitUtils.gitFileTree('ead09676a', '/');

      expect(arguments).to.deep.equal(['git', ['ls-tree', 'ead09676a', '/']])
    });

    it('нет path, executeGit вызывается с нужными аргументами', async () => {
      const gitUtils = new GitUtils();
      let arguments;
      gitUtils.executeGit = (...args) => {
        arguments = args;
        return Promise.resolve('');
      }
      const result = await gitUtils.gitFileTree('ead09676a');

      expect(arguments).to.deep.equal(['git', ['ls-tree', 'ead09676a']])
    });

    it('Разбивает дерево файлов на отдельные файлы', async () => {
      const gitUtils = new GitUtils();
      const items = 
        '100644 blob b512c09d\t.gitignore\n' +
        '100644 blob ead09676\tREADME.md'
      gitUtils.executeGit = () => {
        return Promise.resolve(items);
      }

      const result = await gitUtils.gitFileTree();
      expect(result).to.deep.equal([
        {'hash': 'b512c09d', 'path': '.gitignore', 'type': 'blob'},
        {'hash': 'ead09676', 'path': 'README.md', 'type': 'blob'}
      ]);
    });

    it('Разбивает дерево файлов на отдельные файлы, игнорирует лишние переносы строк', async () => {
      const gitUtils = new GitUtils();
      const items = '\n\n100644 blob b512c09d\t.gitignore\n\n';
      gitUtils.executeGit = () => {
        return Promise.resolve(items);
      }

      const result = await gitUtils.gitFileTree();
      expect(result).to.deep.equal([
        {'hash': 'b512c09d', 'path': '.gitignore', 'type': 'blob'},
      ]);
    });
  });

  describe('gitFileContent', () => {
    it('executeGit вызывается с нужными аргументами', async () => {
      const gitUtils = new GitUtils();
      let arguments;
      gitUtils.executeGit = (...args) => {
        arguments = args;
        return Promise.resolve('');
      }

      await gitUtils.gitFileContent('0f04363de');
      expect(arguments).to.deep.equal(['git', ['show', '0f04363de']]);
    })
  });
});
