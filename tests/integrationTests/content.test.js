let assert = require('chai').assert;

describe('Contetn', () => {

    it('content of file is exists', function () {
        return this.browser
            .url('content/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/.babelrc')
            .isExisting('.file-content')
            .then((exists) => {
                assert.ok(exists, 'Content has not appeared');
            });
    });

});
