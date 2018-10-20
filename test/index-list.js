const assert = require("chai").assert;
const expect = require("chai").expect;
const { getIndexList } = require("../controllers/indexController");
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
    const commit = await getIndexList(1, 2);

    commit.every(i =>
      expect(i).to.have.all.keys("hash", "author", "timestamp", "msg", "href")
    );
  });
});
