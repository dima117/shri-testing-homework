const { expect } = require('chai');
const { buildIndexPage, buildFilesPage, buildContentPage } = require('../utils/buildPage');

describe('формирование страниц перед рендером', () => {
  describe('indexPage', () => {
    // подготовка
    const history = [
      {
        hash: '83736c5588bfc7ab6f25a2bf5b438ac789aa769a',
        author: 'Evgenii Starostin',
        timestamp: '2018-10-18 17:19:36 +0300',
        msg: 'изменил названия тестов',
      },
      {
        hash: '5d22753d2cbd326fb74c81bca51025e9ebc1d5b3',
        author: 'Evgenii Starostin',
        timestamp: '2018-10-18 03:06:32 +0300',
        msg: 'добавил firefox в интеграционные тесты',
      },
    ];

    // действие
    const indexPage = buildIndexPage(history);

    it('в объектах массива list есть свойство href', () => {
      // проверка
      expect(indexPage.list[0]).to.have.property('href');
    });

    it('в возращаемом объекте есть корректный заголовок', () => {
      // проверка
      expect(indexPage).to.have.property('title', 'history');
    });

    it('в возращаемом объекте есть "хлебные крошки"', () => {
      // проверка
      expect(indexPage).to.have.property('breadcrumbs');
    });

    it('в возращаемом объекте есть список коммитов', () => {
      // проверка
      expect(indexPage.list).to.have.lengthOf(2);
    });
  });

  describe('filesPage', () => {
    // подготовка
    const list = [
      {
        type: 'blob',
        hash: '6e294e95c4d03a00bf72ed12348332ec3d6372db',
        path: 'controllers/contentController.js',
      },
      {
        type: 'tree',
        hash: '6a1c8de449609cf3a6dc4a0fc2c8ba1896f54abf',
        path: 'controllers/',
      },
      {
        type: '',
        hash: 'some_hash',
        path: 'some_path',
      },
    ];

    const hash = '83736c5588bfc7ab6f25a2bf5b438ac789aa769a';
    const pathParam = ['controllers'];

    // действие
    const filesPage = buildFilesPage(list, hash, pathParam);

    it('в объектах массива files есть свойство href', () => {
      // проверка
      expect(filesPage.files[0]).to.have.property('href');
    });

    it('в объектах массива files есть свойство name', () => {
      // проверка
      expect(filesPage.files[0]).to.have.property('name', 'contentController.js');
    });

    it('в возращаемом объекте есть корректный заголовок', () => {
      // проверка
      expect(filesPage).to.have.property('title', 'files');
    });

    it('в возращаемом объекте есть "хлебные крошки"', () => {
      // проверка
      expect(filesPage).to.have.property('breadcrumbs');
    });

    it('в возращаемом объекте есть список файлов', () => {
      // проверка
      expect(filesPage.files).to.have.lengthOf(3);
    });
  });

  describe('contentPage', () => {
    // подготовка
    const content = 'content';

    const hash = '83736c5588bfc7ab6f25a2bf5b438ac789aa769a';
    const path = ['controllers', 'indexController.js'];

    // действие
    const contentPage = buildContentPage(content, hash, path);

    it('в возращаемом объекте есть корректное свойство контент', () => {
      // проверка
      expect(contentPage).to.have.property('content', content);
    });

    it('в возращаемом объекте есть корректный заголовок', () => {
      // проверка
      expect(contentPage).to.have.property('title', 'content');
    });

    it('в возращаемом объекте есть "хлебные крошки"', () => {
      // проверка
      expect(contentPage).to.have.property('breadcrumbs');
    });
  });
});
