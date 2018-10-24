const { expect } = require('chai');
const {
  buildObjectUrl,
  buildBreadcrumbs
} = require('../../../utils/navigation');

describe('Построение ссылки на объект', () => {
  it('ссылка на папку', () => {
    //действие
    const url = buildObjectUrl('abc123', { type: 'blob', path: 'public/styles/main.css' });

    //проверка
    expect(url).to.eql('/content/abc123/public/styles/main.css');
  });

  it('ссылка на файл', () => {
    //действие
    const url = buildObjectUrl('abc123', { type: 'tree', path: 'public/styles' });

    //проверка
    expect(url).to.eql('/files/abc123/public/styles');
  });

  it('ссылка поумолчанию', () => {
    //действие
    const url = buildObjectUrl('', {});

    //проверка
    expect(url).to.eql('#');
  });

});

describe('Построение хлебных крошек', () => {
  it('путь до истории коммитов', () => {
    //действие
    const breadcrumbs = buildBreadcrumbs();

    //проверка
    expect(breadcrumbs).to.eql([
      {
        "href": undefined,
        "text": "HISTORY"
      }
    ]);
  });

  it('путь до корневой папки', () => {
    //действие
    const breadcrumbs = buildBreadcrumbs('90180910fc27a11272a3e5caeeb119a51e5c0545');

    //проверка
    expect(breadcrumbs).to.eql([
      {
        "href": "/",
        "text": "HISTORY"
      },
      {
        "href": undefined,
        "text": "ROOT"
      }
    ]);
  });

  it('путь до папки', () => {
    //действие
    const breadcrumbs = buildBreadcrumbs('90180910fc27a11272a3e5caeeb119a51e5c0545', 'bin');

    //проверка
    expect(breadcrumbs).to.eql([
      {
        "href": "/",
        "text": "HISTORY"
      },
      {
        "href": "/files/90180910fc27a11272a3e5caeeb119a51e5c0545/",
        "text": "ROOT"
      },
      {
        "text": "bin",
      }
    ]);
  });

  it('путь до файла', () => {
    //действие
    const breadcrumbs = buildBreadcrumbs('90180910fc27a11272a3e5caeeb119a51e5c0545', 'bin/www');

    //проверка
    expect(breadcrumbs).to.eql([
      {
        "href": "/",
        "text": "HISTORY"
      },
      {
        "href": "/files/90180910fc27a11272a3e5caeeb119a51e5c0545/",
        "text": "ROOT"
      },
      {
        "href": "/files/90180910fc27a11272a3e5caeeb119a51e5c0545/bin/",
        "text": "bin",
      },
      {
        "text": "www",
      }
    ]);
  });
});