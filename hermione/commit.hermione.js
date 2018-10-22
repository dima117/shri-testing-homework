const assert = require('chai').assert;
const url = '/';

describe('Открываю главную страницу со списком комитов', function() {
  it('в списке коммитов выводится коммит', function() {
    return this.browser
      .url(url)
      .element('.content')
      .isExisting('.commit')
      .then(exist => {
        assert.ok(exist, 'коммит не вывелся');
      });
  });

  it('у коммита есть автор', function() {
    return this.browser
      .url(url)
      .element('.commit')
      .getText('.commit__author')
      .then(author => {
        assert.equal(author, 'Ivan Kolobaev');
      });
  });

  it('у коммита есть дата', function() {
    return this.browser
      .url(url)
      .element('.commit')
      .getText('.commit__date')
      .then(date => {
        assert.equal(date, '2018-10-22 01:03:53 +0300');
      });
  });

  it('у коммита есть описание', function() {
    return this.browser
      .url(url)
      .element('.commit')
      .getText('.commit__msg')
      .then(msg => {
        assert.equal(msg, 'Добавлено hermione');
      });
  });

  it('у коммита есть хэш', function() {
    return this.browser
      .url(url)
      .element('.commit')
      .getText('.commit__link')
      .then(link => {
        assert.equal(link, 'a35931b770328564ddde0ca70ccdab832b22e97a');
      });
  });

  it('вид коммита не изменился', function() {
    return this.browser
      .url(url)
      .element('.content')
      .element('.commit')
      .assertView('plain', '.commit');
  });
});
