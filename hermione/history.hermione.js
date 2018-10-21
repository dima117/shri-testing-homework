const assert = require('assert');

describe('История коммитов.', () => {
    it('Проверка хлебных крошек и контента', function() {
        return this.browser
            .url('/')
            .isExisting('.breadcrumbs')
            .then(exists => {
                assert.ok(exists, 'Нет хлебных крошек');
            })
            .getText('.breadcrumbs')
            .then(text => {
                assert.equal(text, 'HISTORY', 'Текст хлебных крошек не соответствует');
            })
            .isExisting('.content')
            .then(exists => {
                assert.ok(exists, 'Нет контента');
            })
            .isExisting('.content .commit:last-child')
            .then(exists => {
                assert.ok(exists, 'Нет начального коммита');
            })
            .assertView('initial-commit', '.content .commit:last-child');
    });
});