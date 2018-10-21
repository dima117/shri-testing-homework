const assert = require("chai").assert;
const sinon = require("sinon");

const { FilesController } = require("../controllers/FilesController");
const { buildBreadcrumbs } = require("../utils/navigation");

describe("Обработка страницы с содержимым объекта-дерева", function() {
  it("Сформировать 'хлебные крошки' списка коммитов", function() {
    const hash = "90180910fc27a11272a3e5caeeb119a51e5c0545";
    const folder = "controllers";

    const breadcrumbs = buildBreadcrumbs(hash, folder);
    assert.deepEqual(breadcrumbs, [
      {
        text: "HISTORY",
        href: "/"
      },
      {
        text: "ROOT",
        href: `/files/${hash}/`
      },
      {
        text: folder
      }
    ]);
  });

  it("Получен правильный href для ссылки на объект-дерево", async function() {
    const filesController = new FilesController();
    const stubBuildUrl = (hash, path = "") => `/files/${hash}/${path}`;
    filesController.getFolderUrl = stubBuildUrl;

    const href = filesController.buildObjectUrl("mock_hash", {
      path: "mock_path",
      type: "tree"
    });

    assert.equal(href, "/files/mock_hash/mock_path");
  });
  it("Получен правильный href для ссылки на объект-файл", async function() {
    const filesController = new FilesController();
    const stubBuildUrl = (hash, path = "") => `/content/${hash}/${path}`;
    filesController.getFolderUrl = stubBuildUrl;

    const href = filesController.buildObjectUrl("mock_hash", {
      path: "mock_file_name",
      type: "blob"
    });

    assert.equal(href, "/content/mock_hash/mock_file_name");
  });
  it("Получен правильный href по умолчанию, если объект не tree и не blob", async function() {
    const filesController = new FilesController();

    const href = filesController.buildObjectUrl("mock_hash", {
      path: "mock_something",
      type: "something"
    });

    assert.equal(href, "#");
  });

  it("Получить список содержимого объекта-дерева", async function() {
    const filesController = new FilesController();
    const stubGetHistory = sinon
      .stub()
      .resolves([
        { type: "mockType_1", hash: "mockHash_1", path: "mockPath_1" },
        { type: "mockType_2", hash: "mockHash_2", path: "mockPath_2" }
      ]);
    const stubBuildUrl = () => `/content/parentHash/path`;

    filesController.fetchFileTree = stubGetHistory;
    filesController.getObjectUrl = stubBuildUrl;

    const tree = await filesController.getFileTree("hash", "path");

    assert.deepEqual(tree, [
      {
        type: "mockType_1",
        hash: "mockHash_1",
        path: "mockPath_1",
        href: "/content/parentHash/path",
        name: "mockPath_1"
      },
      {
        type: "mockType_2",
        hash: "mockHash_2",
        path: "mockPath_2",
        href: "/content/parentHash/path",
        name: "mockPath_2"
      }
    ]);
  });
});
