const { buildObjectUrl } = require('../../../utils/navigation');
const { assert } = require('chai');

const hash = 'f14d98df73bb0e8dd276edf43019b7244557f8b0';
const objectTreePath = {
  type: 'tree',
  path: 'folder'
};
const objectBlobPath = {
  type: 'blob',
  path: 'file.txt'
};
const objectFilePath = {
  type: 'file',
  path: 'file.txt'
};

suite(`buildObjectUrl`, () => {
  test(`should return # when hash is undefined `, () => {
    const hash = undefined;

    const actual = buildObjectUrl(hash, objectTreePath);
    const expected = '#';

    assert.strictEqual(actual, expected);
  });

  test(`should return # when objectPath is undefined `, () => {
    const objectPath = undefined;

    const actual = buildObjectUrl(hash, objectPath);
    const expected = '#';

    assert.strictEqual(actual, expected);
  });

  test(`should return # when type is incorrect `, () => {
    const actual = buildObjectUrl(hash, objectFilePath);
    const expected = '#';

    assert.strictEqual(actual, expected);
  });

  test(`should return correct link on files when hash and objectPath are defined `, () => {
    const actual = buildObjectUrl(hash, objectTreePath);
    const expected = `/files/${hash}/${objectTreePath.path}`;

    assert.strictEqual(actual, expected);
  });

  test(`should return correct link on content when hash and objectPath are defined `, () => {
    const actual = buildObjectUrl(hash, objectBlobPath);
    const expected = `/content/${hash}/${objectBlobPath.path}`;

    assert.strictEqual(actual, expected);
  });
});
