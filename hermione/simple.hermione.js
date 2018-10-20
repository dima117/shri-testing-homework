const assert  = require('assert')

describe('правильно отображается содержимое', () => {

  it('коммита', function() {
    return this.browser
      .url('/')
      .assertView('first-commit', '.commit:last-of-type')
  })

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

describe('правильно работают переходы по страницам', () => {

  it('из списка коммитов на список файлов', function() {
    return this.browser
      .url('/')
      .click('.commit__link > a')
      .isExisting('.content-tree')
      .then(exist => {
        assert.ok(exist, 'файловое дерево не появилось')
      })
  })

  it('из списка файлов во вложенную папку', function() {
    return this.browser
      .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
      .click('.content-tree li:nth-of-type(3) > a')
      .isExisting('.content-tree')
      .then(exist => {
        assert.ok(exist, 'файловое дерево не появилось')
      })
  })

  it('из списка файлов на страницу отдельного файла', function() {
    return this.browser
      .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
      .click('.content-tree li:nth-of-type(2) > a')
      .isExisting('.content-file')
      .then(exist => {
        assert.ok(exist, 'не отобразился файл')
      })
  })

  it('переходы по хлебным крошкам', function() {
    return this.browser
      .url('/content/f69c43393449afe9284f3fa20010695a5faa3849/views/layout.hbs')
      .click('.breadcrumbs a:last-of-type')
      .isExisting('.content-tree')
      .then(exist => {
        assert.ok(exist, 'файловое дерево не появилось при переходе по крошкам')
      })
      .click('.breadcrumbs a:last-of-type')
      .isExisting('.content-tree')
      .then(exist => {
        assert.ok(exist, 'файловое дерево не появилось при переходе по крошкам')
      })
      .click('.breadcrumbs a:last-of-type')
      .isExisting('.content-commits')
      .then(exist => {
        assert.ok(exist, 'список комитов не появился при переходе по крошкам')
      })
  })

})
