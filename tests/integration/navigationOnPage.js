const chai = require('chai');
const assert = chai.assert;

describe('Переходы по страницам вне навигации', () => {
	it('Если стр не найдена, показывается 404 стр', function() {
		return this.browser.url('abracadabra').getText('.container').then((text) => {
			assert.ok(text, 'показывается 404 стр');
		});
	});

	it('Можем перейти из списка коммитов к списку файлов', function() {
		const commitLink = '.content--index .commit:first-child .commit__link a';
		return this.browser.url('/').isExisting(commitLink).click(commitLink).getTitle().then((title) => {
			assert.ok(title, 'files', 'Не можем перейти из списка коммитов к списку файлов');
		});
	});

	it('Можем перейти из списка коммитов к содержимому файла', function() {
		const commitLink = '.content--index .commit:first-child .commit__link a';
		const fileLink = '.content--files ul li a';
		return this.browser
			.url('/')
			.isExisting(commitLink)
			.click(commitLink)
			.isExisting(fileLink)
			.click(fileLink)
			.getTitle()
			.then((title) => {
				assert.ok(title, 'content', 'Не можем перейти из списка коммитов к содержимому файла');
			});
	});
});

describe('Переходы по страницам по навигации', () => {
	it('Можем перейти из файла к главной', function() {
		const commitLink = '.content--index .commit:first-child .commit__link a';
		const fileLink = '.content--files ul li a';
		return this.browser
			.url('/')
			.isExisting(commitLink)
			.click(commitLink)
			.isExisting(fileLink)
			.click(fileLink)
			.isExisting('.breadcrumbs a:first-child')
			.click('.breadcrumbs a:first-child')
			.getTitle()
			.then((title) => {
				assert.ok(title, 'history', 'Не можем перейти из файла к главной');
			});
	});

	it('Можем перейти из файла к коммиту', function() {
		const commitLink = '.content--index .commit:first-child .commit__link a';
		const fileLink = '.content--files ul li a';
		return this.browser
			.url('/')
			.isExisting(commitLink)
			.click(commitLink)
			.isExisting(fileLink)
			.click(fileLink)
			.click('.breadcrumbs a:nth-child(2)')
			.getTitle()
			.then((title) => {
				assert.ok(title, 'files', 'Не можем перейти из файла к коммиту');
			});
	});

	it('Можем перейти из коммита к главной', function() {
		const commitLink = '.content--index .commit:first-child .commit__link a';
		return this.browser
			.url('/')
			.isExisting(commitLink)
			.click(commitLink)
			.click('.breadcrumbs a:first-child')
			.getTitle()
			.then((title) => {
				assert.ok(title, 'index', 'Не можем перейти из коммита к главной');
			});
	});
});
