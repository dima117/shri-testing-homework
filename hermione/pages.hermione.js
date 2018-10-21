const assert = require('assert');

describe('Переходы', () => {
    it('из списка коммитов на список файлов', function() {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .isExisting('.content ul')
            .then(exists => {
                assert.ok(exists, 'Нет перехода на список файлов');
            });
    });

    it('из списка файлов во вложенную папку', function() {
        return this.browser
            .url('http://localhost:3000/files/144944153a24f28bd13bcd60aa7f588523649a53/')
            .click("a[href='/files/144944153a24f28bd13bcd60aa7f588523649a53/utils']")
            .isExisting('.content ul')
            .then(exists => {
                assert.ok(exists, 'Нет перехода во вложенную папку');
            });
    });
    
    it('из списка файлов на страницу отдельного файла', function() {
        return this.browser
            .url('http://localhost:3000/files/144944153a24f28bd13bcd60aa7f588523649a53/utils')
            .click("a[href='/content/144944153a24f28bd13bcd60aa7f588523649a53/utils/navigation.js']")
            .isExisting('.content .file-content')
            .then(exists => {
                assert.ok(exists, 'Нет перехода на страницу отдельного файла');
            });
    });

    it('по хлебным крошкам', function() {
        return this.browser
            .url('http://localhost:3000/files/144944153a24f28bd13bcd60aa7f588523649a53/utils')
            .click("a[href='/']")
            .getText('.breadcrumbs')
            .then(text => {
                assert.equal(text, 'HISTORY', 'Нет перехода на список коммитов по хлебным крошкам');
            })
    });
});