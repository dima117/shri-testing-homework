const { expect } = require('chai');

describe('Страница с файловой системой', () => {
  it('корректно отображается', function () {
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .assertView('plain', 'html');
  });


  it('из блока с "хлебными крошками" можно перейти на главную страницу', function () {
    let mainPageLink;
    return this.browser
      .url('/')
      .getUrl()
      .then((href) => {
        mainPageLink = href;
      })
      .click('.commit:first-child .commit__link > a')
      .getAttribute('.breadcrumbs > a', 'href')
      .then((href) => {
        // проверяем что в ссылка содержит путь до главной страницы
        expect(href).to.be.equal(mainPageLink);
      })
      .click('.breadcrumbs > a')
      .getUrl()
      .then((href) => {
        // проверяем что успешно перешли на главную страницу
        expect(href).to.be.equal(mainPageLink);
      });
  });


  it('по ссылкам в списке файловой системы можно перейти к контенту коммита', function () {
    let linkOnContent;
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .getAttribute('.content > ul > li:first-child > a', 'href')
      .then((href) => {
        expect(href).not.empty;
        linkOnContent = href;
      })
      .click('.content > ul > li:first-child > a')
      .getUrl()
      .then((url) => {
        expect(url).to.be.equal(linkOnContent);
      });
  });


  it('по ссылкам в списке файловой системы можно перейти в папку', function () {
    let linkOnContent;
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .getAttribute('.content > ul > li:nth-child(3) > a', 'href')
      .then((href) => {
        expect(href).not.empty;
        linkOnContent = href;
      })
      .click('.content > ul > li:nth-child(3) > a')
      .getUrl()
      .then((url) => {
        expect(url).to.be.equal(linkOnContent);
      })
      .assertView('plain', 'html');
  });


  it('из папки можно вернуться в корневой каталог по "хлебным крошкам"', function () {
    let linkRoot;
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .getUrl()
      .then((url) => {
        linkRoot = url;
      })
      .click('.content > ul > li:nth-child(3) > a')
      .getAttribute('.breadcrumbs a:nth-child(2)', 'href')
      .then((href) => {
        expect(href).to.be.equal(linkRoot);
      })
      .click('.breadcrumbs a:nth-child(2)')
      .getUrl()
      .then((url) => {
        expect(url).to.be.equal(linkRoot);
      });
  });


  it('из папки можно вернуться на главную по "хлебным крошкам"', function () {
    let linkMainPage;
    return this.browser
      .url('/')
      .getUrl()
      .then((url) => {
        linkMainPage = url;
      })
      .click('.commit:first-child .commit__link > a')
      .click('.content > ul > li:nth-child(3) > a')
      .getAttribute('.breadcrumbs a:nth-child(1)', 'href')
      .then((href) => {
        expect(href).to.be.equal(linkMainPage);
      })
      .click('.breadcrumbs a:nth-child(1)')
      .getUrl()
      .then((url) => {
        expect(url).to.be.equal(linkMainPage);
      });
  });
});
