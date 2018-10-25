const { prepareIndex, prepareContent, prepareFiles } = require('../../utils/page-preparation');
var expect  = require('chai').expect;

describe('page-preparation.js', () => {
    describe('prepareIndex()', () => {
        describe('Нет элементов в истории', () => {
            const history = [];

            const result = prepareIndex(history);

            it('Возвращается корректный заголовок', () => {
                expect(result).to.have.property('title', 'history');
            });

            it('Есть свойство "Хлебные крошки"', () => {
                expect(result).to.have.property('breadcrumbs');
            });

            it('Список элементов пуст', () => {
                expect(result.list).to.have.lengthOf(0);
            });
        });

        describe('В истории 2 элемента', () => {
            const history = [ { 
                hash: 'Hash 1',
                author: 'Author 1',
                timestamp: 'Timestamp 1',
                msg: 'Message 1'
            }, { 
                hash: 'Hash 2',
                author: 'Author 2',
                timestamp: 'Timestamp 2',
                msg: 'Message 2'
            }];

            const result = prepareIndex(history);

            it('К элементам списка добавляется свойство href', () => {
                expect(result.list[0]).to.have.property('href', '/files/Hash 1/');
            });

            it('Список содержит корректное количество элементов', () => {
                expect(result.list).to.have.lengthOf(2);
            });
        });
    });

    describe('prepareContent()', () => {
        const content = 'console.log(testUserCode)';
        const hash = 'userHash';
        const path = ['path1', 'path2'];

        const result = prepareContent(content, hash, path);

        it('Возвращается корректный заголовок', () => {
            expect(result).to.have.property('title', 'content');
        });

        it('Есть свойство "Хлебные крошки"', () => {
            expect(result).to.have.property('breadcrumbs');
        });

        it('Контент содержит переданную строку', () => {
            expect(result.content).to.equal(content);
        });
    });

    describe('prepareFiles()', () => {
        const list = [{
            'type': 'blob',
            'hash': 'hash1',
            'path': 'path11/path12'
        }, {
            'type': 'tree',
            'hash': 'hash2',
            'path': 'path21/path22'
        }, {
            'type': 'undefined',
            'hash': 'hash3',
            'path': 'path31/path32'
        }];

        const hash = 'userHash';
        const pathParam = ['path1', 'path2'];

        const result = prepareFiles(list, hash, pathParam);

        it('Возвращается корректный заголовок', () => {
            expect(result).to.have.property('title', 'files');
        });

        it('Получаем корректный href для файла', () => {
            expect(result.files[0]).to.have.property('href', '/content/userHash/path11/path12');
        });

        it('Получаем корректный href для папки', () => {
            expect(result.files[1]).to.have.property('href', '/files/userHash/path21/path22');
        });        

        it('href для неизвестного типа принимает значение #', () => {
            expect(result.files[2]).to.have.property('href', '#');
        });

        it('К элементам списка добавляется свойство name', () => {
            expect(result.files[0]).to.have.property('name', 'path12');
        });

        it('Список содержит корректное количество элементов', () => {
            expect(result.files).to.have.lengthOf(3);
        });
    });
});