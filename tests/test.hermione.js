const assert = require('chai').assert;

describe('Проверка страниц', () => {
    it('Шапка должна появиться на главной странице', function() {
        return this.browser
            .url('/')
            .assertView('plain_breadcrumbs_home', '.breadcrumbs');
    });

    it('Блок commit должен появиться на главной странице', function() {
        return this.browser
            .url('/')
            .isExisting('.commit')
            .then( exists => {
                assert.ok(exists, 'блок commit не появилась');
            });
    });
    it('Шапка страницы должна появиться на files странице', function() {
        return this.browser
            .url('/files/384a5c4674d5bff63679251a46eef8c6aba254ca/')
            .assertView('plain_breadcrumbs_files', '.breadcrumbs');
    });

    it('Блок content должен появиться на files странице', function() {
        return this.browser
            .url('/files/384a5c4674d5bff63679251a46eef8c6aba254ca/')
            .isExisting('.content')
            .then(exists => {
                assert.ok(exists, 'блок content не появилась');
            });
    });
    it('Шапка страницы должна появиться на content странице', function() {
        return this.browser
            .url('/content/384a5c4674d5bff63679251a46eef8c6aba254ca/README.md')
            .assertView('plain_breadcrumbs_content', '.breadcrumbs');
    });

    it('Блок content должен появиться на content странице', function() {
        return this.browser
            .url('/content/384a5c4674d5bff63679251a46eef8c6aba254ca/README.md')
            .isExisting('.content')
            .then(exists => {
                assert.ok(exists, 'блок content не появилась');
            });
    });

    it('Переход на файловую структуру коммита', function() {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .assertView('plain_breadcrumbs_to_files', '.breadcrumbs');
    });

    it('Переход на главнуй страницу c content страницы по хлебным крошкам', function() {
        return this.browser
            .url('/content/384a5c4674d5bff63679251a46eef8c6aba254ca/README.md')
            .click('.breadcrumbs a:first-child')
            .assertView('plain_breadcrumbs_to_home', '.breadcrumbs');
    });

    it('Переход на files страницу c content страницы по хлебным крошкам', function() {
        return this.browser
            .url('/content/384a5c4674d5bff63679251a46eef8c6aba254ca/README.md')
            .click('.breadcrumbs a:last-child')
            .assertView('plain_breadcrumbs_to_files', '.breadcrumbs');
    });

    it('Переход на главнуй страницу c files страницы по хлебным крошкам', function() {
        return this.browser
            .url('/files/384a5c4674d5bff63679251a46eef8c6aba254ca/')
            .click('.breadcrumbs a:first-child')
            .assertView('plain_breadcrumbs_to_home2', '.breadcrumbs');
    });
});