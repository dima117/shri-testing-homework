const gitHistory = require('./git-history');

const PAGES = [
  {
    original: 
      'f2df8ac23e817f6da01624a77ec050a0147f642a\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n' +
      '0f7b962409d6980236944164c5b0c9f43f9348e9\tDmitry Andriyanov\t2018-10-16 11:54:32 +0300\tхлебные крошки\n' +
      '82810cf7d56476059477aaa5ff55c99ff191be29\tDmitry Andriyanov\t2018-10-16 11:25:59 +0300\tисправлена ошибка',
    parsed: [ 
      { hash: 'f2df8ac23e817f6da01624a77ec050a0147f642a',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:02:11 +0300',
        msg: 'стили' },
      { hash: '0f7b962409d6980236944164c5b0c9f43f9348e9',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 11:54:32 +0300',
        msg: 'хлебные крошки' },
      { hash: '82810cf7d56476059477aaa5ff55c99ff191be29',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 11:25:59 +0300',
        msg: 'исправлена ошибка' } 
    ]
  },
  {
    original:
      '82810cf7d56476059477aaa5ff55c99ff191be29\tDmitry Andriyanov\t2018-10-16 11:25:59 +0300\tисправлена ошибка\n' +
      '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc\tDmitry Andriyanov\t2018-10-16 11:23:01 +0300\tссылки на корневую папку\n' +
      'f69c43393449afe9284f3fa20010695a5faa3849\tDmitry Andriyanov\t2018-10-16 11:20:57 +0300\tссылки на корневую папку\n' +
      '5dec08da64c3b090708aa8412924b26744d60597\tDmitry Andriyanov\t2018-10-16 11:19:59 +0300\tотображение списка коммитов\n',
    parsed: [ 
      { hash: '82810cf7d56476059477aaa5ff55c99ff191be29',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 11:25:59 +0300',
        msg: 'исправлена ошибка' }, 
      { hash: '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 11:23:01 +0300',
        msg: 'ссылки на корневую папку' },
      { hash: 'f69c43393449afe9284f3fa20010695a5faa3849',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 11:20:57 +0300',
        msg: 'ссылки на корневую папку' },
      { hash: '5dec08da64c3b090708aa8412924b26744d60597',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 11:19:59 +0300',
        msg: 'отображение списка коммитов' } 
    ]
  }
]

// Fake execute-git.js
const executeGit = require('../../libs/execute-git')
jest.genMockFromModule('../../libs/execute-git')
jest.mock('../../libs/execute-git')
executeGit.mockResolvedValue(PAGES[0].original)

const ARGS = [ 1, 10 ];

describe('call executeGit', () => {
  it('calls gitExecuter', () => {
    expect.assertions(1)

    return gitHistory(...ARGS)
      .then(() => expect(executeGit).toBeCalledTimes(1))
      .catch(e => console.error(e))
  })

  it('calls executeGit with correct arguments', () => {
    expect.assertions(4)

    executeGit.mockClear()
    return gitHistory(3, 10)
      .then(() => {
        const call = executeGit.mock.calls[0]
        const offset = call[1][4]
        const size = call[1][6]

        expect(offset).toBe(20)
        expect(size).toBe(10)
      })
      .then(() => gitHistory(4, 9, executeGit))
      .then(() => {
        const call = executeGit.mock.calls[1]
        const offset = call[1][4]
        const size = call[1][6]

        expect(offset).toBe(27)
        expect(size).toBe(9)
      })
      .catch(e => console.error(e))
  })
})

describe('parse and return git history', () => {
  it('returns array', () => {
    expect.assertions(1)

    const gitHistoryPromise = gitHistory(...ARGS)

    expect(gitHistoryPromise && gitHistoryPromise.then && gitHistoryPromise.then(res => Array.isArray(res))).resolves.toBe(true)
  })

  it('returns array of correct length', () => {
    expect.assertions(2)

    PAGES.map(PAGE => {
      executeGit.mockResolvedValueOnce(PAGE.original)
      expect(gitHistory(...ARGS)).resolves.toHaveLength(PAGE.parsed.length)
    })
  })

  it('parses output correctly', () => {
    expect.assertions(2)
    
    PAGES.map(PAGE => {
      executeGit.mockResolvedValueOnce(PAGE.original)
      expect(gitHistory(...ARGS)).resolves.toEqual(PAGE.parsed)
    })
  })
})
