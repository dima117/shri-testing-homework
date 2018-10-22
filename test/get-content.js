const { getContent } = require('../utils/page-content');
const { assert, expect } = require('chai');

suite(`getContent`, () => {
  test(`should return same content string`, () => {
    const content = 'string';
    const hash = 'b4427cfc3e128ae2aaf48aefee04dd6324960e9a';
    const path = ['text.js'];

    const actual = getContent(content, hash, path).content;
    const expected = content;

    assert.strictEqual(actual, expected);
  });

  test(`should return object with correct property`, () => {
    const content = 'string';
    const hash = 'b4427cfc3e128ae2aaf48aefee04dd6324960e9a';
    const path = ['text.js'];

    const result = getContent(content, hash, path);

    expect(result).to.have.property('title', 'content');
    expect(result).to.have.property('breadcrumbs');
  });
});
