const chai = require('chai');
const expect = chai.expect;
const { Git } = require('../utils/git');
const { resolve } = require('path');

class TestGit extends Git {
  constructor(testString) {
    super();
    this.testString = testString;
  }
  executeGit(cmd, args) {
    return new Promise((resolve, reject) => {
      resolve(this.testString);
    });
  }
}

describe('работа с git', () => {
  describe('gitHistory', () => {
    it('можно ли получить историю из git (без параметро, значения по-умолчанию)', () => {
      //подготовка
      const testString = `123\u0009Olga\u00092018-10-16 12:49:56 +0300\u0009заглушка stub`;
      const testGit = new TestGit(testString);
      const expectedResult = [
        {
          hash: '123',
          author: 'Olga',
          timestamp: '2018-10-16 12:49:56 +0300',
          msg: 'заглушка stub'
        }
      ];
      //действие
      const resultGitHistory = testGit.gitHistory();
      //проверка
      return resultGitHistory.then(res => {
        expect(res).to.deep.equal(expectedResult);
      });
    });

    it('можно ли получить историю из git (старниц =2, сообщений =3)', () => {
      //подготовка
      const testString = `
      123456\u0009Olga\u00092018-10-16 12:52:56 +0300\u0009заглушка stub-4\n
      1234567\u0009Olga\u00092018-10-16 12:53:56 +0300\u0009заглушка stub-5\n
      12345678\u0009Olga\u00092018-10-16 12:54:56 +0300\u0009заглушка stub-6`;
      const testGit = new TestGit(testString);
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
  });
  describe('gitFileTree', () => {
    it('можно ли получить файловое дерево коммита без указания пути', () => {
      //подготовка
      const testString = `10000 blob 123\u0009app.js\n100001 tree 1234\u0009test\n`;
      const testGit = new TestGit(testString);
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
    it('можно ли получить файловое дерево коммита с указанными path', () => {
      //подготовка
      const testString = `100002 blob 12345\u0009test.app.js\n`;
      const testGit = new TestGit(testString);
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
  });

  describe('gitFileContent', () => {
    /**Проверка лишена смысла... */
    it('можно ли получить содержимое файла', () => {
      //подготовка
      const testString = `const path = require('path');
      const express = require('express');
      app.listen(3000);
      module.exports = app;`;
      const testGit = new TestGit(testString);
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
});
