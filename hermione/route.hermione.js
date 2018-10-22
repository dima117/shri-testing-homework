var { expect }  = require('chai');

describe('Переходы по страницам', () => {

    it('Главная => папка', async function() {
        const result = await this.browser
            .url('/')
            .click('.commit:last-child a')
            .getText('.breadcrumbs');
        
        expect(result).to.be.equal('HISTORY / ROOT');
    });

    it('Главная => папка => вложенный файл', async function() {
        const url = await this.browser
            .url('/')
            .click('.commit:last-child a')
            .click('.content li a:first-child')
            .getUrl();
        const fileName = url.split('/');
        const result = await this.browser
            .url(url)
            .getText('.breadcrumbs');
        
        expect(result).to.be.equal('HISTORY / ROOT / ' + fileName[fileName.length-1]);
    });

    it('Главная => папка => вложенная папка', async function() {
        const url = await this.browser
            .url('/')
            .click('.commit:last-child a')
            .click('.content li a:last-child')
            .getUrl();
        const fileName = url.split('/');
        const result = await this.browser
             .url(url)
            .getText('.breadcrumbs');
        
        expect(result).to.be.equal('HISTORY / ROOT / ' + fileName[fileName.length-1]);
    });

    it('Главная => папка => вложенная папка => файл', async function() {
        const folderUrl = await this.browser
            .url('/')
            .click('.commit:last-child a')
            .click('.content li:last-child a')
            .getUrl();
        const folderName = folderUrl.split('/');
        const fileUrl = await this.browser
            .url(folderUrl)
            .click('.content li:last-child a')
            .getUrl();
        const fileName = fileUrl.split('/');
        const result = await this.browser
            .url(fileUrl)
            .getText('.breadcrumbs');
        
        expect(result).to.be.equal('HISTORY / ROOT / ' + folderName[folderName.length-1] + ' / ' + fileName[fileName.length-1]);
    });

    it('Возврат по хлебным крошкам', async function() {
        const result = await this.browser
            .url('/')
            .click('.commit:last-child a')
            .click('.breadcrumbs a:first-child')
            .getText('.breadcrumbs')
            .assertExists('.commit', 'Переход по крошкам не работает');
    });

});