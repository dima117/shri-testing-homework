const assert = require('assert');

const hash = 'b935074de54f9b3c8ebfac7e6b53274b16f34837';
const file = '.gitignore';
const url = `/content/${hash}/${file}`;

describe('Правильно работает страница отображения файла', () => {
    it('Правильно отображается блок хлебных крошек', function () {
        return this.browser
            .url(url)
            .isExisting('.breadcrumbs')
            .then(exists => assert.ok(exists))
            .assertView('fileBreadcrumbs', '.breadcrumbs')
    });

    it('Правильно отображается блок содержания файла', function () {
        return this.browser
            .url(url)
            .isExisting('.file-content')
            .then(exists => assert.ok(exists))
            .assertView('fileContent', '.file-content');
    });
});
