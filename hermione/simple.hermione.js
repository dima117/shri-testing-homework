const { assert } = require('chai');

describe('github', function() {
    it('should find ".content"', function() {
        return this.browser
            .url('/')
            .isExisting('.content')
            .then(exist => assert.ok(exist, 'the ".content" not exists!'));
    });
});