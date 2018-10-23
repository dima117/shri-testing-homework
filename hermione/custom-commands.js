const assert = require("assert");

module.exports = (hermione, opts) => {
  hermione.on(hermione.events.NEW_BROWSER, browser => {
    browser.addCommand("assertNavigation", (selector, expectSelector) => {
      return browser
        .isExisting(selector)
        .then(exists => {
          assert.ok(exists, "Ссылка для перехода не найдена");
        })
        .click(selector)
        .isExisting(expectSelector)
        .then(exists => {
          assert.ok(exists, "Переход по ссылке происходит некорректно");
        });
    });
  });
};
