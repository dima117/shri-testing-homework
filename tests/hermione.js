describe('переходы и содержимое контейнеров', function () {
  it('переход из истории в просмотр файлов', function () {
    return this.browser
      .url('http://localhost:3000/')
      .assertView('history', '.container')
      .click('.commit:last-of-type a')
      .assertView('filetree', '.container');
  });

  it('переход из просмотра файлов в содержимое файла', function () {
    return this.browser
      .url('http://localhost:3000/files/823dcc85732de9e1412989d3de8ee854be8e4d0d/')
      .assertView('filetree', '.container')
      .click('.content li:nth-of-type(2) a')
      .assertView('file', '.container');
  });

  it('переход по крошкам из содержимого файла в просмотр файлов', function () {
    return this.browser
      .url('http://localhost:3000/content/823dcc85732de9e1412989d3de8ee854be8e4d0d/index.html')
      .assertView('file', '.container')
      .click('.breadcrumbs a:last-of-type')
      .assertView('filetree', '.container');
  });

  it('переход по крошкам из просмотра файлов в историю коммитов', function () {
    return this.browser
      .url('http://localhost:3000/files/212767612151d5f0f6791467ca3423e5074bf8e6/')
      .assertView('filetree', '.container')
      .click('.breadcrumbs a:last-of-type')
      .assertView('file', '.container');
  });
});

describe('проверка всей страницы', function () {
  it('история коммитов', function () {
    return this.browser
      .url('http://localhost:3000/')
      .assertView('history', 'body');
  });
  
  it('просмотр файлов', function () {
    return this.browser
      .url('http://localhost:3000/files/212767612151d5f0f6791467ca3423e5074bf8e6/')
      .assertView('filetree', 'body');
  });
  
  it('просмотр содержимого файла', function () {
    return this.browser
      .url('http://localhost:3000/content/212767612151d5f0f6791467ca3423e5074bf8e6/script.js')
      .assertView('file', 'body');
  });
});

describe('ошибки', function () {
  it('несуществующий роут', function () {
    return this.browser
      .url('http://localhost:3000/asdasd')
      .assertView('notfound', 'body');
  });
 
  it('несуществующий хэш', function () {
    return this.browser
      .url('http://localhost:3000/files/alksd/')
      .assertView('err500', 'body');
  });
 
  it('несуществующий файл', function () {
    return this.browser
      .url('http://localhost:3000/content/212767612151d5f0f6791467ca3423e5074bf8e6/app.js')
      .assertView('err404', 'body');
  });
});