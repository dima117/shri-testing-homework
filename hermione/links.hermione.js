describe('links', () => {
  it('core -> commit', function () {
    return this.browser
      .url('/')
      .isExisting('.commit__link')
      .assertView('plain', '.container')
      .click('.commit__link > a')
      .isExisting('.content-tree')
  })
  it('commit -> file', function () {
    return this.browser
      .url('/files/fe2008bd672282075b9ab64efe838173daede0a3/')
      .isExisting('.content')
      .assertView('plain', '.container')
      .click('.content li > a')
      .isExisting('.file-content')
  })
  it('commit -> folder', function () {
    return this.browser
      .url('/files/fe2008bd672282075b9ab64efe838173daede0a3/')
      .isExisting('.content')
      .assertView('plain', '.container')
      .click('.content li:nth-child(5) > a')
      .isExisting('.content > ul')
  })
  it('commit --[breadcrumbs]-> core', function () {
    return this.browser
      .url('/files/fe2008bd672282075b9ab64efe838173daede0a3/')
      .isExisting('.breadcrumbs')
      .assertView('plain', '.container')
      .click('.breadcrumbs > a')
      .isExisting('.content-tree')
  })
})