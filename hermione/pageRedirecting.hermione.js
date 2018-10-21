describe('Переход по страницам', function () {
  it('переход из списка коммитов к списку файлов', function () {
    return this.browser.checkBreadCrumbs('/files/3614243f6fb6b0d5c2528c76ad96b6c3ac092ab0/controllers', 'a=ROOT');
  });

  it('переход от списка файлов во вложенную папку', function () {
    return this.browser.checkBreadCrumbs('/files/3614243f6fb6b0d5c2528c76ad96b6c3ac092ab0/', 'a=controllers');
  });

  it('переход от списка файлов на страницу отдельного файла', function () {
    return this.browser.checkBreadCrumbs('/files/3614243f6fb6b0d5c2528c76ad96b6c3ac092ab0/', 'a=README.md');
  });

  it('переход co страницы отдельного файла на страницу списка файлов', function () {
    return this.browser
      .checkBreadCrumbs(
        '/content/3614243f6fb6b0d5c2528c76ad96b6c3ac092ab0/controllers/contentController.js',
        'a=controllers'
      );
  });

  it('переход из вложенной папки на страницу списка файлов', function () {
    return this.browser.checkBreadCrumbs('/files/3614243f6fb6b0d5c2528c76ad96b6c3ac092ab0/controllers/', 'a=ROOT');
  });

  it('переход от списка файлов к списку коммитов', function () {
    return this.browser.checkBreadCrumbs('/files/3614243f6fb6b0d5c2528c76ad96b6c3ac092ab0/', 'a=HISTORY');
  });
});
