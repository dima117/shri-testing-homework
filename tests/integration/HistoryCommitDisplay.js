const assert = require("assert");
const commitElements = [
  {
    name: "author",
    class: ".commit__author"
  },
  {
    name: "date",
    class: ".commit__date"
  },
  {
    name: "message",
    class: ".commit__msg"
  },
  {
    name: "link",
    class: ".commit__link"
  }
];

/* Check Commits Elements: author, date, message & link */
commitElements.forEach(commitElem => {
  let name = commitElem.name;
  let atr = commitElem.class;

  describe("History " + name + " commit", function() {
    it("should find " + name + " history commits", function() {
      let client = this.browser.url("/");

      return client.elements(atr).then(elems => {
        /* Check For Existence */
        assert.ok(elems.value.length, "Does not exist " + name);

        /* Check Fot Empty Value */
        return Promise.all(
          elems.value.map(el => {
            return client.elementIdText(el.ELEMENT).then(text => {
              assert.notEqual(text.value, "", name + " is empty");
            });
          })
        );
      });
    });
  });
});
