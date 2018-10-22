const assert = require('assert');

module.exports = (hermione, opts) => {
  hermione.on(hermione.events.NEW_BROWSER, (browser) => {
    browser.addCommand('assertExists', (selector, msg) => browser.isExisting(selector)
      .then((exists) => {
        assert.ok(exists, msg);
      }));
    browser.addCommand('assertUrl', (actual, message) => browser.getUrl()
      .then((url) => {
        if (url !== actual) assert.fail(actual, message);
      }));
  });
};
