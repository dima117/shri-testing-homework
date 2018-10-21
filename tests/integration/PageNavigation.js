const assert = require("assert");

describe("Check Page Navigation", function() {
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
              if (text.value == "bin") {
                return client
                  .elementIdClick(p_link.ELEMENT)
                  .element(".content ul li a")
                  .then(content => {
                    assert.notEqual(
                      content.type,
                      "NoSuchElement",
                      "File system not found"
                    );
                  })
                  .click(".content ul li a")
                  .elements(".breadcrumbs a")
                  .then(menu_links => {
                    return Promise.all(
                      menu_links.value.map(link => {
                        return client.elementIdText(link.ELEMENT).then(text => {
                          if (text.value == "bin")
                            return client.elementIdClick(link.ELEMENT);
                        });
                      })
                    );
                  })
                  .elements(".breadcrumbs a")
                  .then(menu_links => {
                    return Promise.all(
                      menu_links.value.map(link => {
                        return client.elementIdText(link.ELEMENT).then(text => {
                          if (text.value == "ROOT")
                            return client.elementIdClick(link.ELEMENT);
                        });
                      })
                    );
                  })
                  .elements(".breadcrumbs a")
                  .then(menu_links => {
                    return Promise.all(
                      menu_links.value.map(link => {
                        return client.elementIdText(link.ELEMENT).then(text => {
                          if (text.value == "HISTORY")
                            return client.elementIdClick(link.ELEMENT);
                        });
                      })
                    );
                  });
              }
            });
          })
        );
      });
  });
});
