let assert = require('chai').assert;

describe('File', () => {

    describe('Content', () => {
        it('file content is exist', function () {
            return this.browser
                .url('/files/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/')
                .isExisting('.content ul')
                .then((exists) => {
                    assert.ok(exists, 'Content has not appeared');
                });
        });
    });
});
