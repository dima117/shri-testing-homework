const assert = require('chai').assert;

describe('Просмотр файловой системы', function() {
  it('правильно отображается содержимое', function() {
    return this.browser
      .url('http://localhost:3000/files/cff629dc13a66cb198b1415bc4125b1838ee5e72/tree')
      .assertExists('.content ul li', 'Список не появился')
      .assertView('plain', '.content ul');
  });
  it('переход из списка коммитов на список файлов - правильно сформирован url', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .getUrl()
      .then(res =>
        assert.notEqual(
          res.indexOf('files'),
          -1,
          'переход из списка коммитов на список файлов url не верно сформирован'
        )
      );
  });
  it('переход из списка коммитов на список файлов', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .assertExists('.content ul', 'Содержимое коммита не отображается')
      .assertView('plain', '.content ul');
  });
  it('переход из списка файлов во вложенную папку', function() {
    return this.browser
      .url('files/cff629dc13a66cb198b1415bc4125b1838ee5e72/')
      .click('.content li:nth-child(2) a')
      .assertExists('.content ul', 'Содержимое папки не отображается')
      .assertView('plain', '.content ul');
  });
  it('переходе в папку отображаются хлебные крошки History/root/tree', function() {
    const expectResult = `HISTORY / ROOT / tree`;
    return this.browser
      .url('files/cff629dc13a66cb198b1415bc4125b1838ee5e72/')
      .click('.content li:nth-child(2) a')
      .getText('.breadcrumbs', false)
      .then(result => assert.equal(result, expectResult, 'Хлебные крошки не верно отобразились'));
  });
});
