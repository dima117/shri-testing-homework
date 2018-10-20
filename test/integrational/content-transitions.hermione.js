var expect  = require('chai').expect;

describe('Переходы по ссылкам внутри контента', () => {
    const lastCommitLink = '//div[@class="commit"][last()]/div[@class="commit__link"]/a';

    it('Переход из списка коммитов к списку файлов', async function() {
        const breadcrumbsText = await this.browser
            .url('/')
            .click(lastCommitLink)
            .getText('.breadcrumbs');
        
        expect(breadcrumbsText).to.equal('HISTORY / ROOT');
    });

    it('Переход из списка файлов во вложенную папку', async function() {
        const lastFolderLink = '//div[@class="content"]/ul/li[last()]/a';

        const breadcrumbsText = await this.browser
            .url('/')
            .click(lastCommitLink) 
            .click(lastFolderLink) 
            .getText('.breadcrumbs');
        
        expect(breadcrumbsText).to.equal('HISTORY / ROOT / views');
    });

    it('Переход из списка файлов на страницу отдельного файла', async function() {
        const fileLink = '//div[@class="content"]/ul/li[3]/a';

        const breadcrumbsText = await this.browser
            .url('/')
            .click(lastCommitLink) 
            .click(fileLink) 
            .getText('.breadcrumbs');

        expect(breadcrumbsText).to.equal('HISTORY / ROOT / app.js');
    });
});