const expect = require('chai').expect;

module.exports =  function expectLocation(hermione, opts) {
  hermione.on(hermione.events.NEW_BROWSER, (browser) => {
    browser.addCommand('expectLocation', (selector, expected) => {
      return browser.getLocation(selector)
              .then(location => {
                expect(location).to.deep.equal(expected);
              });
    });
  });
};

