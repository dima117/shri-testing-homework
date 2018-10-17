const assert = require('chai').assert;

describe('Хлебные крошки', function() {
  it('должны появиться на странице', function() {
    return this.browser
      .url('http://localhost:3000')
      .isExisting('.breadcrumbs')
      .then(exists => {
        assert.ok(exists, 'Хлебные крошки не появились');
      });
  });
});
