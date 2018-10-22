let assert = require('chai').assert;

describe('Transition', () => {

    describe('breadcrumbs: ', () => {
        it('root folder to /', function () {

            return this.browser
                .url('/files/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/') // root
                .click('.breadcrumbs a')
                .getUrl()
                .then( (url) => {
                    assert.ok(url === 'http://localhost:3000/', 'Does not work transition root -> /');
                });
        });

        it('test folder to /', function () {

            return this.browser
                .url('/files/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/tests') // test
                .click('.breadcrumbs a')
                .getUrl()
                .then( (url) => {
                    assert.ok(url === 'http://localhost:3000/', 'Does not work transition root/test -> /');
                });
        });

        it('.hermione.conf.js file to /', function () {

            return this.browser
                .url('/content/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/.hermione.conf.js') // .hermione.conf.js
                .click('.breadcrumbs a')
                .getUrl()
                .then( (url) => {
                    assert.ok(url === 'http://localhost:3000/', 'Does not work transition root/.hermione.conf.js -> /');
                });
        });

        it('public folder to root folder', function () {
            const exepterUrl = 'http://localhost:3000/files/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/';
            return this.browser
                .url('/files/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/public') // public
                .click('.breadcrumbs a:nth-child(2)')
                .getUrl()
                .then( (url) => {
                    assert.ok(url === exepterUrl, 'Does not work transition root/public -> root');
                });
        });
    });

    describe('commit list to file list: ', () => {
        it('first commit to file list', function () {
            return this.browser
                .url('/')
                .click('.commit__link a')
                .getUrl()
                .then( (url) => {
                    assert.ok(url.includes('files'), 'Does not work transition / -> root');
                });
        });
    });

    describe('file list to folder:', () => {
        it('root folder to bin folder', function () {
            return this.browser
                .url('/files/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/')
                .click('.content ul > li:nth-child(8) a') // На текущий момент папка bin
                .getUrl()
                .then( (url) => {
                    console.log(url);
                    assert.ok(url.includes('bin'), 'Does not work transition root -> folder(bin)');
                });
            // не получилось нормально сделать, хотел кликнуть на  element('=bin')
        });

        it('root folder to .babelrc folder', function () {
            return this.browser
                .url('/files/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/')
                .click('.content ul > li:nth-child(1) a') // На текущий момент файл .babelrc
                .getUrl()
                .then( (url) => {
                    console.log(url);
                    assert.ok(url.includes('.babelrc'), 'Does not work transition root -> file(.babelrc)');
                });
        });
    });

});
