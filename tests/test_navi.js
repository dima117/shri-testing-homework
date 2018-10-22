const {buildFolderUrl, buildFileUrl, buildBreadcrumbs} = require('../utils/navigation');
const expect = require('chai').expect;

describe('Формирование URL', () => {
    const hash = 'hash';
    const path = 'test/script.js';

    it('buildFolderUrl возвращает путь к папке', () => {
        expect(buildFolderUrl(hash)).to.equal(`/files/${hash}/`);
    });

    it('buildFileUrl возвращает путь к файлу', () => {
        expect(buildFileUrl(hash, path)).to.equal(`/content/${hash}/${path}`);
    });

});

describe('Формирование хлебных крошек', () => {
    const hash = 'hash';
    const folder = 'folder';
    const file = 'file.js';
    const path = folder + '/' + file;
    const bc = buildBreadcrumbs(hash, path);

    it('В цепочке корректное количество элементов', () => {
        expect(bc).to.have.lengthOf(4);
    });

    it('ROOT содержит ссылку на папку', () => {
        expect(bc[1]).to.have.property('href', `/files/${hash}/`);
    });

    it('Папка имеет корректное название', () => {
        expect(bc[2]).to.have.property('text', folder);
    });

    it('Папка имеет корректную ссылку', () => {
        expect(bc[2]).to.have.property('href', `/files/${hash}/${folder}/`);
    });

    it('Файл имеет корректное название', () => {
        expect(bc[3]).to.have.property('text', file);
    });
});
