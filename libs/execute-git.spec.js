const executeGit = require('./execute-git')

describe('command calls', () => {
  const mockExecFile = jest.fn()
    .mockName('execFile')
    .mockImplementation(function (cmd, args, options, cb) {
      setImmediate(() => {
        cb(null, 'hypothetical git output')
      })
    });
  
  afterEach(() => mockExecFile.mockClear());
  
  it('runs APIFunc once', () => {
    expect.assertions(1)
    return executeGit('git', [], 'folder', mockExecFile)
      .then(() => expect(mockExecFile.mock.calls.length).toBe(1))
  })

  it('passes correct arguments to APIFunc', () => {
    expect.assertions(4)
    const executeGitArgs = [ 'git', [ 'arg1', 'arg2', 0, 1, 2 ], 'folder', mockExecFile ];
    const execFileArgs = [ 'git', [ 'arg1', 'arg2', 0, 1, 2 ], { cwd: 'folder' } ];

    return executeGit(...executeGitArgs)
      .then(() => {
        const argsCalledWith = mockExecFile.mock.calls[0]
        execFileArgs.map((arg, i, a) => expect(argsCalledWith[i]).toEqual(arg))
        expect(argsCalledWith[argsCalledWith.length - 1]).toBeInstanceOf(Function)
      })
  })

  it('returns a string', () => {
    expect(executeGit('git', [], 'folder', mockExecFile).then(res => typeof res)).resolves.toBe('string')
  })
})
