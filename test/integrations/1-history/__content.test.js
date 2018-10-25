const { expect } = require('chai');
const { URL } = require('./config');

describe('Страница "История коммитов"', function() {

  it('содержит компоненту "Content"', function() {
    return this.browser
      .url(URL)
      .isExisting('.content')
      .then(function(result) {
        expect(result).to.be.true;
      })
  });

  it('содержит компоненту "Content", в которой находятся блоки с описанием коммитов', function() {
    return this.browser
      .url(URL)
      .getHTML('.content')
      .then(function(htmlStr) {
        const regCommitBlock = /<div[^<>]*?class="[^"]*?commit["]*?"[^<>]*?>[\s\S]*?<\/div>/gi;
        const commitBlockList = htmlStr.match(regCommitBlock);

        expect(commitBlockList).to.have.lengthOf.above(0);
      });
  });

  it('содержит компоненту "Content", в которой каждый блок с описанием коммитов содержит "info" о коммите', function() {
    let commitBlockLength;
    return this.browser
      .url(URL)
      .getHTML('.commit')
      .then(function(htmlStr) {
        commitBlockLength = htmlStr.length;
      })
      .getHTML('.commit__info')
      .then(function(htmlStr) {
        expect(htmlStr.length).to.have.lengthOf.equal(commitBlockLength);
      })
      .assertView('plain', '.commit');
  });

  it('содержит компоненту "Content", в которой каждый блок с описанием коммитов содержит "msg" о коммите', function() {
    let commitBlockLength;
    return this.browser
      .url(URL)
      .getHTML('.commit')
      .then(function(htmlStr) {
        commitBlockLength = htmlStr.length;
      })
      .getHTML('.commit__msg')
      .then(function(htmlStr) {
        expect(htmlStr.length).to.have.lengthOf.equal(commitBlockLength);
      })
  });

  it('содержит компоненту "Content", в которой каждый блок с описанием коммитов содержит контейнер "link"', function() {
    let commitBlockLength;
    return this.browser
      .url(URL)
      .getHTML('.commit')
      .then(function(htmlStr) {
        commitBlockLength = htmlStr.length;
      })
      .getHTML('.commit__link-container')
      .then(function(htmlStr) {
        expect(htmlStr.length).to.have.lengthOf.equal(commitBlockLength);
      })
  });

  it('содержит компоненту "Content", в которой каждый блок с описанием коммитов содержит контейнер "link" со ссылкой на коммит', function() {
    return this.browser
      .url(URL)
      .getHTML('.commit__link-container')
      .then(function(htmlStr) {
        const regLink = /<a[^<>]*?href="\/files\/[^"]*?"[^<>]*?>.*?<\/a>/gi;

        expect(htmlStr.every(block => block.match(regLink))).to.be.true;
      });
  });

  it('содержит компоненту "Content", в которой каждый блок с описанием коммитов содержит автора коммита', function() {
    return this.browser
      .url(URL)
      .getHTML('.commit__info')
      .then(function(htmlStr) {
        const regCommitAuthor = /<span[^<>]*?class="[^"]*?commit__author["]*?"[^<>]*?>[\s\S]*?<\/span>/gi;

        expect(htmlStr.every(block => block.match(regCommitAuthor))).to.be.true;
      })
  });

  it('содержит компоненту "Content", в которой ссылки на коммит переходят на существующие страниц', function() {
    let gotHref = '';
    return this.browser
      .url(URL)
      .$('.commit__link')
      .getAttribute('href')
      .then(function(href) {
        gotHref = href;
      })
      .click('.commit__link')
      .getUrl()
      .then(function(url) {
        expect(url).to.be.equal(gotHref);
      });
  });

});
