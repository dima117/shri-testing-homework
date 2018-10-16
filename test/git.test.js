const chai = require('chai');
const expect = chai.expect;
const { gitHistory, gitFileTree, gitFileContent } = require('../utils/git');

/**
 * function gitHistory(page = 1, size = 10)
 */

describe('работа с git', () => {
  describe('gitHistory', () => {
    it('можно ли получить историю из git', () => {
      //подготовка
      const result = 'a';
      //действие
      const resultGitHistory = gitHistory();
      console.log(resultGitHistory);
      //проверка
    });
  });
});
