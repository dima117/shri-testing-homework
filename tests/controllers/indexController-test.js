const chai = require('chai');
const { expect } = chai;
const IndexController = require('../../controllers/indexController');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);

it('контроллер рендерит список коммитов из Git', async function () {

  // подготовка

  const fakeHistory = [{
    hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
    author: 'Dmitry Andriyanov',
    timestamp: '2018-10-16 12:49:56 +0300',
    msg: 'исправлена опечатка в readme'
  }];
  const getFakeHistory = () => {
    return Promise.resolve(fakeHistory);
  };

  const getFakeFolderUrl = () => {
    return '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
  };

  const getFakeBreadcrumbs = () => {
    return {
      text: 'HISTORY'
    }
  };

  const stubs = {
    'getFakeHistory': getFakeHistory,
    'getFakeFolderUrl': getFakeFolderUrl,
    'getFakeBreadcrumbs': getFakeBreadcrumbs
  };

  const indexControllerEx = new IndexController(stubs);

  const req = mockReq({});
  const res = mockRes();

  //действие
  await indexControllerEx.run(req, res);

  //проверка
  console.log(res.render.getCall(0).args);
  expect(res.render).to.be.calledWith('index', {
    title: 'history',
    breadcrumbs: {
      text: 'HISTORY'
    },
    list: [
      {
      hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
      author: 'Dmitry Andriyanov',
      timestamp: '2018-10-16 12:49:56 +0300',
      msg: 'исправлена опечатка в readme',
      href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/'
      }
    ]
  });

});