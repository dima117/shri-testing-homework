const { expect } = require('chai');
const sinon = require('sinon');

const controller = require('../contentController');

describe('Контроллер содержимого файла коммита', () => {

  const request = { params: { hash: '', '0': '' } };
  const response = { render: sinon.spy() };
  const stubs = {};
  stubs.gitFileTree = sinon.stub();
  stubs.gitFileTree.returns(Promise.resolve([
    { type: '', hash: '', path: '' }
  ]));
  stubs.gitFileContent = sinon.stub();
  stubs.buildBreadcrumbs = sinon.stub();

  it('Используется представление содержимого файла коммита', async () => {
    await controller(request, response, () => {}, stubs);

    const view = response.render.getCall(0).args[0];

    expect(view).to.be.equal('content');
  });

  it('В представление прокидывается набор данных, состоящий из заголовка, хлебных крошек и содержимого файла коммита коммита', async () => {
    await controller(request, response, () => {}, stubs);

    const params = response.render.getCall(1).args[1];

    expect(params).to.have.all.keys(
      'title',
      'breadcrumbs',
      'content',
    );
  });

});
