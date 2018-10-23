const { buildFolderUrl } = require("./navigation");

test("объединяет строки и возвращает путь", () => {
  const parentHash = "3721b70cd9ab74794c5e0e3cd2acf11f43521c99";
  const path = "";

  const output = buildFolderUrl(parentHash, path);

  expect(output).toBe("/files/3721b70cd9ab74794c5e0e3cd2acf11f43521c99/");
});
