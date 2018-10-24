const chai = require('chai');
const { expect } = chai;
const indexController = require('../../controllers/fileController');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);

it('контроллер рендерит файловую структуру коммита из Git', async function() {
  // подготовка





  // действие
  await fileController(req, res, function() {}, stubs);

  // проверка



});