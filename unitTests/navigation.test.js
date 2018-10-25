const { expect } = require('chai');
const { buildBreadcrumbs, buildFolderUrl, buildFileUrl } = require('../utils/navigation');

describe('"хлебные крошки"', () => {
  it('функция buildBreadcrumbs на вход принимает hash и path, возвращает массив "хлебных крошек"', () => {
    const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
    const path = 'controllers/indexController.js';

    const bc = buildBreadcrumbs(hash, path);

    expect(bc).to.include.deep.members([
      {
        text: 'ROOT',
        href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/',
      },
      {
        text: 'controllers',
        href:
          '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/controllers/',
      },
      { text: 'indexController.js' },
    ]);
  });

  it('при отсутствии параметров hash и path функция buildBreadcrumbs возвращает один объект HISTORY', async () => {
    const bc = buildBreadcrumbs();

    expect(bc).to.eql([{ text: 'HISTORY', href: undefined }]);
  });

  it('при наличии hash и отсутствии path функция buildBreadcrumbs возвращает массив, в котором у первого объекта свойство href == undefined', async () => {
    const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';

    const bc = buildBreadcrumbs(hash, '');

    expect(bc).to.eql([
      { href: '/', text: 'HISTORY' },
      { href: undefined, text: 'ROOT' },
    ]);
  });
});

describe('формирование пути к файлам и папкам', () => {
  it('функция buildFolderUrl возвращает путь к файловой структуре коммита', () => {
    const parentHash = 'a5b8b36531c819d685b4d220edb9784edae8b0f2';
    const path = '';
    const url = '/files/a5b8b36531c819d685b4d220edb9784edae8b0f2/';

    const bc = buildFolderUrl(parentHash, path);

    expect(bc).to.eql(url);
  });

  it('функция buildFileUrl возвращает путь к содержимому выбранного файла', () => {
    const parentHash = 'a5b8b36531c819d685b4d220edb9784edae8b0f2';
    const path = 'README.md';
    const url = '/content/a5b8b36531c819d685b4d220edb9784edae8b0f2/README.md';

    const bc = buildFileUrl(parentHash, path);

    expect(bc).to.eql(url);
  });
});
