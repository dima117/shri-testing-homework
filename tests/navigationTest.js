const expect = require('chai').expect;
const assert = require('assert');

const { buildFolderUrl, buildFileUrl, buildBreadcrumbs} = require('../utils/navigation');

describe('Testing navigation: ', function() {

	describe('Testing built folder url', function() {

		it('Should return a string', function() {
			expect(buildFolderUrl('one')).to.be.a('string');

		});

		it('Route should start with /files/', function() {
			expect(buildFolderUrl('one', 'two')).to.have.string('/files/');

		});
	});

	describe('Testing build file url', function() {

		it('Should return string', function() {
			expect(buildFileUrl('one', 'two')).to.be.a('string');

		});

		it('Route should start with /content/', function() {
			expect(buildFileUrl('one', 'two')).to.have.string('/content/');

		});

	});

	describe('Testing build breadcrumbs', function() {

		it('Should return array with more than 0 length', function() {
			expect(buildBreadcrumbs()).to.have.lengthOf.above(0);

		});

		it('Array element should have key - text', function() {
			const [ breadcrumbs ] = buildBreadcrumbs();
			expect(breadcrumbs).to.have.any.keys('text');

		});
		it('When function called without arguments, array length equals 1', function() {
			expect(buildBreadcrumbs()).to.have.lengthOf(1);

		});

	});
});