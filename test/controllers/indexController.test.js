const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

const historyData = require('./history.data');
const indexControllerFactory = require('../../controllers/indexController');


afterEach(() => {
  // Restore the default sandbox here
  sinon.restore();
});

describe('indexController', function () {
  let indexController;
  let res;

  beforeEach(async function() {
    // setup
    indexController = indexControllerFactory(sinon.fake.resolves(historyData));
    res = {
      render: sinon.fake()
    };

    // execute
    await indexController({}, res);
  });

  it('renders the view once', function() {
    //assert
    expect(res.render).to.have.been.calledOnce;
  });

  it('passes correct data to the index view', function () {
    const expected = {
      title: 'history',
      breadcrumbs: [
        {
          text: 'HISTORY',
          href: undefined
        }
      ],
      list: historyData.map(item => ({
        ...item,
        href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/'
      }))
    };

    expect(res.render).to.have.been.calledWith('index', expected);
  });
});
