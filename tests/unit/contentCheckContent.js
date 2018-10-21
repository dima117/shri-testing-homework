/* Check File Content */
const { expect } = require("chai");

describe("Check Commit Files Content", function() {
  it("should find commit file content", function() {
    const {
      gitFileTree,
      gitHistory,
      gitFileContent
    } = require("../../utils/git");

    function checkLinks(hash) {
      return gitFileTree(hash, "").then(list => {
        return Promise.all(
          list.map(item => {
            //if link to file
            if (item.type == "blob") {
              //check empty file content
              gitFileContent(item.hash).then(content => {
                return expect(content.length).to.not.equal(0);
              });
            }

            //if link to three
            if (item.type == "tree") {
              return checkLinks(item.hash);
            }
          })
        );
      });
    }

    //check last commit
    gitHistory(1, 20).then(history => {
      return checkLinks(history[0].hash);
    });
  });
});
