const assert = require('assert');

describe('Файловая структура проекта', function () {

    it('Должно правильно отображаться содержимое на странице истории коммитов', function () {
        return this.browser
            .url('/')
            .element('.container')
            .assertView('plain', '.content');
    });

    it('Должно правильно отображаться содержимое на странице файловой системы', function () {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .element('.container')
            .assertView('plain', '.content');
    });

    it('Должно правильно отображаться содержимое на странице просмотра содержимого файла', function () {
        return this.browser
            .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/app.js')
            .element('.content')
            .assertView('plain', '.file-content');
    });


    it('Должен совпадать заголовок страницы при переходе на детальный просмотр коммита', function () {
        return this.browser
            .url('/')
            .element('.commit__link')
            .click('a=90180910fc27a11272a3e5caeeb119a51e5c0545')
            .getTitle()
            .then(function (title) {
                assert.equal(title, 'files')
            });
    });

    it('Должны совпадать хлебные крошки при переходе', function () {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/public')
            .element('.breadcrumbs')
            .click('a=ROOT')
            .getText('.breadcrumbs')
            .then(function (breadcrumbs) {
                assert.equal(breadcrumbs, 'HISTORY / ROOT')
            });
    });

    it('Должен существовать список файлов при переходе', function () {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .element('.content')
            .element('ul')
            .click('a=utils')
            .getTitle()
            .then(function (title) {
                assert.equal(title, 'files');
            })
    });

    it('Должно существовать содержимое файла при переходе', function () {
        return this.browser
            .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
            .element('.content')
            .element('ul')
            .click('a=.gitignore')
            .isExisting('.file-content')
            .then(function (fileText) {
                assert.ok(fileText, 'file is exist');
            });
    });

    it('Должно правильно работать переход из списка файлов на страницу содержимого файла', function () {
        return this.browser
            .url('files/90180910fc27a11272a3e5caeeb119a51e5c0545/controllers')
            .element('.content')
            .element('ul')
            .click('a=contentController.js')
            .getTitle()
            .then(function (title) {
                assert.equal(title, 'content');
            });
    });
});