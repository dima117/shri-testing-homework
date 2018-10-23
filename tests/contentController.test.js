const {Git} = require('../utils/git');
const assert = require('chai').assert;
const {buildBreadcrumbs} = require('../utils/navigation');
const {ContentController} = require('../controllers/contentController');

// describe('Построение крошек на истории коммитов', () => {
//   it('Получаем хлебные крошки', function () {
//     const bc = [
//       {
//         text: 'HISTORY',
//         href: undefined
//       }
//     ];
//
//     const breadCrumbs = buildBreadcrumbs();
//
//     assert.deepEqual(bc, breadCrumbs);
//   })
// });

describe('Проверяем контент страницы', () => {
  it('Получаем контент конкретного файла', async function () {
    const contentController = new ContentController();
    const hash = 'unicHash';
    const path = ['unicPathFile'];

    const content = await contentController.getContent(hash, path);

    // assert.equal(content, "['unicPathFile']\nunicHash");
  })
});