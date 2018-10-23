const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);


const contentControllerFactory = require('../../controllers/contentController');

describe('contentController', function () {
  let contentController;
  let res;
  let req;

  beforeEach(async function() {
    // setup
    const gitFileTree = sinon.fake.resolves([
      {
        type: 'blob',
        hash: 'c9d18582f6c7fb78fb2c611bcd6c0d5f87304072',
        path: 'controllers/contentController.js'
      }
    ]);

    const gitFileContent = sinon.fake.resolves('stub file contents');

    contentController = contentControllerFactory({ gitFileTree, gitFileContent });

    req = {
      params: {
        0: 'controllers/contentController.js',
        hash: '999bfb1ec309158f4c86edee76fa5630a3aba565'
      }
    };

    res = {
      render: sinon.fake()
    };

    // execute
    await contentController(req, res);
  });

  it('renders the view once', function() {
    //assert
    expect(res.render).to.have.been.calledOnce;
  });

  it('passes correct data to the content view', function () {

    const expected = {
      title: 'content',
      breadcrumbs: [
        {
          text: 'HISTORY',
          href: '/'
        },
        {
          text: 'ROOT',
          href: '/files/999bfb1ec309158f4c86edee76fa5630a3aba565/'
        },
        {
          text: 'controllers',
          href: '/files/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers/'
        },
        {
          text: 'contentController.js'
        }
      ],
      content: 'stub file contents'
    };

    expect(res.render).to.have.been.calledWith('content', expected);
  });
});
