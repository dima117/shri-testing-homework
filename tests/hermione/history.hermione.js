/* eslint-disable no-undef */
const assert  = require('assert');
const { indexUrl, commitData } = require('./testConstants');


describe('История коммитов', () => {
  it('Коммиты отображаются', function () {
    return this.browser
      .url(indexUrl)
      .isExisting('.content .commit')
      .then(exists => assert.ok(exists, 'коммит не отображается'));
  });

  it('Верстка корректна', function () {
    return this.browser
      .url(indexUrl)
      .assertView('plain', '.content');
  });

  it('У коммитов отображается хэш', function () {
    return this.browser
      .url(indexUrl)
      .getText('.commit .commit__link')
      .then(text => {
        assert.equal(
          text,
          commitData
            .map(item => item.hash)
            .join(','));
      });
  });

  it('У коммитов отображается автор', function () {
    return this.browser
      .url(indexUrl)
      .getText('.commit .commit__author')
      .then(text => {
        assert.equal(
          text,
          commitData
            .map(item => item.author)
            .join(','));
      });
  });

  it('У коммитов отображается дата', function () {
    return this.browser
      .url(indexUrl)
      .getText('.commit .commit__date')
      .then(text => {
        assert.equal(
          text,
          commitData
            .map(item => item.datetime)
            .join(','));
      });
  });

  it('У коммитов отображается сообщение', function () {
    return this.browser
      .url(indexUrl)
      .getText('.commit .commit__msg')
      .then(text => {
        assert.equal(
          text,
          commitData
            .map(item => item.message)
            .join(','));
      });
  });

  it('можно перейти к файлам коммита', function () {
    return this.browser
      .click('.commit a')
      .isExisting('.content')
      .then(exists => assert.ok(exists, 'файлы коммита не отобразились'));
  });
});
