const sinon = require("sinon");
const { expect } = require("chai");
const filesController = require("./filesController");
describe("filesController", function() {
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

    const res = {
      render: () => {}
    };

    const myFilesController = new filesController();
    myFilesController.gitFileTree = stumbGitFileTree;
    sinon.spy(myFilesController, "gitFileTree");

    const req1 = {
      params: {
        hash: "hash1"
      }
    };
    await myFilesController.run(req1, res, null);
    expect(myFilesController.gitFileTree.getCall(0).args).to.deep.equal(["hash1", ""]);

    const req2 = {
      params: {
        "0": "path2",
        hash: "hash2"
      }
    };
    await myFilesController.run(req2, res, null);
    expect(myFilesController.gitFileTree.getCall(1).args).to.deep.equal(["hash2", "path2/"]);

    const req3 = {
      params: {
        "0": "path3/path4",
        hash: "hash3"
      }
    };
    await myFilesController.run(req3, res, null);
    expect(myFilesController.gitFileTree.getCall(2).args).to.deep.equal(["hash3", "path3/path4/"]);
  });

  it("В res.render приходят правильные аргументы", async function() {
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
    const res = {
      render: sinon.spy()
    };
    const req = {
      params: {
        hash: "hash1"
      }
    };
    const myFilesController = new filesController();
    myFilesController.gitFileTree = stumbGitFileTree;

    const resultArgs = [
      "files",
      {
        breadcrumbs: [
          {
            href: "/",
            text: "HISTORY"
          },
          {
            href: undefined,
            text: "ROOT"
          }
        ],
        files: [
          {
            hash: "hash1",
            href: "#",
            name: "pathfile1",
            path: "pathfile1",
            type: "type1"
          },
          {
            hash: "hash2",
            href: "#",
            name: "pathfile2",
            path: "pathfile2",
            type: "type2"
          }
        ],
        title: "files"
      }
    ];
    await myFilesController.run(req, res, null);
    expect(res.render.getCall(0).args).to.deep.equal(resultArgs);
  });
});
