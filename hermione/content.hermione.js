const assert = require('assert');

describe('Содержимое файла.', () => {
    it('Проверка хлебных крошек и контента', function() {
        return this.browser
            .url('http://localhost:3000/content/172001aeb63bdfc4e3f01f29e30876022cf6ad45/utils/navigation.js')
            .isExisting('.breadcrumbs')
            .then(exists => {
                assert.ok(exists, 'Нет хлебных крошек');
            })
            .assertView('content__breadcrumbs', '.breadcrumbs')
            .isExisting('.content')
            .then(exists => {
                assert.ok(exists, 'Нет контента');
            })
            .isExisting('.content .file-content')
            .then(exists => {
                assert.ok(exists, 'Нет содержимого файла');
            })
            .assertView('file-content', '.content .file-content');
    });
});