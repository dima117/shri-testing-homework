const assert = require('assert');

describe('Наличие и расположение страниц приложения', () => {

    it('История коммитов - заголовок верный', function () {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY', 'Заголовок не совпадает или страница отсутствует');
            });
    });

    it('История коммитов - содержимое верное', function () {
        return this.browser
            .url('/')
            .isExisting('.commit')
            .then((exist) => {
                assert.ok(exist, 'Содержимое отсутствует');
            });
    });

    it('Файловая система - заголовок верный', function () {
        return this.browser
            .url('/files/7e013ae0440ad6e91082599376a6aaebe20d2112/')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY / ROOT', 'Заголовок не совпадает или страница отсутствует');
            });
    });

    it('Файловая система - содержимое верное', function () {
        return this.browser
            .url('/files/7e013ae0440ad6e91082599376a6aaebe20d2112/')
            .getText('.content ul li:first-child a')
            .then((text) => {
                assert.equal(text, '.gitignore', 'содержимое не совпадает или страница отсутствует');
            });
    });

    it('Содержимое файла - заголовок верный', function () {
        return this.browser
            .url('/content/7e013ae0440ad6e91082599376a6aaebe20d2112/.gitignore')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY / ROOT / .gitignore', 'Заголовок не совпадает или страница отсутствует');
            });
    });

    it('Содержимое файла - содержимое верное', function () {
        return this.browser
            .url('/content/7e013ae0440ad6e91082599376a6aaebe20d2112/.gitignore')
            .getText('.file-content')
            .then((text) => {
                assert.equal(text, 'node_modules', 'содержимое не совпадает или страница отсутствует');
            });
    });

});

describe('Правильно работают переходы по страницам', () => {

    it('из списка коммитов на список файлов', function () {
        return this.browser
            .url('/')
            .click('a[href$="/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/"]')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY / ROOT', 'Переход неверный');
            });
    });
    it('из списка файлов во вложенную папку', function () {
        return this.browser
            .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
            .click('a[href$="/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/bin"]')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY / ROOT / bin', 'Переход неверный');
            });
    });

    it('Из списка файлов на страницу отдельного файла', function () {
        return this.browser
            .url('/files/cc2284293758e32c50fa952da2f487c8c5e8d023/')
            .click('.content ul li:first-child a')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY / ROOT / .gitignore', 'Заголовок не совпадает или страница отсутствует');
            });
    });

    it('Переход по хлебным крошкам', function () {
        return this.browser
            .url('/content/cc2284293758e32c50fa952da2f487c8c5e8d023/controllers/contentController.js')
            .click('.breadcrumbs a:first-child')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY', 'Заголовок не совпадает или страница отсутствует');
            });
    });
});
