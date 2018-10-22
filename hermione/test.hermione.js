const assert = require('assert');

describe('содержимое отображается правильно на странице', () => {
  describe('"история коммитов"', () => {
    it('на странице должен присутствовать блок c классом history', function () {
      return this.browser
        .url('/')
        .isExisting('.history')
        .then(exists => assert.ok(exists, 'История коммитов не отображается'));
    });
  });

  describe('"просмотр файловой системы"', () => {
    it('на странице должен присутствовать блок files-tree', function () {
      return this.browser
        .url('/files/e823960b0f7cada45c5f210cf607f4dc2126f85b/')
        .isExisting('.files-tree')
        .then(exists => assert.ok(exists, 'Файловая система не отображается'))
        .assertView('plain', '.files-tree');
    });
  });

  describe('"просмотр содержимого файла"', () => {
    it('на странице должен присутствовать блок file-content', function () {
      return this.browser
        .url('/content/e823960b0f7cada45c5f210cf607f4dc2126f85b/app.js')
        .isExisting('.file-content')
        .then(exists => assert.ok(exists, 'Содержимое файла не отображается'))
        .assertView('plain', '.file-content');
    });
  });
});

describe('правильно работают переходы по страницам: ', () => {
  describe('из списка коммитов на список файлов', () => {
    it('Заголовок страницы должен быть "files"', function () {
      return this.browser
        .url('/')
        .click('.commit__link a')
        .getTitle()
        .then(title => assert.equal(title, 'files', 'переход на страницу просмотра файловой системы не состоялся'));
    });
  });

  describe('из списка файлов во вложенную папку', () => {
    it('Заголовок страницы должен не изменится и остаться "files"', function () {
      return this.browser
        .url('/files/e823960b0f7cada45c5f210cf607f4dc2126f85b/')
        .click('.files-tree li a[href$="bin"]')
        .getTitle()
        .then(title => assert.equal(title, 'files', 'переход из списка файлов во вложенную папку не состоялся'));
    });
  });

  describe('из списка файлов на страницу отдельного файла', () => {
    it('Заголовок страницы должен быть "content"', function () {
      return this.browser
        .url('/files/e823960b0f7cada45c5f210cf607f4dc2126f85b/')
        .click('.files-tree li a[href$="app.js"]')
        .getTitle()
        .then(title => assert.equal(title, 'content', 'переход на страницу содержимого файла не состоялся'));
    });
  });

  describe('переходы по хлебным крошкам', () => {
    it('при клике на "хлебные крошки" должен осуществляться переход', function () {
      return this.browser
        .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/bin')
        .assertView('plain', '.breadcrumbs')
        .click('.breadcrumbs a[href="/"]')
        .assertView('clicked', '.breadcrumbs');
    });
  });
});
