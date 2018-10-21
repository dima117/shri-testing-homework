const assert = require('assert');

describe('Контент', () => {
  it('появился на странице', function () {
    return this.browser
      .url('http://localhost:3000')
      .isExisting('.container')
      .then((exists) => {
        assert.ok(exists, 'не появился');
      });
  });
})

describe('История коммитов', () => {
  it('появился в блоке контент', function () {
    return this.browser
      .url('http://localhost:3000')
      .isExisting('.container .commit')
      .then((exists) => {
        assert.ok(exists, 'не появилась');
      });
  });
})

describe('Хлебные крошки', () => {
  it('появились на странице', function () {
    var bro = this.browser;
    return this.browser
      .url('http://localhost:3000')
      .waitUntil(function(){
        return bro.execute(function() {
            // browser context - you may not access client or console
            return document.readyState === 'complete';
        })
        
      })
      .assertView('plain', '.breadcrumbs')
      .isExisting('.breadcrumbs')
      .then((exists) => {
        assert.ok(exists, 'не появились');
      });
  });
})