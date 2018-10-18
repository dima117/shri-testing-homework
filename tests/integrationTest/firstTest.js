var assert = require('chai').assert;

describe('github', function() {
    it('should find hermione', function() {
        return this.browser
            .url('http://localhost:3000')
            .getText('HISTORY')
            .then(function(title) {
                assert.equal(title, 'HISTORY')
            });
    });
});