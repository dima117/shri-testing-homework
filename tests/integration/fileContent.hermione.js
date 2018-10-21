const { expect } = require('chai');

describe('Страница с контентом файла:', () => {
  it('корректно отображается', function () {
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .click('.content > ul > li:first-child > a')
      .assertView('plain', 'html');
  });


  it('можно вернуться в корневой каталог по "хлебным крошкам"', function () {
    let linkRoot;
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .getUrl()
      .then((url) => {
        linkRoot = url;
      })
      .click('.content > ul > li:nth-child(1) > a')
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


  it('можно вернуться на главную по "хлебным крошкам"', function () {
    let linkMainPage;
    return this.browser
      .url('/')
      .getUrl()
      .then((url) => {
        linkMainPage = url;
      })
      .click('.commit:first-child .commit__link > a')
      .click('.content > ul > li:nth-child(1) > a')
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
