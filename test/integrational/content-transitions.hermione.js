var expect  = require('chai').expect;

describe('Переходы по ссылкам внутри контента', () => {
    const lastCommitLink = '//div[@class="commit"][last()]/div[@class="commit__link"]/a';

    it('Переход из списка коммитов к списку файлов', function() {
        return this.browser
            .url('/')
            .click(lastCommitLink)
            .getText('.breadcrumbs')
            .then((breadcrumbsText) => {
                expect(breadcrumbsText).to.eql('HISTORY / ROOT');
            })
    });

    it('Переход из списка файлов во вложенную папку', function() {
        const lastFolderLink = '//div[@class="content"]/ul/li[last()]/a';

        return this.browser
            .url('/')
            .click(lastCommitLink) 
            .click(lastFolderLink) 
            .getText('.breadcrumbs')
            .then((breadcrumbsText) => {
                expect(breadcrumbsText).to.eql('HISTORY / ROOT / views');
            })
    });

    it('Переход из списка файлов на страницу отдельного файла', function() {
        const fileLink = '//div[@class="content"]/ul/li[2]/a';

        return this.browser
            .url('/')
            .click(lastCommitLink) 
            .click(fileLink) 
            .getText('.breadcrumbs')
            .then((breadcrumbsText) => {
                expect(breadcrumbsText).to.eql('HISTORY / ROOT / app.js');
            })
    });
});