const sinon = require("sinon");
const { expect } = require("chai");
const contentController = require("./contentController");
describe("contentController", function() {
  it("В gitFileTree приходят правильные аргументы", async function() {
    function stumbGitFileTree() {
      return new Promise((resolve, reject) => {
        resolve([
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
    }

    function stumbGitFileContent() {
      return new Promise((resolve, reject) => {
        resolve("text");
      });
    }
    const res = {
      render: () => {}
    };

    const myContentController = new contentController();
    myContentController.gitFileTree = stumbGitFileTree;
    myContentController.gitFileContent = stumbGitFileContent;
    sinon.spy(myContentController, "gitFileTree");

    const req1 = {
      params: {
        "0": "path1",
        hash: "hash1"
      }
    };
    await myContentController.run(req1, res, ()=>{});
    expect(myContentController.gitFileTree.getCall(0).args).to.deep.equal(["hash1", "path1"]);

    const req2 = {
      params: {
        "0": "path2/path3",
        hash: "hash2"
      }
    };

    await myContentController.run(req2, res, ()=>{});
    expect(myContentController.gitFileTree.getCall(1).args).to.deep.equal(["hash2", "path2/path3"]);
  });

  it("В gitFileContent приходят правильные аргументы", async function() {
    function stumbGitFileTree() {
      return new Promise((resolve, reject) => {
        resolve([
          {
            type: "blob",
            hash: "hash1",
            path: "path1"
          }
        ]);
      });
    }
    const stumbGitFileContent = sinon.spy();
    const res = {
      render: () => {}
    };
    const req = {
      params: {
        "0": "path1",
        hash: "hash1"
      }
    };
    const myContentController = new contentController();
    myContentController.gitFileTree = stumbGitFileTree;
    myContentController.gitFileContent = stumbGitFileContent;

    await myContentController.run(req, res, ()=>{});
    expect(myContentController.gitFileContent.getCall(0).args).to.deep.equal(["hash1"]);
  });

  it("В res.render приходят правильные аргументы", async function() {
    function stumbGitFileTree() {
      return new Promise((resolve, reject) => {
        resolve([
          {
            type: "blob",
            hash: "hash1",
            path: "path1"
          }
        ]);
      });
    }
    function stumbGitFileContent() {
      return new Promise((resolve, reject) => {
        resolve("text");
      });
    }
    const res = {
      render: sinon.spy()
    };
    const req = {
      params: {
        "0": "path1",
        hash: "hash1"
      }
    };
    const args = [
      "content",
      {
        breadcrumbs: [
          {
            href: "/",
            text: "HISTORY"
          },
          {
            href: "/files/hash1/",
            text: "ROOT"
          },
          {
            text: "path1"
          }
        ],
        content: "text",
        title: "content"
      }
    ];
    const myContentController = new contentController();
    myContentController.gitFileTree = stumbGitFileTree;
    myContentController.gitFileContent = stumbGitFileContent;
    await myContentController.run(req, res, ()=>{});
    expect(res.render.getCall(0).args).to.deep.equal(args);
  });
});
