const assert = require('chai').assert;

describe('github', function() {
    it('should find hermione', function() {
        return this.browser
            .url('/')
            .isExisting('.content')
            .then(exist => assert.ok(exist, 'Ahtung'));
    });
});