const { expect } = require('chai');
const sinon = require('sinon');

const {
  gitHistory,
  gitFileTree,
  gitFileContent,
} = require('../git');

describe('История коммитов', () => {

  const executeGit = sinon.stub();
  executeGit.returns(Promise.resolve('1\t2\t3\t4'));

  it('Количество возвращаемых элементов соответствует переданным параметрам', () => {
    gitHistory(2, 1, executeGit);

    expect(executeGit.getCall(0).args[1][4]).to.be.equal(1);
  });

  it('Правильно разбирается история коммитов', async () => {
    const history = await gitHistory(1, 1, executeGit);

    expect(history[0]).to.have.all.keys(
      'hash',
      'author',
      'timestamp',
      'msg',
    );
  });

});

describe('Файловая система коммита', () => {

  const executeGit = sinon.stub();
  executeGit.returns(Promise.resolve('1 2 3\t4'));

  it('Возвращается список файлов для определенного коммита', () => {
    gitFileTree('hash', '', executeGit);

    expect(executeGit.getCall(0).args[1][1]).to.be.equal('hash');
  });

  it('При выборе папки из коммита, возвращается список файлов этой папки', () => {
    const fileTree = gitFileTree('hash', 'path', executeGit);

    expect(executeGit.getCall(1).args[1][2]).to.be.equal('path');
  });

  it('Правильно разбирается файловая система коммита', async () => {
    const fileTree = await gitFileTree('', '', executeGit);

    expect(fileTree[0]).to.have.all.keys(
      'type',
      'hash',
      'path',
    );
  });

});
