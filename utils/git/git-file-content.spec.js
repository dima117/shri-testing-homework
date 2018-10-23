const gitFileContent = require('./git-file-content')

// Fake execute-git.js
const executeGit = require('../../libs/execute-git')
jest.genMockFromModule('../../libs/execute-git')
jest.mock('../../libs/execute-git')
executeGit.mockResolvedValue('some content')

it('calls executeGit with right args', () => {
  expect.assertions(1)

  const hash = '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc';
  return Promise.resolve()
    .then(() => gitFileContent(hash))
    .then(() => 
      expect(executeGit).toBeCalledWith('git', ['show', hash])
    )
})

it('returns a promise that resolves to string', () => {
  expect.assertions(1)

  const fileContent = gitFileContent('')
  expect(fileContent && fileContent.then && fileContent.then(res => typeof res))
    .resolves.toBe('string')
})
