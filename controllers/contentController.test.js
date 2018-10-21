let contentController = require("./contentController").contentController;

describe("Проверка вывода контента", () => {
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
    gitFileContent: jest.fn(),
    gitFileTree: jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve([{
          type: "blob",
          hash: "b512c09d476623ff4bf8d0d63c29b784925dbdf8",
          path: ".gitignore"
        }]);
      });
    }),
    gitFileContent: jest.fn()
  };

  contentController(req, res, next, mocks);

  test("Срабатывает gitFileContent", () => {
    expect(mocks.gitFileContent).toBeCalled();
    expect(mocks.gitFileContent).toBeCalledWith(
      "b512c09d476623ff4bf8d0d63c29b784925dbdf8"
    );
  });

  test("Срабатывает gitFileTree", () => {
    expect(mocks.gitFileTree).toBeCalled();
  });

  //   test("Срабатывает res.render", () => {
  //     expect(res.render).toBeCalled();
  //   });
});