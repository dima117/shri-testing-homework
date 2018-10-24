const assert = require('assert')

describe('core', () => {
  it('has breadcrumbs', function () {
    return this.browser
      .url('/')
      .isExisting('.breadcrumbs')
      .getText('.breadcrumbs')
      .then(bc => 
        assert(bc, 'HISTORY', 'no breadcrumbs on core page')
      )
  })

  it('has commits', function () {
    return this.browser
      .url('/')
      .isExisting('.commit')
      .then(cmt => 
        assert.ok(cmt, 'no commits')  
      )
  })
})