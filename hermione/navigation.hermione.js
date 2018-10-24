const assert = require('assert');

describe('Навигация по страницам', () => {

  it('Переход с истории коммитов на список файлов', function() {
    return this.browser
      .url('/')
      .assertNavigation('.commit__link a', '.content--files');
  });

  it('Переход со списка файлов на вложенную папку', function() {
    return this.browser
      .url('/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/')
      .assertNavigation('.files__link--tree', '.content--files');
  });

  it('Переход со списка файлов на отдельный файл', function() {
    return this.browser
      .url('/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/')
      .assertNavigation('.files__link--blob', '.content--file');
  });

  it('Переход по хлебным крошкам', function() {
    return this.browser
      .url('/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/')
      .assertNavigation('.breadcrumbs a:nth-child(1)', '.content--history');
  });

});
