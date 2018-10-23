const assert = require('assert');
const sinon = require('sinon');
const expect = require('chai').expect;

const { gitHistory, gitFileTree } = require('../utils/git');

describe('Testing interaction with git: ', function() {

	describe('Testing git history', function() {
		const stub = sinon.stub();
		stub.returns(Promise.resolve('3	D	1	a\n3	D	1	a\n3	D	1	a\n\n\n'));

		it('Returns promise', function() {
			expect(gitHistory(1, 1, stub)).to.be.a('promise');
		});

		it('All keys are filtered from empty ones', async function() {
			const mappedArray = await gitHistory(1, 1, stub);
			const result = mappedArray.every(({ hash, msg }) => hash && msg);
			expect(result).to.be.true;

		});

		it('All keys have hash, author, timestamp, msg', async function() {
			const result = await gitHistory(1, 1, stub);
			expect(result[0]).to.have.all.keys('hash', 'author', 'timestamp', 'msg');

		});
	});
    
	describe('Testing git file tree', function() {
		const stub = sinon.stub();
		stub.returns(Promise.resolve('0 t 8 p\n0 t 8'));

		it('Returns promise', function() {
			expect(gitFileTree(null, null, stub)).to.be.a('promise');
		});

		it('All keys are filtered from empty ones', async function() {
			const mappedArray = await gitFileTree(null, null, stub);
			const result = mappedArray.every(({ hash, type }) => hash && type);
			expect(result).to.be.true;
		});

		it('All keys have hash, type, path', async function() {
			const result = await gitFileTree(null, null, stub);
			expect(result[0]).to.have.all.keys('hash', 'type', 'path');
		});
	});

});
