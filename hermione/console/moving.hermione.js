const assert = require("chai").assert;
const expect = require("chai").expect;

describe("Переходы по страницам", () => {
  it("Из списка коммитов на список файлов", async function() {
    // ссылка на первый коммит в списке коммитов
    const link = ".content .commit:nth-child(1) .commit__link a";

    const browser = this.browser;
    await browser.url("/");
    await browser.click(link);
    const title = await browser.getTitle();

    assert.equal(title, "files", "Не попали в список файлов коммита");
  });

  it("Из списка файлов во вложенную папку", async function() {
    // ссылка на первый коммит в списке коммитов
    const linkCommit = ".content .commit:nth-child(1) .commit__link a";
    // первая ссылка на папку
    const linkFolder = "a[href^='/files/']";

    const browser = this.browser;
    await browser.url("/");
    await browser.click(linkCommit);
    await browser.click(linkFolder);
    const text = await browser.getText(".breadcrumbs");

    expect(text.split("/")).to.have.lengthOf(
      3,
      "Не попали из списка файлов во вложенную папку"
    );
  });

  it("Из списка файлов на страницу отдельного файла", async function() {
    // ссылка на первый коммит в списке коммитов
    const linkCommit = ".content .commit:nth-child(1) .commit__link a";
    // первая ссылка на файл
    const linkFile = "a[href^='/content/']";

    const browser = this.browser;
    await browser.url("/");
    await browser.click(linkCommit);
    await browser.click(linkFile);
    const exists = await browser.isExisting(".file-content");

    assert.ok(exists, "Не смогли перейти в файл");
  });

  it("Переходы по хлебным крошкам (HISTORY <- ROOT <- bin <-[www]) ", async function() {
    // сразу заходим вглубь первого коммита "HISTORY / ROOT / bin / www"
    const path = "/content/cc2284293758e32c50fa952da2f487c8c5e8d023/bin/www";

    const browser = this.browser;
    await browser.url(path);
    await browser.click(".breadcrumbs a:nth-child(3)");
    await browser.click(".breadcrumbs a:nth-child(2)");
    await browser.click(".breadcrumbs a:nth-child(1)");
    const title = await browser.getTitle();

    assert.equal(title, "history", "Не вернулись на главную страницу");
  });
});
