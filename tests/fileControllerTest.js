const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');

const controller = require('../controllers/filesController');

describe('Controller for files: ', () => {

	const req = {
		params: { '0': undefined, hash: '6acbf4' }
	};
	const spy = { render: sinon.spy() };
	const stubBuildObj = sinon.stub();
	const stubGetTree = sinon.stub();
	stubBuildObj.returns('url');
	stubGetTree.returns(Promise.resolve([
		{ t: 'b', path: '' },
		{ t: 't', path: 'root/' }
	]));

	describe('Adds href with name', () => {
		it('Should be href and name', async () => {
			await controller(req, spy, null, stubGetTree, stubBuildObj);

			const mappedArr = spy.render.args[0][1].files;
			const result = mappedArr.every(obj => 'href' in obj && 'name' in obj);

			expect(result).to.be.true;
		});
	});

	describe('Make a route from URL', () => {

		it('Route to root should be an empty string', async () => {
			await controller(req, spy, null, stubGetTree, stubBuildObj);
			const path = stubGetTree.args[1][1];
			expect(path).to.be.a('string').that.equal('');
		});

		it('Route should end with /', async () => {
			const req = {
				params: { '0': 'hermione/screens/62da184', hash: '7as3bc' }
			};

			await controller(req, spy, null, stubGetTree, stubBuildObj);
			const path = stubGetTree.args[2][1];
			expect(path.slice(-1)).to.equal('/');
		});


	});
});