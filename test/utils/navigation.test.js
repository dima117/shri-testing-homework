let { expect } = require ('chai'),
    { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../../utils/navigation');


describe('buildFolderUrl()', function() {
    context('Если аргумент path не передан', function () {
        it('должен возвращать путь директории в виде строки, включающей переданный parentHash', function () {
            // Подготовка
            let parentHash = '69274fcc3314c2b1d50e1b799eca33b28657aafc';
            // Действие
            let result = buildFolderUrl(parentHash);
            // Проверка
            expect(result).to.equal(`/files/${parentHash}/`);
        });
    });

    context('Если аргумент path передан', function () {
        it('должен возвращать путь директории в виде строки, включаещей оба переданных аргумента', function () {
            // Подготовка
            let parentHash = '69274fcc3314c2b1d50e1b799eca33b28657aafc',
                path = 'controllers';
            // Действие
            let result = buildFolderUrl(parentHash, path);
            // Проверка
            expect(result).to.equal(`/files/${parentHash}/${path}`);
        })
    })
});