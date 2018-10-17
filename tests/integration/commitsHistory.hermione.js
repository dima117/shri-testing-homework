var assert = require('chai').assert;

describe('История коммитов', function() {
  it('есть блок с "хлебными крошками"', function() {
    return this.browser
      .url('/')
      .isExisting('.breadcrumbs')
      .then(function(exists) {
          assert.ok(exists, 'Нет "хлебных крошек"')
      });
  });

  it('есть блок с контентом', function() {
    return this.browser
      .url('/')
      .isExisting('.content')
      .then(function(exists) {
          assert.ok(exists, 'Нет блока с контентом')
      });
  });

  it('есть коммиты в блоке с контентом', function() {
    return this.browser
      .url('/')
      .isExisting('.content .commit')
      .then(function(exists) {
          assert.ok(exists, 'Блок контентом пуст')
      });
  });
});