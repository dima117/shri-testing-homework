const assert = require('assert');


describe('На всех страницах правильно отображается их содержимое:', () => {
    it('история коммитов', function () {
        return this.browser
            .url('/')
            .isExisting('.commit')
            .then((exists) => {
                assert.ok(exists, 'Коммиты не отображаются!');
            });

    });
    it('просмотр файловой системы', function () {
        return this.browser
            .url('/files/1dca9032cbf1c6b10af7b08adc1fe18c5e4d3312/')
            .isExisting('.content') // Fix
            .then((exists) => {
                assert.ok(exists, 'Содержимое директории не отображается!');
            });
    });
    it('просмотр содержимого файла', function () {
        return this.browser
            .url('/content/1dca9032cbf1c6b10af7b08adc1fe18c5e4d3312/.hermione.conf.js')
            .isExisting('.file-content')
            .then((exists) => {
                assert.ok(exists, 'Содержимое файла не отображается!');
            });
    });
});


// describe('Правильно работают переходы по страницам', () => {
//    it('из списка коммитов на список файлов', function () {
//
//    });
//
//     it('из списка файлов во вложенную папку', function () {
//
//     });
//
//     it('из списка файлов на страницу отдельного файла', function () {
//
//     });
//
//     it('переходы по хлебным крошкам', function () {
//
//     });
// });