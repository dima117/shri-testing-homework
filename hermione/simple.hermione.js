const { assert } = require('chai');
const hash = 'ab90444b89769498eb6c455534f059926e470450';

describe('Routes', () => {
    it('should return file "some_file_2.txt"', function() {
        return this.browser
            .url(`http://localhost:3000/content/${hash}/folder/folder_2/some_file_2.txt`)
            .getText('.content')
            .then(text => 
                assert.ok(text === 'Test 1', 'url not work')    
            );
    });
});

describe('Breadcrumbs', () => {
    it('breadcrumb should corrects parsed', function() {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then(text => 
                assert.ok(text === 'HISTORY', 'the .breadcrumbs returns not correct text')
            )
            .url(`http://localhost:3000/content/${hash}/folder/folder_2/some_file_2.txt`)
            .getText('.breadcrumbs')
            .then(text =>
                assert.ok(
                    text === 'HISTORY / ROOT / folder / folder_2 / some_file_2.txt',
                    'the .breadcrumbs retunrns not correct text'
                )   
            )
            .url(`/files/${hash}/`)
            .getText('.breadcrumbs')
            .then(text =>
                assert.ok(text === 'HISTORY / ROOT', 'the the .breadcrumbs returns not correct text')
            );
    });
});

describe('Server responses', () => {
    it('should returns correct statuses', function() {
        return this.browser
            .url('/not-existing-url-i-think-so')
            .getValue('.error')
            .then(status =>
                assert.ok(status === '404', 'response not returned 404 status')
            )
            .url(`/content/${hash}/not-existing-url-i-think-so`)
            .getValue('.error')
            .then(status => 
                assert.ok(status === '400', 'response not returned 400 status')
            )
            .url('/')
            .isExisting('.content')
            .then(isExists => 
                assert.ok(isExists, 'response not returned main page')
            )
            .url('content/not-existing-hash-i-think-so/any-file')
            .getValue('.error')
            .then(status =>
                assert.ok(status === '500', 'response not returned 500 status')
            );
    });
});