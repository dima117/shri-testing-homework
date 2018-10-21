const { expect } = require('chai');

const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../../utils/navigation');

describe('проверка navigation', function() {
  it('можно получить url папки', function() {
    // подготовка
    const hash = 'f69c43393449afe9284f3fa20010695a5faa3849';
    const path = 'folder1/folder2/';
    const expectedResult = `/files/${hash}/${path}`;

    // действие
    const actualResult = buildFolderUrl(hash, path);

    // проверка
    expect(actualResult).to.equal(expectedResult);
  });

  it('можно получить url папки без передачи path', function() {
    // подготовка
    const hash = 'f69c43393449afe9284f3fa20010695a5faa3849';
    const expectedResult = `/files/${hash}/`;

    // действие
    const actualResult = buildFolderUrl(hash);

    // проверка
    expect(actualResult).to.equal(expectedResult);
  });

  it('можно получить url файла', function() {
    // подготовка
    const hash = 'f69c43393449afe9284f3fa20010695a5faa3849';
    const path = 'folder1/folder2/';
    const expectedResult = `/content/${hash}/${path}`;

    // действие
    const actualResult = buildFileUrl(hash, path);

    // проверка
    expect(actualResult).to.equal(expectedResult);
  });

  it('можно получить хлебные крошки находясь в папке с историей', function() {
    // подготовка
    const hash = '';
    const expectedResult = [
      {
        text: 'HISTORY',
        href: undefined
      }
    ];

    // действие
    const actualResult = buildBreadcrumbs(hash);

    // проверка
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('можно получить хлебные крошки находясь в корневой папке', function() {
    // подготовка
    const hash = 'f69c43393449afe9284f3fa20010695a5faa3849';
    const expectedResult = [
      {
        text: 'HISTORY',
        href: '/'
      },
      {
        text: 'ROOT',
        href: undefined
      }
    ];

    // действие
    const actualResult = buildBreadcrumbs(hash);

    // проверка
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('можно получить хлебные крошки находясь в файле', function() {
    // подготовка
    const hash = 'f69c43393449afe9284f3fa20010695a5faa3849';
    const path = 'folder1/folder2/file.js';
    const expectedResult = [
      {
        text: 'HISTORY',
        href: '/'
      },
      {
        text: 'ROOT',
        href: `/files/${hash}/`
      },
      {
        text: 'folder1',
        href: `/files/${hash}/folder1/`
      },
      {
        text: 'folder2',
        href: `/files/${hash}/folder1/folder2/`
      },
      {
        text: 'file.js'
      }
    ];

    // действие
    const actualResult = buildBreadcrumbs(hash, path);

    // проверка
    expect(actualResult).to.deep.equal(expectedResult);
  });
});
