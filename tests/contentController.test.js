const {Git} = require('../utils/git');
const assert = require('chai').assert;
const {ContentController} = require('../controllers/contentController');


describe('Проверяем контент страницы', () => {
  it('Получаем контент конкретного файла', async function () {
    const contentController = new ContentController();

    contentController.fileTree = () => {
      return Promise.resolve([{ type: "blob", hash: "unicHash1", path: "unicPath1" }])
    };

    contentController.fileContent = () => {
      return Promise.resolve("files");
    };

    const content = await contentController.getContent('hash', ['path']);
    assert.equal(content, "files");
  })
});