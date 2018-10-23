const indexController = require("./indexController");
const { gitHistory } = require("../utils/git");
const { buildFolderUrl, buildBreadcrumbs } = require("../utils/navigation");

jest.mock("../utils/git");
jest.mock("../utils/navigation.js");

describe("indexController", () => {
  test("добавляет ключ href к объекту коммита", () => {
    const mock = jest.fn();
    const res = { render: mock };

    indexController(null, res, null).then(() => {
      expect(mock).toHaveBeenCalledWith("index", {
        title: "history",
        breadcrumbs: buildBreadcrumbs(),
        list: [
          {
            hash: "38429bed94bd7c107c65fed6bffbf443ff0f4183",
            author: "Dmitry Andriyanov",
            timestamp: "2018-10-15 13:22:09 +0300",
            msg: "заготовка приложения",
            href: "/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/"
          }
        ]
      });
    });
  });
});
