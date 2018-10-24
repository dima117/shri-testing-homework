const filesController = require("./filesController");

describe("Файловая система", () => {
  const stubs = {};
  stubs.gitFileTree = jest.fn(() =>
    Promise.resolve([{ type: "", hash: "", path: "" }])
  );
  stubs.buildObjectUrl = jest.fn();
  stubs.buildBreadcrumbs = jest.fn();

  const req = { params: { hash: "" } };
  const res = { render: jest.fn() };

  test("добавляются ключи href и path к объектам файлов", () => {
    filesController(req, res, () => {}, stubs).then(() => {
      expect(res.render.mock.calls[0][1].files.toHaveProperty("href"));
      expect(res.render.mock.calls[0][1].files.toHaveProperty("name"));
    });
  });

  test("в функцию render в качестве аргументов попадают заголовок, хлебные крошки и объекты файлов", () => {
    filesController(req, res, () => {}, stubs).then(() => {
      const keys = Object.keys(res.render.mock.calls[0][1]);

      expect(keys.toEqual(["title", "breadcrumbs", "files"]));
    });
  });
});
