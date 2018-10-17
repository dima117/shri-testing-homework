const { parseHistoryItem } = require('../utils/git.js');
const assert = require('assert');

describe('Проверка методов git.js', function () {
  describe('parseHistoryItem', function () {
    it('возвращает объект', function () {
        let line = 'hash	Dmitry Andriyanov	2018-10-16 12:49:56 +0300	исправлена опечатка в readme';

        assert.deepEqual(parseHistoryItem(line), {
          hash: 'hash',
          author: 'Dmitry Andriyanov',
          timestamp: '2018-10-16 12:49:56 +0300',
          msg: 'исправлена опечатка в readme'
      });
    });
  });
})
