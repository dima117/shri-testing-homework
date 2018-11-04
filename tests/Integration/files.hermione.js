const assert = require('chai').assert;
const URL = 'http://localhost:3000';

describe('Check elements on files page', function() {
    it('Should check click on file', function() {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .click('.content li:nth-child(2) a')
            .getUrl()
            .then(url => {
                assert.equal(url, `${URL}/content/90180910fc27a11272a3e5caeeb119a51e5c0545/README.md`);
            })
            .getText('.breadcrumbs')
            .then(text => {
                assert.include(text, 'README.md');
            });
    });

    it('Should check breadcrumbs', function() {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .click('.breadcrumbs a:last-child')
            .getUrl()
            .then(url => {
                assert.equal(url, `${URL}/`);
            })
            .getText('.breadcrumbs')
            .then(text => {
                assert.include(text, 'HISTORY');
            });
    });

    it('Should check click on catalog', function() {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .click('.content li:nth-child(5) a')
            .getUrl()
            .then(url => {
                assert.equal(url, `${URL}/files/90180910fc27a11272a3e5caeeb119a51e5c0545/controllers`);
            })
            .getText('.breadcrumbs')
            .then(text => {
                assert.include(text, 'controllers');
            });
    });

    it('Should view breadcrumbs', function() {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .assertView('file-tree-breadcrumbs', '.breadcrumbs');
    });

    it('Should view file tree', function() {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .assertView('file-tree', '.content ul');
    });
});