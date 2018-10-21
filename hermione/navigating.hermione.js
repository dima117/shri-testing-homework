const assert  = require('assert')

describe('правильно работают переходы по страницам', () => {
  it('из списка коммитов на список файлов', function() {
    return this.browser
      .url('/')
      .click('.commit__link > a')
      .assertExists('.content-tree', 'файловое дерево не появилось')
  })

  it('из списка файлов во вложенную папку', function() {
    return this.browser
      .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
      .click('.content-tree li:nth-of-type(3) > a')
      .assertExists('.content-tree', 'файловое дерево не появилось')
  })

  it('из списка файлов на страницу отдельного файла', function() {
    return this.browser
      .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
      .click('.content-tree li:nth-of-type(2) > a')
      .assertExists('.content-file', 'не отобразился файл')
  })

  it('переходы по хлебным крошкам', function() {
    return this.browser
      .url('/content/f69c43393449afe9284f3fa20010695a5faa3849/views/layout.hbs')
      .click('.breadcrumbs a:last-of-type')
      .assertExists('.content-tree', 'файловое дерево не появилось при переходе по крошкам')
      .click('.breadcrumbs a:last-of-type')
      .assertExists('.content-tree', 'файловое дерево не появилось при переходе по крошкам')
      .click('.breadcrumbs a:last-of-type')
      .assertExists('.content-commits', 'список комитов не появился при переходе по крошкам')
  })
})
