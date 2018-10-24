const { expect } = require('chai');

describe('Содержимое страниц', () => {
  it('история коммитов', function () {
    return this.browser
      .url('/')
      .assertView('body', 'body')
      .getTitle().then(title => expect(title).to.eql('history'))
  });

  it('список файлов коммита', function () {
    return this.browser
      .click('.commit__link a')
      .assertView('body', 'body')
      .getTitle().then(title => expect(title).to.eql('files'))
  });

  it('список файлов в папке', function () {
    return this.browser
      .click('li:nth-child(5) a')
      .assertView('body', 'body')
      .getTitle().then(title => expect(title).to.eql('files'))
  });

  it('содержимое файла', function () {
    return this.browser
      .click('li:nth-child(1) a')
      .assertView('body', 'body')
      .getTitle().then(title => expect(title).to.eql('content'))
  });
});