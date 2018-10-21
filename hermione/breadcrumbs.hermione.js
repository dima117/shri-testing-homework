const assert = require('assert');

describe('Хлебные крошки', () => {
  it('выглядят корректно', function () {
    return this.browser
      .buildUrl('content/b7e2f3447e3bcf2507a4162959a62389b48dada7/.gitignore')
      .assertView('plain', '.breadcrumbs')
      .isExisting('.breadcrumbs')
      .then((exists) => {
        assert.ok(exists, 'не появились');
      });
  });

  it('позволяют вернуться на главную страницу', function () {
    return this.browser
      .buildUrl('files/b7e2f3447e3bcf2507a4162959a62389b48dada7/')
      .getAttribute('.breadcrumbs > a', 'href')
      .then((href) => {
        assert.strictEqual(href, 'http://localhost:3000/');
      });
  });
})
