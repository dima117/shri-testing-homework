const assert = require('assert');

describe('История коммитов', () => {
    describe('Заголовок', () => {
        it('должен появиться на странице', function() {
            return this.browser
                .url('/')
                .isExisting('.breadcrumbs')
                .then((exists) => {
                    assert.ok(exists, 'Заголовок не появился');
                });
        });
    });

});