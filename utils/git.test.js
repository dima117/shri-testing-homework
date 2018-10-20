const { gitHistory, gitFileTree } = require("./git");
const { expect } = require("chai");
describe("git", function() {
  describe("gitHistory", function() {
    it("Результат выполнения gitHistory содержит нужные элементы", async function() {
      function stambExecuteGit(cmd, args) {
        return new Promise((resolve, reject) => {
          resolve("hash1\tname1\tdate1\tdescription1\n\nhash2\tname2\tdate2\tdescription2\n\n");
        });
      }
      const gitHistoryInst = new gitHistory();
      gitHistoryInst.executeGit = stambExecuteGit;
      const data = await gitHistoryInst.run(1, 2);
      expect(data).to.have.deep.members([
        {
          hash: "hash1",
          author: "name1",
          timestamp: "date1",
          msg: "description1"
        },
        {
          hash: "hash2",
          author: "name2",
          timestamp: "date2",
          msg: "description2"
        }
      ]);
    });

    it("Выполнение gitHistory учитывает разное количество элементов", async function() {
      function stambExecuteGit(cmd, args) {
        return new Promise((resolve, reject) => {
          const size = args[6];
          resolve("hash1\tname1\tdate1\tdescription1\n".repeat(size));
        });
      }
      const gitHistoryInst = new gitHistory();
      gitHistoryInst.executeGit = stambExecuteGit;
      for (let i = 0; i < 20; i++) {
        const data = await gitHistoryInst.run(1, i);
        expect(data).to.have.lengthOf(i);
      }
    });
  });
  describe("gitFileTree", function() {
    it("Результат выполнения gitFileTree cодержит нужные данные", async function() {
      function stambExecuteGit(cmd, args) {
        return new Promise((resolve, reject) => {
          resolve("number1 type1 hash1\tpathfile1\nnumber2 type2 hash2\tpathfile2");
        });
      }
      const gitFileTreeInst = new gitFileTree();
      gitFileTreeInst.executeGit = stambExecuteGit;
      const data = await gitFileTreeInst.run("hash", "path");
      expect(data).to.have.deep.members([
        {
          hash: "hash1",
          path: "pathfile1",
          type: "type1"
        },
        {
          hash: "hash2",
          path: "pathfile2",
          type: "type2"
        }
      ]);
    });
  });
});
