const assert = require('assert');

describe('index', function() {
    it('should find history', function() {
        return this.browser
            .url('http://localhost:3000/')
            .isExisting('.breadcrumbs')
            .then((exists) => {
                assert.ok(exists, 'Тест не прошёл');
            });
    });
    it('should see history', function() {
        return this.browser
            .url('https://www.yandex.ru/')
            .assertView('plain', '.home-arrow');
    });
});

describe('Отображение содержимого', function() {
    // поскольку вся страница целиком слишком велика, да и контент может меняться, проверять будем вид одного блока
    it('история коммитов', function() {
        return this.browser
            .url('http://localhost:3000/')
            .assertView('commit', '.commit');
    });

    // it('файловая система', function() {
    //     return this.browser
    //         .url('http://localhost:3000/')
    //         .assertView('commit', '.commit');
    // });

    // it('содержимое файла', function() {
    //     return this.browser
    //         .url('http://localhost:3000/')
    //         .assertView('commit', '.commit');
    // });
});

// правильно работают переходы по страницам
// из списка коммитов на список файлов
// из списка файлов во вложенную папку
// из списка файлов на страницу отдельного файла
// переходы по хлебным крошкам