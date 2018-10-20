const { assert } = require('chai');
const { hash } = require('./data.json');

describe('Breadcrumbs', () => {
    it('breadcrumb should corrects parsed', function() {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then(text => 
                assert.ok(text === 'HISTORY', 'the .breadcrumbs returns not correct text')
            )
            .click('a')
            .getText('.breadcrumbs')
            .then(text =>
                assert.ok(text === 'HISTORY / ROOT', 'the the .breadcrumbs returns not correct text')
            )
            .url(`http://localhost:3000/content/${hash}/folder/folder_2/some_file_2.txt`)
            .getText('.breadcrumbs')
            .then(text =>
                assert.ok(
                    text === 'HISTORY / ROOT / folder / folder_2 / some_file_2.txt',
                    'the .breadcrumbs retunrns not correct text'
                )   
            )
            .assertView('breadcrumbs', '.breadcrumbs');
    });
});