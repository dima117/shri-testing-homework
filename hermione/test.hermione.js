const assert = require('Chai').assert;

describe('Отображение содержимого', function() {
    // поскольку вся страница целиком слишком велика, да и контент может меняться, проверять будем вид одного блока
    it('история коммитов', function() {
        return this.browser
            .url('http://localhost:3000/')
            .assertView('commit', '.commit:last-child');
    });

    it('файловая система', function() {
        return this.browser
            .url('http://localhost:3000/')
            .click('.commit:nth-child(2) a')
            .assertView('file', 'li:first-child');
    });

    it('содержимое файла', function() {
        return this.browser
            .url('http://localhost:3000/')
            .click('.commit:nth-child(2) a')
            .click('=.gitignore')
            .assertView('content', '.content');
    });
});

describe('Переходы', function () {
    describe('переход из списка коммитов на список файлов', function () {
        it('есть .gitignore и Readme, в крошках путь HISTORY / ROOT', function () {
            return this.browser
                .url('http://localhost:3000/')
                .click('.commit:nth-child(2) a')
                .isExisting('=.gitignore')
                .then((exists) => {
                    assert.ok(exists, 'Не нашёл .gitignore');
                })
                .isExisting('=README.md')
                .then((exists) => {
                    assert.ok(exists, 'Не нашёл README');
                })
                .assertView('breadcrumbs-files', '.breadcrumbs');
        });
    });

    describe('переход из списка файлов во вложенную папку bin', function () {
        it('есть файл www, в крошках путь HISTORY / ROOT / .bin', function () {
            return this.browser
                .url('http://localhost:3000/')
                .click('.commit:nth-child(2) a')
                .click('=bin')
                .isExisting('=www')
                .then((exists) => {
                    assert.ok(exists, 'Не нашёл www файла');
                })
                .assertView('breadcrumbs-files', '.breadcrumbs');
        });
    });

    describe('переход из списка файлов на страницу отдельного файла', function () {
        it('попали в .gitignore и нашли в нём node_modules, в хлебных крошках путь HISTORY / ROOT / .gitignore', function () {
            return this.browser
                .url('http://localhost:3000/')
                .click('.commit:nth-child(2) a')
                .click('=.gitignore')
                .getText('.file-content')
                .then((text) => {
                    assert.include(text, 'node_modules')
                })
                .assertView('breadcrumbs-files', '.breadcrumbs');
        });
    });

    describe('Переходы по хлебным крошкам', function () {
        it('переход в HISTORY', function () {
            return this.browser
                .url('http://localhost:3000/')
                .click('.commit:nth-child(2) a')
                .click('=HISTORY')
                .isExisting('.commit')
                .then((exists) => {
                    assert.ok(exists, 'Не нашёл коммитов');
                });
        });
        it('переход в ROOT', function () {
            return this.browser
                .url('http://localhost:3000/')
                .click('.commit:nth-child(2) a')
                .click('=bin')
                .click('=ROOT')
                .isExisting('=.gitignore')
                .then((exists) => {
                    assert.ok(exists, 'Не нашёл .gitignore');
                });
        });
        it('переход в folder', function () {
            return this.browser
                .url('http://localhost:3000/')
                .click('.commit:nth-child(2) a')
                .click('=bin')
                .click('=www')
                .click('=bin')
                .isExisting('=www')
                .then((exists) => {
                    assert.ok(exists, 'Не нашёл www файла');
                })
        });
    });
});