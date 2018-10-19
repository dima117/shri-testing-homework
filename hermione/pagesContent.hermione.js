const assert = require('assert');

describe('Содержимое страниц', () => {

  describe('история коммитов', () => {
    it('содержит хлебные крошки', function () {
      return this.browser
        .url('/')
        .isExisting('.breadcrumbs')
        .then((exists) => {
          assert.ok(exists, 'Хлебные крошки не появились');
        });
    });

    it('содержит коммит', function () {
      return this.browser
        .url('/')
        .isExisting('.content .commit .commit__link')
        .then((exists) => {
          assert.ok(exists, 'Ни одного коммита не найдено');
        })
    });
  });

  describe('файловая система коммита', () => {
    it('содержит хлебные крошки', function () {
      return this.browser
        .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
        .isExisting('.breadcrumbs')
        .then((exists) => {
          assert.ok(exists, 'Хлебные крошки не появились');
        })
    });
    it('содержит список файлов', function () {
      return this.browser
        .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
        .isExisting('.content ul li')
        .then((exists) => {
          assert.ok(exists, 'Ни одного элемента списка не найдено');
        })
    });
  });

  describe('файл .gitignore', () => {
    it('содержит хлебные крошки', function () {
      return this.browser
        .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
        .isExisting('.breadcrumbs')
        .then((exists) => {
          assert.ok(exists, 'Хлебные крошки не появились');
        })
    });
    it('содержит файл', function () {
      return this.browser
        .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/.gitignore')
        .isExisting('.content .file-content')
        .then((exists) => {
          assert.ok(exists, 'элемент с контентом файла не найден');
        })
        .getText('.content .file-content')
        .then((text) => {
          assert.equal(text, 'node_modules');
        });
    });
  });
});
// //  selenium-standalone start  npm run hermione-gui npm start
