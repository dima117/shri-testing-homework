const { expect } = require('chai');

const {
  buildFileUrl,
  buildFolderUrl,
  buildBreadcrumbs,
} = require('../navigation');

describe('utils/navigation.js', () => {

  describe('buildFileUrl', () => {

    it('Возвращаемая строка должна начинаться с /content/', () => {
      const url = buildFileUrl();
      expect(url).to.match(/^\/content\//);
    });

  });

  describe('buildFolderUrl', () => {

    it('Возвращаемая строка должна начинаться с /files/', () => {
      const url = buildFolderUrl();
      expect(url).to.match(/^\/files\//);
    });

  });

  describe('buildBreadcrumbs', () => {

    it('По умолчанию длина массива должна равняться 1', () => {
      const breadcrumbs = buildBreadcrumbs();
      expect(breadcrumbs).to.have.lengthOf(1);
    });

    it('Объект массива должен содержать правильные ключи', () => {
      const breadcrumbs = buildBreadcrumbs();
      expect(breadcrumbs[0]).to.have.all.keys('text', 'href');
    });

    it('При передаче hash без path, длина массива должна равняться 2', () => {
      const breadcrumbs = buildBreadcrumbs('hash');
      expect(breadcrumbs).to.have.lengthOf(2);
    });

    it('При передаче hash и path, длина массива должна быть больше 2', () => {
      const breadcrumbs = buildBreadcrumbs('hash', 'path');
      expect(breadcrumbs).to.have.lengthOf.above(2);
    });

    it('При передаче hash и path, должен правильно разбираться путь и длина массива должна быть больше 3', () => {
      const breadcrumbs = buildBreadcrumbs('hash', 'path/path');
      expect(breadcrumbs).to.have.lengthOf.above(3);
    });

    it('При передаче hash и path, последний объект массива не должен содержать ключ href', () => {
      const breadcrumbs = buildBreadcrumbs('hash', 'path/path');
      expect(breadcrumbs[breadcrumbs.length - 1]).to.not.have.property('href');
    });

  });

});
