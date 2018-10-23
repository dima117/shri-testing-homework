const {buildFolderUrl, buildFileUrl, buildBreadcrumbs, buildObjectUrl} = require('../utils/navigation');
const expect = require('chai').expect;

describe('Структура URL', () => {

    const hash = 'hash';
    const path = 'test/script.js';

    describe('Создание правильного типа ссылок для различных объектов', () => {
        it('buildObjectUrl возвращает /files/ для tree-объектов', () => {
            const type = 'tree';
            const result = buildObjectUrl(hash, {path, type});
            expect(result).to.equal(`/files/${hash}/${path}`);
        });
        it('buildObjectUrl возвращает /content/ для blob-объектов', () => {
            const type = 'blob';
            const result = buildObjectUrl(hash, {path, type});
            expect(result).to.equal(`/content/${hash}/${path}`);
        });
        it('buildObjectUrl возвращает # для прочих вариантов', () => {
            const type = '#';
            const result = buildObjectUrl(hash, {path, type});
            expect(result).to.equal('#');
        });
    });

    describe('Построение URL к папке', () => {
        it('buildFolderUrl возвращает URL к папке', () => {
            expect(buildFolderUrl(hash)).to.equal(`/files/${hash}/`);
        });
    });

    describe('Построение URL к файлу', () => {
        it('buildFileUrl возвращает URL к файлу', () => {
            expect(buildFileUrl(hash, path)).to.equal(`/content/${hash}/${path}`);
        });
    });

});

describe('Хлебные крошки', () => {
    const hash = 'hash';
    const folder = 'folder';
    const file = 'file.js';
    const path = folder + '/' + file;
    const bc = buildBreadcrumbs(hash, path);

    describe('Число элементов', () => {
        it('В цепочке корректное количество элементов', () => {
            expect(bc).to.have.lengthOf(4);
        });
    });

    describe('Ссылки элементов', () => {
        it('ROOT содержит ссылку на папку', () => {
            expect(bc[1]).to.have.property('href', `/files/${hash}/`);
        });

        it('Папка имеет корректную ссылку', () => {
            expect(bc[2]).to.have.property('href', `/files/${hash}/${folder}/`);
        });
    });

    describe('Названия элементов', () => {
        it('Папка имеет корректное название', () => {
            expect(bc[2]).to.have.property('text', folder);
        });

        it('Файл имеет корректное название', () => {
            expect(bc[3]).to.have.property('text', file);
        });
    });

});
