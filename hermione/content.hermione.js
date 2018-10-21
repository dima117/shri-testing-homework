const assert = require('chai').assert;

describe('Просмотр содержимого файла', function() {
  it('Страница файла правильно отображает содержимое', function() {
    return this.browser
      .url('http://localhost:3000/content/cff629dc13a66cb198b1415bc4125b1838ee5e72/README.md')
      .assertExists('.file-content', 'Содержимое файла не отображается')
      .assertView('plain', '.file-content');
  });
  it('при переходе к файлу правильно отображается содержимое', function() {
    return this.browser
      .url('files/7702a232b1b71ddb5bea9d9786c86d1cbf06f11a/')
      .click('.content a')
      .assertExists('.file-content', 'Содержимое при переходе из списка файлов не отображается')
      .assertView('plain', '.file-content');
  });

  it('переход из из списка файлов на страницу отдельного файла - формирование url', function() {
    return this.browser
      .url('files/7702a232b1b71ddb5bea9d9786c86d1cbf06f11a/')
      .click('.content a')
      .getUrl()
      .then(result =>
        assert.notEqual(result.indexOf('content'), '-1', 'ссылка на коммит не является файловой структурой')
      );
  });

  it('при клике по файлу отображаются хлебные крошки', function() {
    return this.browser
      .url('files/7702a232b1b71ddb5bea9d9786c86d1cbf06f11a/')
      .click('.content a')
      .assertExists('.breadcrumbs', 'Хлебные крошки не отображается')
      .assertView('plain', '.breadcrumbs');
  });
  it('при клике по файлу отображаются хлебные крошки History/root/readme.md', function() {
    const expectResult = `HISTORY / ROOT / README.md`;
    return this.browser
      .url('files/7702a232b1b71ddb5bea9d9786c86d1cbf06f11a/')
      .click('.content a')
      .getText('.breadcrumbs')
      .then(result => assert.equal(result, expectResult, 'Хлебные крошки не верно отобразились'));
  });
});
