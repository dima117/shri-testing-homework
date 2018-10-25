const {expect} = require('chai');

describe('Содержимое коммита', () => {
  it('Выводится автор', function() {
    return this.browser
      .url('/')
      .getText('[data-smid=commit-author]')
      .then((text) => {
        expect(text).to.not.be.empty;
      })
  });

  it('Выводится дата', function() {
    return this.browser
      .url('/')
      .getText('[data-smid=commit-date]')
      .then((text) => {
        expect(text).to.not.be.empty;
      })
  });

  it('Выводится сообщение', function() {
    return this.browser
      .url('/')
      .getText('[data-smid=commit-message]')
      .then((text) => {
        expect(text).to.not.be.empty;
      })
  });

  it('Выводится hash', function() {
    return this.browser
      .url('/')
      .getText('[data-smid=commit-link]')
      .then((text) => {
        expect(text).to.not.be.empty;
      })
  });
});
