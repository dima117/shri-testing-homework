const assert = require('assert');

describe('Testing correctness of output', () => {
	it('Transitions between commit and file opening', function () {
		return this.browser
			.url('/')
			.click('.commit__link a')
			.isExisting('.content > ul')
			.then((exists) => {
				assert.ok(exists, 'Commit not open');
			})
			.isExisting('.content > ul > li')
			.then((exists) => {
				assert.ok(exists, 'No files in commit');
			})
			.click('.content > ul > li > a')
			.isExisting('.file-content')
			.then((exists) => {
				assert.ok(exists, 'File not open');
			});
	});

	it('Output and clickability of breadcrumbs', function () {
		return this.browser
			.url('/')
			.click('.commit__link a')
			.isExisting('.breadcrumbs > a')
			.then((exists) => {
				assert.ok(exists, 'Breadcrumb link not open');
			})
			.click('.breadcrumbs > a')
			.isExisting('.content > .commit')
			.then((exists) => {
				assert.ok(exists, 'Transition between breadcrumbs not working');
			})
			.click('.commit__link a')
			.click('.content > ul > li > a')
			.isExisting('.breadcrumbs > a:nth-child(2)')
			.then((exists) => {
				assert.ok(exists, 'Breadcrumb not been created');
			})
			.click('.breadcrumbs > a:nth-child(2)')
			.isExisting('.content > ul > li')
			.then((exists) => {
				assert.ok(exists, 'Incorrect breadcrumb');
			});
	});
});