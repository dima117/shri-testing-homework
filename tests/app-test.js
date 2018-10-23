const assert = require('assert');

describe('Запуск приложения', () => {
  it('должна отобразиться история коммитов', function () {
    return this.browser
      .url('/')
      .isExisting('.content .commit')
      .then((exists) => {
        assert.ok(exists, 'История коммитов не отборазилась');
    });
  });

  it('переход в дерево файлов и обратно в историю коммитов по ссылке history', function () {
    return this.browser
      .url('/')
      .waitForExist('.test-history-content', 5000)
      .click('.commit__link a')
      .waitForExist('.test-filetree-content', 5000)
      .click('.breadcrumbs a')
      .waitForExist('.test-history-content', 5000)
      .title()
      .then((title) => {
        assert.equal(title.value, 'history');
      });
  });

});