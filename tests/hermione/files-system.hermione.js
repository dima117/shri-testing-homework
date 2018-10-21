const assert = require('assert');

describe('when we in the files system page', () => {
    it('then we should see structure of file system', function () {
        return this.browser
            .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
            .assertView('fsystem', '.content')
    });

    it('and it should be list of 8 links', function () {
        return this.browser
            .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
            .getHTML('.content ul li a', false)
            .then((elements) => {
                assert.equal(elements.length, 8);
            });
    });

    it('and to breadcrumbs should be added / ROOT', function () {
        return this.browser
            .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
            .getText('.breadcrumbs')
            .then((title) => {
                assert.equal(title, 'HISTORY / ROOT');
            });
    })
});
