const {expect} = require('chai');
const buildFileUrl = require('../../../../utils/navigation').buildFileUrl;

describe('Функция построения пути файла должна строить правильный путь', () => {
    it('Функция строит правильный путь, если переданы хэш и путь', function () {
        const folderUrl = buildFileUrl('hash', 'path');

        expect(folderUrl).to.eql('/content/hash/path');
    });
});
