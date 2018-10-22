const {expect} = require('chai');

describe('Хлебные крошки', () => {
  it('Корректно строятся при переходе с главной страницы на коммит, затем в файл/папку', function() {
    let breadcrumbsTexts;

    return this.browser
      .url('/')
      .click('[data-smid=commit-link]')
      .getText('[data-smid=file-link]')
      .then((text) => {
        breadcrumbsTexts = text;
      })
      .click('[data-smid=file-link]')
      .getText('[data-smid=breadcrumbs-title]')
      .then((text) => {
        expect(text).to.equal(`HISTORY / ROOT / ${breadcrumbsTexts[0]}`);
      })
  });

  it('Переходы по хлебным крошкам', function() {
    return this.browser
      .url('/')
      .click('[data-smid=commit-link]')
      .click('[data-smid=file-link]')
      .click('[data-smid=breadcrumbs-link]:last-of-type')
      .getText('[data-smid=breadcrumbs-title]')
      .then((text) => {
        expect(text).to.equal('HISTORY / ROOT');
      })
  });

  it('Скриншот хлебных крошек HISTORY / ROOT', function() {
    return this.browser
      .url('/')
      .click('[data-smid=commit-link]')
      .click('[data-smid=file-link]')
      .assertView('breadcrumbs-history-root', '[data-smid=breadcrumbs-title]')
  });
});
