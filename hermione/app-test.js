const assert = require('assert');
const expect = require('chai').expect;

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

//todo 20 коммитов

  // it(' в истории коммитов по умолчанию выводится не более 20 коммитов на страницу', function () {
  //    this.browser.url('/')
  //     .waitForExist('.test-history-content .commit', 5000);
  //    const commits = elements('.commits');
  //     expect(commits.length).to.be.below(5);
  // });


});

describe('Просмотр коммита', () => {
  it('должна отобразиться файловая структура коммита', function () {
    return this.browser
      .url('/files/484b6a5faf9d794111e9f8cb66810137b8b80e1d/')
      .isExisting('.test-filetree-content')
      .then((exists) => {
        assert.ok(exists, 'Файловая структура не отобразилась');
      });
  });

  it('корректный переход из дерева файлов  во вложенную папку и обратно в дерево файлов по ссылке ROOT', function () {
    return this.browser
      .url('/files/484b6a5faf9d794111e9f8cb66810137b8b80e1d/')
      .waitForExist('.test-filetree-content', 5000)
      .click('.test-filetree-content ul li a[href*="/files"]')
      .waitForExist('.content', 5000)
      .click('.breadcrumbs a:nth-of-type(2)')
      .waitForExist('.test-filetree-content', 5000)
      .title()
      .then((title) => {
        assert.equal(title.value, 'files');
      });
  });

  it('корректный переход из дерева файлов на страницу отдельного файла и обратно в дерево файлов по ссылке ROOT', function () {
    return this.browser
      .url('/files/484b6a5faf9d794111e9f8cb66810137b8b80e1d/')
      .waitForExist('.test-filetree-content', 5000)
      .click('.test-filetree-content ul li a[href*="/content"]')
      .waitForExist('.content', 5000)
      .click('.breadcrumbs a:nth-of-type(2)')
      .waitForExist('.test-filetree-content', 5000)
      .title()
      .then((title) => {
        assert.equal(title.value, 'files');
      });
  });
});

describe('Просмотр содержимого', () => {
  it('должно отобразиться содержимое файла', function () {
    return this.browser
      .url('/content/484b6a5faf9d794111e9f8cb66810137b8b80e1d/.gitignore')
      .waitForExist('.file-content', 5000)
      .getText('.file-content')
      .then((text) => {
        assert.equal(text, 'node_modules\n.idea/');
      });
  });

  it('корректный переход по хлебным крошкам', function () {
    return this.browser
      .url('/content/484b6a5faf9d794111e9f8cb66810137b8b80e1d/tests/utils/git-test.js')
      .waitForExist('.file-content', 5000)
      .click('.breadcrumbs a[href*="/files"]:last-of-type')
      .waitForExist('.test-filetree-content', 5000)
      .click('.breadcrumbs a[href*="/files"]:last-of-type')
      .waitForExist('.test-filetree-content', 5000)
      .getText('.breadcrumbs a[href*="/files"]:last-of-type')
      .then((text) => {
        assert.equal(text, 'ROOT');
      });
  });
});