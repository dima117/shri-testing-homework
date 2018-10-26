const {expect} = require('chai');
const assert = require('assert');

describe('Правильно работает страница истории комитов', () => {
    it('Правильно отображается блок хлебных крошек', function () {
        return this.browser
            .url('/')
            .isExisting('.breadcrumbs')
            .then(exists => assert.ok(exists))
            .assertView('indexBreadcrumbs', '.breadcrumbs')
    });

    it('Правильно отображается блок информации о коммите', function () {
        return this.browser
            .url('/')
            .isExisting('.commit:last-of-type')
            .then(exists => assert.ok(exists))
            .assertView('lastCommit', '.commit:last-of-type');
    });

    it('При клике на хэш комита происходит переход на список файлов', function () {
        let linkId;
        let hash = '';
        return this.browser
            .url('/')
            .$$('.commit__link a')
            .then(links => {
                expect(links).to.not.be.empty;
                linkId = links[0].ELEMENT;

                return this.browser.elementIdText(linkId);
            })
            .then(({value}) => {
                hash = value;

                return this.browser.elementIdClick(linkId);
            })
            .getUrl()
            .then(url => expect(url).to.be.eql(`http://127.0.0.1:3000/files/${hash}/`));
    });
});
