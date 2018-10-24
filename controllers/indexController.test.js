const indexController = require("./indexController");

describe("История коммитов", () => {
  const stubs = {};
  stubs.gitHistory = jest.fn(() =>
    Promise.resolve([{ hash: "", author: "", timestamp: "", msg: "" }])
  );
  stubs.buildFolderUrl = jest.fn();
  stubs.buildBreadcrumbs = jest.fn();
  const res = { render: jest.fn() };

  test("добавляется ключ href к объекту коммита", () => {
    indexController(null, res, () => {}, stubs).then(() => {
      expect(res.render.mock.calls[0][1].list.toHaveProperty("href"));
    });
  });

  test("в функцию render в качестве аргументов попадают заголовок, хлебные крошки и объекты коммитов", () => {
    indexController(null, res, () => {}, stubs).then(() => {
      const keys = Object.keys(res.render.mock.calls[0][1]);

      expect(keys.toEqual(["title", "breadcrumbs", "list"]));
    });
  });
});
