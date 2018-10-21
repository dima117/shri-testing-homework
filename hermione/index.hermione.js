const assert = require('chai').assert;

describe('История коммитов', function() {
  it('правильно отображается их содержимое - есть хотя бы один коммит', function() {
    return this.browser.url('/').assertExists('.commit', 'Нет ни одного коммита');
  });

  it('хлебные крошки должны появиться на странице', function() {
    return this.browser.url('/').assertExists('.breadcrumbs', 'Хлебные крошки не появились');
  });
  it('хлебная крошка состоит из HISTORY ', function() {
    const text = this.browser.getText('.breadcrumbs', false);
    return text.then(elem => assert.equal(elem, 'HISTORY'), 'в хлебных крошках нет history');
  });
});
