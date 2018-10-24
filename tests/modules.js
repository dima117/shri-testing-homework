const { buildBreadcrumbs, buildFolderUrl, buildFileUrl } = require('../utils/navigation.js');
const { expect } = require('chai');

// тестируем навигацию
describe('Navigation', function() {
   it('создается корректный путь до папки с указанием пути', function() {
        // подготовка: нам нужен хэш коммита и путь до папки
        let hash = '90180910fc27a11272a3e5caeeb119a51e5c0545',
            path = 'utils';

        // действие: создаем путь
        let folderUrl = buildFolderUrl(hash, path);

        // проверка: хочется иметь строку, в которой содержится наш путь
        expect( folderUrl.split('/') ).to.include( path );
    });
    it('создается корректный путь до папки, если путь не указан', function() {
        // подготовка: нам нужен хэш коммита
        let hash = '90180910fc27a11272a3e5caeeb119a51e5c0545',
            path = void(0);

        // действие: пытаемся создать хлебные крошки
        let folderUrl = buildFolderUrl(hash, path);

        // проверка: хотелось бы, чтобы вернулась строка, которая сплитится по слэшу
        expect( folderUrl.split('/').length > 1 ).to.equal( true );
    });
});

// тестируем хлебные крошки

describe('Breadcrumbs', function() {
    it('есть заголовок HISTORY', function() {
        // подготовка: нам нужен хэш коммита и текущий путь (любой) для создания навигации
        let hash = void(0);

        // действие: пытаемся создать хлебные крошки
        let breadcrumbs = buildBreadcrumbs(hash);

        // проверка: в breadcrumbs должен быть объект с title HISTORY
        expect( breadcrumbs.map( item => item.text ) ).to.include('HISTORY');
    });

    it('при создании хлебных крошек создается полный путь до сущности', function() {
        // подготовка: нам нужен путь и хэш, чтобы создать хлебные крошки
        //             создадим также путь, который хотим положить в ссылку
        let hash = '90180910fc27a11272a3e5caeeb119a51e5c0545',
            type = 'files',
            folder = 'utils',
            path = `/${type}/${hash}/${folder}`;

        // действие: создаем хлебные крошки
        let breadcrumbs = buildBreadcrumbs(hash, path);

        // проверка: в breadcrumbs должен быть объект с названием utils и ссылкой, состоящей из трех частей
        expect( breadcrumbs.map( item => item.text ) ).to.include(folder);
    });
});