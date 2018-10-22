const assert = require('assert');

module.exports = (hermione, opts) => {
  hermione.on(hermione.events.NEW_BROWSER, (browser) => {
    browser.addCommand('loadContent', (url, msg) => {
      return browser
        .url(url)
        .isExisting('.content')
        .then ((exists) => assert.ok(exists, msg));
    });
  })
};
