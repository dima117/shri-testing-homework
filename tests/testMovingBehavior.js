const assert = require('assert');

describe("Проверка переходов по страницам", () => {
    it('Перешли из списка коммитов на список файлов', function () {
        const firstCommitLink = ".content .commit:first-child .commit__link a";
        return this.browser
            .url('/')
            .isExisting(firstCommitLink)
            .click(firstCommitLink)
            .getTitle()
            .then(title => {
                assert.equal(title, 'files', 'Не перешли в список файлов коммита');
            });
    });
    it('Перешли из списка файлов во вложенную папку', function () {
        const concreteCommitPath = '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
        const firstFolderLink = '.content ul li a[href^=\'/files/\']';
        return this.browser
            .url(concreteCommitPath)
            .click(firstFolderLink)
            .getText('.breadcrumbs')
            .then(text => {
                assert.equal(text.split('/').length, 3, 'Не перешли из списка файлов во вложенную папку');
            });
    });
    it('Перешли из списка файлов на страницу отдельного файла', function () {
        const firstCommitLink = ".content .commit:first-child .commit__link a";
        const firstFileLink = '.content ul li a[href^=\'/content/\']';
        return this.browser
            .url('/')
            .click(firstCommitLink)
            .click(firstFileLink)
            .isExisting('.file-content')
            .then(exists => {
                assert.ok(exists, 'Не перешли из списка файлов на страницу отдельного файла');
            });
    });

    it("Перешли по хлебным крошкам (from fileContent to HISTORY) ", async function() {
        const fileContentPath = '/content/90180910fc27a11272a3e5caeeb119a51e5c0545/views/layout.hbs';
        return this.browser
            .url(fileContentPath)
            .click('.breadcrumbs a:nth-child(3)')
            .click('.breadcrumbs a:nth-child(2)')
            .click('.breadcrumbs a:first-child')
            .getTitle()
            .then(title => {
                assert.ok(title, 'history', 'Не перешли по хлебным крошкам');
            });
    });

});