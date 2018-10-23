const doAdd = require("./obertka");

jest.mock("./math.js");

test("doAdd вернет 5", () => {
  const result = doAdd(1, 1);

  expect(result).toBe(5);
});
