const assert = require('assert');

const testUtl = 'http://localhost:3000/';
const testUtlFile = 'http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
const testUtlContent = 'http://localhost:3000/content/90180910fc27a11272a3e5caeeb119a51e5c0545/package.json/';

describe('Переходы по хлебным крошкам', () => {
  it('Переход по хлебным крошкам -> history', function () {
    return this.browser
      .url(testUtlContent)
      .click('.breadcrumbs a:first-child')
      .assertExists('.commit:first-child', 'Нет истории коммитов')
      .assertUrl(testUtl, 'Ссылка не совпадает');
  });
  it('Переход по хлебным крошкам -> root', function () {
    return this.browser
      .url(testUtlContent)
      .click('.breadcrumbs a:nth-child(2)')
      .assertExists('.content ul', 'Нет списка файлов')
      .assertUrl(testUtlFile, 'Ссылка не совпадает');
  });
});
