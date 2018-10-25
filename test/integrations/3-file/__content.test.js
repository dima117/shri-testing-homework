const { expect } = require('chai');
const { URL } = require('./config');

describe('Страница "Файл"', function() {

  it('содержит компоненту "Content"', function() {
    return this.browser
      .url(URL)
      .isExisting('.content')
      .then(function(result) {
        expect(result).to.be.true;
      });
  });

});
