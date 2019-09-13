const { interProcessor } = require('./indexController');
const { expect } = require('chai');

describe('indexController.test.js', () => {
    it('should returns correct format of data', () => {
        const res = {
            breadcrumbs: [{ href: undefined, text: 'HISTORY' }],
            list: [{ hash: 'hash', href: '/files/hash/'}],
            path: 'index',
            title: 'history'
        };

        let mock;
        interProcessor(
            [{ hash: 'hash' }],
            { render(path, options) { mock = { path, ...options }; } }
        );

        expect(mock).to.deep.eq(res);
    });
});