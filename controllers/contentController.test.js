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
        Object.assign(mock, interProcessor(
            'content', 
            { render(path, options) { Object.assign(mock, { ...options }); } },
            'hash', ['path']
        ));

        expect(mock).to.deep.eq(res);
    });
});