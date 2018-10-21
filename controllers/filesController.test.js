const filesController = require("../../controllers/filesController").filesController;

describe('Вывод списка файлов', () => {
  const req = {
    params: {
      0: "package.json",
      hash: "e95b197aef0941e12e970da042afd4c2b1488225"
    }
  };

  const res = {
    render: jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve('Какие-то данные');
      });
    })
  };

  const next = jest.fn();

  const mocks = {

  };

  const result = filesController(req, res, next)


})