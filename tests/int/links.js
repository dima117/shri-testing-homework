var assert = require('chai').assert;

describe('правильно работает переход', function () {
    it('из списка коммитов на список файлов', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .getTitle()
            .then(title => assert.equal(title, 'files'));
    });

    it('из списка файлов во вложенную папку', function () {
        return this.browser
            .url('/files/0b3c27dfaff1b8485d0e382311ad8794734e48ce/')
            .click('a[href="/files/0b3c27dfaff1b8485d0e382311ad8794734e48ce/controllers"]')
            .getTitle()
            .then(title => assert.equal(title, 'files'));
    });

    it('из списка файлов на страницу отдельного файла', function () {
        return this.browser
            .url('/files/0b3c27dfaff1b8485d0e382311ad8794734e48ce/')
            .click('a[href="/content/0b3c27dfaff1b8485d0e382311ad8794734e48ce/.gitignore"]')
            .getTitle()
            .then(title => assert.equal(title, 'content'));
    });
});

describe('правильно работает переход по хлебным крошкам', function () {
    it('с 4 уровня на 3', function () {
        return this.browser
            .url('/content/0b3c27dfaff1b8485d0e382311ad8794734e48ce/controllers/indexController.js')
            .click('.breadcrumbs a[href="/files/0b3c27dfaff1b8485d0e382311ad8794734e48ce/controllers/"]')
            .getTitle()
            .then(title => assert.equal(title, 'files'));
    });

    it('с 4 уровня на 2', function () {
        return this.browser
            .url('/content/0b3c27dfaff1b8485d0e382311ad8794734e48ce/controllers/indexController.js')
            .click('.breadcrumbs a[href="/files/0b3c27dfaff1b8485d0e382311ad8794734e48ce/"]')
            .getTitle()
            .then(title => assert.equal(title, 'files'));
    });

    it('с 4 уровня на 1', function () {
        return this.browser
            .url('/content/0b3c27dfaff1b8485d0e382311ad8794734e48ce/controllers/indexController.js')
            .click('.breadcrumbs a[href="/"]')
            .getTitle()
            .then(title => assert.equal(title, 'history'));
    });
});