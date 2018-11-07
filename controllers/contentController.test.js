const { interProcessor } = require('./contentController');
const { expect } = require('chai');

describe('contentController.js', () => {
    it('should return correct format of data', () => {
        const res = {
            breadcrumbs: [
                { href: '/', text: 'HISTORY' },
                { href: '/files/hash/', text: 'ROOT' },
                { text: 'path' }
            ],
            content: 'content',
            title: 'content'
        };

        let mock = {};
        // Copy result of interProcessor (whose will be object) to mock.
        Object.assign(mock, interProcessor(
            'content',
            { render(path, options) { mock = {...mock, ...options }; } },
            'hash', ['path']
        ));

        expect(mock).to.deep.eq(res);
    });
});
