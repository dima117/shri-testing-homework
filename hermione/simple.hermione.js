const assert = require('assert');

describe('переходы по страницам', () => {
    it('из списка коммитов на список файлов', function() {
        const page = this.browser.url('/');
        const nextPage = page.leftClick('.commit__link a')
        return nextPage.isExisting('ul')
            .then((exists) => {
                assert.ok(exists, 'нет списка(тега ul)')
            })
    });
    it('из списка файлов во вложенную папку', function() {
        const page = this.browser.url('/files/8c51372377fd121fa36a90793494ca32e4ed9d61/')
        nextPage = page.leftClick("a[href='/files/8c51372377fd121fa36a90793494ca32e4ed9d61/bin']")
        return nextPage.isExisting('ul')
            .then((exists) => {
                assert.ok(exists, 'нет списка(тега ul)')
            })
    });
    it('из списка файлов на страницу отдельного файла', function() {
        const page = this.browser.url('/files/8c51372377fd121fa36a90793494ca32e4ed9d61/')
        nextPage = page.leftClick("a[href='/content/8c51372377fd121fa36a90793494ca32e4ed9d61/app.js']")
        return nextPage.isExisting('.file-content')
            .then((exists) => {
                assert.ok(exists, 'нет контента(тега file-content)')
            })
    });
    it('переходы по хлебным крошкам', function() {
        const page = this.browser.url('http://localhost:3000/content/8c51372377fd121fa36a90793494ca32e4ed9d61/app.js')
        nextPage = page.leftClick("a[href='/files/8c51372377fd121fa36a90793494ca32e4ed9d61/']")
        return nextPage.getText('.breadcrumbs').then((res) => {
            assert.equal(res, 'HISTORY / ROOT', 'ошибка перехода(не совпадают строки в хлебных крошках)')
        })
    });
});

describe('проверка верстки', function() {
    describe('история коммитов', function() {
        it('сравнение хлебных крошек', function() {
            const page = this.browser.url('/');

            return page.assertView('breadcrumbs', '.breadcrumbs');
        })
        it('сравнение последнего коммита',function() {
            const page = this.browser.url('/');
    
            return page.assertView('last commit', '.commit:last-child')
        })
    })
    it('просмотр файловой системы',function() {
        const page = this.browser.url('http://localhost:3000/files/8c51372377fd121fa36a90793494ca32e4ed9d61/');

        return page.assertView('file system', 'html');
    })
    it('просмотр содержимого файла',function() {
        const page = this.browser.url('http://localhost:3000/content/8c51372377fd121fa36a90793494ca32e4ed9d61/.gitignore');

        return page.assertView('file content', 'html');
    })
})