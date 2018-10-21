let git = require("./git");

test("преобразование строки с данными о коммите в объект", () => {
  const input =
    "90180910fc27a11272a3e5caeeb119a51e5c0545\tDmitry Andriyanov\t2018-10-16 12:49:56 +0300\tисправлена опечатка в readme";

  const output = git.parseHistoryItem(input);

  expect(output).toEqual({
    hash: "90180910fc27a11272a3e5caeeb119a51e5c0545",
    author: "Dmitry Andriyanov",
    timestamp: "2018-10-16 12:49:56 +0300",
    msg: "исправлена опечатка в readme"
  });
});

test("Преобразование в объект информации о файле репозиторий", () => {
  const input =
    "100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8\tREADME.md";
    
  const output = git.parseFileTreeItem(input);

  expect(output).toEqual({
    hash: "ead09676a936eb50ed700dad0d280d65c3df21d8",
    path: "README.md",
    type: "blob"
  });
});
