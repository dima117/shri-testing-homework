const { expect } = require('chai');
const sinon = require('sinon');

const {
  gitHistory,
  gitFileTree,
  gitFileContent,
} = require('../git');

describe('utils/git.js', () => {

  describe('История коммитов', () => {

    it('Количество возвращаемых элементов соответствует переданным параметрам', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1\t2\t3\t4'));

      gitHistory(2, 1, stub);

      expect(stub.args[0][1][4]).to.be.equal(1);
    });

    it('Правильно разбирается история коммитов', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1\t2\t3\t4'));

      const history = await gitHistory(1, 1, stub);

      expect(history[0]).to.have.all.keys(
        'hash',
        'author',
        'timestamp',
        'msg',
      );
    });

  });

  describe('Файловая система коммита', () => {

    it('Возвращается список файлов для определенного коммита', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1 2 3\t4'));

      gitFileTree('hash', '', stub);

      expect(stub.args[0][1][1]).to.be.equal('hash');
    });

    it('При выборе папки из коммита, возвращается список файлов этой папки', () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1 2 3\t4'));

      const fileTree = gitFileTree('hash', 'path', stub);

      expect(stub.args[0][1][2]).to.be.equal('path');
    });

    it('Правильно разбирается файловая система коммита', async () => {
      const stub = sinon.stub();
      stub.returns(Promise.resolve('1 2 3\t4'));

      const fileTree = await gitFileTree('', '', stub);

      expect(fileTree[0]).to.have.all.keys(
        'type',
        'hash',
        'path',
      );
    });

  });

});
