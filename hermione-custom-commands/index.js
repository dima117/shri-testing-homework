const assert = require('assert');

module.exports = (hermione, opts) => {
  hermione.on(hermione.events.NEW_BROWSER, (browser) => {
    browser.addCommand('assertExists', (selector, msg) => {
      return browser
        .isExisting(selector)
        .then((exists) => {assert.ok(exists, msg)})
    });

    browser.addCommand('textEqual', (selector, txt) => {
      return browser
        .getText(selector)
        .then((text) => {
          assert.equal(text, txt);
        });
    });

    browser.addCommand('urlEqual', (expectedURL) => {
      return browser
        .getUrl()
        .then((url) => {
          assert.equal(url, expectedURL);
        })
    });
  })
};
