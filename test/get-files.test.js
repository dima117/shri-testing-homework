const { getFiles } = require('../utils/page-content');
const { assert, expect } = require('chai');

suite(`getFiles`, () => {
  test(`should return empty files if list is not array`, () => {
    const list = 'string';
    const hash = 'b4427cfc3e128ae2aaf48aefee04dd6324960e9a';
    const pathParam = [];
    const actual = getFiles(list, hash, pathParam).files;

    assert.isEmpty(actual);
  });

  test(`should return empty list if history is empty array`, () => {
    const list = [];
    const hash = 'b4427cfc3e128ae2aaf48aefee04dd6324960e9a';
    const pathParam = [];
    const actual = getFiles(list, hash, pathParam).files;

    assert.isEmpty(actual);
  });

  test(`should return correct length`, () => {
    const list = [
      {
        type: 'blob',
        hash: '37d38bbbbfc822b4c43cf77dc93150d7595ffe1f',
        path: '.editorconfig'
      },
      {
        type: 'tree',
        hash: '9122497bfdd68cbf75f63ec3ef3d2e22b3eadb4b',
        path: '.eslintrc.js'
      }
    ];
    const hash = 'b4427cfc3e128ae2aaf48aefee04dd6324960e9a';
    const pathParam = [];

    const actual = getFiles(list, hash, pathParam).files.length;
    const expect = 2;

    assert.strictEqual(actual, expect);
  });
  //
  test(`should return object with correct property`, () => {
    const list = [
      {
        type: 'blob',
        hash: '37d38bbbbfc822b4c43cf77dc93150d7595ffe1f',
        path: 'text.js'
      },
      {
        type: 'tree',
        hash: '9122497bfdd68cbf75f63ec3ef3d2e22b3eadb4b',
        path: 'folder'
      }
    ];
    const hash = 'b4427cfc3e128ae2aaf48aefee04dd6324960e9a';
    const pathParam = [];

    const result = getFiles(list, hash, pathParam);

    expect(result).to.have.property('title', 'files');
    expect(result).to.have.property('breadcrumbs');
    expect(result.files[0]).to.have.property('href', `/content/${hash}/${list[0].path}`);
    expect(result.files[1]).to.have.property('href', `/files/${hash}/${list[1].path}`);
  });
});
