const chai = require('chai');
const expect = chai.expect;
const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../utils/navigation');

describe('Проверка навигации по ссылкам', () => {
  it('Формируется url к папке до элемента и от заданного элемента по заданной вложенности', () => {
    //подготовка
    const path = 'b';
    const parentHash = 'a';
    //действие
    const resultBuildFolderUrl = buildFolderUrl(parentHash, path);
    //проверка
    expect(resultBuildFolderUrl).to.eql('/files/a/b');
  });

  it('Формируется url к папке до указанного элемента', () => {
    //подготовка
    const parentHash = 'a';
    //действие
    const resultBuildFolderUrl = buildFolderUrl(parentHash);
    //проверка
    expect(resultBuildFolderUrl).to.eql('/files/a/');
  });

  it('Формируется url до файла от при указании элемента и относительного пути до файла', () => {
    //подготовка
    const path = 'b';
    const parentHash = 'a';
    //действие
    const resultBuildFileUrl = buildFileUrl(parentHash, path);
    //проверка
    expect(resultBuildFileUrl).to.eql('/content/a/b');
  });

  describe('Хлебные крошки:', () => {
    it('Первый элемент - история', () => {
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

    it('Содержимое коммита - HISTORY/ROOT', () => {
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

    it('Содержимое коммита и пустой путь вложенности - HISTORY/ROOT', () => {
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

    it('У последнего элемента должен быть пустой адрес', () => {
      //подготовка
      const hash = 'a';
      const path = '';
      //действие
      const resultBuildBreadCrumbs = buildBreadcrumbs(hash, path);
      //проверка
      expect(resultBuildBreadCrumbs[resultBuildBreadCrumbs.length - 1].href).to.deep.equal(undefined);
    });

    describe('Отображаются хлебные крошки вложенных папок', () => {
      it('отображаются хлебные крошки первого уровня вложенности', () => {
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

      it('отображаются хлебные крошки второго уровня вложенности', () => {
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
});
