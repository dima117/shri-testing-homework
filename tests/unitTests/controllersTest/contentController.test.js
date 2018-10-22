const { insideProc } = require('../../../controllers/contentController');

const { expect } = require('chai');

describe('Controller contentController Test', () => {

    it('Transmits correct arguments to render', () => {
        // подготовка
        const hash = 'hash';
        const pathToFile = ['path'];
        const content = 'content';
        // подготовка
        const result = {
            path: 'content',
            title: 'content',
            breadcrumbs: [
                { text: 'HISTORY', href: '/' },
                { text: 'ROOT', href: '/files/hash/' },
                { text: 'path' }
            ],
            content: 'content'
        };
        let mock;
        // действиe
        insideProc(content, hash, pathToFile,
            {render(path, options) {
                mock = {path, ...options};
            }}
        );
        // проверка
        expect(result).to.be.eql(mock);
    });

});
