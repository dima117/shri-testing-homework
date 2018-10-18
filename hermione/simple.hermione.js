const { assert } = require('chai');

describe('Page', () => {
    it('should find ".content"', function() {
        return this.browser
            .url('/')
            .isExisting('.content')
            .then(exists => 
                assert.ok(exists, 'the ".content" not exists')
            );
    });
});

describe('Breadcrumbs', () => {
    it('breadcrumbs should be without links', function() {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then(text => 
                assert.ok(text === 'HISTORY', 'the breadcrumbs, works not correct')    
            );
    });

    // it('');
});

describe('Server responses', () => {
    it('should returns 404 status', function() {
        return this.browser
            .url('/not-existing-url-i-think-so')
            .getValue('.error')
            .then(status =>
                assert.ok(+status === 404, 'the status is not correct')
            );
    });
});