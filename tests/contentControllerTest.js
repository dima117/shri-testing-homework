const contentController  = require('../controllers/contentController');
const expect  = require('chai').expect;
const sinon = require('sinon');
const assert = require('assert');


describe('Controller for content: ',  function()  {
	const req = { params: {'0': 'README.md', hash: 'ce02833'}};
	const resSpy = { render: sinon.spy() };
	const nextSpy = sinon.spy();

	it('Empty file do not pass', async function() {
		const stubFileContent = sinon.stub();
		const stubFileTree = sinon.stub();

		stubFileTree.returns(Promise.resolve([{ type: 'blob' }]));
		stubFileContent.returns(Promise.resolve(''));

		await contentController(req, resSpy, nextSpy, stubFileTree, stubFileContent);
		// Тест проверяет реакцию фунции на пустой файл
		expect(resSpy.render.called).to.be.false;
		
    
	});

	it('File type is blob', async function() {
		const spyFileContent = sinon.spy();
		const stubFileTree = sinon.stub();

		stubFileTree.returns(Promise.resolve([{ type: 'tree' }]));

		await contentController(req, resSpy, nextSpy, stubFileTree, spyFileContent);
		// Если файл не blob, gitFileContent не будет вызван
		expect(spyFileContent.called).to.be.false;

	});
});
