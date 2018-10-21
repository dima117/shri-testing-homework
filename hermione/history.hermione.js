const assert = require('assert');

describe('Контент', () => {
  it('появился на странице', function () {
    return this.browser
      .buildUrl()
      .isExisting('.container')
      .then((exists) => {
        assert.ok(exists, 'не появился');
      });
  });
})

describe('История коммитов', () => {
  it('появилась в блоке контент', function () {
    return this.browser
      .buildUrl()
      .isExisting('.container .commit')
      .then((exists) => {
        assert.ok(exists, 'не появилась');
      });
  });
})

describe('Информация о коммите' , () => {
  it('можно пройти по сommit__link', function () {
    return this.browser
      .buildUrl()
      .getAttribute('.commit__link > a', 'href')
      .then((hrefs) => {
        assert.strictEqual(hrefs[0], 'http://localhost:3000/files/b7e2f3447e3bcf2507a4162959a62389b48dada7/');
      });
  });

  it('появился блок с информацией', function () {
    return this.browser
      .buildUrl()
      .isExisting('.commit:first-child .commit__info')
      .then((exists) => {
        assert.ok(exists, 'не появился');
      })
      .assertView('plain', '.commit:first-child .commit__info');
  });
})

