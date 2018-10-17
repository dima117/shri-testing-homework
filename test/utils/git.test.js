let {expect} = require('chai'),
    {buildFolderUrl, buildFileUrl, buildBreadcrumbs} = require('../../utils/navigation');

const TEST_OBJ = {
    hash: '76de127bf6fef0774270988c16e4e957bcd2eaac',
    path: '/controllers/filesController.js',
    getPathArr: function() {return this.path.split('/').filter(Boolean)},
    getPathLastChild: function() {return this.getPathArr()[this.getPathArr().length - 1]},
    getPathFirstChild: function() {return this.getPathArr()[0]}
};

describe('navigation.js', function () {

    context('buildFolderUrl()', function () {
        describe('Если аргумент path не передан', function () {
            it('должен возвращать путь директории в виде строки, включающей переданный parentHash', function () {
                // Подготовка
                let parentHash = TEST_OBJ.hash;
                // Действие
                let result = buildFolderUrl(parentHash);
                // Проверка
                expect(result).to.equal(`/files/${parentHash}/`);
            });
        });
        describe('Если аргумент path передан', function () {
            it('должен возвращать путь директории в виде строки, включающей оба переданных аргумента', function () {
                // Подготовка
                let parentHash = TEST_OBJ.hash,
                    path = 'controllers';
                // Действие
                let result = buildFolderUrl(parentHash, path);
                // Проверка
                expect(result).to.equal(`/files/${parentHash}/${path}`);
            });
        });
    });


    context('buildFileUrl()', function () {
       it('Должен возвращать путь файла в виде строки, включающей оба переданных аргумента', function () {
           // Подготовка
           let parentHash = TEST_OBJ.hash,
               path = 'app.js';
           // Действие
           let result = buildFileUrl(parentHash, path);
           // Проверка
           expect(result).to.equal(`/content/${parentHash}/${path}`);
       });
    });


    context('buildBreadcrumbs()', function () {
        describe('Если аргумент hash не передан', function () {
            it('должен вернуть объект bc, ключом href === undefined', function () {
                // Подготовка
                let breadCrump = [{'text': 'HISTORY', 'href': undefined}];
                // Действие
                let result = buildBreadcrumbs();
                // Проверка
                expect(result).to.deep.equal(breadCrump);
            });
        });

        describe('Если аргумент hash передан', function () {
            it('должен вернуть первым в массиве объект bc, с ключом href, начинающимся с /', function () {
                // Подготовка
                let hash = TEST_OBJ.hash;
                // Действие
                let result = buildBreadcrumbs(hash);
                // Проверка
                expect(result[0]).to.include({ href: '/' });
            });

            it('должен вернуть вторым в массиве объект bc, с ключом text равным ROOT', function () {
                // Подготовка
                let hash = TEST_OBJ.hash;
                // Действие
                let result = buildBreadcrumbs(hash, 'folder/folder/text.txt');
                // Проверка
                expect(result[1]).to.include({text: 'ROOT'});
            });
        });


        describe('Если аргумент path передан', function () {
            it('должен вернуть вторым в массиве объект bc, с ключом href содержащим аргумент hash', function () {
                // Подготовка
                let hash = TEST_OBJ.hash,
                    path = TEST_OBJ.path;
                // Действие
                let result = buildBreadcrumbs(hash, path);
                // Проверка
                expect(result[1]).to.include({href: `/files/${hash}/`});
            });
            it('должен вернуть третьим в массиве объект, с ключом href содержищим правильный путь', () => {
                // Подготовка
                let hash = TEST_OBJ.hash,
                    path = TEST_OBJ.path,
                    pathPart = TEST_OBJ.getPathFirstChild();
                // Действие
                let result = buildBreadcrumbs(hash, path);
                // Проверка
                expect(result[2]).to.include({href: `/files/${hash}/${pathPart}/`});

            });
            it('должен вернуть количество объектов в массиве, равное количеству "звеньев" в пути аргумента path', () => {
                // Подготовка
                let hash = TEST_OBJ.hash,
                    path = TEST_OBJ.path,
                    pathArr = TEST_OBJ.getPathArr();
                // Действие
                let result = buildBreadcrumbs(hash, path);
                // Проверка
                expect(result).to.have.lengthOf(pathArr.length + 2);
            });
            it('должен вернуть последним в массиве объект bc, с ключом text равным последнему элементу адреса в path', function () {
                // Подготовка
                let hash = TEST_OBJ.hash,
                    path = TEST_OBJ.path,
                    pathLast = TEST_OBJ.getPathLastChild();
                // Действие
                let result = buildBreadcrumbs(hash, path),
                    length = result.length;
                // Проверка
                expect(result[length - 1]).to.include({text: pathLast});
            });
        });

        describe('Если аргумент path не передан', function () {
            it('должен вернуть вторым в массиве объект bc, с ключом href равным undefined', function () {
                // Подготовка
                let hash = TEST_OBJ.hash;
                // Действие
                let result = buildBreadcrumbs(hash);
                // Проверка
                expect(result[1]).to.include({href: undefined});
            });
        });

    });


});