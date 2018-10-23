const { expect } = require('chai');

describe('Переходы по хлебным крошкам', () => {
  it('из файла в папку', function () {
    return this.browser
      .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/controllers/contentController.js')
      .click('.breadcrumbs a:nth-child(3)')
      .assertView('body', 'body')
      .getTitle().then(title => expect(title).to.eql('files'))
  });

  it('из папки в список файлов', function () {
    return this.browser
      .click('.breadcrumbs a:nth-child(2)')
      .assertView('body', 'body')
      .getTitle().then(title => expect(title).to.eql('files'))
  });

  it('из списка файлов в историю коммитов', function () {
    return this.browser
      .click('.breadcrumbs a:nth-child(1)')
      .assertView('body', 'body')
      .getTitle().then(title => expect(title).to.eql('history'))
  });
});