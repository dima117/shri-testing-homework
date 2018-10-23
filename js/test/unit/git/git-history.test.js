const GitOperations = require('../../../utils/git');
const { assert } = require('chai');

suite(`gitHistory`, () => {
  test(`should use arguments with default pagination`, async () => {
    let actual;

    const gitOperations = new GitOperations((...args) => {
      actual = args[1];
      return Promise.resolve('')
    });
    gitOperations.gitHistory();

    const expected = [
      'log',
      '--pretty=format:%H%x09%an%x09%ad%x09%s',
      '--date=iso',
      '--skip',
      0,
      '-n',
      10
    ];

    assert.deepEqual(actual, expected);
  });

  test(`should use arguments with custom pagination`, async () => {
    const page = 2;
    const size = 20;

    let actual;

    const gitOperations = new GitOperations((...args) => {
      actual = args[1];
      return Promise.resolve('')
    });
    gitOperations.gitHistory(page, size);

    const expected = [
      'log',
      '--pretty=format:%H%x09%an%x09%ad%x09%s',
      '--date=iso',
      '--skip',
      20,
      '-n',
      20
    ];

    assert.deepEqual(actual, expected);
  });

  test(`should return correct git log`, async () => {
    const commitOne = ['test hash', 'test author', 'test timestamp', 'commit message'].join('\t');
    const commitTwo = ['test another hash', 'test another author', 'test another timestamp', 'commit another message'].join('\t');
    const commits = [commitOne, commitTwo].join('\n');

    const gitOperations = new GitOperations(() => Promise.resolve(commits));

    const actual = await gitOperations.gitHistory();
    const expected = [
      {
        hash: 'test hash',
        author: 'test author',
        timestamp: 'test timestamp',
        msg: 'commit message'
      },
      {
        hash: 'test another hash',
        author: 'test another author',
        timestamp: 'test another timestamp',
        msg: 'commit another message'
      }
    ];

    assert.deepEqual(actual, expected);
  });
});
