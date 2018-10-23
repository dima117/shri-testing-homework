const {Git} = require('../utils/git');
const assert = require('chai').assert;
const {buildBreadcrumbs} = require('../utils/navigation');

describe('Построение крошек на истории коммитов', () => {
  it('Получаем хлебные крошки', function () {
    const bc = [
      {
        text: 'HISTORY',
        href: undefined
      }
    ];

    const breadCrumbs = buildBreadcrumbs();

    assert.deepEqual(bc, breadCrumbs);
  })
});