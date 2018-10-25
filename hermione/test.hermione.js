const assert = require('assert');

describe('содержимое отображается правильно на странице', () => {
  describe('"история коммитов"', () => {
    it('на странице должны присутствуют коммиты', function () {
      return this.browser
        .url('/')
        .isExisting('.content')
        .then(exists => assert.ok(exists, 'История коммитов не отображается'))
        .assertView('plain', '.content');
    });
  });

  describe('"просмотр файловой системы"', () => {
    it('на странице должен присутствовать список файлов', function () {
      const filesPageUrl = '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';

      return this.browser
        .url(filesPageUrl)
        .isExisting('.content ul')
        .then(exists => assert.ok(exists, 'Файловая система не отображается'))
        .assertView('plain', '.content');
    });
  });

  describe('"просмотр содержимого файла"', () => {
    it('на странице должен присутствовать блок с контентом', function () {
      const contentPageUrl = '/content/90180910fc27a11272a3e5caeeb119a51e5c0545/README.md';

      return this.browser
        .url(contentPageUrl)
        .isExisting('.content .file-content')
        .then(exists => assert.ok(exists, 'Содержимое файла не отображается'))
        .assertView('plain', '.content');
    });
  });
});

describe('правильно работают переходы по страницам: ', () => {
  describe('из списка коммитов на список файлов', () => {
    it('Заголовок страницы должен быть "files"', function () {
      const commitLink = '.content .commit .commit__link a[href="/files/90180910fc27a11272a3e5caeeb119a51e5c0545/"]';

      return this.browser
        .url('/')
        .click(commitLink)
        .getTitle()
        .then(title => assert.equal(title, 'files', 'переход на страницу просмотра файловой системы не состоялся'));
    });
  });

  describe('из списка файлов во вложенную папку', () => {
    it('Заголовок страницы должен не изменится и остаться "files"', function () {
      const filesPageUrl = '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
      const folderLink = '.content ul li a[href="/files/90180910fc27a11272a3e5caeeb119a51e5c0545/bin"]';

      return this.browser
        .url(filesPageUrl)
        .click(folderLink)
        .getTitle()
        .then(title => assert.equal(title, 'files', 'переход из списка файлов во вложенную папку не состоялся'));
    });
  });

  describe('из списка файлов на страницу отдельного файла', () => {
    const filesPageUrl = '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
    const fileLink = '.content ul li a[href="/content/90180910fc27a11272a3e5caeeb119a51e5c0545/app.js"]';

    it('Заголовок страницы должен быть "content"', function () {
      return this.browser
        .url(filesPageUrl)
        .click(fileLink)
        .getTitle()
        .then(title => assert.equal(title, 'content', 'переход на страницу содержимого файла не состоялся'));
    });
  });

  describe('переходы по хлебным крошкам', () => {
    it('при клике на HISTORY осуществляется переход к истории коммитов', function () {
      const filesPageUrl = '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
      const rootLink = '.breadcrumbs a[href="/"]';

      return this.browser
        .url(filesPageUrl)
        .assertView('plain', '.breadcrumbs')
        .click(rootLink)
        .getTitle()
        .then(title => assert.equal(title, 'history', 'переход на страницу истории коммитов не состоялся'))
        .assertView('clicked', '.breadcrumbs');
    });

    it('при клике на название папки осуществляется переход к списку файлов', function () {
      const contentPageUrl = '/content/90180910fc27a11272a3e5caeeb119a51e5c0545/app.js';
      const folderLink = '.breadcrumbs a[href="/files/90180910fc27a11272a3e5caeeb119a51e5c0545/"]';

      return this.browser
        .url(contentPageUrl)
        .assertView('plain', '.breadcrumbs')
        .click(folderLink)
        .getTitle()
        .then(title => assert.equal(title, 'files', 'переход на страницу просмотра файловой системы не состоялся'))
        .assertView('clicked', '.breadcrumbs');
    });
  });
});
