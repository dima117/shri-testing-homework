const GitOperations = require('../../../utils/git');
const { assert } = require('chai');

suite(`gitFileContent`, () => {
  test(`should use arguments with hash`, async () => {
    const hash = 'test hash';

    let actual;
    const expected = ['git', ['show', hash]];

    const gitOperations = new GitOperations((...args) => {
      actual = args;
      return Promise.resolve('')
    });

    gitOperations.gitFileContent(hash);

    assert.deepEqual(actual, expected);
  });
});
