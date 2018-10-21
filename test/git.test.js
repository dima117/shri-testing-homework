const Git = require('../utils/git');
const req = {
  query: { testing: '1' }
};
let git;
const assert = require('assert');

describe('Проверка методов git.js', function () {
  beforeEach(() => {
    git = new Git(req);
  })
  
  describe('parseHistoryItem', function () {
    it('возвращает объект', function () {
        let line = 'hash	Дарья Фурзикова	2018-10-21 13:05:48 +0300	Добавила package-lock.json';

        assert.deepEqual(git.parseHistoryItem(line), {
          hash: 'hash',
          author: 'Дарья Фурзикова',
          timestamp: '2018-10-21 13:05:48 +0300',
          msg: 'Добавила package-lock.json'
      });
    });
  });

  describe('fileContent', function () {
    it('возвращает данные файла', function (done) {
      git.fileContent('25c8fdbaba62c31aacfa2307975b06fbfd017485').then((str) => {
        assert.strictEqual(str, 'node_modules\npackage-lock.json');

        done();
      });
    });
  });

  describe('fileTree', function () {
    it('возвращает данные', function (done) {
      git.fileTree('b7e2f3447e3bcf2507a4162959a62389b48dada7', '.gitignore').then((data) => {
        assert.deepEqual(data, [ 
          { 
            type: 'blob',
            hash: '25c8fdbaba62c31aacfa2307975b06fbfd017485',
            path: '.gitignore' 
          } 
        ]);
        
        done();
      });
    });
  });

  describe('history', function () {
    it('возвращает данные', function (done) {
      git.history(1, 20).then((list) => {
        assert.deepEqual(list,[
          { 
            hash: 'b7e2f3447e3bcf2507a4162959a62389b48dada7',
            author: 'Дарья Фурзикова',
            timestamp: '2018-10-21 13:05:48 +0300',
            msg: 'Добавила package-lock.json' 
          },
          { 
            hash: 'd1b8771f85a92461514875dc69bfc770fb1937f4',
            author: 'Дарья Фурзикова',
            timestamp: '2018-10-21 13:02:47 +0300',
            msg: 'Добавила файл конфиг для гермионы' 
          }
        ]);
        
        done();
      });
    });
  });

})
