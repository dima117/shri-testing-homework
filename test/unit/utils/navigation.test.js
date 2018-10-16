const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../../../utils/navigation');
var expect  = require('chai').expect;

describe('navigation.js', function() {
    it('Получить путь к директории', () => {
        // Подготовка 
        const parentHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
        // Дейcтвие
        const result = buildFolderUrl(parentHash);
        // Проверка
        expect(result).to.equal(`/files/${parentHash}/`);
    });

    it('Получить путь к директории с указанием доп. пути', () => {
        // Подготовка 
        const parentHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
        const path = 'additional/path/';
        // Дейcтвие
        const result = buildFolderUrl(parentHash, path);
        // Проверка
        expect(result).to.equal(`/files/${parentHash}/${path}`);
    });  

    it('Получить путь к файлу', () => {
        // Подготовка
        const parentHash = '3781b1db26f2dd293a45a975cd3be7c023f65f12';
        const path = 'path/toFile.js';
        // Действие
        const result = buildFileUrl(parentHash, path);
        // Проверка
        expect(result).to.equal(`/content/${parentHash}/${path}`);
    });
});
