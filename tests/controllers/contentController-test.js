const chai = require('chai');
const { expect } = chai;
const indexController = require('../../controllers/contentController');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);

it('контроллер рендерит файловую структуру коммита из Git', async function() {
  // подготовка
  const request = {
    hash: '',
    params: []
  };

  const req = mockReq(request);
  const res = mockRes();

  const getFakeFileContent = () => {

  };

  const getFakeFileTRee = () => {

  };

  const getFakeBreadcrumbs = () => {
    return {
      text: 'HISTORY'
    }
  };

  const stubs = {
    'getFakeFileContent': getFakeFileContent,
    'getFakeFileTRee': getFakeFileTRee,
    'getFakeBreadcrumbs': getFakeBreadcrumbs
  }


  // действие
  await contentController(req, res, function() {}, stubs);

  // проверка



});
