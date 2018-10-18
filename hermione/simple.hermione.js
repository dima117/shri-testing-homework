const assert  = require('assert')

describe('hermione test', () => {

  it('fist integration test', function() {
    return this.browser
      .url('/')
      .isExisting('.commit')
      .assertView('commitScreen', '.commit')
      .then(exist => {
        assert.ok(exist, 'error from assert')
      })
  })
})
