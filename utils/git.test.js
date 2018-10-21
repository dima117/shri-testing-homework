const { expect } =  require('chai');
const gitUtil = require('../utils/git');

describe("Тест блока git", () => {

  describe("Тест gitHistory", () => {

    it("Вызов без аргументов", async () => {
      let result;
      gitUtil.command = (...args) => {
        result = args;
        return Promise.resolve('');
      };

      await gitUtil.gitHistory();

      expect(result).to.deep.equal(['git', [
        'log',
        '--pretty=format:%H%x09%an%x09%ad%x09%s',
        '--date=iso',
        '--skip',
        0,
        '-n',
        10
      ]]);
    });

    it("Вызов с произвольными аргументами", async () => {
      const page = 4;
      const size = 5;
      let result;

      gitUtil.command = (...args) => {
        result = args;
        return Promise.resolve('');
      };

      await gitUtil.gitHistory(page, size);

      expect(result).to.deep.equal(['git', [
        'log',
        '--pretty=format:%H%x09%an%x09%ad%x09%s',
        '--date=iso',
        '--skip',
        15,
        '-n',
        5
      ]]);
    });

    it("Корректная обработка полученных данных", async () => {
      
      gitUtil.command = () => {
        return Promise.resolve('my hash\tme\tmy timestamp\tmy message');
      };

      const result = await gitUtil.gitHistory();

      expect(result).to.deep.equal([{
        "hash": "my hash",
        "author": "me",
        "timestamp": "my timestamp",
        "msg": "my message"
      }]);
    });

  });

  describe("Тест gitFileTree", () => {

    it("Вызов без аргументов", async () => {
      
      gitUtil.command = () => {
        return Promise.resolve('1 type aa0045bb88\ttest/folder/path');
      };
      
      const result = await gitUtil.gitFileTree();

      expect(result).to.deep.equal([{
          "type": "type",
          "hash": "aa0045bb88",
          "path": "test/folder/path"
      }]);

    });

    it("Корректная обработка полученных данных", async () => {
      
      gitUtil.command = () => {
        return Promise.resolve('1 type aa0045bb88\ttest/folder/path');
      };
      
      const result = await gitUtil.gitFileTree("aa0045bb88", "test/folder/path");

      expect(result).to.deep.equal([{
          "type": "type",
          "hash": "aa0045bb88",
          "path": "test/folder/path"
      }]);

    });

  });

  describe("Тест gitFileContent", () => {

    it("Получение содержимого", async () => {
      let result;

      gitUtil.command = (...args) => {
        result = args;
        return Promise.resolve('');
      };
      
      await gitUtil.gitFileContent("aa0045bb88");

      expect(result).to.deep.equal(['git', ['show', 'aa0045bb88']]);

    });

  });

});