const assert = require('chai').assert;
const url = '/files/a35931b770328564ddde0ca70ccdab832b22e97a/controllers';

describe('Открываю страницу c файловой структурой', function() {
  it('выводится файловая структура', function() {
    return this.browser
      .url(url)
      .element('.content')
      .isExisting('ul')
      .then(exist => {
        assert.ok(exist, 'файловая структура не выводится');
      });
  });

  it('список состоит из 3 позиций', function() {
    return this.browser
      .url(url)
      .element('.content')
      .element('ul')
      .elements('li a')
      .then(items => {
        assert.equal(items.value.length, 3);
      });
  });

  it('вид файловой структкуры папки не изменился', function() {
    return this.browser
      .url(url)
      .element('.content')
      .element('ul')
      .assertView('plain', 'ul');
  });
});
