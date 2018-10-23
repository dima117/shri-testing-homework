const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);


const filesControllerFactory = require('../../controllers/filesController');

describe('filesController', function () {
  let filesController;
  let res;
  let req;

  beforeEach(async function() {
    // setup
    filesController = filesControllerFactory(sinon.fake.resolves([
      {
        type: 'blob',
        hash: 'c9d18582f6c7fb78fb2c611bcd6c0d5f87304072',
        path: 'controllers/contentController.js'
      },
      {
        type: 'blob',
        hash: '02fe732137bea2adfb6f650bce92aa0be2f5cd9d',
        path: 'controllers/filesController.js'
      },
      {
        type: 'blob',
        hash: '7d23f38a44bf6a3ed7e32e07fa49dbdd78635ab8',
        path: 'controllers/indexController.js'
      }
    ]));

    req = {
      params: {
        0: 'controllers',
        hash: '999bfb1ec309158f4c86edee76fa5630a3aba565'
      }
    };

    res = {
      render: sinon.fake()
    };

    // execute
    await filesController(req, res);
  });

  it('renders the view once', function() {
    //assert
    expect(res.render).to.have.been.calledOnce;
  });

  it('passes correct data to the files view', function () {
    const expected = {
      title: 'files',
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
          text: 'controllers'
        }
      ],
      files: [
        {
          type: 'blob',
          hash: 'c9d18582f6c7fb78fb2c611bcd6c0d5f87304072',
          path: 'controllers/contentController.js',
          href: '/content/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers/contentController.js',
          name: 'contentController.js'
        },
        {
          type: 'blob',
          hash: '02fe732137bea2adfb6f650bce92aa0be2f5cd9d',
          path: 'controllers/filesController.js',
          href: '/content/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers/filesController.js',
          name: 'filesController.js'
        },
        {
          type: 'blob',
          hash: '7d23f38a44bf6a3ed7e32e07fa49dbdd78635ab8',
          path: 'controllers/indexController.js',
          href: '/content/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers/indexController.js',
          name: 'indexController.js'
        }        
      ]
    };

    expect(res.render).to.have.been.calledWith('files', expected);
  });
});
