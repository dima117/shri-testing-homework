const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../../utils/navigation');
var expect  = require('chai').expect;

describe('navigation.js', function() {
    describe('buildFolderUrl()', () => {
        it('Получить путь к коммиту', () => {
            const parentHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';

            const result = buildFolderUrl(parentHash);

            expect(result).to.equal(`/files/${parentHash}/`);
        });
    });
    
    describe('buildFileUrl()', () => {
        it('Получить путь к директории в коммите', () => {
            const parentHash = 'testCommitHash';
            const path = 'additional/path/';

            const result = buildFolderUrl(parentHash, path);

            expect(result).to.equal(`/files/${parentHash}/${path}`);
        }); 

        it('Получить путь к файлу в коммите', () => {
            const parentHash = 'testCommitHash';
            const path = 'path/toFile.js';

            const result = buildFileUrl(parentHash, path);

            expect(result).to.equal(`/content/${parentHash}/${path}`);
        });
    });

    describe('buildBreadcrumbs()', () => {
        describe('Без параметров', () => {
            const breadcrumbs = buildBreadcrumbs();

            it('В цепочке корректное количество элементов', () => {
                expect(breadcrumbs).to.have.lengthOf(1);
            });

            it('Элемент имеет имя HISTORY', () => {
                expect(breadcrumbs[0]).to.have.property('text', 'HISTORY');
            });

            it('Элемент не имеет ссылки', () => {
                expect(breadcrumbs[0]).to.have.property('href', undefined);
            });
        });

        describe('Параметр: hash', () => {
            const commitHash = 'testCommitHash';

            const breadcrumbs = buildBreadcrumbs(commitHash);

            it('В цепочке корректное количество элементов', () => {
                expect(breadcrumbs).to.have.lengthOf(2);
            });

            it('Элемент HISTORY имеет ссылку на корень', () => {
                expect(breadcrumbs[0]).to.have.property('href', '/');
            });

            it('Добавлен элемент с названием ROOT', () => {
                expect(breadcrumbs[1]).to.have.property('text', 'ROOT');
            });

            it('Элемент ROOT не имеет ссылки', () => {
                expect(breadcrumbs[1]).to.have.property('href', undefined);
            });
        });

        describe('Параметры: hash + path(folder + file)', () => {
            const commitHash = 'testCommitHash';
            const path = 'folder/file.js';

            const breadcrumbs = buildBreadcrumbs(commitHash, path);

            it('В цепочке корректное количество элементов', () => {
                expect(breadcrumbs).to.have.lengthOf(4);
            });

            it('Элемент ROOT имеет ссылку на коммит', () => {
                expect(breadcrumbs[1]).to.have.property('href', `/files/${commitHash}/`);
            });

            it('Элемент Папка имеет корректное название', () => {
                expect(breadcrumbs[2]).to.have.property('text', `folder`);
            });

            it('Элемент Папка имеет корректную ссылку', () => {
                expect(breadcrumbs[2]).to.have.property('href', `/files/${commitHash}/folder/`);
            });

            it('Элемент Файл имеет корректное название', () => {
                expect(breadcrumbs[3]).to.have.property('text', `file.js`);
            });

            it('Элемент Файл не имеет ссылки', () => {
                expect(breadcrumbs[3]).to.not.have.property('href');
            });
        });
    });
});
