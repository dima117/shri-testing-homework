const { expect } = require('chai');
const sinon = require('sinon');

const controller = require('../filesController');

describe('Контроллер файловой системы коммита', () => {

  const request = { params: { hash: '' } };
  const response = { render: sinon.spy() };
  const stubs = {};
  stubs.gitFileTree = sinon.stub();
  stubs.gitFileTree.returns(Promise.resolve([
    { type: '', hash: '', path: '' }
  ]));
  stubs.buildObjectUrl = sinon.stub();
  stubs.buildBreadcrumbs = sinon.stub();

  it('Подготовка файловой системы коммита перед отправкой в представление', async () => {
    await controller(request, response, () => {}, stubs);

    const files = response.render.getCall(0).args[1].files;

    expect(files[0]).to.have.any.keys('href', 'name');
  });

  it('Используется представление содержимого файла коммита', async () => {
    await controller(request, response, () => {}, stubs);

    const view = response.render.getCall(1).args[0];

    expect(view).to.be.equal('files');
  });

  it('В представление прокидывается набор данных, состоящий из заголовка, хлебных крошек и файловой системы коммита', async () => {
    await controller(request, response, () => {}, stubs);

    const params = response.render.getCall(2).args[1];

    expect(params).to.have.all.keys(
      'title',
      'breadcrumbs',
      'files',
    );
  });

});
