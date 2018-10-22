const assert = require('chai').assert;
const url = '/';

describe('Открываю главную страницу со списком комитов', function() {
  it('выводится список коммитов', function() {
    return this.browser
      .url(url)
      .isExisting('.content')
      .then(exist => {
        assert.ok(exist, 'список коммитов не выводится');
      });
  });

  it('список состоит из 20 коммитов', function() {
    return this.browser
      .url(url)
      .element('.content')
      .elements('.commit')
      .then(commits => {
        assert.equal(commits.value.length, 20);
      });
  });
});
