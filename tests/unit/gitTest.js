const {Git} = require('../../utils/git');
const {expect} = require('chai');

class MockedCmd {

  constructor(expectedArgs, mockedOut) {
    this.expectedArgs = expectedArgs;
    this.mockedOut = mockedOut;
  }

  result(cmd, args) {
    return new Promise((resolve) => {
      if (cmd !== 'git') {
        throw new Error('Called not git!');
      }
      expect(args).to.deep.equal(this.expectedArgs);
      resolve(this.mockedOut);
    });
  }
}

describe('from git', () => {
  it('got file content', async () => {
    const git = new Git(
      new MockedCmd(
        ['show', '123'],
        'commit 123'
      )
    );

    const content = await git.fileContent('123');

    expect(content).to.equal('commit 123')
  });

  it('got file tree', async () => {
    const git = new Git(
      new MockedCmd(
        ['ls-tree', 'b534c5ea92f7df1c525a63bb3954b8cfad35f7fe', 'dir/'],
        '100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8\tREADME.md\n' +
        '100644 blob 70461d5f9009344d9933e889b0448aa3f18d83d9\tapp.js\n' +
        '040000 tree 152db3caa8a0d01acc76abc9df36e6b432ad1e55\tbin'
      )
    );

    const content = await git.fileTree("b534c5ea92f7df1c525a63bb3954b8cfad35f7fe", 'dir/');

    expect(content).to.deep.equal(
      [
        {
          "hash": "ead09676a936eb50ed700dad0d280d65c3df21d8",
          "path": "README.md",
          "type": "blob"
        },
        {
          "hash": "70461d5f9009344d9933e889b0448aa3f18d83d9",
          "path": "app.js",
          "type": "blob"
        },
        {
          "hash": "152db3caa8a0d01acc76abc9df36e6b432ad1e55",
          "path": "bin",
          "type": "tree"
        }
      ]
    )
  });

  it('got history', async () => {
    const git = new Git(
      new MockedCmd(
        ["log", "--pretty=format:%H%x09%an%x09%ad%x09%s", "--date=iso", "--skip", 0, "-n", 3],
        '5ea7233af5fdf9d50f38eab58972a0eca7fa468e\tpreigile\t2018-10-25 20:58:09 +0300\trewrite git.js to class\n' +
        'b534c5ea92f7df1c525a63bb3954b8cfad35f7fe\tpreigile\t2018-10-22 00:19:39 +0300\tfix history test\n' +
        '8346b533f687fe149184e6a6d2d1b2cdc3dce6e4\tpreigile\t2018-10-21 23:29:53 +0300\tIntegration tests'
      )
    );

    const content = await git.history(1, 3);

    expect(content).to.deep.equal(
      [
        {
          "author": "preigile",
          "hash": "5ea7233af5fdf9d50f38eab58972a0eca7fa468e",
          "msg": "rewrite git.js to class",
          "timestamp": "2018-10-25 20:58:09 +0300",
        },
        {
          "author": "preigile",
          "hash": "b534c5ea92f7df1c525a63bb3954b8cfad35f7fe",
          "msg": "fix history test",
          "timestamp": "2018-10-22 00:19:39 +0300",
        },
        {
          "author": "preigile",
          "hash": "8346b533f687fe149184e6a6d2d1b2cdc3dce6e4",
          "msg": "Integration tests",
          "timestamp": "2018-10-21 23:29:53 +0300",
        }
      ]
    )
  });
});
