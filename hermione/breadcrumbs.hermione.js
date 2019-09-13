const { assert } = require('chai');
const { hash } = require('./data.json');

describe('Breadcrumbs', () => {
    describe('Breadcrumbs parse', () => {
        it('should return empty path', function() {
            return this.browser
                .url('/')
                .getText('.breadcrumbs')
                .then(text =>
                    assert.ok(text === 'HISTORY', 'the .breadcrumbs returns not correct text')
                );
        });

        it('should return new path', function() {
            return this.browser
                .url('/')
                .click('a')
                .getUrl()
                .then(url =>
                    assert.ok(
                        url === 'http://localhost:3000/files/ab90444b89769498eb6c455534f059926e470450/',
                        'url isn\'t correct'
                    )
                )
                .getText('.breadcrumbs')
                .then(text =>
                    assert.ok(text === 'HISTORY / ROOT', 'the the .breadcrumbs returns not correct text')
                )
        });

        it('should return big path to file', function() {
            return this.browser
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
});
