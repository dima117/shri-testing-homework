var expect  = require('chai').expect;

describe('Переходы по "Хлебным крошкам"', () => {
    const lastCommitLink = '//div[@class="commit"][last()]/div[@class="commit__link"]/a';

    it('HISTORY -> ROOT -> HISTORY', function() {
        const historyBreadcrumbsLink = '//div[@class="breadcrumbs"]/a[1]';

        return this.browser
            .url('/')
            .click(lastCommitLink)
            .click(historyBreadcrumbsLink)
            .getText('.breadcrumbs')
            .then((breadcrumbsText) => {
                expect(breadcrumbsText).to.eql('HISTORY');
            })
    });

    it('ROOT -> folder -> ROOT', function() {
        const rootBreadcrumbsLink = '//div[@class="breadcrumbs"]/a[2]';
        const lastFolderLink = '//div[@class="content"]/ul/li[last()]/a';

        return this.browser
            .url('/')
            .click(lastCommitLink)
            .click(lastFolderLink)
            .click(rootBreadcrumbsLink)
            .getText('.breadcrumbs')
            .then((breadcrumbsText) => {
                expect(breadcrumbsText).to.eql('HISTORY / ROOT');
            })
    });

    it('folder -> file -> folder', function() {
        const folderBreadcrumbsLink = '//div[@class="breadcrumbs"]/a[3]';
        const lastFolderLink = '//div[@class="content"]/ul/li[last()]/a';
        const fileLink = '//div[@class="content"]/ul/li[last()]/a[1]';

        return this.browser
            .url('/')
            .click(lastCommitLink)
            .click(lastFolderLink)
            .click(fileLink)
            .click(folderBreadcrumbsLink)
            .getText('.breadcrumbs')
            .then((breadcrumbsText) => {
                expect(breadcrumbsText).to.eql('HISTORY / ROOT / views');
            })
    });
});