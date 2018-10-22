const assert = require('assert');

describe("Проверка корректного отображения страниц", () => {

    describe('Верно отображается список коммитов', () => {
        it('есть блок с историей коммитов', function () {
            return this.browser
                .url('/')
                .isExisting('.content')
                .then(exists => {
                    assert.ok(exists, 'Блок с историей коммитов не отображается');
                });
        });
        it('есть коммиты в блоке коммитов', function () {
            return this.browser
                .url('/')
                .isExisting('.commit')
                .then(exists => {
                    assert.ok(exists, 'Нет ни одного коммита в списке');
                });
        });
        it('есть ссылка на содержимое коммита', function () {
            return this.browser
                .url('/')
                .isExisting('.commit .commit__link a')
                .then(exists => {
                    assert.ok(exists, 'Нет ссылки на файлы в коммите');
                });
        });

    });

    describe('Верно отображается файловая система', () => {
        const firstCommitLink = ".content .commit:first-child .commit__link a";
        it('есть блок со списком файлов', function () {
            return this.browser
                .url('/')
                .isExisting(firstCommitLink)
                .click(firstCommitLink)
                .isExisting('.content ul')
                .then(exists => {
                    assert.ok(exists, 'Блок со списком файлов не отображается');
                });
        });
    });

    describe('Верно отображается содержимое файла', () => {
        const firstCommitLink = ".content .commit:first-child .commit__link a";
        const firstFileLink = '.content ul li a[href^=\'/content/\']';

        it('есть блок с содержимым файла', function () {
            return this.browser
                .url('/')
                .isExisting(firstCommitLink)
                .click(firstCommitLink)
                .click(firstFileLink)
                .isExisting('.file-content')
                .then(exists => {
                    assert.ok(exists, 'Блок со содержимым файла не отображается');
                });
        });
    });

});