const filesController = require("./filesController");
const { gitFileTree } = require("../utils/git");
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require("../utils/navigation");

jest.mock("../utils/navigation");
jest.mock("../utils/git");

describe("filesController", () => {
  test("правильно создает path", () => {
    const hash = "b512c09d476623ff4bf8d0d63c29b784925dbdf8";
    const path = "controllers";

    filesController(hash, path);

    expect(gitFileTree);
  });
});
