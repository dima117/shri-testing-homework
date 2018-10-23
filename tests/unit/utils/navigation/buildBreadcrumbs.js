const {expect} = require('chai');
const buildBreadcrumbs = require('../../../../utils/navigation').buildBreadcrumbs;

describe('Функция построения хлебных крошек должна строить правильный путь', () => {
    it('Функция должна возвращать единственный активный корневой раздел, если не передан хэш и путь', () => {
        const breadcrumbs = buildBreadcrumbs();

        expect(breadcrumbs).to.have.lengthOf(1);

        const first = breadcrumbs[0];
        expect(first.text).to.be.eql('HISTORY');
        expect(first.href).to.be.undefined;
    });

    it('Функция должна возвращать ссылку на корневой раздел и активную корневую папку, если передан только хэш', () => {
        const breadcrumbs = buildBreadcrumbs('hash');

        expect(breadcrumbs).to.have.lengthOf(2);

        const first = breadcrumbs[0];
        expect(first.text).to.be.eql('HISTORY');
        expect(first.href).to.be.eql('/');

        const rootFolder = breadcrumbs[1];
        expect(rootFolder.text).to.be.eql('ROOT');
        expect(rootFolder.href).to.be.undefined;
    });

    it('Функция должна возвращать ссылку на корневой раздел и активную корневую папку, если передан хэш и путь', () => {
        const breadcrumbs = buildBreadcrumbs('hash', 'folder/folder/file');

        expect(breadcrumbs).to.have.lengthOf.above(2);

        const first = breadcrumbs[0];
        expect(first.text).to.be.eql('HISTORY');
        expect(first.href).to.be.eql('/');

        const rootFolder = breadcrumbs[1];
        expect(rootFolder.text).to.be.eql('ROOT');
        expect(rootFolder.href).to.be.eql('/files/hash/');
    });

    it('Функция должна строить ссылки на папки, если передан хэш и путь', () => {
        const breadcrumbs = buildBreadcrumbs('hash', 'folder1/folder2/file');

        expect(breadcrumbs).to.have.lengthOf(5);

        const firstFolder = breadcrumbs[2];
        expect(firstFolder.text).to.be.eql('folder1');
        expect(firstFolder.href).to.be.eql('/files/hash/folder1/');

        const secondFolder = breadcrumbs[3];
        expect(secondFolder.text).to.be.eql('folder2');
        expect(secondFolder.href).to.be.eql('/files/hash/folder1/folder2/');
    });

    it('Функция должна возвращать активный файл или папку, если передан хэш и путь', () => {
        const breadcrumbs = buildBreadcrumbs('hash', 'folder/folder/file');

        expect(breadcrumbs).to.have.lengthOf(5);

        const active = breadcrumbs[4];
        expect(active.text).to.be.eql('file');
    });

    it('Функция должна возвращать активный файл или папку, если передан хэш и путь с окончанием /', () => {
        const breadcrumbs = buildBreadcrumbs('hash', 'folder/folder/file/');

        expect(breadcrumbs).to.have.lengthOf(5);

        const active = breadcrumbs[4];
        expect(active.text).to.be.eql('file');
        expect(active.href).to.be.undefined;
    });
});
