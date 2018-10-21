const {assert} = require('chai');

describe('Проверка контента', function() {
    it('Есть container', function() {
        return this.browser
            .url('/')
            .isExisting('.container')
            .then((exists) => {
                assert.ok(exists, 'Нет контейнера')
            });
    })

    it('Есть History', function () {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then((title) => {
                assert.strictEqual(title, 'HISTORY')
            });
    })

})

describe('Проверка переходов', function() {
    it('Переход на коммит', function() {
        return this.browser
            .url('/')
            .click('.commit__link > a')
            .isExisting('.content > ul')
            .then((exists) => {
                assert.ok(exists, 'Переход на коммит не работает!')
            });        
    })

    it('Переход в папку', function () {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .click('ul > li:nth-child(4) > a')
            .isExisting('.content > ul')
            .then(exists => {
                assert.ok(exists, 'Папка не открылась!');
            });
    })

    it('Переход в файл', function () {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .click('ul > li:nth-child(1) > a')
            .isExisting('.file-content')
            .then(exists => {
                assert.ok(exists, 'Файл не отображается');
            });
    })

    it('Переход на хлебную крошку', function() {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .click('a:nth-child(1)')
            .isExisting('.commit')
            .then(exists => {
                assert.ok(exists, 'Переход на хлебную крошку не работает');
            });
    });
})