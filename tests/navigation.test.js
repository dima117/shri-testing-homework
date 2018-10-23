const assert = require('chai').assert;
const {
  buildBreadcrumbs,
  buildFolderUrl,
  buildFileUrl
} = require('../utils/navigation');

describe('Построение хлебных крошек', () => {
  it('Получаем хлебные крошки на странице Истории коммитов', function () {
    const bc = [
      {
        text: 'HISTORY',
        href: undefined
      }
    ];

    const breadCrumbs = buildBreadcrumbs();

    assert.deepEqual(bc, breadCrumbs);
  });

  it('Получаем хлебные крошки на странице с файлами', function () {
    const parentHash = 'parentUnicHash';
    const path = '';

    const breadCrumbs = buildFolderUrl(parentHash, path);

    assert.deepEqual('/files/parentUnicHash/', breadCrumbs);
  });

  it('Получаем хлебные крошки в файле', function () {
    const parentHash = 'parentUnicHash';
    const path = 'unicNameFile';

    const breadCrumbs = buildFileUrl(parentHash, path);

    assert.deepEqual('/content/parentUnicHash/unicNameFile', breadCrumbs);
  });
});
