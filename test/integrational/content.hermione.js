var expect  = require('chai').expect;

describe('Содержимое страниц', () => {
    const lastCommitLink = '//div[@class="commit"][last()]/div[@class="commit__link"]/a';

    it('Содержимое истории коммитов', function() {
        return this.browser
            .url('/')
            .isExisting('.commit')
            .then((exists) => {
                expect(exists).to.be.true;
            })
    });

    it('Коммит содержит автора', function() {
        return this.browser
            .url('/')
            .isExisting('.commit__author')
            .then((exists) => {
                expect(exists).to.be.true;
            })
    });

    it('Коммит содержит дату', function() {
        return this.browser
            .url('/')
            .isExisting('.commit__date')
            .then((exists) => {
                expect(exists).to.be.true;
            })
    });

    it('Коммит содержит сообщение', function() {
        return this.browser
            .url('/')
            .isExisting('.commit__msg')
            .then((exists) => {
                expect(exists).to.be.true;
            })
    });

    it('Содержимое файловой системы', function() {

        return this.browser
            .url('/')
            .click(lastCommitLink)
            .isExisting('.content')
            .then((exists) => {
                expect(exists).to.be.true;
            })
    });

    it('Содержимое файла', function() {
        const fileLink = '//div[@class="content"]/ul/li[2]/a';

        return this.browser
            .url('/')
            .click(lastCommitLink) 
            .click(fileLink) 
            .isExisting('.file-content')
            .then((exists) => {
                expect(exists).to.be.true;
            })
    });
});