const assert = require('assert');
// PO - page object, содержит селекторы
const PO = require('./helpers');


describe('Страница "История коммитов"', () => {

    describe('Проверка внешнего отображения компонентов', () => {

        it('Проверка на наличие хлебных крошек', function () {
            return this.browser
                .url('/')
                .isExisting(PO.breadcrumbs)
                .then((exists) => {
                    assert.ok(exists, 'Хлебные крошки отсутствуют');
                })
                .assertView('mainPage', PO.breadcrumbs);
        });

        it('Проверка на наличие коммитов', function () {
            return this.browser
                .url('/')
                .isExisting('.commit')
                .then((exists) => {
                    assert.ok(exists, 'Коммиты отсутствуют');
                })
                .assertView('mainPage', '.content');
        });
    });

    describe('Проверка ссылок', () => {

        it('Проверка перехода на коммит', function () {
            return this.browser
                .url('/')
                .click(PO.commitLink)
                .getTitle()
                .then((text) => {
                    assert.equal(text, 'files');
                });
        });
    });
});

describe('Страница файловой системы', () => {

    describe('Проверка внешнего отображения компонентов', () => {

        it('Проверка на наличие хлебных крошек', function () {
            return this.browser
                .url('/')
                .click(PO.commitLink)
                .isExisting(PO.breadcrumbs)
                .then((exists) => {
                    assert.ok(exists, 'Хлебные крошки отсутствуют');
                })
                .assertView('commitPage', PO.breadcrumbs);
        });

        it('Проверка на наличие списка файлов в коммите', function () {
            
            return this.browser
                .url('/')
                .click(PO.commitLink)
                .isExisting(PO.filesList)
                .then((exists) => {
                    assert.ok(exists, 'Список файлов отсутствуют');
                })
                .assertView('commitPage', PO.filesList);
        });
    });

    describe('Проверка ссылок', () => {

        it('Проверка перехода по крошкам из файловой системы на главную страницу', function () {
            return this.browser
                .url('/')
                .click(PO.commitLink)
                .element(PO.breadcrumbs)
                .click('a=HISTORY')
                .getTitle()
                .then((text) => {
                    assert.equal(text, 'history');
                });
        });

        it('Проверка перехода на файл', function () {
            const linkContent = 'a[href^="/content"]';

            return this.browser
                .url('/')
                .click(PO.commitLink)
                .click(`${linkContent}`)
                .getTitle()
                .then((text) => {
                    assert.equal(text, 'content');
                });
        });

        it('Проверка перехода на внутреннюю папку', function () {
            const linkFolder = 'a[href^="/files"]';

            return this.browser
                .url('/')
                .click(PO.commitLink)
                .click(linkFolder)
                .getTitle()
                .then((text) => {
                    assert.equal(text, 'files');
                });
        });

        it('Проверка перехода по крошкам из внутренней папки на главную страницу', function () {
            const linkFolder = 'a[href^="/files"]';

            return this.browser
                .url('/')
                .click(PO.commitLink)
                .click(linkFolder)
                .element(PO.breadcrumbs)
                .click('a=HISTORY')
                .getTitle()
                .then((text) => {
                    assert.equal(text, 'history');
                });
        });

        it('Проверка перехода по крошкам из внутренней папки на страницу файловой системы', function () {
            const linkFolder = 'a[href^="/files"]';

            return this.browser
                .url('/')
                .click(PO.commitLink)
                .click(linkFolder)
                .element(PO.breadcrumbs)
                .click('a=ROOT')
                .getTitle()
                .then((text) => {
                    assert.equal(text, 'files');
                });
        });
    });
});

describe('Страница файла', () => {

    describe('Проверка внешнего отображения компонентов', () => {

        it('Проверка на наличие хлебных крошек', function () {
            const linkContent = 'a[href^="/content"]';

            return this.browser
                .url('/')
                .click(PO.commitLink)
                .click(linkContent)
                .isExisting(PO.breadcrumbs)
                .then((exists) => {
                    assert.ok(exists, 'Хлебные крошки отсутствуют');
                })
                .assertView('filePage', PO.breadcrumbs);
        });

        it('Проверка на наличие контента', function () {
            const linkContent = 'a[href^="/content"]';

            return this.browser
                .url('/')
                .click(PO.commitLink)
                .click(linkContent)
                .isExisting(PO.fileContent)
                .then((exists) => {
                    assert.ok(exists, 'Контент отсутствует');
                })
                .assertView('filePage', PO.fileContent);
        });
    });

    describe('Проверка ссылок', () => {

        it('Проверка перехода по крошкам на главную', function () {
            const linkContent = 'a[href^="/content"]';

            return this.browser
                .url('/')
                .click(PO.commitLink)
                .click(linkContent)
                .element(PO.breadcrumbs)
                .click('a=HISTORY')
                .getTitle()
                .then((text) => {
                    assert.equal(text, 'history');
                });
        });

        it('Проверка перехода по крошкам из файла на страницу файловой системы', function () {
            const linkContent = 'a[href^="/content"]';

            return this.browser
                .url('/')
                .click(PO.commitLink)
                .click(linkContent)
                .element(PO.breadcrumbs)
                .click('a=ROOT')
                .getTitle()
                .then((text) => {
                    assert.equal(text, 'files');
                });
        });
    });
});