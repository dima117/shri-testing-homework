const assert = require('assert');
const baseURLRelative = '/';
const baseURL = 'http://localhost:3000';
const filesPath = 'files';
const contentPath = 'content';
const commitHash = '38429bed94bd7c107c65fed6bffbf443ff0f4183';

describe('Навигация между страницами нативная', () => {

  describe('список коммитов -> список файлов', () => {
    it('клик на ссылку последнего в списке коммита перекидывает на список его файлов', function () {
      return this.browser
        .url(baseURLRelative)
        .click('.content .commit:last-child .commit__link a')
        .getUrl()
        .then((url) => {
          const rightPath = [baseURL, filesPath, commitHash, ''].join('/');
          assert.equal(url, rightPath);
        })
        .getText('.breadcrumbs')
        .then((text) => {
          assert.equal(text, 'HISTORY / ROOT');
        });
    });
  });

  describe('список файлов -> вложенная папка', () => {
    it('клик на папку открывает ее содержимое', function () {
      const lastFolderName = 'views';

      return this.browser
        .url('files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
        .click('.content ul li:last-child a')
        .getUrl()
        .then((url) => {
          const rightPath = [baseURL, filesPath, commitHash, lastFolderName].join('/');
          assert.equal(url, rightPath);
        })
        .getText('.breadcrumbs')
        .then((text) => {
          assert.equal(text, 'HISTORY / ROOT / ' + lastFolderName);
        })
        .isExisting('.content ul li a')
        .then((exists) => {
          assert.ok(exists, 'Ни одного файла в папке не найдено');
        });
    });
  });

  describe('список файлов -> содержимое файла', () => {
    it('клик на файл открывает ее содержимое', function () {
      const firstFileName = '.gitignore';

      return this.browser
        .url('files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
        .click('.content ul li:first-child a')
        .getUrl()
        .then((url) => {
          const rightPath = [baseURL, contentPath, commitHash, firstFileName].join('/');
          assert.equal(url, rightPath);
        })
        .getText('.breadcrumbs')
        .then((text) => {
          assert.equal(text, 'HISTORY / ROOT / ' + firstFileName);
        });
    });
  });
});


describe('Навигация между страницами по breadcrumbs', () => {

  describe('содержимое файла -> список файлов', () => {
    it('клик на ROOT возвращает на список файлов', function () {
      const firstFileName = '.gitignore';

      return this.browser
        .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/.gitignore')
        .element('.breadcrumbs:first-child')
        .click('a*=ROOT')
        .getUrl()
        .then((url) => {
          const rightPath = [baseURL, filesPath, commitHash, ''].join('/');
          assert.equal(url, rightPath);
        })
        .getText('.breadcrumbs')
        .then((text) => {
          assert.equal(text, 'HISTORY / ROOT');
        });
    });
  });

  describe('список файлов -> список коммитов', () => {
    it('клик на HISTORY возвращает на список коммитов', function () {
      return this.browser
        .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
        .element('.breadcrumbs:first-child')
        .click('a*=HISTORY')
        .getUrl()
        .then((url) => {
          const rightPath = [baseURL, ''].join('/');
          assert.equal(url, rightPath);
        })
        .getText('.breadcrumbs')
        .then((text) => {
          assert.equal(text, 'HISTORY');
        });
    });
  });

  describe('контент вложенной папки -> вложенная папка', () => {
    it('клик на имя папки в breadcrumbs перекидывает на ее содержимое', function () {
      const folderName = 'views';

      return this.browser
        .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/views/error.hbs')
        .element('.breadcrumbs:first-child')
        .click('a*=' + folderName)
        .getUrl()
        .then((url) => {
          const rightPath = [baseURL, filesPath, commitHash, folderName, ''].join('/');
          assert.equal(url, rightPath);
        })
        .getText('.breadcrumbs')
        .then((text) => {
          assert.equal(text, 'HISTORY / ROOT / ' + folderName);
        });
    });
  });

  describe('контент вложенной папки -> список коммитов', () => {
    it('клик на HISTORY возвращает на список коммитов', function () {
      const folderName = 'views';

      return this.browser
        .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/views/error.hbs')
        .element('.breadcrumbs:first-child')
        .click('a*=HISTORY')
        .getUrl()
        .then((url) => {
          const rightPath = [baseURL, ''].join('/');
          assert.equal(url, rightPath);
        })
        .getText('.breadcrumbs')
        .then((text) => {
          assert.equal(text, 'HISTORY');
        });
    });
  });
});
