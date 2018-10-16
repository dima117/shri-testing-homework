const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../../../utils/navigation');
var expect  = require('chai').expect;

describe('navigation.js', function() {
    describe('Генерация url', () => {
        it('Получить путь к коммиту', () => {
            // Подготовка 
            const parentHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
            // Дейcтвие
            const result = buildFolderUrl(parentHash);
            // Проверка
            expect(result).to.equal(`/files/${parentHash}/`);
        });
    
        it('Получить путь к директории в коммите', () => {
            // Подготовка 
            const parentHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
            const path = 'additional/path/';
            // Дейcтвие
            const result = buildFolderUrl(parentHash, path);
            // Проверка
            expect(result).to.equal(`/files/${parentHash}/${path}`);
        }); 

        it('Получить путь к файлу в коммите', () => {
            // Подготовка
            const parentHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
            const path = 'path/toFile.js';
            // Действие
            const result = buildFileUrl(parentHash, path);
            // Проверка
            expect(result).to.equal(`/content/${parentHash}/${path}`);
        });
    });

    describe('"Хлебные крошки"', () => {
        it('По умолчанию возвращается элемент HISTORY', () => {
            // Подготовка
            // Действие
            const breadcrumbs = buildBreadcrumbs();
            // Проверка
            expect(breadcrumbs).to.eql([{'href': undefined, 'text': 'HISTORY'}]);
        });

        it('Элемент HISTORY имеет корректную ссылку', () => {
            // Подготовка
            const commitHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
            // Действие
            const breadcrumbs = buildBreadcrumbs(commitHash);
            const firstElement = breadcrumbs[0];
            // Проверка
            expect(firstElement).to.have.property('href', '/');
        });

        it('При указании hash, вторым элементом добавляется ROOT', () => {
            // Подготовка
            const commitHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
            // Действие
            const breadcrumbs = buildBreadcrumbs(commitHash);
            const secondElement = breadcrumbs[1];
            // Проверка
            expect(secondElement).to.eql({'href': undefined, 'text': 'ROOT'});
        });

        it('Элемент ROOT имеет корректную ссылку', () => {
            // Подготовка
            const commitHash = "3781b1db26f2dd293a45a975cd3be7c023f65f12";
            const path = 'folder'
            // Действие
            const breadcrumbs = buildBreadcrumbs(commitHash, path);
            const secondElement = breadcrumbs[1];
            // Проверка
            expect(secondElement).to.have.property('href', '/files/3781b1db26f2dd293a45a975cd3be7c023f65f12/');
        });

        it('Добавляемые элементы содержат корректную ссылку', () => {
            // Подготовка
            const commitHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
            const path = 'folder/file.js';
            // Действие
            const breadcrumbs = buildBreadcrumbs(commitHash, path);
            const thirdElement = breadcrumbs[2];
            // Проверка
            expect(thirdElement).to.have.property('href', '/files/3781b1db26f2dd293a45a975cd3be7c023f65f12/folder/');
            
        });

        it('Последний элемент цепочки имеет корректные данные', () => {
            // Подготовка
            const commitHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
            const path = 'folder/anotherFolder/file.js';
            // Действие
            const breadcrumbs = buildBreadcrumbs(commitHash, path);
            const lastElement = breadcrumbs.pop();
            // Проверка
            expect(lastElement).to.eql({'text': 'file.js'});
        });

        it('В цепочку добавляется корректное количество элементов', () => {
            // Подготовка
            const commitHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
            const path = 'folder/anotherFolder/file.js';
            // Действие
            const breadcrumbs = buildBreadcrumbs(commitHash, path);
            // Проверка
            expect(breadcrumbs).to.have.lengthOf(5);;
        });
    });
});
