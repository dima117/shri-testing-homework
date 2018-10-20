var expect  = require('chai').expect;

describe('Содержимое страниц', () => {
    const lastCommitLink = '//div[@class="commit"][last()]/div[@class="commit__link"]/a';

    it('Содержимое истории коммитов', async function() {
        const exists = await this.browser
            .url('/')
            .isExisting('.commit');

        expect(exists).to.be.true;
    });

    it('Коммит содержит автора', async function() {
        const exists = await this.browser
            .url('/')
            .isExisting('.commit__author');
        
        expect(exists).to.be.true;
    });

    it('Коммит содержит дату', async function() {
        const exists = await this.browser
            .url('/')
            .isExisting('.commit__date');
            
        expect(exists).to.be.true;
    });

    it('Коммит содержит сообщение', async function() {
        const exists = await this.browser
            .url('/')
            .isExisting('.commit__msg');
            
        expect(exists).to.be.true;
    });

    it('Содержимое файловой системы', async function() {
        const exists = await this.browser
            .url('/')
            .click(lastCommitLink)
            .isExisting('.content');
        
        expect(exists).to.be.true;
    });

    it('Содержимое файла', async function() {
        const fileLink = '//div[@class="content"]/ul/li[2]/a';

        const exists = await this.browser
            .url('/')
            .click(lastCommitLink) 
            .click(fileLink) 
            .isExisting('.file-content');

        expect(exists).to.be.true;
    });
});