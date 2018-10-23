const assert = require('assert');

const hash = '38429bed94bd7c107c65fed6bffbf443ff0f4183';
const link = `files/${hash}/`;
const gitignore = `/content/${hash}/.gitignore`;
7

describe('Корректное содержимое страниц', () => {
  describe('История коммитов', () => {
    it('В истории есть коммит', function() {
      return this.browser
        .url('/')
        .assertExists('.commit', 'Нет коммитов');
    });
    describe('У коммита отображается информация', () => {
      it('Отображается информация', function() {
        return this.browser
          .url('/')
          .assertExists('.commit .commit__info', 'Нет информации');
      });
      it('Отображается автор', function() {
        return this.browser
          .url('/')
          .assertExists('.commit .commit__author', 'Нет автора коммита');
      });
      it('Отображается время', function() {
        return this.browser
          .url('/')
          .assertExists('.commit .commit__date', 'Нет времени коммита');
      });
    });
    it('У коммита отображается сообщение', function() {
      return this.browser
        .url('/')
        .assertExists('.commit .commit__msg', 'Нет сообщения коммита');
    });
    it('У коммита отображается ссылка', function() {
      return this.browser
        .url('/')
        .assertExists('.commit .commit__link', 'Нет ссылки на коммит');
    });
  });

describe('Для самого первого коммита', () => {
  describe('Файловая система', () => {
    it('При клике на коммит отображается каталог файлов', function() {
      return this.browser
        .url('/')
        .click('.commit:last-child .commit__link a')
        .assertExists('.content ul', 'Нет файлов')
        .assertView('plain', 'ul');
    });
    
  });
  describe('Содержимое файла', () => {
    it('При клике на файл .gitignore отображается содержимое файла: node_modules', function() {
      return this.browser
        .url(gitignore)
        .assertText('.file-content', 'node_modules')
        .assertView('plain', '.content');
    });
  });
});
  describe('Хлебные крошки', () => {
    it('На начальном экране отображаются хлебные крошки', function() {
      return this.browser
        .url('/')
        .assertExists('.breadcrumbs', 'Нет хлебных крошек')
        .assertView('plain', '.breadcrumbs');
    });
    it('На начальном экране текст хлебных крошек равен HISTORY', function() {
      return this.browser
        .url('/')
        .assertText('.breadcrumbs', 'HISTORY')
    });
  });

});

