module.exports = (hermione, opts) => {
  hermione.on(hermione.events.NEW_BROWSER, (browser) => {
    browser.addCommand('checkBreadCrumbs', (url, selector) => {
      browser
        .url(url)
        .waitForExist('.breadcrumbs', 1000)
        .click(selector)
        .assertView('plain', '.breadcrumbs');
    });

    browser.addCommand('checkPageContent', (url) => {
      browser
        .url(url)
        .waitForExist('.content', 1000)
        .assertView('plain', '.content');
    });

    return browser;
  });
};
