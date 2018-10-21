var assert = require('chai').assert;

describe('Переходы по страницам', function() {
    it('Переход список коммитов => список файлов', function() {
        return this.browser
            .url('')
            .click('.commit__link')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.ok(text, 'HISTORY / ROOT')
            })
    });

    it('Переход список файлов => вложенная папка', function() {
        return this.browser
            .url('')
            .click('.commit__link a')
            .click('.content ul li a')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.ok(text, 'HISTORY / ROOT / app')
            })
    });

    it('Переход список файлов => содержимое файла', function() {
        return this.browser
            .url('')
            .click('.commit__link a')
            .getUrl()
            .then(async (url) => {
                await this.browser.url(`/content/${url.split('/')[4]}/file1.txt`)
            })
            .isExisting('.file-content')
            .then((exist) => {
                assert.ok(exist, 'Переход не удачен')
            })
    });
    
    describe('Проверка статусов', function() {
        it('Неверный url, должен вернуть 500 статус', function() {
            return this.browser
                .url('content/someInvalidHash/somePath/')
                .getText('.container')
                .then((text) => {
                    assert.include(text, '500')
                })
        });

        it('Неверный url, должен вернуть 404 статус', function() {
            return this.browser
                .url('content/someInvalidHash')
                .getText('.container')
                .then((text) => {
                    assert.ok(text, '404 - Not Found')
                })
        });
    });
});
