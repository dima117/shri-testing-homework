const assert = require("chai").assert;
const expect = require("chai").expect;
const { getFileTree } = require("../controllers/filesController");
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
  it("Получить список содержимого объекта-дерева", async function() {
    const hash = "90180910fc27a11272a3e5caeeb119a51e5c0545";
    const path = "controllers/";

    const commit = await getFileTree(hash, path);

    commit.every(i =>
      expect(i).to.have.all.keys("type", "hash", "path", "href", "name")
    );
  });
});
