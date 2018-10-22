const { expect } = require('chai');
const { buildFolderUrl, buildBreadcrumbs, buildFileUrl } = require('../../../utils/navigation');

describe('Построение навигационных ссылок', () => {
  describe('buildFileUrl: получение ссылки на контент файла', () => {
    it('возвращает корректный URL', () => {
      const hash = '0a88cdf2265c0b19663ddbe2733a27e9599724e1';
      const path = 'controllers/indexController.js';

      const resultURL = buildFileUrl(hash, path);

      expect(resultURL).to.equal('/content/0a88cdf2265c0b19663ddbe2733a27e9599724e1/controllers/indexController.js');
    });
  });

  describe('buildFolderUrl: получение ссылки на определенную папку', () => {
    it('возвращает корректный URL при передаче одного параметра', () => {
      const hash = '0a88cdf2265c0b19663ddbe2733a27e9599724e1';

      const resultURL = buildFolderUrl(hash);

      expect(resultURL).to.equal('/files/0a88cdf2265c0b19663ddbe2733a27e9599724e1/');
    });

    it('возвращает корректный URL при передаче двух параметров', () => {
      const hash = '0a88cdf2265c0b19663ddbe2733a27e9599724e1';
      const path = 'controllers/';

      const resultURL = buildFolderUrl(hash, path);

      expect(resultURL).to.equal('/files/0a88cdf2265c0b19663ddbe2733a27e9599724e1/controllers/');
    });
  });

  describe('buildBreadcrumbs: построение "хлебных крошек"', () => {
    it('возвращает корректное значение для главной страницы', () => {
      const resultBreadcrumbs = buildBreadcrumbs();

      expect(resultBreadcrumbs).to.have.deep.members([{ text: 'HISTORY', href: undefined }]);
    });

    it('возвращает корректное значение для корневой папки хэша ', () => {
      const resultBreadcrumbs = buildBreadcrumbs('0a88cdf2265c0b19663ddbe2733a27e9599724e1');

      expect(resultBreadcrumbs).to.have.deep.members([{ text: 'HISTORY', href: '/' }, { text: 'ROOT', href: undefined }]);
    });

    it('возвращает корректное значение пути к файлу ', () => {
      const resultBreadcrumbs = buildBreadcrumbs('0a88cdf2265c0b19663ddbe2733a27e9599724e1', '/controllers/filesController.js');

      expect(resultBreadcrumbs).to.have.deep.members([
        { text: 'HISTORY', href: '/' },
        { text: 'ROOT', href: '/files/0a88cdf2265c0b19663ddbe2733a27e9599724e1/' },
        { text: 'controllers', href: '/files/0a88cdf2265c0b19663ddbe2733a27e9599724e1/controllers/' },
        { text: 'filesController.js' },
      ]);
    });
  });
});
