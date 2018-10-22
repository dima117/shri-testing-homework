const gitFileContent = require('./git-file-content')

const mockExecuteGit = jest.fn()
  .mockName('executeGit')
  .mockResolvedValue('some content')

it('calls gitExecuter with right args', () => {
  expect.assertions(1)

  const hash = '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc';
  return gitFileContent(hash, mockExecuteGit)
    .then(() => 
      expect(mockExecuteGit).toBeCalledWith('git', ['show', hash])
    )
    .catch(e => console.error(e))
})

it('returns a string', () => {
  expect.assertions(1)

  expect(gitFileContent('', mockExecuteGit).then(res => typeof res))
    .resolves.toBe('string')
})
