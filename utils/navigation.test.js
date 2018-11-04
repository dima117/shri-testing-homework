const { expect, use } = require('chai');
const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('./navigation');

describe('navigation.js', () => {
    describe('buildFolderUrl', () => {
        it('Вызов функции без аргументов, должен вернуть некорректный url', () => {
            const stub = '/files/undefined/';

            expect(buildFolderUrl()).equal(stub);
        });

        it('Вызов функции с 1 аргументом hash, должен вернуть url, к корню дерева файлов commit-a', () => {
            const stub = '/files/hash/';

            expect(buildFolderUrl('hash')).equal(stub);
        });

        it('Вызов функции с 2мя аргументами, должен вернуть корректный url', () => {
            const stub = '/files/hash/path';

            expect(buildFolderUrl('hash', 'path')).equal(stub);
        });

        it('Вызов функции с 1 аргументом path, должен вернуть некорректный url', () => {
            const stub = '/files//path';

            expect(buildFolderUrl('', 'path')).equal(stub);
        });
    });

    describe('buildFileUrl', () => {
        it('Вызов функции без аргументов, должен вернуть некорректный url', () => {
            const stub = '/content/undefined/undefined';

            expect(buildFileUrl()).equal(stub);
        });

        it('Вызов функции с 1 аргументом hash, должен вернуть url, к не не существующему файлу', () => {
            const stub = '/content/hash/undefined';

            expect(buildFileUrl('hash')).equal(stub);
        });

        it('Вызов функции с 2мя аргументами, должен вернуть корректный url', () => {
            const stub = '/content/hash/path';

            expect(buildFileUrl('hash', 'path')).equal(stub);
        });

        it('Вызов функции с 1 аргументом path, должен вернуть некорректный url', () => {
            const stub = '/content//path';

            expect(buildFileUrl('', 'path')).equal(stub);
        });
    });

    describe('buildBreadcrumbs', () => {
        it('Вызов функции без аргументов, должен вернуть путь к корню(HISTORY)', () => {
            expect(buildBreadcrumbs()).to.deep.equal([
                { text: 'HISTORY', href: undefined }
            ])
        });

        it('Вызов функции с 2мя аргументами, должен вернуть путь к файлу', () => {
            const path = 'package-lock.json';
            const hash = 'cc2284293758e32c50fa952da2f487c8c5e8d023';
            const href = '/files/cc2284293758e32c50fa952da2f487c8c5e8d023/';

            expect(buildBreadcrumbs(hash, path)).to.deep.equal([
                { text: 'HISTORY', href: '/' },
                { text: 'ROOT', href: href },
                { text: path }
            ])
        });

        it('Вызов функции с 2мя аргументами, должен вернуть путь', () => {
            const path = 'path';
            const hash = 'hash';

            expect(buildBreadcrumbs(hash, path)).to.deep.equal([
                { text: 'HISTORY', href: '/' },
                { text: 'ROOT', href: '/files/hash/' },
                { text: 'path' }
            ])
        });

        it('Вызов функции с 2мя аргументами, с большей вложеностью, должен вернуть путь', () => {
            const path = 'path/andOneMore';
            const hash = 'hash';

            expect(buildBreadcrumbs(hash, path)).to.deep.equal([
                { text: 'HISTORY', href: '/' },
                { text: 'ROOT', href: '/files/hash/' },
                { text: 'path', href: '/files/hash/path/' },
                { text: 'andOneMore' }
            ])
        });
    });
});
