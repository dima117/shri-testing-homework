const { expect } = require('chai');

describe('Страница с файловой системой', () => {
  it('блок с "хлебными крошками" есть и корректно отображается', function () {
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .assertExists(
        '.breadcrumbs',
        '"Хлебных крошек" нет на сайте',
      )
      .assertView('plain', '.breadcrumbs');
  });


  it('блок с "хлебными крошками" содержит ссылку на главную страницу', function () {
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .assertExists(
        '.breadcrumbs > a',
        '"Хлебных крошек" нет на сайте',
      )
      .getAttribute('.breadcrumbs > a', 'href')
      .then((href) => {
        expect(href).not.empty;
      });
  });


  it('есть блок с контентом', function () {
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .assertExists('.content', 'нет блока с контентом');
  });


  it('файлы и папки отображаются в виде не нумерованного списка', function () {
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .assertExists('.content > ul > li:first-child', 'нет списка файлов');
  });


  it('ненумерованный список файловой системы содержит в себе ссылки на содержимое', function () {
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .assertExists('.content > ul > li:first-child > a', 'нет ссылки на содержимое')
      .getAttribute('.content > ul > li:first-child > a', 'href')
      .then((href) => {
        expect(href).not.empty;
      });
  });
});
