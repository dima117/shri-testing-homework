const assert = require('chai').assert;

describe('Открываю главную страницу', function() {
  it('кликаю в списке коммитов на ссылку с корневой структурой комита', function() {
    return this.browser
      .url('/')
      .element('.content')
      .element('.commit')
      .element('.commit__link')
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

  it('кликаю в корне на ссылку с фаловой структурой папки коммита', function() {
    return this.browser
      .element('.content')
      .element('ul')
      .element('li:last-child a')
      .getAttribute('href')
      .then(href => {
        assert.equal(
          `/${href
            .split('/')
            .slice(3)
            .join('/')}`,
          '/files/a35931b770328564ddde0ca70ccdab832b22e97a/views'
        );
      })
      .click('li:last-child a');
  });

  it('кликаю в папке на ссылку с файлом коммита', function() {
    return this.browser
      .element('.content')
      .element('ul')
      .element('li:last-child a')
      .getAttribute('href')
      .then(href => {
        assert.equal(
          `/${href
            .split('/')
            .slice(3)
            .join('/')}`,
          '/content/a35931b770328564ddde0ca70ccdab832b22e97a/views/layout.hbs'
        );
      })
      .click('li:last-child a');
  });
});
