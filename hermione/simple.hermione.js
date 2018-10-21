const assert = require('assert')

describe('Проверка корректности вывода', () => {
    it('Переходы от открытия коммита до открытия файла', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .isExisting('.content > ul')
            .then((exists) => {
                assert.ok(exists, 'Коммит не открылся');
            })
            .isExisting('.content > ul > li')
            .then((exists) => {
                assert.ok(exists, 'Нет файлов в проверяемом коммите');
            })
            .click('.content > ul > li > a')
            .isExisting('.file-content')
            .then((exists) => {
                assert.ok(exists, 'Файл не открылся');
            })
    })

    it('Вывод и кликабельность хлебных крошек', function () {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .isExisting('.breadcrumbs > a')
            .then((exists) => {
                assert.ok(exists, 'Ссылка в хлебных крошках не создалась');
            })
            .click('.breadcrumbs > a')
            .isExisting('.content > .commit')
            .then((exists) => {
                assert.ok(exists, 'Переход по хлебной крошке не был осушествлен');
            })
            .click('.commit__link a')
            .click('.content > ul > li > a')
            .isExisting('.breadcrumbs > a:nth-child(2)')
            .then((exists) => {
                assert.ok(exists, 'Хлебная крошка для перехода из файла в список не была создана');
            })
            .click('.breadcrumbs > a:nth-child(2)')
            .isExisting('.content > ul > li')
            .then((exists) => {
                assert.ok(exists, 'Некорректная хлебная крошка для перехода из файла с писок');
            })
    })
})