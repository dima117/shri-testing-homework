describe('Контент главной страницы', () => {

    it('Есть хлебные крошки', function() {
        this.browser
            .url('/')
            .assertExists('.breadcrumbs', 'Нет хлебных крошек')
            .assertView('plain', '.breadcumbs');
    });

     it('Есть хотя бы один коммит', function() {
        this.browser
            .url('/')
            .assertExists('.commit:last-child', 'Нет ни одного коммита')
            .assertView('plain', '.commit:last-child');
    });

    describe('Содержимое коммита', () => {

        it('У коммита есть автор', function() {
            this.browser
                .url('/')
                .assertExists('.commit:last-child .commit__author', 'У коммита нет автора');
        });

        it('У коммита есть дата/время', function() {
            this.browser
                .url('/')
                .assertExists('.commit:last-child .commit__date', 'У коммита нет даты');
        });
        
        it('У коммита есть сообщение', function() {
            this.browser
                .url('/')
                .assertExists('.commit:last-child .commit__msg', 'У коммита нет сообщения');
        });

        it('У коммита есть ссылка', function() {
            this.browser
                .url('/')
                .assertExists('.commit:last-child .commit__link', 'У коммита нет ссылки');
        });

    });

});

describe('Просмотр папки', () => {

    it('Есть хлебные крошки', function() {
        this.browser
            .url('/')
            .click('.commit:last-child a')
            .assertExists('.breadcrumbs', 'Нет хлебных крошек')
            .assertView('plain', '.breadcumbs');
    });

    it('Есть структура файлов', function() {
        this.browser
            .url('/')
            .click('.commit:last-child a')
            .assertExists('.content ul li', 'Нет дерева файлов')
    });

});
    
describe('Просмотр файла', () => {

    it('Есть хлебные крошки', function() {
        this.browser
            .url('/')
            .click('.commit:last-child a')
            .click('.content li a:first-child')
            .assertExists('.breadcrumbs', 'Нет хлебных крошек')
            .assertView('plain', '.breadcumbs');
    });

    it('Есть содержимое файла', function() {
        this.browser
            .url('/')
            .click('.commit:last-child a')
            .click('.content li a:first-child')
            .assertExists('.file-content', 'Нет cодежимого файла')
    });

});