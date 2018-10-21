/* Check Files Links For Incorrect */
const { expect } = require("chai");

describe("Check Commit Files Structure", function() {
  it("should find commit file structure", function() {
    const { gitFileTree, gitHistory } = require("../../utils/git");

    function checkLinks(hash) {
      return gitFileTree(hash, "").then(list => {
        return Promise.all(
          list.map(item => {
            //if link to file
            if (item.type == "blob") {
              return expect(item.path).to.not.equal("");
            }

            //if link to three
            if (item.type == "tree") {
              return checkLinks(item.hash);
            }
          })
        );
      });
    }

    gitHistory(1, 20).then(history => {
      return Promise.all(
        history.map(el => {
          return checkLinks(el.hash);
        })
      );
    });
  });
});
