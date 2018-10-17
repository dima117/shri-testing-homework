var assert = require('chai').assert;

describe('github', function() {
    it('should find hermione', function() {
        return this.browser
            .url('https://github.com/gemini-testing/hermione')
            .getText('#readme h1')
            .then(function(title) {
                assert.equal(title, 'Hermione')
            });
    });
});