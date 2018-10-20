const sinon = require("sinon");
const { expect } = require("chai");
const indexController = require("./indexController");
describe("indexController", function() {
  it("В res.render приходят правильные аргументы", async function() {
    function stambGitHistory() {
      return new Promise((resolve, reject) => {
        resolve([
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
    }
    const res = {
      render: sinon.spy()
    };
    const myIndexController = new indexController();
    myIndexController.gitHistory = stambGitHistory;
    const args = [
      "index",
      {
        title: "history",
        breadcrumbs: [{ text: "HISTORY", href: undefined }],
        list: [
          {
            hash: "hash1",
            author: "name1",
            timestamp: "date1",
            msg: "description1",
            href: "/files/hash1/"
          },
          {
            hash: "hash2",
            author: "name2",
            timestamp: "date2",
            msg: "description2",
            href: "/files/hash2/"
          }
        ]
      }
    ];

    await myIndexController.run(null, res);
    expect(res.render.getCall(0).args).to.deep.equal(args);
  });
});
