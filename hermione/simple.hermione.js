var assert = require('assert');

describe('localhost', function() {
    it('should find hermione', function() {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then(function(bc) {
                assert.equal(bc, 'HISTORY')
            });
    });
});