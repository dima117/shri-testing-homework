const gitFileTree = require('./git-file-tree')

const FILE_TREE = {
  original:
    '040000 tree 1aafcbc17ddc231f01694c6d14532e7953ba370a\tcontrollers\n' +
    '040000 tree f1b534fe4b6836243e4e5444a7f32dedb1d6f389\tpublic\n' +
    '040000 tree 5288d5699c786e17cb859ea0a10326a49d24cd25\tviews\n',
  parsed: [ { type: 'tree',
      hash: '1aafcbc17ddc231f01694c6d14532e7953ba370a',
      path: 'controllers' },
    { type: 'tree',
      hash: 'f1b534fe4b6836243e4e5444a7f32dedb1d6f389',
      path: 'public' },
    { type: 'tree',
      hash: '5288d5699c786e17cb859ea0a10326a49d24cd25',
      path: 'views' } 
  ]
}

// Fake execute-git.js
const executeGit = require('../../libs/execute-git')
jest.genMockFromModule('../../libs/execute-git')
jest.mock('../../libs/execute-git')
executeGit.mockResolvedValue(FILE_TREE.original)


it('calls executeGit with right args', () => {
  expect.assertions(1)

  const params = [
    'ls-tree', 
    '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc',
    'PATH'
  ]

  return Promise.resolve()
    .then(() => gitFileTree('30fc48ec578e6b0052f6ab9ea7a118fb31574cdc', 'PATH')) 
    .then(() => expect(executeGit).toBeCalledWith('git', [...params]))
})

it('parses tree correctly', () => {
  expect.assertions(1)

  expect(gitFileTree('h', 'p')).resolves.toEqual(FILE_TREE.parsed)
})
