const { expect } = require('chai');
const sinon = require('sinon');
const { Git } = require('../../utils/git');

// Тестовые наборы данных

const testHash = 'cc2284293758e32c50fa952da2f487c8c5e8d023';
const testPath = 'package.json';
const testLongPath = 'my/cat/package.json';
const testArgLsTree = ['ls-tree', testHash, testPath];
const testHistoryLine = 'f2df8ac23e817f6da01624a77ec050a0147f642a\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили';
const testFileLine = '10064 tblob 70461d5f9009344d9933e889b0448aa3f18d83d9\tapp.js';

const testDate = `90180910fc27a11272a3e5caeeb119a51e5c0545\tDmitry Andriyanov\t2018-10-16 12:49:56 +0300\tисправлена опечатка в readme
cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme
7e013ae0440ad6e91082599376a6aaebe20d2112\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle
f2df8ac23e817f6da01624a77ec050a0147f642a\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили`;

const testFileTreeDate = `100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore
100644 blob 27e5864fa4f9a15d22ef81a804ca339fa4befbcd\tREADME.md
040000 tree 4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5\tviews`;

const testGit = new Git();

// Заглушка для вызова внешнего модуля

const executeGitStub = sinon.stub(testGit, 'executeGit')
  .withArgs('git', testArgLsTree)
  .returns(new Promise((res, reject) => {
    res(testFileTreeDate);
  }))
  .withArgs('git')
  .returns(new Promise((res, reject) => {
    res(testDate);
  }));


describe('git.js — проверка обработки приходящих с гита данных', () => {
  describe('gitHistory', () => {
    it('Функция возвращает массив', () => {
      testGit.gitHistory()
        .then((result) => {
          expect(result)
            .to
            .be
            .a('array');
        });
    });
    it('Функция возвращает ожидаемый массив', () => {
      testGit.gitHistory()
        .then((result) => {
          expect(result)
            .to
            .eql([
              {
                hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
                author: 'Dmitry Andriyanov',
                timestamp: '2018-10-16 12:49:56 +0300',
                msg: 'исправлена опечатка в readme',
              },
              {
                hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
                author: 'Dmitry Andriyanov',
                timestamp: '2018-10-16 12:36:32 +0300',
                msg: 'readme',
              },
              {
                hash: '7e013ae0440ad6e91082599376a6aaebe20d2112',
                author: 'Dmitry Andriyanov',
                timestamp: '2018-10-16 12:10:05 +0300',
                msg: 'codestyle',
              },
              {
                hash: 'f2df8ac23e817f6da01624a77ec050a0147f642a',
                author: 'Dmitry Andriyanov',
                timestamp: '2018-10-16 12:02:11 +0300',
                msg: 'стили',
              }]);
        });
    });
  });
  describe('gitFileTree', () => {
    it('Функция возвращает массив', () => {
      testGit.gitFileTree(testHash, testPath)
        .then((result) => {
          expect(result)
            .to
            .be
            .a('array');
        });
    });
    it('Функция возвращает ожидаемый массив', () => {
      testGit.gitFileTree(testHash, testPath)
        .then((result) => {
          expect(result)
            .to
            .eql([
              {
                type: 'blob',
                hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
                path: '.gitignore',
              },
              {
                type: 'blob',
                hash: '27e5864fa4f9a15d22ef81a804ca339fa4befbcd',
                path: 'README.md',
              },
              {
                type: 'tree',
                hash: '4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5',
                path: 'views',
              }]);
        });
    });
  });
  describe('parseHistoryItem', () => {
    it('Функция возвращает объект', () => {
      const result = testGit.parseHistoryItem(testHistoryLine);
      expect(result)
        .to
        .be
        .an('object');
    });
    it('Функция возвращает обьект с ключами [hash, author, timestamp, msg] ', () => {
      const result = testGit.parseHistoryItem(testHistoryLine);
      expect(result)
        .to
        .have
        .keys(['hash', 'author', 'timestamp', 'msg']);
    });
    it('Функция возвращает ожидаемый объект', () => {
      const result = testGit.parseHistoryItem(testHistoryLine);
      expect(result)
        .to
        .eql({
          hash: 'f2df8ac23e817f6da01624a77ec050a0147f642a',
          author: 'Dmitry Andriyanov',
          timestamp: '2018-10-16 12:02:11 +0300',
          msg: 'стили',
        });
    });
  });
  describe('parseFileTreeItem', () => {
    it('Функция возвращает объект', () => {
      const result = testGit.parseFileTreeItem(testFileLine);
      expect(result)
        .to
        .be
        .an('object');
    });
    it('Функция возвращает обьект с ключами [type, hash, path] ', () => {
      const result = testGit.parseFileTreeItem(testFileLine);
      expect(result)
        .to
        .have
        .keys(['type', 'hash', 'path']);
    });
    it('Функция возвращает ожидаемый объект', () => {
      const result = testGit.parseFileTreeItem(testFileLine);
      expect(result)
        .to
        .eql({
          type: 'tblob',
          hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
          path: 'app.js',
        });
    });
  });
  describe('splitData — Преобразование входящей строки в обьект', () => {
    it('Функция с методом(parseHistoryItem) возвращает ожидаемый объект', () => {
      const result = testGit.splitData(testHistoryLine, testGit.parseHistoryItem);
      expect(result)
        .to
        .eql([{
          hash: 'f2df8ac23e817f6da01624a77ec050a0147f642a',
          author: 'Dmitry Andriyanov',
          timestamp: '2018-10-16 12:02:11 +0300',
          msg: 'стили',
        }]);
    });
    it('Функция с методом(parseFileTreeItem) возвращает ожидаемый объект', () => {
      const result = testGit.splitData(testFileLine, testGit.parseFileTreeItem);
      expect(result)
        .to
        .eql([{
          type: 'tblob',
          hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
          path: 'app.js',
        }]);
    });
  });
});
