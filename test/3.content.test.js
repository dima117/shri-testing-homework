const assert = require("chai").assert;
const sinon = require("sinon");

const { ContentController } = require("../controllers/contentController");
const { buildBreadcrumbs } = require("../utils/navigation");

describe("Обработка страницы с содержимым объекта-файла", function() {
  it("Сформировать 'хлебные крошки' текущей страницы", function() {
    const hash = "90180910fc27a11272a3e5caeeb119a51e5c0545";
    const file = ".gitignore";

    const breadcrumbs = buildBreadcrumbs(hash, file);
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
        text: file
      }
    ]);
  });

  it("Оформить содержимое объекта-файла в виде текста", async function() {
    const controller = new ContentController();
    const stubGetFileTree = sinon
      .stub()
      .resolves([{ type: "blob", hash: "mockHash_1", path: "mockPath_1" }]);
    const stubGetFileContent = sinon.stub().resolves("mock_file_content");
    controller.fetchFileTree = stubGetFileTree;
    controller.fetchFileContent = stubGetFileContent;

    const content = await controller.getFileContent("hash", ["path"]);
    assert.equal(content, "mock_file_content");
  });
});
