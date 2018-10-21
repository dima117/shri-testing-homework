describe('Проверка отображения содержимого страниц', function () {
  it('история коммитов', function () {
    return this.browser.checkPageContent('/');
  });

  it('список файлов', function () {
    return this.browser.checkPageContent('/files/62fe32bbdd7fb755ecd50f5c700bb5e13da132bf/');
  });

  it('страница вложенной папки', function () {
    return this.browser.checkPageContent('/files/62fe32bbdd7fb755ecd50f5c700bb5e13da132bf/controllers');
  });

  it('страница отдельного файла', function () {
    return this.browser
      .checkPageContent('/content/62fe32bbdd7fb755ecd50f5c700bb5e13da132bf/controllers/contentController.js');
  });

  it('страница 404 ошибки', function () {
    return this.browser.checkPageContent('/notpage');
  });

  it('страница 500 ошибки', function () {
    return this.browser.checkPageContent('/files/49e47f280083a35c4e998f648a38f5284d79da4d/');
  });
});
