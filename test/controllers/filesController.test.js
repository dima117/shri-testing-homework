const { expect } = require('chai');
const sinon = require('sinon');

const filesController = require('../../controllers/filesController');
const { Git } = require('../../utils/git');

describe('filesController', () => {
  const res = {
    render: () => {}
  };

  const next = () => {};

  let gitFileTreeStub;

  afterEach(() => {
    if (gitFileTreeStub) gitFileTreeStub.restore();
  });

  it('should send correct params for render, when path exists', async () => {
    const hash = 'someHash';
    const pathParam = 'public';

    const req = {
      params: {
        '0': pathParam,
        hash: hash
      }
    };

    gitFileTreeStub = sinon.stub(Git, 'gitFileTree').resolves([
      {
        type: 'tree',
        path: 'public'
      }
    ]);

    res.render = sinon.spy();

    await filesController(req, res, next);

    expect(res.render.getCall(0).args).to.deep.eq([
      'files',
      {
        title: 'files',
        breadcrumbs: [
          {
            text: 'HISTORY',
            href: '/'
          },
          {
            href: '/files/someHash/',
            text: 'ROOT'
          },
          {
            text: 'public'
          }
        ],
        files: [
          {
            href: '/files/someHash/public',
            name: 'public',
            path: 'public',
            type: 'tree'
          }
        ]
      }
    ]);
  });

  it('should send correct params for render, when path not exists', async () => {
    const hash = 'someHash';

    const req = {
      params: {
        hash: hash
      }
    };

    gitFileTreeStub = sinon.stub(Git, 'gitFileTree').resolves([
      {
        type: 'blob',
        hash: 'someHash',
        path: ''
      }
    ]);

    res.render = sinon.spy();

    await filesController(req, res, next);

    expect(res.render.getCall(0).args).to.deep.eq([
      'files',
      {
        title: 'files',
        breadcrumbs: [
          { text: 'HISTORY', href: '/' },
          {
            text: 'ROOT',
            href: undefined
          }
        ],
        files: [
          {
            type: 'blob',
            hash: 'someHash',
            href: '/content/someHash/',
            name: '',
            path: ''
          }
        ]
      }
    ]);
  });

  it('should call next function with error', async () => {
    const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
    const path = '.gitignore';

    let next = () => {};

    const req = {
      params: {
        '0': path,
        hash: hash
      }
    };

    const error = new Error('test error');
    gitFileTreeStub = sinon.stub(Git, 'gitFileTree').rejects(error);

    next = sinon.spy();

    await filesController(req, res, next);
    expect(next.calledWith(error)).to.eq(true);
  });
});
