var assert = require('assert');

describe('History', function() {
    it('Есть хлебные крошки и в них есть заголовок History', function() {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then(function(bc) {
                assert.equal(bc, 'HISTORY')
            });
    });
});

describe('Commit link', function() {
    it('Клик на ссылку коммита ведет на страницу с корнем директории', function() {
        var firstLink = this.browser.element('.commit__link');
        firstLink.click();

        return this.browser
            .getText('.breadcrumbs')
            .then(function(bc) {
                assert.equal(bc, 'HISTORY / ROOT')
            });
    });
});