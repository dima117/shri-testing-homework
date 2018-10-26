const {expect} = require('chai');
const assert = require('assert');

const hash = 'b935074de54f9b3c8ebfac7e6b53274b16f34837';
const url = `/files/${hash}/`;

describe('Правильно работает страница файловой системы', () => {
    it('Правильно отображается блок хлебных крошек', function () {
        return this.browser
            .url(url)
            .isExisting('.breadcrumbs')
            .then(exists => assert.ok(exists))
            .assertView('indexBreadcrumbs', '.breadcrumbs')
    });

    it('Правильно отображается блок информации о файлах и папках', function () {
        return this.browser
            .url(url)
            .isExisting('.content')
            .then(exists => assert.ok(exists))
            .assertView('files', '.content');
    });

    it('При клике на файл происходит переход на просмотр файла', function () {
        return this.browser
            .url(url)
            .$$('.content a')
            .then(links => {
                expect(links).to.not.be.empty;

                // Да, плохо. Но будем самоуверенно считать, что первая ссылка всегда .gitignore
                return this.browser.elementIdClick(links[0].ELEMENT)
            })
            .getUrl()
            .then(url => expect(url).to.be.eql(`http://127.0.0.1:3000/content/${hash}/.gitignore`));
    });

    it('При клике на папку происходит переход на просмотр папки', function () {
        return this.browser
            .url(url)
            .$$('.content a')
            .then(links => {
                expect(links).to.not.be.empty;

                // Да, плохо. Но будем самоуверенно считать, что четвертая ссылка всегда bin
                return this.browser.elementIdClick(links[3].ELEMENT)
            })
            .getUrl()
            .then(url => expect(url).to.be.eql(`http://127.0.0.1:3000/files/${hash}/bin`));
    });
});
