const expect = require('chai').expect;

module.exports =  function traverseLink(hermione, opts) {
  hermione.on(hermione.events.NEW_BROWSER, (browser) => {
    browser.addCommand('traverseLink', (params) => {
      return browser.url(params.fromUrl)
              .click(params.linkEl)
              .waitForExist(params.waitForEl)
              .getUrl()
              .then(url => {
                expect(url).to.equal(`${hermione.config.baseUrl}${params.toUrl}`);
              });
    });
  });
};

