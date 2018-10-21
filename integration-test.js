const {assert} = require('chai');

describe('Тестирование главной страницы', function() {
    it('На странице отображается элемент с классом container', function() {
        return this.browser
            .url('http://localhost:3000')
            .isExisting('.container')
            .then((exists) => {
                assert.ok(exists, 'Такого элемента на странице нет')
            });
    })
    it('На странице отображается элемент с классом commit', function () {
        return this.browser
            .url('http://localhost:3000')
            .isExisting('.commit')
            .then((exists) => {
                assert.ok(exists, 'Такого элемента на странице нет')
            });
    })
    it('На главной странице отображается HISTORY', function () {
        return this.browser
            .url('http://localhost:3000')
            .getText('.breadcrumbs')
            .then((title) => {
                assert.strictEqual(title, 'HISTORY')
            });
    })
})

describe('Переход из списка коммитов на список файлов', function() {
    it('По нажатию на коммит открывается список файлов', function() {
        return this.browser
            .url('http://localhost:3000')
            .click('.commit__link > a')
            .isExisting('.list')
            .then((exists) => {
                assert.ok(exists, 'По нажатию на коммит список файлов не открывается')
        });        
    })
    it('На странице с файлами отображается HISTORY / ROOT', function () {
        return this.browser
			.url('http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
			.getText('.breadcrumbs')
			.then(title => {
				assert.strictEqual(title, 'HISTORY / ROOT');
			});
    })
})

describe('Переход из списка файлов на страницу с вложенными папками', function () {
    it('По нажатию на папку открывается страница со списком файлов', function () {
        return this.browser
			.url('http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
			.click('.link > a[href$="controllers"]')
			.isExisting('.list')
			.then(exists => {
                assert.ok(exists, 'По нажатию на папку не открывается страница со списком файлов');
			});
    })
})

describe('Переход из списка файлов на страницу отдельного файла', function () {
    it('По нажатию на файл открывается страница с содержимым файла', function () {
        return this.browser
            .url('http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .click('.link > a[href$="app.js"]')
            .isExisting('.file-content')
            .then(exists => {
                assert.ok(exists, 'По нажатию на файл не открывается страница с содержимым файла');
            });
    })
})

describe('Переход по хлебным крошкам', function() {
	it('По нажатию на элемент хлебной крошки, браузер переходит на нужную страницу', function() {
		return this.browser
			.url('http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .click('a[href$="/"]')
			.isExisting('.commit')
			.then(exists => {
                assert.ok(exists, 'По нажатию на элемент хлебной крошки, браузер не переходит на нужную страницу');
			});
	});
});