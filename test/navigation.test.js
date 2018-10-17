const chai = require('chai');
const expect = chai.expect;
const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../utils/navigation');

describe('работа с navigation', () => {
  describe('buildFolderUrl', () => {
    it('можно ли получить путь до папки по двум параметрам ', () => {
      //подготовка
      const path = 'b';
      const parentHash = 'a';
      //действие
      const resultBuildFolderUrl = buildFolderUrl(parentHash, path);
      //проверка
      expect(resultBuildFolderUrl).to.eql('/files/a/b');
    });

    it('можно ли получить путь до папки с опущенным парметром path ', () => {
      //подготовка
      const parentHash = 'a';
      //действие
      const resultBuildFolderUrl = buildFolderUrl(parentHash);
      //проверка
      expect(resultBuildFolderUrl).to.eql('/files/a/');
    });
  });

  describe('buildFileUrl', () => {
    it('можно ли получить путь до файла по двум параметрам ', () => {
      //подготовка
      const path = 'b';
      const parentHash = 'a';
      //действие
      const resultBuildFileUrl = buildFileUrl(parentHash, path);
      //проверка
      expect(resultBuildFileUrl).to.eql('/content/a/b');
    });
  });

  describe('buildBreadcrumbs', () => {
    it('можно ли получить хлебные крошки - без параметров', () => {
      //подготовка
      const bc = [
        {
          text: 'HISTORY',
          href: undefined
        }
      ];
      //действие
      const resultBuildBreadCrumbs = buildBreadcrumbs();
      //проверка
      expect(resultBuildBreadCrumbs).to.deep.equal(bc);
    });
    it('можно ли получить хлебные крошки - с одним параметром hash', () => {
      //подготовка
      const bc = [
        {
          text: 'HISTORY',
          href: '/'
        },
        {
          text: 'ROOT',
          href: undefined
        }
      ];
      const hash = 'a';
      //действие
      const resultBuildBreadCrumbs = buildBreadcrumbs(hash);
      //проверка
      expect(resultBuildBreadCrumbs).to.deep.equal(bc);
    });
    it('можно ли получить хлебные крошки - с двумя параметрами hash, path - пустая строка', () => {
      //подготовка
      const hash = 'a';
      const path = '';
      const bc = [
        {
          text: 'HISTORY',
          href: '/'
        },
        {
          text: 'ROOT',
          href: undefined
        }
      ];

      //действие
      const resultBuildBreadCrumbs = buildBreadcrumbs(hash, path);
      //проверка
      expect(resultBuildBreadCrumbs).to.deep.equal(bc);
    });
    it('можно ли получить хлебные крошки - с двумя параметрами hash, path', () => {
      //подготовка
      const hash = 'a';
      const path = 'b';
      const bc = [
        {
          text: 'HISTORY',
          href: '/'
        },
        {
          text: 'ROOT',
          href: '/files/a/'
        },
        {
          text: 'b'
        }
      ];

      //действие
      const resultBuildBreadCrumbs = buildBreadcrumbs(hash, path);
      //проверка
      expect(resultBuildBreadCrumbs).to.deep.equal(bc);
    });
    it('можно ли получить хлебные крошки - с двумя параметрами hash, path - вложенность пути', () => {
      //подготовка
      const hash = 'a';
      const path = 'b/с';
      const bc = [
        {
          text: 'HISTORY',
          href: '/'
        },
        {
          text: 'ROOT',
          href: '/files/a/'
        },
        {
          text: 'b',
          href: '/files/a/b/'
        },
        {
          text: 'с'
        }
      ];
      //действие
      const resultBuildBreadCrumbs = buildBreadcrumbs(hash, path);
      //проверка
      expect(resultBuildBreadCrumbs).to.deep.equal(bc);
    });
  });
});
