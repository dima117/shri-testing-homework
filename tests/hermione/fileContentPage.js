const {expect} = require('chai');
const assert = require('assert');

const hash = 'b935074de54f9b3c8ebfac7e6b53274b16f34837';
const file = '.gitignore';
const url = `/content/${hash}/${file}`;

describe('Правильно работает страница отображения файла', () => {
    it('Правильно отображается блок хлебных крошек', function () {
        return this.browser
            .url(url)
            .isExisting('.breadcrumbs')
            .then(exists => assert.ok(exists))
            .assertView('fileBreadcrumbs', '.breadcrumbs')
    });

    it('Пользователь должен иметь возможность вернуться на страницу комитов', function () {
        return this.browser
            .url(url)
            .isExisting('.breadcrumbs')
            .then(exists => assert.ok(exists))
            .$$('.breadcrumbs a')
            .then(links => {
                expect(links).to.not.be.empty;

                return this.browser.elementIdClick(links[0].ELEMENT)
            })
            .getUrl()
            .then(url => expect(url).to.be.eql('http://127.0.0.1:3000/'));
    });

    it('Пользователь должен иметь возможность вернуться на страницу папки', function () {
        return this.browser
            .url(url)
            .isExisting('.breadcrumbs')
            .then(exists => assert.ok(exists))
            .$$('.breadcrumbs a')
            .then(links => {
                expect(links).to.not.be.empty;

                return this.browser.elementIdClick(links[1].ELEMENT)
            })
            .getUrl()
            .then(url => expect(url).to.be.eql(`http://127.0.0.1:3000/files/${hash}/`));
    });

    it('Правильно отображается блок содержания файла', function () {
        return this.browser
            .url(url)
            .isExisting('.file-content')
            .then(exists => assert.ok(exists))
            .assertView('fileContent', '.file-content');
    });
});
