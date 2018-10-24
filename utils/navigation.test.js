const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require("./navigation");

describe("Создание путей", () => {
  const parentHash = "3721b70cd9ab74794c5e0e3cd2acf11f43521c99";
  const path = "controllers";

  test("объединяет строки и возвращает путь", () => {
    const output = buildFolderUrl(parentHash, path);

    expect(output).toBe(
      "/files/3721b70cd9ab74794c5e0e3cd2acf11f43521c99/controllers"
    );
  });

  test("объединяет строки и возвращает путь", () => {
    const output = buildFileUrl(parentHash, path);

    expect(output).toBe(
      "/content/3721b70cd9ab74794c5e0e3cd2acf11f43521c99/controllers"
    );
  });
});

describe("Создание хлебных крошек", () => {
  test("присутствует элемент, указывающий на главную страницу", () => {
    const breadcrumbs = buildBreadcrumbs();
    expect(breadcrumbs).toHaveLength(1);
  });

  test("на странице второго уровня в хлебных крошках присутствует второй элемент", () => {
    const breadcrumbs = buildBreadcrumbs("hash");
    expect(breadcrumbs).toHaveLength(2);
  });

  test("на страницах выше второго уровня в хлебные крошки добавляются элементы в соответствии с уровнем страницы", () => {
    const breadcrumbs = buildBreadcrumbs("hash", "path/path");
    expect(breadcrumbs).toHaveLength(4);
  });

  test("последний элемент хлебных крошек никуда не ссылается", () => {
    const breadcrumbs = buildBreadcrumbs("hash", "path/path");
    expect(breadcrumbs[breadcrumbs.length - 1]).not.toHaveProperty("href");
  });
});
