module.exports = function(hermione, opts) {
  hermione.on(hermione.events.NEW_BROWSER, function(browser) {
    browser.addCommand('buildUrl', (additionUrl = '') => {
      return browser
        .url(`http://localhost:3000/${additionUrl}?testing=1`)
        .waitUntil(function(){
          return browser.execute(function() {
              return document.readyState === 'complete';
          });
        });
    });
  });
}
