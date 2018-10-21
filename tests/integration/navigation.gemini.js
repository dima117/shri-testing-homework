const assert = require('assert');

const {
  TEST_COMMIT_HASH,
  TEST_FOLDER_NAME,
  TEST_FILE_NAME,
  BASE_URL,
  TEST_COMMIT_URL,
  TEST_FOLDER_URL,
  TEST_FILE_URL
} = require('./constants');

describe('проверка переходов по страницам', function() {
  it('переход из истории коммитов в корневой каталог работает', function() {
    return this.browser
      .url(BASE_URL)
      .click(`a=${TEST_COMMIT_HASH}`)
      .getUrl()
      .then(url => assert.equal(url, TEST_COMMIT_URL, 'Неверный url у коммита'))
      .element('.breadcrumbs')
      .getAttribute('a=HISTORY', 'href')
      .then(href => {
        return assert.equal(href, BASE_URL, 'Неверная ссылка в хлебных крошках на историю коммитов')
      });
  });

  it('переход из корневого каталога в папку работает', function() {
    return this.browser
      .url(TEST_COMMIT_URL)
      .element('.content')
      .click(`a=${TEST_FOLDER_NAME}`)
      .getUrl()
      .then(url => assert.equal(url, TEST_FOLDER_URL, 'Неверный url у папки'))
      .element('.breadcrumbs')
      .getAttribute('a=HISTORY', 'href')
      .then(href => {
        return assert.equal(href, BASE_URL, 'Неверная ссылка в хлебных крошках на историю коммитов')
      })
      .getAttribute('a=ROOT', 'href')
      .then(href => {
        return assert.equal(href, TEST_COMMIT_URL, 'Неверная ссылка в хлебных крошках на корневой каталог')
      });
  });

  it('переход из корневого каталога в файл работает', function() {
    return this.browser
      .url(TEST_COMMIT_URL)
      .element('.content')
      .click(`a=${TEST_FILE_NAME}`)
      .getUrl()
      .then(url => assert.equal(url, TEST_FILE_URL, 'Неверный url у файла'))
      .getAttribute('a=HISTORY', 'href')
      .then(href => {
        return assert.equal(href, BASE_URL, 'Неверная ссылка в хлебных крошках на историю коммитов')
      })
      .getAttribute('a=ROOT', 'href')
      .then(href => {
        return assert.equal(href, TEST_COMMIT_URL, 'Неверная ссылка в хлебных крошках на корневой каталог')
      });
  });

  it('переход из корневого каталога в историю коммитов работает', function() {
    return this.browser
      .url(TEST_COMMIT_URL)
      .element('.breadcrumbs')
      .click(`a=HISTORY`)
      .getUrl()
      .then(url => assert.equal(url, BASE_URL, 'Неверный url у истории коммитов'))
  });

  it('переход из папки в корневой каталог работает', function() {
    return this.browser
      .url(TEST_FOLDER_URL)
      .element('.breadcrumbs')
      .click(`a=ROOT`)
      .getUrl()
      .then(url => assert.equal(url, TEST_COMMIT_URL, 'Неверный url у корневого каталога'))
  });

  it('переход из файла в корневой каталог работает', function() {
    return this.browser
      .url(TEST_FILE_URL)
      .element('.breadcrumbs')
      .click(`a=ROOT`)
      .getUrl()
      .then(url => assert.equal(url, TEST_COMMIT_URL, 'Неверный url у корневого каталога'))
  });
});
