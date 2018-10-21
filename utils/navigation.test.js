const navigation = require("./navigation");

describe("Генерация урла папки", () => {
  const parentHash = "90180910fc27a11272a3e5caeeb119a51e5c0545";
  let path = "controllers";

  test("Есть все входные данные", () => {
    const output = navigation.buildFolderUrl(parentHash, path);

    expect(output).toEqual(
      "/files/90180910fc27a11272a3e5caeeb119a51e5c0545/controllers"
    );
  });

  test("Без переменной path", () => {
    const output = navigation.buildFolderUrl(parentHash);

    expect(output).toEqual("/files/90180910fc27a11272a3e5caeeb119a51e5c0545/");
  });
});

test("Генерация урла для файла", () => {
  const parentHash = "90180910fc27a11272a3e5caeeb119a51e5c0545";
  const path = "controllers";

  const output = navigation.buildFileUrl(parentHash, path);

  expect(output).toEqual(
    "/content/90180910fc27a11272a3e5caeeb119a51e5c0545/controllers"
  );
});

describe("генерация хлебных крошек", () => {
  const hash = "90180910fc27a11272a3e5caeeb119a51e5c0545";
  const path = "repo/README.md";

  const output = navigation.buildBreadcrumbs(hash, path);
  test("Проверка генерации breadcrumbs на всех стр. кроме главной", () => {
    expect(output).toEqual([{
        text: "HISTORY",
        href: "/"
      },
      {
        text: "ROOT",
        href: "/files/90180910fc27a11272a3e5caeeb119a51e5c0545/"
      },
      {
        text: "repo",
        href: "/files/90180910fc27a11272a3e5caeeb119a51e5c0545/repo/"
      },
      {
        text: "README.md"
      }
    ]);
  });

  test("Проверка генерации breadcrumbs на главной стро", () => {
    const outputTwo = navigation.buildBreadcrumbs("", path);

    expect(outputTwo).toEqual([{
      text: "HISTORY",
      href: undefined
    }]);
  });
});