const { expect } = require('chai');
const sinon = require('sinon');

const {
  executeGit,
  gitHistory,
  gitFileTree,
  gitFileContent,
} = require('../git');

describe('utils/git.js', () => {

  describe('executeGit', () => {

    it('В случае resolve возвращается строка', () => {
      const stub = (cmd, args, opts, callback) => {
        callback('', 'stdout')
      };

      executeGit('cmd', 'args', stub).then(data => {
        expect(data).to.be.equal('stdout');
      });
    });

    it('В случае reject возвращается ошибка', () => {
      const stub = (cmd, args, opts, callback) => {
        callback('error', '')
      };

      executeGit('cmd', 'args', stub).catch(error => {
        expect(error).to.be.equal('error');
      });
    });

  });

  describe('gitHistory', () => {

    it('Должен возвращаться промис', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1\t2\t3\t4\n1\t2\t3\t4'));

      const history = gitHistory(1, 1, stub);

      expect(history).to.be.a('promise');
    });

    it('Правильно считается offset', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1\t2\t3\t4\n1\t2\t3\t4'));

      const history = gitHistory(2, 1, stub);

      expect(stub.args[0][1][4]).to.be.equal(1);
    });

    it('Вызов заглушки происходит с правильными аргументами', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1\t2\t3\t4\n1\t2\t3\t4'));

      const history = gitHistory(1, 1, stub);

      expect(stub.args[0]).to.be.eql([
        'git', [
          'log',
          '--pretty=format:%H%x09%an%x09%ad%x09%s',
          '--date=iso',
          '--skip',
          0,
          '-n',
          1,
        ],
      ]);
    });

    it('Промис возвращает массив', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1\t2\t3\t4\n1\t2\t3\t4'));

      const history = await gitHistory(1, 1, stub);

      expect(history).to.be.an('array');
    });

    it('Массив отфильтрован от пустых значений', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1\t2\t3\t4\n1\t2\t3\t4\n'));

      const history = await gitHistory(1, 1, stub);

      const result = history.every(({ hash }) => hash);

      expect(result).to.be.true;
    });

    it('Массив содержит объект', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1\t2\t3\t4\n1\t2\t3\t4'));

      const history = await gitHistory(1, 1, stub);

      expect(history[0]).to.be.an('object');
    });

    it('Объект содержит правильные ключи', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1\t2\t3\t4\n1\t2\t3\t4'));

      const history = await gitHistory(1, 1, stub);

      expect(history[0]).to.have.all.keys('hash', 'author', 'timestamp', 'msg');
    });

  });

  describe('gitFileTree', () => {

    it('Должен возвращаться промис', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1 2 3\t4\n1 2 3\t4'));

      const fileTree = gitFileTree('hash', 'path', stub);

      expect(fileTree).to.be.a('promise');
    });

    it('Вызов заглушки происходит с правильными аргументами', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1 2 3\t4\n1 2 3\t4'));

      const fileTree = gitFileTree('hash', 'path', stub);

      expect(stub.args[0]).to.be.eql([
        'git', [
          'ls-tree',
          'hash',
          'path',
        ],
      ]);
    });

    it('Промис возвращает массив', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1 2 3\t4\n1 2 3\t4'));

      const fileTree = await gitFileTree('hash', 'path', stub);

      expect(fileTree).to.be.an('array');
    });

    it('Массив отфильтрован от пустых значений', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1 2 3\t4\n1 2 3\t4\n'));

      const fileTree = await gitFileTree('hash', 'path', stub);

      const result = fileTree.every(({ type }) => type);

      expect(result).to.be.true;
    });

    it('Массив содержит объект', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1 2 3\t4\n1 2 3\t4\n'));

      const fileTree = await gitFileTree('hash', 'path', stub);

      expect(fileTree[0]).to.be.an('object');
    });

    it('Объект содержит правильные ключи', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1 2 3\t4\n1 2 3\t4\n'));

      const fileTree = await gitFileTree('hash', 'path', stub);

      expect(fileTree[0]).to.have.all.keys('type', 'hash', 'path');
    });

  });

  describe('gitFileContent', () => {

    it('Должен возвращаться промис', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve());

      const fileContent = gitFileContent('hash', stub);

      expect(fileContent).to.be.a('promise');
    });

    it('Вызов заглушки происходит с правильными аргументами', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve());

      const fileTree = gitFileContent('hash', stub);

      expect(stub.args[0]).to.be.eql([
        'git', [
          'show',
          'hash',
        ],
      ]);
    });

  });

});
