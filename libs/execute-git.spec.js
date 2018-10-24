const executeGit = require('./execute-git')

// Fake child_process
const child_process = require('child_process')
jest.genMockFromModule('child_process')
child_process.execFile = jest.fn().mockImplementation(
  function (cmd, args, options, cb) {
    setImmediate(() => {
      cb(null, 'hypothetical git output')
    })
  });
const { execFile } = child_process

describe('command calls', () => {
  afterEach(() => execFile.mockClear());
  
  it('runs execFile once', () => {
    expect.assertions(1)
    return Promise.resolve()
      .then(() => executeGit('git', [], 'folder')) 
      .then(() => expect(execFile.mock.calls.length).toBe(1))
  })

  it('passes correct arguments to execFile', () => {
    expect.assertions(4)
    const executeGitArgs = [ 'git', [ 'arg1', 'arg2', 0, 1, 2 ], 'folder' ];
    const execFileArgs = [ 'git', [ 'arg1', 'arg2', 0, 1, 2 ], { cwd: 'folder' } ];

    return Promise.resolve()
      .then(() => executeGit(...executeGitArgs))
      .then(() => {
        const argsCalledWith = execFile.mock.calls[0]
        execFileArgs.map((arg, i, a) => expect(argsCalledWith[i]).toEqual(arg))
        expect(argsCalledWith[argsCalledWith.length - 1]).toBeInstanceOf(Function)
      })
  })

  it('resolves to string', () => {
    const executeGitPromise = executeGit('git', [], 'folder');
    expect(
      executeGitPromise && 
      executeGitPromise.then && 
      executeGit('git', [], 'folder')
        .then(res => typeof res)
    ).resolves.toBe('string')
  })
})
