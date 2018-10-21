const assert = require('assert')

module.exports = (hermione, opts) => {
  hermione.on(hermione.events.NEW_BROWSER, browser => {
    browser.addCommand('assertExists', (selector, msg) => {
      return browser
        .isExisting(selector)
        .then(exist => assert.ok(exist, msg))
    })
  })

  hermione.on(hermione.events.NEW_BROWSER, browser => {
    browser.addCommand('assertViewOnViewport', (state, selector, width, height) => {
      return browser
        .setViewportSize({ width, height })
        .assertView(state, selector)
    })
  })
}
