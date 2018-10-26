const {expect} = require('chai');
const buildFolderUrl = require('../../../../utils/navigation').buildFolderUrl;

describe('Функция построения пути папки должна строить правильный путь', () => {
    it('Функция строит правильный путь, если передан только хэш', function () {
        const folderUrl = buildFolderUrl('hash');

        expect(folderUrl).to.eql('/files/hash/');
    });

    it('Функция строит правильный путь, если переданы хэш и путь', function () {
        const folderUrl = buildFolderUrl('hash', 'path');

        expect(folderUrl).to.eql('/files/hash/path');
    });
});
