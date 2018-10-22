const assert = require('chai').assert;

describe('Открываю главную страницу', function() {
  it('хлебные крошки на главной выводятся', function() {
    return this.browser
      .url('/')
      .isExisting('.breadcrumbs')
      .then(exist => {
        assert.ok(exist, 'хлебные крошки не выводятся');
      });
  });

  it('вид хлебных крошек на главной не изменился', function() {
    return this.browser.url('/').assertView('plain', '.breadcrumbs');
  });
});

describe('Открываю корневую директорию коммита', function() {
  it('хлебные крошки в корневой директорию коммита выводятся', function() {
    return this.browser
      .url('/files/a35931b770328564ddde0ca70ccdab832b22e97a/')
      .isExisting('.breadcrumbs')
      .then(exist => {
        assert.ok(exist, 'хлебные крошки не выводятся');
      });
  });

  it('вид хлебных крошек в корневой директорию коммита не изменился', function() {
    return this.browser.url('/files/a35931b770328564ddde0ca70ccdab832b22e97a/').assertView('plain', '.breadcrumbs');
  });
});

describe('Открываю папку коммита', function() {
  it('хлебные крошки в папке коммита выводятся', function() {
    return this.browser
      .url('/files/a35931b770328564ddde0ca70ccdab832b22e97a/controllers')
      .isExisting('.breadcrumbs')
      .then(exist => {
        assert.ok(exist, 'хлебные крошки не выводятся');
      });
  });

  it('вид хлебных крошек папке коммита не изменился', function() {
    return this.browser
      .url('/files/a35931b770328564ddde0ca70ccdab832b22e97a/controllers')
      .assertView('plain', '.breadcrumbs');
  });
});

describe('Открываю содержимое файла', function() {
  it('хлебные крошки в содержимом файла выводятся', function() {
    return this.browser
      .url('/content/a35931b770328564ddde0ca70ccdab832b22e97a/controllers/contentController.js')
      .isExisting('.breadcrumbs')
      .then(exist => {
        assert.ok(exist, 'хлебные крошки не выводятся');
      });
  });

  it('вид хлебных крошек в содержимом файла не изменился', function() {
    return this.browser
      .url('/content/a35931b770328564ddde0ca70ccdab832b22e97a/controllers/contentController.js')
      .assertView('plain', '.breadcrumbs');
  });
});
