const assert = require("assert");

describe("Навигация по страницам", () => {
  it("переход из списка коммитов к списку файлов", function() {
    return this.browser
      .url("/")
      .assertNavigation(".commit__link a", ".content--files");
  });

  it("преходит из списка файлов во вложенную папку", function() {
    return this.browser
      .url("/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/")
      .assertNavigation(".files__link--tree", ".content--files");
  });

  it("переход из списка файлов в отдельный файл", function() {
    return this.browser
      .url("/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/")
      .assertNavigation(".files__link--blob", ".content--file");
  });

  it("переход по хлебным крошкам", function() {
    return this.browser
      .url("/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/")
      .assertNavigation(".breadcrumbs a:nth-child(1)", ".content--history");
  });
});
