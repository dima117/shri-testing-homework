const { expect } = require('chai');
const { gitHelper } = require('../../utils/git');


describe('Файл git.js', () => {
  let path = 'testing-path';
  let hash = 'testing-hash';
  let data = [
    {
      hash: 'testing-hash',
      author: 'testing-author',
      timestamp: 'date',
      msg: 'testing-msg'
    }
  ];
  let dataCommit = [
    {
      type: 'tree',
      hash: hash,
      path: path
    }
  ];
  let params = [
    'git', [
      'ls-tree', 
      hash
    ]
  ];
  let paramsPath = [
    'git', [
      'ls-tree', 
      hash,
      path
    ]
  ];

  describe('Метод gitHistory', () => {
    let params = [
      'git', [
        'log',
        '--pretty=format:%H%x09%an%x09%ad%x09%s',
        '--date=iso',
        '--skip',
        0,
        '-n',
        10
      ]
    ];
    it('Передаются корректные аргументы', () => {
      let result;
      gitHelper.executeGit = (...args) => {
        result = args;
        return Promise.resolve();
      }
      gitHelper.gitHistory();
      expect(result).to.be.deep.equal(params);
    });
    it('Возвращает данные в корректном формате', async () => {
      gitHelper.executeGit = () => {
        return Promise.resolve(
          'testing-hash\ttesting-author\tdate\ttesting-msg'
          );
      }
      let result = await gitHelper.gitHistory();
      expect(result).to.be.deep.equal(data);
    });

  });

  describe('Метод gitFileTree', () => {
    
    
    it('Передаются корректные аргументы, только с hash', () => {
      let result;
      gitHelper.executeGit = (...args) => {
        result = args;
        return Promise.resolve();
      }
      gitHelper.gitFileTree(hash);
      expect(result).to.be.deep.equal(params);
    });
    it('Передаются корректные аргументы, с hash и path', () => {
      let result;
      gitHelper.executeGit = (...args) => {
        result = args;
        return Promise.resolve();
      }
      gitHelper.gitFileTree(hash, path);
      expect(result).to.be.deep.equal(paramsPath);
    });
    it('Возвращает данные в корректном формате', async () => {
      gitHelper.executeGit = () => {
        return Promise.resolve(`0 tree ${hash}\t${path}`);
      }
      let result = await gitHelper.gitFileTree(hash);
      expect(result).to.be.deep.equal(dataCommit);
    });

  });

  describe('Метод gitFileContent', () => {
    it('Передаются корректные аргументы', () => {
      let result;
      gitHelper.executeGit = (...args) => {
        result = args;
        return Promise.resolve();
      }
      gitHelper.gitFileContent(hash);
      expect(result).to.be.deep.equal(['git', ['show', hash]]);
    });
  });

  describe('Метод parseFileTreeItem', () => {
    it('Возвращаются корректные данные', () => {
      let result = gitHelper.parseFileTreeItem(`0 tree ${hash}\t${path}`);
      expect(result).to.be.deep.equal(dataCommit[0]);
    });
  });

    describe('Метод parseHistoryItem', () => {
      it('Возвращаются корректные данные', () => {
        let result = gitHelper.parseHistoryItem(
          'testing-hash\ttesting-author\tdate\ttesting-msg'
        );
        expect(result).to.be.deep.equal(data[0]);
      });
    });

});