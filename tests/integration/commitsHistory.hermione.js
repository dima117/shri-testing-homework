const { expect } = require('chai');

describe('Страница с историей коммитов', () => {
  it('корректно отображается', function () {
    return this.browser
      .url('/')
      .assertView('plain', 'html');
  });

  it('по ссылкам в коммитах можно перейти к файловой системе', function () {
    let link;
    return this.browser
      .url('/')
      .getAttribute('.commit:first-child .commit__link > a', 'href')
      .then((href) => { link = href; })
      .click('.commit:first-child .commit__link > a')
      .getUrl()
      .then((url) => {
        expect(url).to.be.equal(link);
      });
  });
});
