const assert = require('chai').assert;

describe('Хлебные крошки', function() {
  it('должны появиться на странице', function() {
    return this.browser.url('http://localhost:3000').assertExists('.breadcrumbs', 'Хлебные крошки не появились');
  });
});
