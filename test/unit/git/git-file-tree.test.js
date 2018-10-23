const GitOperations = require('../../../utils/git');
const { assert } = require('chai');

suite(`gitFileTree`, () => {
  test(`should use arguments with hash`, async () => {
    const hash = 'test hash';

    let actual;
    const expected = ['git', ['ls-tree', hash]];

    const gitOperations = new GitOperations((...args) => {
      actual = args;
      return Promise.resolve('')
    });
    gitOperations.gitFileTree(hash);

    assert.deepEqual(actual, expected);
  });

  test(`should use arguments with hash and path`, async () => {
    const hash = 'test hash';
    const path = 'test/path';

    let actual;
    const expected = ['git', ['ls-tree', hash, path]];

    const gitOperations = new GitOperations((...args) => {
      actual = args;
      return Promise.resolve('')
    });
    gitOperations.gitFileTree(hash, path);

    assert.deepEqual(actual, expected);
  });

  test(`should return correct file tree`, async () => {
    const hash = 'test hash';

    const fileOne = '100644 tree 3f208cc881404d558d1fd59c54f4207562a9d2f\tfolder';
    const fileTwo = '040000 blob 95438cc881404d558d1fd59c54f4207562a9d2f\ttext.js';
    const files = [fileOne, fileTwo].join('\n');

    const gitOperations = new GitOperations(() => Promise.resolve(files));

    const actual = await gitOperations.gitFileTree(hash);
    const expected = [
      {
        type: 'tree',
        hash: '3f208cc881404d558d1fd59c54f4207562a9d2f',
        path: 'folder'
      },
      {
        type: 'blob',
        hash: '95438cc881404d558d1fd59c54f4207562a9d2f',
        path: 'text.js'
      }
    ];

    assert.deepEqual(actual, expected);
  });
});
