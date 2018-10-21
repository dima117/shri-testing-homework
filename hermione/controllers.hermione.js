const assert = require('chai').assert;

describe('Корректное отображение содержимого страниц', function() {
    describe('История коммитов', function() {
        it('Корректное отображение верстки', function() {
            return this.browser
                .url('')
                .assertView('container', '.container');
        });

        it('Корректные хлебные крошки', function() {
            return this.browser
                .url('')
                .getText('.breadcrumbs')
                .then((text) => {
                    assert.ok(text, 'HISTORY')
                })
        });

        it('Список коммитов должен отрисоваться', function() {
            return this.browser
                .url('')
                .isExisting('.content')
                .then((exist) => {
                    assert.ok(exist, 'Список коммитов не отрисовался')
                })
        });

        it('Коммит должен отрисоваться', function() {
            return this.browser
                .url('')
                .isExisting('.commit')
                .then((exist) => {
                    assert.ok(exist, 'Коммит не отрисовался')
                })
        });

        it('Коммит параметры должны отрисоваться', function() {
            return this.browser
                .url('')
                .isExisting('.commit__info')
                .then((exist) => {
                    assert.ok(exist, 'Коммит параметры не отрисовались')
                })
        });

        it('Автор коммита должен отрисоваться', function() {
            return this.browser
                .url('')
                .isExisting('.commit__author')
                .then((exist) => {
                    assert.ok(exist, 'Автор коммита не отрисовался')
                })
        });

        it('Дата коммита должена отрисоваться', function() {
            return this.browser
                .url('')
                .isExisting('.commit__date')
                .then((exist) => {
                    assert.ok(exist, 'Дата коммита не отрисовалась')
                })
        });

        it('Сообщение коммита должно отрисоваться', function() {
            return this.browser
                .url('')
                .isExisting('.commit__msg')
                .then((exist) => {
                    assert.ok(exist, 'Сообщение коммита не отрисовалось')
                })
        });

        it('Hash Коммита должен отрисоваться', function() {
            return this.browser
                .url('')
                .isExisting('.commit__link')
                .then((exist) => {
                    assert.ok(exist, 'Hash Коммита не отрисовался')
                })
        });
    });

    describe('Просмотр файловой системы', function() {
        it('Корректное отображение верстки', function() {
            return this.browser
                .url('')
                .click('.commit__link a')
                .assertView('container', '.container');
        });

        it('Корректные хлебные крошки', function() {
            return this.browser
                .url('')
                .click('.commit__link a')
                .getText('.breadcrumbs')
                .then((text) => {
                    assert.ok(text, 'HISTORY / ROOT')
                })
        });

        it('Должен отрисоваться элемент дерева файлов', function() {
            return this.browser
                .url('')
                .click('.commit__link a')
                .isExisting('.content ul li')
                .then((exist) => {
                    assert.ok(exist, 'Элемент дерева файлов не отрисовался')
                })
        });

        it('Должен отрисоваться дерево файлов', function() {
            return this.browser
                .url('')
                .click('.commit__link a')
                .isExisting('.content ul')
                .then((exist) => {
                    assert.ok(exist, 'Дерево файлов не отрисовалось')
                })
        });
    });

    describe('Просмотр содержимого файла', function() {
        it('Корректное отображение верстки', function() {
            return this.browser
                .url('')
                .click('.commit__link a')
                .getUrl()
                .then((url) => {
                    this.browser
                    .url(`/content/${url.split('/')[4]}/file1.txt`)
                    .assertView('container', '.container');
                })
        });

        it('Корректные хлебные крошки', function() {
            return this.browser
                .url('')
                .click('.commit__link a')
                .getUrl()
                .then(async (url) => {
                    await this.browser.url(`/content/${url.split('/')[4]}/file1.txt`)
                })
                .getText('.breadcrumbs')
                .then((text) => {
                  assert.ok(text, 'HISTORY / ROOT / file1.txt')
                })
        });

        it('Содержимое файла', function() {
            return this.browser
                .url('')
                .click('.commit__link a')
                .getUrl()
                .then(async (url) => {
                    await this.browser.url(`/content/${url.split('/')[4]}/file1.txt`)
                })
                .isExisting('.file-content')
                .then((exist) => {
                    assert.ok(exist, 'Содержимое файла не отрисовалось')
                })
        });
    });
});
