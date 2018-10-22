const { insideProc } = require('../../../controllers/filesController');

const { expect } = require('chai');

describe('Controller filesController Test', () => {

    it('Transmits correct arguments to render', () => {
        // подготовка
        const hash = 'hash';
        const pathParam = [];
        const list = [
            {
                type: 'tree',
                hash: 'hashTree',
                path: 'pathToFoulder'
            },
            {
                type: 'blob',
                hash: 'hashBlob',
                path: 'pathToFile'
            },
        ];
        const result = {
            path: 'files',
            title: 'files',
            breadcrumbs:
            [
                { text: 'HISTORY', href: '/' },
                { text: 'ROOT', href: undefined }
            ],
            files:
            [
                {
                    type: 'tree',
                    hash: 'hashTree',
                    path: 'pathToFoulder',
                    href: '/files/hash/pathToFoulder',
                    name: 'pathToFoulder'
                },
                {
                    type: 'blob',
                    hash: 'hashBlob',
                    path: 'pathToFile',
                    href: '/content/hash/pathToFile',
                    name: 'pathToFile'
                }
            ]
        };
        let mock;
        // действиe
        insideProc(list, hash, pathParam,
            {render(path, options) {
                mock = {path, ...options};
            }}
        );

        // проверка
        expect(result).to.be.eql(mock);
    });

    // Не знаю на сколько правильно написан предыдущий тест
});
