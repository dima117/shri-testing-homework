const assert = require('assert');

const server = 'http://localhost:3000/';
const hash = '38429bed94bd7c107c65fed6bffbf443ff0f4183';
const link = `${server}files/${hash}/`;
const views = `${server}files/${hash}/views`;
const gitignore = `${server}content/${hash}/.gitignore`;


describe('Навигация по сайту', () => {
  describe('Корректно работают переходы по страницам', () => {
    it('Переход из списка коммитов на список файлов', function() {
      return this.browser
        .url('/')
        .click('.commit:last-child .commit__link a')
        .assertLink(link);
    });
    it('Переход из списка файлов во вложенную папку', function() {
      return this.browser
        .url(link)
        .click('.content ul li:last-child a')
        .assertLink(views);
    });
    it('Переход из списка файлов на страницу отдельного файла', function() {
      return this.browser
        .url(link)
        .click('.content ul li:first-child a')
        .assertLink(gitignore);
    });
  });

  describe('Переходы по хлебным крошкам', () => {
    describe('В списке файлов', () => {
      it('В хлебных крошках отображается корректная структура', function() {
        return this.browser
          .url('/')
          .click('.commit:last-child .commit__link a')
          .assertText('.breadcrumbs', 'HISTORY / ROOT');
      });
      it('Можно вернуться в корень сайта', function() {
        return this.browser
          .url(link)
          .click('.breadcrumbs a:first-child')
          .assertLink(server);
      });
    });

    describe('Во вложенной папке', () => {
      it('В хлебных крошках отображается корректная структура', function() {
        return this.browser
          .url(views)
          .assertText('.breadcrumbs', 'HISTORY / ROOT / views');
      });
      it('Можно вернуться в корень сайта', function() {
        return this.browser
          .url(views)
          .click('.breadcrumbs a:nth-child(2)')
          .assertLink(link);
      });
    });
  });

});