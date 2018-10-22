const assert = require('assert');

const testUtl = 'http://localhost:3000/';
const testUtlFile = 'http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
const testUtlContent = 'http://localhost:3000/content/90180910fc27a11272a3e5caeeb119a51e5c0545/package.json/';


describe('Проверка наличия элементов на странице', () => {
  describe('Главная', () => {
    it('Контейнер (.container)', function () {
      return this.browser
        .url(testUtl)
        .assertExists('.container', 'Контейнер не появились');
    });
    it('Хлебные крошки (.breadcrumbs)', function () {
      return this.browser
        .url(testUtl)
        .assertExists('.breadcrumbs', 'Хлебные крошки не появились');
    });
    it('Контент (.content)', function () {
      return this.browser
        .url(testUtl)
        .assertExists('.content', 'Контент не появился');
    });
    it('Коммит (.commit)', function () {
      return this.browser
        .url(testUtl)
        .assertExists('.commit:first-child', 'Коммиты не появились');
    });
    it('Информация о коммите (.commit__info)', function () {
      return this.browser
        .url(testUtl)
        .assertExists('.commit__info', 'Информация о коммите не появилась');
    });
    it('Информация об авторе коммита (.commit__author)', function () {
      return this.browser
        .url(testUtl)
        .assertExists('.commit__author', 'Информация об авторе коммита не появилась');
    });
    it('Информация о дате коммита (.commit__date)', function () {
      return this.browser
        .url(testUtl)
        .assertExists('.commit__date', 'Информация о дате коммита не появилась');
    });
    it('Сообщение коммита (.commit__msg)', function () {
      return this.browser
        .url(testUtl)
        .assertExists('.commit__msg', 'Сообщение коммита не появилось');
    });
    it('Ссылка коммита (.commit__link)', function () {
      return this.browser
        .url(testUtl)
        .assertExists('.commit__link', 'Ссылка коммита не появилась');
    });
    it('HISTORY в хлебных крошках', function () {
      return this.browser.getText('.breadcrumbs', false)
        .then(elem => assert.equal(elem, 'HISTORY'), 'В хлебных крошках нет HISTORY');
    });
  });
  describe('Список файлов', () => {
    it('Контейнер (.container)', function () {
      return this.browser
        .url(testUtlFile)
        .assertExists('.container', 'Контейнер не появились');
    });
    it('Хлебные крошки (.breadcrumbs)', function () {
      return this.browser
        .url(testUtlFile)
        .assertExists('.breadcrumbs', 'Хлебные крошки не появились');
    });
    it('Ссылки хлебных кроше (.breadcrumbs a)', function () {
      return this.browser
        .url(testUtlFile)
        .assertExists('.breadcrumbs a', ' Ссылки хлебных крошек не появились');
    });
    it('Контент (.content)', function () {
      return this.browser
        .url(testUtlFile)
        .assertExists('.content', 'Контент не появился');
    });
    it('Список (.content ul)', function () {
      return this.browser
        .url(testUtlFile)
        .assertExists('.content ul', 'Список не появились');
    });
    it('Элемент списка (.content ul li:first-child)', function () {
      return this.browser
        .url(testUtlFile)
        .assertExists('.content ul li:first-child', 'Элемент списка не появились');
    });
  });
  describe('Содержимое файла', () => {
    it('Контейнер (.container)', function () {
      return this.browser
        .url(testUtlContent)
        .assertExists('.container', 'Контейнер не появились');
    });
    it('Хлебные крошки (.breadcrumbs)', function () {
      return this.browser
        .url(testUtlContent)
        .assertExists('.breadcrumbs', 'Хлебные крошки не появились');
    });
    it('Ссылки хлебных кроше (.breadcrumbs a)', function () {
      return this.browser
        .url(testUtlContent)
        .assertExists('.breadcrumbs a', 'Ссылки хлебных крошек не появились');
    });
    it('Контент (.content)', function () {
      return this.browser
        .url(testUtlContent)
        .assertExists('.content', 'Контент не появился');
    });
    it('Сожержмое файла (.file-content)', function () {
      return this.browser
        .url(testUtlContent)
        .assertExists('.file-content', 'Содержимое файла не появилось');
    });
  });
});
