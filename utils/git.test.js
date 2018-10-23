const {
  parseHistoryItem,
  parseFileTreeItem,
  executeGit,
  gitFileTree
} = require("./git");

describe("parseFileTreeItem", () => {
  test("разбивает строку в объект с тремя свойствами", () => {
    const line =
      "100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore";
    const result = parseFileTreeItem(line);

    expect(result).toEqual({
      type: "blob",
      hash: "b512c09d476623ff4bf8d0d63c29b784925dbdf8",
      path: ".gitignore"
    });
  });
});

describe("parseHistoryItem", () => {
  test("преобразует строку в объект", () => {
    const line =
      "38429bed94bd7c107c65fed6bffbf443ff0f4183\tDmitry Andriyanov\t2018-10-15 13:22:09 +0300\tзаготовка приложения";

    const output = parseHistoryItem(line);

    expect(output).toEqual({
      hash: "38429bed94bd7c107c65fed6bffbf443ff0f4183",
      author: "Dmitry Andriyanov",
      timestamp: "2018-10-15 13:22:09 +0300",
      msg: "заготовка приложения"
    });
  });
});

describe("executeGit", () => {
  test("при резолве возвращает строку", () => {
    return executeGit("git", [
      "log",
      "--pretty=format:%H%x09%an%x09%ad%x09%s",
      "--date=iso",
      "--skip",
      1,
      "-n",
      1
    ]).then(data => {
      expect(typeof data).toBe("string");
    });
  });

  test("при реджекте возвращает объект ошибки", () => {
    return executeGit("gitsafd", [
      "log",
      "--pretty=format:%H%x09%an%x09%ad%x09%s",
      "--date=iso",
      "--skip",
      1,
      "-n",
      1
    ]).catch(err => {
      expect(err).toHaveProperty("message");
    });
  });
});

describe("gitFileTree", () => {
  const hash = "38429bed94bd7c107c65fed6bffbf443ff0f4183";
  let gitStub = jest.fn(() => Promise.resolve(""));
  let parseFileTreeStub = jest.fn();

  describe("правильно составляет массив с параметрами", () => {
    test("при path = ''", () => {
      const path = "";
      gitFileTree(hash, path, gitStub).then(() => {
        expect(gitStub).toHaveBeenCalledWith("git", ["ls-tree", hash]);
      });
    });

    test("при path = 'controllers'", () => {
      const path = "controllers";
      gitFileTree(hash, path, gitStub).then(() => {
        expect(gitStub).toHaveBeenCalledWith("git", ["ls-tree", hash, path]);
      });
    });
  });

  test("правильно разбивает строку в массив", () => {
    gitFileTree(hash, null, null, parseFileTreeStub).then(() => {
      expect(parseFileTreeStub).toHaveBeenCalledWith(
        "100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore"
      );
    });
  });
});
