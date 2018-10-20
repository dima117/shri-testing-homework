const assert = require('assert');
const { expect } = require('chai');

module.exports = (hermione, opts) => {
  hermione.on(hermione.events.NEW_BROWSER, (browser) => {
    browser.addCommand('assertExists', (selector, message) => browser
      .isExisting(selector)
      .then(exists => assert.ok(exists, message)));

    browser.addCommand('expectTextContent', selector => browser
      .getText(selector)
      .then(text => expect(text).not.empty));
  });
};
