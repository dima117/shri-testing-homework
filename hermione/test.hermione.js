const assert = require('assert');

describe('содержимое отображается правильно на странице', () => {
  describe('"история коммитов"', () => {
    it('на странице присутствуют коммиты', function () {
      return this.browser
        .url('/')
        .isExisting('.content')
        .isExisting('.breadcrumbs')
        .then(exists => assert.ok(exists, 'История коммитов не отображается'))
        .assertView('plain', 'body');
    });
  });

  describe('"просмотр файловой системы"', () => {
    it('на странице должен присутствовать блок files-tree', function () {
      return this.browser
        .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
        .isExisting('.content ul')
        .isExisting('.breadcrumbs')
        .then(exists => assert.ok(exists, 'Файловая система не отображается'))
        .assertView('plain', 'body');
    });
  });

  describe('"просмотр содержимого файла"', () => {
    it('на странице должен присутствовать блок file-content', function () {
      return this.browser
        .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/README.md')
        .isExisting('.content .file-content')
        .isExisting('.breadcrumbs')
        .then(exists => assert.ok(exists, 'Содержимое файла не отображается'))
        .assertView('plain', 'body');
    });
  });
});

describe('правильно работают переходы по страницам: ', () => {
  describe('из списка коммитов на список файлов', () => {
    it('Заголовок страницы должен быть "files"', function () {
      return this.browser
        .url('/')
        .click('.content .commit:nth-of-type(1) .commit__link a')
        .getTitle()
        .then(title => assert.equal(title, 'files', 'переход на страницу просмотра файловой системы не состоялся'));
    });
  });

  describe('из списка файлов во вложенную папку', () => {
    it('Заголовок страницы должен не изменится и остаться "files"', function () {
      return this.browser
        .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
        .click('.content ul li a[href="/files/90180910fc27a11272a3e5caeeb119a51e5c0545/bin"]')
        .getTitle()
        .then(title => assert.equal(title, 'files', 'переход из списка файлов во вложенную папку не состоялся'));
    });
  });

  describe('из списка файлов на страницу отдельного файла', () => {
    it('Заголовок страницы должен быть "content"', function () {
      return this.browser
        .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
        .click('.content ul li a[href="/content/90180910fc27a11272a3e5caeeb119a51e5c0545/app.js"]')
        .getTitle()
        .then(title => assert.equal(title, 'content', 'переход на страницу содержимого файла не состоялся'));
    });
  });

  describe('переходы по хлебным крошкам', () => {
    it('при клике на HISTORY осуществляется переход к истории коммитов', function () {
      return this.browser
        .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
        .assertView('plain', '.breadcrumbs')
        .click('.breadcrumbs a[href="/"]')
        .getTitle()
        .then(title => assert.equal(title, 'history', 'переход на страницу истории коммитов не состоялся'))
        .assertView('clicked', '.breadcrumbs');
    });

    it('при клике на название папки осуществляется переход к списку файлов', function () {
      return this.browser
        .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/app.js')
        .assertView('plain', '.breadcrumbs')
        .click('.breadcrumbs a[href="/files/90180910fc27a11272a3e5caeeb119a51e5c0545/"]')
        .getTitle()
        .then(title => assert.equal(title, 'files', 'переход на страницу просмотра файловой системы не состоялся'))
        .assertView('clicked', '.breadcrumbs');
    });
  });
});
