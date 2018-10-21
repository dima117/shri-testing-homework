const { expect } = require('chai');
const sinon = require('sinon');

const contentController = require('../../controllers/contentController');
const { Git } = require('../../utils/git');

describe('contentController', () => {
  const res = {
    render: () => {}
  };

  const next = () => {};

  let gitFileTreeStub;
  let gitFileContentStub;

  afterEach(() => {
    if (gitFileTreeStub) gitFileTreeStub.restore();
    if (gitFileContentStub) gitFileContentStub.restore();
  });

  it('should send correct params for render, when type="blob', async () => {
    const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
    const path = '.gitignore';
    const content = 'node_modules';

    const req = {
      params: {
        '0': path,
        hash: hash
      }
    };

    gitFileTreeStub = sinon.stub(Git, 'gitFileTree').resolves([
      {
        type: 'blob',
        hash: hash
      }
    ]);

    res.render = sinon.spy();

    gitFileContentStub = sinon.stub(Git, 'gitFileContent').resolves(content);

    await contentController(req, res, next);

    expect(res.render.getCall(0).args).to.deep.eq([
      'content',
      {
        title: 'content',
        breadcrumbs: [
          { text: 'HISTORY', href: '/' },
          {
            text: 'ROOT',
            href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/'
          },
          { text: '.gitignore' }
        ],
        content: 'node_modules'
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

    await contentController(req, res, next);
    expect(next.calledWith(error)).to.eq(true);
  });
});
