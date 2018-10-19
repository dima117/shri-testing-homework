const assert = require("chai").assert;
const expect = require("chai").expect;

describe("Проверка отображения страниц", () => {
  describe("История коммитов отображается правильно", () => {
    describe("Хлебные крошки отображаются правильно", () => {
      it("Хлебные крошки присутствуют", function() {
        return this.browser
          .url("/")
          .isExisting(".breadcrumbs")
          .then(function(exists) {
            assert.ok(exists, "Нет блока хлебных крошек");
          });
      });
      it("Хлебные крошки не содержат ссылок", function() {
        return this.browser
          .url("/")
          .isExisting("a[href='/']")
          .then(function(exists) {
            assert.isNotOk(
              exists,
              "Хлебные крошки содержат ссылки, хотя не должны"
            );
          });
      });
    });
  });
});
