const assert = require('assert');

const testUtl = 'http://localhost:3000/';
const testUtlFiles = 'http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
const testUtlSubFiles = 'http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/bin';
const testUtlContent = 'http://localhost:3000/content/90180910fc27a11272a3e5caeeb119a51e5c0545/bin/www';
const partUrl = '90180910fc27';

describe('Переходы по ссылкам', () => {
  it('Переход из списка коммитов на список файлов', function () {
    return this.browser
      .url(testUtl)
      .click(`a[href*="${partUrl}"]`)
      .assertExists('.content ul', 'Нет списка файлов')
      .assertUrl(testUtlFiles, 'Ссылка не совпадает');
  });
  it('Переход из списка файлов во вложенную папку', function () {
    return this.browser
      .url(testUtlFiles)
      .click('a[href*="bin"]')
      .assertExists('.content ul', 'Нет списка файлов')
      .assertUrl(testUtlSubFiles, 'Ссылка не совпадает');
  });
  it('Переход из списка файлов на страницу отдельного файла', function () {
    return this.browser
      .url(testUtlSubFiles)
      .click('a[href*="www"]')
      .assertExists('.file-content', 'Нет содержимого файла')
      .assertUrl(testUtlContent, 'Ссылка не совпадает');
  });
});
