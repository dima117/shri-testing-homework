const assert  = require('assert')

describe('правильно отображается содержимое', () => {

  it('коммита', function() {
    return this.browser
      .url('/')
      .assertView('first-commit', '.commit:last-of-type')
      .setViewportSize({
        width: 500,
        height: 500
      })
      .assertView('test', '.commit:last-of-type')
  })

  // .assertViewOnViewport(state, selector, width, height)

  it('списка коммитов', function() {
    return this.browser
      .url('/')
      .assertView('first-commit', '.content-commits')
  })

  it('файловой системы', function() {
    return this.browser
      .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
      .assertView('file-tree', '.content-tree')
  })

  it('файла', function() {
    return this.browser
      .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/package.json')
      .assertView('file', '.content-file')
  })

  it('хлебных крошек', function() {
    return this.browser
      .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/controllers/indexController.js')
      .assertView('breadcrumbs', '.breadcrumbs')
  })

})
