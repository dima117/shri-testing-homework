/* eslint-disable no-undef */
const assert = require('assert');

const { fileUrlParts } = require('./testConstants');
const commitRoot = fileUrlParts.slice(0, 3).join('/') + '/';

describe('Файлы коммита: ', () => {
  it('отображаются', function () {
    return this.browser
      .url(commitRoot)
      .isExisting('.content')
      .then(exists => assert.ok(exists, 'Файлы коммита не отображаются'));
  });

  it('соответствуют макету', function () {
    return this.browser
      .url(commitRoot)
      .assertView('plain', '.content');
  });

  it('можно перейти внутрь директории', function () {
    return this.browser
      .url(commitRoot)
      .click('.content a:first-child')
      .isExisting('.content ul')
      .then(exists => assert.ok(exists, 'файлы внутри директории не появились'))
      .assertView('plain', '.content');
  });

  it('можно открыть файл', function () {
    return this.browser
      .url(commitRoot)
      .click('.content a')
      .click('.content a')
      .isExisting('.content .file-content')
      .then(exists => assert.ok(exists, 'содержимое файла не появилось'))
      .assertView('plain', '.content');
  });
});
