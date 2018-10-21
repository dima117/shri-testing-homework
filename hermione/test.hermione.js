const assert = require('chai').assert;

describe('Проверка страниц', () => {
   it('Проверка шапки', () => {
      return this.browser
          .url('/')
          // .getText('.breadcrumbs')
          .isExisting('.breadcrumbs')
          .then( title => {
              assert.equal(title, 'шапка меню не появилась')
          });
   });
});