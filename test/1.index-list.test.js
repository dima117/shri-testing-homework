const assert = require("chai").assert;
const sinon = require("sinon");

const { IndexController } = require("../controllers/IndexController");
const { buildBreadcrumbs } = require("../utils/navigation");

describe("Обработка страницы со списком из N объектов-коммитов", function() {
  it("Сформировать 'хлебные крошки' списка коммитов", function() {
    const breadcrumbs = buildBreadcrumbs();
    assert.deepEqual(breadcrumbs, [
      {
        text: "HISTORY",
        href: undefined
      }
    ]);
  });
  it("Получить список коммитов", async function() {
    const indexController = new IndexController();
    const stubGetHistory = sinon.stub().resolves([
      {
        hash: "hash_1",
        author: "author_1",
        timestamp: "timestamp_1",
        msg: "ссылки на корневую папку 1"
      },
      {
        hash: "hash_2",
        author: "author_2",
        timestamp: "timestamp_2",
        msg: "ссылки на корневую папку 2"
      }
    ]);
    const stubBuildFolderUrl = (hash, path = "") => `/files/${hash}/${path}`;

    indexController.fetchHistory = stubGetHistory;
    indexController.getFolderUrl = stubBuildFolderUrl;

    const list = await indexController.getIndexList(1, 2);

    assert.deepEqual(list, [
      {
        hash: "hash_1",
        author: "author_1",
        timestamp: "timestamp_1",
        msg: "ссылки на корневую папку 1",
        href: "/files/hash_1/"
      },
      {
        hash: "hash_2",
        author: "author_2",
        timestamp: "timestamp_2",
        msg: "ссылки на корневую папку 2",
        href: "/files/hash_2/"
      }
    ]);
  });
});
