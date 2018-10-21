const { expect } =  require('chai');
const navUtil = require('../utils/navigation');

describe("Тест блока navigation", () => {

  describe("Тест buildBreadcrumbs", () => {

    it("Корректный ответ при отсутствии аргументов", () => {
      const expected = [
        { text: 'HISTORY', href: undefined },
      ];
      const result = navUtil.buildBreadcrumbs();

      expect(result).to.deep.equal(expected);
    });

    it("Построение крошек", () => {
      const [hash, path] = ['hash', 'path/to/folder'];
      const expected = [
        { text: 'HISTORY', href: '/' },
        { text: 'ROOT', href: '/files/hash/' },
        { text: 'path', href: '/files/hash/path/' },
        { text: 'to', href: '/files/hash/path/to/' },
        { text: 'folder' }
      ];
      const result = navUtil.buildBreadcrumbs(hash, path);

      expect(result).to.deep.equal(expected);
    });

  });

  describe("Тест buildFileUrl", () => {
    
    it("Возвращает URL файла по path и hash", () => {
      const [hash, path] = ['hash', 'path'];
      const result = navUtil.buildFileUrl(hash, path);

      expect(result).to.eq('/content/hash/path');
    });
    
  });

  describe("Тест buildFolderUrl", () => {
    
    it("Возвращает URL папки по path и hash", () => {
      const [hash, path] = ['hash', 'path'];
      const result = navUtil.buildFolderUrl(hash, path);

      expect(result).to.eq('/files/hash/path');
    });
    
  });

});