const { insideProc } = require('../../../controllers/indexController');

const { expect } = require('chai');

describe('Controller indexController Test', () => {

    it('Transmits correct arguments to render', () => {
        // подготовка
        const result = {
            path: 'index',
            title: 'history',
            breadcrumbs: [ { text: 'HISTORY', href: undefined } ],
            list: [ { hash: 'hash', href: '/files/hash/' } ]
        };
        let mock;

        // действиe
        insideProc(
            [{hash: 'hash'}],
            {render(path, options) {
                mock = {path, ...options};
            }}
        );

        // проверка
        expect(result).to.be.eql(mock);
    });

});
