const chai = require('chai');
const expect = chai.expect;
const { Git } = require('../utils/git');
const { resolve } = require('path');
const sinon = require('sinon');
const git = new Git();

function createGitWithFakeExecute(returnsString) {
  sinon.stub(git, 'executeGit').callsFake(function() {
    return new Promise((resolve, reject) => {
      resolve(returnsString);
    });
  });
  return git;
}

describe('Проверка работы с git', () => {
  let testGit;
  before(function() {
    testGit = sinon.stub(git, 'executeGit').callsFake(returnsString => {
      return new Promise((resolve, reject) => {
        resolve(returnsString);
      });
    });
  });
  after(function() {
    git.executeGit.restore(); // Unwraps the spy
  });
  it('Отображается история', function(done) {
    //подготовка
    const testString = `123\u0009Olga\u00092018-10-16 12:49:56 +0300\u0009заглушка stub`;
    //const testGit = createGitWithFakeExecute(testString); //new TestGit(testString);
    const expectedResult = [
      {
        hash: '123',
        author: 'Olga',
        timestamp: '2018-10-16 12:49:56 +0300',
        msg: 'заглушка stub'
      }
    ];

    git.executeGit(testString);

    //действие
    const resultGitHistory = git.gitHistory();

    //проверка
    return resultGitHistory.then(res => {
      expect(res).to.deep.equal(expectedResult);
    });
  });

  it('Форматирование истории (указание страниц = 2 и сообщений в выводе = 3)', () => {
    //подготовка
    const testString = `
      123456\u0009Olga\u00092018-10-16 12:52:56 +0300\u0009заглушка stub-4\n
      1234567\u0009Olga\u00092018-10-16 12:53:56 +0300\u0009заглушка stub-5\n
      12345678\u0009Olga\u00092018-10-16 12:54:56 +0300\u0009заглушка stub-6`;
    const testGit = createGitWithFakeExecute(testString);
    const expectedResult = [
      {
        hash: '      123456',
        author: 'Olga',
        timestamp: '2018-10-16 12:52:56 +0300',
        msg: 'заглушка stub-4'
      },
      {
        hash: '      1234567',
        author: 'Olga',
        timestamp: '2018-10-16 12:53:56 +0300',
        msg: 'заглушка stub-5'
      },
      {
        hash: '      12345678',
        author: 'Olga',
        timestamp: '2018-10-16 12:54:56 +0300',
        msg: 'заглушка stub-6'
      }
    ];
    const page = 2;
    const size = 3;
    //действие
    const resultGitHistory = testGit.gitHistory(page, size);
    //проверка
    return resultGitHistory.then(res => {
      expect(res).to.deep.equal(expectedResult);
    });
  });

  it('Отображается файловая структура коммита', () => {
    //подготовка
    const testString = `10000 blob 123\u0009app.js\n100001 tree 1234\u0009test\n`;
    const testGit = createGitWithFakeExecute(testString);
    const expectedResult = [
      {
        type: 'blob',
        hash: '123',
        path: 'app.js'
      },
      {
        type: 'tree',
        hash: '1234',
        path: 'test'
      }
    ];
    const path = '';
    const hash = '123';
    const git = new Git();
    //действие
    const resultGitFileTree = testGit.gitFileTree(hash, path);
    //проверка
    return resultGitFileTree.then(res => {
      expect(res).to.deep.equal(expectedResult);
    });
  });
  it('Отображается файловая структура коммита по указанному пути', () => {
    //подготовка
    const testString = `100002 blob 12345\u0009test.app.js\n`;
    const testGit = createGitWithFakeExecute(testString);
    const expectedResult = [
      {
        type: 'blob',
        hash: '12345',
        path: 'test.app.js'
      }
    ];
    const path = '/test/';
    const hash = '123';
    //действие
    const resultGitFileTree = testGit.gitFileTree(hash, path);
    //проверка
    return resultGitFileTree.then(res => {
      expect(res).to.deep.equal(expectedResult);
    });
  });

  /**Проверка лишена смысла... */
  it('Отображается содержимое файла', () => {
    //подготовка
    const testString = `const path = require('path');
      const express = require('express');
      app.listen(3000);
      module.exports = app;`;
    const testGit = createGitWithFakeExecute(testString);
    const hash = '123';
    const expectedResult = `const path = require('path');
      const express = require('express');
      app.listen(3000);
      module.exports = app;`;
    //действие
    const resultGitFileContent = testGit.gitFileContent(hash);
    //проверка
    return resultGitFileContent.then(res => {
      expect(res).to.deep.equal(expectedResult);
    });
  });
});
