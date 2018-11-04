const assert = require('chai').assert;
const URL = 'http://localhost:3000';

describe('Check elements on index page', function() {
    it('Should check click on commit', function() {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .getUrl()
            .then(url => {
                assert.equal(url, `${URL}/files/90180910fc27a11272a3e5caeeb119a51e5c0545/`);
            })
            .getText('.breadcrumbs')
            .then(text => {
                assert.include(text, 'ROOT');
            });
    });

    it('Should view breadcrumbs', function() {
        return this.browser
            .url('/')
            .assertView('index-breadcrumbs', '.breadcrumbs');
    });

    it('Should view commit', function() {
        return this.browser
            .url('/')
            .assertView('commit', '.commit');
    });
});