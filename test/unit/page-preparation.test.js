const { prepareIndex, prepareContent, prepareFiles } = require('../../utils/page-preparation');
var expect  = require('chai').expect;

describe('page-preparation.js', () => {
    describe('prepareContent()', () => {
        // Тесты prepareContent()
    });

    describe('prepareFiles()', () => {
        // Тесты prepareFiles()
    });

    describe('prepareIndex()', () => {
        describe('Нет элементов в истории', () => {
            const history = [];

            const result = prepareIndex(history);

            it('Возвращается корректный заголовок', () => {
                expect(result).to.have.property('title', 'history');
            });

            it('"Хлебные крошки" состоят из одного элемента', () => {
                expect(result.breadcrumbs).to.have.lengthOf(1);
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

            it('Список содержит 2 элемента', () => {
                expect(result.list).to.have.lengthOf(2);
            });
        });
    });
});