const {Git} = require('../utils/git');
const {expect} = require('chai');

const repoContentByCmd = {
  'log':
    'cc228\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
    '7e013\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n' +
    'f2df8\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n',
  'ls-tree':
    '100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore\n' +
    '100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8\tREADME.md\n' +
    '100644 blob 70461d5f9009344d9933e889b0448aa3f18d83d9\tapp.js\n' +
    '040000 tree 152db3caa8a0d01acc76abc9df36e6b432ad1e55\tbin\n',
  'show':
    '\t\tnode_modules\n',
};
const stubExecuteMethod = (...args) => {
  const [cmd,] = args[0];

  return Promise.resolve(repoContentByCmd[cmd]);
};
const gitWithFakeExecutor = new Git('', stubExecuteMethod);

describe('Git history', function () {
  it('parse right full repo', async function () {
    const resultExpected = [
      {
        "author": "Dmitry Andriyanov",
        "hash": "cc228",
        "msg": "readme",
        "timestamp": "2018-10-16 12:36:32 +0300"
      },
      {
        "author": "Dmitry Andriyanov",
        "hash": "7e013",
        "msg": "codestyle",
        "timestamp": "2018-10-16 12:10:05 +0300"
      },
      {
        "author": "Dmitry Andriyanov",
        "hash": "f2df8",
        "msg": "стили",
        "timestamp": "2018-10-16 12:02:11 +0300"
      }
    ];

    const result = await gitWithFakeExecutor.getHistory();

    expect(result).to.deep.equal(resultExpected);
  });

  it('parse right empty repo', async function () {
    const stubExecuteMethod = (...args) => {
      return Promise.resolve('');
    };
    const gitWithFakeExecutor = new Git('', stubExecuteMethod);

    const resultExpected = [];

    const result = await gitWithFakeExecutor.getHistory();

    expect(result).to.deep.equal(resultExpected);
  });

});

describe('Git file tree', function () {
  it('parse right', async function () {
    const resultExpected = [
      {
        type: 'blob',
        hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
        path: '.gitignore'
      },
      {
        type: 'blob',
        hash: 'ead09676a936eb50ed700dad0d280d65c3df21d8',
        path: 'README.md'
      },
      {
        type: 'blob',
        hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
        path: 'app.js'
      },
      {
        type: 'tree',
        hash: '152db3caa8a0d01acc76abc9df36e6b432ad1e55',
        path: 'bin'
      },
    ];

    const result = await gitWithFakeExecutor.getFileTree();

    expect(result).to.deep.equal(resultExpected);
  });
});

describe('Git file content viewer', function () {
  it('does not mutate content', async function () {
    const resultExpected = '\t\tnode_modules\n';

    const result = await gitWithFakeExecutor.getContent();

    expect(result).to.equal(resultExpected);
  });
});
