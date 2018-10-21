const { expect } = require('chai');
const sinon = require('sinon');

const indexController = require('../../controllers/indexController');
const { Git } = require('../../utils/git');

describe('indexController', () => {
  const req = {};

  const res = {
    render: () => {}
  };

  const next = () => {};

  let gitHistoryStub;

  afterEach(() => {
    if (gitHistoryStub) gitHistoryStub.restore();
  });

  it('should send correct params for render without history', async () => {
    gitHistoryStub = sinon.stub(Git, 'gitHistory').resolves([]);

    res.render = sinon.spy();

    await indexController(req, res, next);

    expect(res.render.getCall(0).args).to.deep.eq([
      'index',
      {
        title: 'history',
        breadcrumbs: [
          {
            text: 'HISTORY',
            href: undefined
          }
        ],
        list: []
      }
    ]);
  });

  it('should send correct params for render with history', async () => {
    gitHistoryStub = sinon
      .stub(Git, 'gitHistory')
      .resolves([{ hash: 'someHash' }]);

    res.render = sinon.spy();

    await indexController(req, res, next);

    expect(res.render.getCall(0).args).to.deep.eq([
      'index',
      {
        title: 'history',
        breadcrumbs: [
          {
            text: 'HISTORY',
            href: undefined
          }
        ],
        list: [
          {
            hash: 'someHash',
            href: '/files/someHash/'
          }
        ]
      }
    ]);
  });

  it('should call next function with error', async () => {
    let next = () => {};

    const error = new Error('test error');
    gitHistoryStub = sinon.stub(Git, 'gitHistory').rejects(error);

    next = sinon.spy();

    await indexController(req, res, next);
    expect(next.calledWith(error)).to.eq(true);
  });
});
