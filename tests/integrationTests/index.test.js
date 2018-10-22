let assert = require('chai').assert;

describe('Index', () => {

    describe('Content', () => {
        it('content exists', function () {
            return this.browser
                .url('/')
                .isExisting('.content')
                .then((exists) => {
                    assert.ok(exists, 'Content has not appeared');
                });
        });

        it('history of commits exists', function () {
            return this.browser
                .url('/')
                .isExisting('.content .commit')
                .then((exists) => {
                    assert.ok(exists, 'Content has not appeared');
                });
        });

    });

    describe('Breadcrumbs', () => {
        it('breadcrumbs text', function () {
            return this.browser
                .url('/')
                .getText('.breadcrumbs')
                .then( (text) => {
                    assert.ok(text === 'HISTORY');
                });
        });
    });

});
