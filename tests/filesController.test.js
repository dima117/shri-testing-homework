const {Git} = require('../utils/git');
const assert = require('chai').assert;
const {getFiles} = require('../controllers/filesController');


describe('Проверяем страницу с файлами', () => {
  it('Получаем список с файлами', async function () {
    getFiles()

  })
});