const { expect } = require('chai');
const { URL } = require('./config');

describe('Страница "История коммитов"', function() {
  it('содержит компоненту "Breadcrumbs"', function() {
    return this.browser
      .url(URL)
      .isExisting('.breadcrumbs')
      .then(function(result) {
        expect(result).to.be.true;
      })
      .assertView('plain', '.breadcrumbs');
  });

  it('содержит компоненту "Breadcrumbs", в которой нет ссылок', function() {
    return this.browser
      .url(URL)
      .getHTML('.breadcrumbs')
      .then(function(htmlStr) {
        const regLink = /<a[^<>]*?href="[^"]*?"[^<>]*?>.*?<\/a>/gi;
        const linkList = htmlStr.match(regLink);

        expect(linkList).to.equal(null);
      });
  });
});
