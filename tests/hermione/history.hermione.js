const assert = require('assert');

describe('when we in the main page', () => {
    it('then breadcrumb should be HISTORY', function () {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then((title) => {
                assert.equal(title, 'HISTORY');
            });
    });

    it('and we see the history of commits', function () {
        return this.browser
            .url('/')
            .getHTML('.content .commit', false)
            .then((elements) => {
                assert.equal(elements.length, 17);
            });
    });

    it('and every commit should have the same structure', function () {
        return this.browser
            .url('/')
            .assertView('history', '.content .commit:last-child')
    })
});

describe('every commit should have', () => {
    it('title', function () {
        return this.browser
            .url('/')
            .getText('.commit:last-child .commit__info .commit__author')
            .then((title) => {
                assert.equal(title, 'Dmitry Andriyanov')
            });
    });

    it('date', function () {
        return this.browser
            .url('/')
            .getText('.commit:last-child .commit__info .commit__date')
            .then((title) => {
                assert.equal(title, '2018-10-15 13:22:09 +0300')
            });
    });

    it('message', function () {
        return this.browser
            .url('/')
            .getText('.commit:last-child .commit__msg')
            .then((title) => {
                assert.equal(title, 'заготовка приложения')
            });
    });

    it('link', function () {
        return this.browser
            .url('/')
            .getText('.commit:last-child .commit__link')
            .then((title) => {
                assert.equal(title, '38429bed94bd7c107c65fed6bffbf443ff0f4183')
            });
    });
});
