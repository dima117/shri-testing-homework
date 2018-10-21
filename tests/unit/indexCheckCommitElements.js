/* Check Commit Elemets: Aurhor, Timestamp, Message, Hash */
const { expect } = require("chai");

describe("Check Commit Aurhor", function() {
  it("should find commit author", function() {
    let { gitHistory } = require("../../utils/git");

    gitHistory(1, 20).then(history => {
      return Promise.all(
        history.map(el => {
          return expect(el.author).to.not.equal("");
        })
      );
    });
  });
});

describe("Check Commit Timestamp", function() {
  it("should find commit timestamp", function() {
    let { gitHistory } = require("../../utils/git");

    gitHistory(1, 20).then(history => {
      return Promise.all(
        history.map(el => {
          return expect(el.timestamp).to.not.equal("");
        })
      );
    });
  });
});

describe("Check Commit Message", function() {
  it("should find commit message", function() {
    let { gitHistory } = require("../../utils/git");

    gitHistory(1, 20).then(history => {
      return Promise.all(
        history.map(el => {
          return expect(el.msg).to.not.equal("");
        })
      );
    });
  });
});

describe("Check Commit Hash", function() {
  it("should find commit hash", function() {
    let { gitHistory } = require("../../utils/git");

    gitHistory(1, 20).then(history => {
      return Promise.all(
        history.map(el => {
          return expect(el.hash).to.not.equal("");
        })
      );
    });
  });
});
