const chai = require('chai');
const assert = chai.assert;

describe('Отображение главных элементов', () => {
	it('История коммитов должна появиться на главной стр', function() {
		return this.browser.url('/').isExisting('.content--index').then((exists) => {
			assert.ok(exists, 'История коммитов не появилась');
		});
	});

	it('На стр коммита должен отображаться список файлов', function() {
		return this.browser
			.url('/files/77ff20b22039b73fc655bee0185f02ff2e33b4cf/')
			.isExisting('.content--files')
			.then((exists) => {
				assert.ok(exists, 'Список файлов не появился');
			});
	});

	it('На стр файла должно отображаться содержимое файла', function() {
		return this.browser
			.url('/content/77ff20b22039b73fc655bee0185f02ff2e33b4cf/app.js')
			.isExisting('.content--file')
			.then((exists) => {
				assert.ok(exists, 'Содержимое файла не появилась');
			});
	});

	it('Хлебные крошки отображаются на главной', function() {
		return this.browser.url('/').isExisting('.breadcrumbs').then((exists) => {
			assert.ok(exists, 'Хлебные крошки не отображаются на главной');
		});
	});

	it('Хлебные крошки отображаются на стр коммита', function() {
		return this.browser
			.url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
			.isExisting('.breadcrumbs')
			.then((exists) => {
				assert.ok(exists, 'Хлебные крошки не отображаются на стр коммита');
			});
	});

	it('Хлебные крошки отображаются на стр файла', function() {
		return this.browser
			.url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/app.js')
			.isExisting('.breadcrumbs')
			.then((exists) => {
				assert.ok(exists, 'Хлебные крошки не отображаются на стр файла');
			});
	});
});

describe('Правильное отображение содержимого коммита', function() {
	it('Коммит появился', function() {
		return this.browser.url('/').isExisting('.commit').then((exists) => {
			assert.ok(exists, 'Коммит не появился');
		});
	});

	it('В коммите указан автор', function() {
		return this.browser.url('/').isExisting('.commit__author').then((exists) => {
			assert.ok(exists, 'В коммите не указан автор');
		});
	});

	it('В коммите указана дата', function() {
		return this.browser.url('/').isExisting('.commit__date').then((exists) => {
			assert.ok(exists, 'В коммите не указана дата');
		});
	});

	it('В коммите указан комментарий', function() {
		return this.browser.url('/').isExisting('.commit__msg').then((exists) => {
			assert.ok(exists, 'В коммите не указан комментарий');
		});
	});
});

describe('Переходы по страницам вне навигации', () => {
	it('Если стр не найдена, показывается 404 стр', function() {
		return this.browser.url('abracadabra').getText('.container').then((text) => {
			assert.ok(text, 'показывается 404 стр');
		});
	});
});
