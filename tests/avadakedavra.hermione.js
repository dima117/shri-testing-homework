const assert = require('assert');

describe('Правильно отображается содержимое', () => {

    it('заголовок на странице - история комммитов', function () {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY', 'Заголовок не совпадает или страница отсутствует');
            });
    });

    it('список коммитов на странице - история комммитов', function () {
        return this.browser
            .url('/')
            .isExisting('.commit')
            .then((exist) => {
                assert.ok(exist, 'Содержимое отсутствует');
            });
    });

    it('заголовок на странице - файловая система', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY / ROOT', 'Заголовок не совпадает или страница отсутствует');
            });
    });

    it('файлы на странице - файловая система', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .getText('a[href$=".gitignore"]')
            .then((text) => {
                assert.equal(text, '.gitignore', 'содержимое не совпадает или страница отсутствует');
            });
    });

    it('заголовок на странице - файл', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .click('a[href$=".gitignore"]')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY / ROOT / .gitignore', 'Заголовок не совпадает или страница отсутствует');
            });

    });

    it('данные файла на странице - файл', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .click('a[href*="content"]')
            .getText('.breadcrumbs')
            .isExisting('.file-content')
            .then((exist) => {
                assert.ok(exist, 'содержимое не совпадает или страница отсутствует');
            });
    });

});

describe('Правильно работает переход', () => {

    it('из списка коммитов на список файлов', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY / ROOT', 'Переход неверный');
            });
    });
    it('из списка файлов во вложенную папку', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .click('a[href*="files"]')
            .isExisting('.content a')
            .then((exist) => {
                assert.ok(exist, 'Переход неверный');
            });
    });

    it('Из списка файлов на страницу отдельного файла', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .click('a[href*="content"]')
            .isExisting('.file-content')
            .then((exist) => {
                assert.ok(exist, 'переход неверный');
            });
    });

    it('Переход по хлебным крошкам', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .click('a[href*="content"]')
            .click('.breadcrumbs a:first-child')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY', 'Заголовок не совпадает или страница отсутствует');
            });
    });
});
