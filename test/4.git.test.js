const assert = require("chai").assert;
const sinon = require("sinon");

const { Git } = require("../utils/Git");

describe("Git методы", function() {
  it("Получить из строки данные коммита в виде объекта", async function() {
    const git = new Git();
    const line = "mock_hash_1\tmock_name_1\tmock_date_1\tmock text_1";

    const data = await git.parseHistoryItem(line);

    assert.deepEqual(data, {
      hash: "mock_hash_1",
      author: "mock_name_1",
      timestamp: "mock_date_1",
      msg: "mock text_1"
    });
  });

  it("Получить историю коммитов в виде массива объектов", async function() {
    const git = new Git();
    const stubGetLog = sinon
      .stub()
      .resolves(
        "mock_hash_1\tmock_name_1\tmock_date_1\tmock text_1\n" +
          "mock_hash_2\tmock_name_2\tmock_date_2\tmock text_2"
      );
    const stubParseCommit = line => {
      const [hash, author, timestamp, msg] = line.split("\t");
      return { hash, author, timestamp, msg };
    };
    git.process = stubGetLog;
    git.parseCommit = stubParseCommit;

    const list = await git.gitHistory(1, 2);
    assert.deepEqual(list, [
      {
        hash: "mock_hash_1",
        author: "mock_name_1",
        timestamp: "mock_date_1",
        msg: "mock text_1"
      },
      {
        hash: "mock_hash_2",
        author: "mock_name_2",
        timestamp: "mock_date_2",
        msg: "mock text_2"
      }
    ]);
  });

  it("Получить из строки информацию об объекте в дереве", async function() {
    const git = new Git();
    const line =
      "100644 blob 4a21cec21f27482e3d6b3d40d838cf0303787bc1\t.gitignore";

    const data = await git.parseFileTreeItem(line);

    assert.deepEqual(data, {
      type: "blob",
      hash: "4a21cec21f27482e3d6b3d40d838cf0303787bc1",
      path: ".gitignore"
    });
  });

  it("Получить содержимое tree-объекта в виде массива объектов", async function() {
    const git = new Git();
    const stubGetTree = sinon
      .stub()
      .resolves(
        "100644 blob 4a21ce4a21ce	file.txt\n" +
          "100644 tree 397d04397d04	newFolder"
      );
    const stubParseTree = line => {
      const [info, path] = line.split("\t");
      const [, type, hash] = info.split(" ");

      return { type, hash, path };
    };
    git.process = stubGetTree;
    git.parseTree = stubParseTree;

    const list = await git.gitFileTree("hash", "path");
    assert.deepEqual(list, [
      {
        type: "blob",
        hash: "4a21ce4a21ce",
        path: "file.txt"
      },
      {
        type: "tree",
        hash: "397d04397d04",
        path: "newFolder"
      }
    ]);
  });

  it("Получить содержимое файла по его хэшу", async function() {
    const git = new Git();
    const hash = "4a21cec2";
    const stubGetContent = sinon
      .stub()
      .resolves("Very interesting content of this small file");
    git.process = stubGetContent;

    const content = await git.gitFileContent(hash);

    assert.equal(content, "Very interesting content of this small file");
  });
});
