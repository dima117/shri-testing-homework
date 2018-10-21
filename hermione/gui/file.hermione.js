const assert = require("chai").assert;
const expect = require("chai").expect;

describe("Проверка отображения страниц", () => {
  describe("История коммитов отображается правильно", () => {
    it("Хлебные крошки не содержат ссылок", async function() {
			const browser = this.browser;

      await browser.url("/");
      const exists = await browser.isExisting(".breadcrumbs");
			assert.ok(exists, "Нет хлебных крошек");

      await browser.assertView("plain", ".breadcrumbs");
    });
    it("Блок с коммитами присутствует", async function() {
			const browser = this.browser;

      await browser.url("/");
      const exists = await browser.isExisting(".content");
			assert.ok(exists, "Нет блока для контента");

      await browser.assertView("plain", ".content");
    });
    it("Коммит содержит три строки: инфо, описание и ссылка", async function() {
			const browser = this.browser;

      await browser.url("/");
      const exists = await browser.isExisting(".commit");
			assert.ok(exists, "Нет ни одного коммита");

      await browser.assertView("plain", ".commit");
    });
    it("Ссылка на список файлов синяя и подчеркнутая", async function() {
			const browser = this.browser;

      await browser.url("/");
      const exists = await browser.isExisting(".commit");
			assert.ok(exists, "Нет ссылки на содержимое коммита");

      await browser.assertView("plain", ".commit__link a");
    });
  });
  describe("Файловая система отображается правильно", () => {
    // ссылка на первый коммит в списке коммитов
    const link = ".content .commit:nth-child(1) .commit__link a";
    it("Хлебные крошки отображаются", async function() {
			const browser = this.browser;

      await browser.url("/");
      const existsLink = await browser.isExisting(link);
      assert.ok(existsLink, "Нет ссылки на содержимое коммита");
      await browser.click(link);
      const existsBredcrumbs = await browser.isExisting(".breadcrumbs");
			assert.ok(existsBredcrumbs, "Нет хлебных крошек");

      await browser.assertView("plain", ".breadcrumbs");
    });
    it("Блок с содержимым присутствует", async function() {
			const browser = this.browser;

      await browser.url("/");
      await browser.click(link);
      const exists = await browser.isExisting(".content");
			assert.ok(exists, "Нет блока для контента");

      await browser.assertView("plain", ".content");
    });
    it("Содержимое директории организованно в список", async function() {
			const browser = this.browser;

      await browser.url("/");
      await browser.click(link);
      const exists = await browser.isExisting(".content ul");
			assert.ok(exists, "Нет списка файлов");

      await browser.assertView("plain", ".content ul");
    });
  });
  describe("Содержимое файла отображается правильно", () => {
    // ссылка на первый коммит в списке коммитов
    const linkCommit = ".content .commit:nth-child(1) .commit__link a";
    // первая ссылка на файл
    const linkFile = "a[href^='/content/']";
    it("Хлебные крошки отображаются", async function() {
			const browser = this.browser;

      await browser.url("/");
      const existsCommit = await browser.isExisting(linkCommit);
      assert.ok(existsCommit, "Нет ссылки на содержимое коммита");
      await browser.click(linkCommit);
      const existsFile = await browser.isExisting(linkFile);
      assert.ok(existsFile, "Нет ссылки на содержимое файла");
      await browser.click(linkFile);
      const existsBredcrumbs = await browser.isExisting(".breadcrumbs");
			assert.ok(existsBredcrumbs, "Нет хлебных крошек");

      await browser.assertView("plain", ".breadcrumbs");
    });
    it("Блок с содержимым присутствует", async function() {
			const browser = this.browser;

      await browser.url("/");
      await browser.click(linkCommit);
      await browser.click(linkFile);
      const exists = await browser.isExisting(".content");
			assert.ok(exists, "Нет блока для контента");

      await browser.assertView("plain", ".content");
    });
    it("Содержимое файла отображается", async function() {
			const browser = this.browser;

      await browser.url("/");
      await browser.click(linkCommit);
      await browser.click(linkFile);
      const exists = await browser.isExisting(".file-content");
			assert.ok(exists, "Нет содержмого файла");

      await browser.assertView("plain", ".file-content");
    });
  });
});
