const assert  = require('assert')

describe('правильно отображается содержимое', () => {
  it('коммита', function() {
    return this.browser
      .url('/')
      .assertViewOnViewport('firstCommit1200', '.commit:last-of-type', 1200, 600)
      .assertViewOnViewport('firstCommit992', '.commit:last-of-type', 992, 500)
      .assertViewOnViewport('firstCommit768', '.commit:last-of-type', 768, 400)
  })

  it('списка коммитов', function() {
    return this.browser
      .url('/')
      .assertViewOnViewport('commitsList1200', '.content-commits', 1200, 600)
      .assertViewOnViewport('commitsList992', '.content-commits', 992, 500)
      .assertViewOnViewport('commitsList768', '.content-commits', 768, 400)
  })

  it('файловой системы', function() {
    return this.browser
      .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
      .assertViewOnViewport('file-tree1200', '.content-tree', 1200, 600)
      .assertViewOnViewport('file-tree992', '.content-tree', 992, 500)
      .assertViewOnViewport('file-tree768', '.content-tree', 768, 400)
  })

  it('файла', function() {
    return this.browser
      .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/app.js')
      .assertViewOnViewport('file1200', '.content-file', 1200, 600)
      .assertViewOnViewport('file992', '.content-file', 992, 500)
      .assertViewOnViewport('file768', '.content-file', 768, 400)
  })

  it('хлебных крошек', function() {
    return this.browser
      .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/views/layout.hbs')
      .assertViewOnViewport('breadcrumbs1200', '.breadcrumbs', 1200, 600)
      .assertViewOnViewport('breadcrumbs992', '.breadcrumbs', 992, 500)
      .assertViewOnViewport('breadcrumbs768', '.breadcrumbs', 768, 400)
  })
})
