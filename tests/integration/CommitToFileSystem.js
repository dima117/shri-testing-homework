const assert = require("assert");

describe("Check Page Navigation From Commit To File System", function() {
  it("should follow the link", function() {
    let client = this.browser.url("/");

    return client
      .click(".commit__link a")
      .getText(".breadcrumbs__current-page")
      .then(current_page => {
        assert.equal(current_page, "ROOT", "Page is incorrect");
      })
      .element(".content ul")
      .then(content => {
        assert.notEqual(content.type, "NoSuchElement", "File system not found");
      });
  });
});
