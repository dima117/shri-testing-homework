const assert = require('chai').assert;

describe('Перехожу по хлебным крошкам со страницы с файлом до главной', function() {
  it('кликаю в ХК на ссылку с фаловой структурой папки коммита', function() {
    return this.browser
      .url('/content/a35931b770328564ddde0ca70ccdab832b22e97a/controllers/contentController.js')
      .element('.breadcrumbs')
      .element('a:last-child')
      .getAttribute('href')
      .then(href => {
        assert.equal(
          `/${href
            .split('/')
            .slice(3)
            .join('/')}`,
          '/files/a35931b770328564ddde0ca70ccdab832b22e97a/controllers/'
        );
      })
      .click('a:last-child');
  });

  it('кликаю в ХК на ссылку с корневой структурой комита', function() {
    return this.browser
      .element('.breadcrumbs')
      .element('a:last-child')
      .getAttribute('href')
      .then(href => {
        assert.equal(
          `/${href
            .split('/')
            .slice(3)
            .join('/')}`,
          '/files/a35931b770328564ddde0ca70ccdab832b22e97a/'
        );
      })
      .click('a:last-child');
  });

  it('кликаю в ХК на главную', function() {
    return this.browser
      .element('.breadcrumbs')
      .element('a:last-child')
      .getAttribute('href')
      .then(href => {
        assert.equal(
          `/${href
            .split('/')
            .slice(3)
            .join('/')}`,
          '/'
        );
      })
      .click('a:last-child');
  });
});
