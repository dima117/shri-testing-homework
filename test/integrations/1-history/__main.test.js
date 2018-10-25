const { expect } = require('chai');
const { URL } = require('./config');

describe('Страница "История коммитов"', function() {

  it('имеет title "files"', function() {
    return this.browser
      .url(URL)
      .getTitle()
      .then(function(title) {
        expect(title).to.equal('history');
      });
  });

});
