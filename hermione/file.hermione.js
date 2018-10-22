const assert = require('chai').assert;
const url = '/content/a35931b770328564ddde0ca70ccdab832b22e97a/controllers/contentController.js';

describe('Открываю страницу c содержимым файла', function() {
  it('выводится содржимое файла', function() {
    return this.browser
      .url(url)
      .element('.content')
      .isExisting('.file-content')
      .then(exist => {
        assert.ok(exist, 'содержимое файла не выводится');
      });
  });

  it('вид вывода содержтиого файла не изменился', function() {
    return this.browser
      .url(url)
      .element('.content')
      .element('ul')
      .assertView('plain', '.file-content');
  });
});
