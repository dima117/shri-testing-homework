const { expect } = require('chai');
const sinon = require('sinon');

const controller = require('../indexController');

describe('Контроллер истории коммитов', () => {

  const response = { render: sinon.spy() };
  const stubs = {};
  stubs.gitHistory = sinon.stub();
  stubs.gitHistory.returns(Promise.resolve([
    { hash: '', author: '', timestamp: '', msg: '' }
  ]));
  stubs.buildFolderUrl = sinon.stub();
  stubs.buildBreadcrumbs = sinon.stub();

  it('Подготовка истории коммитов перед отправкой в представление', async () => {
    await controller(null, response, () => {}, stubs);

    const list = response.render.getCall(0).args[1].list;

    expect(list[0]).to.have.any.keys('href');
  });

  it('Используется представление истории коммитов', async () => {
    await controller(null, response, () => {}, stubs);

    const view = response.render.getCall(1).args[0];

    expect(view).to.be.equal('index');
  });

  it('В представление прокидывается набор данных, состоящий из заголовка, хлебных крошек и списка истории коммитов', async () => {
    await controller(null, response, () => {}, stubs);

    const params = response.render.getCall(2).args[1];

    expect(params).to.have.all.keys(
      'title',
      'breadcrumbs',
      'list',
    );
  });

});
