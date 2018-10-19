const assert = require('chai').assert;
const expect = require('chai').expect;


describe('История коммитов', function() {
  it('блок с "хлебными крошками" есть и корректно отображается', function() {
    return this.browser
      .url('/')
      .assertExists(
        '.breadcrumbs',
        '"Хлебных крошек" нет на сайте'
      )
      .assertView('plain', '.breadcrumbs');
  });


  it('есть блок с контентом', function() {
    return this.browser
      .url('/')
      .assertExists('.content', 'нет блока с контентом')
  });


  it('есть коммиты в блоке с контентом', function() {
    return this.browser
      .url('/')
      .assertExists('.content .commit', 'блок контентом пуст')
  });
});


describe('Информация о коммите', function() {
  it('есть блок с информацией', function() {
    return this.browser
      .url('/')
      .assertExists('.commit:first-child .commit__info', 'нет блока с информацией о коммите')
  });


  it('есть элемент c информацией об авторе есть и он не пуст ', function() {
    return this.browser
      .url('/')
      .expectTextContent('.commit:first-child  .commit__author')
  });


  it('есть элемент c информацией о дате есть и он не пуст ', function() {
    return this.browser
      .url('/')
      .expectTextContent('.commit:first-child  .commit__date')
  });


  it('есть элемент с сообщением коммита и он не пуст', function() {
    return this.browser
      .url('/')
      .expectTextContent('.commit:first-child .commit__msg')
  });


  it('есть элемент с ссылкой на коммит', function() {
    return this.browser
      .url('/')
      .assertExists('.commit:first-child .commit__link', 'нет элемента с ссылкой на коммит')
      .assertExists('.commit:first-child .commit__link > a')
      .getAttribute('.commit:first-child .commit__link > a', 'href')
      .then((href) => expect(href).not.empty)
  });
});