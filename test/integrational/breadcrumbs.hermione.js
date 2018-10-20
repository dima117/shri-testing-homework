var expect  = require('chai').expect;

describe('Переходы по "Хлебным крошкам"', () => {
    const lastCommitLink = '//div[@class="commit"][last()]/div[@class="commit__link"]/a';

    it('HISTORY -> ROOT -> HISTORY', async function() {
        const historyBreadcrumbsLink = '//div[@class="breadcrumbs"]/a[1]';

        const breadcrumbsText = await this.browser
            .url('/')
            .click(lastCommitLink)
            .click(historyBreadcrumbsLink)
            .getText('.breadcrumbs');

        expect(breadcrumbsText).to.equal('HISTORY');
    });

    it('ROOT -> folder -> ROOT', async function() {
        const rootBreadcrumbsLink = '//div[@class="breadcrumbs"]/a[2]';
        const lastFolderLink = '//div[@class="content"]/ul/li[last()]/a';

        const breadcrumbsText = await this.browser
            .url('/')
            .click(lastCommitLink)
            .click(lastFolderLink)
            .click(rootBreadcrumbsLink)
            .getText('.breadcrumbs');

        expect(breadcrumbsText).to.equal('HISTORY / ROOT');
    });

    it('folder -> file -> folder', async function() {
        const folderBreadcrumbsLink = '//div[@class="breadcrumbs"]/a[3]';
        const lastFolderLink = '//div[@class="content"]/ul/li[last()]/a';
        const fileLink = '//div[@class="content"]/ul/li[last()]/a[1]';

        const breadcrumbsText = await this.browser
            .url('/')
            .click(lastCommitLink)
            .click(lastFolderLink)
            .click(fileLink)
            .click(folderBreadcrumbsLink)
            .getText('.breadcrumbs');
            
        expect(breadcrumbsText).to.equal('HISTORY / ROOT / views');
    });
});