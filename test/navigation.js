const {expect} = require('chai');
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require('../utils/navigation');

it('buildFileUrl: создается ссылка к файлу коммита', () => {
  const result = buildFileUrl('9018091', 'README.md');
  expect(result).to.equal('/content/9018091/README.md');
});

describe('buildBreadcrumbs: создается ссылка к папке коммита', () => {
  it('создается ссылка к коммиту, если path не задан', () => {
    const result = buildFolderUrl('9018091');
    expect(result).to.equal('/files/9018091/');
  });

  it('создается ссылка к папке, если path задан', () => {
    const result = buildFolderUrl('9018091', 'controllers');
    expect(result).to.equal('/files/9018091/controllers');
  })
})



describe('buildBreadcrumbs: создается объект для хлебных крошек', () => {
  it('только страница истории, если нет аргументов', () => {
    const result = buildBreadcrumbs();
    expect(result).to.deep.equal([{"href": undefined, "text": "HISTORY"}]);
  });

  it('страница истории и ROOT, если есть hash', () => {
    const result = buildBreadcrumbs('9018091');
    expect(result).to.deep.equal([{"href": "/", "text": "HISTORY"}, {"href": undefined, "text": "ROOT"}]);
  });

  it('путь к файлу, если заданы все параметры', () => {
    const result = buildBreadcrumbs('9018091', 'README.md');
    expect(result).to.deep.equal([{"href": "/", "text": "HISTORY"}, {"href": "/files/9018091/", "text": "ROOT"}, {"text": "README.md"}]);
  });

  it('путь к файлу в папке, если path сложный', () => {
    const result = buildBreadcrumbs('9018091', 'utils/git.js');
    expect(result).to.deep.equal([{"href": "/", "text": "HISTORY"}, {"href": "/files/9018091/", "text": "ROOT"}, {"href": "/files/9018091/utils/", "text": "utils"}, {"text": "git.js"}]);
  });
});
