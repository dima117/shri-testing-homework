/* eslint-disable no-undef */
const assert  = require('assert');
const { indexUrl, contentUrlParts }= require('./testConstants');
const testContentUrl = contentUrlParts.join('/');


describe('"Хлебные крошки": ', () => {

  it('отображаются', function () {
    return this.browser
      .url(indexUrl)
      .isExisting('.breadcrumbs')
      .then(exists => assert.ok(exists, 'хлебные крошки не отображаются'));
  });

  it('Отображается HISTORY на главной странице', function () {
    return this.browser
      .url(indexUrl)
      .getText('.breadcrumbs')
      .then(text => assert.equal(text, 'HISTORY'));
  });

  it('Отображается полный набор "крошек" от HISTORY до файла', function () {
    return this.browser
      .url(testContentUrl)
      .getText('.breadcrumbs')
      .then(text => assert.equal(text, 'HISTORY / ROOT / bar / bar.txt'));
  });

  it('вёрстка корректна на полном наборе "крошек" от HISTORY до файла', function () {
    return this.browser
      .url(testContentUrl)
      .assertView('plain', '.breadcrumbs');
  });

  it('можно перейти к директории файла', function () {
    return this.browser
      .url(testContentUrl)
      .click('.breadcrumbs a:nth-child(3)')
      .getText('.breadcrumbs')
      .then(text => assert.equal(text, 'HISTORY / ROOT / bar'));
  });

  it('можно перейти в корень', function () {
    return this.browser
      .url(testContentUrl)
      .click('.breadcrumbs a:nth-child(2)')
      .getText('.breadcrumbs')
      .then(text => assert.equal(text, 'HISTORY / ROOT'));
  });

  it('можно перейти к истории', function () {
    return this.browser
      .url(testContentUrl)
      .click('.breadcrumbs a')
      .getText('.breadcrumbs')
      .then(text => assert.equal(text, 'HISTORY'));
  });
});
