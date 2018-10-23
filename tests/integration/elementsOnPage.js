const chai = require('chai');
const assert = chai.assert;

describe('Отображение главных элементов', () => {
	it('Контейнер для истории коммитов появился на главной стр', function() {
		return this.browser.url('/').isExisting('.content--index').then((exists) => {
			assert.ok(exists, 'История коммитов не появилась');
		});
	});

	it('В истории есть хотя бы 1 коммит', function() {
		return this.browser.url('/').isExisting('.commit').then((exists) => {
			assert.ok(exists, 'Коммиты в истории не появились');
		});
	});

	it('В коммите есть ссылка', function() {
		return this.browser.url('/').isExisting('.commit .commit__link a').then((exists) => {
			assert.ok(exists, 'Ссылка на содержимое коммита не появилась');
		});
	});

	it('На стр коммита должен отображаться список файлов', function() {
		const commitLink = '.content--index .commit:first-child .commit__link a';
		return this.browser
			.url('/')
			.isExisting(commitLink)
			.click(commitLink)
			.isExisting('.content--files')
			.then((exists) => {
				assert.ok(exists, 'Список файлов не появился');
			});
	});

	it('На стр файла должно отображаться содержимое файла', function() {
		const commitLink = '.content--index .commit:first-child .commit__link a';
		const fileLink = '.content--files ul li a';
		return this.browser
			.url('/')
			.isExisting(commitLink)
			.click(commitLink)
			.isExisting(fileLink)
			.click(fileLink)
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
		const commitLink = '.content--index .commit:first-child .commit__link a';
		const fileLink = '.content--files ul li a';
		return this.browser
			.url('/')
			.isExisting(commitLink)
			.click(commitLink)
			.isExisting('.breadcrumbs')
			.then((exists) => {
				assert.ok(exists, 'Хлебные крошки не отображаются на стр коммита');
			});
	});

	it('Хлебные крошки отображаются на стр файла', function() {
		const commitLink = '.content--index .commit:first-child .commit__link a';
		const fileLink = '.content--files ul li a';
		return this.browser
			.url('/')
			.isExisting(commitLink)
			.click(commitLink)
			.isExisting(fileLink)
			.click(fileLink)
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
