var expect  = require('chai').expect;

describe('Содержимое страниц', () => {
    const lastCommitLink = '//div[@class="commit"][last()]/div[@class="commit__link"]/a';

    it('История коммитов содержит коммиты', async function() {
        const exists = await this.browser
            .url('/')
            .assertView('plain', '.commit')
            .isExisting('.commit');

        expect(exists).to.be.true;
    });

    it('Коммит содержит автора', async function() {
        const exists = await this.browser
            .url('/')
            .assertView('plain', '.commit__author')
            .isExisting('.commit__author');
        
        expect(exists).to.be.true;
    });

    it('Коммит содержит дату', async function() {
        const exists = await this.browser
            .url('/')
            .assertView('plain', '.commit__date')
            .isExisting('.commit__date');
            
        expect(exists).to.be.true;
    });

    it('Коммит содержит сообщение', async function() {
        const exists = await this.browser
            .url('/')
            .assertView('plain', '.commit__msg')
            .isExisting('.commit__msg');
            
        expect(exists).to.be.true;
    });

    it('Файловая система имеет содержимое', async function() {
        const exists = await this.browser
            .url('/')
            .click(lastCommitLink)
            .assertView('plain', '.content')
            .isExisting('.content');
        
        expect(exists).to.be.true;
    });

    it('Файл имеет содержимое', async function() {
        const fileLink = '//div[@class="content"]/ul/li[2]/a';

        const exists = await this.browser
            .url('/')
            .click(lastCommitLink) 
            .click(fileLink) 
            .assertView('plain', '.file-content')
            .isExisting('.file-content');

        expect(exists).to.be.true;
    });
});