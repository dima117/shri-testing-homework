const { expect } = require('chai');
const { buildBreadcrumbs, buildFolderUrl, buildFileUrl } = require('../utils/navigation');

describe('"хлебные крошки"', function () {
  it('функция buildBreadcrumbs на вход принимает hash и path, возвращает массив "хлебных крошек"', function () {
    // подготовка
    const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
    const path = 'controllers/indexController.js';

    // действие
    const bc = buildBreadcrumbs(hash, path);

    // проверка
    expect(bc).to.include.deep.members([
      {
        text: 'ROOT',
        href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/'
      },
      {
        text: 'controllers',
        href:
          '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/controllers/'
      },
      { text: 'indexController.js' }
    ]);
  });

  it('при отсутствии параметров hash и path функция buildBreadcrumbs возвращает один объект HISTORY', async function () {
    // действие
    const bc = buildBreadcrumbs();

    // проверка
    expect(bc).to.eql([{ text: 'HISTORY', href: undefined }]);
  });
});

describe('формирование пути к файлам и папкам', function () {
  it('функция buildFolderUrl возвращает путь к файловой структуре коммита', function () {
    // подготовка
    const parentHash = 'a5b8b36531c819d685b4d220edb9784edae8b0f2';
    const path = '';
    const url = '/files/a5b8b36531c819d685b4d220edb9784edae8b0f2/';

    // действие
    const bc = buildFolderUrl(parentHash, path);

    // проверка
    expect(bc).to.eql(url);
  });

  it('функция buildFileUrl возвращает путь к содержимому выбранного файла', function () {
    // подготовка
    const parentHash = 'a5b8b36531c819d685b4d220edb9784edae8b0f2';
    const path = 'README.md';
    const url = '/content/a5b8b36531c819d685b4d220edb9784edae8b0f2/README.md';

    // действие
    const bc = buildFileUrl(parentHash, path);

    // проверка
    expect(bc).to.eql(url);
  });
});
