const { assert } = require('chai');

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
                assert.ok(status === '404', 'the status is not correct')
            );
    });

    it('should returns 400 status', function() {
        return this.browser
            .url('/content/8e9667c303b2781e0b1fafe762e2357c0a0c6053/not-existing-url-i-think-so')
            .getValue('.error')
            .then(status => 
                assert.ok(status === '400', 'the status is not correct')
            );
    });

    it('should returns page', function() {
        return this.browser
            .url('/')
            .isExisting('.content')
            .then(isExists => 
                assert.ok(isExists, 'the page is not returns')
            );
    });
});