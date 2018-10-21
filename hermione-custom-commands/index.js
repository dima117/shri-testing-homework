const assert = require('assert');

module.exports = (hermione, opts) => {
    hermione.on(hermione.events.NEW_BROWSER, (browser) => {
        browser.addCommand('assertExists', (selector, msg) => {
            return browser
                .isExisting(selector)
                .then((exists) => assert.ok(exists, msg));
        });
    });
};