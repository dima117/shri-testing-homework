const chai = require('chai');
const assert = chai.assert;

const { gitHistory } = require('../utils/git');

// const indexController = require('./controllers/indexController');
// Проверка модуля "indexController.js"

// let test = '';
// gitHistory(1, 20).then((history)=> {
//   test = history;
// })
// console.log(test)



describe('Проверка модуля "indexController.js"', () => {
    it('Гит возвращает массив данных истории', () => {
        gitHistory(1, 20).then((history)=> {
			assert.isArray(history, 'Пришел не массив');
        })
    });
  });