const assert = require('assert');

describe('Список файлов.', () => {
    it('Проверка хлебных крошек и контента', function() {
        return this.browser
            .url('/files/172001aeb63bdfc4e3f01f29e30876022cf6ad45/')
            .isExisting('.breadcrumbs')
            .then(exists => {
                assert.ok(exists, 'Нет хлебных крошек');
            })
            .assertView('breadcrumbs', '.breadcrumbs')
            .isExisting('.content')
            .then(exists => {
                assert.ok(exists, 'Нет контента');
            })
            .isExisting('.content ul')
            .then(exists => {
                assert.ok(exists, 'Нет списка файлов');
            })
            .assertView('file-list', '.content ul');
    });
});