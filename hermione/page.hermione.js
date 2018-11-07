const { assert } = require('chai');
const { hash } = require('./data.json');

describe('Server responses', () => {
    describe('Statuses', () => {
        it('should return 404 status', function() {
            return this.browser
                .url('/not-existing-url-i-think-so')
                .getValue('.error')
                .then(status =>
                    assert.ok(status === '404', 'response not returned 404 status')
                );
        });

        it('should return 400 status', function() {
            return this.browser
                .url(`/content/${hash}/not-existing-url-i-think-so`)
                .getValue('.error')
                .then(status =>
                    assert.ok(status === '400', 'response not returned 400 status')
                );
        });

        it('should return status 500', function() {
            return this.browser
                .url('content/not-existing-hash-i-think-so/any-file')
                .getValue('.error')
                .then(status =>
                    assert.ok(status === '500', 'response not returned 500 status')
                )

        });
    });

    describe('Page view', () => {
        it('should return main page', function() {
            return this.browser
                .url('/')
                .isExisting('.content')
                .then(isExists =>
                    assert.ok(isExists, 'response not returned main page')
                )
                .assertView('content', '.content');
        });

        it('should return content of file', function() {
            return this.browser
                .url(`http://localhost:3000/content/${hash}/folder/folder_2/some_file_2.txt`)
                .getText('.content')
                .then(text =>
                    assert.ok(text === 'Test 1', 'url not work')
                )
                .assertView('content', '.content');
        })
    });
});
