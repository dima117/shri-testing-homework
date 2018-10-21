const assert = require('assert');

const testUtl = 'http://localhost:3000/';
const testUtlFile = 'http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
const testUtlContent = 'http://localhost:3000/content/90180910fc27a11272a3e5caeeb119a51e5c0545/package.json/';


describe('Скриншот тесты', () => {
  describe('Главная', () => {
    it('Хлебные крошки', function () {
      return this.browser
        .url(testUtl)
        .assertView('plain', '.breadcrumbs');
    });
    it('Первый коммит', function () {
      return this.browser
        .url(testUtl)
        .assertView('plain', '.commit:first-child');
    });
    it('Контент', function () {
      return this.browser
        .url(testUtl)
        .assertView('plain', '.content');
    });
  });
  describe('Список файлов', () => {
    it('Хлебные крошки', function () {
      return this.browser
        .url(testUtlFile)
        .assertView('plain', '.breadcrumbs');
    });
    it('Список', function () {
      return this.browser
        .url(testUtlFile)
        .assertView('plain', '.content ul');
    });
  });
  describe('Содержимое файла', () => {
    it('Хлебные крошки', function () {
      return this.browser
        .url(testUtlContent)
        .assertView('plain', '.breadcrumbs');
    });
    it('Контент', function () {
      return this.browser
        .url(testUtlContent)
        .assertView('plain', '.file-content');
    });
  });
});
