const { expect } = require('chai');
const { URL } = require('./config');

describe('Страница "Просмотр файловой системы"', function() {

  it('содержит компоненту "Content"', function() {
    return this.browser
      .url(URL)
      .isExisting('.content')
      .then(function(result) {
        expect(result).to.be.true;
      });
  });

  it('содержит компоненту "Content", в которой существует описание директорий', function() {
    return this.browser
      .url(URL)
      .isExisting('.files')
      .then(function(result) {
        expect(result).to.be.true;
      })
      .assertView('plain', '.files');
  });

  it('содержит компоненту "Content", в которой находятся блоки с описанием директорий', function() {
    return this.browser
      .url(URL)
      .getHTML('.files')
      .then(function(htmlStr) {
        const regLi = /<li[^<>]*?>[\s\S]*?<\/li>/gi;
        const linkList = htmlStr.match(regLi);

        expect(linkList).to.have.lengthOf.above(0);
      });
  });

  it('содержит компоненту "Content", в которой находятся блоки с ссылками на директории/файлы', function() {
    return this.browser
      .url(URL)
      .getHTML('.files')
      .then(function(htmlStr) {
        const regLi = /<li[^<>]*?>[\s\S]*?<\/li>/gi;
        const regLink = /<a[^<>]*?href="[^"]*?"[^<>]*?>[\s\S]*?<\/a>/gi;
        const linkList = htmlStr.match(regLi);

        expect(linkList.every(item => item.match(regLink))).to.be.true;
      });
  });

});
