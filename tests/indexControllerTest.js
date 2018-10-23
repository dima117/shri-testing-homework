const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');

const controller = require('../controllers/indexController');

describe('Controller for index: ', () => {
	it('Links on href in commits are created', async () => {
		const spy = { render: sinon.spy() };
		const stub = sinon.stub();
		stub.returns(Promise.resolve([
			{ h: 'c', a: 'D', t: '20' },
			{ h: 'x', a: 'B', t: '0' }
		]));

		await controller(null, spy, null, stub);

		const { list } = spy.render.args[0][1];
		const result = list.every(obj => obj.href);
		expect(result).to.be.true;
	});
});