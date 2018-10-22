const assert = require('chai').assert;
const url = '/files/a35931b770328564ddde0ca70ccdab832b22e97a/';

describe('Открываю страницу c корневой файловой структурой комита', function() {
  it('выводится файловая структура', function() {
    return this.browser
      .url(url)
      .element('.content')
      .isExisting('ul')
      .then(exist => {
        assert.ok(exist, 'файловая структура не выводится');
      });
  });

  it('список состоит из 14 позиций', function() {
    return this.browser
      .url(url)
      .element('.content')
      .element('ul')
      .elements('li a')
      .then(items => {
        assert.equal(items.value.length, 14);
      });
  });

  it('вид корневой файловой структкуры не изменился', function() {
    return this.browser
      .url(url)
      .element('.content')
      .element('ul')
      .assertView('plain', 'ul');
  });
});
