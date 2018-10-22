const assert = require('assert');

describe('Навигация по страницам', () => {

  it('Переход с истории коммитов на список файлов', function() {
    return this.browser
      .url('/')
      .isExisting('.commit__link a')
      .then(exists => {
        assert.ok(exists, 'Ссылка для перехода не найдена');
      })
      .click('.commit__link a')
      .isExisting('.content--files')
      .then(exists => {
        assert.ok(exists, 'Переход по ссылке происходит некорректно');
      });
  });

  it('Переход со списка файлов на вложенную папку', function() {
    return this.browser
      .url('/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/')
      .isExisting('.files__link--tree')
      .then(exists => {
        assert.ok(exists, 'Ссылка для перехода не найдена');
      })
      .click('.files__link--tree')
      .isExisting('.content--files')
      .then(exists => {
        assert.ok(exists, 'Переход по ссылке происходит некорректно');
      });
  });

  it('Переход со списка файлов на отдельный файл', function() {
    return this.browser
      .url('/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/')
      .isExisting('.files__link--blob')
      .then(exists => {
        assert.ok(exists, 'Ссылка для перехода не найдена');
      })
      .click('.files__link--blob')
      .isExisting('.content--file')
      .then(exists => {
        assert.ok(exists, 'Переход по ссылке происходит некорректно');
      });
  });

  it('Переход по хлебным крошкам', function() {
    return this.browser
      .url('/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/')
      .isExisting('.breadcrumbs a:nth-child(1)')
      .then(exists => {
        assert.ok(exists, 'Ссылка для перехода не найдена');
      })
      .click('.breadcrumbs a:nth-child(1)')
      .isExisting('.content--history')
      .then(exists => {
        assert.ok(exists, 'Переход по ссылке происходит некорректно');
      });
  });

});
