const {expect} = require('chai');

describe('Содержимое страниц', () => {
  it('Открывается главная с коммитами', function() {
    return this.browser
      .url('/')
      .pause(100)
      .assertView('main-page', '.content')
  });

  it('При переходе с главной страницы на коммит отображается содержимое коммита', function() {
    return this.browser
      .url('/')
      .click('[data-smid=commit-link]')
      .pause(100)
      .click('[data-smid=file-link]')
      .pause(100)
      .isExisting('[data-smid=commit-content]')
      .then((exists) => {
        expect(exists).to.be.true;
      })
  });
});
