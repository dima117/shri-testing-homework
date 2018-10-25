const { expect } = require('chai');
const { URL } = require('./config');

describe('Страница "Файл"', function() {
  it('содержит компоненту "Breadcrumbs"', function() {
    return this.browser
      .url(URL)
      .isExisting('.breadcrumbs')
      .then(function(result) {
        expect(result).to.be.true;
      })
      .assertView('plain', '.breadcrumbs');
  });

  it('содержит компоненту "Breadcrumbs", в которой есть ссылки', function() {
    return this.browser
      .url(URL)
      .getHTML('.breadcrumbs')
      .then(function(htmlStr) {
        const regLink = /<a[^<>]*?href="[^"]*?"[^<>]*?>.*?<\/a>/gi;
        const linkList = htmlStr.match(regLink);

        expect(linkList).to.have.lengthOf.above(0);
      });
  });

  it('содержит компоненту "Breadcrumbs", в которой ссылки переходят на существующие страниц', function() {
    let gotHref = '';
    return this.browser
      .url(URL)
      .$('.breadcrumbs__item')
      .getAttribute('href')
      .then(function(href) {
        gotHref = href;
      })
      .click('.breadcrumbs__item')
      .getUrl()
      .then(function(url) {
        expect(url).to.be.equal(gotHref);
      });
  });
});
