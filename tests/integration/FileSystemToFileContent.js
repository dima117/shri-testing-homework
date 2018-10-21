const assert = require("assert");

describe("Check Page Navigation From File System To File Content", function() {
  it("should follow the link", function() {
    let client = this.browser.url("/");

    return client
      .click(".commit__link a")
      .getText(".breadcrumbs__current-page")
      .then(current_page => {
        assert.equal(current_page, "ROOT", "Page is incorrect");
      })
      .elements(".content ul li a")
      .then(link => {
        return Promise.all(
          link.value.map(p_link => {
            return client.elementIdText(p_link.ELEMENT).then(text => {
              if (text.value == ".gitignore") {
                return client
                  .elementIdClick(p_link.ELEMENT)
                  .element(".file-content")
                  .then(content => {
                    assert.notEqual(
                      content.type,
                      "NoSuchElement",
                      "File content not found"
                    );
                  });
              }
            });
          })
        );
      });
  });
});
