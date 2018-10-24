const contentController = require("./contentController");

describe("Содержимое файлов", () => {
  const req = { params: { hash: "", "0": "" } };
  const res = { render: jest.fn() };
  const stubs = {};
  stubs.gitFileTree = jest.fn(() =>
    Promise.resolve([{ type: "", hash: "", path: "" }])
  );
  stubs.gitFileContent = jest.fn();
  stubs.buildBreadcrumbs = jest.fn();

  test("в функцию render в качестве аргументов попадают заголовок, хлебные крошки и содержимого файла", () => {
    contentController(req, res, () => {}, stubs).then(() => {
      const keys = Object.keys(res.render.mock.calls[0][1]);

      expect(keys.toEqual(["title", "breadcrumbs", "content"]));
    });
  });
});
